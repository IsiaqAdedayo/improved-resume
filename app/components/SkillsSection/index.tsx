"use client";

import { motion } from "framer-motion";
import { Label } from "../ui";
import { vp } from "../../lib/animations";
import { SKILLS, SKILL_MARQUEE } from "../../data";
import type { SkillDepth } from "../../data";
import {
  Wrap,
  MarqueeOuter,
  Track,
  Chip,
  GridWrap,
  HeadRow,
  GridTitle,
  Grid,
  Card,
  CatTitle,
  ProfList,
  ProfRow,
  ProfTop,
  ProfName,
  DepthTag,
  ProfTrack,
  ProfFill,
  depthWidth,
} from "./styles";

/* ── Depth label mapping ── */
const DEPTH_LABEL: Record<SkillDepth, string> = {
  Lead:  "Lead",
  Build: "Build",
  Use:   "Use",
  Learn: "Learn",
};

/* ── Single proficiency row ── */
function ProficiencyRow({
  name,
  depth,
  years,
  delay,
}: {
  name: string;
  depth: SkillDepth;
  years?: string;
  delay: number;
}) {
  const target = depthWidth(depth);

  return (
    <ProfRow>
      <ProfTop>
        <ProfName>{name}</ProfName>
        <DepthTag $depth={depth}>
          {DEPTH_LABEL[depth]}{years ? ` · ${years}` : ""}
        </DepthTag>
      </ProfTop>
      <ProfTrack>
        <ProfFill
          $depth={depth}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{
            duration: 0.9,
            delay,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{ width: target }}
        />
      </ProfTrack>
    </ProfRow>
  );
}

export function SkillsSection() {
  return (
    <Wrap id="skills">
      {/* Marquee */}
      <MarqueeOuter>
        <Track
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
        >
          {[...SKILL_MARQUEE, ...SKILL_MARQUEE].map((s, i) => (
            <Chip key={i}>{s}</Chip>
          ))}
        </Track>
      </MarqueeOuter>

      {/* Proficiency grid */}
      <GridWrap>
        <HeadRow>
          <Label
            $light={false}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={vp}
          >
            By category
          </Label>
          <GridTitle
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={vp}
            transition={{ duration: 0.7 }}
          >
            Tech <em>Stack</em>
          </GridTitle>
        </HeadRow>

        <Grid>
          {Object.entries(SKILLS).map(([cat, skills], i) => (
            <Card
              key={cat}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={vp}
              transition={{ duration: 0.55, delay: i * 0.07 }}
            >
              <CatTitle>{cat}</CatTitle>
              <ProfList>
                {skills.map((skill, j) => (
                  <ProficiencyRow
                    key={skill.name}
                    name={skill.name}
                    depth={skill.depth}
                    years={skill.years}
                    delay={i * 0.07 + j * 0.04}
                  />
                ))}
              </ProfList>
            </Card>
          ))}
        </Grid>

        {/* Depth legend */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={vp}
          transition={{ delay: 0.4 }}
          style={{
            display: "flex",
            gap: "1.8rem",
            marginTop: "2rem",
            flexWrap: "wrap",
          }}
        >
          {(["Lead", "Build", "Use", "Learn"] as SkillDepth[]).map((d) => (
            <div
              key={d}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                fontFamily: "var(--font-mono)",
                fontSize: "0.58rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.32)",
              }}
            >
              <ProfFill
                $depth={d}
                initial={{ scaleX: 1 }}
                style={{
                  width: "24px",
                  height: "2px",
                  borderRadius: "1px",
                  display: "inline-block",
                }}
              />
              {d}
            </div>
          ))}
        </motion.div>
      </GridWrap>
    </Wrap>
  );
}
