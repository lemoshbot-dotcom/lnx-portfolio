// ========================================
// DADOS DOS PROJETOS - EDITE AQUI
// ========================================
// Para adicionar/editar projetos, basta modificar este arquivo

export interface Project {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  gradient: string;

  // Página individual do projeto
  client?: string;
  agency?: string; // Agência
  production?: string; // Produtora
  duration?: string; // Duração do vídeo (ex: "00:01:30" ou "1:30")
  year?: string;
  role?: string;
  fullDescription?: string;
  video?: string; // URL do vídeo local (/projects/video.mp4)
  vimeoId?: string; // ID do vídeo no Vimeo (ex: "123456789")
  images?: string[]; // Array de imagens
  credits?: {
    role: string;
    name: string;
  }[];
}

export const projects: Project[] = [
  {
    id: "intel-extraordinary",
    title: "Intel - Extraordinary",
    description: "AI-Enhanced Visual Effects",
    thumbnail: "/projects/intel-thumb.jpg",
    gradient: "from-blue-600/20 to-purple-600/20",

    // Detalhes da página individual
    client: "Intel",
    agency: "AKQA",
    production: "Stink Films",
    duration: "00:00:30",
    year: "2024",
    fullDescription: "Advanced AI-enhanced visual effects for Intel's Extraordinary campaign. Custom workflow development combining traditional post-production techniques with cutting-edge AI tools to deliver stunning visuals.",
    vimeoId: "1088165221", // ID real do Vimeo
    credits: [
      { role: "AI Artist", name: "LNX" },
      { role: "Post-Production", name: "LNX" }
    ]
  },

  {
    id: "natura-beauty",
    title: "Natura Beauty",
    description: "Advanced Post-Production",
    thumbnail: "/projects/natura-thumb.jpg",
    gradient: "from-green-600/20 to-blue-600/20",

    client: "Natura",
    year: "2024",
    role: "Post-Production Specialist",
    fullDescription: "High-end post-production for Natura's beauty campaign. Focused on skin retouching, color grading, and AI-enhanced beauty techniques while maintaining natural aesthetics.",
    video: "/projects/natura-full.mp4",
    images: []
  },

  {
    id: "itau-digital",
    title: "Itaú Digital",
    description: "Creative AI Solutions",
    thumbnail: "/projects/itau-thumb.jpg",
    gradient: "from-orange-600/20 to-red-600/20",

    client: "Itaú",
    year: "2024",
    role: "AI Artist",
    fullDescription: "Creative AI solutions for Itaú's digital transformation campaign.",
    video: "/projects/itau-full.mp4"
  },

  {
    id: "jeep-campaign",
    title: "Jeep Campaign",
    description: "Custom AI Workflow Solution",
    thumbnail: "/projects/jeep-thumb.jpg",
    gradient: "from-cyan-600/20 to-blue-600/20",

    client: "Jeep",
    year: "2023",
    role: "Workflow Developer & AI Artist",
    fullDescription: "Custom AI workflow development for Jeep's adventure campaign.",
    video: "/projects/jeep-full.mp4"
  },

  {
    id: "nubank-brand",
    title: "Nubank Brand",
    description: "Workflow Innovation",
    thumbnail: "/projects/nubank-thumb.jpg",
    gradient: "from-purple-600/20 to-pink-600/20",

    client: "Nubank",
    year: "2024",
    role: "AI Artist & Workflow Specialist",
    fullDescription: "Innovative workflow solutions for Nubank's brand campaign.",
    video: "/projects/nubank-full.mp4"
  },

  {
    id: "ifood-tech",
    title: "iFood Tech",
    description: "AI Art Direction",
    thumbnail: "/projects/ifood-thumb.jpg",
    gradient: "from-yellow-600/20 to-orange-600/20",

    client: "iFood",
    year: "2024",
    role: "AI Art Director",
    fullDescription: "AI art direction for iFood's technology campaign.",
    video: "/projects/ifood-full.mp4"
  },

  {
    id: "mcdonalds",
    title: "McDonald's",
    description: "Post-Production Excellence",
    thumbnail: "/projects/mcdonalds-thumb.jpg",
    gradient: "from-red-600/20 to-yellow-600/20",

    client: "McDonald's",
    year: "2023",
    role: "Post-Production Lead",
    fullDescription: "Post-production excellence for McDonald's advertising campaign.",
    video: "/projects/mcdonalds-full.mp4"
  },

  {
    id: "bradesco-digital",
    title: "Bradesco Digital",
    description: "AI Art & Custom Post-Production",
    thumbnail: "/projects/bradesco-thumb.jpg",
    gradient: "from-indigo-600/20 to-purple-600/20",

    client: "Bradesco",
    year: "2024",
    role: "AI Artist & Post-Production",
    fullDescription: "AI art and custom post-production for Bradesco's digital campaign.",
    video: "/projects/bradesco-full.mp4"
  },

  {
    id: "nivea-beauty",
    title: "Nivea Beauty",
    description: "AI-Enhanced Visuals",
    thumbnail: "/projects/nivea-thumb.jpg",
    gradient: "from-pink-600/20 to-rose-600/20",

    client: "Nivea",
    year: "2023",
    role: "AI Visual Artist",
    fullDescription: "AI-enhanced visuals for Nivea's beauty product line.",
    video: "/projects/nivea-full.mp4"
  }
];
