"use client";

import styled from "styled-components";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { T } from "../styles/tokens";
import { Section, Inner, Label, Heading, Tag } from "./ui";
import { fadeUp, stagger, vp } from "../lib/animations";
import { PROJECTS } from "../data";

/* ── Styles ── */
const ProjectList = styled.div`
  border-top: 1px solid ${T.border};
  margin-top: 3.5rem;
`;

const Row = styled(motion.div)`
  display: grid;
  grid-template-columns: 3rem 1fr auto;
  gap: 2rem;
  align-items: center;
  padding: 2.4rem 0;
  border-bottom: 1px solid ${T.border};
  cursor: pointer;
  position: relative;

  /* Gold underline sweep on hover */
  &::after {
    content: "";
    position: absolute;
    bottom: -1px;
    left: 0;
    height: 1px;
    width: 0;
    background: ${T.accent};
    transition: width 0.5s cubic-bezier(0.22, 1, 0.36, 1);
  }
  &:hover::after { width: 100%; }

  @media (max-width: 640px) {
    grid-template-columns: 1fr auto;
    gap: 1rem;
  }
`;

const Idx = styled.span`
  font-family: ${T.fontMono};
  font-size: 0.68rem;
  color: ${T.muted};
  letter-spacing: 0.06em;

  @media (max-width: 640px) { display: none; }
`;

const Info = styled.div``;

const ProjTitle = styled.h3`
  font-family: ${T.fontDisplay};
  font-size: clamp(1.4rem, 2.8vw, 2.2rem);
  font-weight: 700;
  color: ${T.ink};
  letter-spacing: -0.025em;
  line-height: 1.1;
  transition: color 0.2s;

  ${Row}:hover & { color: ${T.accent}; }
`;

const BadgePill = styled.span`
  display: inline-block;
  margin-left: 0.75rem;
  font-family: ${T.fontMono};
  font-size: 0.58rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  background: ${T.accent};
  color: #fff;
  padding: 0.18rem 0.65rem;
  border-radius: 2px;
  vertical-align: middle;
  line-height: 1.6;
`;

const Tagline = styled.p`
  font-size: 0.875rem;
  color: ${T.muted};
  margin-top: 0.3rem;
  line-height: 1.5;
  max-width: 640px;
`;

const TechRow = styled.div`
  display: flex;
  gap: 0.8rem;
  flex-wrap: wrap;
  margin-top: 0.5rem;
`;

const Arrow = styled.div`
  width: 42px;
  height: 42px;
  border: 1px solid ${T.border};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${T.muted};
  flex-shrink: 0;
  transition: background 0.2s, border-color 0.2s, color 0.2s, transform 0.2s;

  ${Row}:hover & {
    background: ${T.accent};
    border-color: ${T.accent};
    color: #fff;
    transform: rotate(45deg);
  }
`;

/* ── Component ── */
export function ProjectsSection() {
  const handleRowClick = (p: typeof PROJECTS[0]) => {
    const url = p.link ?? p.github;
    if (url) window.open(url, "_blank");
  };

  return (
    <Section id="projects">
      <Inner>
        <Label
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={vp}
          transition={{ duration: 0.6 }}
        >
          Selected work
        </Label>
        <Heading
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={vp}
          transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
        >
          Featured <em>Projects</em>
        </Heading>

        <ProjectList>
          {PROJECTS.map((p, i) => (
            <Row
              key={p.index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={vp}
              transition={{ duration: 0.55, delay: i * 0.065, ease: [0.22, 1, 0.36, 1] }}
              onClick={() => handleRowClick(p)}
            >
              <Idx>{p.index}</Idx>

              <Info>
                <ProjTitle>
                  {p.title}
                  {p.badge && <BadgePill>{p.badge}</BadgePill>}
                </ProjTitle>
                <Tagline>{p.tagline}</Tagline>
                <TechRow>
                  {p.tech.map((t) => (
                    <Tag key={t}>{t}</Tag>
                  ))}
                </TechRow>
              </Info>

              <Arrow>
                <ArrowUpRight size={16} />
              </Arrow>
            </Row>
          ))}
        </ProjectList>
      </Inner>
    </Section>
  );
}
