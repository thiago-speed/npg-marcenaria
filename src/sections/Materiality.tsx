import { AnimatePresence, motion, useAnimationFrame, useInView, useMotionValue, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState, type PointerEvent } from "react";
import { homeContent } from "../config/content";
import { siteConfig } from "../config/site";
import { isMotionEnabled } from "../lib/design";
import { wrapCarouselOffset } from "../lib/carousel";
import { Photo } from "../components/Photo";
import { Reveal } from "../components/Reveal";
import { DetailLightbox } from "../components/DetailLightbox";

export function Materiality() {
  const { materiality } = homeContent;
  const reduce = useReducedMotion() || !isMotionEnabled();
  const viewport = useRef<HTMLDivElement>(null);
  const group = useRef<HTMLDivElement>(null);
  const groupWidth = useRef(0);
  const drag = useRef<{
    id: number;
    startX: number;
    startY: number;
    lastX: number;
    active: boolean;
    moved: boolean;
  } | null>(null);
  const resumeAt = useRef(0);
  const suppressClickUntil = useRef(0);
  const [dragging, setDragging] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const inView = useInView(viewport, { margin: "200px" });
  const x = useMotionValue(0);

  useEffect(() => {
    const element = group.current;
    if (!element) return;
    const measure = () => {
      groupWidth.current = element.getBoundingClientRect().width;
      x.set(wrapCarouselOffset(x.get(), groupWidth.current));
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    return () => observer.disconnect();
  }, [x]);

  useAnimationFrame((_, delta) => {
    if (reduce || !inView || selectedIndex !== null || drag.current || performance.now() < resumeAt.current) return;
    x.set(wrapCarouselOffset(
      x.get() - (groupWidth.current / 140000) * Math.min(delta, 50),
      groupWidth.current,
    ));
  });

  const startDrag = (event: PointerEvent<HTMLDivElement>) => {
    if (drag.current || (event.pointerType === "mouse" && event.button !== 0)) return;
    drag.current = {
      id: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      lastX: event.clientX,
      active: false,
      moved: false,
    };
    const target = event.target instanceof Element
      ? event.target.closest<HTMLElement>(".materiality-photo")
      : null;
    (target ?? event.currentTarget).setPointerCapture(event.pointerId);
  };

  const moveDrag = (event: PointerEvent<HTMLDivElement>) => {
    const pointer = drag.current;
    if (!pointer || pointer.id !== event.pointerId) return;
    const totalX = event.clientX - pointer.startX;
    const totalY = event.clientY - pointer.startY;
    if (Math.hypot(totalX, totalY) >= 5) {
      pointer.moved = true;
      suppressClickUntil.current = Infinity;
    }
    if (!pointer.active) {
      if (Math.abs(totalX) < 5 || Math.abs(totalX) < Math.abs(totalY)) return;
      pointer.active = true;
      setDragging(true);
    }
    x.set(wrapCarouselOffset(x.get() + event.clientX - pointer.lastX, groupWidth.current));
    pointer.lastX = event.clientX;
  };

  const endDrag = (event: PointerEvent<HTMLDivElement>) => {
    if (drag.current?.id !== event.pointerId) return;
    if (drag.current.moved) suppressClickUntil.current = performance.now() + 250;
    drag.current = null;
    setDragging(false);
    resumeAt.current = performance.now() + 1200;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  return (
    <section className="materiality is-carousel" aria-labelledby="materiality-title">
      <div className="wrap">
        <Reveal className="materiality-head">
          <div className="materiality-heading-copy">
            <h2 className="display" id="materiality-title">{materiality.title}</h2>
            <p className="materiality-lead">{materiality.body}</p>
          </div>
          <img
            className="materiality-logo"
            src={siteConfig.empresa.logo}
            alt={siteConfig.empresa.nome}
            width={575}
            height={523}
            loading="lazy"
            decoding="async"
          />
        </Reveal>
      </div>
      <div
        ref={viewport}
        className={`materiality-viewport${dragging ? " is-dragging" : ""}`}
        role="region"
        aria-label="Fotos de detalhes da marcenaria. Arraste ou use as setas do teclado para explorar."
        tabIndex={0}
        onPointerDown={startDrag}
        onPointerMove={moveDrag}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onLostPointerCapture={endDrag}
        onDragStart={(event) => event.preventDefault()}
        onClickCapture={(event) => {
          if (event.detail > 0 && performance.now() < suppressClickUntil.current) {
            event.preventDefault();
            event.stopPropagation();
          }
        }}
        onKeyDown={(event) => {
          if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
          event.preventDefault();
          const direction = event.key === "ArrowLeft" ? 1 : -1;
          x.set(wrapCarouselOffset(
            x.get() + direction * groupWidth.current / materiality.items.length,
            groupWidth.current,
          ));
          resumeAt.current = performance.now() + 1200;
        }}
      >
        <motion.div className="materiality-track" style={{ x }}>
          {[0, 1, 2].map((copy) => (
            <div
              ref={copy === 0 ? group : undefined}
              className="materiality-group"
              key={copy}
              aria-hidden={copy > 0 ? true : undefined}
            >
              {materiality.items.map((item, index) => (
                <figure className="materiality-slide" key={item.id}>
                  <button
                    type="button"
                    className="materiality-photo"
                    aria-label={`Ampliar foto: ${item.label}`}
                    aria-haspopup="dialog"
                    tabIndex={copy > 0 ? -1 : 0}
                    onClick={() => setSelectedIndex(index)}
                    onFocus={(event) => {
                      if (!event.currentTarget.matches(":focus-visible")) return;
                      x.set(wrapCarouselOffset(-index * groupWidth.current / materiality.items.length, groupWidth.current));
                      if (viewport.current) viewport.current.scrollLeft = 0;
                      resumeAt.current = Infinity;
                    }}
                    onBlur={() => { resumeAt.current = performance.now() + 1200; }}
                  >
                    <Photo
                      {...item.image}
                      alt={copy > 0 ? "" : item.image.alt}
                      loading={inView ? "eager" : "lazy"}
                    />
                  </button>
                  <figcaption>{item.label}</figcaption>
                </figure>
              ))}
            </div>
          ))}
        </motion.div>
      </div>
      <AnimatePresence>
        {selectedIndex !== null ? (
          <DetailLightbox
            key="materiality-lightbox"
            item={materiality.items[selectedIndex]}
            index={selectedIndex}
            total={materiality.items.length}
            onClose={() => {
              setSelectedIndex(null);
              resumeAt.current = performance.now() + 1200;
            }}
            onNavigate={(direction) => setSelectedIndex((current) =>
              ((current ?? 0) + direction + materiality.items.length) % materiality.items.length,
            )}
          />
        ) : null}
      </AnimatePresence>
    </section>
  );
}
