// ========================================
// PROJECT DATA - EDIT HERE
// ========================================
// To add/edit projects, simply modify this file

export interface Project {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  gradient: string;

  // Individual project page details
  client?: string;
  agency?: string; // Agency
  production?: string; // Production company
  duration?: string; // Video duration (e.g., "00:01:30" or "1:30")
  year?: string;
  role?: string;
  fullDescription?: string; // Legacy - single language
  fullDescription_pt?: string; // Portuguese description
  fullDescription_en?: string; // English description
  video?: string; // Local video URL (/projects/video.mp4)
  videos?: string[]; // Array of videos for carousel
  vimeoId?: string; // Vimeo video ID (e.g., "123456789")
  images?: string[]; // Array of images
  credits?: {
    role: string;
    name: string;
  }[];
}

export const projects: Project[] = [
  {
    id: "bradesco-agro",
    title: "Bradesco Agro Dupla Raiz",
    description: "AI-Driven Outfit Replacement",
    thumbnail: "/projects/bradesco-thumb.jpg",
    gradient: "from-indigo-600/20 to-purple-600/20",

    client: "Bradesco",
    agency: "AlmapBBDO",
    production: "Pródigo Films",
    role: "AI Artist & Post-Production",
    fullDescription: "Digital replacement of wardrobe in live-action footage, ensuring full integration of fabric, texture, and lighting for a realistic and seamless result.",
    video: "/projects/bradesco-full.mp4",
    credits: [
      { role: "AI Artist", name: "Lenox" },
      { role: "Composition", name: "Bruno Vianna" },
      { role: "Post Production", name: "Pródigo Films" }
    ]
  },

  {
    id: "nubank-brand",
    title: "Nubank x Wednesday",
    description: "3D Compositing & Visual Concepts",
    thumbnail: "/projects/nubank-1.png",
    gradient: "from-purple-600/20 to-pink-600/20",

    client: "Nubank",
    role: "AI Artist",
    fullDescription: "Development of visual concepts, creation of the environment, and 3D compositing of the characters \"Pezinho\" and \"Mãozinha,\" integrating the card into the scene in a way that aligns with the visual identity of the show's second season.",
    images: [
      "/projects/nubank-1.png",
      "/projects/nubank-2.png",
      "/projects/nubank-3.png"
    ],
    credits: [
      { role: "AI Artist", name: "Lenox" },
      { role: "3D", name: "Bruno Vianna" },
      { role: "Retouch", name: "Marcos Nascimento" }
    ]
  },

  {
    id: "jeep-campaign",
    title: "Jeep Campaign",
    description: "Environment Creation & VFX",
    thumbnail: "/projects/jeep-thumb.png",
    gradient: "from-cyan-600/20 to-blue-600/20",

    client: "Jeep",
    agency: "F.biz",
    production: "Mercuria.tv",
    fullDescription: "Creation of the environment with basaltic cliffs, low vegetation, and warm golden side-light from late afternoon. Realistic style with wide composition, depth, and strong sense of scale. Production of high-resolution plates for real-scene compositing, and creation of the vehicle with authentic ground impact and physical interaction.",
    video: "/projects/jeep-full.mp4",
    credits: [
      { role: "Directors", name: "We are Magnolias" },
      { role: "AI Artist", name: "Lenox" },
      { role: "Post Production", name: "MOSH Post" }
    ]
  },

  // NIVEA - OCULTO TEMPORARIAMENTE
  // {
  //   id: "nivea-beauty",
  //   title: "Nivea Beauty",
  //   description: "Character Development",
  //   thumbnail: "/projects/nivea-thumb.png",
  //   gradient: "from-pink-600/20 to-rose-600/20",
  //
  //   client: "Nivea",
  //   agency: "Publicis Brazil",
  //   production: "PXP Studios / Play9",
  //   role: "AI Visual Artist",
  //   fullDescription: "Development of a digital avatar of the TV host Eliana, recreating her appearance at approximately 20 years old, faithful to the early stage of her career.",
  //   video: "/projects/nivea-full.mp4",
  //   credits: [
  //     { role: "AI Artist", name: "Lenox" },
  //     { role: "Post Production", name: "PXP Studios" }
  //   ]
  // },

  {
    id: "vivo-halloween",
    title: "Vivo Halloween",
    description: "AI-Generated Campaign",
    thumbnail: "/projects/vivo-halloween-capa.png",
    gradient: "from-purple-600/20 to-pink-600/20",

    client: "Vivo",
    agency: "GALERIA",
    role: "AI Artist",
    fullDescription: "Full AI-generated Halloween campaign for Vivo, combining creative concept development with AI video generation.",
    video: "/projects/vivo-halloween.mp4",
    credits: [
      { role: "AI Artist", name: "Lenox" }
    ]
  },

  {
    id: "intel-extraordinary",
    title: "Intel - Extraordinary",
    description: "AI-Enhanced Visual Effects",
    thumbnail: "/projects/intel-thumb.png",
    gradient: "from-blue-600/20 to-purple-600/20",

    // Individual page details
    client: "Intel",
    production: "MAD Gorilla",
    duration: "00:01:30",
    fullDescription: "Manifest Film developed for Intel, celebrating technology, creativity, and a future accelerated by artificial intelligence. I was responsible for the creative direction and the entire technical execution of the project, from concept to final delivery.\n\nScope and key deliverables:\n• Manifest development: narrative, messaging, and audiovisual identity\n• Full creation of scenes and visual effects using generative AI models (image and video)\n• Visual development with a technological, futuristic, and dynamic aesthetic\n• Virtual cinematography, color grading, VFX, and digital compositing\n• Format adaptations for online campaigns and institutional screenings",
    vimeoId: "1088165221", // Real Vimeo ID
    credits: [
      { role: "AI Artist", name: "Lenox" }
    ]
  },

  {
    id: "mcdonalds",
    title: "McDonald's",
    description: "Virtual Production",
    thumbnail: "/projects/mcdonalds-thumb.png",
    gradient: "from-red-600/20 to-yellow-600/20",

    client: "McDonald's",
    agency: "GALERIA",
    production: "FRAME",
    role: "AI Artist",
    fullDescription_pt: "Responsável pela criação dos concepts e desenvolvimento visual dos ambientes utilizados em Virtual Production. As artes foram geradas com IA e evoluídas para plates de alta fidelidade, permitindo integração cinematográfica rápida e eficiente durante as filmagens. O processo garantiu maior agilidade na construção de cenários complexos, reduzindo dependência de 3D completo e otimizando o tempo de pós-produção.",
    fullDescription_en: "Responsible for creating concepts and visual development of environments used in Virtual Production. The artworks were AI-generated and evolved into high-fidelity plates, enabling fast and efficient cinematic integration during filming. The process ensured greater agility in building complex sets, reducing reliance on full 3D and optimizing post-production time.",
    videos: [
      "/projects/mcdonalds-full.mp4",
      "/projects/mcdonalds-video2.mp4"
    ],
    credits: [
      { role: "Director", name: "Nixon Freire" },
      { role: "AI Artist", name: "Lenox" },
      { role: "Post Production", name: "FRAME" }
    ]
  },

  {
    id: "itau-digital",
    title: "Itaú Uniclass Rock in Rio",
    description: "Virtual Production",
    thumbnail: "/projects/itau-thumb.png",
    gradient: "from-orange-600/20 to-red-600/20",

    client: "Itaú",
    agency: "GALERIA",
    production: "CZAR",
    fullDescription_pt: "Responsável pela criação dos concepts e desenvolvimento visual dos ambientes utilizados em Virtual Production. As artes foram geradas com IA e evoluídas para plates de alta fidelidade, permitindo integração cinematográfica rápida e eficiente durante as filmagens. O processo garantiu maior agilidade na construção de cenários complexos, reduzindo dependência de 3D completo e otimizando o tempo de pós-produção.",
    fullDescription_en: "Responsible for creating concepts and visual development of environments used in Virtual Production. The artworks were AI-generated and evolved into high-fidelity plates, enabling fast and efficient cinematic integration during filming. The process ensured greater agility in building complex sets, reducing reliance on full 3D and optimizing post-production time.",
    video: "/projects/itau-full.mp4",
    credits: [
      { role: "Directors", name: "Paladino" },
      { role: "AI Artist", name: "Lenox" },
      { role: "Post Production", name: "Mosh Post" }
    ]
  },

  {
    id: "vivo-pre",
    title: "Vivo Pre",
    description: "Virtual Production",
    thumbnail: "/projects/vivo-pre-thumb.png",
    gradient: "from-purple-600/20 to-pink-600/20",

    client: "Vivo",
    agency: "VML",
    production: "Corazon",
    role: "AI Artist",
    fullDescription_pt: "Responsável pela criação dos concepts e desenvolvimento visual dos ambientes utilizados em Virtual Production. As artes foram geradas com IA e evoluídas para plates de alta fidelidade, permitindo integração cinematográfica rápida e eficiente durante as filmagens. O processo garantiu maior agilidade na construção de cenários complexos, reduzindo dependência de 3D completo e otimizando o tempo de pós-produção.",
    fullDescription_en: "Responsible for creating concepts and visual development of environments used in Virtual Production. The artworks were AI-generated and evolved into high-fidelity plates, enabling fast and efficient cinematic integration during filming. The process ensured greater agility in building complex sets, reducing reliance on full 3D and optimizing post-production time.",
    video: "/projects/vivo-pre-full.mp4",
    credits: [
      { role: "Director", name: "Marcello Lima" },
      { role: "AI Artist", name: "Lenox" },
      { role: "Production", name: "Corazon" }
    ]
  }
];
