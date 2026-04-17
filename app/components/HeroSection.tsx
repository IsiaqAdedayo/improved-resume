"use client";

import styled from "styled-components";
import { motion } from "framer-motion";
import { Mail, ArrowRight } from "lucide-react";
import { T } from "../styles/tokens";
import { Inner, BtnPrimary, BtnGhost } from "./ui";
import { heroTitle, stagger, fadeUp, fadeRight, vp } from "../lib/animations";
import { PERSON, STATS } from "../data";

/* ── Styles ── */
const HeroWrap = styled.section`
  min-height: 100vh;
  padding: 9rem 0 5rem;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  background: linear-gradient(152deg, ${T.cream} 0%, ${T.warm} 52%, #e8dcc8 100%);
`;

/* Giant watermark behind everything */
const Watermark = styled(motion.div)`
  position: absolute;
  top: -6%;
  right: -2%;
  font-family: ${T.fontDisplay};
  font-size: clamp(200px, 33vw, 500px);
  font-weight: 700;
  line-height: 0.82;
  color: transparent;
  -webkit-text-stroke: 1px rgba(15, 15, 13, 0.05);
  user-select: none;
  pointer-events: none;
  z-index: 0;
  letter-spacing: -0.06em;
`;

/* Floating accent square */
const AccentSquare = styled(motion.div)`
  position: absolute;
  bottom: 12%;
  right: 8%;
  width: 180px;
  height: 180px;
  border: 1px solid rgba(184, 131, 42, 0.2);
  border-radius: 4px;
  z-index: 0;

  @media (max-width: 768px) { display: none; }
`;

const AccentDot = styled(motion.div)`
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

const HeroInner = styled(Inner)`
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 3rem;
  align-items: flex-end;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const HeroLeft = styled(motion.div)``;

const Eyebrow = styled(motion.div)`
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

/* Title split into two lines for dramatic effect */
const HeroTitleWrap = styled.div`
  overflow: hidden;
  margin-bottom: 0.1em;
`;

const TitleLine = styled(motion.h1)`
  font-family: ${T.fontDisplay};
  font-size: clamp(4.2rem, 10vw, 10.5rem);
  font-weight: 700;
  line-height: 0.9;
  letter-spacing: -0.04em;
  color: ${T.ink};
  display: block;

  &.italic {
    font-style: italic;
    color: ${T.accent};
  }
`;

const HeroBio = styled(motion.p)`
  font-size: clamp(0.95rem, 1.3vw, 1.1rem);
  color: ${T.muted};
  line-height: 1.8;
  max-width: 480px;
  margin-top: 1.6rem;
  font-weight: 400;
`;

const CTARow = styled(motion.div)`
  display: flex;
  gap: 1rem;
  margin-top: 2.5rem;
  flex-wrap: wrap;
`;

/* Stats on the right */
const StatsCol = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: flex-end;
  padding-bottom: 0.5rem;

  @media (max-width: 900px) {
    flex-direction: row;
    flex-wrap: wrap;
    align-items: flex-start;
    gap: 1.5rem 2.5rem;
  }
`;

const Stat = styled.div`
  text-align: right;

  @media (max-width: 900px) { text-align: left; }
`;

const StatN = styled.div`
  font-family: ${T.fontDisplay};
  font-size: clamp(2.2rem, 4vw, 3.2rem);
  font-weight: 700;
  color: ${T.ink};
  line-height: 1;
  letter-spacing: -0.03em;
`;

const StatL = styled.div`
  font-family: ${T.fontMono};
  font-size: 0.65rem;
  color: ${T.muted};
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin-top: 0.3rem;
`;

const BottomBar = styled(motion.div)`
  position: relative;
  z-index: 1;
  max-width: 1240px;
  margin: 3.5rem auto 0;
  padding: 0 3rem;
  border-top: 1px solid ${T.border};
  padding-top: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;

  @media (max-width: 768px) {
    padding: 0 1.5rem;
    padding-top: 1.5rem;
    flex-direction: column;
    align-items: flex-start;
  }
`;

const TechList = styled.span`
  font-family: ${T.fontMono};
  font-size: 0.65rem;
  color: ${T.muted};
  letter-spacing: 0.09em;
  text-transform: uppercase;
`;

const ScrollHint = styled(motion.button)`
  background: none;
  border: none;
  cursor: pointer;
  font-family: ${T.fontMono};
  font-size: 0.65rem;
  color: ${T.muted};
  letter-spacing: 0.12em;
  text-transform: uppercase;
  transition: color 0.2s;

  &:hover { color: ${T.accent}; }
`;

/* ── Component ── */
interface HeroSectionProps {
  scrollTo: (id: string) => void;
}

const containerVariants = stagger(0.06, 0.1);

export function HeroSection({ scrollTo }: HeroSectionProps) {
  return (
    <HeroWrap id="home">
      {/* Decorative elements */}
      <Watermark
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4, delay: 0.2 }}
      >
        AS
      </Watermark>

      <AccentSquare
        initial={{ opacity: 0, rotate: -8 }}
        animate={{ opacity: 1, rotate: 0 }}
        transition={{ duration: 1.2, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
      />

      <AccentDot
        animate={{ scale: [1, 1.6, 1], opacity: [1, 0.5, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Main content */}
      <HeroInner>
        <HeroLeft
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          <Eyebrow variants={fadeUp}>
            Senior Frontend Engineer · Lagos, Nigeria 🇳🇬
          </Eyebrow>

          {/* Dramatic split title */}
          <HeroTitleWrap>
            <TitleLine variants={heroTitle}>Adedayo</TitleLine>
          </HeroTitleWrap>
          <HeroTitleWrap>
            <TitleLine className="italic" variants={heroTitle}>
              Showande
            </TitleLine>
          </HeroTitleWrap>

          <HeroBio variants={fadeUp}>
            {PERSON.bio}
          </HeroBio>

          <CTARow variants={fadeUp}>
            <BtnPrimary
              onClick={() => scrollTo("projects")}
              whileTap={{ scale: 0.97 }}
            >
              View Work <ArrowRight size={15} />
            </BtnPrimary>
            <BtnGhost
              onClick={() => scrollTo("contact")}
              whileTap={{ scale: 0.97 }}
            >
              <Mail size={15} /> Get in Touch
            </BtnGhost>
          </CTARow>
        </HeroLeft>

        {/* Stats */}
        <StatsCol
          variants={stagger(0.1, 0.5)}
          initial="hidden"
          animate="show"
        >
          {STATS.map((s) => (
            <Stat key={s.l}>
              <StatN>{s.n}</StatN>
              <StatL>{s.l}</StatL>
            </Stat>
          ))}
        </StatsCol>
      </HeroInner>

      {/* Bottom bar */}
      <BottomBar
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.6 }}
      >
        <TechList>React · Next.js · TypeScript · GraphQL · React Native</TechList>
        <ScrollHint
          onClick={() => scrollTo("projects")}
          whileHover={{ y: 2 }}
        >
          Scroll to explore ↓
        </ScrollHint>
      </BottomBar>
    </HeroWrap>
  );
}
