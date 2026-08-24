# Build "Deslopify" — App Redesign Agency Site

Reconstructed spec from a screen-recording. A few exact values (hex codes, font family, precise easing curves) aren't verifiable from a video and are marked **[assumption]** — treat those as a starting point, not gospel, and adjust to taste.

## Stack
- Next.js (App Router) + TypeScript + Tailwind CSS
- Framer Motion for scroll/entrance animations and the segmented-control transitions
- **Matter.js** (or `@react-three/rapier`/`planck.js` if you want WebGL) for the footer marble-jar physics — this is a real 2D physics sim, not a CSS trick
- Lucide icons

## Global style
- Light, airy background: white → soft blue/lavender/pink gradient wash that shifts hue as you scroll down the page (visible bleed of pink/purple/blue behind the browser-chrome frame). **[assumption on exact stops]**
- Rounded, friendly sans-serif headings (something like Geist/General Sans), dark navy (#1a2233-ish) for headline text, not pure black
- Pill-shaped buttons and badges everywhere; primary CTA = dark navy/black pill with white text
- Generous whitespace, big type scale on section headers (~56–72px)
- Small hand-drawn doodle SVGs (squiggle, heart-with-legs) scattered as decoration in whitespace — informal, sketched-line style, low opacity
- The whole demo is framed inside a fake browser window (traffic-light dots, tab, address bar reading `localhost:5247`, tab title "Deslopify | Ugly App In. Beautiful App Out.") — you likely don't need this chrome in the real build, it's just how it was demoed

## Nav (sticky, pill-shaped, floats over content)
- Logo mark (sparkle/pen icon) + "Deslopify" wordmark, left
- Center links: `Work`, `Process`, `Pricing`, `About`
- Right: dark pill button "Book a call"
- Nav bar itself is a rounded white pill floating with a soft shadow, not full-width edge-to-edge

---

## Section 1 — Hero
- Small pill badge top-left of content: icon + "Claude Coded" + separator + "Now get a working prototype in your phone!"
- H1, two lines, big bold: **"Make Your App Feel Premium"**
  - Animate this in with a **typewriter effect** — text types out character by character with a blinking text-caret at the end that lingers after typing finishes
- Subhead: "Send screenshots of your app. Get them back beautiful, in days not months."
- Primary CTA: dark pill button "Fix My App" with a small arrow/chevron icon
- Below the fold of the hero: a horizontal row of phone mockups fanned out, each showing a real app UI screenshot
  - Leftmost card labeled **"BEFORE"** (dated/ugly UI — cluttered chat app)
  - Remaining 4+ cards labeled **"AFTER"** (clean redesigns — dark fintech dashboard, onboarding flow, investment app, stock charting app)
  - Cards have a subtle fan/rotation (alternating slight tilt) and appear to scale/straighten slightly as the user scrolls, like a card deck settling

### Before/After comparison widget (appears as you continue scrolling the hero stack)
- Interactive **draggable slider** directly on top of one phone screenshot: a vertical divider line with a small draggable handle (icon: `< >`) that reveals "BEFORE" content on one side and "AFTER" on the other as you drag
- This is the classic before/after image-compare slider component, just skinned to sit inside a phone-shaped mask

---

## Section 2 — Process (pinned/scroll-driven)
- Background gradient continues to shift (pink → lavender → pale blue) as this section is scrolled through — implement with a scroll-linked background-color interpolation (Framer Motion `useScroll` + `useTransform`, or just a tall section with a CSS gradient and scroll-timeline)
- Layout: phone mockup pinned center, showing the live "product" (a finance app dashboard) with a bottom mini-nav
- Left card, swaps content as you scroll through 3 stages (use IntersectionObserver or scroll-snap to trigger each):
  1. **"Send screenshots"** → "Your app, as-is" / "Drop raw screenshots of your app. Any screen, any state. That is all we need."
  2. (next stage swaps the phone content + card copy to the redesign stage)
  3. Final stage: "Ship It." headline appears large below, with a chat-bubble mockup (a WhatsApp-style conversation) and a floating testimonial card ("Aisha M., Founder, Hush — 5 stars — 'Didn't think our app could look this clean. Live in six days.'")
- A pill-shaped **segmented control** sits above/below the phone with 3 tabs: `Send Screens` · `We Redesign` · `Ship It` — the active tab has an animated pill/highlight that slides between options (Framer Motion `layoutId` shared-element transition), and it's driven by scroll position, not just click

---

## Section 3 — Work (portfolio)
- Tab toggle: **"App design"** / **"App store shots"** — pill toggle, switches the grid content below
- Horizontally-scrollable row of phone mockup cards (5–6 visible, peek of next/prev at edges), each a different app screenshot: onboarding, premium/paywall screen, feature comparison table, stock charting
- Below the row: a small row of 3 app-icon avatars (rounded-square icons) representing the client apps featured
- Italic pull-quote centered below, flanked by `«` `»` marks: *"Powerful automation, built without technical overhead for your team."*
- Second pass of this pattern with different apps (fitness/health apps: AirPods settings screen, running tracker, Apple Watch habit tracker, recipe app) — same interaction pattern, just a different content set, implying this is one reusable `<PortfolioCarousel>` component instantiated per category
- Further down: a **masonry/bento image grid** (irregular column heights) of many more app screenshots — travel booking, hotel listings, music player, before/after split screens, social/chat, dating app, recipe app. This is a dense proof-of-work wall, not interactive beyond hover.

---

## Section 4 — Pricing
- Header: "Simple pricing for every stage."
- Two pricing cards side by side, each with a soft illustrated gradient header background (blue/pink watercolor leaves for one, purple/lavender for the other) and a colored circular icon badge:
  1. **Pay Per Screen**
     - Badge: "7 Days Delivery" (this label updates dynamically based on the toggle below)
     - Description: "One-off redesigns, priced by screen count. Send screens, get them back polished."
     - Range label (e.g. "1 to 3 Screens") + live price (e.g. "$790") — driven by a **horizontal range slider** with discrete steps (steps observed: 1–3 → $790, up through 7–9 → $2100). Dragging the slider updates both the range label and price in real time.
     - Toggle switch: "Quick delivery (4 days) +$300" — flipping this adds $300 to the displayed price and changes the delivery badge from "7 Days" to "4 Days Delivery"
     - "What's included" checklist below (Figma files + working coded prototype, cohesive design throughout, one revision round included, etc.)
  2. **Design Subscription**
     - Badge: "Limited availability"
     - Description: "A rolling design partner for teams that ship every week. Unlimited requests, flat price."
     - Segmented toggle: `Monthly` / `1 Week Trial`
     - Price: "$4,500 / month"
     - "What's included" checklist (unlimited requests one at a time, updates every 2 days, async Slack collaboration, weekly consulting call, pause or cancel anytime)

---

## Section 5 — About
- Short bio paragraph about the founder (first-person/third-person voice, casual tone): mentions rebuilding ugly screens, "Claude doing the heavy lifting and taste doing the rest," ships polished designs plus real code that runs same-day
- Two-column meta list:
  - **Ships**: App Revamps, Working Prototypes, Figma Files, Design Subscriptions
  - **Weapons**: Claude, Figma, SwiftUI, Zero Meetings
- Small stacked phone-mockup graphic + hand-drawn squiggle/heart doodles as whitespace decoration

---

## Section 6 — Social proof
- Big headline built from mixed text + inline icon glyphs, e.g. "50+ founders sent us their apps to [Apple-logo icon] Look Expensive" — the App Store logo glyph is inlined inside the sentence at normal text size
- A phone mockup center-stage showing a circular avatar cluster + "Over 50 founders trust Deslopify"
- **Dismissible tweet/testimonial cards** scattered left/right of the phone, styled like X/Twitter reply cards (avatar, handle, "Follow" link, quote text, like count, Reply/Copy link actions), each with an **X close button** in the corner that removes the card (state: array of testimonials, filter out on dismiss)
- A booking widget below (Cal.com-style): left panel with host name/avatar, meeting title "15 Min Meeting," duration, "Google Meet," timezone selector; center month calendar grid; right panel a scrollable list of open time slots with a 12h/24h toggle

---

## Section 7 — Footer: the marble jar ⭐ (the centerpiece interaction)

This is a physics-simulated jar that fills with marbles as visitors interact — reset per session or persisted, your call.

**Copy above the jar:** "Play with the jar instead. Pick a mood, drop marbles till you feel something."

**Layout:**
- Large glass jar illustration (SVG: rounded jar body + metal lid on top), centered
- Marbles rendered as small circles (~40–50px) with simple flat-illustration faces/icons drawn on them — colors/icons map to the "mood" selected: yellow star, teal ghost/blob, pink heart, blue ghost, green checkmark, red heart-inverted, blue folder, gray/silver blob — 7 mood options total, shown as a row of small circular toggle buttons below the jar
- The **currently selected mood** button has a ring/outline highlight
- Primary pill button: **"Drop a marble"**
- Live status line below the button: `"Jar filled {N}x. {count} marbles from you. Keep them coming."` — increments the marble counter and occasionally the "jar filled Nx" counter (implying the jar empties/resets and increments a fill-count once it reaches capacity)
- Copyright line at the very bottom: "© 2026 DESLOPIFY. ALL RIGHTS RESERVED."

**Interaction / physics behavior (this is the part worth getting right):**
1. Clicking "Drop a marble" spawns a new marble body at the top of the jar (above the visible fluid line, roughly centered with slight random x-offset)
2. The marble falls under gravity, collides with the jar's inner walls (invisible static collider bodies matching the jar's curved silhouette) and with marbles already resting in the pile
3. Marbles settle into a naturally stacked, slightly jittered pile at the jar's base — not a grid, not a stack that clips through each other. Expect a bit of jostle/bounce on impact, then it settles (add a little damping/friction and restitution ~0.3–0.5 so it feels tactile, not superballs)
4. The mood picker changes what texture/icon+color the *next dropped* marble uses — previously dropped marbles keep their original appearance
5. Counter state updates on each successful drop; when marble count crosses some threshold (jar visually "full"), trigger a small celebratory moment (could just be the "Jar filled Nx" counter ticking up) and either reset the jar or keep stacking indefinitely — pick one and be consistent

**Implementation notes:**
- Use Matter.js: create a `Matter.Engine`, a few static rectangle/arc bodies approximating the jar interior walls + floor, and a circle body per marble
- Render marbles with `Matter.Render` to canvas, or (nicer) run Matter for physics only and render each body's `x/y/angle` onto positioned DOM/SVG elements via `requestAnimationFrame`, so you can keep the illustrated marble faces as crisp SVG/PNG assets instead of canvas-drawn circles
- Cap total marble count (e.g. 40–60) to keep the physics step cheap, and prune/reset oldest marbles once you hit the "jar full" state
- Debounce/disable the button briefly after each click so people can't spam-click faster than the animation can visually register

---

## Content/data checklist to fill in before shipping
- [ ] Real client logos/screenshots for the Work section (the video uses placeholder-style app UIs — recreate or license your own)
- [ ] Actual testimonial quotes/handles (don't reuse "Farrux Hewson" / "mikun" verbatim — these read as placeholder demo data)
- [ ] Confirm real pricing tiers/numbers before launch — the $790–$2100 and $4,500/mo figures are whatever was on screen during the demo, not necessarily final pricing
- [ ] Swap the Cal.com-style booking widget for an actual embed (Cal.com, Calendly) rather than rebuilding scheduling logic from scratch
