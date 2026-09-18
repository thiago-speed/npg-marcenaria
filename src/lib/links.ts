import { siteConfig } from "../config/site";

export function getPhoneLink() {
  const digits = siteConfig.contato.telefoneDigitos.replace(/\D/g, "");
  return digits ? `tel:+${digits}` : "";
}

export function getEmailLink() {
  return siteConfig.contato.email ? `mailto:${siteConfig.contato.email}` : "";
}

export function getMapsUrl() {
  if (siteConfig.contato.mapsUrl) return siteConfig.contato.mapsUrl;
  if (!siteConfig.contato.endereco) return "";

  const query = [
    siteConfig.contato.endereco,
    siteConfig.contato.bairro,
    `${siteConfig.contato.cidade} - ${siteConfig.contato.estado}`,
    siteConfig.contato.cep,
  ]
    .filter(Boolean)
    .join(", ");

  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

export function getAddressLines() {
  const { empresa } = siteConfig;
  const { endereco, bairro, cidade, estado, cep } = siteConfig.contato;

  return [
    empresa.nome,
    endereco,
    bairro,
    [cidade, estado].filter(Boolean).join(" - "),
    cep,
  ].filter((line) => line && line !== "00000-000");
}

type SocialKey = "instagram" | "facebook" | "linkedin" | "pinterest";

export function getSocialLinks() {
  const redes = siteConfig.redesSociais;
  const items: { id: SocialKey; href: string; label: string }[] = [];

  if (redes.instagram) {
    items.push({
      id: "instagram",
      href: redes.instagram,
      label: redes.instagramHandle || "Instagram",
    });
  }
  if (redes.facebook) {
    items.push({ id: "facebook", href: redes.facebook, label: "Facebook" });
  }
  if (redes.linkedin) {
    items.push({ id: "linkedin", href: redes.linkedin, label: "LinkedIn" });
  }
  if (redes.pinterest) {
    items.push({ id: "pinterest", href: redes.pinterest, label: "Pinterest" });
  }

  return items;
}
