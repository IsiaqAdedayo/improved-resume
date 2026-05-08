"use client";

import { ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";
import { Inner, Label } from "../ui";
import { fadeRight, stagger, vp } from "../../lib/animations";
import { PERSON } from "../../data";
import { Wrap, BgWord, Grid, BigHeading, SubText, SocRow, SocBtn, LinksCol, LinkRow, LinkLeft, LinkLabel, LinkVal, LinkArrow } from "./styles";

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
