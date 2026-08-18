"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  useCallback,
  ReactNode,
} from "react";
import { motion, useSpring } from "framer-motion";
import styled from "styled-components";
import { T } from "../../styles/tokens";

/* ── Types ─────────────────────────────────────────────── */
export type CursorVariant =
  | "default"
  | "hover"    // over links / buttons
  | "text"     // over paragraphs / headings
  | "drag"     // over project cards
  | "click";   // while mouse is down

/* ── Context ────────────────────────────────────────────── */
interface CursorCtx {
  variant: CursorVariant;
  setVariant: (v: CursorVariant) => void;
}

const CursorContext = createContext<CursorCtx>({
  variant: "default",
  setVariant: () => {},
});

export const useCursor = () => useContext(CursorContext);

/* ── Styled pieces ──────────────────────────────────────── */
const Wrap = styled.div`
  position: fixed;
  inset: 0;
  z-index: 9999;
  pointer-events: none;
  overflow: visible;
`;

const Dot = styled(motion.div)`
  position: absolute;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: ${T.accent};
  transform: translate(-50%, -50%);
  will-change: transform, opacity;
`;

const Ring = styled(motion.div)`
  position: absolute;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  will-change: transform;
  border: 1.5px solid ${T.accent};
  background: transparent;
`;

/* ── Label inside ring for drag/view states ─────────────── */
const RingLabel = styled(motion.span)`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: ${T.fontBody};
  font-size: 0.55rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #fff;
  pointer-events: none;
  user-select: none;
`;

/* ── Variant configs ────────────────────────────────────── */
const RING_CONFIG: Record<
  CursorVariant,
  {
    size: number;
    bg: string;
    border: string;
    opacity: number;
    label?: string;
    dotOpacity: number;
    dotScale: number;
    mixBlend?: string;
  }
> = {
  default: {
    size: 36,
    bg: "transparent",
    border: `${T.accent}`,
    opacity: 0.6,
    dotOpacity: 1,
    dotScale: 1,
  },
  hover: {
    size: 52,
    bg: `rgba(184,131,42,0.15)`,
    border: T.accent,
    opacity: 1,
    dotOpacity: 0,
    dotScale: 0,
  },
  text: {
    size: 3,
    bg: T.accent,
    border: "transparent",
    opacity: 0.9,
    dotOpacity: 0,
    dotScale: 0,
    mixBlend: "difference",
  },
  drag: {
    size: 72,
    bg: `rgba(184,131,42,0.12)`,
    border: T.accent,
    opacity: 1,
    label: "drag",
    dotOpacity: 0,
    dotScale: 0,
  },
  click: {
    size: 22,
    bg: `rgba(184,131,42,0.3)`,
    border: T.accent,
    opacity: 1,
    dotOpacity: 1,
    dotScale: 0.5,
  },
};

/* ── Cursor renderer ────────────────────────────────────── */
function CursorRenderer({ variant }: { variant: CursorVariant }) {
  const mouseX = useRef(typeof window !== "undefined" ? -200 : -200);
  const mouseY = useRef(typeof window !== "undefined" ? -200 : -200);

  const [dotPos, setDotPos] = useState({ x: -200, y: -200 });

  // Dot follows mouse 1:1
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseX.current = e.clientX;
      mouseY.current = e.clientY;
      setDotPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  // Ring springs behind
  const springCfg = { stiffness: 180, damping: 22, mass: 0.6 };
  const rx = useSpring(dotPos.x, springCfg);
  const ry = useSpring(dotPos.y, springCfg);

  // When in text mode ring collapses fast, normal mode is lagged
  useEffect(() => {
    // force immediate snap for text / click modes
    if (variant === "text" || variant === "click") {
      rx.set(mouseX.current);
      ry.set(mouseY.current);
    }
  }, [variant, rx, ry]);

  const cfg = RING_CONFIG[variant];

  return (
    <Wrap>
      {/* Ring */}
      <Ring
        style={{ left: rx, top: ry }}
        animate={{
          width: cfg.size,
          height: cfg.size,
          background: cfg.bg,
          borderColor: cfg.border,
          opacity: cfg.opacity,
          mixBlendMode: (cfg.mixBlend) ?? "normal",
        }}
        transition={{ type: "spring", stiffness: 280, damping: 24 }}
      >
        {cfg.label && (
          <RingLabel
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {cfg.label}
          </RingLabel>
        )}
      </Ring>

      {/* Dot */}
      <Dot
        style={{ left: dotPos.x, top: dotPos.y }}
        animate={{
          opacity: cfg.dotOpacity,
          scale: cfg.dotScale,
        }}
        transition={{ duration: 0.18 }}
      />
    </Wrap>
  );
}

/* ── Provider (wraps the whole app) ─────────────────────── */
export function CustomCursorProvider({ children }: { children: ReactNode }) {
  const [variant, setVariantState] = useState<CursorVariant>("default");
  const [visible, setVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(true); // SSR-safe default

  useEffect(() => {
    // Detect touch-only devices — skip custom cursor entirely
    const touchOnly = window.matchMedia("(pointer: coarse)").matches;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMobile(touchOnly);
    if (touchOnly) return;

    // Show immediately — we know it's a pointer device
    setVisible(true);

    // Hide only when pointer actually leaves the viewport
    const hide = () => setVisible(false);
    const show = () => setVisible(true);
    document.addEventListener("mouseleave", hide);
    document.addEventListener("mouseenter", show);

    // Global mouse-down / up for click state
    const down = () => setVariantState((v) => (v !== "drag" ? "click" : v));
    const up = () => setVariantState((v) => (v === "click" ? "default" : v));
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);

    // Hide native cursor globally
    document.documentElement.style.cursor = "none";

    return () => {
      document.removeEventListener("mouseleave", hide);
      document.removeEventListener("mouseenter", show);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
      document.documentElement.style.cursor = "";
    };
  }, []);

  const setVariant = useCallback((v: CursorVariant) => {
    setVariantState(v);
  }, []);

  return (
    <CursorContext.Provider value={{ variant, setVariant }}>
      {children}
      {!isMobile && visible && <CursorRenderer variant={variant} />}
    </CursorContext.Provider>
  );
}

/* ── Convenience hook wrappers ───────────────────────────── */
/**
 * Spread onto any element to get hover cursor behaviour.
 * Usage: <button {...cursorHover("hover")}>…</button>
 */
export function useCursorHandlers(hoverVariant: CursorVariant = "hover") {
  const { setVariant } = useCursor();
  return {
    onMouseEnter: () => setVariant(hoverVariant),
    onMouseLeave: () => setVariant("default"),
  };
}
