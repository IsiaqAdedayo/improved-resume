"use client";

import { useEffect, useState } from "react";
import { navDrop } from "../../lib/animations";
import { PERSON } from "../../data";
import { Nav, Logo, NavLinks, NavLink, HireBtn } from "./styles";

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
