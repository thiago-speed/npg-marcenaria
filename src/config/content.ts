import type {
  Environment,
  FilmVideo,
  HeadlineLine,
  MaterialItem,
  MediaImage,
  Project,
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
      "Mobiliário sob medida para ambientes residenciais e comerciais, com atenção à materialidade e ao acabamento, em Campo Magro.",
    image: img(
      "/npg/optimized/hero.png",
      "Cozinha sob medida com armários superiores verdes, bases em madeira e bancada clara.",
      1254,
      1254,
      "48% 52%",
    ),
    objectPositionDesktop: "48% 52%",
    objectPositionMobile: "48% 48%",
    primaryCta: {
      texto: "Ver projetos",
      href: "#projetos",
    },
    secondaryCta: {
      texto: "Solicitar orçamento",
      tipo: "instagram" as const,
      mensagem: "",
    },
  },

  headerCta: "Solicitar orçamento",

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
    body: "Mobiliário sob medida para o espaço. Leitura, fabricação e instalação no mesmo cuidado.",
    after: "Projetos próprios ou com arquitetura e interiores saem prontos para o ambiente.",
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
    items: [
      {
        id: "residencial-arco",
        title: "Residencial",
        category: "Cozinha e living",
        blurb: "Cozinha, jantar e uma solução sob medida integrada à parede.",
        layout: "signature" as const,
        image: img(
          "/npg/optimized/jantar-portal.webp",
          "Sala de jantar vista por um arco, com mesa redonda e cozinha verde ao fundo.",
          1254,
          1254,
          "48% 52%",
        ),
        images: [
          img(
            "/npg/optimized/playground-gatos.webp",
            "Playground de gatos em marcenaria, com nichos, prateleiras e rampa.",
            1129,
            1393,
            "50% 36%",
          ),
        ],
      },
      {
        id: "cristaleira",
        title: "Cozinha",
        category: "Residencial",
        blurb: "Volume de madeira, cristaleira iluminada e estar no mesmo ritmo.",
        layout: "split" as const,
        image: img(
          "/npg/optimized/cozinha-cristaleira.webp",
          "Cristaleira de madeira com iluminação interna ao lado da cozinha e da mesa.",
          1087,
          1446,
          "68% 38%",
        ),
      },
      {
        id: "dormitorio",
        title: "Dormitório",
        category: "Residencial",
        blurb: "Guarda-roupa, painel ripado e bancada suspensa.",
        layout: "bleed" as const,
        image: img(
          "/npg/optimized/dormitorio.webp",
          "Dormitório com guarda-roupa planejado, painel ripado e bancada suspensa.",
          1544,
          1018,
          "42% 50%",
        ),
      },
      {
        id: "comercial-trelica",
        title: "Comercial",
        category: "Treliça e bancos",
        blurb: "Treliça de madeira, bancos e mesas para o ponto comercial.",
        layout: "bleed" as const,
        image: img(
          "/npg/optimized/comercial-trelica.webp",
          "Salão comercial com treliça de madeira no teto e bancos sob medida.",
          1119,
          1406,
          "50% 28%",
        ),
      },
    ] satisfies Project[],
  },

  materiality: {
    title: "Detalhes que definem o resultado.",
    body: "Encontros de madeira, espelho e luz resolvidos na medida de cada ambiente.",
    items: [
      {
        id: "ripado",
        label: "Ripado e encontro com espelho",
        image: img(
          "/npg/optimized/living-ripado.webp",
          "Painel ripado de madeira ao lado de espelho e marcenaria iluminada.",
          937,
          1679,
          "26% 42%",
        ),
      },
      {
        id: "trelica",
        label: "Painel com treliça",
        image: img(
          "/npg/optimized/living-trelica.webp",
          "Painel de living em madeira clara com treliça, nichos e gabinetes.",
          945,
          1664,
          "55% 40%",
        ),
      },
      {
        id: "forro",
        label: "Forro e encontro iluminado",
        image: img(
          "/npg/optimized/banheiro-forro.webp",
          "Gabinete planejado com forro de madeira e LED no encontro com o espelho.",
          1080,
          1456,
          "32% 48%",
        ),
        detail: img(
          "/npg/optimized/banheiro-detalhe.webp",
          "Detalhe do encontro entre forro de madeira, espelho e fita de LED.",
          1084,
          1451,
          "50% 50%",
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
    body: "Quem já convive com o móvel deixa recado no Google.",
    instagramCta: "Ver no Instagram",
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
    disclaimer:
      "Demonstração comercial desenvolvida para apresentação. Telefone, WhatsApp, e-mail e endereço completo serão publicados após confirmação.",
  },
} as const;
