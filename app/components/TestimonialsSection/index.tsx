"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { TESTIMONIALS } from "../../data";
import { vp } from "../../lib/animations";
import { Label } from "../ui";
import {
  CardFloat,
  CardsArea,
  PlaceholderNotice,
  Star,
  Stars,
  TestiAvatar,
  TestiBadge,
  TestiCard,
  TestiHead,
  TestiHeadline,
  TestiInner,
  TestiMeta,
  TestiName,
  TestiQuote,
  TestiRole,
  TestiWrap,
} from "./styles";

/* Slight angles per card — feels curated, not gridded */
const CARD_ANGLES = [-2.5, 2, -1.5, 2.8];
/* Parallax rates — different Y drift per card for depth */
const PARALLAX_Y = ["-8%", "6%", "-5%", "7%"];

export function TestimonialsSection() {
  const wrapRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start end", "end start"],
  });

  const allPlaceholder = TESTIMONIALS.every((t) =>
    t.quote.startsWith("PLACEHOLDER"),
  );

  return (
    <TestiWrap ref={wrapRef} id="testimonials">
      <TestiInner>
        <TestiHead>
          <Label
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={vp}
          >
            Social Proof
          </Label>
          <TestiHeadline
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={vp}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            What <em>collaborators</em> say
          </TestiHeadline>
        </TestiHead>

        <CardsArea>
          {TESTIMONIALS.map((t, i) => {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const y = useTransform(
              scrollYProgress,
              [0, 1],
              [PARALLAX_Y[i] ?? "0%", i % 2 === 0 ? "4%" : "-4%"],
            );

            return (
              <CardFloat
                key={i}
                $angle={CARD_ANGLES[i] ?? 0}
                style={{ y }}
                initial={{
                  opacity: 0,
                  x: i % 2 === 0 ? -40 : 40,
                  rotate: (CARD_ANGLES[i] ?? 0) * 2,
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                  rotate: CARD_ANGLES[i] ?? 0,
                }}
                viewport={vp}
                transition={{
                  delay: i * 0.12,
                  duration: 0.9,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <TestiCard whileHover={{ y: -6, scale: 1.01 }}>
                  <TestiMeta>
                    <TestiAvatar>{t.initials}</TestiAvatar>
                    <div>
                      <TestiName>{t.name}</TestiName>
                      <TestiRole>
                        {t.title} · {t.company}
                      </TestiRole>
                    </div>
                  </TestiMeta>

                  <TestiQuote>&quot;{t.quote}&quot;</TestiQuote>

                  <Stars>
                    {[...Array(5)].map((_, s) => (
                      <Star key={s}>★</Star>
                    ))}
                  </Stars>

                  {t.linkedinUrl && (
                    <TestiBadge href={t.linkedinUrl} target="_blank">
                      View on LinkedIn →
                    </TestiBadge>
                  )}
                </TestiCard>
              </CardFloat>
            );
          })}
        </CardsArea>

        {allPlaceholder && (
          <div style={{ textAlign: "center" }}>
            <PlaceholderNotice>
              ⚠ Placeholder quotes — replace with real testimonials in{" "}
              data/index.tsx
            </PlaceholderNotice>
          </div>
        )}
      </TestiInner>
    </TestiWrap>
  );
}
