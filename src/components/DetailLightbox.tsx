import { CaretLeft, CaretRight, X } from "@phosphor-icons/react";
import { AnimatePresence, motion, useIsPresent, useReducedMotion } from "motion/react";
import { useLenis } from "lenis/react";
import { useEffect, useId, useRef } from "react";
import { createPortal } from "react-dom";
import type { MaterialItem } from "../config/types";
import { isMotionEnabled } from "../lib/design";
import { ZoomableDetailPhoto } from "./ZoomableDetailPhoto";

type DetailLightboxProps = {
  item: MaterialItem;
  index: number;
  total: number;
  onClose: () => void;
  onNavigate: (direction: -1 | 1) => void;
};

export function DetailLightbox({ item, index, total, onClose, onNavigate }: DetailLightboxProps) {
  const dialog = useRef<HTMLDialogElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const titleId = useId();
  const lenis = useLenis();
  const present = useIsPresent();
  const reduce = useReducedMotion() || !isMotionEnabled();

  useEffect(() => {
    const element = dialog.current;
    if (!element) return;
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.documentElement.style.overflow;
    const previousGutter = document.documentElement.style.scrollbarGutter;
    const wasStopped = lenis?.isStopped;
    document.documentElement.style.overflow = "hidden";
    document.documentElement.style.scrollbarGutter = "stable";
    lenis?.stop();
    element.showModal();
    closeButton.current?.focus({ preventScroll: true });

    return () => {
      element.close();
      document.documentElement.style.overflow = previousOverflow;
      document.documentElement.style.scrollbarGutter = previousGutter;
      if (!wasStopped) lenis?.start();
      if (previousFocus?.isConnected) previousFocus.focus({ preventScroll: true });
    };
  }, [lenis]);

  return createPortal(
    <motion.dialog
      ref={dialog}
      className={`detail-lightbox${present ? "" : " is-closing"}`}
      aria-labelledby={titleId}
      initial={{ opacity: reduce ? 1 : 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduce ? 0 : 0.22, ease: [0.22, 1, 0.36, 1] }}
      onCancel={(event) => { event.preventDefault(); onClose(); }}
      onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
          event.preventDefault();
          onNavigate(event.key === "ArrowLeft" ? -1 : 1);
        }
      }}
      data-lenis-prevent
    >
      <div className="detail-lightbox-shell">
        <div className="detail-lightbox-toolbar">
          <button ref={closeButton} type="button" onClick={onClose} aria-label="Fechar foto ampliada">
            <span>Fechar</span>
            <X size={20} weight="light" aria-hidden="true" />
          </button>
        </div>
        <div
          className="detail-lightbox-picture"
          onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}
        >
          <AnimatePresence mode="wait" initial={false}>
            <ZoomableDetailPhoto
              key={item.id}
              item={item}
              reduce={reduce}
              onClose={onClose}
            />
          </AnimatePresence>
        </div>
        <div className="detail-lightbox-footer">
          <p id={titleId}>{item.label}</p>
          <div className="detail-lightbox-nav" role="group" aria-label="Navegar entre detalhes">
            <button type="button" onClick={() => onNavigate(-1)} aria-label="Foto anterior">
              <CaretLeft size={20} weight="light" aria-hidden="true" />
            </button>
            <span aria-live="polite" aria-atomic="true">{index + 1} / {total}</span>
            <button type="button" onClick={() => onNavigate(1)} aria-label="Próxima foto">
              <CaretRight size={20} weight="light" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </motion.dialog>,
    document.body,
  );
}
