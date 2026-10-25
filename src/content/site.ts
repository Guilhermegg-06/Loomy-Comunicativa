import motionPoster from "../../public/media/loomy-film-poster.webp";

export const site = {
  name: "Loomy",
  description: "Produção, design e marketing. Uma agência alagoana que conecta ideias, marcas e pessoas.",
  instagram: "https://www.instagram.com/loomycomunica/",
  instagramHandle: "@loomycomunica",
  navigation: [
    { label: "O que fazemos", href: "#servicos" },
    { label: "Nosso universo", href: "#projetos" },
    { label: "A Loomy", href: "#sobre" },
  ],
} as const;

export const services = [
  {
    id: "producao",
    name: "Produção",
    phrase: "Ideias que ganham vida.",
    description: "Da primeira ideia ao último frame. Conteúdo audiovisual com intenção, ritmo e a personalidade da sua marca.",
    disciplines: ["Direção criativa", "Fotografia", "Vídeo e motion"],
    visual: "frame",
  },
  {
    id: "design",
    name: "Design",
    phrase: "Presença que se reconhece.",
    description: "Forma, cor e conceito trabalhando juntos. Identidades e peças que dão consistência à maneira como sua marca aparece.",
    disciplines: ["Identidade visual", "Design gráfico", "Direção de arte"],
    visual: "type",
  },
  {
    id: "marketing",
    name: "Marketing",
    phrase: "Conexões com propósito.",
    description: "Estratégia e criatividade na mesma conversa. Planejamento e conteúdo para aproximar sua marca das pessoas certas.",
    disciplines: ["Estratégia de marca", "Conteúdo digital", "Redes sociais"],
    visual: "orbit",
  },
] as const;

export type Project = {
  id: string;
  title: string;
  category: string;
  kind: "brand-reference" | "brand-film" | "client-project";
  poster: string;
  posterAlt: string;
  width: number;
  height: number;
  video?: string;
  description: string;
};

// The presentation supplied by the owner is not a client case.
export const projects: Project[] = [{
  id: "loomy-motion",
  title: "Por trás das ideias",
  category: "Vídeo de apresentação",
  kind: "brand-film",
  poster: motionPoster.src,
  posterAlt: "Apresentação em vídeo em um estúdio de fundo escuro, com legendas em português",
  width: 720,
  height: 1280,
  video: "/media/loomy-film.mp4",
  description: "Uma conversa sobre o cuidado com cada projeto.",
}];
