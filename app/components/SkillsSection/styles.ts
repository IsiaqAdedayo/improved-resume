// Styles for SkillsSection
import styled from "styled-components";
import { motion } from "framer-motion";
import { T } from "../../styles/tokens";
import { Inner } from "../ui";

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
  grid-template-columns: repeat(auto-fit, minmax(190px, 1fr));
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
  margin-bottom: 1.1rem;
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

export const SkillList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
`;

export const SkillItem = styled.li`
  font-size: 0.845rem;
  color: ${T.inkMuted};
  font-weight: 500;
  padding-left: 1rem;
  position: relative;
  transition: color 0.2s;

  &::before {
    content: "▹";
    position: absolute;
    left: 0;
    color: ${T.accent};
    font-size: 0.68rem;
    opacity: 0.7;
    top: 0.1em;
  }

  ${Card}:hover & {
    color: ${T.ink};
  }
`;