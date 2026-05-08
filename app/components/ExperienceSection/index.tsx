"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { EDUCATION, EXPERIENCE } from "../../data";
import { vp } from "../../lib/animations";
import { T } from "../../styles/tokens";
import { Heading, Inner, Label, Section } from "../ui";
import { Grid, SideCol, SideDesc, EduBlock, EduTitle, EduItem, EduDeg, EduOrg, ExpList, ExpCard, ExpHeader, ExpYear, ExpMeta, ExpRole, ExpCompany, ExpType, ChevronIcon, ExpBody, ExpBodyInner, BulletList, Bullet, TechLine, TechBadge } from "./styles";

/* ── Styles ── */
/* Experience accordion */
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
