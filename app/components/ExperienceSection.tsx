"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import styled from "styled-components";
import { EDUCATION, EXPERIENCE } from "../data";
import { vp } from "../lib/animations";
import { T } from "../styles/tokens";
import { Heading, Inner, Label, Section } from "./ui";

/* ── Styles ── */
const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 5rem;
  margin-top: 1.5rem;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }
`;

const SideCol = styled.div``;

const SideDesc = styled.p`
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

const EduBlock = styled.div`
  margin-top: 2.5rem;
  border-top: 1px solid ${T.border};
  padding-top: 1.5rem;
`;

const EduTitle = styled.div`
  font-family: ${T.fontMono};
  font-size: 0.63rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${T.muted};
  margin-bottom: 1rem;
`;

const EduItem = styled.div`
  margin-bottom: 1rem;
`;

const EduDeg = styled.div`
  font-size: 0.875rem;
  font-weight: 600;
  color: ${T.inkLight};
  line-height: 1.4;
`;

const EduOrg = styled.div`
  font-family: ${T.fontMono};
  font-size: 0.68rem;
  color: ${T.muted};
  margin-top: 0.15rem;
`;

/* Experience accordion */
const ExpList = styled.div`
  border-top: 1px solid ${T.border};
`;

const ExpCard = styled(motion.div)`
  border-bottom: 1px solid ${T.border};
`;

const ExpHeader = styled.button`
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

const ExpYear = styled.div`
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

const ExpMeta = styled.div``;

const ExpRole = styled.h4`
  font-family: ${T.fontDisplay};
  font-size: clamp(1.2rem, 2vw, 1.6rem);
  font-weight: 700;
  color: ${T.ink};
  letter-spacing: -0.02em;
  line-height: 1.15;
  transition: color 0.2s;
`;

const ExpCompany = styled.div`
  font-family: ${T.fontMono};
  font-size: 0.7rem;
  color: ${T.accent};
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-top: 0.3rem;
`;

const ExpType = styled.div`
  font-size: 0.78rem;
  color: ${T.muted};
  margin-top: 0.2rem;
`;

const ChevronIcon = styled(motion.div)`
  color: ${T.muted};
  margin-top: 0.35rem;
  flex-shrink: 0;
`;

const ExpBody = styled(motion.div)`
  overflow: hidden;
`;

const ExpBodyInner = styled.div`
  padding-bottom: 2rem;
  padding-left: calc(110px + 1.5rem);

  @media (max-width: 560px) {
    padding-left: 0;
  }
`;

const BulletList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
  margin-bottom: 1.2rem;
`;

const Bullet = styled.li`
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

const TechLine = styled.div`
  display: flex;
  gap: 0.6rem;
  flex-wrap: wrap;
  margin-top: 0.5rem;
`;

const TechBadge = styled.span`
  font-family: ${T.fontMono};
  font-size: 0.62rem;
  letter-spacing: 0.07em;
  color: ${T.accent};
  background: rgba(184, 131, 42, 0.1);
  padding: 0.22rem 0.6rem;
  border-radius: 2px;
  text-transform: uppercase;
`;

/* ── Component ── */
export function ExperienceSection() {
  const [open, setOpen] = useState<number>(0); // first item open by default

  return (
    <Section id="experience">
      <Inner>
        <Label
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={vp}
        >
          Career
        </Label>

        <Grid>
          {/* Left side */}
          <SideCol>
            <Heading
              $size="clamp(2rem, 3.5vw, 3.5rem)"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={vp}
              style={{ marginBottom: 0 }}
            >
              Work <em>Experience</em>
            </Heading>

            <SideDesc>
              4+ years shipping production apps — from startup internship to{" "}
              <strong>leading frontend</strong> on a VC-backed marketplace with
              hundreds of active users.
            </SideDesc>

            {/* Education */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={vp}
              transition={{ delay: 0.2 }}
            >
              <EduBlock>
                <EduTitle>Education</EduTitle>
                {EDUCATION.map((e) => (
                  <EduItem key={e.title}>
                    <EduDeg>{e.title}</EduDeg>
                    <EduOrg>
                      {e.org} · {e.year}
                    </EduOrg>
                  </EduItem>
                ))}
              </EduBlock>
            </motion.div>
          </SideCol>

          {/* Right: accordion */}
          <ExpList>
            {EXPERIENCE.map((exp, i) => {
              const isOpen = open === i;
              return (
                <ExpCard
                  key={exp.company}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={vp}
                  transition={{ delay: i * 0.1 }}
                >
                  <ExpHeader onClick={() => setOpen(isOpen ? -1 : i)}>
                    <ExpYear>{exp.period}</ExpYear>
                    <ExpMeta>
                      <ExpRole style={{ color: isOpen ? T.accent : T.ink }}>
                        {exp.role}
                      </ExpRole>
                      <ExpCompany>{exp.company}</ExpCompany>
                      <ExpType>{exp.type}</ExpType>
                    </ExpMeta>
                    <ChevronIcon
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown size={18} />
                    </ChevronIcon>
                  </ExpHeader>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <ExpBody
                        key="body"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                          duration: 0.38,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                      >
                        <ExpBodyInner>
                          <BulletList>
                            {exp.bullets.map((b, j) => (
                              <Bullet key={j}>{b}</Bullet>
                            ))}
                          </BulletList>
                          <TechLine>
                            {exp.tech.map((t) => (
                              <TechBadge key={t}>{t}</TechBadge>
                            ))}
                          </TechLine>
                        </ExpBodyInner>
                      </ExpBody>
                    )}
                  </AnimatePresence>
                </ExpCard>
              );
            })}
          </ExpList>
        </Grid>
      </Inner>
    </Section>
  );
}
