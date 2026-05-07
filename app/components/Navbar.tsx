"use client";

import styled from "styled-components";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { T } from "../styles/tokens";
import { navDrop } from "../lib/animations";
import { PERSON } from "../data";

const Nav = styled(motion.nav)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  padding: 1.35rem 3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(13, 11, 20, 0.82);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border-bottom: 1px solid ${T.border};

  @media (max-width: 768px) {
    padding: 1.2rem 1.5rem;
  }
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

  span {
    color: ${T.accent};
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2.5rem;
  align-items: center;

  @media (max-width: 620px) {
    display: none;
  }
`;

const NavLink = styled(motion.button)<{ $active: boolean }>`
  background: none;
  border: none;
  cursor: pointer;
  font-family: ${T.fontBody};
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${(p) => (p.$active ? T.ink : T.inkMuted)};
  transition: color 0.2s;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: -4px;
    left: 0;
    right: 0;
    height: 1px;
    background: ${T.accent};
    transform: scaleX(${(p) => (p.$active ? 1 : 0)});
    transform-origin: left;
    transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1);
  }

  &:hover {
    color: ${T.ink};
  }
`;

const HireBtn = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  background: ${T.accent};
  color: #fff;
  border: none;
  border-radius: 3px;
  padding: 0.55rem 1.25rem;
  font-family: ${T.fontBody};
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  cursor: pointer;
  transition: background 0.2s;
  text-decoration: none;

  &:hover {
    background: ${T.accentHover};
  }

  @media (max-width: 620px) {
    display: none;
  }
`;

const SECTIONS = ["projects", "skills", "experience", "contact"];

interface NavbarProps {
  scrollTo: (id: string) => void;
}

export function Navbar({ scrollTo }: NavbarProps) {
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        {
          rootMargin: "-40% 0px -55% 0px",
          threshold: 0,
        }
      );

      observer.observe(el);
      observers.push(observer);
    });

    // Also watch for hero (top of page)
    const heroEl = document.getElementById("home");
    if (heroEl) {
      const heroObserver = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection("");
        },
        { rootMargin: "0px 0px -80% 0px", threshold: 0 }
      );
      heroObserver.observe(heroEl);
      observers.push(heroObserver);
    }

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <Nav variants={navDrop} initial="hidden" animate="show">
      <Logo
        onClick={() => scrollTo("home")}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
      >
        A<span>.</span>S
      </Logo>

      <NavLinks>
        {SECTIONS.map((s) => (
          <NavLink
            key={s}
            $active={activeSection === s}
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
