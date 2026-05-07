"use client";
import styled from "styled-components";
import { motion } from "framer-motion";
import { T } from "../styles/tokens";

/* ── Cursor Glow ── */
export const CursorGlowWrap = styled.div`
  position: fixed;
  inset: 0;
  z-index: 50;
  pointer-events: none;
  overflow: hidden;
`;

export const CursorGlowOrb = styled(motion.div)`
  position: absolute;
  width: 520px;
  height: 520px;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    rgba(184, 131, 42, 0.07) 0%,
    transparent 70%
  );
  transform: translate(-50%, -50%);
  will-change: transform;
  pointer-events: none;
`;

/* ── Layout ── */
export const PageWrap = styled.div`
  position: relative;
  min-height: 100vh;
  background: ${T.bg};
  overflow-x: hidden;
`;

export const Inner = styled.div`
  max-width: 1240px;
  margin: 0 auto;
  width: 100%;
  padding: 0 3rem;

  @media (max-width: 768px) {
    padding: 0 1.5rem;
  }
`;

/* ── Section ── */
export const Section = styled.section<{
  $dark?: boolean;
  $light?: boolean;
  $pad?: string;
}>`
  padding: ${(p) => p.$pad ?? "7rem 0"};
  background: ${(p) =>
    p.$dark ? T.bgDeep : p.$light ? T.bgSurface : "transparent"};
  color: ${(p) => (p.$light ? T.inkDark : T.ink)};
  position: relative;

  @media (max-width: 768px) {
    padding: ${(p) => (p.$pad ? p.$pad : "5rem 0")};
  }
`;

/* ── Label ── */
export const Label = styled(motion.div)<{ $light?: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 0.65rem;
  font-family: ${T.fontMono};
  font-size: 0.65rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: ${(p) => (p.$light ? T.mutedDark : T.inkMuted)};
  margin-bottom: 0.65rem;

  &::before {
    content: "";
    display: block;
    width: 22px;
    height: 1px;
    background: ${(p) => (p.$light ? T.mutedDark : "rgba(255,255,255,0.25)")};
  }
`;

/* ── Heading ── */
export const Heading = styled(motion.h2)<{ $light?: boolean; $size?: string }>`
  font-family: ${T.fontDisplay};
  font-size: ${(p) => p.$size ?? "clamp(2.4rem, 5vw, 4.8rem)"};
  font-weight: 700;
  line-height: 1;
  letter-spacing: -0.025em;
  color: ${(p) => (p.$light ? T.inkDark : T.ink)};

  em {
    font-style: italic;
    color: ${T.accent};
  }
`;

/* ── Buttons ── */
export const BtnPrimary = styled(motion.button)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: ${T.accent};
  color: #fff;
  border: none;
  border-radius: 3px;
  padding: 0.9rem 2rem;
  font-family: ${T.fontBody};
  font-size: 0.875rem;
  font-weight: 600;
  letter-spacing: 0.03em;
  cursor: pointer;
  transition:
    background 0.2s,
    transform 0.15s;

  &:hover {
    background: ${T.accentHover};
    transform: translateY(-2px);
  }
`;

export const BtnGhost = styled(motion.button)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: transparent;
  color: ${T.ink};
  border: 1px solid ${T.borderMid};
  border-radius: 3px;
  padding: 0.9rem 2rem;
  font-family: ${T.fontBody};
  font-size: 0.875rem;
  font-weight: 600;
  letter-spacing: 0.03em;
  cursor: pointer;
  transition:
    border-color 0.2s,
    color 0.2s,
    transform 0.15s;

  &:hover {
    border-color: ${T.accent};
    color: ${T.accent};
    transform: translateY(-2px);
  }
`;

/* ── Grain overlay ── */
export const Grain = styled.div`
  position: fixed;
  inset: 0;
  z-index: 200;
  pointer-events: none;
  opacity: 0.032;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  background-size: 160px 160px;
`;

/* ── Scroll progress bar ── */
export const ProgressBar = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: ${T.accent};
  transform-origin: 0%;
  z-index: 999;
`;

/* ── Tag ── */
export const Tag = styled.span`
  font-family: ${T.fontMono};
  font-size: 0.63rem;
  letter-spacing: 0.07em;
  color: ${T.accent};
  text-transform: uppercase;
`;
