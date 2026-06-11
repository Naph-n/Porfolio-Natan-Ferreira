import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, X, MessageSquare, Send, Bot, RefreshCw } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

interface Message {
  sender: "user" | "bot";
  text: string;
  timestamp: Date;
}

export function AIAssistant() {
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const isPt = language === "pt";

  // System Instructions to guide the AI acting as Natan Ferreira's virtual assistant
  const systemInstruction = isPt
    ? "Você é o assistente virtual inteligente de Natan Ferreira, profissional sênior de comunicação, design e criação visual de alto impacto com mais de 7 anos de experiência. Seja educado, moderno, conciso e profissional em suas respostas. Seu objetivo é ajudar potenciais clientes a entender o trabalho do Natan, seus serviços (Brand Films, Produção Audiovisual, Design Gráfico, Direção Criativa, Fotografia e UX Design), sua experiência e como contratá-lo. Sempre fale do Natan na terceira pessoa, de forma extremamente profissional e engajadora."
    : "You are the intelligent virtual assistant for Natan Ferreira, a senior communications professional, designer, and high-impact visual creator with over 7 years of experience. Be polite, modern, concise, and professional. Your goal is to help potential clients understand Natan's work, services (Brand Films, Audiovisual Production, Graphic Design, Creative Direction, Photography, and UX Design), his background, and how to hire him. Always speak of Natan in the third person in an extremely professional and engaging tone.";

  const welcomeMessage = isPt
    ? "Olá! Sou o assistente inteligente do Natan. Como posso te ajudar hoje?"
    : "Hello! I am Natan's intelligent assistant. How can I help you today?";

  const presetQuestions = isPt
    ? [
        "Quem é o Natan Ferreira?",
        "Quais serviços ele realiza?",
        "Como falar com o Natan?",
        "Quais ferramentas ele usa?",
      ]
    : [
        "Who is Natan Ferreira?",
        "What services does he offer?",
        "How can I contact Natan?",
        "What tools does he use?",
      ];

  // Initialize welcome message
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          sender: "bot",
          text: welcomeMessage,
          timestamp: new Date(),
        },
      ]);
    }
  }, [language]);

  // Scroll to bottom on updates
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    // Add user message
    const userMsg: Message = {
      sender: "user",
      text: textToSend,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsLoading(true);

    try {
      // Call the secure Backend Proxy endpoint (Hiding the GEMINI_API_KEY safely)
      const res = await fetch("/api/gemini/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: textToSend,
          systemInstruction: systemInstruction,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || data.error || "Erro na API ");
      }

      const botMsg: Message = {
        sender: "bot",
        text: data.text || (isPt ? "Hmm, não consegui processar a resposta..." : "Hmm, I couldn't process that response..."),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (error: any) {
      console.error("Erro no chat:", error);
      const errorMsg: Message = {
        sender: "bot",
        text: isPt
          ? "Desculpe pelo transtorno, meu sistema de IA está passando por instabilidades no momento. Por favor, tente falar diretamente com o Natan utilizando o formulário abaixo."
          : "Sorry, my AI system is experiencing brief instability right now. Please consider using the contact form below to get in touch with Natan.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([
      {
        sender: "bot",
        text: welcomeMessage,
        timestamp: new Date(),
      },
    ]);
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <motion.button
        id="ai-assistant-trigger"
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg hover:shadow-blue-500/20 active:scale-95 transition-shadow cursor-pointer"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.5 }}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Sparkles className="h-6 w-6 animate-pulse" />}
      </motion.button>

      {/* Assistant Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="ai-assistant-panel"
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            className="fixed bottom-24 right-6 z-50 flex h-[520px] w-[350px] sm:w-[380px] flex-col overflow-hidden rounded-2xl border border-white/15 bg-black/95 text-white shadow-2xl backdrop-blur-xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 bg-gradient-to-r from-neutral-900 to-neutral-950 px-5 py-4">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500/10">
                  <Bot className="h-5 w-5 text-blue-400" />
                </div>
                <div>
                  <h3 className="font-sans text-sm font-semibold tracking-wide text-white">
                    {isPt ? "Assistente Inteligente" : "AI Copilot"}
                  </h3>
                  <div className="flex items-center gap-1.5">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-green-500"></span>
                    </span>
                    <span className="text-[10px] text-white/50">{isPt ? "Disponível online" : "Online"}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  id="ai-chat-reset"
                  onClick={clearChat}
                  title={isPt ? "Limpar conversa" : "Clear conversation"}
                  className="rounded-lg p-1.5 text-white/40 hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
                >
                  <RefreshCw className="h-4 w-4" />
                </button>
                <button
                  id="ai-assistant-close"
                  onClick={() => setIsOpen(false)}
                  className="rounded-lg p-1.5 text-white/40 hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Messages Body */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${
                    msg.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[85%] rounded-xl px-3.5 py-2.5 text-xs sm:text-xs leading-relaxed ${
                      msg.sender === "user"
                        ? "bg-blue-600 text-white rounded-br-none"
                        : "bg-neutral-900 border border-white/5 text-slate-200 rounded-bl-none"
                    }`}
                  >
                    <p className="whitespace-pre-line">{msg.text}</p>
                    <span className="mt-1 block text-right text-[9px] text-white/30">
                      {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </span>
                  </div>
                </div>
              ))}

              {/* Loader */}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex items-center gap-2 rounded-xl border border-white/5 bg-neutral-900 px-4 py-3 text-xs text-white/60">
                    <div className="flex gap-1">
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-blue-400 [animation-delay:-0.3s]"></span>
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-blue-400 [animation-delay:-0.15s]"></span>
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-blue-400"></span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggestions (Preset chips) */}
            {messages.length === 1 && !isLoading && (
              <div className="px-4 py-2 border-t border-white/5 bg-neutral-950/40">
                <p className="text-[10px] text-white/40 mb-2 font-medium">
                  {isPt ? "Perguntas frequentes:" : "Quick suggestions:"}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {presetQuestions.map((q, idx) => (
                    <button
                      key={idx}
                      id={`ai-preset-chip-${idx}`}
                      onClick={() => handleSendMessage(q)}
                      className="rounded-lg border border-white/10 bg-neutral-900/60 hover:bg-neutral-800 hover:border-white/25 px-2.5 py-1 text-[10px] text-white/80 transition-all cursor-pointer text-left"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Footer */}
            <div className="border-t border-white/10 bg-neutral-950 px-4 py-3">
              <form
                id="ai-assistant-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage(inputValue);
                }}
                className="flex items-center gap-2"
              >
                <input
                  id="ai-assistant-input"
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={isPt ? "Escreva sua dúvida..." : "Ask Natan's assistant..."}
                  disabled={isLoading}
                  className="flex-1 rounded-xl border border-white/10 bg-neutral-900 px-3.5 py-2 text-xs text-white placeholder-white/40 outline-none hover:border-white/20 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 disabled:opacity-50"
                />
                <button
                  id="ai-assistant-send"
                  type="submit"
                  disabled={!inputValue.trim() || isLoading}
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white shadow-sm hover:bg-blue-500 active:scale-95 disabled:scale-100 disabled:opacity-50 transition-all cursor-pointer"
                >
                  <Send className="h-3.5 w-3.5" />
                </button>
              </form>
              <div className="mt-2 text-center text-[9px] text-white/25 flex items-center justify-center gap-1">
                <span>🛡️ {isPt ? "Proxy Seguro do Servidor Ativo" : "SSL Secured Server Proxy Enabled"}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
