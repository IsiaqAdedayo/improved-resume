/* eslint-disable react-hooks/preserve-manual-memoization */
"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState, useCallback } from "react";
import styled from "styled-components";
import { T } from "../../styles/tokens";

/* ── Styled components ─────────────────────────────────── */
const SliderWrap = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  user-select: none;
  overflow: hidden;
  cursor: ew-resize;
  border-radius: inherit;
`;

const SliderSide = styled.div<{ $side: "before" | "after" }>`
  position: absolute;
  inset: 0;
  overflow: hidden;
`;

const SliderImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top;
  display: block;
  pointer-events: none;
`;

/* Wireframe placeholder for when beforeSrc is not yet set */
const WireframePlaceholder = styled.div`
  width: 100%;
  height: 100%;
  background: #0e0d16;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 1.5rem;
`;

const WireframeBar = styled.div<{ $w: string; $dim?: boolean }>`
  width: ${(p) => p.$w};
  height: 10px;
  border-radius: 2px;
  background: ${(p) => (p.$dim ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.11)")};
  align-self: flex-start;
`;

const WireframeBlock = styled.div<{ $h: string }>`
  width: 100%;
  height: ${(p) => p.$h};
  border-radius: 4px;
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.07);
`;

const WireframeLabel = styled.div`
  font-family: ${T.fontMono};
  font-size: 0.52rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.22);
  text-align: center;
  margin-bottom: 0.5rem;
`;

function WireframeView() {
  return (
    <WireframePlaceholder>
      <WireframeLabel>Early Wireframe Concept</WireframeLabel>
      <WireframeBlock $h="28px" />
      <WireframeBar $w="70%" />
      <WireframeBar $w="55%" $dim />
      <WireframeBlock $h="70px" />
      <div style={{ display: "flex", gap: "6px", width: "100%" }}>
        <WireframeBlock $h="40px" />
        <WireframeBlock $h="40px" />
        <WireframeBlock $h="40px" />
      </div>
      <WireframeBar $w="40%" $dim />
      <WireframeBlock $h="32px" />
    </WireframePlaceholder>
  );
}

const Handle = styled(motion.div)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: ${T.accent};
  border: 2px solid rgba(255,255,255,0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.65rem;
  font-weight: 700;
  color: #13111c;
  letter-spacing: -0.02em;
  box-shadow: 0 4px 16px rgba(184,131,42,0.4);
  cursor: ew-resize;
`;

const SideLabel = styled.div<{ $side: "before" | "after" }>`
  position: absolute;
  top: 12px;
  ${(p) => (p.$side === "before" ? "left: 12px" : "right: 12px")};
  font-family: ${T.fontMono};
  font-size: 0.52rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  padding: 0.25rem 0.6rem;
  border-radius: 100px;
  background: ${(p) =>
    p.$side === "before"
      ? "rgba(255,255,255,0.08)"
      : "rgba(184,131,42,0.22)"};
  color: ${(p) => (p.$side === "before" ? T.inkDim : T.accent)};
  border: 1px solid ${(p) =>
    p.$side === "before" ? "rgba(255,255,255,0.1)" : "rgba(184,131,42,0.4)"};
  pointer-events: none;
  z-index: 12;
`;

/* ── Props ─────────────────────────────────────────────── */
interface BeforeAfterSliderProps {
  afterSrc: string;
  afterAlt: string;
  beforeSrc?: string | null;
}

/* ── Component ─────────────────────────────────────────── */
export function BeforeAfterSlider({
  afterSrc,
  afterAlt,
  beforeSrc,
}: BeforeAfterSliderProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);

  // Position as percentage (0–100)
  const rawX = useMotionValue(50);
  const smoothX = useSpring(rawX, { stiffness: 320, damping: 28 });
  const widthPercent = useTransform(smoothX, (v) => `${v}%`);
  const leftPercent = useTransform(smoothX, (v) => `${v}%`);

  const updatePosition = (clientX: number) => {
    const rect = wrapRef.current?.getBoundingClientRect();
    if (!rect) return;
    const p = Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100));
    rawX.set(p);
  };

  const onMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!dragging) return;
      updatePosition(e.clientX);
    },
    [dragging]
  );

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      updatePosition(e.touches[0].clientX);
    }
  }, []);

  return (
    <SliderWrap
      ref={wrapRef}
      onMouseDown={(e) => {
        setDragging(true);
        updatePosition(e.clientX);
      }}
      onMouseUp={() => setDragging(false)}
      onMouseLeave={() => setDragging(false)}
      onMouseMove={onMouseMove}
      onTouchStart={(e) => {
        if (e.touches.length > 0) updatePosition(e.touches[0].clientX);
      }}
      onTouchMove={onTouchMove}
    >
      {/* AFTER (Full width in background) */}
      <SliderSide $side="after">
        <SliderImg src={afterSrc} alt={afterAlt} />
        <SideLabel $side="after">Production UI</SideLabel>
      </SliderSide>

      {/* BEFORE (Masked with dynamic width) */}
      <motion.div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          bottom: 0,
          width: widthPercent,
          overflow: "hidden",
          borderRight: `2px solid ${T.accent}`,
          zIndex: 8,
        }}
      >
        <div style={{ position: "relative", width: "520px", height: "100%" }}>
          {beforeSrc ? (
            <SliderImg
              src={beforeSrc}
              alt={`${afterAlt} — before`}
              style={{ width: "100%", height: "100%" }}
            />
          ) : (
            <WireframeView />
          )}
          <SideLabel $side="before">Wireframe</SideLabel>
        </div>
      </motion.div>

      {/* Draggable Divider Handle */}
      <motion.div
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: leftPercent,
          transform: "translateX(-50%)",
          zIndex: 10,
          pointerEvents: "none",
        }}
      >
        <Handle
          animate={{ scale: dragging ? 0.92 : 1 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
        >
          ⟺
        </Handle>
      </motion.div>
    </SliderWrap>
  );
}
