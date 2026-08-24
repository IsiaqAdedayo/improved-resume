# Website Recreation Prompt — Premium App/Agency Landing Page

## Role

Act as a senior frontend engineer, interaction designer, and creative developer.

Recreate the website shown in the attached reference video as a **production-quality responsive website**, using the video as the primary visual and interaction reference.

The goal is **not** to build a generic agency landing page. Reproduce the visual language, pacing, composition, whitespace, transitions, floating UI, and playful interactions that make the reference feel premium.

The most important interaction to preserve is the **"Drop a marble" footer interaction**. Treat it as a signature product moment, not a decorative afterthought.

---

# 1. Technical Direction

Build with:

- Next.js 14
- TypeScript
- App Router
- Tailwind CSS
- Framer Motion for UI animation
- CSS transforms/transitions wherever possible
- Use existing project dependencies before adding new ones
- Keep the implementation componentized and maintainable
- Avoid unnecessary global state
- Make the page fully responsive

If a dependency is genuinely necessary, prefer lightweight solutions. For example:

```bash
yarn add framer-motion
```

Do not introduce a large animation/physics library simply to reproduce the marble interaction unless it provides a clear benefit.

The page should work without JavaScript-heavy animation being required for basic content rendering.

---

# 2. Reference Video Analysis

The reference is a polished creative agency/product studio website presented through a browser recording.

Important: the browser chrome, desktop wallpaper, and external window framing visible in the recording are **not part of the website**. Recreate the website itself, not the browser frame around it.

The actual site has:

- A very light, almost white background
- Soft pastel blue/lilac/pink atmospheric gradients
- Large editorial headlines
- Extremely generous whitespace
- Rounded cards and rounded image containers
- Floating app screenshots/mockups
- Dark pill-shaped CTA buttons
- Minimal top navigation
- Black/dark typography
- Bright purple/blue accent colors
- Subtle shadows and glass-like surfaces
- Motion that feels smooth and intentional rather than flashy
- Sections that visually transform as the user scrolls
- Large centered compositions rather than conventional two-column corporate layouts

The design should feel:

> premium + playful + minimal + experimental + polished

Avoid making it feel like a conventional SaaS dashboard or template.

---

# 3. Overall Design Language

## Color

Base:

- White
- Off-white
- Very pale blue
- Very pale lavender
- Very pale pink

Accents:

- Electric/premium purple
- Soft blue
- Pink
- Green
- Yellow
- Occasional red/coral

The pastel colors should mostly appear as **ambient gradients and accents**, not as large saturated backgrounds.

Use gradients similar to:

- pale blue → white
- pale lavender → white
- pale pink → white
- blue/lilac/pink atmospheric blends

The page should remain bright and airy.

## Typography

Use a modern grotesk/sans-serif typeface.

The visual hierarchy should be strong:

- Very large hero headline
- Medium-large section headlines
- Small supporting copy
- Compact navigation
- Bold pill CTAs

Headlines should have tight line-height and strong weight.

Use occasional highlighted words in accent colors where appropriate.

Do not overuse bold text.

---

# 4. Header / Navigation

Create a compact floating/sticky navigation bar.

Structure:

```text
[logo]        Work   Process   Pricing   About        [Book a call]
```

Characteristics:

- Minimal
- Small typography
- Lots of whitespace
- Rounded/pill CTA
- Dark CTA with light text
- Header remains visually lightweight
- It should not consume much vertical space

On mobile:

- Keep the logo visible
- Replace the desktop links with a compact menu control
- Preserve the CTA if space allows
- Do not make the mobile header visually heavy

The header should feel like it belongs to the page rather than looking like a conventional website navbar.

---

# 5. Hero Section

The opening section is one of the strongest parts of the reference.

Use a large editorial headline similar in structure to:

> Make Your App  
> Feel Premium

or

> Make Your App  
> Look Expensive

The exact copy can be adapted if building a new brand, but preserve the hierarchy.

Hero composition:

- Small announcement/badge near the top
- Huge headline
- Short supporting paragraph
- Primary dark pill CTA
- Large collection of app screenshots underneath/around the headline
- Screenshots should appear as floating phone/app mockups
- Screenshots should overlap slightly
- Some cards should be angled very subtly
- The composition should feel like a curated design board rather than a grid

The screenshot collection is extremely important.

Do not simply place five rectangular images next to one another.

Instead:

- Use different phone proportions
- Vary scale slightly
- Add subtle rotation
- Add overlapping depth
- Add soft shadows
- Give the cards rounded corners
- Let some screenshots extend beyond the normal content width

On desktop, the hero composition should feel expansive.

On mobile, collapse the composition into a horizontally scrollable or vertically layered collection without making it unusable.

---

# 6. App Screenshot Showcase

Create multiple showcase sections that demonstrate polished mobile UI.

The reference repeatedly uses:

- Phone mockups
- Financial/productivity screens
- Purple interfaces
- Cards with rounded corners
- Small floating labels
- App-store-like UI
- Screenshots placed on very pale backgrounds

Do not make every section structurally identical.

Vary the composition:

### Showcase A

Multiple phones side-by-side.

### Showcase B

One large phone centered in the viewport.

### Showcase C

A row/grid of product screens.

### Showcase D

A floating phone surrounded by supporting UI cards.

The goal is to create a feeling that the agency has a large body of high-quality product work.

---

# 7. Section — "Send Your Screens. Messy Is Fine."

Create a large centered section inspired by the reference.

Visual structure:

- Huge amount of whitespace
- Very soft pastel cloud/gradient background
- A central product/app image
- Several small floating UI snippets around it
- A dark pill CTA underneath
- Large headline below or near the composition

The central visual should appear to float in space.

Supporting cards should be positioned with absolute positioning on desktop.

They should animate subtly when entering the viewport.

Do not over-animate.

---

# 8. Section — "Ship It. Watch People Notice."

Create another large visual storytelling section.

Use:

- A central phone/mockup
- Floating testimonial/comment cards
- Star ratings
- Small social proof snippets
- Dark pill CTA
- Large headline

The floating cards should feel like they are attached to the product experience rather than randomly scattered.

Use slight parallax/float movement as the user scrolls.

---

# 9. Pricing / Service Section

The reference contains a large pricing comparison section.

Create two prominent service cards.

Example structure:

```text
┌──────────────────────┐    ┌──────────────────────┐
│ icon                 │    │ icon                 │
│ Pay Per Screen       │    │ Design Subscription  │
│                      │    │                      │
│ $790                 │    │ $4,500 / month       │
│                      │    │                      │
│ ✓ feature            │    │ ✓ feature            │
│ ✓ feature            │    │ ✓ feature            │
│ ✓ feature            │    │ ✓ feature            │
│                      │    │                      │
│ [CTA]                │    │ [CTA]                │
└──────────────────────┘    └──────────────────────┘
```

The exact pricing can be changed for the new brand, but preserve the visual hierarchy.

Cards should:

- Be large
- Have generous internal spacing
- Use rounded corners
- Have subtle borders/shadows
- Use accent icons
- Make the price visually dominant
- Use compact feature lists
- Have strong CTA buttons

Do not turn this into a dense pricing table.

---

# 10. Portfolio / Work Gallery

Include a large visual portfolio section.

The reference shows a large collection of app screenshots in a gallery.

Build a responsive gallery that feels curated rather than like a generic masonry grid.

Desktop:

- Multiple columns
- Different card sizes
- Rounded corners
- Different visual treatments
- Slight spacing between projects

Mobile:

- One or two columns depending on width
- Maintain readable image proportions
- Preserve visual rhythm

Hover behavior on desktop:

- Slight scale
- Slight lift
- Subtle shadow increase
- Optional metadata reveal

Do not make hover animations excessive.

---

# 11. Social Proof / Founder Section

Create a section similar to the reference's founder/about section.

Use a large headline with a human/creator-oriented message.

For example:

> The guy behind  
> the glowups.

Then show:

- Founder portrait
- Short biography
- Small supporting UI card
- Decorative elements
- Subtle floating motion

Keep the section personal and editorial.

It should feel like a person behind a craft, not a generic "About our company" section.

---

# 12. Testimonial / App Social Proof Section

Create a large visual section around the concept:

> 50+ founders sent us their apps to look expensive.

Use:

- Large typography
- Highlighted words
- App mockup
- Floating testimonial cards
- Profile avatars
- Small star/review indicators
- Soft background gradients

Testimonials should float around the central product visual.

Cards can gently drift or slide into place as the section enters the viewport.

---

# 13. Booking / Calendar Section

The reference includes a scheduling/calendar interface.

Recreate this as a polished visual component.

Include:

- Calendar
- Date selection
- Available time slots
- Selected meeting
- Small event details
- Rounded UI
- Minimal borders
- Green availability indicators

This can be a static visual component for the initial implementation.

If the project later requires real booking functionality, isolate the visual component so it can be connected to an actual scheduling API.

---

# 14. Footer — Signature "Drop a Marble" Interaction

## This is the most important creative interaction.

Do not treat the footer as a standard footer.

The reference ends with a large, calm, almost empty section containing a transparent glass jar/bottle filled with colorful marbles.

Above/around it is a small line of playful copy.

Below the jar is a horizontal collection of small colorful marble/icon choices.

There is a dark pill button:

> Drop a marble

The footer should feel like a small interactive toy.

---

# 15. Marble Interaction Behavior

Implement the interaction carefully.

Initial state:

```text
                ┌─────────┐
                │         │
                │  ● ●    │
                │ ● ● ●   │
                │ ● ● ●   │
                └─────────┘

       🟡  🟢  🔵  ❤️  🟣  🟡

             [ Drop a marble ]
```

The jar should already contain several marbles.

Each marble has a different color and subtle personality.

Possible marble types:

- Blue
- Purple
- Pink
- Yellow
- Green
- Coral/red
- White
- Orange

The marbles should have tiny faces or simple expressive marks if visually appropriate.

---

## Selecting a marble

When the user clicks one of the marble choices:

1. Visually highlight the selected marble.
2. Keep the selection state.
3. Give the selected icon a tiny scale/bounce response.
4. Update the button state if necessary.

Example:

```text
🟡  🟢  🔵  ❤️  🟣
            ↑
         selected
```

---

## Clicking "Drop a marble"

When the user clicks:

```text
[ Drop a marble ]
```

the selected marble should:

1. Spawn above the jar.
2. Fall downward.
3. Accelerate naturally as if affected by gravity.
4. Enter the jar opening.
5. Continue downward into the collection.
6. Bounce slightly when it lands.
7. Settle among the existing marbles.

The animation should feel physical.

Avoid a simple:

```css
transform: translateY(...)
```

that just slides the object downward at a constant speed.

Instead use a spring/easing curve that suggests:

- gravity
- impact
- bounce
- settling

Framer Motion is sufficient for this.

---

# 16. Marble Physics Illusion

You do not need a full physics engine.

Fake the physics convincingly.

Suggested sequence:

```text
selected marble
      ↓
spawn ~100–200px above jar
      ↓
fast downward motion
      ↓
small horizontal wobble
      ↓
enter jar
      ↓
small bounce
      ↓
settle
```

Use:

- `y`
- `scale`
- `rotate`
- spring transitions
- staggered settling

The marble should not teleport.

The user should clearly perceive:

> "I chose this marble and dropped it into the jar."

---

# 17. Marble Persistence

Within the current page/session:

- Every successful drop should remain inside the jar.
- Do not remove previous marbles.
- New marbles should be added to the collection.
- Randomize their final resting position slightly.
- Prevent obvious visual overlap where possible.

If the jar becomes visually full:

- Either allow marbles to stack naturally within a defined region
- Or gently shrink/reposition the collection
- Do not let marbles spill outside the jar unless that is intentionally designed

Use a deterministic fallback so the interaction remains stable.

---

# 18. Marble Choice Interaction

The row of marble choices should feel playful.

Each option should:

- Be circular
- Have a soft shadow
- Be slightly separated
- React to hover/tap
- Scale subtly when selected
- Have an accessible label
- Be keyboard accessible

Clicking a color should not immediately drop the marble.

The user must explicitly click:

> Drop a marble

This creates a two-step interaction:

```text
Choose marble
     ↓
Drop marble
     ↓
Watch animation
```

---

# 19. Footer Copy

Use playful copy inspired by the reference.

For example:

> Play with the jar instead. Pick a mood, drop marbles till you feel something.

Then:

> Drop a marble

And a small copyright/footer line underneath.

Keep the footer quiet and spacious.

The jar should be the visual focus.

---

# 20. Footer Visual Treatment

The footer should use:

- Very pale blue/white background
- Soft pastel rainbow-like atmospheric gradients
- Large whitespace
- Slight glass effect
- Subtle shadow beneath the jar
- Transparent jar body
- Visible glass rim/opening
- Colorful marbles inside

The jar should look like a designed 3D/illustrated object.

If a high-quality generated asset is available, use it.

Otherwise build it from:

- CSS
- SVG
- layered DOM elements

Do not use an obviously generic emoji jar.

The marbles can be DOM/SVG elements so their positions and animations remain controllable.

---

# 21. Scroll Animations

The website should feel alive as the user scrolls.

Use restrained motion:

- Fade in
- Slide up
- Scale from 0.96 → 1
- Slight parallax
- Horizontal movement for screenshot groups
- Small rotations
- Floating cards

Animation philosophy:

> Every animation should explain the visual transition.

Avoid:

- excessive bouncing
- constant looping animations everywhere
- huge rotations
- distracting scroll hijacking
- forced smooth scrolling that interferes with normal browser behavior

Respect:

```css
prefers-reduced-motion
```

When reduced motion is enabled, disable decorative animations and preserve the content hierarchy.

---

# 22. Hero Animation

On initial load:

1. Header fades in.
2. Small badge appears.
3. Headline rises into position.
4. Supporting copy follows.
5. CTA appears.
6. App screenshots rise/scale into place with slight stagger.
7. Nothing should feel rushed.

Use a stagger of roughly 50–120ms between related elements.

---

# 23. Screenshot Movement

For screenshot collections:

- Use subtle floating movement
- Different cards should move at slightly different rates
- Avoid synchronized movement
- Keep movement amplitude small

Example:

```text
Phone A → y: -4px
Phone B → y: +6px
Phone C → y: -8px
Phone D → y: +3px
```

This creates an organic composition.

---

# 24. Responsive Design

## Desktop

At large widths:

- Let visual compositions extend beyond the central content width.
- Use large typography.
- Use overlapping phone mockups.
- Use generous vertical spacing.
- Allow floating elements around central objects.

## Tablet

- Reduce typography
- Reduce overlap
- Reduce section height
- Maintain visual hierarchy

## Mobile

Do not simply shrink the desktop layout.

Instead:

- Stack major content
- Reduce decorative floating elements
- Keep key screenshots visible
- Use horizontal scrolling for showcase galleries where appropriate
- Make CTA buttons thumb-friendly
- Keep headings readable
- Preserve the marble footer interaction
- Ensure the jar remains large enough to be visually understandable

The marble interaction must work with touch.

---

# 25. Accessibility

Implement:

- Semantic HTML
- Keyboard navigation
- Visible focus states
- Proper button elements
- `aria-label` for marble choices
- Reduced-motion support
- Sufficient text contrast
- Meaningful image alt text
- No interaction that requires hover only

The marble game should be fully usable via keyboard.

Example:

```text
Tab → marble choices
Tab → Drop a marble
Enter/Space → select/drop
```

---

# 26. Component Architecture

Do not build the entire page in one component.

Suggested structure:

```text
components/
├── navigation/
│   └── Header.tsx
│
├── hero/
│   ├── Hero.tsx
│   └── AppShowcase.tsx
│
├── sections/
│   ├── SendYourScreens.tsx
│   ├── ShipIt.tsx
│   ├── Pricing.tsx
│   ├── WorkGallery.tsx
│   ├── FounderSection.tsx
│   ├── SocialProof.tsx
│   └── BookingSection.tsx
│
├── footer/
│   ├── MarbleFooter.tsx
│   ├── MarbleJar.tsx
│   ├── MarbleSelector.tsx
│   └── Marble.tsx
│
└── ui/
    ├── Button.tsx
    ├── Pill.tsx
    └── SectionHeading.tsx
```

Keep the marble interaction isolated from the rest of the application.

---

# 27. State Management

Do not introduce Zustand or another global state library just for this page.

The marble interaction only needs local state.

For example:

```text
selectedMarble
droppedMarbles
isDropping
```

Keep that state inside `MarbleFooter` or a dedicated hook.

Possible structure:

```text
useMarbleGame()
├── selectedMarble
├── droppedMarbles
├── selectMarble()
└── dropMarble()
```

---

# 28. Data Model for Marbles

Use a simple data structure:

```ts
type MarbleType = {
  id: string;
  color: string;
  accent?: string;
  face?: string;
};
```

Each dropped marble should receive:

```ts
type DroppedMarble = {
  id: string;
  type: MarbleType;
  targetX: number;
  targetY: number;
  rotation: number;
};
```

The target position should be calculated so each new marble settles naturally.

---

# 29. Performance

Be careful with the number of animated DOM nodes.

Requirements:

- Animate with `transform` and `opacity`
- Avoid animating layout properties such as `top`, `left`, `width`, `height`
- Avoid expensive blur animations
- Lazy-load below-the-fold imagery
- Use responsive image sizes
- Avoid loading huge screenshots unnecessarily
- Use `next/image` where appropriate
- Keep animation loops limited

The website should remain smooth on a normal laptop and modern mobile device.

---

# 30. Content / Assets

If actual project screenshots are not available:

Create a coherent mock portfolio using placeholder assets that look like real product interfaces.

Do not use random unrelated stock images.

The screenshots should communicate:

- Finance
- Productivity
- Messaging
- Scheduling
- Mobile apps
- SaaS/product interfaces

Use consistent visual quality across all mockups.

The site should look convincing even before real portfolio assets are inserted.

---

# 31. Interaction Quality

Every major section should feel intentionally composed.

Examples:

### Hero

Scroll → screenshot composition subtly moves.

### Screens section

Cards enter from slightly different directions.

### Testimonials

Cards float around the main product visual.

### Pricing

Cards reveal themselves with subtle stagger.

### Gallery

Images respond gently to hover.

### Booking

Calendar elements feel interactive even if static.

### Footer

The marble interaction becomes the memorable final action.

---

# 32. Avoid Generic AI Website Patterns

Do NOT produce:

- Generic gradient blobs everywhere
- Huge centered text followed by three cards
- Generic SaaS navbar
- Excessive glassmorphism
- Stock photos
- Random 3D objects
- Excessive rounded cards
- Cookie-cutter testimonials
- Generic "Trusted by 10,000+ users"
- Overly saturated gradients
- Excessive animation

The reference feels designed because **visual hierarchy and composition are deliberate**.

Prioritize composition over adding more components.

---

# 33. Page Rhythm

The page should alternate between:

```text
large headline
      ↓
visual showcase
      ↓
large whitespace
      ↓
interactive/product visual
      ↓
large headline
      ↓
pricing/content
      ↓
portfolio
      ↓
human/founder section
      ↓
booking
      ↓
marble footer
```

Do not make every section the same height.

Some sections should be compact.

Some should feel enormous.

Whitespace is part of the design.

---

# 34. Important Visual Detail: The Website Should Feel "Expensive"

The reference succeeds largely because it does not try to fill every pixel.

Use:

- whitespace
- restrained borders
- subtle shadows
- high-quality mockups
- carefully controlled typography
- soft backgrounds
- intentional animation

The page should feel closer to a **premium creative studio portfolio** than a standard marketing site.

---

# 35. Final Footer Composition

The final viewport should feel almost meditative.

Recommended structure:

```text
────────────────────────────────────────────

       Play with the jar instead.
       Pick a mood, drop marbles
       till you feel something.

                 ┌─────┐
                /       \
               |  ● ●    |
               | ● ● ●   |
               | ● ● ●   |
               |_________|

       🟡 🟢 🔵 ❤️ 🟣 🟠 ⚪

             [ Drop a marble ]

             © Studio. All rights reserved.

────────────────────────────────────────────
```

The actual implementation should be more polished and visually sophisticated than this wireframe.

---

# 36. Acceptance Criteria

The implementation is complete only when:

- [ ] The entire page is responsive.
- [ ] The header matches the minimalist reference style.
- [ ] The hero contains layered/floating app mockups.
- [ ] The page uses generous whitespace.
- [ ] Pastel atmospheric gradients are used consistently.
- [ ] Multiple product showcase sections exist.
- [ ] Pricing/services are presented as premium cards.
- [ ] Portfolio/work is displayed as a visual gallery.
- [ ] Founder/about content exists.
- [ ] Social proof/testimonials exist.
- [ ] Booking/calendar section exists.
- [ ] Scroll-triggered animations are subtle and polished.
- [ ] Reduced-motion behavior is supported.
- [ ] Images are optimized.
- [ ] The page does not depend on huge animation libraries.
- [ ] The footer is not a generic footer.
- [ ] The glass jar is visually prominent.
- [ ] Multiple colored marbles exist.
- [ ] A marble can be selected.
- [ ] The selected marble receives visual feedback.
- [ ] Clicking "Drop a marble" creates a marble above the jar.
- [ ] The marble falls into the jar with convincing gravity.
- [ ] The marble bounces/settles after impact.
- [ ] Previously dropped marbles remain in the jar.
- [ ] The interaction works on touch.
- [ ] The interaction is keyboard accessible.
- [ ] The marble interaction respects reduced-motion preferences.
- [ ] No major layout shift occurs during animations.
- [ ] The final result feels like a crafted creative website rather than an AI-generated template.

---

# 37. Development Process

Build this in phases.

## Phase 1 — Foundation

Create:

- global styles
- typography
- header
- page container
- background treatment
- reusable buttons

## Phase 2 — Hero

Implement:

- headline
- supporting copy
- CTA
- screenshot composition
- entrance animation

## Phase 3 — Storytelling Sections

Implement:

- showcase sections
- floating UI cards
- pricing
- portfolio
- founder
- social proof
- booking

## Phase 4 — Marble Footer

Implement the marble interaction independently.

First get:

```text
select → click → fall → settle
```

working correctly.

Then polish:

- spring physics
- bounce
- shadows
- facial details
- hover states
- responsive positioning

## Phase 5 — Polish

Review:

- spacing
- typography
- animation timing
- mobile layout
- image loading
- accessibility
- reduced motion
- performance

---

# 38. Final Instruction

Do not stop after creating a visually similar static page.

The defining characteristic of this reference is **interaction + composition**.

The finished website should make the user want to scroll simply to discover what happens next.

Most importantly, make the final marble interaction memorable.

The user should reach the bottom of the page and think:

> "Wait, I can actually play with this."

Then they select a marble, press **Drop a marble**, and watch it physically fall into the jar.

That small interaction should be the final emotional payoff of the entire page.
