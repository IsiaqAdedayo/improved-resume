// Styles for HeroSection
import styled from "styled-components";
import { motion } from "framer-motion";
import { T } from "../../styles/tokens";
import { Inner } from "../ui";

export const HeroWrap = styled.section`
  min-height: 100vh;
  padding: 9rem 0 5rem;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  background:
    radial-gradient(
      ellipse at 60% 40%,
      rgba(184, 131, 42, 0.06) 0%,
      transparent 65%
    ),
    radial-gradient(
      ellipse at 20% 80%,
      rgba(184, 131, 42, 0.04) 0%,
      transparent 55%
    ),
    ${T.bg};
`;

export const Canvas = styled.canvas`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
`;

export const HeroInner = styled(Inner)`
  position: relative;
  z-index: 1;
`;

export const Eyebrow = styled(motion.div)`
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  font-family: ${T.fontMono};
  font-size: 0.68rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: ${T.accent};
  margin-bottom: 1.6rem;

  &::before {
    content: "";
    display: block;
    width: 28px;
    height: 1px;
    background: ${T.accent};
  }
`;

export const TitleWrap = styled.div`
  overflow: hidden;
  margin-bottom: 0.05em;
`;

export const TitleLine = styled(motion.h1)`
  font-family: ${T.fontDisplay};
  font-size: clamp(4.5rem, 11vw, 11rem);
  font-weight: 700;
  line-height: 0.88;
  letter-spacing: -0.045em;
  color: ${T.ink};
  display: block;

  &.italic {
    font-style: italic;
    color: ${T.accent};
    -webkit-text-stroke: 0px;
  }
`;

export const Watermark = styled(motion.div)`
  position: absolute;
  top: -6%;
  right: -2%;
  font-family: ${T.fontDisplay};
  font-size: clamp(200px, 33vw, 500px);
  font-weight: 700;
  line-height: 0.82;
  color: transparent;
  -webkit-text-stroke: 1px rgba(184, 132, 42, 0.14);
  user-select: none;
  pointer-events: none;
  z-index: 0;
  letter-spacing: -0.06em;
`;

export const AccentSquare = styled(motion.div)`
  position: absolute;
  bottom: 32%;
  right: 8%;
  width: 180px;
  height: 180px;
  border: 1px solid rgba(184, 131, 42, 0.2);
  border-radius: 4px;
  z-index: 0;

  @media (max-width: 768px) { display: none; }
`;

export const AccentDot = styled(motion.div)`
  position: absolute;
  top: 28%;
  right: 22%;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: ${T.accent};
  z-index: 0;

  @media (max-width: 768px) { display: none; }
`;

export const HeroBio = styled(motion.p)`
  font-size: clamp(0.92rem, 1.2vw, 1.05rem);
  color: ${T.inkMuted};
  line-height: 1.8;
  max-width: 460px;
  margin-top: 1.6rem;
`;

export const CTARow = styled(motion.div)`
  display: flex;
  gap: 1rem;
  margin-top: 2.2rem;
  flex-wrap: wrap;
`;

export const TabBlock = styled(motion.div)`
  margin-top: 4rem;
  border-top: 1px solid ${T.border};
  padding-top: 2rem;
`;

export const TabRow = styled.div`
  display: flex;
  gap: 0;
  flex-wrap: wrap;
`;

export const TabBtn = styled.button<{ $active: boolean }>`
  background: none;
  border: none;
  cursor: pointer;
  font-family: ${T.fontBody};
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: ${(p) => (p.$active ? T.ink : T.inkDim)};
  padding: 0.6rem 1.4rem 0.6rem 0;
  position: relative;
  transition: color 0.25s;

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    height: 1px;
    background: ${T.accent};
    width: ${(p) => (p.$active ? "100%" : "0")};
    transition: width 0.35s cubic-bezier(0.22, 1, 0.36, 1);
  }

  &:hover {
    color: ${(p) => (p.$active ? T.ink : T.inkMuted)};
  }
`;

export const TabDesc = styled.div`
  min-height: 2.2rem;
  margin-top: 1rem;
  overflow: hidden;
`;

export const TabDescInner = styled(motion.p)`
  font-family: ${T.fontMono};
  font-size: 0.72rem;
  color: ${T.inkMuted};
  letter-spacing: 0.04em;
  line-height: 1.7;
  max-width: 520px;
`;

export const StatsBar = styled(motion.div)`
  position: relative;
  z-index: 1;
  max-width: 1240px;
  margin: 3rem auto 0;
  padding: 1.5rem 3rem 0;
  border-top: 1px solid ${T.border};
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    padding: 1.5rem 1.5rem 0;
    gap: 1.5rem;
  }
`;

export const Stat = styled.div`
  text-align: center;

  @media (max-width: 768px) {
    text-align: left;
  }
`;

export const StatN = styled.div`
  font-family: ${T.fontDisplay};
  font-size: clamp(2rem, 3.5vw, 2.8rem);
  font-weight: 700;
  color: ${T.ink};
  line-height: 1;
  letter-spacing: -0.03em;
`;

export const StatL = styled.div`
  font-family: ${T.fontMono};
  font-size: 0.6rem;
  color: ${T.inkMuted};
  letter-spacing: 0.12em;
  text-transform: uppercase;
  margin-top: 0.3rem;
`;

export const ScrollHint = styled(motion.button)`
  background: none;
  border: none;
  cursor: pointer;
  font-family: ${T.fontMono};
  font-size: 0.63rem;
  color: ${T.inkDim};
  letter-spacing: 0.14em;
  text-transform: uppercase;
  transition: color 0.2s;

  &:hover {
    color: ${T.accent};
  }

  @media (max-width: 768px) {
    display: none;
  }
`;