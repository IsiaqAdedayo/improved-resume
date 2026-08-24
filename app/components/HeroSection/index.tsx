"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { PERSON, STATS, TAB_ITEMS } from "../../data";
import { fadeUp, heroTitle, stagger } from "../../lib/animations";
import { useCursorHandlers } from "../CustomCursor";
import { BtnGhost, BtnPrimary } from "../ui";
import {
  AccentDot,
  AccentSquare,
  Canvas,
  CTARow,
  Eyebrow,
  HeroBio,
  HeroInner,
  HeroWrap,
  ScrollHint,
  Stat,
  StatL,
  StatN,
  StatsBar,
  TabBlock,
  TabBtn,
  TabDesc,
  TabDescInner,
  TabRow,
  TitleLine,
  TitleWrap,
  Watermark,
} from "./styles";
import { GhostCharacter } from "./GhostCharacter";

/* ── Interactive Bouncing Glow Balls Canvas ──────────────── */
// Balls bounce around and get pushed by the mouse with natural velocity physics,
// completely free of distracting cartoon hit explosion shockwaves/sparks.
interface GlowBall {
  x: number;
  y: number;
  baseVx: number;
  baseVy: number;
  vx: number;
  vy: number;
  r: number;
  glowR: number;
  colorRgb: string;
  opacity: number;
  pulsePhase: number;
  pulseSpeed: number;
}

function BouncingGlowBallsCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -9999, y: -9999 });
  const ballsRef = useRef<GlowBall[]>([]);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let W = 0,
      H = 0;

    const colors = [
      "184,131,42",
      "212,160,78",
      "184,131,42",
      "220,175,90",
      "255,235,180",
    ];

    const resize = () => {
      W = canvas.offsetWidth;
      H = canvas.offsetHeight;
      canvas.width = W;
      canvas.height = H;
      spawn();
    };

    const spawn = () => {
      const count = W < 768 ? 35 : 60;
      ballsRef.current = Array.from({ length: count }, () => {
        const baseVx = (Math.random() - 0.5) * 0.4;
        const baseVy = (Math.random() - 0.5) * 0.4;
        const r = 3 + Math.random() * 7;
        const glowR = r * (1.8 + Math.random() * 2.0);
        return {
          x: Math.random() * W,
          y: Math.random() * H,
          baseVx: Math.abs(baseVx) < 0.1 ? (baseVx < 0 ? -0.18 : 0.18) : baseVx,
          baseVy: Math.abs(baseVy) < 0.1 ? (baseVy < 0 ? -0.18 : 0.18) : baseVy,
          vx: 0,
          vy: 0,
          r,
          glowR,
          colorRgb: colors[Math.floor(Math.random() * colors.length)],
          opacity: 0.04 + Math.random() * 0.07,
          pulsePhase: Math.random() * Math.PI * 2,
          pulseSpeed: 0.012 + Math.random() * 0.018,
        };
      });
    };

    const REPULSE_R = 140; // distance within which mouse pushes balls
    let tick = 0;

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      tick++;

      const mx = mouse.current.x;
      const my = mouse.current.y;

      ballsRef.current.forEach((b) => {
        // Physical repulsion from cursor
        const dx = b.x - mx;
        const dy = b.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < REPULSE_R && dist > 0) {
          const force = ((REPULSE_R - dist) / REPULSE_R) * 2.4;
          // Apply velocity push away from cursor
          b.vx += (dx / dist) * force * 0.14;
          b.vy += (dy / dist) * force * 0.14;
        }

        // Apply friction/damping to mouse impulse
        b.vx *= 0.95;
        b.vy *= 0.95;

        // Position integration
        b.x += b.baseVx + b.vx;
        b.y += b.baseVy + b.vy;

        // Bounce off canvas edges
        if (b.x - b.r < 0) {
          b.x = b.r;
          b.baseVx = Math.abs(b.baseVx);
          b.vx = Math.abs(b.vx) * 0.8;
        } else if (b.x + b.r > W) {
          b.x = W - b.r;
          b.baseVx = -Math.abs(b.baseVx);
          b.vx = -Math.abs(b.vx) * 0.8;
        }

        if (b.y - b.r < 0) {
          b.y = b.r;
          b.baseVy = Math.abs(b.baseVy);
          b.vy = Math.abs(b.vy) * 0.8;
        } else if (b.y + b.r > H) {
          b.y = H - b.r;
          b.baseVy = -Math.abs(b.baseVy);
          b.vy = -Math.abs(b.vy) * 0.8;
        }

        // Subtle breathing pulse
        const pulse = Math.sin(tick * b.pulseSpeed + b.pulsePhase);
        const currentOpacity = Math.max(
          0.02,
          b.opacity * (0.8 + pulse * 0.25)
        );

        // 1. Soft radial glow halo
        const grad = ctx.createRadialGradient(
          b.x,
          b.y,
          0,
          b.x,
          b.y,
          b.glowR
        );
        grad.addColorStop(0, `rgba(${b.colorRgb},${currentOpacity * 0.7})`);
        grad.addColorStop(0.4, `rgba(${b.colorRgb},${currentOpacity * 0.25})`);
        grad.addColorStop(1, `rgba(${b.colorRgb},0)`);

        ctx.beginPath();
        ctx.arc(b.x, b.y, b.glowR, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();

        // 2. Crisp luminous core
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${b.colorRgb},${currentOpacity * 1.1})`;
        ctx.fill();
      });

      rafRef.current = requestAnimationFrame(draw);
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    const onMouseLeave = () => {
      mouse.current = { x: -9999, y: -9999 };
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const rect = canvas.getBoundingClientRect();
        mouse.current = {
          x: e.touches[0].clientX - rect.left,
          y: e.touches[0].clientY - rect.top,
        };
      }
    };

    const onTouchEnd = () => {
      mouse.current = { x: -9999, y: -9999 };
    };

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });

    resize();
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return <Canvas ref={canvasRef} style={{ pointerEvents: "none" }} />;
}

/* ── Tab Switcher ── */
const containerVariants = stagger(0.06, 0.1);

interface HeroProps {
  scrollTo: (id: string) => void;
}

export function HeroSection({ scrollTo }: HeroProps) {
  const [activeTab, setActiveTab] = useState(0);
  const cursorHover = useCursorHandlers("hover");
  const cursorText = useCursorHandlers("text");

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

      {/* Glowing balls that bounce and scatter away smoothly from the mouse without cartoon collision shockwaves */}
      <BouncingGlowBallsCanvas />

      {/* 3D Interactive Ghost Character floating on the right */}
      <GhostCharacter />

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

          <HeroBio variants={fadeUp} {...cursorText}>
            {PERSON.bio}
          </HeroBio>

          <CTARow variants={fadeUp}>
            <BtnPrimary
              onClick={() => scrollTo("projects")}
              whileTap={{ scale: 0.97 }}
              {...cursorHover}
            >
              View Work <ArrowRight size={15} />
            </BtnPrimary>
            <BtnGhost
              onClick={() => scrollTo("contact")}
              whileTap={{ scale: 0.97 }}
              {...cursorHover}
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
                  {...cursorHover}
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
      </StatsBar>
      <ScrollHint
        onClick={() => scrollTo("projects")}
        whileHover={{ y: 2 }}
        {...cursorHover}
      >
        Scroll to explore ↓
      </ScrollHint>
    </HeroWrap>
  );
}
