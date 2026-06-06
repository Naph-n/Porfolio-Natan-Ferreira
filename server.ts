import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { Resend } from "resend";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";

dotenv.config();

async function startServer() {
  const app = express();
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
      console.error("ERRO: RESEND_API_KEY não configurada ou inválida.");
      return res.status(500).json({ 
        error: "Configuração ausente", 
        message: "A chave da API do Resend não foi configurada. Por favor, adicione RESEND_API_KEY aos segredos do projeto." 
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
      res.status(500).json({ error: "Erro interno ao processar o envio.", message: error.message });
    }
  });

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
      // Use native fetch supported globally in Node 18+
      const response = await fetch(logoUrl);
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
      console.error(`Error proxying logo ${logoUrl}:`, error.message);
      res.status(500).json({ error: "Failed to proxy logo", message: error.message });
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
