import { Variants } from "framer-motion";

/* Fade up — the standard reveal */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.72, ease: [0.22, 1, 0.36, 1] } },
};

/* Stagger container */
export const stagger = (staggerChildren = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  show:   { transition: { staggerChildren, delayChildren } },
});

/* Fade in from left */
export const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -28 },
  show:   { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

/* Fade in from right */
export const fadeRight: Variants = {
  hidden: { opacity: 0, x: 28 },
  show:   { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

/* Scale up reveal */
export const scaleUp: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  show:   { opacity: 1, scale: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

/* Line draw (for horizontal dividers) */
export const lineDraw: Variants = {
  hidden: { scaleX: 0, originX: 0 },
  show:   { scaleX: 1, transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] } },
};

/* Hero text — big dramatic entrance */
export const heroTitle: Variants = {
  hidden: { opacity: 0, y: 60, skewY: 4 },
  show:   {
    opacity: 1, y: 0, skewY: 0,
    transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1] },
  },
};

/* Nav entrance */
export const navDrop: Variants = {
  hidden: { y: -70, opacity: 0 },
  show:   { y: 0, opacity: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

/* Viewport defaults */
export const vp = { once: true, amount: 0.2 };
