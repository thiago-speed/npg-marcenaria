import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "motion/react";
import { useLenis } from "lenis/react";
import { useEffect, useId, useState } from "react";
import { siteConfig } from "../config/site";
import { isMotionEnabled } from "../lib/design";
import { getVisibleNav } from "../lib/navigation";
import { getContactHref, getContactLabel, isContactExternal } from "../lib/cta";
import { ButtonLink } from "./ButtonLink";
import { Logo } from "./Logo";

export function SiteHeader() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion() || !isMotionEnabled();
  const titleId = useId();
  const { scrollY } = useScroll();
  const lenis = useLenis();
  const nav = getVisibleNav();
  const contactHref = getContactHref();
  const contactLabel = getContactLabel();
  const contactExternal = isContactExternal();

  useMotionValueEvent(scrollY, "change", (value) => {
    setSolid(value > 72);
  });

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    lenis?.stop();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      lenis?.start();
      window.removeEventListener("keydown", onKey);
    };
  }, [open, lenis]);

  const close = () => setOpen(false);

  return (
    <>
      <motion.header
        className={`site-header${solid || open ? " is-solid" : " is-over-media"}`}
        initial={reduce ? false : { opacity: 0, y: -14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="site-header-inner">
          <a href="#topo" aria-label={siteConfig.empresa.nome}>
            <Logo inverted={!(solid || open)} />
          </a>

          <nav className="nav-desktop" aria-label="Principal">
            {nav.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
            {contactHref ? (
              <ButtonLink
                href={contactHref}
                target={contactExternal ? "_blank" : undefined}
                rel={contactExternal ? "noreferrer" : undefined}
              >
                {contactLabel}
              </ButtonLink>
            ) : null}
          </nav>

          <button
            className="menu-toggle"
            type="button"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((value) => !value)}
          >
            <span className="sr-only">{open ? "Fechar menu" : "Abrir menu"}</span>
            <span className="menu-toggle-bars" aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open ? (
          <motion.nav
            id="mobile-nav"
            className="mobile-nav"
            data-lenis-prevent
            aria-labelledby={titleId}
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
          >
            <p id={titleId} className="sr-only">
              Menu
            </p>
            {nav.map((item, index) => (
              <motion.a
                key={item.href}
                href={item.href}
                onClick={close}
                initial={reduce ? false : { opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.08 + index * 0.06,
                  ease: [0.32, 0.72, 0, 1],
                }}
              >
                {item.label}
              </motion.a>
            ))}
            {contactHref ? (
              <ButtonLink
                href={contactHref}
                target={contactExternal ? "_blank" : undefined}
                rel={contactExternal ? "noreferrer" : undefined}
                onClick={close}
              >
                {contactLabel}
              </ButtonLink>
            ) : null}
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </>
  );
}
