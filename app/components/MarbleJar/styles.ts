// Styles for MarbleJar
import styled from "styled-components";
import { motion } from "framer-motion";
import { T } from "../../styles/tokens";

export const JarSection = styled.div`
  padding: 5rem 0 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background:
      radial-gradient(ellipse at 50% 60%, rgba(184,131,42,0.06) 0%, transparent 60%),
      radial-gradient(ellipse at 30% 20%, rgba(184,131,42,0.03) 0%, transparent 50%);
    pointer-events: none;
  }
`;

export const JarCopy = styled.p`
  font-family: ${T.fontMono};
  font-size: 0.72rem;
  letter-spacing: 0.08em;
  color: ${T.inkDim};
  text-align: center;
  max-width: 340px;
  line-height: 1.7;
  margin-bottom: 2rem;
`;

export const JarWrap = styled.div`
  position: relative;
  width: 280px;
  height: 340px;
  margin-bottom: 1.5rem;
`;

export const MarbleContainer = styled.div`
  position: absolute;
  /* Inner usable area of jar matching wide glass body */
  top: 56px;
  left: 26px;
  right: 26px;
  bottom: 14px;
  overflow: hidden;
  border-radius: 0 0 38px 38px;
`;

export const MarbleEl = styled(motion.div)`
  position: absolute;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 34px;
  line-height: 1;
  user-select: none;
  pointer-events: none;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.45));
  will-change: transform;
`;

export const MoodRow = styled.div`
  display: flex;
  gap: 0.7rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 1.5rem;
`;

export const MoodBtn = styled(motion.button)<{ $active: boolean }>`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 2px solid ${(p) =>
    p.$active ? T.accent : "rgba(255,255,255,0.1)"};
  background: rgba(255,255,255,0.04);
  cursor: pointer;
  font-size: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: border-color 0.2s, background 0.2s;
  box-shadow: ${(p) =>
    p.$active ? `0 0 12px rgba(184,131,42,0.35)` : "none"};

  &:hover {
    border-color: rgba(184,131,42,0.6);
    background: rgba(184,131,42,0.06);
  }
`;

export const DropBtn = styled(motion.button)<{ $disabled: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.8rem 2rem;
  background: ${(p) =>
    p.$disabled ? "rgba(255,255,255,0.04)" : T.ink};
  color: ${(p) => (p.$disabled ? T.inkDim : T.bg)};
  border: 1px solid ${(p) =>
    p.$disabled ? T.border : "transparent"};
  border-radius: 100px;
  font-family: ${T.fontBody};
  font-size: 0.88rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  cursor: ${(p) => (p.$disabled ? "not-allowed" : "pointer")};
  transition: background 0.25s, color 0.25s, border-color 0.25s;
  margin-bottom: 1rem;

  &:hover:not(:disabled) {
    background: ${T.accent};
    color: ${T.bg};
  }
`;

export const StatusLine = styled(motion.p)`
  font-family: ${T.fontMono};
  font-size: 0.62rem;
  letter-spacing: 0.08em;
  color: ${T.inkDim};
  text-align: center;
`;

export const CelebrateOverlay = styled(motion.div)`
  position: absolute;
  inset: -10px;
  border-radius: 50px;
  border: 2px solid ${T.accent};
  pointer-events: none;
`;
