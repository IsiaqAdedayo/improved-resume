import { Variants } from "framer-motion";

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.72, ease: [0.22, 1, 0.36, 1] },
  },
};

export const fadeDown: Variants = {
  hidden: { opacity: 0, y: -20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -28 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export const fadeRight: Variants = {
  hidden: { opacity: 0, x: 28 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export const scaleUp: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export const heroTitle: Variants = {
  hidden: { opacity: 0, y: 60, skewY: 4 },
  show: {
    opacity: 1,
    y: 0,
    skewY: 0,
    transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1] },
  },
};

export const navDrop: Variants = {
  hidden: { y: -70, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export const stagger = (
  staggerChildren = 0.08,
  delayChildren = 0,
): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren, delayChildren } },
});

export const vp = { once: true, amount: 0.18 };
