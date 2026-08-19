"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { navDrop } from "../../lib/animations";
import { PERSON } from "../../data";
import { useCursorHandlers } from "../CustomCursor";
import {
  Nav,
  Logo,
  NavLinks,
  NavLink,
  HireBtn,
  HamburgerBtn,
  Bar,
  DrawerOverlay,
  DrawerPanel,
  DrawerLink,
  DrawerHireBtn,
  DrawerDivider,
} from "./styles";

const SECTIONS = ["projects", "skills", "experience", "contact"];

interface NavbarProps {
  scrollTo: (id: string) => void;
}

/* ── animation variants ─────────────────────────────── */
const overlayV = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.25 } },
  exit: { opacity: 0, transition: { duration: 0.22 } },
};

const drawerV = {
  hidden: { x: "100%" },
  show: {
    x: 0,
    transition: { type: "spring", stiffness: 340, damping: 34, mass: 0.9 },
  },
  exit: {
    x: "100%",
    transition: { type: "spring", stiffness: 340, damping: 34, mass: 0.9 },
  },
};

const linkContainerV = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.12 } },
};

const linkItemV = {
  hidden: { opacity: 0, x: 28 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
};

const hireBtnV = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.38 },
  },
};

/* ── bar morph helpers ───────────────────────────────── */
const topBarV = {
  closed: { rotate: 0, y: 0 },
  open: { rotate: 45, y: 6.5 },
};
const midBarV = {
  closed: { opacity: 1, scaleX: 1 },
  open: { opacity: 0, scaleX: 0 },
};
const btmBarV = {
  closed: { rotate: 0, y: 0 },
  open: { rotate: -45, y: -6.5 },
};

const SPRING = { type: "spring", stiffness: 400, damping: 30 } as const;

export function Navbar({ scrollTo }: NavbarProps) {
  const [activeSection, setActiveSection] = useState<string>("");
  const [menuOpen, setMenuOpen] = useState(false);
  const cursorHover = useCursorHandlers("hover");

  /* ── section tracking ───────────────────────────────── */
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
      );
      observer.observe(el);
      observers.push(observer);
    });

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

  /* ── lock body scroll when drawer is open ───────────── */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const handleDrawerNav = (id: string) => {
    setMenuOpen(false);
    // tiny delay so the drawer can start closing before scrolling
    setTimeout(() => scrollTo(id), 80);
  };

  return (
    <>
      <Nav variants={navDrop} initial="hidden" animate="show">
        <Logo
          onClick={() => scrollTo("home")}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          {...cursorHover}
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
              {...cursorHover}
            >
              {s}
            </NavLink>
          ))}
        </NavLinks>

        <HireBtn
          href={`mailto:${PERSON.email}`}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          {...cursorHover}
        >
          Hire Me ↗
        </HireBtn>

        {/* Hamburger — mobile only */}
        <HamburgerBtn
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          animate={menuOpen ? "open" : "closed"}
          whileTap={{ scale: 0.92 }}
        >
          <Bar variants={topBarV} transition={SPRING} />
          <Bar variants={midBarV} transition={SPRING} />
          <Bar variants={btmBarV} transition={SPRING} />
        </HamburgerBtn>
      </Nav>

      {/* ── Mobile drawer ── */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <DrawerOverlay
              key="overlay"
              variants={overlayV}
              initial="hidden"
              animate="show"
              exit="exit"
              onClick={() => setMenuOpen(false)}
            />

            {/* Panel */}
            <DrawerPanel
              key="drawer"
              variants={drawerV as any}
              initial="hidden"
              animate="show"
              exit="exit"
            >
              {/* Staggered nav links */}
              <motion.div
                variants={linkContainerV}
                initial="hidden"
                animate="show"
                style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}
              >
                {SECTIONS.map((s) => (
                  <DrawerLink
                    key={s}
                    variants={linkItemV as any}
                    onClick={() => handleDrawerNav(s)}
                    whileTap={{ scale: 0.97 }}
                    {...cursorHover}
                  >
                    {s}
                  </DrawerLink>
                ))}
              </motion.div>

              <DrawerDivider />

              {/* Hire Me at the bottom */}
              <DrawerHireBtn
                href={`mailto:${PERSON.email}`}
                variants={hireBtnV as any}
                initial="hidden"
                animate="show"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                {...cursorHover}
              >
                Hire Me ↗
              </DrawerHireBtn>
            </DrawerPanel>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
