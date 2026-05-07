"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useSpring } from "framer-motion";
import { GlobalStyles } from "./styles/GlobalStyles";
import {
  PageWrap,
  Grain,
  ProgressBar,
  CursorGlowWrap,
  CursorGlowOrb,
} from "./components/ui";

import { Navbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { ProjectsSection } from "./components/ProjectsSection";
import { SkillsSection } from "./components/SkillsSection";
import { ExperienceSection } from "./components/ExperienceSection";
import { ContactSection } from "./components/ContactSection";
import { Footer } from "./components/Footer";

export default function Portfolio() {
  const { scrollYProgress } = useScroll();
  const [mounted, setMounted] = useState(false);

  // Cursor glow tracking
  const cursorX = useRef(0);
  const cursorY = useRef(0);
  const [pos, setPos] = useState({ x: -999, y: -999 });

  const springX = useSpring(pos.x, { stiffness: 90, damping: 22 });
  const springY = useSpring(pos.y, { stiffness: 90, damping: 22 });

  useEffect(() => {
    setMounted(true);

    const onMove = (e: MouseEvent) => {
      cursorX.current = e.clientX;
      cursorY.current = e.clientY;
      setPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  if (!mounted) return null;

  return (
    <>
      <GlobalStyles />
      <PageWrap>
        <Grain />

        {/* Scroll progress bar */}
        <ProgressBar style={{ scaleX: scrollYProgress }} />

        {/* Cursor glow */}
        <CursorGlowWrap>
          <CursorGlowOrb style={{ left: springX, top: springY }} />
        </CursorGlowWrap>

        <Navbar scrollTo={scrollTo} />

        <HeroSection scrollTo={scrollTo} />
        <ProjectsSection />
        <SkillsSection />
        <ExperienceSection />
        <ContactSection />
        <Footer />
      </PageWrap>
    </>
  );
}
