import { siteConfig } from "../config/site";

export function getWhatsAppLink(message?: string) {
  const phone = siteConfig.contato.whatsapp.replace(/\D/g, "");
  if (!phone) return "";

  const text = encodeURIComponent(
    message?.trim() || siteConfig.contato.mensagemPadrao,
  );
  return `https://wa.me/${phone}?text=${text}`;
}

export function getWhatsAppLinkFromQualifier(options?: {
  environment?: string;
  timing?: string;
}) {
  const lines = [siteConfig.contato.mensagemPadrao];

  if (options?.environment) {
    lines.push("", `Ambiente: ${options.environment}`);
  }

  if (options?.timing) {
    lines.push(`Previsão: ${options.timing}`);
  }

  return getWhatsAppLink(lines.join("\n"));
}
