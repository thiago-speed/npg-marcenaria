import { homeContent } from "../config/content";
import { siteConfig } from "../config/site";
import { getWhatsAppLink } from "./whatsapp";

export function hasWhatsApp() {
  return Boolean(siteConfig.contato.whatsapp.replace(/\D/g, ""));
}

export function getContactHref() {
  if (hasWhatsApp()) return getWhatsAppLink();
  if (siteConfig.redesSociais.instagram) return siteConfig.redesSociais.instagram;
  return "#contato";
}

export function getContactLabel() {
  return homeContent.headerCta;
}

export function isContactExternal() {
  return getContactHref().startsWith("http");
}
