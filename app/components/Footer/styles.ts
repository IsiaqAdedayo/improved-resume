// Styles for Footer
import styled from "styled-components";
import { motion } from "framer-motion";
import { T } from "../../styles/tokens";

export const FooterEl = styled.footer`
  background: ${T.bgDeep};
  border-top: 1px solid ${T.border};
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: radial-gradient(
      ellipse at 50% 0%,
      rgba(184, 131, 42, 0.04) 0%,
      transparent 60%
    );
    pointer-events: none;
  }
`;

export const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: ${T.border};
`;

export const FooterContent = styled.div`
  padding: 1.8rem 3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  position: relative;
  z-index: 1;

  @media (max-width: 640px) {
    padding: 1.5rem;
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const Note = styled.div`
  font-family: ${T.fontMono};
  font-size: 0.66rem;
  color: ${T.inkDim};
  letter-spacing: 0.05em;
`;

export const SocRow = styled.div`
  display: flex;
  gap: 0.9rem;
`;

export const SocBtn = styled(motion.a)`
  width: 32px;
  height: 32px;
  border: 1px solid ${T.border};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${T.inkDim};
  text-decoration: none;
  transition:
    border-color 0.2s,
    color 0.2s;

  &:hover {
    border-color: ${T.accent};
    color: ${T.accent};
  }
`;