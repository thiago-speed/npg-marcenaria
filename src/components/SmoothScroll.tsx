import { ReactLenis, type LenisRef } from "lenis/react";
import { cancelFrame, frame } from "motion-dom";
import { useEffect, useRef, type ReactNode } from "react";
import "lenis/dist/lenis.css";

type SmoothScrollProps = {
  children: ReactNode;
};

function expoOut(time: number) {
  return Math.min(1, 1.001 - 2 ** (-10 * time));
}

export function SmoothScroll({ children }: SmoothScrollProps) {
  const lenisRef = useRef<LenisRef>(null);

  useEffect(() => {
    function update({ timestamp }: { timestamp: number }) {
      lenisRef.current?.lenis?.raf(timestamp);
    }

    frame.setup(update, true);
    return () => cancelFrame(update);
  }, []);

  return (
    <ReactLenis
      ref={lenisRef}
      root
      options={{
        autoRaf: false,
        lerp: 0.1,
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1,
        syncTouch: false,
        anchors: {
          offset: -92,
          duration: 1.05,
          easing: expoOut,
        },
        respectReducedMotion: true,
        allowNestedScroll: true,
        stopInertiaOnNavigate: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}
