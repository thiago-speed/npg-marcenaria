import { ButtonLink } from "../components/ButtonLink";
import { Reveal } from "../components/Reveal";
import { Photo } from "../components/Photo";
import { homeContent } from "../config/content";
import { getContactHref } from "../lib/cta";
import { getWhatsAppLink } from "../lib/whatsapp";

export function Architects() {
  const { architects } = homeContent;
  const href = getWhatsAppLink(architects.message) || getContactHref();
  const external = href.startsWith("http");

  return (
    <section className="architects" id="arquitetos" aria-labelledby="architects-title">
      <div className="architects-background" aria-hidden="true">
        <Photo {...architects.background} />
      </div>
      <div className="architects-inner">
        <Reveal className="architects-copy">
          <h2 className="display" id="architects-title">{architects.title}</h2>
          <p>
            <span className="architects-text-full">{architects.body}</span>
            <span className="architects-text-mobile">{architects.mobileBody}</span>
          </p>
        </Reveal>
        <Reveal className="architects-support" delay={0.08}>
          {architects.items.map((item) => (
            <div key={item.title}>
              <h3>{item.title}</h3>
              <p>
                <span className="architects-text-full">{item.body}</span>
                <span className="architects-text-mobile">{item.mobileBody}</span>
              </p>
            </div>
          ))}
        </Reveal>
        <Reveal className="architects-cta" delay={0.12}>
          <ButtonLink
            href={href}
            target={external ? "_blank" : undefined}
            rel={external ? "noreferrer" : undefined}
          >
            {architects.cta}
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}
