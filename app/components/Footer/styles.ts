// Styles for Footer
import styled from "styled-components";
import { motion } from "framer-motion";
import { T } from "../../styles/tokens";

export const FooterEl = styled.footer`
  background: ${T.bgDeep};
  border-top: 1px solid ${T.border};
  padding: 1.8rem 3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;

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