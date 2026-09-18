import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { isMotionEnabled } from "../lib/design";

type RevealFrom = "up" | "left" | "right" | "zoom";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  from?: RevealFrom;
};

const ease = [0.22, 1, 0.36, 1] as const;

const hidden: Record<RevealFrom, { opacity: number; x?: number; y?: number; scale?: number }> = {
  up: { opacity: 0, y: 36 },
  left: { opacity: 0, x: -32 },
  right: { opacity: 0, x: 32 },
  zoom: { opacity: 0, scale: 0.94 },
};

export function Reveal({ children, className, delay = 0, from = "up" }: RevealProps) {
  const reduce = useReducedMotion() || !isMotionEnabled();

  return (
    <motion.div
      className={className}
      initial={reduce ? false : hidden[from]}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.24, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.85, delay, ease }}
    >
      {children}
    </motion.div>
  );
}
