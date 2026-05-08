// Styles for ProjectsSection
import { motion } from "framer-motion";
import styled from "styled-components";
import { T } from "../../styles/tokens";
import { Inner } from "../ui";

export const SectionLabel = styled.div`
  max-width: 1240px;
  margin: 0 auto;
  padding: 5rem 3rem 2rem;

  @media (max-width: 768px) {
    padding: 4rem 1.5rem 1.5rem;
  }
`;

export const SceneWrap = styled(motion.div)<{ $tint: string }>`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  background: ${T.bgDeep};
  overflow: hidden;
  will-change: opacity, transform;

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

export const SceneBg = styled.div<{ $src?: string | null }>`
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

export const SceneContent = styled(Inner)`
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

export const SceneLeft = styled.div``;

export const SceneIndex = styled.div`
  font-family: ${T.fontMono};
  font-size: 0.62rem;
  letter-spacing: 0.16em;
  color: ${T.inkDim};
  text-transform: uppercase;
  margin-bottom: 1rem;
`;

export const SceneTag = styled.div`
  font-family: ${T.fontMono};
  font-size: 0.62rem;
  letter-spacing: 0.12em;
  color: ${T.accent};
  text-transform: uppercase;
  margin-bottom: 1.2rem;
`;

export const SceneTitle = styled.h2`
  font-family: ${T.fontDisplay};
  font-size: clamp(3rem, 6vw, 6rem);
  font-weight: 700;
  letter-spacing: -0.04em;
  line-height: 0.92;
  color: ${T.ink};
  margin-bottom: 1.4rem;
`;

export const SceneDesc = styled.p`
  font-size: 0.92rem;
  color: ${T.inkMuted};
  line-height: 1.8;
  max-width: 400px;
  margin-bottom: 1.6rem;
`;

export const TechRow = styled.div`
  display: flex;
  gap: 0.8rem;
  flex-wrap: wrap;
  margin-bottom: 2rem;
`;

export const ViewBtn = styled(motion.a)`
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

export const MockupWrap = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  align-items: flex-end;

  @media (max-width: 900px) {
    align-items: flex-start;
  }
`;

export const BrowserFrame = styled.div`
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

export const BrowserBar = styled.div`
  background: rgba(255, 255, 255, 0.06);
  padding: 0.7rem 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
`;

export const BrowserDot = styled.div<{ $c: string }>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${(p) => p.$c};
  opacity: 0.6;
`;

export const BrowserUrl = styled.div`
  flex: 1;
  background: rgba(255, 255, 255, 0.04);
  border-radius: 4px;
  height: 20px;
  margin-left: 0.5rem;
`;

export const BrowserImg = styled.img`
  width: 100%;
  height: 260px;
  object-fit: cover;
  object-position: top;
  display: block;
`;

export const BrowserPlaceholder = styled.div`
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

export const PhoneFrame = styled.div`
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

export const PhoneNotch = styled.div`
  height: 18px;
  background: rgba(255, 255, 255, 0.06);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const PhoneNotchDot = styled.div`
  width: 40px;
  height: 5px;
  border-radius: 3px;
  background: rgba(255, 255, 255, 0.15);
`;

export const PhoneImg = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
  object-position: top;
`;

export const PhonePlaceholder = styled.div`
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

export const DotsWrap = styled.div`
  position: absolute;
  right: 2rem;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
`;

export const Dot = styled.div<{ $active: boolean }>`
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

export const OSSWrap = styled.section`
  background: ${T.bgSurface};
  padding: 5rem 0;
  border-top: 1px solid ${T.border};
`;

export const OSSGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
`;

export const OSSCard = styled(motion.a)`
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

export const OSSIndex = styled.div`
  font-family: ${T.fontMono};
  font-size: 0.6rem;
  color: ${T.inkDim};
  letter-spacing: 0.12em;
  margin-bottom: 0.8rem;
`;

export const OSSTitle = styled.h3`
  font-family: ${T.fontDisplay};
  font-size: 1.5rem;
  font-weight: 700;
  color: ${T.ink};
  letter-spacing: -0.02em;
  margin-bottom: 0.5rem;
`;

export const OSSTagline = styled.p`
  font-size: 0.85rem;
  color: ${T.inkMuted};
  line-height: 1.6;
  margin-bottom: 1rem;
`;

export const OSSFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const OSSBadge = styled.span`
  font-family: ${T.fontMono};
  font-size: 0.58rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${T.accent};
  background: ${T.accentDim};
  padding: 0.2rem 0.6rem;
  border-radius: 2px;
`;