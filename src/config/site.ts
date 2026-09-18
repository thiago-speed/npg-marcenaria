import type { NavItem } from "./types.ts";

export const siteConfig = {
  empresa: {
    nome: "NPG Marcenaria",
    nomeCurto: "NPG",
    slogan: "Execução à altura do projeto.",
    descricao:
      "A NPG desenvolve e executa mobiliário sob medida para ambientes que pedem soluções específicas.",
    logo: "/npg/branding/mark.png",
    logoClaro: "/npg/branding/mark-light.png",
    favicon: "/favicon.png",
  },

  contato: {
    telefone: "",
    telefoneDigitos: "",
    whatsapp: "",
    email: "",
    endereco: "",
    bairro: "",
    cidade: "Campo Magro",
    estado: "PR",
    cep: "",
    mapsUrl: "",
    mensagemPadrao:
      "Olá! Vi o site da NPG e gostaria de conversar sobre um projeto de marcenaria sob medida.",
  },

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
