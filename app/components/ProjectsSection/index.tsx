"use client";

import { useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { OPEN_SOURCE, PROJECTS } from "../../data";
import { vp } from "../../lib/animations";
import { Inner, Label, Tag } from "../ui";
import { SectionLabel, SceneWrap, SceneBg, SceneContent, SceneLeft, SceneIndex, SceneTag, SceneTitle, SceneDesc, TechRow, ViewBtn, MockupWrap, BrowserFrame, BrowserBar, BrowserDot, BrowserUrl, BrowserImg, BrowserPlaceholder, PhoneFrame, PhoneNotch, PhoneNotchDot, PhoneImg, PhonePlaceholder, DotsWrap, Dot, OSSWrap, OSSGrid, OSSCard, OSSIndex, OSSTitle, OSSTagline, OSSFooter, OSSBadge } from "./styles";

/* ── Shared ── */
/* ── Scene wrapper ── */
/* ── Device mockup ── */
/* ── Progress dots ── */
/* ── Open Source ── */
/* ── Cinematic scene (uses parent progress) ── */
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
          {project.link && (
            <ViewBtn href={project.link} target="_blank" whileHover={{ x: 4 }}>
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
            {project.desktopImg ? (
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

/* ── Helper: build cinematic opacity + scale per scene ── */
function useSceneTransforms(
  progress: ReturnType<typeof useSpring>,
  index: number,
  total: number,
) {
  const span = 1 / Math.max(1, total - 1);
  const mid = index * span;

  // Crossfade continuously over the entire span between midpoints.
  // This eliminates any dead space where both projects are faded out.
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
  // Derive synchronously via get() in a useState + motion value subscribe
  const [active, setActive] = useState(0);

  useEffect(() => {
    return progress.on("change", (v) => {
      setActive(Math.min(total - 1, Math.round(v * (total - 1))));
    });
  }, [progress, total]);

  return active;
}

/* ── Main export ── */
export function ProjectsSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"], // progress 0→1 over the full container scroll
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

      {/*
        Container height = sticky viewport + one scroll-length per transition.
        (total - 1) transitions × 100vh each, plus the initial 100vh to "enter".
        So total = total * 100vh. The sticky div pins at top:0 for all of that.
      */}
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
              <OSSCard
                key={p.index}
                href={p.github ?? "#"}
                target="_blank"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={vp}
                transition={{ delay: i * 0.08, duration: 0.55 }}
              >
                <OSSIndex>{p.index}</OSSIndex>
                <OSSTitle>{p.title}</OSSTitle>
                <OSSTagline>{p.tagline}</OSSTagline>
                <OSSFooter>
                  <div
                    style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}
                  >
                    {p.tech.map((t) => (
                      <Tag key={t}>{t}</Tag>
                    ))}
                  </div>
                  <OSSBadge>{p.badge}</OSSBadge>
                </OSSFooter>
              </OSSCard>
            ))}
          </OSSGrid>
        </Inner>
      </OSSWrap>
    </section>
  );
}
