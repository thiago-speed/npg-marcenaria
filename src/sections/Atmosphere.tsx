import { useReducedMotion } from "motion/react";
import { homeContent } from "../config/content";
import { isMotionEnabled } from "../lib/design";
import { ButtonLink } from "../components/ButtonLink";
import { Reveal } from "../components/Reveal";

export function Atmosphere() {
  const { atmosphere } = homeContent;
  const reduce = useReducedMotion() || !isMotionEnabled();
  const media = reduce ? atmosphere.still : atmosphere.gif;

  return (
    <section className="atmosphere" aria-label={atmosphere.title}>
      <div className="wrap atmosphere-grid">
        <Reveal className="atmosphere-copy" from="left">
          <h2 className="display">{atmosphere.title}</h2>
          <p>{atmosphere.text}</p>
        </Reveal>
        <Reveal delay={0.12} className="atmosphere-media" from="zoom">
          <div className="photo-frame">
            <img
              src={media.src}
              alt={media.alt}
              width={media.width}
              height={media.height}
              loading="lazy"
              decoding="async"
            />
          </div>
        </Reveal>
        <Reveal delay={0.18} className="atmosphere-cta" from="up">
          <ButtonLink href="#contato" variant="ghost">
            {atmosphere.cta}
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}
