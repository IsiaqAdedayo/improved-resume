"use client";

import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { Sparkles, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { T } from "../../styles/tokens";
import { useCursorHandlers } from "../CustomCursor";

/* ── Styled Components ─────────────────────────────────── */
const DesktopGhostWrapper = styled(motion.div)`
  position: absolute;
  top: 18%;
  right: 6%;
  width: clamp(200px, 22vw, 320px);
  aspect-ratio: 1 / 1.15;
  perspective: 900px;
  z-index: 2;
  cursor: pointer;
  user-select: none;

  @media (max-width: 900px) {
    display: none; /* Hide large block on mobile so profile bio is 100% upfront */
  }
`;

const GhostContainer = styled(motion.div)`
  width: 100%;
  height: 100%;
  position: relative;
  transform-style: preserve-3d;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ShadowBlob = styled(motion.div)`
  position: absolute;
  bottom: -15px;
  left: 50%;
  width: 55%;
  height: 16px;
  border-radius: 50%;
  background: radial-gradient(
    ellipse at center,
    rgba(0, 0, 0, 0.45) 0%,
    transparent 70%
  );
  transform: translateX(-50%);
  filter: blur(4px);
  pointer-events: none;
`;

const SpeechBubble = styled(motion.div)`
  position: absolute;
  top: -24px;
  right: 10px;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(184, 131, 42, 0.35);
  border-radius: 100px;
  padding: 0.3rem 0.8rem;
  font-family: ${T.fontMono};
  font-size: 0.58rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${T.accent};
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
  pointer-events: none;
  white-space: nowrap;
  z-index: 10;
`;

const InteractionHint = styled(motion.div)`
  position: absolute;
  bottom: -32px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 5px;
  font-family: ${T.fontMono};
  font-size: 0.52rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${T.inkDim};
  white-space: nowrap;
  pointer-events: none;
  opacity: 0.65;
`;

/* ── Mobile Pocket Mascot Fab & Modal ──────────────────── */
const MobileMascotFab = styled(motion.button)`
  display: none;
  position: fixed;
  bottom: 24px;
  right: 20px;
  z-index: 90;
  background: rgba(16, 14, 22, 0.85);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(184, 131, 42, 0.4);
  border-radius: 100px;
  padding: 0.45rem 0.85rem;
  box-shadow:
    0 10px 30px rgba(0, 0, 0, 0.6),
    0 0 20px rgba(184, 131, 42, 0.25);
  cursor: pointer;
  align-items: center;
  gap: 6px;
  font-family: ${T.fontMono};
  font-size: 0.6rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${T.accent};

  @media (max-width: 900px) {
    display: flex;
  }
`;

const MobileMascotBackdrop = styled(motion.div)`
  position: fixed;
  inset: 0;
  /* background: rgba(0, 0, 0, 0.7); */
  backdrop-filter: blur(1px);
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
`;

const MobileMascotCard = styled(motion.div)`
  width: 100%;
  max-width: 310px;
  background: transparent;
  border: none;
  border-radius: 20px;
  padding: 1.8rem 1.4rem 1.4rem;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* box-shadow: 0 24px 60px rgba(0, 0, 0, 0.8); */
`;

const CloseModalBtn = styled.button`
  position: absolute;
  top: 14px;
  right: 14px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 50%;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${T.inkDim};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    color: ${T.ink};
    background: rgba(255, 255, 255, 0.12);
  }
`;

/* ── Eye expression variants ───────────────────────────── */
type Impression = "gaze" | "star" | "happy" | "wink" | "dizzy";

/* ── Ghost SVG Silhouette & Expressions ────────────────── */
function GhostSvgBody({
  impression,
  isBlinking,
  eyeOffsetX,
  eyeOffsetY,
  prefix = "ghost",
}: {
  impression: Impression;
  isBlinking: boolean;
  eyeOffsetX: any;
  eyeOffsetY: any;
  prefix?: string;
}) {
  return (
    <svg
      viewBox="0 0 240 280"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", height: "100%", overflow: "visible" }}
    >
      <defs>
        <linearGradient
          id={`${prefix}-ghostBodyGrad`}
          x1="60"
          y1="20"
          x2="180"
          y2="260"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#fff2c6" />
          <stop offset="45%" stopColor="#f0f2f8" />
          <stop offset="85%" stopColor="#d5dbe8" />
          <stop offset="100%" stopColor="#b4bed2" />
        </linearGradient>
        <linearGradient
          id={`${prefix}-ghostGoldRim`}
          x1="30"
          y1="20"
          x2="210"
          y2="260"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
          <stop offset="30%" stopColor="#fff2c6" stopOpacity="0.6" />
          <stop offset="70%" stopColor="#b8832a" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#664612" stopOpacity="0.1" />
        </linearGradient>
        <radialGradient id={`${prefix}-eyeGlow`} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#1e1e24" />
          <stop offset="70%" stopColor="#131317" />
          <stop offset="100%" stopColor="#08080a" />
        </radialGradient>
        <linearGradient
          id={`${prefix}-angelHaloGrad`}
          x1="60"
          y1="4"
          x2="180"
          y2="24"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#ffd875" />
          <stop offset="35%" stopColor="#fff6d6" />
          <stop offset="55%" stopColor="#f5be42" />
          <stop offset="85%" stopColor="#d49220" />
          <stop offset="100%" stopColor="#ffea9f" />
        </linearGradient>
        <filter id={`${prefix}-haloGlow`} x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="7" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        <filter id={`${prefix}-ghostGlow`} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="14" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Angel Golden Halo */}
      <motion.g
        animate={{ y: [-2.5, 2.5, -2.5] }}
        transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
      >
        <ellipse
          cx="120"
          cy="14"
          rx="42"
          ry="10"
          fill="none"
          stroke="rgba(255, 216, 117, 0.4)"
          strokeWidth="7"
          filter={`url(#${prefix}-haloGlow)`}
        />
        <ellipse
          cx="120"
          cy="14"
          rx="42"
          ry="10"
          fill="none"
          stroke={`url(#${prefix}-angelHaloGrad)`}
          strokeWidth="4.5"
        />
        <path
          d="M 90 10 Q 120 6 150 10"
          stroke="#ffffff"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </motion.g>

      {/* Ghost Main Body Silhouette */}
      <g>
        {/* Soft Ambient Body Glow */}
        <path
          d="M 120 25
             C 65 25, 42 70, 42 125
             C 42 170, 40 220, 48 245
             C 56 230, 72 230, 84 245
             C 96 230, 112 230, 124 245
             C 136 230, 152 230, 164 245
             C 176 230, 192 230, 200 245
             C 204 220, 202 170, 202 125
             C 202 70, 175 25, 120 25
             Z"
          fill="rgba(184, 131, 42, 0.12)"
          filter={`url(#${prefix}-ghostGlow)`}
        />
        {/* Ghost Solid Shell */}
        <path
          d="M 120 25
             C 65 25, 42 70, 42 125
             C 42 170, 40 220, 48 245
             C 56 230, 72 230, 84 245
             C 96 230, 112 230, 124 245
             C 136 230, 152 230, 164 245
             C 176 230, 192 230, 200 245
             C 204 220, 202 170, 202 125
             C 202 70, 175 25, 120 25
             Z"
          fill={`url(#${prefix}-ghostBodyGrad)`}
          stroke={`url(#${prefix}-ghostGoldRim)`}
          strokeWidth="2"
        />
        {/* Left Curved Specular Highlight */}
        <path
          d="M 64 65 C 54 95, 52 145, 54 185"
          stroke="rgba(255, 255, 255, 0.7)"
          strokeWidth="5"
          strokeLinecap="round"
        />

        {/* Eyes Layer */}
        <motion.g
          style={{
            x: impression === "gaze" ? eyeOffsetX : 0,
            y: impression === "gaze" ? eyeOffsetY : 0,
          }}
        >
          {impression === "gaze" && (
            <>
              <motion.rect
                x="92"
                y="108"
                width="14"
                height="26"
                rx="7"
                fill={`url(#${prefix}-eyeGlow)`}
                animate={{ scaleY: isBlinking ? 0.1 : 1 }}
                transition={{ duration: 0.1 }}
                style={{ originX: "99px", originY: "121px" }}
              />
              {!isBlinking && (
                <circle
                  cx="96"
                  cy="114"
                  r="2.5"
                  fill="#ffffff"
                  opacity="0.9"
                />
              )}
              <motion.rect
                x="134"
                y="108"
                width="14"
                height="26"
                rx="7"
                fill={`url(#${prefix}-eyeGlow)`}
                animate={{ scaleY: isBlinking ? 0.1 : 1 }}
                transition={{ duration: 0.1 }}
                style={{ originX: "141px", originY: "121px" }}
              />
              {!isBlinking && (
                <circle
                  cx="138"
                  cy="114"
                  r="2.5"
                  fill="#ffffff"
                  opacity="0.9"
                />
              )}
            </>
          )}

          {impression === "happy" && (
            <>
              <path
                d="M 90 122 Q 99 108 108 122"
                stroke="#131317"
                strokeWidth="7"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M 132 122 Q 141 108 150 122"
                stroke="#131317"
                strokeWidth="7"
                strokeLinecap="round"
                fill="none"
              />
            </>
          )}

          {impression === "wink" && (
            <>
              <path
                d="M 90 121 Q 99 128 108 121"
                stroke="#131317"
                strokeWidth="7"
                strokeLinecap="round"
                fill="none"
              />
              <rect
                x="134"
                y="108"
                width="14"
                height="26"
                rx="7"
                fill={`url(#${prefix}-eyeGlow)`}
              />
              <circle
                cx="138"
                cy="114"
                r="2.5"
                fill="#ffffff"
                opacity="0.9"
              />
            </>
          )}

          {impression === "star" && (
            <>
              {[99, 141].map((cx) => (
                <path
                  key={cx}
                  d="M0 -11 L2.6 -3.4 L11 -3.4 L4.2 1.3 L6.8 9 L0 4.2 L-6.8 9 L-4.2 1.3 L-11 -3.4 L-2.6 -3.4 Z"
                  transform={`translate(${cx} 121)`}
                  fill="#f5be42"
                />
              ))}
            </>
          )}

          {impression === "dizzy" && (
            <>
              <path
                d="M 91 112 L 107 128 M 107 112 L 91 128"
                stroke="#131317"
                strokeWidth="4.5"
                strokeLinecap="round"
              />
              <path
                d="M 133 112 L 149 128 M 149 112 L 133 128"
                stroke="#131317"
                strokeWidth="4.5"
                strokeLinecap="round"
              />
            </>
          )}

          <ellipse
            cx="82"
            cy="138"
            rx="7"
            ry="4"
            fill="rgba(240, 140, 160, 0.28)"
          />
          <ellipse
            cx="158"
            cy="138"
            rx="7"
            ry="4"
            fill="rgba(240, 140, 160, 0.28)"
          />
        </motion.g>
      </g>
    </svg>
  );
}

/* ── Main Ghost Mascot Widget ──────────────────────────── */
export function GhostCharacter() {
  const ghostRef = useRef<HTMLDivElement>(null);
  const [isBlinking, setIsBlinking] = useState(false);
  const [speechText, setSpeechText] = useState("hi there");
  const [showSpeech, setShowSpeech] = useState(false);
  const [impression, setImpression] = useState<Impression>("gaze");
  const [showMobileModal, setShowMobileModal] = useState(false);
  const cursorHover = useCursorHandlers("hover");

  /* Mouse gaze tracking & 3D tilt */
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const tiltSpring = { stiffness: 180, damping: 20 };
  const smoothX = useSpring(mouseX, tiltSpring);
  const smoothY = useSpring(mouseY, tiltSpring);

  const rotateY = useTransform(smoothX, [-300, 300], [-16, 16]);
  const rotateX = useTransform(smoothY, [-300, 300], [14, -14]);

  const eyeOffsetX = useTransform(smoothX, [-300, 300], [-6, 6]);
  const eyeOffsetY = useTransform(smoothY, [-300, 300], [-4, 4]);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (!ghostRef.current) return;
      const rect = ghostRef.current.getBoundingClientRect();
      mouseX.set(e.clientX - (rect.left + rect.width / 2));
      mouseY.set(e.clientY - (rect.top + rect.height / 2));
    };
    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, [mouseX, mouseY]);

  /* Blinking loop */
  useEffect(() => {
    if (impression !== "gaze") return;
    const blinkInterval = setInterval(
      () => {
        setIsBlinking(true);
        setTimeout(() => setIsBlinking(false), 160);
      },
      3800 + Math.random() * 2000,
    );
    return () => clearInterval(blinkInterval);
  }, [impression]);

  /* Poke / click reactions */
  const REACTIONS: { text: string; mood: Impression }[] = [
    { text: "*waves* 👋", mood: "happy" },
    { text: "boo! 👻", mood: "dizzy" },
    { text: "building...", mood: "gaze" },
    { text: "clean ui 🔥", mood: "star" },
    { text: "crafted with code ✨", mood: "wink" },
    { text: "enjoy the stay 💫", mood: "happy" },
  ];

  const handlePoke = useCallback(() => {
    const next = REACTIONS[Math.floor(Math.random() * REACTIONS.length)];
    setSpeechText(next.text);
    setShowSpeech(true);
    setImpression(next.mood);
    setTimeout(() => setShowSpeech(false), 1800);
    setTimeout(() => setImpression("gaze"), 1800);
  }, []);

  return (
    <>
      {/* ── 1. Desktop Ghost in Hero Empty Space ── */}
      <DesktopGhostWrapper
        ref={ghostRef}
        initial={{ opacity: 0, scale: 0.8, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1.1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        onClick={handlePoke}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        {...cursorHover}
      >
        {showSpeech && (
          <SpeechBubble
            initial={{ opacity: 0, y: 8, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
          >
            {speechText}
          </SpeechBubble>
        )}

        <GhostContainer
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
          }}
          /* Out-of-phase vertical bob and sway */
          animate={{
            y: [-8, 8, -8],
            x: [-4, 4, -4],
            rotateZ: [-1.2, 1.8, -1.2],
          }}
          transition={{
            y: { duration: 4.5, repeat: Infinity, ease: "easeInOut" },
            x: { duration: 5.6, repeat: Infinity, ease: "easeInOut" },
            rotateZ: { duration: 3.8, repeat: Infinity, ease: "easeInOut" },
          }}
        >
          <GhostSvgBody
            impression={impression}
            isBlinking={isBlinking}
            eyeOffsetX={eyeOffsetX}
            eyeOffsetY={eyeOffsetY}
            prefix="desk"
          />
        </GhostContainer>

        <ShadowBlob
          animate={{
            scaleX: [1, 0.85, 1],
            opacity: [0.4, 0.25, 0.4],
          }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Informative Micro-Description */}
        <InteractionHint
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.65 }}
          transition={{ delay: 1.2 }}
        >
          <span>Poke to interact ✨</span>
        </InteractionHint>
      </DesktopGhostWrapper>

      {/* ── 2. Mobile Floating Pocket Companion FAB ── */}
      <MobileMascotFab
        onClick={() => setShowMobileModal(true)}
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 1 }}
        whileTap={{ scale: 0.94 }}
      >
        <span>👻</span>
        <span>Mascot</span>
        <Sparkles size={11} color={T.accent} />
      </MobileMascotFab>

      {/* ── 3. Mobile Expandable Mascot Modal ── */}
      <AnimatePresence>
        {showMobileModal && (
          <MobileMascotBackdrop
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowMobileModal(false)}
          >
            <MobileMascotCard
              initial={{ scale: 0.85, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.85, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div
                style={{
                  width: "180px",
                  height: "210px",
                  position: "relative",
                  margin: "0.5rem 0",
                  cursor: "pointer",
                }}
                onClick={handlePoke}
              >
                {showSpeech && (
                  <SpeechBubble
                    initial={{ opacity: 0, y: 8, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                    style={{ top: "-18px", right: "0" }}
                  >
                    {speechText}
                  </SpeechBubble>
                )}

                <GhostSvgBody
                  impression={impression}
                  isBlinking={isBlinking}
                  eyeOffsetX={eyeOffsetX}
                  eyeOffsetY={eyeOffsetY}
                  prefix="mob"
                />

                <ShadowBlob
                  animate={{
                    scaleX: [1, 0.85, 1],
                    opacity: [0.4, 0.25, 0.4],
                  }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>

              <div
                style={{
                  fontFamily: T.fontMono,
                  fontSize: "0.58rem",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: T.accent,
                  marginTop: "0.4rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                Tap to poke mascot ✨
              </div>
            </MobileMascotCard>
          </MobileMascotBackdrop>
        )}
      </AnimatePresence>
    </>
  );
}
