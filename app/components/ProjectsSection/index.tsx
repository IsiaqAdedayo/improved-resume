"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, Star, Clock } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { OPEN_SOURCE, PROJECTS } from "../../data";
import { vp } from "../../lib/animations";
import { Inner, Label, Tag } from "../ui";
import { useCursorHandlers } from "../CustomCursor";
import { BeforeAfterSlider } from "./BeforeAfterSlider";
import {
  BehindBtn,
  BrowserBar,
  BrowserDot,
  BrowserFrame,
  BrowserImg,
  BrowserPlaceholder,
  BrowserSliderWrap,
  BrowserUrl,
  DotsWrap,
  Dot,
  LangDot,
  MockupWrap,
  OSSAction,
  OSSBadge,
  OSSCard,
  OSSFooter,
  OSSGrid,
  OSSIndex,
  OSSMeta,
  OSSMetaItem,
  OSSSpotlight,
  OSSTagline,
  OSSTitle,
  OSSWrap,
  PhoneFrame,
  PhoneImg,
  PhoneNotch,
  PhoneNotchDot,
  PhonePlaceholder,
  SceneBg,
  SceneContent,
  SceneDesc,
  SceneIndex,
  SceneLeft,
  SceneTag,
  SceneTitle,
  SceneWrap,
  SectionLabel,
  TechRow,
  ViewBtn,
} from "./styles";

/* ── Cinematic scene ── */
function CinematicScene({
  project,
  index,
  total,
  progress,
}: {
  project: (typeof PROJECTS)[0];
  index: number;
  total: number;
  progress: ReturnType<typeof useSpring>;
}) {
  const { opacity, scale } = useSceneTransforms(progress, index, total);
  const isEven = index % 2 === 0;
  const [showSlider, setShowSlider] = useState(false);
  const cursorView = useCursorHandlers("view");

  return (
    <SceneWrap $tint={project.tint} style={{ opacity, scale }}>
      <SceneBg $src={project.desktopImg} />

      <SceneContent>
        <SceneLeft style={{ order: isEven ? 0 : 1 }}>
          <SceneIndex>
            {project.index} / {String(total).padStart(2, "0")}
          </SceneIndex>
          <SceneTag>{project.tag}</SceneTag>
          <SceneTitle>{project.title}</SceneTitle>
          <SceneDesc>{project.desc}</SceneDesc>
          <TechRow>
            {project.tech.map((t) => (
              <Tag key={t}>{t}</Tag>
            ))}
          </TechRow>

          {/* Before/After toggle — only shows if project has a before state */}
          <BehindBtn onClick={() => setShowSlider((s) => !s)}>
            {showSlider ? "← Hide" : "Behind the build →"}
          </BehindBtn>

          {project.link && (
            <ViewBtn href={project.link} target="_blank" whileHover={{ x: 4 }} {...cursorView}>
              View Project <ArrowUpRight size={14} />
            </ViewBtn>
          )}
        </SceneLeft>

        <MockupWrap style={{ order: isEven ? 1 : 0 }}>
          <BrowserFrame>
            <BrowserBar>
              <BrowserDot $c="#ff5f57" />
              <BrowserDot $c="#ffbd2e" />
              <BrowserDot $c="#28c840" />
              <BrowserUrl />
            </BrowserBar>

            {showSlider ? (
              <BrowserSliderWrap>
                <BeforeAfterSlider
                  afterSrc={project.desktopImg ?? ""}
                  afterAlt={project.title}
                  beforeSrc={project.beforeImg}
                />
              </BrowserSliderWrap>
            ) : project.desktopImg ? (
              <BrowserImg src={project.desktopImg} alt={project.title} />
            ) : (
              <BrowserPlaceholder>
                <span>Screenshot</span>
                <span>Coming Soon</span>
              </BrowserPlaceholder>
            )}
          </BrowserFrame>

          <PhoneFrame>
            <PhoneNotch>
              <PhoneNotchDot />
            </PhoneNotch>
            {project.mobileImg ? (
              <PhoneImg
                src={project.mobileImg}
                alt={`${project.title} mobile`}
              />
            ) : (
              <PhonePlaceholder>Mobile coming soon</PhonePlaceholder>
            )}
          </PhoneFrame>
        </MockupWrap>
      </SceneContent>
    </SceneWrap>
  );
}

/* ── Scene transforms ── */
function useSceneTransforms(
  progress: ReturnType<typeof useSpring>,
  index: number,
  total: number,
) {
  const span = 1 / Math.max(1, total - 1);
  const mid = index * span;
  const start = mid - span;
  const end = mid + span;

  const opacity = useTransform(progress, [start, mid, end], [0, 1, 0]);
  const scale = useTransform(progress, [start, mid, end], [0.96, 1, 1.04]);

  return { opacity, scale };
}

/* ── Dot tracker ── */
function useActiveIndex(
  progress: ReturnType<typeof useSpring>,
  total: number,
): number {
  const [active, setActive] = useState(0);

  useEffect(() => {
    return progress.on("change", (v) => {
      setActive(Math.min(total - 1, Math.round(v * (total - 1))));
    });
  }, [progress, total]);

  return active;
}

/* ── Interactive OSS Card ── */
function InteractiveOSSCard({
  project,
  index,
}: {
  project: (typeof OPEN_SOURCE)[0];
  index: number;
}) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const cursorExplore = useCursorHandlers("explore");

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    const card = cardRef.current;
    const spotlight = spotlightRef.current;
    if (!card || !spotlight) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;

    // Tilt — max ±8°
    const rotateX = ((y - cy) / cy) * -6;
    const rotateY = ((x - cx) / cx) * 6;
    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(4px)`;

    // Spotlight
    spotlight.style.background = `radial-gradient(200px circle at ${x}px ${y}px, rgba(184,131,42,0.12), transparent 70%)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current;
    const spotlight = spotlightRef.current;
    if (!card || !spotlight) return;
    card.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg) translateZ(0)";
    card.style.transition = "transform 0.5s cubic-bezier(0.22,1,0.36,1), border-color 0.3s, background 0.3s";
    spotlight.style.background = "none";
  }, []);

  const handleMouseEnter = useCallback(() => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transition = "transform 0.1s ease, border-color 0.3s, background 0.3s";
    cursorExplore.onMouseEnter();
  }, [cursorExplore]);

  return (
    <OSSCard
      ref={cardRef}
      href={project.github ?? "#"}
      target="_blank"
      initial={{ opacity: 0, rotateY: -25, y: 20 }}
      whileInView={{ opacity: 1, rotateY: 0, y: 0 }}
      viewport={vp}
      transition={{
        delay: index * 0.1,
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        handleMouseLeave();
        cursorExplore.onMouseLeave();
      }}
      onMouseEnter={handleMouseEnter}
    >
      {/* Spotlight overlay */}
      <OSSSpotlight ref={spotlightRef} />

      <OSSIndex>{project.index}</OSSIndex>
      <OSSTitle>{project.title}</OSSTitle>
      <OSSTagline>{project.tagline}</OSSTagline>

      <OSSFooter>
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          {project.tech.map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>
      </OSSFooter>
			{/* <OSSBadge>{project.badge}</OSSBadge> */}

      {/* Telemetry row */}
      <OSSMeta>
        <OSSMetaItem>
          <LangDot $lang={project.language} />
          {project.language}
        </OSSMetaItem>
        <OSSMetaItem>
          <Star size={10} />
          {project.stars}
        </OSSMetaItem>
        <OSSMetaItem>
          <Clock size={10} />
          {project.lastCommit}
        </OSSMetaItem>
      </OSSMeta>

      {/* Explore action */}
      <OSSAction whileHover={{ x: 3 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
        Explore <ArrowUpRight size={11} />
      </OSSAction>
    </OSSCard>
  );
}

/* ── Main export ── */
export function ProjectsSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const progress = useSpring(scrollYProgress, {
    damping: 20,
    stiffness: 90,
    mass: 0.3,
  });

  const total = PROJECTS.length;
  const activeIndex = useActiveIndex(progress, total);

  return (
    <section id="projects">
      <SectionLabel>
        <Label
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={vp}
        >
          Selected Work
        </Label>
      </SectionLabel>

      <div
        ref={containerRef}
        style={{
          position: "relative",
          height: `${total * 150}vh`,
        }}
      >
        <div
          style={{
            position: "sticky",
            top: "30px",
            height: "100vh",
            overflow: "hidden",
          }}
        >
          {PROJECTS.map((p, i) => {
            if (Math.abs(activeIndex - i) > 1) return null;
            return (
              <CinematicScene
                key={p.index}
                project={p}
                index={i}
                total={total}
                progress={progress}
              />
            );
          })}

          <DotsWrap>
            {PROJECTS.map((_, i) => (
              <Dot key={i} $active={i === activeIndex} />
            ))}
          </DotsWrap>

          <div
            style={{
              pointerEvents: "none",
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(circle at center, transparent 45%, rgba(0,0,0,0.4))",
              zIndex: 5,
            }}
          />
        </div>
      </div>

      {/* Open Source — 3D interactive cards */}
      <OSSWrap>
        <Inner>
          <Label
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={vp}
          >
            Open Source
          </Label>
          <OSSGrid>
            {OPEN_SOURCE.map((p, i) => (
              <InteractiveOSSCard key={p.index} project={p} index={i} />
            ))}
          </OSSGrid>
        </Inner>
      </OSSWrap>
    </section>
  );
}
