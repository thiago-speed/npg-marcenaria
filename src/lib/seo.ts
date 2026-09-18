import { siteConfig } from "../config/site";

export function getJsonLd() {
  const { empresa, seo, redesSociais } = siteConfig;

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: empresa.nome,
    description: seo.descricao,
    image: seo.imagemCompartilhamento,
    sameAs: redesSociais.instagram ? [redesSociais.instagram] : undefined,
  };
}
