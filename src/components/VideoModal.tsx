import { X } from "@phosphor-icons/react";
import { useEffect, useRef } from "react";
import type { FilmVideo } from "../config/types";

type VideoModalProps = {
  video: FilmVideo | null;
  onClose: () => void;
};

export function VideoModal({ video, onClose }: VideoModalProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!video) return;

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();

      if (event.key !== "Tab" || !dialogRef.current) return;
      const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
        "button, video, a[href]",
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [video, onClose]);

  if (!video) return null;

  return (
    <div
      className="modal"
      role="presentation"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        className="modal-frame"
        role="dialog"
        aria-modal="true"
        aria-label={video.title}
      >
        <button
          ref={closeRef}
          className="modal-close"
          type="button"
          onClick={onClose}
        >
          Fechar
          <X size={18} weight="light" aria-hidden="true" />
        </button>
        <video
          src={video.src}
          poster={video.poster}
          controls
          autoPlay
          playsInline
          width={video.width}
          height={video.height}
        />
      </div>
    </div>
  );
}
