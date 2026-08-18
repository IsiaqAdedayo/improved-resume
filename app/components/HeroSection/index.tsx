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

/* ── Bubble / Hit types ── */
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
  // mobile pop
  popped: boolean;
  popTimer: number; // frames until respawn
  fadeIn: number; // frames left for fade-in after respawn
}

/* ── Hit effect types ── */
interface HitEffect {
  x: number;
  y: number;
  age: number; // frames elapsed
  life: number; // total frames
  spikes: number;
  spikeLen: number;
  color: string;
  debris: { angle: number; speed: number; r: number }[];
}

function BubbleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -999, y: -999 });
  const bubblesRef = useRef<Bubble[]>([]);
  const hitsRef = useRef<HitEffect[]>([]);
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

    const hitColors = ["#b8832a", "#d4a04e", "#fff8e1", "#ffe082", "#ffffff"];

    const resize = () => {
      W = canvas.offsetWidth;
      H = canvas.offsetHeight;
      canvas.width = W;
      canvas.height = H;
      spawn();
    };

    const spawn = () => {
      bubblesRef.current = Array.from({ length: 70 }, () => {
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
          hitCooldown: 0,
          popped: false,
          popTimer: 0,
          fadeIn: 0,
        } as Bubble & { hitCooldown: number };
      });
    };

    /* ── respawn bubble at a random screen-edge corner ── */
    const respawnBubble = (b: Bubble) => {
      const corner = Math.floor(Math.random() * 4);
      const margin = b.r + 6;
      if (corner === 0) {
        b.x = margin;
        b.y = margin;
      } else if (corner === 1) {
        b.x = W - margin;
        b.y = margin;
      } else if (corner === 2) {
        b.x = margin;
        b.y = H - margin;
      } else {
        b.x = W - margin;
        b.y = H - margin;
      }
      b.baseVx = (Math.random() - 0.5) * 0.4;
      b.baseVy = (Math.random() - 0.5) * 0.4;
      b.vx = 0;
      b.vy = 0;
      b.popped = false;
      b.fadeIn = 20; // 20-frame fade-in
    };

    /* ── bigger pop bloom for touch ── */
    const spawnPopEffect = (x: number, y: number, color: string) => {
      const debris = Array.from({ length: 8 }, () => ({
        angle: Math.random() * Math.PI * 2,
        speed: 1.8 + Math.random() * 3,
        r: 2 + Math.random() * 3,
      }));
      hitsRef.current.push({
        x,
        y,
        age: 0,
        life: 38,
        spikes: 0,
        spikeLen: 12,
        color,
        debris,
      });
    };

    /* ── spawn a cartoon hit at (x, y) ── */
    const spawnHit = (x: number, y: number) => {
      const spikes = 1 + Math.floor(Math.random() * 5); // 6–10 spikes
      const spikeLen = 4 + Math.random() * 22;
      const color = hitColors[Math.floor(Math.random() * hitColors.length)];
      const debris = Array.from({ length: 6 }, () => ({
        angle: Math.random() * Math.PI * 2,
        speed: 1.2 + Math.random() * 2.2,
        r: 1.5 + Math.random() * 2.5,
      }));
      hitsRef.current.push({
        x,
        y,
        age: 0,
        life: 28,
        spikes,
        spikeLen,
        color,
        debris,
      });
    };

    /* ── draw one hit effect frame ── */
    const drawHit = (h: HitEffect) => {
      const t = h.age / h.life; // 0 → 1
      const easeOut = 1 - t * t;
      const alpha = easeOut;

      ctx.save();

      // 1. Soft radial bloom — warm glow that expands and fades
      const bloomR = h.spikeLen * (0.6 + t * 2.2);
      const grad = ctx.createRadialGradient(h.x, h.y, 0, h.x, h.y, bloomR);
      grad.addColorStop(
        0,
        `${h.color}${Math.round(alpha * 0.38 * 255)
          .toString(16)
          .padStart(2, "0")}`,
      );
      grad.addColorStop(
        0.4,
        `${h.color}${Math.round(alpha * 0.18 * 255)
          .toString(16)
          .padStart(2, "0")}`,
      );
      grad.addColorStop(1, `${h.color}00`);
      ctx.globalAlpha = 1;
      ctx.beginPath();
      ctx.arc(h.x, h.y, bloomR, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();

      // 2. Crisp shockwave ring
      ctx.globalAlpha = alpha * 0.55;
      ctx.beginPath();
      ctx.arc(h.x, h.y, h.spikeLen * (0.3 + t * 1.4), 0, Math.PI * 2);
      ctx.strokeStyle = h.color;
      ctx.lineWidth = 1.5 * easeOut;
      ctx.stroke();

      // 3. Debris dots flying out
      ctx.globalAlpha = alpha * 0.7;
      h.debris.forEach((d) => {
        const dist = d.speed * h.age * 1.1;
        const px = h.x + Math.cos(d.angle) * dist;
        const py = h.y + Math.sin(d.angle) * dist;
        ctx.beginPath();
        ctx.arc(px, py, d.r * easeOut, 0, Math.PI * 2);
        ctx.fillStyle = h.color;
        ctx.fill();
      });

      ctx.restore();
    };

    const REPULSE_R = 130;

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      const mx = mouse.current.x;
      const my = mouse.current.y;

      bubblesRef.current.forEach((b) => {
        const bExt = b as Bubble & { hitCooldown: number };

        // Skip — bubble is mid-pop, waiting to respawn
        if (b.popped) {
          b.popTimer--;
          if (b.popTimer <= 0) respawnBubble(b);
          return;
        }

        // Fade-in after respawn
        if (b.fadeIn > 0) b.fadeIn--;
        const fadeAlpha = b.fadeIn > 0 ? (20 - b.fadeIn) / 20 : 1;

        // Repulsion from mouse
        const dx = b.x - mx;
        const dy = b.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);

        const wasOut = bExt.hitCooldown > 0;
        if (bExt.hitCooldown > 0) bExt.hitCooldown--;

        if (dist < REPULSE_R && dist > 0) {
          const force = ((REPULSE_R - dist) / REPULSE_R) * 1.8;
          b.vx += (dx / dist) * force * 0.06;
          b.vy += (dy / dist) * force * 0.06;

          if (!wasOut) {
            spawnHit(mx + (dx / dist) * b.r, my + (dy / dist) * b.r);
            bExt.hitCooldown = 40;
          }
        }

        b.vx *= 0.96;
        b.vy *= 0.96;
        b.x += b.baseVx + b.vx;
        b.y += b.baseVy + b.vy;

        // Bounce off edges
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
        ctx.fillStyle = `${b.color}${b.opacity * fadeAlpha})`;
        ctx.fill();
      });

      // Draw & age hit effects
      hitsRef.current = hitsRef.current.filter((h) => h.age < h.life);
      hitsRef.current.forEach((h) => {
        drawHit(h);
        h.age++;
      });

      rafRef.current = requestAnimationFrame(draw);
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    /* ── Touch: pop bubbles on tap (passive → no scroll jank) ── */
    const onTouchStart = (e: TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      // Process all simultaneous touch points
      for (let ti = 0; ti < e.touches.length; ti++) {
        const tx = e.touches[ti].clientX - rect.left;
        const ty = e.touches[ti].clientY - rect.top;
        // Enlarge hit-target by 8px for finger-size accuracy
        const HIT_PAD = 8;
        for (const b of bubblesRef.current) {
          if (b.popped) continue;
          const dx = b.x - tx;
          const dy = b.y - ty;
          if (Math.sqrt(dx * dx + dy * dy) < b.r + HIT_PAD) {
            spawnPopEffect(
              b.x,
              b.y,
              b.color.startsWith("rgba(184") ? "#d4a04e" : "#fff8e1",
            );
            b.popped = true;
            b.popTimer = 35 + Math.floor(Math.random() * 20); // 35–55 frames
            break; // one bubble per touch point
          }
        }
      }
    };

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("touchstart", onTouchStart, { passive: true });
    resize();
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("touchstart", onTouchStart);
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
