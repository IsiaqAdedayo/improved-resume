// Styles for SkillsSection
import styled, { css } from "styled-components";
import { motion } from "framer-motion";
import { T } from "../../styles/tokens";
import { Inner } from "../ui";
import type { SkillDepth } from "../../data";

export const Wrap = styled.section`
  padding: 6rem 0;
  background: ${T.bgDeep};
  border-top: 1px solid ${T.border};
  border-bottom: 1px solid ${T.border};
  overflow: hidden;
`;

export const MarqueeOuter = styled.div`
  position: relative;
  overflow: hidden;
  margin-bottom: 5rem;

  &::before,
  &::after {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    width: 14%;
    z-index: 1;
    pointer-events: none;
  }
  &::before {
    left: 0;
    background: linear-gradient(to right, ${T.bgDeep}, transparent);
  }
  &::after {
    right: 0;
    background: linear-gradient(to left, ${T.bgDeep}, transparent);
  }
`;

export const Track = styled(motion.div)`
  display: flex;
  gap: 1rem;
  width: max-content;
  padding: 0.5rem 0;
`;

export const Chip = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.55rem 1.3rem;
  border: 1px solid ${T.border};
  border-radius: 100px;
  background: rgba(255, 255, 255, 0.03);
  font-family: ${T.fontBody};
  font-size: 0.82rem;
  font-weight: 500;
  color: ${T.inkMuted};
  white-space: nowrap;
  backdrop-filter: blur(8px);
  transition:
    border-color 0.2s,
    color 0.2s;

  &::before {
    content: "·";
    color: ${T.accent};
    font-size: 1.1rem;
    line-height: 1;
  }

  &:hover {
    border-color: ${T.accent};
    color: ${T.ink};
  }
`;

export const GridWrap = styled(Inner)``;

export const HeadRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 2rem;

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
`;

export const GridTitle = styled(motion.h2)`
  font-family: ${T.fontDisplay};
  font-size: clamp(2rem, 4vw, 3.5rem);
  font-weight: 700;
  letter-spacing: -0.03em;
  color: ${T.ink};
  line-height: 1;

  em {
    font-style: italic;
    color: ${T.accent};
  }
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.2rem;

  @media (max-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const Card = styled(motion.div)`
  padding: 1.6rem;
  border: 1px solid ${T.border};
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.025);
  backdrop-filter: blur(10px);
  transition:
    border-color 0.25s,
    background 0.25s,
    transform 0.25s;

  &:hover {
    border-color: rgba(184, 131, 42, 0.4);
    background: rgba(184, 131, 42, 0.04);
    transform: translateY(-3px);
  }
`;

export const CatTitle = styled.div`
  font-family: ${T.fontMono};
  font-size: 0.6rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: ${T.accent};
  margin-bottom: 1.2rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &::before {
    content: "";
    display: block;
    width: 14px;
    height: 1px;
    background: ${T.accent};
    opacity: 0.6;
  }
`;

export const ProfList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
`;

/* ── Depth colour mapping ── */
const depthColor = (depth: SkillDepth) => {
  switch (depth) {
    case "Lead":
      return css`background: ${T.accent};`;
    case "Build":
      return css`background: rgba(184,131,42,0.65);`;
    case "Use":
      return css`background: rgba(184,131,42,0.38);`;
    case "Learn":
      return css`background: rgba(184,131,42,0.2);`;
  }
};

const depthWidth = (depth: SkillDepth) => {
  switch (depth) {
    case "Lead":  return "92%";
    case "Build": return "68%";
    case "Use":   return "46%";
    case "Learn": return "28%";
  }
};

export const ProfRow = styled.li`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
`;

export const ProfTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
`;

export const ProfName = styled.span`
  font-size: 0.8rem;
  color: ${T.inkMuted};
  font-weight: 500;
  transition: color 0.2s;

  ${Card}:hover & {
    color: ${T.ink};
  }
`;

export const DepthTag = styled.span<{ $depth: SkillDepth }>`
  font-family: ${T.fontMono};
  font-size: 0.5rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${(p) => {
    switch (p.$depth) {
      case "Lead":  return T.accent;
      case "Build": return "rgba(184,131,42,0.75)";
      case "Use":   return T.inkDim;
      case "Learn": return "rgba(255,255,255,0.18)";
    }
  }};
`;

export const ProfTrack = styled.div`
  width: 100%;
  height: 2px;
  background: ${T.border};
  border-radius: 1px;
  overflow: hidden;
`;

export const ProfFill = styled(motion.div)<{ $depth: SkillDepth }>`
  height: 100%;
  border-radius: 1px;
  transform-origin: left center;
  ${(p) => depthColor(p.$depth)}
  /* width is set by whileInView animate, target width from depthWidth */
  &[data-target-width] {
    /* used for reference only */
  }
`;

/* Export depthWidth for use in component */
export { depthWidth };