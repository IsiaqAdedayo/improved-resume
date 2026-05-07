"use client";

import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";
import { T } from "../styles/tokens";
import { Inner, BtnPrimary, BtnGhost } from "./ui";
import { heroTitle, stagger, fadeUp } from "../lib/animations";
import { PERSON, STATS, TAB_ITEMS } from "../data";

/* ── Bubble Canvas ── */
interface Bubble {
  x: number;
  y: number;
  baseVx: number;
  baseVy: number;
  vx: number;
  vy: number;
  r: number;
  color: string;
  opacity: number;
}

function BubbleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -999, y: -999 });
  const bubblesRef = useRef<Bubble[]>([]);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let W = 0,
      H = 0;

    const colors = [
      "rgba(184,131,42,",
      "rgba(255,255,255,",
      "rgba(184,131,42,",
      "rgba(212,160,78,",
      "rgba(255,255,255,",
    ];

    const resize = () => {
      W = canvas.offsetWidth;
      H = canvas.offsetHeight;
      canvas.width = W;
      canvas.height = H;
      spawn();
    };

    const spawn = () => {
      bubblesRef.current = Array.from({ length: 70 }, () => {
        // Very slow constant drift
        const baseVx = (Math.random() - 0.5) * 0.4;
        const baseVy = (Math.random() - 0.5) * 0.4;
        return {
          x: Math.random() * W,
          y: Math.random() * H,
          baseVx,
          baseVy,
          vx: 0,
          vy: 0,
          r: 4 + Math.random() * 14,
          color: colors[Math.floor(Math.random() * colors.length)],
          opacity: 0.06 + Math.random() * 0.14,
        };
      });
    };

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      const mx = mouse.current.x;
      const my = mouse.current.y;

      bubblesRef.current.forEach((b) => {
        // Repulsion from mouse
        const dx = b.x - mx;
        const dy = b.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 130 && dist > 0) {
          const force = ((130 - dist) / 130) * 1.8;
          b.vx += (dx / dist) * force * 0.06;
          b.vy += (dy / dist) * force * 0.06;
        }

        // Dampen the extra mouse velocity so it doesn't build up
        b.vx *= 0.96;
        b.vy *= 0.96;

        // Move bubble (base drift + mouse repulsion)
        b.x += b.baseVx + b.vx;
        b.y += b.baseVy + b.vy;

        // Bounce off edges instead of wrapping
        if (b.x - b.r < 0) {
          b.x = b.r;
          b.baseVx *= -1;
        } else if (b.x + b.r > W) {
          b.x = W - b.r;
          b.baseVx *= -1;
        }

        if (b.y - b.r < 0) {
          b.y = b.r;
          b.baseVy *= -1;
        } else if (b.y + b.r > H) {
          b.y = H - b.r;
          b.baseVy *= -1;
        }

        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.fillStyle = `${b.color}${b.opacity})`;
        ctx.fill();
      });

      rafRef.current = requestAnimationFrame(draw);
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouseMove);
    resize();
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return <Canvas ref={canvasRef} />;
}

/* ── Styles ── */
const HeroWrap = styled.section`
  min-height: 100vh;
  padding: 9rem 0 5rem;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  background:
    radial-gradient(
      ellipse at 60% 40%,
      rgba(184, 131, 42, 0.06) 0%,
      transparent 65%
    ),
    radial-gradient(
      ellipse at 20% 80%,
      rgba(184, 131, 42, 0.04) 0%,
      transparent 55%
    ),
    ${T.bg};
`;

const Canvas = styled.canvas`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
`;

const HeroInner = styled(Inner)`
  position: relative;
  z-index: 1;
`;

const Eyebrow = styled(motion.div)`
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  font-family: ${T.fontMono};
  font-size: 0.68rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: ${T.accent};
  margin-bottom: 1.6rem;

  &::before {
    content: "";
    display: block;
    width: 28px;
    height: 1px;
    background: ${T.accent};
  }
`;

const TitleWrap = styled.div`
  overflow: hidden;
  margin-bottom: 0.05em;
`;

const TitleLine = styled(motion.h1)`
  font-family: ${T.fontDisplay};
  font-size: clamp(4.5rem, 11vw, 11rem);
  font-weight: 700;
  line-height: 0.88;
  letter-spacing: -0.045em;
  color: ${T.ink};
  display: block;

  &.italic {
    font-style: italic;
    color: ${T.accent};
    -webkit-text-stroke: 0px;
  }
`;

/* Giant watermark behind everything */
const Watermark = styled(motion.div)`
  position: absolute;
  top: -6%;
  right: -2%;
  font-family: ${T.fontDisplay};
  font-size: clamp(200px, 33vw, 500px);
  font-weight: 700;
  line-height: 0.82;
  color: transparent;
  -webkit-text-stroke: 1px rgba(184, 132, 42, 0.14);
  user-select: none;
  pointer-events: none;
  z-index: 0;
  letter-spacing: -0.06em;
`;

/* Floating accent square */
const AccentSquare = styled(motion.div)`
  position: absolute;
  bottom: 32%;
  right: 8%;
  width: 180px;
  height: 180px;
  border: 1px solid rgba(184, 131, 42, 0.2);
  border-radius: 4px;
  z-index: 0;

  @media (max-width: 768px) { display: none; }
`;

const AccentDot = styled(motion.div)`
  position: absolute;
  top: 28%;
  right: 22%;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: ${T.accent};
  z-index: 0;

  @media (max-width: 768px) { display: none; }
`;

const HeroBio = styled(motion.p)`
  font-size: clamp(0.92rem, 1.2vw, 1.05rem);
  color: ${T.inkMuted};
  line-height: 1.8;
  max-width: 460px;
  margin-top: 1.6rem;
`;

const CTARow = styled(motion.div)`
  display: flex;
  gap: 1rem;
  margin-top: 2.2rem;
  flex-wrap: wrap;
`;

/* ── Tab Switcher ── */
const TabBlock = styled(motion.div)`
  margin-top: 4rem;
  border-top: 1px solid ${T.border};
  padding-top: 2rem;
`;

const TabRow = styled.div`
  display: flex;
  gap: 0;
  flex-wrap: wrap;
`;

const TabBtn = styled.button<{ $active: boolean }>`
  background: none;
  border: none;
  cursor: pointer;
  font-family: ${T.fontBody};
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: ${(p) => (p.$active ? T.ink : T.inkDim)};
  padding: 0.6rem 1.4rem 0.6rem 0;
  position: relative;
  transition: color 0.25s;

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    height: 1px;
    background: ${T.accent};
    width: ${(p) => (p.$active ? "100%" : "0")};
    transition: width 0.35s cubic-bezier(0.22, 1, 0.36, 1);
  }

  &:hover {
    color: ${(p) => (p.$active ? T.ink : T.inkMuted)};
  }
`;

const TabDesc = styled.div`
  min-height: 2.2rem;
  margin-top: 1rem;
  overflow: hidden;
`;

const TabDescInner = styled(motion.p)`
  font-family: ${T.fontMono};
  font-size: 0.72rem;
  color: ${T.inkMuted};
  letter-spacing: 0.04em;
  line-height: 1.7;
  max-width: 520px;
`;

/* ── Stats ── */
const StatsBar = styled(motion.div)`
  position: relative;
  z-index: 1;
  max-width: 1240px;
  margin: 3rem auto 0;
  padding: 1.5rem 3rem 0;
  border-top: 1px solid ${T.border};
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    padding: 1.5rem 1.5rem 0;
    gap: 1.5rem;
  }
`;

const Stat = styled.div`
  text-align: center;

  @media (max-width: 768px) {
    text-align: left;
  }
`;

const StatN = styled.div`
  font-family: ${T.fontDisplay};
  font-size: clamp(2rem, 3.5vw, 2.8rem);
  font-weight: 700;
  color: ${T.ink};
  line-height: 1;
  letter-spacing: -0.03em;
`;

const StatL = styled.div`
  font-family: ${T.fontMono};
  font-size: 0.6rem;
  color: ${T.inkMuted};
  letter-spacing: 0.12em;
  text-transform: uppercase;
  margin-top: 0.3rem;
`;

const ScrollHint = styled(motion.button)`
  background: none;
  border: none;
  cursor: pointer;
  font-family: ${T.fontMono};
  font-size: 0.63rem;
  color: ${T.inkDim};
  letter-spacing: 0.14em;
  text-transform: uppercase;
  transition: color 0.2s;

  &:hover {
    color: ${T.accent};
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const containerVariants = stagger(0.06, 0.1);

interface HeroProps {
  scrollTo: (id: string) => void;
}

export function HeroSection({ scrollTo }: HeroProps) {
  const [activeTab, setActiveTab] = useState(0);

  // Auto-cycle tabs
  useEffect(() => {
    const id = setInterval(() => {
      setActiveTab((p) => (p + 1) % TAB_ITEMS.length);
    }, 3200);
    return () => clearInterval(id);
  }, []);

  return (
    <HeroWrap id="home">
      {/* Decorative elements */}
      <Watermark
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4, delay: 0.2 }}
      >
        AS
      </Watermark>

      <AccentSquare
        initial={{ opacity: 0, rotate: -8 }}
        animate={{ opacity: 1, rotate: 0 }}
        transition={{ duration: 1.2, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
      />

      <AccentDot
        animate={{ scale: [1, 1.6, 1], opacity: [1, 0.5, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
      <BubbleCanvas />

      <HeroInner>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          <Eyebrow variants={fadeUp}>
            Senior Frontend Engineer · Lagos, Nigeria 🇳🇬
          </Eyebrow>

          <TitleWrap>
            <TitleLine variants={heroTitle}>Adedayo</TitleLine>
          </TitleWrap>
          <TitleWrap>
            <TitleLine className="italic" variants={heroTitle}>
              Showande
            </TitleLine>
          </TitleWrap>

          <HeroBio variants={fadeUp}>{PERSON.bio}</HeroBio>

          <CTARow variants={fadeUp}>
            <BtnPrimary
              onClick={() => scrollTo("projects")}
              whileTap={{ scale: 0.97 }}
            >
              View Work <ArrowRight size={15} />
            </BtnPrimary>
            <BtnGhost
              onClick={() => scrollTo("contact")}
              whileTap={{ scale: 0.97 }}
            >
              <Mail size={15} /> Get in Touch
            </BtnGhost>
          </CTARow>

          {/* Railway tab switcher */}
          <TabBlock variants={fadeUp}>
            <TabRow>
              {TAB_ITEMS.map((t, i) => (
                <TabBtn
                  key={t.label}
                  $active={activeTab === i}
                  onClick={() => setActiveTab(i)}
                >
                  {t.label}
                </TabBtn>
              ))}
            </TabRow>
            <TabDesc>
              <AnimatePresence mode="wait">
                <TabDescInner
                  key={activeTab}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3 }}
                >
                  {TAB_ITEMS[activeTab].desc}
                </TabDescInner>
              </AnimatePresence>
            </TabDesc>
          </TabBlock>
        </motion.div>
      </HeroInner>

      {/* Stats bar */}
      <StatsBar
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.7 }}
      >
        {STATS.map((s) => (
          <Stat key={s.l}>
            <StatN>{s.n}</StatN>
            <StatL>{s.l}</StatL>
          </Stat>
        ))}
        <ScrollHint onClick={() => scrollTo("projects")} whileHover={{ y: 2 }}>
          Scroll to explore ↓
        </ScrollHint>
      </StatsBar>
    </HeroWrap>
  );
}
