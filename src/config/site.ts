import type { NavItem } from "./types.ts";

export const siteConfig = {
  empresa: {
    nome: "NPG Marcenaria",
    nomeCurto: "NPG",
    slogan: "Execução à altura do projeto.",
    descricao:
      "A NPG desenvolve e executa marcenaria sob medida para projetos residenciais e comerciais.",
    logo: "/npg/branding/mark.png",
    logoNavbar: "/npg/branding/logo-npg-navbar.png",
    logoClaro: "/npg/branding/mark-light.png",
    logoLoading: "/npg/branding/logo-loading-interpolated.webp",
    favicon: "/favicon.png",
  },

  contato: {
    telefone: "(41) 99780-0782",
    telefoneDigitos: "5541997800782",
    whatsapp: "5541997800782",
    suporte: {
      telefone: "(41) 99528-6040",
      whatsapp: "5541995286040",
    },
    email: "",
    endereco: "Rua Expedicionario Andre L Aleis, 310 - 2ª entrada, Barracão 06",
    bairro: "",
    cidade: "Campo Magro",
    estado: "PR",
    cep: "83535-000",
    mapsUrl: "",
    mensagemPadrao:
      "Olá! Vi o site da NPG e gostaria de conversar sobre um projeto de marcenaria sob medida.",
  },

  espacos: [
    {
      id: "fabrica",
      nome: "Fábrica",
      endereco: "Rua Expedicionario Andre L Aleis, 310",
      complemento: "2ª entrada, Barracão 06",
      localidade: "Campo Magro - PR",
      cep: "83535-000",
    },
    {
      id: "escritorio",
      nome: "Escritório",
      endereco: "R. Dep. Heitor Alencar Furtado, 3350",
      complemento: "Edifício Opus One, Sala 605",
      localidade: "Curitiba - PR",
      cep: "81200-110",
    },
  ],

  redesSociais: {
    instagram: "https://www.instagram.com/npgmarcenaria/",
    instagramHandle: "@npgmarcenaria",
    facebook: "",
    linkedin: "",
    pinterest: "",
  },

  seo: {
    titulo: "NPG Marcenaria | Marcenaria sob medida em Campo Magro",
    descricao:
      "Conheça projetos e soluções em marcenaria sob medida da NPG Marcenaria, em Campo Magro, Paraná.",
    keywords: [
      "NPG Marcenaria",
      "marcenaria sob medida",
      "móveis sob medida",
      "Campo Magro",
      "marcenaria Paraná",
    ],
    canonical: "",
    robots: "noindex, nofollow",
    imagemCompartilhamento: "/npg/optimized/hero.png",
    locale: "pt_BR",
  },

  rating: {
    score: "",
    count: 0,
    source: "Google",
    verifiedAt: "",
  },
} as const;

export const defaultNav: NavItem[] = [
  { label: "Ambientes", href: "#projetos", section: "projects" },
  { label: "A NPG", href: "#sobre", section: "philosophy" },
  { label: "Contato", href: "#contato", section: "contact" },
];
