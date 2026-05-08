"use client";

import { Github, Linkedin, Mail } from "lucide-react";
import { PERSON } from "../../data";
import { FooterEl, Note, SocRow, SocBtn } from "./styles";

export function Footer() {
  return (
    <FooterEl>
      <Note>© 2025 Adedayo Showande · All rights reserved</Note>

      <SocRow>
        {[
          { href: PERSON.github, icon: <Github size={12} /> },
          { href: PERSON.linkedin, icon: <Linkedin size={12} /> },
          { href: `mailto:${PERSON.email}`, icon: <Mail size={12} /> },
        ].map((s, i) => (
          <SocBtn key={i} href={s.href} target="_blank" whileHover={{ y: -2 }}>
            {s.icon}
          </SocBtn>
        ))}
      </SocRow>

      <Note>Next.js · Framer Motion · Styled Components</Note>
    </FooterEl>
  );
}
