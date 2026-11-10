import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useCallback, useEffect, useRef, useState, type PointerEvent } from "react";
import type { MaterialItem } from "../config/types";
import { clampPan, clampZoom, getImagePanBounds } from "../lib/image-zoom";

const spring = { stiffness: 450, damping: 42, mass: 0.6 };

export function ZoomableDetailPhoto({ item, reduce, onClose }: {
  item: MaterialItem;
  reduce: boolean;
  onClose: () => void;
}) {
  const viewport = useRef<HTMLDivElement>(null);
  const pointer = useRef<{ id: number; x: number; y: number } | null>(null);
  const [panning, setPanning] = useState(false);
  const scale = useMotionValue(1);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const smoothScale = useSpring(scale, spring);
  const smoothX = useSpring(x, spring);
  const smoothY = useSpring(y, spring);
  const cursor = useTransform(scale, (zoom) => zoom > 1 ? "grab" : "zoom-in");
  const touchAction = useTransform(scale, (zoom) => zoom > 1 ? "none" : "pan-y pinch-zoom");

  const constrain = useCallback((nextX: number, nextY: number, zoom: number) => {
    const rect = viewport.current?.getBoundingClientRect();
    if (!rect) return;
    const bounds = getImagePanBounds(rect.width, rect.height, item.image.width, item.image.height, zoom);
    x.set(clampPan(nextX, bounds.x));
    y.set(clampPan(nextY, bounds.y));
  }, [item.image.width, item.image.height, x, y]);

  const zoomTo = useCallback((value: number, clientX?: number, clientY?: number) => {
    const rect = viewport.current?.getBoundingClientRect();
    if (!rect) return;
    const next = clampZoom(value);
    const ratio = next / scale.get();
    const anchorX = clientX === undefined ? 0 : clientX - rect.left - rect.width / 2;
    const anchorY = clientY === undefined ? 0 : clientY - rect.top - rect.height / 2;
    constrain(anchorX - (anchorX - x.get()) * ratio, anchorY - (anchorY - y.get()) * ratio, next);
    scale.set(next);
  }, [scale, x, y, constrain]);

  useEffect(() => {
    const element = viewport.current;
    if (!element) return;
    const wheel = (event: WheelEvent) => {
      event.preventDefault();
      event.stopPropagation();
      const unit = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? element.clientHeight : 1;
      zoomTo(scale.get() * Math.exp(-event.deltaY * unit * 0.0015), event.clientX, event.clientY);
    };
    element.addEventListener("wheel", wheel, { passive: false });
    const observer = new ResizeObserver(() => constrain(x.get(), y.get(), scale.get()));
    observer.observe(element);
    return () => {
      element.removeEventListener("wheel", wheel);
      observer.disconnect();
    };
  }, [scale, x, y, constrain, zoomTo]);

  const endPan = (event: PointerEvent<HTMLDivElement>) => {
    if (pointer.current?.id !== event.pointerId) return;
    pointer.current = null;
    setPanning(false);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
  };

  return (
    <motion.div
      ref={viewport}
      className="detail-lightbox-zoom"
      role="group"
      aria-label="Foto ampliada. Use a roda do mouse ou as teclas mais e menos para ajustar o zoom. Zero restaura a foto inteira."
      tabIndex={0}
      style={{ cursor: panning ? "grabbing" : cursor, touchAction }}
      initial={{ opacity: reduce ? 1 : 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduce ? 0 : 0.16 }}
      onDragStart={(event) => event.preventDefault()}
      onDoubleClick={(event) => zoomTo(scale.get() > 1 ? 1 : 2, event.clientX, event.clientY)}
      onKeyDown={(event) => {
        if (!["+", "=", "-", "0"].includes(event.key)) return;
        event.preventDefault();
        event.stopPropagation();
        zoomTo(event.key === "0" ? 1 : scale.get() * (event.key === "-" ? 1 / 1.25 : 1.25));
      }}
      onPointerDown={(event) => {
        if (scale.get() <= 1 || event.button !== 0) return;
        event.preventDefault();
        event.currentTarget.focus({ preventScroll: true });
        pointer.current = { id: event.pointerId, x: event.clientX, y: event.clientY };
        event.currentTarget.setPointerCapture(event.pointerId);
        setPanning(true);
      }}
      onPointerMove={(event) => {
        const active = pointer.current;
        if (!active || active.id !== event.pointerId) return;
        constrain(x.get() + event.clientX - active.x, y.get() + event.clientY - active.y, scale.get());
        active.x = event.clientX;
        active.y = event.clientY;
      }}
      onPointerUp={endPan}
      onPointerCancel={endPan}
      onLostPointerCapture={endPan}
      onClick={(event) => {
        if (scale.get() > 1) return;
        const rect = event.currentTarget.getBoundingClientRect();
        const fit = Math.min(rect.width / item.image.width, rect.height / item.image.height);
        if (Math.abs(event.clientX - rect.left - rect.width / 2) > item.image.width * fit / 2
          || Math.abs(event.clientY - rect.top - rect.height / 2) > item.image.height * fit / 2) onClose();
      }}
    >
      <motion.img
        src={item.image.src}
        alt={item.image.alt}
        width={item.image.width}
        height={item.image.height}
        decoding="async"
        draggable={false}
        style={{ scale: reduce ? scale : smoothScale, x: reduce ? x : smoothX, y: reduce ? y : smoothY }}
      />
    </motion.div>
  );
}
