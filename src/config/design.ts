import type {
  DensityScale,
  HeroVariant,
  Preset,
  ProductsVariant,
  ProjectsVariant,
  RadiusScale,
  SectionKey,
} from "./types.ts";

const mineralTokens: Record<string, string> = {
  "--font-sans": '"Outfit Variable", Outfit, sans-serif',
  "--font-display": '"Outfit Variable", Outfit, sans-serif',
  "--color-ink": "#161411",
  "--color-charcoal": "#12151a",
  "--color-ivory": "#f3f5f3",
  "--color-stone": "#e7e2da",
  "--color-taupe": "#6b645c",
  "--color-bronze": "#53826d",
  "--color-wood": "#4a3f35",
  "--color-background": "#f3f5f3",
  "--color-surface": "#ebe6de",
  "--color-foreground": "#161411",
  "--color-muted": "#6b645c",
  "--color-accent": "#53826d",
  "--color-accent-strong": "#456c5b",
  "--color-signal": "#53826d",
  "--color-border": "#16141122",
  "--color-chapter-ink": "#12151a",
  "--color-chapter-philosophy": "#f3f5f3",
  "--color-chapter-stone-bg": "#e7e2da",
  "--radius": "4px",
  "--radius-media": "16px",
  "--section-y": "7.5rem",
};

export const presetDefaults: Record<
  Preset,
  {
    radius: RadiusScale;
    density: DensityScale;
    hero: HeroVariant;
    products: ProductsVariant;
    projects: ProjectsVariant;
  }
> = {
  architectural: {
    radius: "sharp",
    density: "airy",
    hero: "media",
    products: "signature",
    projects: "editorial",
  },
  contemporary: {
    radius: "sharp",
    density: "airy",
    hero: "media",
    products: "showcase",
    projects: "editorial",
  },
  industrial: {
    radius: "sharp",
    density: "regular",
    hero: "media",
    products: "showcase",
    projects: "grid",
  },
};

export const presetTokens: Record<Preset, Record<string, string>> = {
  architectural: { ...mineralTokens },
  contemporary: { ...mineralTokens },
  industrial: { ...mineralTokens, "--section-y": "5.25rem" },
};

export const designConfig = {
  preset: "contemporary" as Preset,

  radius: "sharp" as RadiusScale | undefined,
  density: "airy" as DensityScale | undefined,
  hero: "media" as HeroVariant | undefined,
  products: "showcase" as ProductsVariant | undefined,
  projects: "editorial" as ProjectsVariant | undefined,

  colors: {
    accent: "#53826d",
    signal: "#53826d",
  },

  motion: {
    enabled: true,
    intensity: 6,
  },

  sections: {
    hero: true,
    intro: true,
    transition: false,
    environments: false,
    philosophy: true,
    projects: true,
    materiality: true,
    execution: true,
    atmosphere: true,
    brandMark: false,
    film: false,
    commercial: false,
    proof: true,
    faq: false,
    showroom: false,
    qualifier: false,
    contact: true,
  } satisfies Record<SectionKey, boolean>,
};

export function resolvedDesign() {
  const base = presetDefaults[designConfig.preset];

  return {
    preset: designConfig.preset,
    radius: designConfig.radius ?? base.radius,
    density: designConfig.density ?? base.density,
    hero: designConfig.hero ?? base.hero,
    products: designConfig.products ?? base.products,
    projects: designConfig.projects ?? base.projects,
    motion: designConfig.motion,
    sections: designConfig.sections,
    colors: designConfig.colors,
  };
}
