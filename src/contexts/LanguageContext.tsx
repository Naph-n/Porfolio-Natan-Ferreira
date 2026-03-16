import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'pt' | 'en';

interface Translations {
  [key: string]: {
    pt: string;
    en: string;
  };
}

const translations: Translations = {
  // Navbar
  'nav.about': { pt: 'Sobre', en: 'About' },
  'nav.services': { pt: 'Serviços', en: 'Services' },
  'nav.work': { pt: 'Meu Trabalho', en: 'My Work' },
  'nav.testimonials': { pt: 'Depoimentos', en: 'Testimonials' },
  'nav.faqs': { pt: 'FAQs', en: 'FAQs' },
  'nav.contact': { pt: 'Contato', en: 'Contact' },
  'nav.resume': { pt: 'CV', en: 'CV' },

  // Hero
  'hero.badge': { pt: 'Disponível', en: 'Available' },
  'hero.title': { pt: 'Ajudando marcas a se moverem!', en: 'Helping brands move!' },
  'hero.subtitle': { pt: 'Transformo conceitos em experiências visuais que unem produto, marca e público!', en: 'I transform concepts into visual experiences that unite product, brand, and audience!' },
  'hero.cta': { pt: 'Vamos conversar', en: "Let's talk" },

  // About
  'about.badge': { pt: 'Sobre mim', en: 'About me' },
  'about.title1': { pt: 'criatividade', en: 'creativity' },
  'about.title2': { pt: 'clareza', en: 'clarity' },
  'about.title3': { pt: 'propósito', en: 'purpose' },
  'about.desc': { 
    pt: 'Bem-vindo ao meu portfólio. Sou o Natan, profissional de comunicação, designer e criador visual com mais de 7 anos de experiência, dedicado a transformar ideias em soluções claras, funcionais e memoráveis. Trabalho com design gráfico, UX/UI, vídeo, captação, motion, áudio, manipulação de imagem, gestão de projetos e eventos, sempre unindo técnica e criatividade para entregar resultados consistentes. Acredito em processos colaborativos, comunicação direta e, acima de tudo, em criar projetos que realmente façam diferença. Vamos dar vida à sua ideia?', 
    en: "Welcome to my portfolio. I'm Natan, a communication professional, designer, and visual creator with over 7 years of experience, dedicated to transforming ideas into clear, functional, and memorable solutions. I work with graphic design, UX/UI, video, capture, motion, audio, image manipulation, project and event management, always combining technique and creativity to deliver consistent results. I believe in collaborative processes, direct communication, and above all, creating projects that truly make a difference. Let's bring your idea to life?" 
  },
  'about.stat1.label': { pt: 'Anos de experiência', en: 'Years of experience' },
  'about.stat1.desc': { pt: 'Com uma trajetória sólida unindo audiovisual, design e UX', en: 'With a solid track record uniting audiovisual, design, and UX' },
  'about.stat2.label': { pt: 'Projetos concluídos', en: 'Completed projects' },
  'about.stat2.desc': { pt: 'Mais de cinquenta projetos entregues com qualidade, consistência e visão criativa.', en: 'Over fifty projects delivered with quality, consistency, and creative vision.' },
  'about.stat3.label': { pt: 'Clientes atendidos', en: 'Clients served' },
  'about.stat3.desc': { pt: 'Profissionais, empresas e marcas que confiaram na minha entrega e no meu processo.', en: 'Professionals, companies, and brands that trusted my delivery and process.' },
  'about.stat4.label': { pt: 'Satisfação', en: 'Satisfaction' },
  'about.stat4.desc': { pt: 'Todos os clientes satisfeitos com o cuidado, a precisão e a experiência do trabalho.', en: 'All clients satisfied with the care, precision, and work experience.' },

  // Services
  'services.badge': { pt: 'Serviços', en: 'Services' },
  'services.title': { pt: 'O que fazemos?', en: 'What do we do?' },
  'services.subtitle': { pt: 'Descubra qual dos meus serviços melhor atende às necessidades do seu projeto.', en: "Discover which of my services best meets your project's needs." },
  'services.s1.title': { pt: 'Brand Films', en: 'Brand Films' },
  'services.s1.desc': { pt: 'Criação de filmes institucionais e comerciais que traduzem a essência de marcas e pessoas, unindo narrativa, estética e propósito.', en: 'Creation of institutional and commercial films that translate the essence of brands and people, uniting narrative, aesthetics, and purpose.' },
  'services.s2.title': { pt: 'Audiovisual', en: 'Audiovisual' },
  'services.s2.desc': { pt: 'Produção de vídeos para campanhas, redes sociais e produtos, com cuidado técnico, luz precisa e storytelling alinhado à estratégia.', en: 'Video production for campaigns, social media, and products, with technical care, precise lighting, and storytelling aligned with the strategy.' },
  'services.s3.title': { pt: 'Design Gráfico', en: 'Graphic Design' },
  'services.s3.desc': { pt: 'Construção de identidades visuais, peças digitais e materiais gráficos.', en: 'Construction of visual identities, digital pieces, and graphic materials.' },
  'services.s4.title': { pt: 'Direção Criativa & Fotografia', en: 'Creative Direction & Photography' },
  'services.s4.desc': { pt: 'Concepção visual completa para projetos que precisam de identidade forte e narrativa.', en: 'Complete visual conception for projects that need a strong identity and narrative.' },
  'services.s5.title': { pt: 'UX Design', en: 'UX Design' },
  'services.s5.desc': { pt: 'Pesquisa, estruturação e prototipação de experiências digitais focadas em clareza, fluxo eficiente e usabilidade.', en: 'Research, structuring, and prototyping of digital experiences focused on clarity, efficient flow, and usability.' },
  'services.s6.title': { pt: 'Motion Design', en: 'Motion Design' },
  'services.s6.desc': { pt: 'Animações que comunicam com ritmo e intenção. Criação de movimentos, transições e composições visuais.', en: 'Animations that communicate with rhythm and intention. Creation of movements, transitions, and visual compositions.' },
  'services.s7.title': { pt: 'Web Design', en: 'Web Design' },
  'services.s7.desc': { pt: 'Criação de websites modernos e responsivos, focados em performance, estética e na melhor experiência.', en: 'Creation of modern and responsive websites, focused on performance, aesthetics, and the best experience.' },

  // Portfolio
  'portfolio.badge': { pt: 'Portfólio', en: 'Portfolio' },
  'portfolio.title1': { pt: 'Como transformo criatividade', en: 'How I transform creativity' },
  'portfolio.title2': { pt: 'em ', en: 'into ' },
  'portfolio.title3': { pt: 'estratégia visual', en: 'visual strategy' },
  'portfolio.p1.title': { pt: 'Behance', en: 'Behance' },
  'portfolio.p1.desc': { pt: 'No meu Behance você encontra a versão completa do meu trabalho: estudos, processos, bastidores e cada decisão criativa que constrói as narrativas visuais que desenvolvo. É onde apresento meus projetos com mais detalhe, da concepção ao resultado final mostrando como transformo ideias em experiências que conectam. Se você curte ver o processo por trás das ideias e entender como cada prejeto se constrói, é só acessar e conferir.', en: "On my Behance, you'll find the complete version of my work: studies, processes, behind the scenes, and every creative decision that builds the visual narratives I develop. It's where I present my projects in more detail, from conception to the final result, showing how I transform ideas into experiences that connect. If you enjoy seeing the process behind the ideas and understanding how each project is built, just access and check it out." },
  'portfolio.p2.title': { pt: 'Instagram - @naph.n', en: 'Instagram - @naph.n' },
  'portfolio.p2.desc': { pt: 'No Instagram você acompanha um lado mais vivo e espontâneo do meu trabalho: bastidores, experimentos visuais, reflexões e um pouco do que inspira minha jornada como profissional criativo. É onde compartilho processos, pequenas histórias e a estética que guia tudo o que faço. Siga para conhecer mais sobre mim e sobre o meu universo criativo. Se quiser me acompanhar de um jeito mais real e direto, o Instagram é onde tudo aparece primeiro. Sem filtro, do jeito que acontece.', en: "On Instagram, you can follow a more lively and spontaneous side of my work: behind the scenes, visual experiments, reflections, and a bit of what inspires my journey as a creative professional. It's where I share processes, short stories, and the aesthetics that guide everything I do. Follow to learn more about me and my creative universe. If you want to follow me in a more real and direct way, Instagram is where everything appears first. Unfiltered, just the way it happens." },
  'portfolio.cta': { pt: 'Acessar', en: 'Access' },

  // Testimonials
  'testimonials.badge': { pt: 'Depoimentos', en: 'Testimonials' },
  'testimonials.title': { pt: 'O que dizem sobre meu trabalho', en: 'What they say about my work' },
  'testimonials.subtitle': { pt: 'Relatos e percepções de clientes e parceiros que já trabalharam comigo e vivenciaram meu processo de perto.', en: 'Reports and perceptions from clients and partners who have worked with me and experienced my process up close.' },
  
  'testimonials.t1.text': { pt: 'As entregas foram muito além do esperado! O design e a usabilidade ficaram animais e deram um up total na experiência do usuário. Mandou muito bem!', en: 'The deliveries went way beyond expectations! The design and usability turned out amazing and gave a total boost to the user experience. Great job!' },
  'testimonials.t1.role': { pt: 'Coordenador de Sistemas | Uisa', en: 'Systems Coordinator | Uisa' },
  
  'testimonials.t2.text': { pt: 'Natan é um profissional dedicado, versátil e extremamente talentoso. Trabalhamos juntos e, ao longo desse período, ele sempre se destacou pela técnica apurada e pela consistência nas entregas.', en: 'Natan is a dedicated, versatile, and extremely talented professional. We worked together, and throughout this period, he always stood out for his refined technique and consistency in deliveries.' },
  'testimonials.t2.role': { pt: 'Coordenador de Marketing e Branding | Forever Liss', en: 'Marketing and Branding Coordinator | Forever Liss' },
  
  'testimonials.t3.text': { pt: 'Profissional atencioso, detalhista e muito cuidadoso. O processo de construção com o Natan fluiu muito bem, com alinhamento técnico e de expectativas. E ainda assim a entrega surpreendeu positivamente. Recomendo!', en: 'Attentive, detail-oriented, and very careful professional. The building process with Natan flowed very well, with technical and expectation alignment. And yet the delivery was a positive surprise. Highly recommend!' },
  'testimonials.t3.role': { pt: 'Dra Gabriela Vieira - Entomologista', en: 'Dr. Gabriela Vieira - Entomologist' },
  
  'testimonials.t4.text': { pt: 'Trabalhar com o Natan é sempre uma tranquilidade. Ele entende a essência do Terceiro Setor e consegue elevar o nível de qualquer material. Já trabalhamos em muitos projetos e ele sempre nos surpreende. Um excelente profissional!', en: 'Working with Natan is always a peace of mind. He understands the essence of the Third Sector and manages to elevate the level of any material. We have worked on many projects and he always surprises us. An excellent professional!' },
  'testimonials.t4.role': { pt: 'Presidente | Florescer Ação Social', en: 'President | Florescer Ação Social' },
  
  'testimonials.t5.text': { pt: 'Tive a oportunidade de trabalhar com um profissional de comunicação altamente estratégico. Os projetos entregaram clareza de mensagem e impacto na comunicação corporativa.', en: 'I had the opportunity to work with a highly strategic communication professional. The projects delivered message clarity and impact in corporate communication.' },
  'testimonials.t5.role': { pt: 'Executive Manager | Greentech', en: 'Executive Manager | Greentech' },
  
  'testimonials.t6.text': { pt: 'Excelente profissional, além de ter uma visão moderna, minimalista e criativa, consegue captar bem a essência do que o cliente espera. Uma parceria que pretendo manter para vários projetos.', en: 'Excellent professional, besides having a modern, minimalist, and creative vision, he manages to capture well the essence of what the client expects. A partnership I intend to keep for several projects.' },
  'testimonials.t6.role': { pt: 'Designer', en: 'Designer' },

  // FAQ
  'faq.badge': { pt: 'FAQs', en: 'FAQs' },
  'faq.title1': { pt: 'Respondendo às', en: 'Answering' },
  'faq.title2': { pt: 'suas perguntas', en: 'your questions' },
  'faq.subtitle': { pt: 'Tem mais perguntas? Envie-nos sua dúvida abaixo.', en: 'Have more questions? Send us your doubt below.' },
  
  'faq.q1.q': { pt: 'Quais serviços você oferece exatamente?', en: 'What services do you offer exactly?' },
  'faq.q1.a': { pt: 'Minha atuação abrange desde o Design Gráfico e a manipulação avançada de imagens até o desenvolvimento de interfaces no UI/UX Design. No campo audiovisual, realizo a captação de vídeo, edição de vídeo, fotografia e iluminação, além de produções complexas em Motion Design 2D e noções de 3D, sempre integrando o design de áudio para criar experiências imersivas. Também possuo sólida experiência na gestão de projetos, eventos e comunicação corporativa, o que me permite entregar soluções de ponta a ponta.', en: 'My work ranges from Graphic Design and advanced image manipulation to interface development in UI/UX Design. In the audiovisual field, I do video capture, video editing, photography, and lighting, as well as complex productions in 2D Motion Design and 3D notions, always integrating audio design to create immersive experiences. I also have solid experience in project, event, and corporate communication management, which allows me to deliver end-to-end solutions.' },
  
  'faq.q2.q': { pt: 'Você trabalha em projetos isolados ou em demandas completas?', en: 'Do you work on isolated projects or complete demands?' },
  'faq.q2.a': { pt: 'Estou disponível para ambos os formatos, dependendo da necessidade do cliente.', en: "I am available for both formats, depending on the client's needs." },
  
  'faq.q3.q': { pt: 'Quais ferramentas e tecnologias compõem o seu fluxo de trabalho?', en: 'What tools and technologies make up your workflow?' },
  'faq.q3.a': { pt: 'Para garantir um alto padrão de qualidade, utilizo ferramentas de referência na indústria, como a suite Adobe para manipulação de imagem, edição de vídeo e animação. Integro softwares de modelagem 3D e design de áudio para dar profundidade aos meus projetos de motion e vídeo. Para o design de produtos digitais, utilizo o Figma em fluxos de prototipação. Além do software, aplico conhecimentos técnicos avançados em equipamentos de luz e câmera para capturar imagens que exigem o mínimo de pós-produção e o máximo de impacto visual.', en: 'To ensure a high quality standard, I use industry-reference tools, such as the Adobe suite for image manipulation, video editing, and animation. I integrate 3D modeling and audio design software to give depth to my motion and video projects. For digital product design, I use Figma in prototyping flows. In addition to software, I apply advanced technical knowledge in lighting and camera equipment to capture images that require minimal post-production and maximum visual impact.' },
  
  'faq.q4.q': { pt: 'Como funciona o processo de orçamento e prazos?', en: 'How does the budgeting and deadline process work?' },
  'faq.q4.a': { pt: 'O processo começa com um entendimento profundo do briefing para identificar as particularidades e o alcance de cada projeto. Com base nisso, elaboro uma proposta personalizada que detalha os prazos de entrega e as etapas de revisão. Acredito na transparência e no cumprimento rigoroso de cronogramas, mantendo uma comunicação constante para que o resultado final reflita exatamente a necessidade estética do projeto.', en: 'The process begins with a deep understanding of the briefing to identify the particularities and scope of each project. Based on this, I prepare a personalized proposal detailing delivery times and review stages. I believe in transparency and strict adherence to schedules, maintaining constant communication so that the final result reflects exactly the aesthetic need of the project.' },

  // Contact
  'contact.badge': { pt: 'Contato', en: 'Contact' },
  'contact.title': { pt: 'Entre em contato', en: 'Get in touch' },
  'contact.subtitle': { pt: 'Para quaisquer dúvidas, entre em contato conosco através dos dados fornecidos abaixo.', en: 'For any questions, please contact us using the details provided below.' },
  'contact.office': { pt: 'Escritório', en: 'Office' },
  'contact.email': { pt: 'E-mail', en: 'E-mail' },
  'contact.phone': { pt: 'Telefone', en: 'Phone' },
  'contact.form.name': { pt: 'Nome*', en: 'Name*' },
  'contact.form.name.placeholder': { pt: 'Seu nome', en: 'Your name' },
  'contact.form.email': { pt: 'E-mail*', en: 'E-mail*' },
  'contact.form.email.placeholder': { pt: 'Seu e-mail', en: 'Your e-mail' },
  'contact.form.phone': { pt: 'Número de Telefone', en: 'Phone Number' },
  'contact.form.phone.placeholder': { pt: 'Seu telefone', en: 'Your phone' },
  'contact.form.message': { pt: 'Mensagem*', en: 'Message*' },
  'contact.form.message.placeholder': { pt: 'Como posso ajudar?', en: 'How can I help?' },
  'contact.form.submit': { pt: 'Enviar Mensagem', en: 'Send Message' },
  'contact.form.submitting': { pt: 'Enviando...', en: 'Sending...' },
  'contact.form.success': { pt: 'Mensagem enviada com sucesso', en: 'Message sent successfully' },

  // Footer
  'footer.rights': { pt: '© 2025 Natan Ferreira. Todos os direitos reservados.', en: '© 2025 Natan Ferreira. All rights reserved.' },
  'footer.signature': { pt: 'Design By Natan Ferreira ©', en: 'Design By Natan Ferreira ©' },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('pt');

  const t = (key: string): string => {
    if (!translations[key]) {
      console.warn(`Translation key not found: ${key}`);
      return key;
    }
    return translations[key][language];
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
