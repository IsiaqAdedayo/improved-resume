"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useSpring } from "framer-motion";
import { GlobalStyles } from "../styles/GlobalStyles";
import {
  PageWrap,
  Grain,
  ProgressBar,
  CursorGlowWrap,
  CursorGlowOrb,
} from "./ui";
import { CustomCursorProvider } from "./CustomCursor";

import { Navbar } from "./Navbar";
import { HeroSection } from "./HeroSection";
import { ProjectsSection } from "./ProjectsSection";
import { SkillsSection } from "./SkillsSection";
import { ExperienceSection } from "./ExperienceSection";
import { ContactSection } from "./ContactSection";
import { TestimonialsSection } from "./TestimonialsSection";
import { Footer } from "./Footer";

export default function ClientShell() {
  const { scrollYProgress } = useScroll();
  const [mounted, setMounted] = useState(false);

  // Cursor glow tracking
  const cursorX = useRef(0);
  const cursorY = useRef(0);
  const [pos, setPos] = useState({ x: -999, y: -999 });

  const springX = useSpring(pos.x, { stiffness: 90, damping: 22 });
  const springY = useSpring(pos.y, { stiffness: 90, damping: 22 });

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
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
    <CustomCursorProvider>
      <GlobalStyles />
      <PageWrap>
        <Grain />

        {/* Scroll progress bar */}
        <ProgressBar style={{ scaleX: scrollYProgress }} />

        {/* Ambient cursor glow (large soft blob, separate from precise cursor) */}
        <CursorGlowWrap>
          <CursorGlowOrb style={{ left: springX, top: springY }} />
        </CursorGlowWrap>

        <Navbar scrollTo={scrollTo} />

        <HeroSection scrollTo={scrollTo} />
        <ProjectsSection />
        <SkillsSection />
        <ExperienceSection />
        <TestimonialsSection />
        <ContactSection />
        <Footer />
      </PageWrap>
    </CustomCursorProvider>
  );
}
