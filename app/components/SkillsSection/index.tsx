"use client";

import { Label } from "../ui";
import { vp } from "../../lib/animations";
import { SKILLS, SKILL_MARQUEE } from "../../data";
import { Wrap, MarqueeOuter, Track, Chip, GridWrap, HeadRow, GridTitle, Grid, Card, CatTitle, SkillList, SkillItem } from "./styles";

/* ── Marquee ── */
/* ── Grid ── */

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

      {/* Grid */}
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
          {Object.entries(SKILLS).map(([cat, items], i) => (
            <Card
              key={cat}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={vp}
              transition={{ duration: 0.55, delay: i * 0.07 }}
            >
              <CatTitle>{cat}</CatTitle>
              <SkillList>
                {items.map((skill) => (
                  <SkillItem key={skill}>{skill}</SkillItem>
                ))}
              </SkillList>
            </Card>
          ))}
        </Grid>
      </GridWrap>
    </Wrap>
  );
}
