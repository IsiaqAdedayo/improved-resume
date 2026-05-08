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