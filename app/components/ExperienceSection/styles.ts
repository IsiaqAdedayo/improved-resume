// Styles for ExperienceSection
import { motion } from "framer-motion";
import styled from "styled-components";
import { T } from "../../styles/tokens";

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 5rem;
  margin-top: 1.5rem;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }
`;

export const SideCol = styled.div``;

export const SideDesc = styled.p`
  font-size: 1rem;
  color: ${T.muted};
  line-height: 1.8;
  max-width: 300px;
  margin-top: 1rem;

  strong {
    color: ${T.ink};
    font-weight: 600;
  }
`;

export const EduBlock = styled.div`
  margin-top: 2.5rem;
  border-top: 1px solid ${T.border};
  padding-top: 1.5rem;
`;

export const EduTitle = styled.div`
  font-family: ${T.fontMono};
  font-size: 0.63rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${T.muted};
  margin-bottom: 1rem;
`;

export const EduItem = styled.div`
  margin-bottom: 1rem;
`;

export const EduDeg = styled.div`
  font-size: 0.875rem;
  font-weight: 600;
  color: ${T.inkLight};
  line-height: 1.4;
`;

export const EduOrg = styled.div`
  font-family: ${T.fontMono};
  font-size: 0.68rem;
  color: ${T.muted};
  margin-top: 0.15rem;
`;

export const ExpList = styled.div`
  border-top: 1px solid ${T.border};
`;

export const ExpCard = styled(motion.div)`
  border-bottom: 1px solid ${T.border};
`;

export const ExpHeader = styled.button`
  width: 100%;
  background: none;
  border: none;
  cursor: pointer;
  display: grid;
  grid-template-columns: 110px 1fr auto;
  gap: 1.5rem;
  align-items: flex-start;
  padding: 2.2rem 0;
  text-align: left;

  @media (max-width: 560px) {
    grid-template-columns: 1fr auto;
    gap: 1rem;
  }
`;

export const ExpYear = styled.div`
  font-family: ${T.fontMono};
  font-size: 0.68rem;
  color: ${T.muted};
  letter-spacing: 0.07em;
  padding-top: 0.3rem;
  white-space: nowrap;

  @media (max-width: 560px) {
    display: none;
  }
`;

export const ExpMeta = styled.div``;

export const ExpRole = styled.h4`
  font-family: ${T.fontDisplay};
  font-size: clamp(1.2rem, 2vw, 1.6rem);
  font-weight: 700;
  color: ${T.ink};
  letter-spacing: -0.02em;
  line-height: 1.15;
  transition: color 0.2s;
`;

export const ExpCompany = styled.div`
  font-family: ${T.fontMono};
  font-size: 0.7rem;
  color: ${T.accent};
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-top: 0.3rem;
`;

export const ExpType = styled.div`
  font-size: 0.78rem;
  color: ${T.muted};
  margin-top: 0.2rem;
`;

export const ChevronIcon = styled(motion.div)`
  color: ${T.muted};
  margin-top: 0.35rem;
  flex-shrink: 0;
`;

export const ExpBody = styled(motion.div)`
  overflow: hidden;
`;

export const ExpBodyInner = styled.div`
  padding-bottom: 2rem;
  padding-left: calc(110px + 1.5rem);

  @media (max-width: 560px) {
    padding-left: 0;
  }
`;

export const BulletList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
  margin-bottom: 1.2rem;
`;

export const Bullet = styled.li`
  font-size: 0.9rem;
  color: ${T.muted};
  line-height: 1.7;
  padding-left: 1.2rem;
  position: relative;

  &::before {
    content: "—";
    position: absolute;
    left: 0;
    color: ${T.accent};
    font-size: 0.8rem;
  }
`;

export const TechLine = styled.div`
  display: flex;
  gap: 0.6rem;
  flex-wrap: wrap;
  margin-top: 0.5rem;
`;

export const TechBadge = styled.span`
  font-family: ${T.fontMono};
  font-size: 0.62rem;
  letter-spacing: 0.07em;
  color: ${T.accent};
  background: rgba(184, 131, 42, 0.1);
  padding: 0.22rem 0.6rem;
  border-radius: 2px;
  text-transform: uppercase;
`;