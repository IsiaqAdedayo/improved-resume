// Styles for Navbar
import styled from "styled-components";
import { motion } from "framer-motion";
import { T } from "../../styles/tokens";

export const Nav = styled(motion.nav)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  padding: 1.35rem 3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(13, 11, 20, 0.82);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border-bottom: 1px solid ${T.border};

  @media (max-width: 768px) {
    padding: 1.2rem 1.5rem;
  }
`;

export const Logo = styled(motion.button)`
  background: none;
  border: none;
  cursor: pointer;
  font-family: ${T.fontDisplay};
  font-size: 1.5rem;
  font-weight: 700;
  color: ${T.ink};
  letter-spacing: -0.03em;
  line-height: 1;

  span {
    color: ${T.accent};
  }
`;

export const NavLinks = styled.div`
  display: flex;
  gap: 2.5rem;
  align-items: center;

  @media (max-width: 620px) {
    display: none;
  }
`;

/* ── Mobile hamburger ──────────────────────────────── */
export const HamburgerBtn = styled(motion.button)`
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.4rem;
  z-index: 200;
  position: relative;

  @media (max-width: 620px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 5px;
    width: 36px;
    height: 36px;
  }
`;

export const Bar = styled(motion.span)`
  display: block;
  width: 24px;
  height: 1.5px;
  background: ${T.ink};
  border-radius: 2px;
  transform-origin: center;
`;

/* ── Mobile drawer ─────────────────────────────────── */
export const DrawerOverlay = styled(motion.div)`
  display: none;

  @media (max-width: 620px) {
    display: block;
    position: fixed;
    inset: 0;
    background: rgba(13, 11, 20, 0.55);
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    z-index: 110;
  }
`;

export const DrawerPanel = styled(motion.div)`
  display: none;

  @media (max-width: 620px) {
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    width: min(78vw, 300px);
    background: #0d0b14;
    border-left: 1px solid ${T.borderMid};
    z-index: 150;
    padding: 5.5rem 2.5rem 3rem;
    gap: 0.5rem;
    overflow: hidden;

    /* subtle top accent glow */
    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 1px;
      background: linear-gradient(
        90deg,
        transparent 0%,
        ${T.accent} 40%,
        ${T.accentHover} 60%,
        transparent 100%
      );
    }

    /* ambient glow orb */
    &::after {
      content: "";
      position: absolute;
      top: -60px;
      right: -40px;
      width: 200px;
      height: 200px;
      background: ${T.accentGlow};
      border-radius: 50%;
      filter: blur(60px);
      pointer-events: none;
    }
  }
`;

export const DrawerLink = styled(motion.button)`
  background: none;
  border: none;
  cursor: pointer;
  font-family: ${T.fontDisplay};
  font-size: 2.2rem;
  font-weight: 600;
  letter-spacing: -0.02em;
  color: ${T.inkMuted};
  text-align: left;
  padding: 0.55rem 0;
  position: relative;
  line-height: 1;
  transition: color 0.2s;

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, ${T.accent}, transparent);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1);
  }

  &:hover,
  &:focus-visible {
    color: ${T.ink};
    &::after {
      transform: scaleX(1);
    }
  }
`;

export const DrawerHireBtn = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  margin-top: auto;
  background: ${T.accent};
  color: #fff;
  border: none;
  border-radius: 3px;
  padding: 0.75rem 1.5rem;
  font-family: ${T.fontBody};
  font-size: 0.82rem;
  font-weight: 600;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  cursor: pointer;
  text-decoration: none;
  width: fit-content;
`;

export const DrawerDivider = styled.div`
  width: 100%;
  height: 1px;
  background: ${T.border};
  margin: 1rem 0;
`;

export const NavLink = styled(motion.button)<{ $active: boolean }>`
  background: none;
  border: none;
  cursor: pointer;
  font-family: ${T.fontBody};
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${(p) => (p.$active ? T.ink : T.inkMuted)};
  transition: color 0.2s;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: -4px;
    left: 0;
    right: 0;
    height: 1px;
    background: ${T.accent};
    transform: scaleX(${(p) => (p.$active ? 1 : 0)});
    transform-origin: left;
    transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1);
  }

  &:hover {
    color: ${T.ink};
  }
`;

export const HireBtn = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  background: ${T.accent};
  color: #fff;
  border: none;
  border-radius: 3px;
  padding: 0.55rem 1.25rem;
  font-family: ${T.fontBody};
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  cursor: pointer;
  transition: background 0.2s;
  text-decoration: none;

  &:hover {
    background: ${T.accentHover};
  }

  @media (max-width: 620px) {
    display: none;
  }
`;