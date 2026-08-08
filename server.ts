import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { Resend } from "resend";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

async function startServer() {
  const app = express();

  // Enable trust proxy so express-rate-limit can read client IPs correctly behind Cloud Run / load balancers
  app.set("trust proxy", 1);

  const PORT = Number(process.env.PORT) || 3000;

  // Rate Limiting to prevent "abusive activities"
  const contactLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // Limit each IP to 5 requests per window
    message: { error: "Muitas tentativas", message: "Por favor, aguarde alguns minutos antes de tentar novamente." },
    standardHeaders: true,
    legacyHeaders: false,
  });

  app.use(express.json());

  // API Route for Contact Form
  app.post("/api/enviar-contato", contactLimiter, async (req, res) => {
    const { name, email, phone, message } = req.body;

    // Validação básica e limpeza de dados
    const cleanEmail = String(email || '').trim();
    const cleanName = String(name || '').trim();

    if (!cleanName || !cleanEmail || !message) {
      return res.status(400).json({ error: "Campos obrigatórios ausentes ou inválidos." });
    }

    // Regex simples para validar formato de e-mail antes de enviar ao Resend
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
      return res.status(400).json({ error: "E-mail inválido.", message: "O endereço de e-mail fornecido não é válido." });
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    if (!resendApiKey || resendApiKey.trim() === "" || resendApiKey.includes("YOUR_")) {
      console.error("ERRO DE CONFIGURAÇÃO NO SERVIDOR: A chave da API RESEND_API_KEY não foi configurada nos segredos do projeto.");
      return res.status(500).json({ 
        error: "Configuração ausente", 
        message: "Ocorreu um problema técnico de configuração. Por favor, tente novamente mais tarde.",
        debugInfo: "RESEND_API_KEY is not configured in environment variables."
      });
    }

    try {
      const resend = new Resend(resendApiKey);
      
      // Como o usuário confirmou que o domínio está verificado, 
      // devemos usar um e-mail do domínio próprio para evitar as restrições do modo Sandbox.
      const fromEmail = 'contato@natanferreira.com.br';
      
      const { data, error } = await resend.emails.send({
        from: `Natan Ferreira <${fromEmail}>`,
        to: 'natan.furtado@outlook.com',
        replyTo: `${cleanName} <${cleanEmail}>`,
        subject: `Novo contato: ${cleanName}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eee; padding: 20px; border-radius: 10px;">
            <h2 style="color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px;">Novo contato recebido pelo Portfolio</h2>
            <p style="margin-top: 20px;"><strong>Nome:</strong> ${cleanName}</p>
            <p><strong>E-mail:</strong> ${cleanEmail}</p>
            <p><strong>Telefone:</strong> ${phone ? String(phone) : 'Não informado'}</p>
            <div style="margin-top: 20px; padding: 15px; background-color: #f9f9f9; border-radius: 5px;">
              <p><strong>Mensagem:</strong></p>
              <p style="white-space: pre-wrap;">${String(message)}</p>
            </div>
            <hr style="margin-top: 30px; border: 0; border-top: 1px solid #eee;" />
            <p style="font-size: 12px; color: #999;">Este e-mail foi enviado automaticamente pelo formulário de contato do seu portfolio.</p>
          </div>
        `,
      });

      if (error) {
        // Sanitize logs: avoid logging full error object which might contain secrets
        console.error("Erro na API do Resend:", error.message || "Erro desconhecido");
        return res.status(400).json({ 
          error: "Erro na API do Resend", 
          message: "Ocorreu um problema ao enviar o e-mail. Por favor, tente novamente mais tarde.",
          type: error.name 
        });
      }

      console.log("E-mail enviado com sucesso:", data);
      res.status(200).json({ success: true, data });
    } catch (error: any) {
      console.error("Exceção ao enviar e-mail:", error);
      res.status(500).json({ 
        error: "Erro interno", 
        message: "Ocorreu um problema ao processar seu envio. Por favor, tente novamente mais tarde.",
        debugInfo: error.message || String(error)
      });
    }
  });

  // Rate Limiting to protect Gemini API backend handler from malicious abuse and unexpected charges
  const geminiLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 12, // Allow max 12 queries per minute per client IP
    message: { 
      error: "Muitas consultas", 
      message: "Você atingiu o limite temporário de interações por minuto. Por favor, aguarde alguns segundos antes de enviar outra mensagem." 
    },
    standardHeaders: true,
    legacyHeaders: false,
  });

  // Secure Backend Proxy endpoint for communicating with Gemini models
  app.post("/api/gemini/generate", geminiLimiter, async (req, res) => {
    const { prompt, systemInstruction, model } = req.body;

    if (!prompt || typeof prompt !== "string" || prompt.trim() === "") {
      return res.status(400).json({ error: "Campo de prompt ausente ou inválido." });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey.trim() === "" || apiKey.includes("MY_GEMINI_API_KEY")) {
      console.error("ERRO DE SEGURANÇA: GEMINI_API_KEY não foi configurada nos segredos do servidor.");
      return res.status(500).json({
        error: "Configuração de servidor ausente",
        message: "A chave da API Gemini não foi configurada nos segredos do projeto. Por favor, adicione GEMINI_API_KEY nas Configurações > Segredos."
      });
    }

    try {
      // Build GoogleGenAI instance on the server-side safely using system instruction guidelines
      const ai = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          }
        }
      });

      // Default to standard gemini-3.5-flash as per the selected model decision guide
      const selectedModel = model || "gemini-3.5-flash";

      // Call Gemini API securely from the backend
      const response = await ai.models.generateContent({
        model: selectedModel,
        contents: prompt,
        config: systemInstruction ? { systemInstruction } : undefined,
      });

      // Extract the response text
      const outputText = response.text;

      return res.status(200).json({
        success: true,
        text: outputText || "",
      });
    } catch (error: any) {
      console.error("Erro ao chamar o SDK do Gemini no servidor:", error.message || error);
      return res.status(500).json({
        error: "Falha na resposta do assistente",
        message: error.message || "Não foi possível obter uma resposta do modelo de IA neste momento."
      });
    }
  });

  // Helper to generate a beautiful, clean typographic/icon-based dynamic SVG fallback for partner logos
  const getFallbackSvgForLogo = (logoUrl: string): string => {
    const urlLower = logoUrl.toLowerCase();
    
    if (urlLower.includes("rustik")) {
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 60" width="200" height="60">
        <text x="50%" y="60%" dominant-baseline="middle" text-anchor="middle" font-family="'Courier New', Courier, monospace, sans-serif" font-weight="900" font-size="22" fill="#FFFFFF" letter-spacing="4">RUSTIK</text>
      </svg>`;
    }
    if (urlLower.includes("nolook")) {
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 60" width="200" height="60">
        <text x="50%" y="60%" dominant-baseline="middle" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-weight="300" font-size="20" fill="#FFFFFF" letter-spacing="6">NOLOOK</text>
      </svg>`;
    }
    if (urlLower.includes("batista") || urlLower.includes("vida")) {
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 60" width="200" height="60">
        <g transform="translate(15, 0)">
          <circle cx="25" cy="30" r="12" stroke="#FFFFFF" stroke-width="2" fill="none" opacity="0.8"/>
          <path d="M25 22 V38 M19 28 H31" stroke="#FFFFFF" stroke-width="2" />
          <text x="110" y="34" dominant-baseline="middle" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-weight="600" font-size="14" fill="#FFFFFF" letter-spacing="1">VIDA</text>
        </g>
      </svg>`;
    }
    if (urlLower.includes("logo%20png") || urlLower.includes("logo_png")) {
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 60" width="200" height="60">
        <text x="50%" y="60%" dominant-baseline="middle" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-weight="700" font-size="16" fill="#FFFFFF" letter-spacing="3">VOZ &amp; VERSO</text>
      </svg>`;
    }
    if (urlLower.includes("florescer")) {
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 60" width="200" height="60">
        <text x="50%" y="60%" dominant-baseline="middle" text-anchor="middle" font-family="'Georgia', serif, sans-serif" font-weight="normal" font-style="italic" font-size="22" fill="#FFFFFF" letter-spacing="2">Florescer</text>
      </svg>`;
    }
    if (urlLower.includes("uisa")) {
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 60" width="200" height="60">
        <text x="50%" y="60%" dominant-baseline="middle" text-anchor="middle" font-family="impact, Arial Black, sans-serif" font-weight="900" font-size="26" fill="#FFFFFF" letter-spacing="2">UISA</text>
      </svg>`;
    }
    if (urlLower.includes("65")) {
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 60" width="200" height="60">
        <rect x="65" y="15" width="70" height="30" rx="4" fill="none" stroke="#FFFFFF" stroke-width="2" />
        <text x="100" y="34" dominant-baseline="middle" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-weight="800" font-size="18" fill="#FFFFFF" letter-spacing="2">65</text>
      </svg>`;
    }

    // Default general template when there isn't a specific match
    const filenameClean = logoUrl.split('/').pop()?.split('.')[0]?.replace(/%20/g, ' ').toUpperCase() || 'PARCEIRO';
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 60" width="200" height="60">
      <text x="50%" y="60%" dominant-baseline="middle" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-weight="700" font-size="15" fill="#FFFFFF" letter-spacing="2">${filenameClean}</text>
    </svg>`;
  };

  // API Proxy endpoint to safely serve partner logos, bypassing client-side CORS or loading restrictions
  app.get("/api/proxy-logo", async (req, res) => {
    const logoUrl = req.query.url as string;
    if (!logoUrl) {
      return res.status(400).json({ error: "Missing url parameter" });
    }

    // Security check: ensure requests only go to the designated studiovozeverso GCS bucket
    if (!logoUrl.startsWith("https://storage.googleapis.com/studiovozeverso/")) {
      return res.status(403).json({ error: "Unauthorized proxy target" });
    }

    try {
      // Use premium browser requests headers to help GCS validate the request
      const response = await fetch(logoUrl, {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
          "Accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
          "Referer": "https://storage.googleapis.com/"
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch from remote: ${response.status} ${response.statusText}`);
      }

      const contentType = response.headers.get("content-type") || "image/svg+xml";
      res.setHeader("Content-Type", contentType);
      // Serve with a long-term cache header since static partner logos change very infrequently
      res.setHeader("Cache-Control", "public, max-age=31536000, immutable");

      const arrayBuffer = await response.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      res.send(buffer);
    } catch (error: any) {
      // Serve a beautifully formatted fallback SVG inline!
      res.setHeader("Content-Type", "image/svg+xml");
      res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
      res.send(Buffer.from(getFallbackSvgForLogo(logoUrl)));
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    // Favicon redirect for dev
    app.get('/favicon.ico', (req, res) => {
      res.setHeader('Content-Type', 'image/svg+xml');
      res.sendFile(path.resolve(process.cwd(), 'public', 'favicon.svg'));
    });

    // Proposal routes for dev
    app.get('/proposta-gabriela-vieira', (req, res) => {
      res.sendFile(path.resolve(process.cwd(), 'public', 'proposta-gabriela-vieira.html'));
    });

    app.get('/proposta-mauricio-dantas', (req, res) => {
      res.sendFile(path.resolve(process.cwd(), 'public', 'proposta-mauricio-dantas.html'));
    });

    app.get('/pagamento', (req, res) => {
      res.sendFile(path.resolve(process.cwd(), 'public', 'pagamento.html'));
    });

    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    
    app.use(express.static(distPath));

    // Proposal routes for prod
    app.get('/proposta-gabriela-vieira', (req, res) => {
      res.sendFile(path.join(distPath, 'proposta-gabriela-vieira.html'));
    });

    app.get('/proposta-mauricio-dantas', (req, res) => {
      res.sendFile(path.join(distPath, 'proposta-mauricio-dantas.html'));
    });

    app.get('/pagamento', (req, res) => {
      res.sendFile(path.join(distPath, 'pagamento.html'));
    });

    // Fallback for favicon.ico requests
    app.get('/favicon.ico', (req, res) => {
      const fallbackPath = path.resolve(distPath, 'favicon.svg');
      res.setHeader('Content-Type', 'image/svg+xml');
      res.sendFile(fallbackPath);
    });

    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
