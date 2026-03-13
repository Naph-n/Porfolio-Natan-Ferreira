import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { Resend } from "resend";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json());

  // API Route for Contact Form
  app.post("/api/enviar-contato", async (req, res) => {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "Campos obrigatórios ausentes." });
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    if (!resendApiKey || resendApiKey.trim() === "") {
      console.error("ERRO CRÍTICO: RESEND_API_KEY está vazia ou não foi configurada no Cloud Run.");
      return res.status(500).json({ 
        error: "Configuração incompleta no Cloud Run.", 
        message: "A variável RESEND_API_KEY não foi encontrada. Verifique as variáveis de ambiente do seu serviço no Google Cloud Console." 
      });
    }

    try {
      const resend = new Resend(resendApiKey);
      
      const { data, error } = await resend.emails.send({
        from: 'Natan Ferreira <contato@natanferreira.com.br>',
        to: 'natan.furtado@outlook.com',
        replyTo: email as string,
        subject: `Novo contato: ${name}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eee; padding: 20px; border-radius: 10px;">
            <h2 style="color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px;">Novo contato recebido pelo Portfolio</h2>
            <p style="margin-top: 20px;"><strong>Nome:</strong> ${String(name)}</p>
            <p><strong>E-mail:</strong> ${String(email)}</p>
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
        console.error("Erro detalhado do Resend:", JSON.stringify(error, null, 2));
        return res.status(400).json({ 
          error: "Erro na API do Resend", 
          message: error.message,
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

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
