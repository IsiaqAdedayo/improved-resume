// Styles for TestimonialsSection
import styled from "styled-components";
import { motion } from "framer-motion";
import { T } from "../../styles/tokens";
import { Inner } from "../ui";

export const TestiWrap = styled.section`
  padding: 7rem 0;
  background: ${T.bg};
  border-top: 1px solid ${T.border};
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background:
      radial-gradient(ellipse at 20% 50%, rgba(184,131,42,0.04) 0%, transparent 55%),
      radial-gradient(ellipse at 80% 30%, rgba(184,131,42,0.03) 0%, transparent 50%);
    pointer-events: none;
  }
`;

export const TestiInner = styled(Inner)`
  position: relative;
  z-index: 1;
`;

export const TestiHead = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-bottom: 4rem;
`;

export const TestiHeadline = styled(motion.h2)`
  font-family: ${T.fontDisplay};
  font-size: clamp(2.2rem, 4.5vw, 4.5rem);
  font-weight: 700;
  letter-spacing: -0.04em;
  line-height: 1;
  color: ${T.ink};
  margin-top: 1.2rem;

  em {
    font-style: italic;
    color: ${T.accent};
  }
`;

export const CardsArea = styled.div`
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  flex-wrap: wrap;
  position: relative;

  @media (min-width: 900px) {
    align-items: center;
    min-height: 320px;
  }
`;

export const CardFloat = styled(motion.div)<{ $angle: number }>`
  flex: 0 0 auto;
  width: clamp(260px, 30vw, 360px);

  @media (min-width: 900px) {
    transform-origin: center center;
    /* initial angle set via style prop, maintained via framer motion */
  }
`;

export const TestiCard = styled(motion.div)`
  padding: 2rem;
  border: 1px solid ${T.borderMid};
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(14px);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.35);
  transition: box-shadow 0.3s, border-color 0.3s, transform 0.3s;
  cursor: default;

  &:hover {
    box-shadow: 0 30px 80px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(184,131,42,0.2);
    border-color: rgba(184, 131, 42, 0.3);
  }
`;

export const TestiAvatar = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: ${T.accentDim};
  border: 1px solid rgba(184, 131, 42, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: ${T.fontBody};
  font-size: 0.78rem;
  font-weight: 700;
  color: ${T.accent};
  letter-spacing: 0.02em;
  flex-shrink: 0;
`;

export const TestiMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 0.9rem;
  margin-bottom: 1.2rem;
`;

export const TestiName = styled.div`
  font-size: 0.88rem;
  font-weight: 600;
  color: ${T.ink};
`;

export const TestiRole = styled.div`
  font-family: ${T.fontMono};
  font-size: 0.6rem;
  letter-spacing: 0.08em;
  color: ${T.inkDim};
  margin-top: 0.15rem;
`;

export const TestiQuote = styled.blockquote`
  font-size: 0.9rem;
  line-height: 1.75;
  color: ${T.inkMuted};
  margin: 0;
  font-style: italic;
  position: relative;
  padding-left: 0.9rem;
  border-left: 2px solid rgba(184, 131, 42, 0.3);
`;

export const TestiBadge = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  margin-top: 1.2rem;
  font-family: ${T.fontMono};
  font-size: 0.55rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${T.inkDim};
  text-decoration: none;
  transition: color 0.2s;

  &:hover {
    color: ${T.accent};
  }
`;

export const Stars = styled.div`
  display: flex;
  gap: 2px;
  margin-top: 0.8rem;
`;

export const Star = styled.span`
  color: ${T.accent};
  font-size: 0.75rem;
`;

export const PlaceholderNotice = styled.div`
  margin-top: 3rem;
  text-align: center;
  font-family: ${T.fontMono};
  font-size: 0.6rem;
  letter-spacing: 0.12em;
  color: ${T.inkDim};
  padding: 0.8rem 1.5rem;
  border: 1px dashed rgba(255,255,255,0.08);
  border-radius: 6px;
  display: inline-block;
`;
