"use client";

import styled from "styled-components";
import { motion } from "framer-motion";
import { T } from "../styles/tokens";
import { navDrop } from "../lib/animations";
import { PERSON } from "../data";

/* ── Styles ── */
const Nav = styled(motion.nav)`
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 100;
  padding: 1.35rem 3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(248, 245, 238, 0.9);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid ${T.border};

  @media (max-width: 768px) { padding: 1.2rem 1.5rem; }
`;

const Logo = styled(motion.button)`
  background: none;
  border: none;
  cursor: pointer;
  font-family: ${T.fontDisplay};
  font-size: 1.5rem;
  font-weight: 700;
  color: ${T.ink};
  letter-spacing: -0.03em;
  line-height: 1;

  span { color: ${T.accent}; }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2.5rem;
  align-items: center;

  @media (max-width: 620px) { display: none; }
`;

const NavLink = styled(motion.button)`
  background: none;
  border: none;
  cursor: pointer;
  font-family: ${T.fontBody};
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${T.muted};
  transition: color 0.2s;

  &:hover { color: ${T.ink}; }
`;

const HireBtn = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  background: ${T.ink};
  color: ${T.white};
  border: none;
  border-radius: 2px;
  padding: 0.55rem 1.25rem;
  font-family: ${T.fontBody};
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  cursor: pointer;
  transition: background 0.2s;
  text-decoration: none;

  &:hover { background: ${T.accent}; }

  @media (max-width: 620px) { display: none; }
`;

/* ── Component ── */
interface NavbarProps {
  scrollTo: (id: string) => void;
}

export function Navbar({ scrollTo }: NavbarProps) {
  return (
    <Nav variants={navDrop} initial="hidden" animate="show">
      <Logo onClick={() => scrollTo("home")} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
        A<span>.</span>S
      </Logo>

      <NavLinks>
        {["projects", "experience", "skills", "contact"].map((s) => (
          <NavLink
            key={s}
            onClick={() => scrollTo(s)}
            whileHover={{ y: -1 }}
          >
            {s}
          </NavLink>
        ))}
      </NavLinks>

      <HireBtn
        href={`mailto:${PERSON.email}`}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
      >
        Hire Me ↗
      </HireBtn>
    </Nav>
  );
}
