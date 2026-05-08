// Styles for ContactSection
import styled from "styled-components";
import { motion } from "framer-motion";
import { T } from "../../styles/tokens";

export const Wrap = styled.section`
  background: ${T.bgDeep};
  padding: 8rem 0;
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 5rem 0;
  }
`;

export const BgWord = styled.div`
  position: absolute;
  bottom: -6%;
  right: -2%;
  font-family: ${T.fontDisplay};
  font-size: clamp(160px, 26vw, 380px);
  font-weight: 700;
  font-style: italic;
  line-height: 0.85;
  color: transparent;
  -webkit-text-stroke: 1px rgba(255, 255, 255, 0.035);
  user-select: none;
  pointer-events: none;
  letter-spacing: -0.06em;
`;

export const Grid = styled.div`
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6rem;
  align-items: flex-start;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 3.5rem;
  }
`;

export const BigHeading = styled(motion.h2)`
  font-family: ${T.fontDisplay};
  font-size: clamp(3.5rem, 9vw, 8rem);
  font-weight: 700;
  line-height: 0.92;
  letter-spacing: -0.045em;
  color: ${T.ink};

  em {
    font-style: italic;
    color: ${T.accent};
  }
`;

export const SubText = styled(motion.p)`
  font-size: 0.96rem;
  color: ${T.inkMuted};
  line-height: 1.8;
  max-width: 360px;
  margin-top: 1.8rem;
`;

export const SocRow = styled(motion.div)`
  display: flex;
  gap: 0.9rem;
  margin-top: 2.5rem;
`;

export const SocBtn = styled(motion.a)`
  width: 40px;
  height: 40px;
  border: 1px solid ${T.border};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${T.inkMuted};
  text-decoration: none;
  transition:
    border-color 0.2s,
    color 0.2s;

  &:hover {
    border-color: ${T.accent};
    color: ${T.accent};
  }
`;

export const LinksCol = styled(motion.div)`
  display: flex;
  flex-direction: column;
  border-top: 1px solid ${T.border};
`;

export const LinkRow = styled(motion.a)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem 0;
  border-bottom: 1px solid ${T.border};
  text-decoration: none;
  color: ${T.ink};
  transition: color 0.22s;
  cursor: pointer;

  &:hover {
    color: ${T.accent};
  }
`;

export const LinkLeft = styled.div``;

export const LinkLabel = styled.div`
  font-family: ${T.fontMono};
  font-size: 0.6rem;
  letter-spacing: 0.13em;
  text-transform: uppercase;
  color: ${T.inkDim};
  margin-bottom: 0.3rem;
  transition: color 0.22s;

  ${LinkRow}:hover & {
    color: rgba(255, 255, 255, 0.45);
  }
`;

export const LinkVal = styled.div`
  font-size: 0.92rem;
  font-weight: 500;
`;

export const LinkArrow = styled(motion.div)`
  color: ${T.inkDim};
  transition: color 0.22s;

  ${LinkRow}:hover & {
    color: ${T.accent};
  }
`;