import { ArrowUpRight, InstagramLogo } from "@phosphor-icons/react";
import { siteConfig } from "../config/site";
import { homeContent } from "../config/content";
import { getVisibleNav } from "../lib/navigation";
import { getWhatsAppLink } from "../lib/whatsapp";
import { Reveal } from "./Reveal";

export function SiteFooter() {
  const { empresa, contato, espacos, redesSociais } = siteConfig;
  const { footer } = homeContent;

  return (
    <footer className="site-footer is-close is-updated" id="rodape">
      <Reveal>
        <div className="wrap footer-grid">
          <div className="footer-brand">
            <a className="footer-logo" href="#topo" aria-label={`${empresa.nome}: início`}>
              <img src={empresa.logoNavbar} alt={empresa.nome} width={160} height={50} loading="lazy" />
            </a>
            <p>{footer.description}</p>
            <a className="footer-social" href={redesSociais.instagram} target="_blank" rel="noreferrer">
              <InstagramLogo size={18} aria-hidden="true" />
              <span>{redesSociais.instagramHandle}</span>
            </a>
          </div>
          <nav className="footer-links" aria-label="Rodapé">
            <h2 className="footer-heading">{footer.navigationTitle}</h2>
            {getVisibleNav().map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}
            <a href="#espacos">{footer.locationsTitle}</a>
          </nav>
          <div className="footer-locations">
            <h2 className="footer-heading">{footer.locationsTitle}</h2>
            {espacos.map((location) => (
              <address key={location.id}>
                <strong>{location.nome} · {location.localidade}</strong>
                <span>{location.endereco}</span>
                <span>{location.complemento}</span>
              </address>
            ))}
          </div>
          <div className="footer-contact">
            <h2 className="footer-heading">{footer.contactTitle}</h2>
            <a className="footer-contact-link" href={getWhatsAppLink()} target="_blank" rel="noreferrer">
              <span>{footer.commercialLabel}<strong>{contato.telefone}</strong></span>
              <ArrowUpRight size={17} aria-hidden="true" />
            </a>
            <a className="footer-contact-link" href={`https://wa.me/${contato.suporte.whatsapp}`} target="_blank" rel="noreferrer">
              <span>{footer.supportLabel}<strong>{contato.suporte.telefone}</strong></span>
              <ArrowUpRight size={17} aria-hidden="true" />
            </a>
          </div>
        </div>
        <div className="wrap footer-bottom">
          <p>© {new Date().getFullYear()} {empresa.nome}. {footer.rights}</p>
          <a href="#topo">{footer.backToTop}<ArrowUpRight size={15} aria-hidden="true" /></a>
        </div>
      </Reveal>
    </footer>
  );
}
