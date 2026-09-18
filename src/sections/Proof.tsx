import { CaretLeft, CaretRight, Star } from "@phosphor-icons/react";
import { useState } from "react";
import { homeContent } from "../config/content";
import { siteConfig } from "../config/site";
import { ButtonLink } from "../components/ButtonLink";
import { Reveal } from "../components/Reveal";

export function Proof() {
  const { proof } = homeContent;
  const items = proof.items;
  const [index, setIndex] = useState(0);
  const instagram = siteConfig.redesSociais.instagram;
  const current = items[index];
  const total = items.length;

  const go = (direction: -1 | 1) => {
    if (!total) return;
    setIndex((value) => (value + direction + total) % total);
  };

  return (
    <section className="proof" aria-label="Feedbacks">
      <div className="wrap proof-grid">
        <Reveal className="proof-lead" from="left">
          <h2 className="display">{proof.title}</h2>
          <p className="proof-body">{proof.body}</p>
          {instagram ? (
            <ButtonLink href={instagram} variant="ghost" target="_blank" rel="noreferrer">
              {proof.instagramCta}
            </ButtonLink>
          ) : null}
        </Reveal>

        {current ? (
          <Reveal delay={0.12} className="proof-carousel" from="right">
            <div className="stars" aria-label="5 de 5 no Google">
              {Array.from({ length: 5 }).map((_, star) => (
                <Star key={star} size={16} weight="fill" />
              ))}
            </div>
            <blockquote className="proof-quote" aria-live="polite">
              <p>{current.quote}</p>
              <footer>
                <cite>{current.author}</cite>
                <span>{current.source}</span>
              </footer>
            </blockquote>
            {total > 1 ? (
              <div className="proof-nav">
                <button type="button" onClick={() => go(-1)} aria-label="Anterior">
                  <CaretLeft size={16} />
                </button>
                <span>
                  {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                </span>
                <button type="button" onClick={() => go(1)} aria-label="Próximo">
                  <CaretRight size={16} />
                </button>
              </div>
            ) : null}
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}
