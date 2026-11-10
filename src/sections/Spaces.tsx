import { ArrowUpRight, Buildings, Factory, ImageSquare } from "@phosphor-icons/react";
import { useState } from "react";
import { homeContent } from "../config/content";
import { siteConfig } from "../config/site";
import { getWhatsAppLink } from "../lib/whatsapp";
import { Reveal } from "../components/Reveal";
import { Photo } from "../components/Photo";

export function Spaces() {
  const { spaces } = homeContent;
  const { contato, espacos } = siteConfig;
  const [active, setActive] = useState<string>(espacos[0].id);

  return (
    <section className="spaces" id="espacos" aria-labelledby="spaces-title">
      <div className="wrap">
        <Reveal className="spaces-lead">
          <h2 className="display" id="spaces-title">{spaces.title}</h2>
          <p>{spaces.introduction}</p>
        </Reveal>
        <div className="spaces-tabs" role="group" aria-label="Escolher unidade">
          {espacos.map((space) => (
            <button
              key={space.id}
              type="button"
              aria-pressed={active === space.id}
              aria-controls={`location-${space.id}`}
              onClick={() => setActive(space.id)}
            >
              {space.nome}
            </button>
          ))}
        </div>
        <div className="spaces-grid">
          {espacos.map((space, index) => {
            const query = [space.endereco, space.localidade, space.cep, "Brasil"].join(", ");
            const embedHref = `https://www.google.com/maps?q=${encodeURIComponent(query)}&z=16&hl=pt-BR&output=embed`;
            const details = spaces.locations[space.id];
            const SpaceIcon = space.id === "fabrica" ? Factory : Buildings;

            return (
              <Reveal className={`space-location${active === space.id ? " is-active" : ""}`} key={space.id} delay={index * 0.08}>
                <article id={`location-${space.id}`} aria-labelledby={`space-${space.id}`}>
                  <div className="space-photo">
                    {details.image ? (
                      <Photo {...details.image} />
                    ) : (
                      <div className="space-photo-placeholder">
                        <ImageSquare size={36} weight="light" aria-hidden="true" />
                        <span>{details.photoPlaceholder}</span>
                      </div>
                    )}
                  </div>
                  <div className="space-content">
                    <div className="space-heading">
                      <h3 id={`space-${space.id}`}>{space.nome}</h3>
                      <SpaceIcon size={32} weight="light" aria-hidden="true" />
                    </div>
                    <p className="space-description">{details.description}</p>
                    <address>
                      <strong>{space.localidade}</strong>
                      <span>{space.endereco}</span>
                      <span>{space.complemento}</span>
                      <span>CEP {space.cep}</span>
                    </address>
                    <div className="space-map">
                      <iframe
                        title={`Localização da ${space.id === "fabrica" ? "fábrica" : "unidade de escritório"} da NPG`}
                        src={embedHref}
                        width="320"
                        height="200"
                        loading="lazy"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                      />
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
        <Reveal className="spaces-details">
          <div className="spaces-contact">
            <h3>{spaces.contactsTitle}</h3>
            <div className="spaces-phones">
              <a href={getWhatsAppLink()} target="_blank" rel="noreferrer">
                <span className="spaces-contact-label">
                  {spaces.commercialLabel}
                  <ArrowUpRight size={14} weight="light" aria-hidden="true" />
                </span>
                <strong>{contato.telefone}</strong>
              </a>
              <a href={`https://wa.me/${contato.suporte.whatsapp}`} target="_blank" rel="noreferrer">
                <span className="spaces-contact-label">
                  {spaces.supportLabel}
                  <ArrowUpRight size={14} weight="light" aria-hidden="true" />
                </span>
                <strong>{contato.suporte.telefone}</strong>
              </a>
            </div>
          </div>
          <div className="spaces-hours">
            <h3>{spaces.hoursTitle}</h3>
            <dl>
              {spaces.hours.map((schedule) => (
                <div className="spaces-hour" key={schedule.days}>
                  <dt>{schedule.days}</dt>
                  <dd>{schedule.time}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
