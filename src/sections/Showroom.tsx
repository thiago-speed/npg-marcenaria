import { InstagramLogo } from "@phosphor-icons/react";
import { homeContent } from "../config/content";
import { siteConfig } from "../config/site";
import { ButtonLink } from "../components/ButtonLink";
import { Photo } from "../components/Photo";
import { Reveal } from "../components/Reveal";
import { getAddressLines, getMapsUrl, getSocialLinks } from "../lib/links";
import { getWhatsAppLink } from "../lib/whatsapp";

export function Showroom() {
  const instagram = getSocialLinks().find((item) => item.id === "instagram");
  const address = getAddressLines().filter((line) => line !== siteConfig.empresa.nome);

  return (
    <section className="chapter chapter-ivory chapter-light showroom" id="showroom">
      <div className="wrap showroom-grid">
        <Reveal>
          <div className="showroom-photo photo-frame">
            <Photo {...homeContent.showroom.image} />
          </div>
        </Reveal>
        <Reveal delay={0.08} className="showroom-copy">
          {homeContent.showroom.mall ? (
            <p className="showroom-mall">{homeContent.showroom.mall}</p>
          ) : null}
          <h2 className="display">{homeContent.showroom.title}</h2>
          <p>{homeContent.showroom.text}</p>
          {instagram ? (
            <a
              className="showroom-instagram"
              href={instagram.href}
              target="_blank"
              rel="noreferrer"
            >
              <InstagramLogo size={22} weight="regular" />
              <span>{instagram.label}</span>
            </a>
          ) : null}
          <address>
            {address.map((line) => (
              <span key={line}>
                {line}
                <br />
              </span>
            ))}
          </address>
          <div className="showroom-actions">
            <ButtonLink href={getMapsUrl()} target="_blank" rel="noreferrer">
              {homeContent.showroom.ctaMaps}
            </ButtonLink>
            <ButtonLink
              href={getWhatsAppLink()}
              variant="ghost"
              target="_blank"
              rel="noreferrer"
            >
              {homeContent.showroom.ctaWhatsapp}
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
