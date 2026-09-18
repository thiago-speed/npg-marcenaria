import { InstagramLogo } from "@phosphor-icons/react";
import { siteConfig } from "../config/site";
import { homeContent } from "../config/content";
import { getAddressLines, getEmailLink, getPhoneLink, getSocialLinks } from "../lib/links";
import { getVisibleNav } from "../lib/navigation";
import { hasWhatsApp } from "../lib/cta";
import { getWhatsAppLink } from "../lib/whatsapp";
import { Reveal } from "./Reveal";
import { Logo } from "./Logo";

export function SiteFooter() {
  const nav = getVisibleNav();
  const social = getSocialLinks();
  const phone = getPhoneLink();
  const email = getEmailLink();
  const instagram = social.find((item) => item.id === "instagram");
  const whatsapp = hasWhatsApp() ? getWhatsAppLink() : "";

  return (
    <footer className="site-footer is-close" id="rodape">
      <Reveal>
      <div className="wrap footer-grid">
        <div className="footer-brand">
          <Logo inverted />
          <p>
            {getAddressLines().map((line) => (
              <span key={line}>
                {line}
                <br />
              </span>
            ))}
          </p>
          {phone ? (
            <a href={phone}>{siteConfig.contato.telefone}</a>
          ) : null}
          {email ? <a href={email}>{siteConfig.contato.email}</a> : null}
        </div>

        <nav className="footer-links" aria-label="Rodapé">
          {nav.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="footer-contact">
          {instagram ? (
            <a
              className="footer-social"
              href={instagram.href}
              target="_blank"
              rel="noreferrer"
            >
              <InstagramLogo size={18} weight="regular" />
              <span>{instagram.label}</span>
            </a>
          ) : null}
          {social
            .filter((item) => item.id !== "instagram")
            .map((item) => (
              <a
                key={item.id}
                className="footer-social"
                href={item.href}
                target="_blank"
                rel="noreferrer"
              >
                <span>{item.label}</span>
              </a>
            ))}
          {whatsapp ? (
            <a
              className="footer-social"
              href={whatsapp}
              target="_blank"
              rel="noreferrer"
            >
              <span>{homeContent.footer.whatsappLabel}</span>
            </a>
          ) : null}
        </div>
      </div>
      <p className="wrap disclaimer">{homeContent.footer.disclaimer}</p>
      </Reveal>
    </footer>
  );
}
