"use client";

import styled from "styled-components";
import { motion } from "framer-motion";
import { ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";
import { T } from "../styles/tokens";
import { Inner, Label } from "./ui";
import { fadeRight, stagger, vp } from "../lib/animations";
import { PERSON } from "../data";

const Wrap = styled.section`
  background: ${T.bgDeep};
  padding: 8rem 0;
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 5rem 0;
  }
`;

const BgWord = styled.div`
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

const Grid = styled.div`
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

const BigHeading = styled(motion.h2)`
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

const SubText = styled(motion.p)`
  font-size: 0.96rem;
  color: ${T.inkMuted};
  line-height: 1.8;
  max-width: 360px;
  margin-top: 1.8rem;
`;

const SocRow = styled(motion.div)`
  display: flex;
  gap: 0.9rem;
  margin-top: 2.5rem;
`;

const SocBtn = styled(motion.a)`
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

const LinksCol = styled(motion.div)`
  display: flex;
  flex-direction: column;
  border-top: 1px solid ${T.border};
`;

const LinkRow = styled(motion.a)`
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

const LinkLeft = styled.div``;

const LinkLabel = styled.div`
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

const LinkVal = styled.div`
  font-size: 0.92rem;
  font-weight: 500;
`;

const LinkArrow = styled(motion.div)`
  color: ${T.inkDim};
  transition: color 0.22s;

  ${LinkRow}:hover & {
    color: ${T.accent};
  }
`;

export function ContactSection() {
  const contactLinks = [
    { label: "Email", val: PERSON.email, href: `mailto:${PERSON.email}` },
    { label: "Phone", val: PERSON.phone, href: `tel:${PERSON.phone}` },
    { label: "GitHub", val: "github.com/IsiaqAdedayo", href: PERSON.github },
    {
      label: "LinkedIn",
      val: "linkedin.com/in/showande-adedayo",
      href: PERSON.linkedin,
    },
    { label: "Resume", val: "View / Download", href: PERSON.resume },
  ];

  return (
    <Wrap id="contact">
      <BgWord>Hello.</BgWord>

      <Inner>
        <Label
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={vp}
        >
          Available for work
        </Label>

        <Grid>
          <div>
            <BigHeading
              initial={{ opacity: 0, y: 40, skewY: 3 }}
              whileInView={{ opacity: 1, y: 0, skewY: 0 }}
              viewport={vp}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              Let&apos;s
              <br />
              <em>Build</em>
              <br />
              Together
            </BigHeading>

            <SubText
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={vp}
              transition={{ delay: 0.3 }}
            >
              Open to freelance projects, full-time roles, and creative
              collaborations. Based in Lagos — working globally.
            </SubText>

            <SocRow
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={vp}
              transition={{ delay: 0.45 }}
            >
              {[
                { href: PERSON.github, icon: <Github size={15} /> },
                { href: PERSON.linkedin, icon: <Linkedin size={15} /> },
                { href: `mailto:${PERSON.email}`, icon: <Mail size={15} /> },
                {
                  href: PERSON.twitter,
                  icon: (
                    <span
                      style={{
                        fontFamily: "monospace",
                        fontSize: 14,
                        fontWeight: 700,
                      }}
                    >
                      𝕏
                    </span>
                  ),
                },
              ].map((s, i) => (
                <SocBtn
                  key={i}
                  href={s.href}
                  target="_blank"
                  whileHover={{ y: -2, scale: 1.08 }}
                >
                  {s.icon}
                </SocBtn>
              ))}
            </SocRow>
          </div>

          <LinksCol
            variants={stagger(0.08, 0.2)}
            initial="hidden"
            whileInView="show"
            viewport={vp}
          >
            {contactLinks.map((c) => (
              <LinkRow
                key={c.label}
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                variants={fadeRight}
                whileHover={{ x: 5 }}
              >
                <LinkLeft>
                  <LinkLabel>{c.label}</LinkLabel>
                  <LinkVal>{c.val}</LinkVal>
                </LinkLeft>
                <LinkArrow>
                  <ArrowUpRight size={17} />
                </LinkArrow>
              </LinkRow>
            ))}
          </LinksCol>
        </Grid>
      </Inner>
    </Wrap>
  );
}
