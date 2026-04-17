"use client";

import styled from "styled-components";
import { motion } from "framer-motion";
import { T } from "../styles/tokens";
import { Inner, Label } from "./ui";
import { vp } from "../lib/animations";
import { SKILLS, SKILL_MARQUEE } from "../data";

/* ── Styles ── */
const Wrap = styled.section`
  padding: 5rem 0 6rem;
  background: ${T.warm};
  border-top: 1px solid ${T.border};
  border-bottom: 1px solid ${T.border};
  overflow: hidden;
`;

/* Marquee strip */
const MarqueeLabel = styled(Inner)`
  margin-bottom: 1.6rem;
`;

const MarqueeOuter = styled.div`
  position: relative;
  overflow: hidden;

  /* Fade masks on edges */
  &::before, &::after {
    content: "";
    position: absolute;
    top: 0; bottom: 0;
    width: 12%;
    z-index: 1;
    pointer-events: none;
  }
  &::before {
    left: 0;
    background: linear-gradient(to right, ${T.warm}, transparent);
  }
  &::after {
    right: 0;
    background: linear-gradient(to left, ${T.warm}, transparent);
  }
`;

const Track = styled(motion.div)`
  display: flex;
  gap: 1.2rem;
  width: max-content;
  padding: 0.5rem 0;
`;

const Chip = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.52rem 1.2rem;
  border: 1px solid ${T.border};
  border-radius: 100px;
  background: ${T.cream};
  font-family: ${T.fontBody};
  font-size: 0.84rem;
  font-weight: 500;
  color: ${T.inkLight};
  white-space: nowrap;
  transition: border-color 0.2s, color 0.2s;

  &::before {
    content: "·";
    color: ${T.accent};
    font-size: 1rem;
    line-height: 1;
  }

  &:hover {
    border-color: ${T.accent};
    color: ${T.ink};
  }
`;

/* Skills grid */
const GridWrap = styled(Inner)`
  margin-top: 4rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin-top: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }
`;

const CategoryCard = styled(motion.div)`
  padding: 1.5rem;
  border: 1px solid ${T.border};
  border-radius: 4px;
  background: ${T.cream};
  transition: border-color 0.2s;

  &:hover { border-color: ${T.accent}; }
`;

const CatTitle = styled.div`
  font-family: ${T.fontMono};
  font-size: 0.65rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${T.accent};
  margin-bottom: 1rem;
`;

const SkillList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const SkillItem = styled.li`
  font-size: 0.875rem;
  color: ${T.inkLight};
  font-weight: 500;
  padding-left: 1rem;
  position: relative;

  &::before {
    content: "▹";
    position: absolute;
    left: 0;
    color: ${T.muted};
    font-size: 0.7rem;
    top: 0.1em;
  }
`;

/* ── Component ── */
export function SkillsSection() {
  return (
    <Wrap id="skills">
      {/* Marquee */}
      <MarqueeLabel>
        <Label
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={vp}
        >
          Tech stack
        </Label>
      </MarqueeLabel>

      <MarqueeOuter>
        <Track
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
        >
          {[...SKILL_MARQUEE, ...SKILL_MARQUEE].map((s, i) => (
            <Chip key={i}>{s}</Chip>
          ))}
        </Track>
      </MarqueeOuter>

      {/* Categorised grid */}
      <GridWrap>
        <Label
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={vp}
          style={{ marginTop: 0 }}
        >
          By category
        </Label>

        <Grid>
          {Object.entries(SKILLS).map(([cat, items], i) => (
            <CategoryCard
              key={cat}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={vp}
              transition={{ duration: 0.55, delay: i * 0.07 }}
            >
              <CatTitle>{cat}</CatTitle>
              <SkillList>
                {items.map((skill) => (
                  <SkillItem key={skill}>{skill}</SkillItem>
                ))}
              </SkillList>
            </CategoryCard>
          ))}
        </Grid>
      </GridWrap>
    </Wrap>
  );
}
