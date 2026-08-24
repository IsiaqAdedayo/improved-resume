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
import { motion, useSpring, AnimatePresence } from "framer-motion";
import styled from "styled-components";
import { T } from "../../styles/tokens";

/* ── Types ─────────────────────────────────────────────── */
export type CursorVariant =
  | "default"
  | "hover"    // over links / buttons
  | "text"     // over paragraphs / headings
  | "drag"     // over project cards
  | "click"    // while mouse is down
  | "drop"     // over marble mood buttons / drop button
  | "explore"  // over OSS cards
  | "view";    // over project view links

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
  width: 6px;
  height: 6px;
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
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Ripple = styled(motion.div)`
  position: absolute;
  border-radius: 50%;
  border: 1.5px solid ${T.accent};
  transform: translate(-50%, -50%);
  pointer-events: none;
`;

/* ── Label inside ring ──────────────────────────────────── */
const RingLabel = styled(motion.span)`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: ${T.fontBody};
  font-size: 0.5rem;
  font-weight: 700;
  letter-spacing: 0.12em;
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
    bg: `rgba(184,131,42,0.12)`,
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
    bg: `rgba(184,131,42,0.10)`,
    border: T.accent,
    opacity: 1,
    label: "drag",
    dotOpacity: 0,
    dotScale: 0,
  },
  click: {
    size: 24,
    bg: `rgba(184,131,42,0.25)`,
    border: T.accent,
    opacity: 1,
    dotOpacity: 1,
    dotScale: 0.5,
  },
  drop: {
    size: 62,
    bg: `rgba(184,131,42,0.14)`,
    border: T.accent,
    opacity: 1,
    label: "drop",
    dotOpacity: 0,
    dotScale: 0,
  },
  explore: {
    size: 62,
    bg: `rgba(184,131,42,0.10)`,
    border: T.accent,
    opacity: 1,
    label: "explore",
    dotOpacity: 0,
    dotScale: 0,
  },
  view: {
    size: 54,
    bg: `rgba(184,131,42,0.10)`,
    border: T.accent,
    opacity: 1,
    label: "view",
    dotOpacity: 0,
    dotScale: 0,
  },
};

/* ── Cursor renderer ────────────────────────────────────── */
function CursorRenderer({ variant }: { variant: CursorVariant }) {
  const mouseX = useRef(typeof window !== "undefined" ? -200 : -200);
  const mouseY = useRef(typeof window !== "undefined" ? -200 : -200);

  const [dotPos, setDotPos] = useState({ x: -200, y: -200 });
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);
  const rippleId = useRef(0);

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

  // Ripple on click
  useEffect(() => {
    const onClick = () => {
      const id = ++rippleId.current;
      setRipples((r) => [...r, { id, x: mouseX.current, y: mouseY.current }]);
      setTimeout(() => {
        setRipples((r) => r.filter((rp) => rp.id !== id));
      }, 600);
    };
    window.addEventListener("mousedown", onClick);
    return () => window.removeEventListener("mousedown", onClick);
  }, []);

  // Ring springs behind
  const springCfg = { stiffness: 160, damping: 20, mass: 0.6 };
  const rx = useSpring(dotPos.x, springCfg);
  const ry = useSpring(dotPos.y, springCfg);

  // Force snap for text / click modes
  useEffect(() => {
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
          mixBlendMode: (cfg.mixBlend ?? "normal") as "normal" | "difference",
        }}
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
      >
        <AnimatePresence mode="wait">
          {cfg.label && (
            <RingLabel
              key={cfg.label}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{ duration: 0.15 }}
            >
              {cfg.label}
            </RingLabel>
          )}
        </AnimatePresence>
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

      {/* Click ripples */}
      <AnimatePresence>
        {ripples.map((rp) => (
          <Ripple
            key={rp.id}
            style={{ left: rp.x, top: rp.y }}
            initial={{ width: 10, height: 10, opacity: 0.7 }}
            animate={{ width: 56, height: 56, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          />
        ))}
      </AnimatePresence>
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
    const down = () => setVariantState((v) => (v !== "drag" && v !== "drop" && v !== "explore" && v !== "view" ? "click" : v));
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
export function useCursorHandlers(hoverVariant: CursorVariant = "hover") {
  const { setVariant } = useCursor();
  return {
    onMouseEnter: () => setVariant(hoverVariant),
    onMouseLeave: () => setVariant("default"),
  };
}
