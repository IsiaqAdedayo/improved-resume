"use client";

import { useEffect, useState } from "react";
import { useScroll } from "framer-motion";
import { GlobalStyles } from "./styles/GlobalStyles";
import { PageWrap, Grain, ProgressBar } from "./components/ui";

import { Navbar }            from "./components/Navbar";
import { HeroSection }       from "./components/HeroSection";
import { ProjectsSection }   from "./components/ProjectsSection";
import { SkillsSection }     from "./components/SkillsSection";
import { ExperienceSection } from "./components/ExperienceSection";
import { ContactSection }    from "./components/ContactSection";
import { Footer }            from "./components/Footer";

export default function Portfolio() {
  const { scrollYProgress } = useScroll();
  const [mounted, setMounted] = useState(false);

  // Prevent SSR hydration flash from styled-components
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { setMounted(true); }, []);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  if (!mounted) return null;

  return (
    <>
      <GlobalStyles />
      <PageWrap>
        {/* Global overlays */}
        <Grain />
        <ProgressBar style={{ scaleX: scrollYProgress }} />

        {/* Navigation */}
        <Navbar scrollTo={scrollTo} />

        {/* Sections in order */}
        <HeroSection    scrollTo={scrollTo} />
        <ProjectsSection />
        <SkillsSection />
        <ExperienceSection />
        <ContactSection />
        <Footer />
      </PageWrap>
    </>
  );
}
