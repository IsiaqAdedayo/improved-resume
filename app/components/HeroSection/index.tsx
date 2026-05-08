"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";
import { BtnPrimary, BtnGhost } from "../ui";
import { heroTitle, stagger, fadeUp } from "../../lib/animations";
import { PERSON, STATS, TAB_ITEMS } from "../../data";
import { HeroWrap, Canvas, HeroInner, Eyebrow, TitleWrap, TitleLine, Watermark, AccentSquare, AccentDot, HeroBio, CTARow, TabBlock, TabRow, TabBtn, TabDesc, TabDescInner, StatsBar, Stat, StatN, StatL, ScrollHint } from "./styles";

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
/* Giant watermark behind everything */
/* Floating accent square */
/* ── Tab Switcher ── */
/* ── Stats ── */
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
