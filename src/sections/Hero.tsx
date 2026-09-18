import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { homeContent } from "../config/content";
import { siteConfig } from "../config/site";
import { getContactHref, getContactLabel, isContactExternal } from "../lib/cta";
import { isMotionEnabled } from "../lib/design";
import { ButtonLink } from "../components/ButtonLink";
import { Photo } from "../components/Photo";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const { hero } = homeContent;
  const contactHref = getContactHref();
  const contactLabel = getContactLabel();
  const contactExternal = isContactExternal();
  const reduce = useReducedMotion() || !isMotionEnabled();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const mediaY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);

  return (
    <section ref={sectionRef} className="hero is-bleed" id="topo" aria-label="Abertura">
      <motion.div className="hero-media" style={reduce ? undefined : { y: mediaY }}>
        <Photo
          src={hero.image.src}
          alt={hero.image.alt}
          width={hero.image.width}
          height={hero.image.height}
          objectPosition={hero.image.objectPosition}
          priority
        />
        <div className="hero-scrim-top" />
        <div className="hero-scrim-west" />
        <div className="hero-scrim-bottom" />
      </motion.div>

      <div className="hero-copy">
        <motion.div
          className="hero-copy-inner"
          initial={reduce ? "show" : "hidden"}
          animate="show"
          variants={{
            hidden: {},
            show: {
              transition: reduce ? { duration: 0 } : { staggerChildren: 0.12, delayChildren: 0.18 },
            },
          }}
        >
          {siteConfig.empresa.logoClaro ? (
            <motion.div
              className="hero-brand"
              aria-hidden="true"
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0, transition: { duration: 0.85, ease } },
              }}
            >
              <img
                src={siteConfig.empresa.logoClaro}
                alt=""
                width={575}
                height={523}
                decoding="async"
              />
            </motion.div>
          ) : null}
          <motion.h1
            className="display"
            variants={{
              hidden: { opacity: 0, y: 22 },
              show: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
            }}
          >
            {hero.lines.map((line) => (
              <span key={line.text + (line.emphasis ?? "")}>
                {line.text}
                {line.emphasis ? <em>{line.emphasis}</em> : null}
              </span>
            ))}
          </motion.h1>
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 18 },
              show: { opacity: 1, y: 0, transition: { duration: 0.75, ease } },
            }}
          >
            {hero.subtext}
          </motion.p>
          <motion.div
            className="hero-actions"
            variants={{
              hidden: { opacity: 0, y: 16 },
              show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
            }}
          >
            <ButtonLink href={hero.primaryCta.href}>{hero.primaryCta.texto}</ButtonLink>
            {contactHref ? (
              <ButtonLink
                href={contactHref}
                variant="ghost"
                target={contactExternal ? "_blank" : undefined}
                rel={contactExternal ? "noreferrer" : undefined}
              >
                {contactLabel}
              </ButtonLink>
            ) : null}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
