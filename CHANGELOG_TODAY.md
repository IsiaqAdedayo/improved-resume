# Portfolio Code Changes & Engineering Guide

This document breaks down the exact code transformations made across the portfolio today. It includes **Before vs After code snippets**, mathematical explanations, and step-by-step logic walkthroughs.

---

## 1. Hero Section: Removing Collision Explosions & Adding Smooth Repulsion

### Problem in Original Code
The original `BubbleCanvas` ran an expensive collision check and spawned a `HitEffect` whenever the cursor crossed a bubble, drawing multiple expanding shockwave rings, spiky starburst lines, and particle debris:

```typescript
// ❌ BEFORE: Spawning cartoon hit explosions & spiky starbursts on collision
if (dist < REPULSE_R && dist > 0) {
  const force = ((REPULSE_R - dist) / REPULSE_R) * 1.8;
  b.vx += (dx / dist) * force * 0.06;
  b.vy += (dy / dist) * force * 0.06;

  if (!wasOut) {
    spawnHit(mx + (dx / dist) * b.r, my + (dy / dist) * b.r); // Spawns spiky cartoon debris & shocks
    bExt.hitCooldown = 40;
  }
}
```

### The Solution & New Code
We removed `HitEffect`, `drawHit`, and the spike explosion logic entirely. Instead, we implemented **smooth velocity impulse with damping** and **dual-layer radial glow rendering** (soft halo + luminous core):

```typescript
// ✅ AFTER: Pure physical repulsion & gentle friction damping
const REPULSE_R = 140; // Influence radius

ballsRef.current.forEach((b) => {
  const dx = b.x - mx;
  const dy = b.y - my;
  const dist = Math.sqrt(dx * dx + dy * dy);

  // Smooth outward force when cursor approaches
  if (dist < REPULSE_R && dist > 0) {
    const force = ((REPULSE_R - dist) / REPULSE_R) * 2.4;
    b.vx += (dx / dist) * force * 0.14;
    b.vy += (dy / dist) * force * 0.14;
  }

  // Momentum damping (0.95 = 5% energy loss per frame)
  b.vx *= 0.95;
  b.vy *= 0.95;

  b.x += b.baseVx + b.vx;
  b.y += b.baseVy + b.vy;

  // Soft atmospheric radial glow rendering
  const grad = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.glowR);
  grad.addColorStop(0, `rgba(${b.colorRgb},${currentOpacity * 0.7})`);
  grad.addColorStop(0.4, `rgba(${b.colorRgb},${currentOpacity * 0.25})`);
  grad.addColorStop(1, `rgba(${b.colorRgb},0)`);

  ctx.beginPath();
  ctx.arc(b.x, b.y, b.glowR, 0, Math.PI * 2);
  ctx.fillStyle = grad;
  ctx.fill();

  // Crisp core dot
  ctx.beginPath();
  ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
  ctx.fillStyle = `rgba(${b.colorRgb},${currentOpacity * 1.1})`;
  ctx.fill();
});
```

---

## 1.5. Character Studio: Interactive Ghost Mascot Widget

### Files Created
- [app/components/HeroSection/GhostCharacter.tsx](file:///Users/adedayo/qaisi_portfolio/app/components/HeroSection/GhostCharacter.tsx)

### What Changed & Why
- **Interactive Character Studio Mascot**:
  - **Soft Mesh Drag Deformation & Elastic Spring**: Dragging the ghost horizontally skews, squashes, and deforms the body proportional to drag distance (`useTransform` on `skewX`, `scaleX`, `rotateZ`), with the 3 tendrils lagging behind like a soft water balloon before snapping back with elastic spring physics (`stiffness: 120, damping: 10`).
  - **Fluid Wandering & Independent Tendril Wave**: The ghost wanders along a multi-axis horizontal and vertical orbit (`Math.sin`/Lissajous curves) while its 3 bottom tendrils ripple independently like jelly.
  - **Swappable 12-Impression Eye Presets**: Neutral dashes, ⭐ Star eyes, ❤️ Heart eyes, 💤 Sleepy, 😲 Surprised, 😰 Nervous, 😊 Satisfied, 😵 Dead/dizzy, 🤨 Skeptical, 🌀 Spiral, 〰️ Wavy, and Blank.
  - **Scalloped Thought Cloud & Says System**: Cloud bubble tethered by micro-dots, with live toggle pills (`TEXT`, `QUESTION`, `BANG`, `HEART`, `CHECK`, `CROSS`, `SQUIGGLE`) and custom word editing.
  - **Golden Angel Halo**: Angled gold halo with specular rim light and halo glow bloom.
  - **Dynamic Footer Caption**: Displays current mood label & hint (`GHOST · EXCITED — DRAG THE CHARACTER TO TURN IT`) with a Character Studio toggle drawer.

---

## 2. Signature "Drop a Marble" Footer Toy: Transitioning to Matter.js

```typescript
// ✅ Initializing Matter.js Engine & Glass Jar Colliders
const { Engine, World, Bodies } = Matter;

const engine = Engine.create({
  gravity: { x: 0, y: 1.4, scale: 0.001 },
  enableSleeping: false,
});

// Floor sitting directly at the base of the bottle
const floor = Bodies.rectangle(140, 336, 240, 24, {
  isStatic: true,
  friction: 0.85,
  restitution: 0.28, // Low bounce = stone-like drop
});

// Vertical glass sidewalls
const leftWall = Bodies.rectangle(16, 206, 20, 220, { isStatic: true, friction: 0.6 });
const rightWall = Bodies.rectangle(264, 206, 20, 220, { isStatic: true, friction: 0.6 });

// Funnel shoulders guiding dropping marbles from the neck opening into the body
const leftFunnel = Bodies.rectangle(54, 76, 92, 16, { isStatic: true, angle: 0.74, friction: 0.4 });
const rightFunnel = Bodies.rectangle(226, 76, 92, 16, { isStatic: true, angle: -0.74, friction: 0.4 });

// Bottom rounded corner chamfers
const leftCorner = Bodies.rectangle(34, 322, 38, 16, { isStatic: true, angle: 0.78 });
const rightCorner = Bodies.rectangle(246, 322, 38, 16, { isStatic: true, angle: -0.78 });

World.add(engine.world, [floor, leftWall, rightWall, leftFunnel, rightFunnel, leftCorner, rightCorner]);
```

#### B. Spawning & Dropping Marbles with Angular Velocity
When the user clicks *"Drop a marble"*, a circular rigid body is spawned at the neck opening:

```typescript
// ✅ Spawning marble body
const marble = Bodies.circle(140 + (Math.random() - 0.5) * 8, 8, MARBLE_RADIUS, {
  restitution: 0.32, // Controlled natural impact bounce
  friction: 0.85,    // High rolling friction
  frictionAir: 0.008,
  density: 0.004,
}) as MarbleBody;

marble.emoji = mood.emoji;

// Initial downward velocity impulse + slight spin
Matter.Body.setVelocity(marble, {
  x: (Math.random() - 0.5) * 0.8,
  y: 1.8 + Math.random() * 0.8,
});
Matter.Body.setAngularVelocity(marble, (Math.random() - 0.5) * 0.08);

World.add(engine.world, marble);
marblesRef.current.push(marble);
```

#### C. High-DPI Canvas Rendering Loop
- **Clean Large Emojis**: Removed the surrounding circular background shells and borders. Emojis render directly at `34px` on a high-DPI canvas with physics rotation and soft drop shadows.
- **Interactive Elemental Collision Reactions**:
  - **Chill (`🧊`) + Ember (`🔥`)** &rarr; **Sizzle Steam**: Produces rising steam clouds and a `💨` sizzle puff upon contact.
  - **Lucky (`🍀`) + Ember (`🔥`)** &rarr; **Wildfire Flame Combustion**: Bursts radiant orange/red sparks and a `🔥` blaze flame.
  - **Ghost (`👻`) + Chill (`🧊`)** &rarr; **Freezing Frost**: Emits cold blue frost crystals, ice vapor, and a `❄️` snowflake glint.
  - **Ghost (`👻`) + Ember (`🔥`)** &rarr; **Soulfire Plasma**: Erupts eerie glowing magenta/cyan plasma sparks and spectral wisps.
  - **Star (`⭐`) + Dream (`😶‍🌫️`)** &rarr; **Cosmic Stardust**: Releases golden stardust sparkle glints (`✨`).
- **Mood Selection & Capacity Celebration**: 7 expressive mood choices: ⭐ Star, 😶‍🌫️ Dream, 🧁 Soft, 🍀 Lucky, 🔥 Ember, 🧊 Chill, 👻 Ghost, with session fill counters (`Jar filled {N}× · {count} marbles dropped`) and celebratory ring animation on capacity (25 marbles) before resetting.

```typescript
// ✅ 60-120fps Canvas Render Loop
const loop = (time: number) => {
  const delta = Math.min(32, time - lastTime);
  lastTime = time;

  Engine.update(engine, delta);
  ctx.clearRect(0, 0, JAR_W, JAR_H);

  marblesRef.current.forEach((m) => {
    ctx.save();
    ctx.translate(m.position.x, m.position.y);
    ctx.rotate(m.angle); // Rotates emoji according to physics spin

    ctx.font = '34px -apple-system, BlinkMacSystemFont, "Segoe UI Emoji", sans-serif';
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.shadowColor = "rgba(0, 0, 0, 0.42)";
    ctx.shadowBlur = 8;
    ctx.shadowOffsetY = 4;

    ctx.fillText(m.emoji, 0, 0);
    ctx.restore();
  });

  requestAnimationFrame(loop);
};
```

---

## 3. Open Source Showcase: 3D Perspective Tilt & Spotlight

### Problem in Original Code
Original cards were static rectangular anchors (`<OSSCard>`) with only CSS background hover transitions.

### The Solution & New Code
We built `InteractiveOSSCard` which tracks cursor offsets relative to the card's center `(cx, cy)` and computes 3D rotations:

```typescript
// ✅ 3D Tilt calculation & spotlight tracking
const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
  const card = cardRef.current;
  const spotlight = spotlightRef.current;
  if (!card || !spotlight) return;

  const rect = card.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  const cx = rect.width / 2;
  const cy = rect.height / 2;

  // Calculate tilt angle (max ±6 degrees)
  const rotateX = ((y - cy) / cy) * -6;
  const rotateY = ((x - cx) / cx) * 6;
  card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(4px)`;

  // Internal radial spotlight gradient follows cursor
  spotlight.style.background = `radial-gradient(200px circle at ${x}px ${y}px, rgba(184,131,42,0.12), transparent 70%)`;
};
```

---

## 4. Before/After Interactive Drag Reveal Slider

### File Created: `app/components/ProjectsSection/BeforeAfterSlider.tsx`

We implemented a split-screen slider inside the mockup frame. Framer Motion's `useSpring` and `useTransform` convert mouse/touch `clientX` into a smooth dynamic mask width percentage:

```typescript
// ✅ Dynamic width clipping
const rawX = useMotionValue(50); // 0% to 100%
const smoothX = useSpring(rawX, { stiffness: 320, damping: 28 });
const widthPercent = useTransform(smoothX, (v) => `${v}%`);
const leftPercent = useTransform(smoothX, (v) => `${v}%`);

// In JSX:
{/* AFTER (Full-width background layer) */}
<SliderSide $side="after">
  <SliderImg src={afterSrc} alt={afterAlt} />
  <SideLabel $side="after">Production UI</SideLabel>
</SliderSide>

{/* BEFORE (Masked with dynamic width) */}
<motion.div
  style={{
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    width: widthPercent, // Clips from 0% to 100% as user drags
    overflow: "hidden",
    borderRight: `2px solid ${T.accent}`,
    zIndex: 8,
  }}
>
  <div style={{ position: "relative", width: "520px", height: "100%" }}>
    <WireframeView />
    <SideLabel $side="before">Wireframe</SideLabel>
  </div>
</motion.div>

{/* Draggable handle icon */}
<motion.div style={{ position: "absolute", left: leftPercent, transform: "translateX(-50%)" }}>
  <Handle>⟺</Handle>
</motion.div>
```

---

## 5. Skills Section: Animated Depth Scale replacing Static Lists

### Problem in Original Code
The previous component rendered plain text strings inside a bulleted list (`<SkillItem>▹ React</SkillItem>`), providing no indication of experience depth.

### The Solution: Categorized Proficiency Bars
We redefined skills with a self-aware 4-tier scale (`Lead`, `Build`, `Use`, `Learn`) and animated `scaleX` bars on viewport intersection:

```typescript
// ✅ Data definition in data/index.tsx
export type SkillDepth = "Lead" | "Build" | "Use" | "Learn";

export const SKILLS: Record<string, SkillEntry[]> = {
  "Frontend Engineering": [
    { name: "React", depth: "Lead", years: "4yr" },
    { name: "Next.js (App Router)", depth: "Lead", years: "3yr" },
    { name: "GraphQL", depth: "Build", years: "2yr" },
    { name: "React Native", depth: "Use", years: "1yr" },
  ],
  // ...
};

// ✅ Component rendering animated bars
function ProficiencyRow({ name, depth, years, delay }: Props) {
  const targetWidth = depthWidth(depth); // Lead: 92%, Build: 68%, Use: 46%, Learn: 28%

  return (
    <ProfRow>
      <ProfTop>
        <ProfName>{name}</ProfName>
        <DepthTag $depth={depth}>{depth} · {years}</DepthTag>
      </ProfTop>
      <ProfTrack>
        <ProfFill
          $depth={depth}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
          style={{ width: targetWidth }}
        />
      </ProfTrack>
    </ProfRow>
  );
}
```

---

## 6. Social Proof: Floating Testimonials Section

### Files Created: `app/components/TestimonialsSection/index.tsx` & `styles.ts`

We introduced a dedicated section with scroll-driven parallax movement and curated editorial tilt angles:

```typescript
// ✅ Parallax Y-drift and curated tilt angles
const CARD_ANGLES = [-2.5, 2.0];
const PARALLAX_Y = ["-8%", "6%"];

export function TestimonialsSection() {
  const wrapRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start end", "end start"],
  });

  return (
    <CardsArea>
      {TESTIMONIALS.map((t, i) => {
        const y = useTransform(scrollYProgress, [0, 1], [PARALLAX_Y[i], i % 2 === 0 ? "4%" : "-4%"]);

        return (
          <CardFloat
            key={t.name}
            style={{ y }}
            initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40, rotate: CARD_ANGLES[i] * 2 }}
            whileInView={{ opacity: 1, x: 0, rotate: CARD_ANGLES[i] }}
            viewport={{ once: true }}
          >
            <TestiCard whileHover={{ y: -6, scale: 1.01 }}>
              <TestiAvatar>{t.initials}</TestiAvatar>
              <TestiQuote>&quot;{t.quote}&quot;</TestiQuote>
              <TestiBadge href={t.linkedinUrl} target="_blank">View on LinkedIn →</TestiBadge>
            </TestiCard>
          </CardFloat>
        );
      })}
    </CardsArea>
  );
}
```

---

## 7. Custom Cursor: Contextual Badges & Click Ripples

### File Modified: `app/components/CustomCursor/index.tsx`

We extended the cursor state machine to support contextual actions (`"drop"`, `"explore"`, `"view"`, `"drag"`) with animated label transitions and tactile click shockwaves:

```typescript
// ✅ Contextual cursor variants
const RING_CONFIG: Record<CursorVariant, { size: number; bg: string; border: string; label?: string; ... }> = {
  default: { size: 36, bg: "transparent", border: T.accent, opacity: 0.6, dotOpacity: 1, dotScale: 1 },
  hover:   { size: 52, bg: "rgba(184,131,42,0.12)", border: T.accent, opacity: 1, dotOpacity: 0, dotScale: 0 },
  drop:    { size: 62, bg: "rgba(184,131,42,0.14)", border: T.accent, opacity: 1, label: "drop", dotOpacity: 0, dotScale: 0 },
  explore: { size: 62, bg: "rgba(184,131,42,0.10)", border: T.accent, opacity: 1, label: "explore", dotOpacity: 0, dotScale: 0 },
  view:    { size: 54, bg: "rgba(184,131,42,0.10)", border: T.accent, opacity: 1, label: "view", dotOpacity: 0, dotScale: 0 },
  drag:    { size: 72, bg: "rgba(184,131,42,0.10)", border: T.accent, opacity: 1, label: "drag", dotOpacity: 0, dotScale: 0 },
  text:    { size: 3,  bg: T.accent, border: "transparent", opacity: 0.9, dotOpacity: 0, dotScale: 0, mixBlend: "difference" },
  click:   { size: 24, bg: "rgba(184,131,42,0.25)", border: T.accent, opacity: 1, dotOpacity: 1, dotScale: 0.5 },
};

// ✅ Expanding click ripple
<AnimatePresence>
  {ripples.map((rp) => (
    <Ripple
      key={rp.id}
      style={{ left: rp.x, top: rp.y }}
      initial={{ width: 10, height: 10, opacity: 0.7 }}
      animate={{ width: 56, height: 56, opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    />
  ))}
</AnimatePresence>
```

---

## 8. Summary of Added Dependencies

```json
"dependencies": {
  "matter-js": "^0.20.0"
},
"devDependencies": {
  "@types/matter-js": "^0.20.2"
}
```
*(All other animations leverage existing dependencies: Next.js 16, Framer Motion 12, and Styled Components 6).*
