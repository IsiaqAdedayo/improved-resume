"use client";

import { Github, Linkedin, Mail } from "lucide-react";
import { PERSON } from "../../data";
import { MarbleJar } from "../MarbleJar";
import { FooterEl, FooterContent, Note, SocRow, SocBtn, Divider } from "./styles";

export function Footer() {
  return (
    <FooterEl>
      {/* Signature marble jar interaction */}
      <MarbleJar />

      <Divider />

      {/* Footer bar */}
      <FooterContent>
        <Note>© {new Date().getFullYear()} Adedayo Showande · All rights reserved</Note>

        <SocRow>
          {[
            { href: PERSON.github, icon: <Github size={12} />, label: "GitHub" },
            { href: PERSON.linkedin, icon: <Linkedin size={12} />, label: "LinkedIn" },
            { href: `mailto:${PERSON.email}`, icon: <Mail size={12} />, label: "Email" },
          ].map((s) => (
            <SocBtn key={s.label} href={s.href} target="_blank" whileHover={{ y: -2 }} aria-label={s.label}>
              {s.icon}
            </SocBtn>
          ))}
        </SocRow>

        <Note>Next.js · Framer Motion · Styled Components</Note>
      </FooterContent>
    </FooterEl>
  );
}
