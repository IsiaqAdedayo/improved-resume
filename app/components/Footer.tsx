"use client";

import styled from "styled-components";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";
import { T } from "../styles/tokens";
import { PERSON } from "../data";

const FooterEl = styled.footer`
  background: ${T.bgDeep};
  border-top: 1px solid ${T.border};
  padding: 1.8rem 3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;

  @media (max-width: 640px) {
    padding: 1.5rem;
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Note = styled.div`
  font-family: ${T.fontMono};
  font-size: 0.66rem;
  color: ${T.inkDim};
  letter-spacing: 0.05em;
`;

const SocRow = styled.div`
  display: flex;
  gap: 0.9rem;
`;

const SocBtn = styled(motion.a)`
  width: 32px;
  height: 32px;
  border: 1px solid ${T.border};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${T.inkDim};
  text-decoration: none;
  transition:
    border-color 0.2s,
    color 0.2s;

  &:hover {
    border-color: ${T.accent};
    color: ${T.accent};
  }
`;

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
