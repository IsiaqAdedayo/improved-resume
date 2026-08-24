"use client";

import { motion } from "framer-motion";
import Matter from "matter-js";
import { useCallback, useEffect, useRef, useState } from "react";
import { useCursorHandlers } from "../CustomCursor";
import {
  CelebrateOverlay,
  DropBtn,
  JarCopy,
  JarSection,
  JarWrap,
  MoodBtn,
  MoodRow,
  StatusLine,
} from "./styles";

/* ── Mood definitions ─────────────────────────────────── */
const MOODS = [
  { key: "star",  emoji: "⭐", label: "Star" },
  { key: "dream", emoji: "😶‍🌫️", label: "Dream" },
  { key: "soft",  emoji: "🧁", label: "Soft" },
  { key: "lucky", emoji: "🍀", label: "Lucky" },
  { key: "ember", emoji: "🔥", label: "Ember" },
  { key: "chill", emoji: "🧊", label: "Chill" },
  { key: "ghost", emoji: "👻", label: "Ghost" },
	// {key:"sleep", emoji:"😴", label:"Sleep"},
	// {key:"joy", emoji:"😁", label:"Joy"},
	// {key:"love", emoji:"🍒", label:"Love"},
	// {key:"heart", emoji:"🍑", label:"Heart"},
	// {key:"soul", emoji:"🍆", label:"Soul"},
	// {key:"brain", emoji:"🥕", label:"Brain"},
] as const;

type MoodKey = (typeof MOODS)[number]["key"];

/* ── Extended Matter Body with Emoji Meta ─────────────── */
interface MarbleBody extends Matter.Body {
  emoji: string;
  mood: MoodKey;
  lastReaction?: number;
}

/* ── Visual Reaction Particle ─────────────────────────── */
interface ReactionParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  age: number;
  maxAge: number;
  size: number;
  color: string;
  type: "steam" | "fire" | "frost" | "soulfire" | "stardust";
  symbol?: string;
}

/* ── Glass Jar Dimensions ─────────────────────────────── */
const JAR_W = 280;
const JAR_H = 340;
const MARBLE_RADIUS = 17; // 34px diameter emoji
const MAX_MARBLES = 45;

/* ── Back Glass Layer (Behind Marbles) ────────────────── */
function JarBackdrop() {
  return (
    <svg
      width={JAR_W}
      height={JAR_H}
      viewBox={`0 0 ${JAR_W} ${JAR_H}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none" }}
    >
      <defs>
        <linearGradient id="backGlassTint" x1="140" y1="40" x2="140" y2="330" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.02" />
          <stop offset="40%" stopColor="#b8d5ff" stopOpacity="0.035" />
          <stop offset="85%" stopColor="#d4a04e" stopOpacity="0.04" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.06" />
        </linearGradient>
        <radialGradient id="jarFloorShadow" cx="140" cy="336" r="120" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="rgba(0,0,0,0.5)" />
          <stop offset="60%" stopColor="rgba(0,0,0,0.2)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0)" />
        </radialGradient>
      </defs>

      <ellipse cx="140" cy="336" rx="114" ry="12" fill="url(#jarFloorShadow)" />

      <path
        d="M 96 42
           L 96 54
           C 96 68, 26 84, 22 120
           L 18 296
           C 18 326, 42 332, 68 332
           L 212 332
           C 238 332, 262 326, 262 296
           L 258 120
           C 254 84, 184 68, 184 54
           L 184 42
           Z"
        fill="url(#backGlassTint)"
      />
    </svg>
  );
}

/* ── Front Glass Jar & Realistic Metallic Lid Overlay ── */
function JarSVG({ celebrate }: { celebrate: boolean }) {
  return (
    <svg
      width={JAR_W}
      height={JAR_H}
      viewBox={`0 0 ${JAR_W} ${JAR_H}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ position: "absolute", inset: 0, zIndex: 4, pointerEvents: "none" }}
    >
      <defs>
        <linearGradient id="lidMetalGrad" x1="88" y1="12" x2="192" y2="12" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#555866" />
          <stop offset="15%" stopColor="#8e92a4" />
          <stop offset="35%" stopColor="#d2d6e6" />
          <stop offset="50%" stopColor="#ffffff" />
          <stop offset="65%" stopColor="#b4b8cc" />
          <stop offset="85%" stopColor="#6e7284" />
          <stop offset="100%" stopColor="#484b56" />
        </linearGradient>

        <linearGradient id="lidBevelGrad" x1="88" y1="6" x2="192" y2="6" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#4a4c58" />
          <stop offset="30%" stopColor="#9ea2b5" />
          <stop offset="50%" stopColor="#ffffff" />
          <stop offset="70%" stopColor="#8c90a2" />
          <stop offset="100%" stopColor="#3c3e48" />
        </linearGradient>

        <linearGradient id="goldAccentGrad" x1="90" y1="36" x2="190" y2="36" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#8a611c" />
          <stop offset="35%" stopColor="#d4a04e" />
          <stop offset="55%" stopColor="#fff2c6" />
          <stop offset="75%" stopColor="#b8832a" />
          <stop offset="100%" stopColor="#664612" />
        </linearGradient>

        <linearGradient id="leftGlareGrad" x1="38" y1="110" x2="32" y2="295" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.45" />
          <stop offset="25%" stopColor="#ffffff" stopOpacity="0.28" />
          <stop offset="75%" stopColor="#b8d5ff" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.04" />
        </linearGradient>

        <linearGradient id="glassWallStroke" x1="0" y1="30" x2="280" y2="340" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.35" />
          <stop offset="20%" stopColor="#a8c8ff" stopOpacity="0.25" />
          <stop offset="50%" stopColor="#ffffff" stopOpacity="0.12" />
          <stop offset="85%" stopColor="#d4a04e" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.45" />
        </linearGradient>

        <linearGradient id="thickBaseGrad" x1="140" y1="305" x2="140" y2="334" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.02" />
          <stop offset="50%" stopColor="#c5ddff" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.18" />
        </linearGradient>
      </defs>

      {/* 1. Thick Heavy Glass Bottom Base */}
      <path
        d="M 22 296
           C 22 322, 44 332, 68 332
           L 212 332
           C 236 332, 258 322, 258 296
           C 240 306, 200 310, 140 310
           C 80 310, 40 306, 22 296
           Z"
        fill="url(#thickBaseGrad)"
        stroke="rgba(255, 255, 255, 0.18)"
        strokeWidth="1"
      />

      {/* Base Caustic Reflections */}
      <path
        d="M 44 320 Q 140 328 236 320"
        stroke="rgba(255, 255, 255, 0.35)"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M 68 325 Q 140 330 212 325"
        stroke="rgba(212, 160, 78, 0.4)"
        strokeWidth="1.2"
        strokeLinecap="round"
      />

      {/* 2. Outer Glass Shell */}
      <path
        d="M 96 36
           L 96 54
           C 96 68, 24 84, 22 120
           L 18 296
           C 18 326, 42 334, 68 334
           L 212 334
           C 238 334, 262 326, 262 296
           L 258 120
           C 256 84, 184 68, 184 54
           L 184 36
           Z"
        stroke={celebrate ? "rgba(184,131,42,0.9)" : "url(#glassWallStroke)"}
        strokeWidth={celebrate ? "2.2" : "1.8"}
      />

      {/* 3. High-End Specular Glare Highlights */}
      <path
        d="M 38 118 C 36 150, 32 230, 32 292"
        stroke="url(#leftGlareGrad)"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <path
        d="M 46 124 C 44 155, 40 220, 39 284"
        stroke="rgba(255, 255, 255, 0.55)"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M 94 60 C 68 70, 38 88, 32 116"
        stroke="rgba(255, 255, 255, 0.32)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      <path
        d="M 246 118 C 248 150, 250 230, 250 290"
        stroke="rgba(255, 255, 255, 0.16)"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <path
        d="M 238 126 C 240 155, 243 220, 243 275"
        stroke="rgba(255, 255, 255, 0.08)"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M 186 60 C 212 70, 242 88, 248 116"
        stroke="rgba(255, 255, 255, 0.2)"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* 4. Precision Glass Neck Rim */}
      <ellipse
        cx="140"
        cy="42"
        rx="46"
        ry="7"
        fill="rgba(255, 255, 255, 0.04)"
        stroke="rgba(255, 255, 255, 0.35)"
        strokeWidth="1.5"
      />
      <ellipse
        cx="140"
        cy="42"
        rx="43"
        ry="5"
        fill="none"
        stroke="rgba(255, 255, 255, 0.18)"
        strokeWidth="0.8"
      />

      {/* 5. Milled Premium Metallic & Brushed Steel Lid */}
      <ellipse cx="140" cy="40" rx="44" ry="5" fill="rgba(0, 0, 0, 0.45)" />

      <rect
        x="92"
        y="33"
        width="96"
        height="7"
        rx="2"
        fill="url(#goldAccentGrad)"
        stroke="rgba(255, 255, 255, 0.2)"
        strokeWidth="0.8"
      />

      <rect
        x="88"
        y="12"
        width="104"
        height="22"
        rx="5"
        fill="url(#lidMetalGrad)"
        stroke="rgba(255, 255, 255, 0.35)"
        strokeWidth="1.2"
      />

      <rect
        x="94"
        y="6"
        width="92"
        height="8"
        rx="3"
        fill="url(#lidBevelGrad)"
        stroke="rgba(255, 255, 255, 0.45)"
        strokeWidth="1"
      />

      <line x1="102" y1="14" x2="102" y2="32" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
      <line x1="103" y1="14" x2="103" y2="32" stroke="rgba(0,0,0,0.35)" strokeWidth="1" />
      <line x1="114" y1="14" x2="114" y2="32" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
      <line x1="115" y1="14" x2="115" y2="32" stroke="rgba(0,0,0,0.35)" strokeWidth="1" />
      <line x1="126" y1="14" x2="126" y2="32" stroke="rgba(255,255,255,0.35)" strokeWidth="1" />
      <line x1="127" y1="14" x2="127" y2="32" stroke="rgba(0,0,0,0.4)" strokeWidth="1" />
      <line x1="153" y1="14" x2="153" y2="32" stroke="rgba(255,255,255,0.35)" strokeWidth="1" />
      <line x1="154" y1="14" x2="154" y2="32" stroke="rgba(0,0,0,0.4)" strokeWidth="1" />
      <line x1="165" y1="14" x2="165" y2="32" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
      <line x1="166" y1="14" x2="166" y2="32" stroke="rgba(0,0,0,0.35)" strokeWidth="1" />
      <line x1="177" y1="14" x2="177" y2="32" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
      <line x1="178" y1="14" x2="178" y2="32" stroke="rgba(0,0,0,0.35)" strokeWidth="1" />

      <line
        x1="92"
        y1="16"
        x2="188"
        y2="16"
        stroke="rgba(255, 255, 255, 0.45)"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* ── Main Component with Matter.js & Elemental Collisions ── */
export function MarbleJar() {
  const [selectedMood, setSelectedMood] = useState<MoodKey>("star");
  const [marbleCount, setMarbleCount] = useState(0);
  const [jarFillCount, setJarFillCount] = useState(0);
  const [dropping, setDropping] = useState(false);
  const [celebrate, setCelebrate] = useState(false);
  const cursorDrop = useCursorHandlers("drop");

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<Matter.Engine | null>(null);
  const marblesRef = useRef<MarbleBody[]>([]);
  const effectsRef = useRef<ReactionParticle[]>([]);
  const rafRef = useRef<number>(0);

  /* ── Reaction Particle Spawners ─────────────────────── */
  const spawnSizzle = useCallback((x: number, y: number) => {
    // Sizzle / Steam (Chill 🧊 + Ember 🔥)
    effectsRef.current.push({
      x,
      y: y - 10,
      vx: (Math.random() - 0.5) * 0.4,
      vy: -1.3,
      age: 0,
      maxAge: 32,
      size: 22,
      color: "255,255,255",
      type: "steam",
      symbol: "💨",
    });
    for (let i = 0; i < 7; i++) {
      effectsRef.current.push({
        x: x + (Math.random() - 0.5) * 16,
        y: y + (Math.random() - 0.5) * 10,
        vx: (Math.random() - 0.5) * 1.4,
        vy: -0.8 - Math.random() * 1.5,
        age: 0,
        maxAge: 24 + Math.random() * 16,
        size: 8 + Math.random() * 9,
        color: "225,245,255",
        type: "steam",
      });
    }
  }, []);

  const spawnFlame = useCallback((x: number, y: number) => {
    // Wildfire Flame Combustion (Lucky 🍀 + Ember 🔥)
    effectsRef.current.push({
      x,
      y: y - 8,
      vx: (Math.random() - 0.5) * 0.4,
      vy: -1.5,
      age: 0,
      maxAge: 28,
      size: 24,
      color: "255,140,0",
      type: "fire",
      symbol: "🔥",
    });
    for (let i = 0; i < 9; i++) {
      effectsRef.current.push({
        x: x + (Math.random() - 0.5) * 14,
        y: y + (Math.random() - 0.5) * 12,
        vx: (Math.random() - 0.5) * 2.6,
        vy: -1.4 - Math.random() * 2.2,
        age: 0,
        maxAge: 22 + Math.random() * 15,
        size: 3 + Math.random() * 3.5,
        color: Math.random() > 0.5 ? "255,170,20" : "255,70,20",
        type: "fire",
      });
    }
  }, []);

  const spawnFrost = useCallback((x: number, y: number) => {
    // Freezing Frostbite (Ghost 👻 + Chill 🧊)
    effectsRef.current.push({
      x,
      y: y - 8,
      vx: (Math.random() - 0.5) * 0.3,
      vy: -0.9,
      age: 0,
      maxAge: 32,
      size: 22,
      color: "180,230,255",
      type: "frost",
      symbol: "❄️",
    });
    for (let i = 0; i < 8; i++) {
      effectsRef.current.push({
        x: x + (Math.random() - 0.5) * 18,
        y: y + (Math.random() - 0.5) * 12,
        vx: (Math.random() - 0.5) * 1.6,
        vy: -0.6 - Math.random() * 1.3,
        age: 0,
        maxAge: 26 + Math.random() * 14,
        size: 2.5 + Math.random() * 3,
        color: "160,225,255",
        type: "frost",
      });
    }
  }, []);

  const spawnSoulfire = useCallback((x: number, y: number) => {
    // Soulfire Plasma (Ghost 👻 + Ember 🔥)
    effectsRef.current.push({
      x,
      y: y - 8,
      vx: (Math.random() - 0.5) * 0.4,
      vy: -1.4,
      age: 0,
      maxAge: 30,
      size: 22,
      color: "200,100,255",
      type: "soulfire",
      symbol: "✨",
    });
    for (let i = 0; i < 9; i++) {
      effectsRef.current.push({
        x: x + (Math.random() - 0.5) * 16,
        y: y + (Math.random() - 0.5) * 12,
        vx: (Math.random() - 0.5) * 2.2,
        vy: -1.2 - Math.random() * 1.9,
        age: 0,
        maxAge: 24 + Math.random() * 16,
        size: 3 + Math.random() * 3.5,
        color: Math.random() > 0.5 ? "190,80,255" : "80,240,255",
        type: "soulfire",
      });
    }
  }, []);

  const spawnStardust = useCallback((x: number, y: number) => {
    // Cosmic Stardust Sparkle (Star ⭐ + Dream 😶‍🌫️)
    effectsRef.current.push({
      x,
      y: y - 8,
      vx: (Math.random() - 0.5) * 0.3,
      vy: -0.8,
      age: 0,
      maxAge: 28,
      size: 20,
      color: "255,220,80",
      type: "stardust",
      symbol: "✨",
    });
    for (let i = 0; i < 6; i++) {
      effectsRef.current.push({
        x: x + (Math.random() - 0.5) * 16,
        y: y + (Math.random() - 0.5) * 14,
        vx: (Math.random() - 0.5) * 1.6,
        vy: -0.6 - Math.random() * 1.4,
        age: 0,
        maxAge: 24 + Math.random() * 12,
        size: 2.5 + Math.random() * 2.5,
        color: "255,220,100",
        type: "stardust",
      });
    }
  }, []);

  // Initialize Matter.js Physics Engine & Jar Colliders
  useEffect(() => {
    const { Engine, World, Bodies, Events } = Matter;

    const engine = Engine.create({
      gravity: { x: 0, y: 1.4, scale: 0.001 },
      enableSleeping: false,
    });
    engineRef.current = engine;

    // Static boundary walls conforming strictly to the glass jar
    const floor = Bodies.rectangle(140, 336, 240, 24, {
      isStatic: true,
      friction: 0.85,
      restitution: 0.28,
    });

    const leftWall = Bodies.rectangle(16, 206, 20, 220, {
      isStatic: true,
      friction: 0.6,
      restitution: 0.3,
    });

    const rightWall = Bodies.rectangle(264, 206, 20, 220, {
      isStatic: true,
      friction: 0.6,
      restitution: 0.3,
    });

    const leftFunnel = Bodies.rectangle(54, 76, 92, 16, {
      isStatic: true,
      angle: 0.74,
      friction: 0.4,
      restitution: 0.3,
    });

    const rightFunnel = Bodies.rectangle(226, 76, 92, 16, {
      isStatic: true,
      angle: -0.74,
      friction: 0.4,
      restitution: 0.3,
    });

    const leftNeck = Bodies.rectangle(88, 22, 16, 44, { isStatic: true });
    const rightNeck = Bodies.rectangle(192, 22, 16, 44, { isStatic: true });

    const leftCorner = Bodies.rectangle(34, 322, 38, 16, {
      isStatic: true,
      angle: 0.78,
      friction: 0.8,
    });
    const rightCorner = Bodies.rectangle(246, 322, 38, 16, {
      isStatic: true,
      angle: -0.78,
      friction: 0.8,
    });

    World.add(engine.world, [
      floor,
      leftWall,
      rightWall,
      leftFunnel,
      rightFunnel,
      leftNeck,
      rightNeck,
      leftCorner,
      rightCorner,
    ]);

    // Collision reaction listener for custom elemental interactions
    Events.on(engine, "collisionStart", (event) => {
      const now = Date.now();
      event.pairs.forEach((pair) => {
        const bodyA = pair.bodyA as MarbleBody;
        const bodyB = pair.bodyB as MarbleBody;

        if (!bodyA.mood || !bodyB.mood) return;

        // Contact position
        const contactX = (bodyA.position.x + bodyB.position.x) / 2;
        const contactY = (bodyA.position.y + bodyB.position.y) / 2;
        const moods = [bodyA.mood, bodyB.mood];

        // Cooldown per pair to avoid redundant collision bursts
        if (
          bodyA.lastReaction &&
          now - bodyA.lastReaction < 400 &&
          bodyB.lastReaction &&
          now - bodyB.lastReaction < 400
        ) {
          return;
        }
        bodyA.lastReaction = now;
        bodyB.lastReaction = now;

        // 1. Chill (🧊) + Ember (🔥) => Sizzle steam!
        if (moods.includes("chill") && moods.includes("ember")) {
          spawnSizzle(contactX, contactY);
        }
        // 2. Lucky (🍀) + Ember (🔥) => Wildfire flame combustion!
        else if (moods.includes("lucky") && moods.includes("ember")) {
          spawnFlame(contactX, contactY);
        }
        // 3. Ghost (👻) + Chill (🧊) => Freezing frost!
        else if (moods.includes("ghost") && moods.includes("chill")) {
          spawnFrost(contactX, contactY);
        }
        // 4. Ghost (👻) + Ember (🔥) => Soulfire plasma!
        else if (moods.includes("ghost") && moods.includes("ember")) {
          spawnSoulfire(contactX, contactY);
        }
        // 5. Star (⭐) + Dream (😶‍🌫️) => Cosmic stardust!
        else if (moods.includes("star") && moods.includes("dream")) {
          spawnStardust(contactX, contactY);
        }
      });
    });

    // Canvas render loop
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;

    canvas.width = JAR_W * dpr;
    canvas.height = JAR_H * dpr;
    canvas.style.width = `${JAR_W}px`;
    canvas.style.height = `${JAR_H}px`;
    ctx.scale(dpr, dpr);

    let lastTime = performance.now();

    const loop = (time: number) => {
      const delta = Math.min(32, time - lastTime);
      lastTime = time;

      Engine.update(engine, delta);

      ctx.clearRect(0, 0, JAR_W, JAR_H);

      // Render every marble body with physics position & rotation
      marblesRef.current.forEach((m) => {
        ctx.save();
        ctx.translate(m.position.x, m.position.y);
        ctx.rotate(m.angle);

        ctx.font =
          '34px -apple-system, BlinkMacSystemFont, "Segoe UI Emoji", "Apple Color Emoji", "Segoe UI Symbol", sans-serif';
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        ctx.shadowColor = "rgba(0, 0, 0, 0.42)";
        ctx.shadowBlur = 8;
        ctx.shadowOffsetY = 4;

        ctx.fillText(m.emoji, 0, 0);
        ctx.restore();
      });

      // Update & render active reaction particles
      effectsRef.current = effectsRef.current.filter((e) => e.age < e.maxAge);
      effectsRef.current.forEach((e) => {
        e.x += e.vx;
        e.y += e.vy;
        e.age++;

        const progress = e.age / e.maxAge;
        const alpha = Math.max(0, 1 - progress);

        ctx.save();
        ctx.globalAlpha = alpha;

        if (e.symbol) {
          ctx.font = `${e.size}px -apple-system, BlinkMacSystemFont, "Segoe UI Emoji", sans-serif`;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(e.symbol, e.x, e.y);
        } else if (e.type === "steam") {
          const currentSize = e.size * (1 + progress * 1.5);
          const grad = ctx.createRadialGradient(e.x, e.y, 0, e.x, e.y, currentSize);
          grad.addColorStop(0, `rgba(${e.color},${alpha * 0.65})`);
          grad.addColorStop(0.5, `rgba(${e.color},${alpha * 0.25})`);
          grad.addColorStop(1, `rgba(${e.color},0)`);

          ctx.beginPath();
          ctx.arc(e.x, e.y, currentSize, 0, Math.PI * 2);
          ctx.fillStyle = grad;
          ctx.fill();
        } else {
          const currentSize = Math.max(1, e.size * (1 - progress * 0.4));
          ctx.shadowColor = `rgba(${e.color},0.85)`;
          ctx.shadowBlur = 8;
          ctx.beginPath();
          ctx.arc(e.x, e.y, currentSize, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${e.color},${alpha})`;
          ctx.fill();
        }

        ctx.restore();
      });

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafRef.current);
      Events.off(engine, "collisionStart", () => {});
      World.clear(engine.world, false);
      Engine.clear(engine);
    };
  }, [spawnSizzle, spawnFlame, spawnFrost, spawnSoulfire, spawnStardust]);

  // Drop a stone/marble with true 2D physics
  const dropMarble = useCallback(() => {
    if (dropping || !engineRef.current) return;

    setDropping(true);

    const { Bodies, World } = Matter;
    const mood = MOODS.find((m) => m.key === selectedMood)!;

    // Drop from exact center neck spot above opening with slight organic velocity
    const spawnX = JAR_W / 2 + (Math.random() - 0.5) * 8;
    const spawnY = 8;

    const marble = Bodies.circle(spawnX, spawnY, MARBLE_RADIUS, {
      restitution: 0.32, // stone-like natural impact bounce
      friction: 0.85,    // real rolling friction
      frictionAir: 0.008,
      density: 0.004,
    }) as MarbleBody;

    marble.emoji = mood.emoji;
    marble.mood = mood.key;

    // Initial downward impulse with slight random spin
    Matter.Body.setVelocity(marble, {
      x: (Math.random() - 0.5) * 0.8,
      y: 1.8 + Math.random() * 0.8,
    });
    Matter.Body.setAngularVelocity(marble, (Math.random() - 0.5) * 0.08);

    World.add(engineRef.current.world, marble);
    marblesRef.current.push(marble);

    const nextCount = marblesRef.current.length;
    setMarbleCount(nextCount);

    // If jar reaches capacity, celebrate and clear after a moment
    if (nextCount >= MAX_MARBLES) {
      setCelebrate(true);
      setTimeout(() => {
        if (!engineRef.current) return;
        setCelebrate(false);
        setJarFillCount((c) => c + 1);

        // Remove marble bodies from world
        marblesRef.current.forEach((m) => {
          Matter.World.remove(engineRef.current!.world, m);
        });
        marblesRef.current = [];
        setMarbleCount(0);
      }, 2000);
    }

    // Debounce button briefly so physics registers smoothly
    setTimeout(() => setDropping(false), 450);
  }, [dropping, selectedMood]);

  return (
    <JarSection>
      <JarCopy>
        Play with the jar instead. Pick a mood, drop marbles till you feel something.
      </JarCopy>

      {/* Physics Jar Container */}
      <JarWrap>
        {/* Back Glass Tint & Ground Shadow (Behind Canvas) */}
        <JarBackdrop />

        {/* Real Physics Canvas Rendering */}
        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 2,
            pointerEvents: "none",
          }}
        />

        {/* Front SVG Glass Glare, Thick Base & Brushed Metallic Lid */}
        <JarSVG celebrate={celebrate} />

        {celebrate && (
          <CelebrateOverlay
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: [0, 0.85, 0], scale: [0.92, 1.04, 1.1] }}
            transition={{ duration: 1.6, ease: "easeOut" }}
          />
        )}
      </JarWrap>

      {/* Mood Selector */}
      <MoodRow>
        {MOODS.map((m) => (
          <MoodBtn
            key={m.key}
            $active={selectedMood === m.key}
            onClick={() => setSelectedMood(m.key)}
            whileHover={{ scale: 1.12 }}
            whileTap={{ scale: 0.9 }}
            aria-label={m.label}
            title={m.label}
            {...cursorDrop}
          >
            {m.emoji}
          </MoodBtn>
        ))}
      </MoodRow>

      {/* Drop Button */}
      <DropBtn
        $disabled={dropping}
        onClick={dropMarble}
        disabled={dropping}
        whileHover={dropping ? {} : { scale: 1.03 }}
        whileTap={dropping ? {} : { scale: 0.97 }}
        {...cursorDrop}
      >
        {dropping ? "Dropping…" : "Drop a marble"}
      </DropBtn>

      {/* Status Counter */}
      <StatusLine
        key={marbleCount}
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {jarFillCount > 0 && `Jar filled ${jarFillCount}× · `}
        {marbleCount} marble{marbleCount !== 1 ? "s" : ""} dropped
        {marbleCount > 0 && " · Keep them coming."}
      </StatusLine>
    </JarSection>
  );
}
