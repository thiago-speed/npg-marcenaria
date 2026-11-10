import type {
  Environment,
  FilmVideo,
  HeadlineLine,
  MaterialItem,
  MediaImage,
  PortfolioCategory,
  Review,
} from "./types.ts";
import { siteConfig } from "./site.ts";

const img = (
  src: string,
  alt: string,
  width: number,
  height: number,
  objectPosition?: string,
): MediaImage => ({
  src,
  alt,
  width,
  height,
  ...(objectPosition ? { objectPosition } : {}),
});

export const homeContent = {
  hero: {
    lines: [{ text: "Execução à altura" }, { text: "do projeto." }] satisfies HeadlineLine[],
    subtext:
      "Marcenaria sob medida, com fabricação própria e cuidado em cada detalhe.",
    image: img(
      "/npg/optimized/ambiente-cozinha-jantar-integrados.webp",
      "Cozinha e jantar integrados com marcenaria sob medida, mesa de madeira e cristaleira iluminada.",
      2400,
      1600,
      "50% 52%",
    ),
    objectPositionDesktop: "50% 52%",
    objectPositionMobile: "50% 52%",
    primaryCta: {
      texto: "Ver projetos",
      href: "#projetos",
    },
    secondaryCta: {
      texto: "Converse com a NPG",
      tipo: "whatsapp" as const,
      mensagem: "",
    },
  },

  headerCta: "Vamos conversar",

  intro: {
    mark: "NPG.",
    slogan: "Em cada projeto, um sonho realizado.",
    text: "Mobiliário que acompanha a arquitetura, não compete com ela.",
  },

  transition: {
    kicker: siteConfig.empresa.nomeCurto,
    title: ["Do projeto", "ao ambiente."],
    body: "A marcenaria resolve o espaço com medida, encaixe e instalação.",
    image: img(
      "/npg/optimized/cozinha-nichos.webp",
      "Cozinha com nichos de marcenaria.",
      1000,
      1400,
    ),
  },

  environments: {
    title: "Soluções",
    body: "",
    lead: "",
    items: [] as Environment[],
  },

  philosophy: {
    title: ["Marcenaria construída", "em torno do projeto."],
    body: "Desde 2011, unimos o cuidado da marcenaria personalizada à precisão da tecnologia, com fabricação própria e equipe presente da produção à montagem.",
    after: "Ouvimos cada cliente e acompanhamos cada etapa para que o mobiliário reflita suas escolhas e respeite o projeto.",
    closing: "Nosso cuidado continua após a montagem, com atendimento próximo, transparência e garantia de cinco anos.",
    imageLeft: img(
      "/npg/optimized/home-office-2.webp",
      "Home office em L, com armários superiores brancos, painel de madeira e bancada iluminada.",
      949,
      1657,
      "50% 46%",
    ),
    image: img(
      "/npg/optimized/escritorio.webp",
      "Home office com bancadas de madeira, armários superiores brancos e painel ripado.",
      937,
      1678,
      "50% 48%",
    ),
  },

  projects: {
    kicker: "Execução",
    title: "Ambientes à medida",
    overview: "Cozinhas, livings, dormitórios, banheiros e espaços comerciais. Uma seleção da marcenaria executada pela NPG.",
    featuredCategory: "residencial",
    pairedCategories: ["cozinhas", "dormitorios", "banheiros", "comercial"],
    categories: [
      {
        id: "residencial",
        label: "Residencial",
        sector: "Residencial",
        title: "Cozinha e living",
        description: "Cozinha, jantar e soluções sob medida para integrar os espaços da casa.",
        photos: [
          {
            id: "residencial-arco-original",
            label: "Jantar e cozinha vistos pelo arco",
            image: img("/npg/optimized/jantar-portal.webp", "Sala de jantar vista por um arco, com mesa redonda e cozinha verde ao fundo.", 1254, 1254, "48% 52%"),
          },
          {
            id: "playground-original",
            label: "Playground de gatos sob medida",
            image: img("/npg/optimized/playground-gatos.webp", "Playground de gatos em marcenaria, com nichos, prateleiras e rampa.", 1129, 1393, "50% 36%"),
          },
        ],
      },
      {
        id: "cozinhas",
        label: "Cozinhas",
        sector: "Residencial",
        title: "Cozinhas e jantar",
        description: "Armários e marcenaria que integram cozinha e jantar, com continuidade de materiais e proporções.",
        photos: [
          {
            id: "cristaleira-original",
            label: "Cozinha e cristaleira iluminada",
            image: img("/npg/optimized/cozinha-cristaleira.webp", "Cristaleira de madeira com iluminação interna ao lado da cozinha e da mesa.", 1087, 1446, "68% 38%"),
          },
          {
            id: "cozinha-frontal",
            label: "Cozinha e jantar integrados",
            image: img("/npg/optimized/ambiente-cozinha-mesa-madeira-frontal.webp", "Cozinha planejada com mesa de madeira, armários claros e iluminação integrada.", 2000, 1333),
          },
        ],
      },
      {
        id: "livings",
        label: "Livings",
        sector: "Residencial",
        title: "Living e integração",
        description: "Painéis, nichos e mobiliário que conectam o estar aos demais ambientes da casa.",
        photos: [
          {
            id: "living-integrado",
            label: "Living e cozinha",
            image: img("/npg/optimized/ambiente-sala-cozinha-integradas.webp", "Living integrado à cozinha, com painel de TV, treliça em madeira e armários claros.", 2000, 1333),
          },
          {
            id: "living-jantar",
            label: "Jantar e cristaleira",
            image: img("/npg/optimized/ambiente-jantar-cristaleira.webp", "Sala de jantar com mesa redonda e cristaleira sob medida junto ao estar.", 1200, 1800),
          },
        ],
      },
      {
        id: "dormitorios",
        label: "Dormitórios",
        sector: "Residencial",
        title: "Dormitórios e closets",
        description: "Cabeceiras, armários e soluções de apoio que organizam o quarto com uma linguagem contínua.",
        photos: [
          {
            id: "dormitorio-original",
            label: "Dormitório com marcenaria planejada",
            image: img("/npg/optimized/dormitorio.webp", "Dormitório com guarda-roupa planejado, painel ripado e bancada suspensa.", 1544, 1018, "42% 50%"),
          },
          {
            id: "dormitorio-closet",
            label: "Quarto e acesso ao closet",
            image: img("/npg/optimized/ambiente-quarto-acesso-closet.webp", "Quarto com espelho de contorno arredondado e marcenaria no acesso ao closet.", 1200, 1800),
          },
        ],
      },
      {
        id: "banheiros",
        label: "Banheiros",
        sector: "Residencial",
        title: "Banheiros e lavabos",
        description: "Gabinetes, painéis e nichos que aproveitam o espaço com cuidado nos encontros e acabamentos.",
        photos: [
          {
            id: "lavabo-escuro",
            label: "Lavabo com madeira e luz",
            image: img("/npg/optimized/ambiente-lavabo-bancada-escura.webp", "Lavabo com marcenaria em madeira, espelho iluminado e bancada escura.", 1200, 1800),
          },
        ],
      },
      {
        id: "gourmet",
        label: "Gourmet",
        sector: "Residencial",
        title: "Espaços de convívio",
        description: "Marcenaria para preparar, receber e compartilhar, integrada à área gourmet.",
        photos: [
          {
            id: "gourmet-churrasqueira",
            label: "Área gourmet",
            image: img("/npg/optimized/ambiente-area-gourmet-churrasqueira.webp", "Área gourmet com armários planejados claros, bancada curva e churrasqueira.", 2000, 1333),
          },
          {
            id: "gourmet-bar",
            label: "Bar e bancada de apoio",
            image: img("/npg/optimized/ambiente-area-gourmet-bar.webp", "Área de bar com bancada de madeira, banquetas e painel de pedra ao fundo.", 1200, 1800),
          },
        ],
      },
      {
        id: "comercial",
        label: "Comercial",
        sector: "Comercial",
        title: "Comercial",
        description: "Treliças, bancos e mobiliário sob medida para compor espaços comerciais com identidade.",
        photos: [
          {
            id: "comercial-trelica",
            label: "Treliça e mobiliário comercial",
            image: img("/npg/optimized/comercial-trelica.webp", "Salão comercial com treliça de madeira no teto, bancos e mesas sob medida.", 1119, 1406),
          },
        ],
      },
    ] satisfies PortfolioCategory[],
  },

  materiality: {
    title: "Detalhes que definem o resultado.",
    body: "Na NPG, cada detalhe é pensado para que a marcenaria faça parte do ambiente, com harmonia e precisão.",
    items: [
      {
        id: "ripado-original",
        label: "Ripado e encontro com espelho",
        image: img("/npg/optimized/living-ripado.webp", "Painel ripado de madeira ao lado de espelho e marcenaria iluminada.", 937, 1679, "26% 42%"),
      },
      {
        id: "movel-canto-arredondado",
        label: "Canto arredondado",
        image: img(
          "/npg/optimized/detalhe-movel-canto-arredondado.webp",
          "Detalhe da curva de um móvel em madeira, com frente ripada.",
          933,
          1400,
        ),
      },
      {
        id: "cristaleira-tacas",
        label: "Cristaleira iluminada",
        image: img(
          "/npg/optimized/detalhe-cristaleira-tacas.webp",
          "Prateleiras de vidro com taças e iluminação junto à marcenaria.",
          933,
          1400,
        ),
      },
      {
        id: "cabeceira-criado-mudo",
        label: "Encaixes e proporções",
        image: img(
          "/npg/optimized/detalhe-cabeceira-criado-mudo.webp",
          "Criado-mudo sob medida integrado ao painel da cabeceira.",
          933,
          1400,
        ),
      },
      {
        id: "trelica-original",
        label: "Painel com treliça",
        image: img("/npg/optimized/living-trelica.webp", "Painel de living em madeira clara com treliça, nichos e gabinetes.", 945, 1664, "55% 40%"),
      },
      {
        id: "painel-armario-iluminado",
        label: "Madeira e luz",
        image: img(
          "/npg/optimized/detalhe-painel-armario-iluminado.webp",
          "Encontro entre painel de madeira, armário e iluminação embutida.",
          933,
          1400,
        ),
      },
      {
        id: "lavabo-gabinete-ripado",
        label: "Ripado e espelho",
        image: img(
          "/npg/optimized/detalhe-lavabo-gabinete-ripado.webp",
          "Gabinete ripado de lavabo junto à bancada e ao espelho iluminado.",
          933,
          1400,
        ),
      },
      {
        id: "cabeceira-ripada-armario",
        label: "Textura e continuidade",
        image: img(
          "/npg/optimized/detalhe-cabeceira-ripada-armario.webp",
          "Encontro entre cabeceira ripada, painel de madeira e armário.",
          933,
          1400,
        ),
      },
      {
        id: "forro-original",
        label: "Forro e encontro iluminado",
        image: img("/npg/optimized/banheiro-forro.webp", "Gabinete planejado com forro de madeira e LED no encontro com o espelho.", 1080, 1456, "32% 48%"),
      },
      {
        id: "cantinho-cafe-iluminado",
        label: "Nichos e iluminação",
        image: img(
          "/npg/optimized/detalhe-cantinho-cafe-iluminado.webp",
          "Prateleiras iluminadas e bancada de um cantinho do café em madeira.",
          933,
          1400,
        ),
      },
      {
        id: "painel-tv-vazado-lateral",
        label: "Treliça em madeira",
        image: img(
          "/npg/optimized/detalhe-painel-tv-vazado-lateral.webp",
          "Vista lateral de painel vazado com treliça de madeira e gabinete.",
          933,
          1400,
        ),
      },
      {
        id: "lavabo-bancada-verde",
        label: "Encontro de materiais",
        image: img(
          "/npg/optimized/detalhe-lavabo-bancada-verde.webp",
          "Painel de madeira com espelho curvo junto à bancada verde do lavabo.",
          933,
          1400,
        ),
      },
      {
        id: "encontro-original",
        label: "Madeira, espelho e luz",
        image: img("/npg/optimized/banheiro-detalhe.webp", "Detalhe do encontro entre forro de madeira, espelho e fita de LED.", 1084, 1451),
      },
      {
        id: "cabeceira-mesa-estudo",
        label: "Detalhes integrados",
        image: img(
          "/npg/optimized/detalhe-cabeceira-mesa-estudo.webp",
          "Bancada de estudo integrada à cabeceira ripada com iluminação linear.",
          933,
          1400,
        ),
      },
    ] satisfies MaterialItem[],
  },

  execution: {
    photos: [
      img(
        "/npg/optimized/oficina-cola.webp",
        "Cola no encontro do ripado, com as ripas dobrando no canto do volume.",
        1080,
        1456,
        "62% 52%",
      ),
      img(
        "/npg/optimized/gaveta-oficina.webp",
        "Gaveta aberta na oficina, com divisórias de madeira no interior.",
        1122,
        1402,
        "42% 48%",
      ),
      img(
        "/npg/optimized/oficina-paineis.webp",
        "Painéis azuis recém-cortados sobre a bancada da oficina.",
        1241,
        1267,
        "48% 42%",
      ),
    ],
    notes: [
      {
        title: "O ripado acompanha o volume.",
        body: "A cola segura o encontro. As ripas dobram no canto, no tempo certo.",
      },
      {
        title: "O interior também é à medida.",
        body: "Divisórias e painéis saem da bancada no esquadro do projeto.",
      },
    ],
  },

  atmosphere: {
    title: "Sob medida para o espaço.",
    text: "A NPG executa o mobiliário que o ambiente pede, com precisão de fabricação e cuidado na instalação.",
    cta: "Entre em contato",
    gif: img(
      "/npg/optimized/ambiente-isometrico.gif",
      "Ilustração isométrica de uma sala com sofá, poltrona, estante e marcenaria sob medida.",
      800,
      600,
    ),
    still: img(
      "/npg/optimized/atmosphere-still.webp",
      "Ilustração isométrica de uma sala com sofá, poltrona, estante e marcenaria sob medida.",
      800,
      600,
    ),
  },

  brandMark: {
    image: img(
      "/npg/branding/logo-frase.png",
      "NPG. Em cada projeto, um sonho realizado.",
      1338,
      471,
    ),
  },

  film: {
    title: ["Em", "movimento"],
    text: "",
  },

  commercial: {
    title: ["Marcenaria", "para o espaço."],
  },

  videos: {
    film: {
      id: "film",
      title: "",
      src: "",
      poster: "/npg/optimized/cozinha-bar.webp",
      width: 1000,
      height: 1400,
    },
    commercial: {
      id: "commercial",
      title: "",
      src: "",
      poster: "/npg/optimized/banheiro-nichos.webp",
      width: 1000,
      height: 1400,
    },
  } satisfies Record<string, FilmVideo>,

  proof: {
    title: "Feedbacks",
    body: "O que nossos clientes dizem sobre a NPG.",
    items: [
      {
        author: "Mara Lucia Muniz Amador",
        role: "",
        quote:
          "Excelente marcenaria. Móveis de alta qualidade, com preço justo, entrega no prazo e um suporte espetacular. Super recomendo. Todos os móveis do meu apartamento foram feitos pela NPG marcenaria.",
        source: "Google",
      },
      {
        author: "Marcos Lopes Silva",
        role: "",
        quote:
          "A Patrícia e sua equipe da NPG Marcenaria foram extremamente profissionais do início ao fim. Os móveis planejados foram executados conforme o projeto de arquitetura e instalados dentro do prazo. Posso dizer que eu sou um cliente 100% satisfeito e com isso eu recomendo muitooo essa empresa.",
        source: "Google",
      },
      {
        author: "Diego Xavier",
        role: "",
        quote:
          "Contratamos a NPG para fazer a marcenaria do consultório da minha esposa e foi tudo ótimo. Respostas rápidas, dúvidas sempre sanadas, prazo de entrega e montagem excelente, além do ótimo atendimento. Mais do que recomendados.",
        source: "Google",
      },
      {
        author: "Eliane Campos",
        role: "",
        quote:
          "Super recomendado a NPG, marcenaria de qualidade e comprometimento fiz minha cozinha e ficou perfeita, a Patrícia projetista muito atenciosa, os montadores Isaías e Jonas muito caprichosos, acabamento perfeito.",
        source: "Google",
      },
      {
        author: "Ivan Roccon",
        role: "",
        quote:
          "Atendimento impecável em todo o processo da NPG, meu obrigado especial a Patrícia. Zero dor de cabeça e muuuuuito feliz de ter confiado no trabalho muito bem executado e com preços competitivos. Minha próxima reforma será novamente com NPG",
        source: "Google",
      },
    ] satisfies Review[],
    themes: [],
  },

  faq: {
    title: "Perguntas frequentes",
    items: [],
  },

  showroom: {
    mall: "",
    title: "",
    text: "",
    ctaMaps: "Como chegar",
    ctaWhatsapp: "Solicitar orçamento",
    image: img(
      "/npg/optimized/cozinha-bar.webp",
      "Cozinha com marcenaria sob medida.",
      1000,
      1400,
    ),
  },

  qualifier: {
    title: "Tem um projeto em mente?",
    environmentLabel: "Qual ambiente você deseja planejar?",
    timingLabel: "Quando você pretende realizar?",
    cta: "Solicitar orçamento",
    environments: [],
    timings: [],
  },

  spaces: {
    title: "Nossos Espaços",
    introduction: "Venha tomar um café com a gente e dar o primeiro passo para o seu próximo projeto.",
    locations: {
      fabrica: {
        photoPlaceholder: "Foto da fábrica em breve",
        description: "Onde o projeto ganha forma, com fabricação própria, tecnologia e o cuidado da nossa equipe em cada etapa.",
        image: null as MediaImage | null,
      },
      escritorio: {
        photoPlaceholder: "Foto do escritório em breve",
        description: "Um espaço dedicado à conversa, às escolhas e aos detalhes que orientam cada projeto de marcenaria.",
        image: null as MediaImage | null,
      },
    },
    mapsCta: "Abrir no mapas",
    contactsTitle: "Fale com a NPG",
    commercialLabel: "Comercial",
    supportLabel: "Pós-venda / Financeiro",
    hoursTitle: "Horário de atendimento",
    hours: [
      { days: "Segunda a quinta", time: "7h30–12h / 13h–17h" },
      { days: "Sexta", time: "7h30–12h / 13h–16h30" },
      { days: "Sábados", time: "Fechado" },
    ],
  },

  contact: {
    title: "Seu projeto pede uma execução à altura?",
    body: "Converse com a NPG sobre a marcenaria do ambiente.",
    cta: "Enviar para a NPG!",
    locationLabel: "Campo Magro - PR",
    quiz: {
      back: "Voltar",
      questions: [
        {
          id: "ambiente",
          prompt: "Qual ambiente você quer resolver?",
          options: [
            "Cozinha",
            "Living",
            "Dormitório",
            "Escritório",
            "Banheiro",
            "Comercial",
            "Mais de um ambiente",
          ],
        },
        {
          id: "projeto",
          prompt: "Já existe um projeto?",
          options: [
            "Sim, com arquitetura",
            "Tenho referências",
            "Ainda estou começando",
          ],
        },
        {
          id: "quando",
          prompt: "Quando pretende executar?",
          options: ["Nos próximos meses", "Ainda este ano", "Sem pressa definida"],
        },
      ],
    },
    image: img(
      "/npg/optimized/cozinha-ilha.webp",
      "Cozinha contemporânea com ilha e mesa integrada, vista pelo vão da porta.",
      941,
      1672,
      "68% 46%",
    ),
  },

  footer: {
    mapsCta: "Como chegar",
    whatsappLabel: "WhatsApp",
    instagramLabel: "Instagram",
    disclaimer: "Demonstração comercial desenvolvida para apresentação.",
  },
} as const;
