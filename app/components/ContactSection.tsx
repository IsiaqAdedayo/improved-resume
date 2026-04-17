"use client";

import styled from "styled-components";
import { motion } from "framer-motion";
import { ArrowUpRight, Github, Linkedin, Mail, Phone } from "lucide-react";
import { T } from "../styles/tokens";
import { Section, Inner, Label, Heading, Divider } from "./ui";
import { fadeUp, fadeRight, stagger, vp } from "../lib/animations";
import { PERSON } from "../data";

/* ── Styles ── */
const ContactWrap = styled(Section)`
  background: ${T.dark};
`;

/* Decorative giant text behind the section */
const BgWord = styled.div`
  position: absolute;
  bottom: -4%;
  left: -1%;
  font-family: ${T.fontDisplay};
  font-size: clamp(140px, 22vw, 320px);
  font-weight: 700;
  font-style: italic;
  line-height: 0.85;
  color: transparent;
  -webkit-text-stroke: 1px rgba(255, 255, 255, 0.04);
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
  color: ${T.white};

  em {
    font-style: italic;
    color: ${T.accent};
  }
`;

const SubText = styled(motion.p)`
  font-size: 0.98rem;
  color: rgba(255, 255, 255, 0.38);
  line-height: 1.8;
  max-width: 360px;
  margin-top: 1.8rem;
`;

const LinksCol = styled(motion.div)`
  display: flex;
  flex-direction: column;
  border-top: 1px solid rgba(255, 255, 255, 0.07);
`;

const LinkRow = styled(motion.a)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.07);
  text-decoration: none;
  color: ${T.white};
  transition: color 0.22s;
  cursor: pointer;

  &:hover { color: ${T.accent}; }
`;

const LinkLeft = styled.div``;

const LinkLabel = styled.div`
  font-family: ${T.fontMono};
  font-size: 0.62rem;
  letter-spacing: 0.13em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.28);
  margin-bottom: 0.3rem;
  transition: color 0.22s;

  ${LinkRow}:hover & { color: rgba(255, 255, 255, 0.45); }
`;

const LinkVal = styled.div`
  font-size: 0.95rem;
  font-weight: 500;
`;

const LinkArrow = styled(motion.div)`
  color: rgba(255, 255, 255, 0.3);
  transition: color 0.22s;

  ${LinkRow}:hover & { color: ${T.accent}; }
`;

const SocRow = styled(motion.div)`
  display: flex;
  gap: 1rem;
  margin-top: 2.5rem;
`;

const SocBtn = styled(motion.a)`
  width: 40px;
  height: 40px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.4);
  text-decoration: none;
  transition: border-color 0.2s, color 0.2s;

  &:hover {
    border-color: ${T.accent};
    color: ${T.accent};
  }
`;

/* ── Component ── */
export function ContactSection() {
  const contactLinks = [
    { label: "Email",       val: PERSON.email,    href: `mailto:${PERSON.email}` },
    { label: "Phone",       val: PERSON.phone,    href: `tel:${PERSON.phone}` },
    { label: "GitHub",      val: "github.com/IsiaqAdedayo", href: PERSON.github },
    { label: "LinkedIn",    val: "linkedin.com/in/showande-adedayo", href: PERSON.linkedin },
    { label: "Portfolio",   val: "adedayo-portfolio-website.vercel.app", href: PERSON.portfolio },
  ];

  return (
    <ContactWrap id="contact" $dark>
      <BgWord>Hello.</BgWord>

      <Inner>
        <Label $invert
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={vp}
        >
          Available for work
        </Label>

        <Grid>
          {/* Left */}
          <div>
            <BigHeading
              initial={{ opacity: 0, y: 40, skewY: 3 }}
              whileInView={{ opacity: 1, y: 0, skewY: 0 }}
              viewport={vp}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              Let&apos;s<br /><em>Build</em><br />Together
            </BigHeading>

            <SubText
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={vp}
              transition={{ delay: 0.3 }}
            >
              Open to freelance projects, full-time roles, and creative collaborations.
              Based in Lagos — working globally.
            </SubText>

            {/* Social icons */}
            <SocRow
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={vp}
              transition={{ delay: 0.45 }}
            >
              {[
                { href: PERSON.github,   icon: <Github size={15} /> },
                { href: PERSON.linkedin, icon: <Linkedin size={15} /> },
                { href: PERSON.twitter,  icon: <span style={{ fontFamily: "monospace", fontSize: 14, fontWeight: 700 }}>𝕏</span> },
                { href: `mailto:${PERSON.email}`, icon: <Mail size={15} /> },
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

          {/* Right: contact links */}
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
    </ContactWrap>
  );
}
