export type MediaImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  objectPosition?: string;
};

export type NavItem = {
  label: string;
  href: string;
  section: SectionKey;
};

export type SectionKey =
  | "hero"
  | "intro"
  | "transition"
  | "environments"
  | "philosophy"
  | "projects"
  | "materiality"
  | "execution"
  | "atmosphere"
  | "brandMark"
  | "film"
  | "commercial"
  | "proof"
  | "faq"
  | "showroom"
  | "qualifier"
  | "contact";

export type EnvironmentLayout = "split" | "bleed" | "overlap" | "overlay";

export type Environment = {
  id: string;
  name: string;
  index: string;
  text: string;
  body: string;
  href: string;
  layout: EnvironmentLayout;
  image: MediaImage;
  secondary?: MediaImage;
};

export type ProjectLayout = "signature" | "split" | "bleed";

export type Project = {
  id: string;
  title: string;
  category: string;
  blurb: string;
  layout: ProjectLayout;
  image: MediaImage;
  images?: MediaImage[];
};

export type MaterialItem = {
  id: string;
  label: string;
  image: MediaImage;
  detail?: MediaImage;
};

export type ProofTheme = {
  title: string;
  text: string;
};

export type Review = {
  author: string;
  role: string;
  quote: string;
  source: string;
  photos?: MediaImage[];
};

export type FilmVideo = {
  id: string;
  title: string;
  src: string;
  poster: string;
  width: number;
  height: number;
};

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

export type HeadlineLine = {
  text: string;
  emphasis?: string;
};

export type Preset = "architectural" | "contemporary" | "industrial";
export type RadiusScale = "sharp" | "soft";
export type DensityScale = "airy" | "regular";
export type HeroVariant = "media" | "split";
export type ProductsVariant = "signature" | "showcase";
export type ProjectsVariant = "editorial" | "grid";
