import { Star } from "@phosphor-icons/react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { homeContent } from "../config/content";
import { Reveal } from "../components/Reveal";
import { isMotionEnabled } from "../lib/design";

export function Proof() {
  const { proof } = homeContent;
  const items = proof.items;
  const [index, setIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { amount: 0.3 });
  const reduce = useReducedMotion() || !isMotionEnabled();
  const current = items[index];
  const total = items.length;

  useEffect(() => {
    if (total < 2 || reduce || !inView || hovered || focused) return;
    const readingTime = Math.max(9000, current.quote.split(/\s+/).length * 250);
    const timer = window.setTimeout(() => setIndex((value) => (value + 1) % total), readingTime);
    return () => window.clearTimeout(timer);
  }, [index, total, current, reduce, inView, hovered, focused]);

  return (
    <section ref={sectionRef} className="proof" aria-label="Feedbacks">
      <div className="wrap proof-grid">
        <Reveal className="proof-lead" from="left">
          <h2 className="display">{proof.title}</h2>
          <p className="proof-body">{proof.body}</p>
        </Reveal>

        {current ? (
          <Reveal delay={0.12} className="proof-carousel" from="right">
            <div className="stars" aria-label="5 de 5 no Google">
              {Array.from({ length: 5 }).map((_, star) => (
                <Star key={star} size={16} weight="fill" />
              ))}
            </div>
            <div
              className="proof-slides"
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
            >
              {items.map((item, slide) => (
                <motion.blockquote
                  className="proof-quote"
                  key={item.author}
                  aria-hidden={slide !== index}
                  initial={false}
                  animate={{ opacity: slide === index ? 1 : 0, y: reduce || slide === index ? 0 : 6 }}
                  transition={{ duration: reduce ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] }}
                >
                  <p>{item.quote}</p>
                  <footer>
                    <cite>{item.author}</cite>
                    <span>{item.source}</span>
                  </footer>
                </motion.blockquote>
              ))}
            </div>
            {total > 1 ? (
              <div
                className="proof-dots"
                role="group"
                aria-label="Escolher avaliação"
                onFocusCapture={() => setFocused(true)}
                onBlurCapture={(event) => {
                  if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false);
                }}
              >
                {items.map((item, dot) => (
                  <button
                    key={item.author}
                    type="button"
                    onClick={() => setIndex(dot)}
                    aria-label={`Avaliação ${dot + 1} de ${total}: ${item.author}`}
                    aria-current={dot === index ? "true" : undefined}
                  >
                    <span aria-hidden="true" />
                  </button>
                ))}
              </div>
            ) : null}
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}
