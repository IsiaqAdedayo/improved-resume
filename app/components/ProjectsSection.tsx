"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { OPEN_SOURCE, PROJECTS } from "../data";
import { vp } from "../lib/animations";
import { T } from "../styles/tokens";
import { Inner, Label, Tag } from "./ui";

/* ── Shared ── */
const SectionLabel = styled.div`
  max-width: 1240px;
  margin: 0 auto;
  padding: 5rem 3rem 2rem;

  @media (max-width: 768px) {
    padding: 4rem 1.5rem 1.5rem;
  }
`;

/* ── Scene wrapper ── */
const SceneWrap = styled(motion.div)<{ $tint: string }>`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  background: ${T.bgDeep};
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: ${(p) => p.$tint};
    z-index: 1;
    pointer-events: none;
  }

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: ${T.border};
    z-index: 3;
  }
`;

const SceneBg = styled.div<{ $src?: string | null }>`
  position: absolute;
  inset: -10%;
  background: ${(p) =>
    p.$src
      ? `url(${p.$src}) center/cover no-repeat`
      : "linear-gradient(135deg, rgba(255,255,255,0.02) 0%, transparent 60%)"};
  opacity: ${(p) => (p.$src ? 0.16 : 1)};
  filter: ${(p) => (p.$src ? "blur(3px)" : "none")};
  z-index: 0;
`;

const SceneContent = styled(Inner)`
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }
`;

const SceneLeft = styled.div``;
const SceneIndex = styled.div`
  font-family: ${T.fontMono};
  font-size: 0.62rem;
  letter-spacing: 0.16em;
  color: ${T.inkDim};
  text-transform: uppercase;
  margin-bottom: 1rem;
`;
const SceneTag = styled.div`
  font-family: ${T.fontMono};
  font-size: 0.62rem;
  letter-spacing: 0.12em;
  color: ${T.accent};
  text-transform: uppercase;
  margin-bottom: 1.2rem;
`;
const SceneTitle = styled.h2`
  font-family: ${T.fontDisplay};
  font-size: clamp(3rem, 6vw, 6rem);
  font-weight: 700;
  letter-spacing: -0.04em;
  line-height: 0.92;
  color: ${T.ink};
  margin-bottom: 1.4rem;
`;
const SceneDesc = styled.p`
  font-size: 0.92rem;
  color: ${T.inkMuted};
  line-height: 1.8;
  max-width: 400px;
  margin-bottom: 1.6rem;
`;
const TechRow = styled.div`
  display: flex;
  gap: 0.8rem;
  flex-wrap: wrap;
  margin-bottom: 2rem;
`;
const ViewBtn = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-family: ${T.fontBody};
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: ${T.ink};
  border-bottom: 1px solid ${T.accent};
  padding-bottom: 0.2rem;
  text-decoration: none;
  transition:
    color 0.2s,
    gap 0.2s;

  &:hover {
    color: ${T.accent};
    gap: 0.8rem;
  }
`;

/* ── Device mockup ── */
const MockupWrap = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  align-items: flex-end;

  @media (max-width: 900px) {
    align-items: flex-start;
  }
`;
const BrowserFrame = styled.div`
  width: 100%;
  max-width: 520px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.13);
  border-radius: 10px;
  overflow: hidden;
  box-shadow:
    0 40px 80px rgba(0, 0, 0, 0.55),
    0 0 0 1px rgba(255, 255, 255, 0.06);
`;
const BrowserBar = styled.div`
  background: rgba(255, 255, 255, 0.06);
  padding: 0.7rem 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
`;
const BrowserDot = styled.div<{ $c: string }>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${(p) => p.$c};
  opacity: 0.6;
`;
const BrowserUrl = styled.div`
  flex: 1;
  background: rgba(255, 255, 255, 0.04);
  border-radius: 4px;
  height: 20px;
  margin-left: 0.5rem;
`;
const BrowserImg = styled.img`
  width: 100%;
  height: 260px;
  object-fit: cover;
  object-position: top;
  display: block;
`;
const BrowserPlaceholder = styled.div`
  width: 100%;
  height: 260px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  color: ${T.inkDim};
  font-family: ${T.fontMono};
  font-size: 0.65rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.02), transparent);
`;
const PhoneFrame = styled.div`
  width: 120px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
  align-self: flex-end;
  margin-bottom: 1rem;

  @media (max-width: 900px) {
    display: none;
  }
`;
const PhoneNotch = styled.div`
  height: 18px;
  background: rgba(255, 255, 255, 0.06);
  display: flex;
  align-items: center;
  justify-content: center;
`;
const PhoneNotchDot = styled.div`
  width: 40px;
  height: 5px;
  border-radius: 3px;
  background: rgba(255, 255, 255, 0.15);
`;
const PhoneImg = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
  object-position: top;
`;
const PhonePlaceholder = styled.div`
  width: 100%;
  height: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: ${T.fontMono};
  font-size: 0.45rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${T.inkDim};
  text-align: center;
  padding: 0.5rem;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.02), transparent);
`;

/* ── Progress dots ── */
const DotsWrap = styled.div`
  position: absolute;
  right: 2rem;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
`;
const Dot = styled.div<{ $active: boolean }>`
  width: 6px;
  height: ${(p) => (p.$active ? "22px" : "6px")};
  border-radius: 3px;
  background: ${(p) => (p.$active ? T.accent : T.inkDim)};
  opacity: ${(p) => (p.$active ? 1 : 0.35)};
  transition:
    height 0.3s ease,
    opacity 0.3s ease,
    background 0.3s ease;
`;

/* ── Open Source ── */
const OSSWrap = styled.section`
  background: ${T.bgSurface};
  padding: 5rem 0;
  border-top: 1px solid ${T.border};
`;
const OSSGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
`;
const OSSCard = styled(motion.a)`
  display: block;
  padding: 1.8rem;
  border: 1px solid ${T.border};
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.02);
  text-decoration: none;
  transition:
    border-color 0.25s,
    background 0.25s;
  cursor: pointer;

  &:hover {
    border-color: ${T.accent};
    background: ${T.accentDim};
  }
`;
const OSSIndex = styled.div`
  font-family: ${T.fontMono};
  font-size: 0.6rem;
  color: ${T.inkDim};
  letter-spacing: 0.12em;
  margin-bottom: 0.8rem;
`;
const OSSTitle = styled.h3`
  font-family: ${T.fontDisplay};
  font-size: 1.5rem;
  font-weight: 700;
  color: ${T.ink};
  letter-spacing: -0.02em;
  margin-bottom: 0.5rem;
`;
const OSSTagline = styled.p`
  font-size: 0.85rem;
  color: ${T.inkMuted};
  line-height: 1.6;
  margin-bottom: 1rem;
`;
const OSSFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const OSSBadge = styled.span`
  font-family: ${T.fontMono};
  font-size: 0.58rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${T.accent};
  background: ${T.accentDim};
  padding: 0.2rem 0.6rem;
  border-radius: 2px;
`;

/* ── Cinematic scene (uses parent progress) ── */
function CinematicScene({
  project,
  index,
  total,
  opacity,
  scale,
}: {
  project: (typeof PROJECTS)[0];
  index: number;
  total: number;
  opacity: ReturnType<typeof useTransform>;
  scale: ReturnType<typeof useTransform>;
}) {
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
  // Each scene owns an equal slice of [0, 1].
  // We give each scene a crossfade window that overlaps slightly with neighbours.
  const slice = 1 / total;
  const start = index * slice;
  const end = start + slice;
  const fadeIn = start + slice * 0.2; // ramp up
  const fadeOut = end - slice * 0.2; // ramp down (last scene stays visible)

  const isFirst = index === 0;
  const isLast = index === total - 1;

  const opacityPoints = isFirst
    ? [0, fadeOut, end]
    : isLast
      ? [start, fadeIn, 1]
      : [start, fadeIn, fadeOut, end];

  const opacityValues = isFirst ? [1, 1, 0] : isLast ? [0, 1, 1] : [0, 1, 1, 0];

  const scalePoints = [start, end];
  const scaleValues = isFirst ? [1, 1.08] : isLast ? [0.92, 1] : [0.92, 1.05];

  const opacity = useTransform(progress, opacityPoints, opacityValues);

  const scale = useTransform(progress, scalePoints, scaleValues);

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
      setActive(Math.min(total - 1, Math.floor(v * total)));
    });
  }, [progress, total]);

  return active;
}

/* ── Main export ── */
export function ProjectsSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll progress scoped to THIS section's container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const [debugVal, setDebugVal] = useState(0);
  useEffect(() => scrollYProgress.on("change", setDebugVal), [scrollYProgress]);
  // Then render: <div style={{position:'fixed',top:0,left:0,color:'white',zIndex:999}}>{debugVal.toFixed(3)}</div>

  console.log("debugVal", debugVal);

  // Smooth spring — same params as reference
  const progress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 20,
    mass: 0.3,
  });

  const total = PROJECTS.length;

  // Build per-scene transforms
  const sceneTransforms = PROJECTS.map((_, i) =>
    // We call this outside the render loop via a stable helper
    // (rules of hooks satisfied — array length is constant)
    useSceneTransforms(progress, i, total),
  );

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
        style={{ position: "relative", height: `${110}vh` }}
      >
        {/* Sticky cinematic stage */}
        <div
          style={{
            position: "sticky",
            top: 0,
            height: "100vh",
            overflow: "hidden",
          }}
        >
          {PROJECTS.map((p, i) => (
            <CinematicScene
              key={p.index}
              project={p}
              index={i}
              total={total}
              opacity={sceneTransforms[i].opacity}
              scale={sceneTransforms[i].scale}
            />
          ))}

          {/* Progress dots */}
          <DotsWrap>
            {PROJECTS.map((_, i) => (
              <Dot key={i} $active={i === activeIndex} />
            ))}
          </DotsWrap>

          {/* Cinematic vignette */}
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

      {/* Open source */}
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
