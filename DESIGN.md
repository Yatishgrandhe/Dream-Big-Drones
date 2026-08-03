# Dream Big Drones by RLM Design System

## 0. Research Log

- Live reference: reviewed Dribbble's drone landing page collection Flight concept in Chrome; harvested an image-led hero, dark technical canvas, clear service path, and concise conversion treatment without copying visuals or copy.
- Supplied visual reference: `public/dream-big-drones-hero.png`; extracted luminous blue, coral, gold, and garden-green cues from the dream-to-flight narrative.
- Supplied motion reference: `1355d6fa0abf46de71b3764b18ab4aa1.mp4`; reviewed clean product-film composition, large single-object imagery, capability rows, and compact FAQ disclosure. Adapted the visual grammar for Dream Big Drones without reusing DJI identity, copy, or claims.
- Official motion research: reviewed Motion for React docs for `motion/react`, enter animation, transform animation, and `useReducedMotion`; reviewed GSAP React and ScrollTrigger docs for `@gsap/react`, scoped cleanup, and responsive scroll choreography.
- Embedded references: the supplied artwork and approved video reference provided the strongest direction, so no extra brand-system reference was used for this animation pass.
- Skipped lanes: Imagen drafts and lazyweb research were not needed because the supplied artwork already defined the hero atmosphere.

## 1. Atmosphere & Identity

Product-film ambitious ideas: image-first, direct, composed. The signature move is a full-bleed flight frame led by the supplied Dream Big artwork, while calm high-contrast copy and a low-profile capability strip retain clarity.

## 2. Color

| Role | Token | Value | Usage |
|---|---|---:|---|
| Night | `--ink` | `oklch(20% 0.03 240)` | Main canvas and dark panels |
| Sky | `--sky` | `oklch(70% 0.12 235)` | Supporting surfaces and links |
| Cloud | `--cloud` | `oklch(97% 0.01 230)` | Light sections and panel backgrounds |
| Coral | `--coral` | `oklch(68% 0.16 33)` | Primary action moments |
| Gold | `--gold` | `oklch(80% 0.15 82)` | Hero emphasis and warm highlights |

## 3. Typography

| Level | Size | Weight | Line-height | Usage |
|---|---:|---:|---:|---|
| Display | `clamp(3rem, 7vw, 6rem)` | 700 | 0.96 | Hero statement |
| H1 | `clamp(2.25rem, 4vw, 4rem)` | 700 | 1.02 | Major section title |
| H2 | `clamp(1.5rem, 2.4vw, 2.5rem)` | 700 | 1.12 | Service and CTA titles |
| Body large | `1.125rem` | 400 | 1.6 | Leads |
| Body | `1rem` | 400 | 1.6 | Supporting text |
| Label | `0.75rem` | 700 | 1.3 | Navigation and metadata |

Font stack: `Manrope, Avenir Next, Avenir, Helvetica Neue, Arial, sans-serif`. Display uses the same family with weight and scale contrast rather than a second family.

## 4. Spacing & Layout

Base unit: 4px. Use spacing steps `--space-2` (8px), `--space-3` (12px), `--space-4` (16px), `--space-6` (24px), `--space-8` (32px), `--space-12` (48px), `--space-16` (64px), `--space-20` (80px), and `--space-28` (112px). Content max width: 1200px. Mobile gutter: 20px; desktop gutter: 40px. Grid shifts from one column below 720px to a wider marketing composition above it.

## 5. Components

### Flight Button

- Structure: accessible anchor button with optional Lucide arrow icon.
- Variants: coral primary, transparent light secondary, compact nav.
- States: hover lifts slightly, active returns to baseline, focus remains high contrast, disabled lowers opacity.
- Motion: Motion for React handles hover and tap feedback; movement should feel crisp and short rather than springy.

### Capability Strip

- Structure: four compact benefit tiles immediately below the hero.
- Layout: horizontal on desktop, two-column stack on mobile.
- Motion: each tile can rise subtly on hover and reveal in sequence after the hero.

### Service Route

- Structure: number, title, concise outcome, arrow link.
- Layout: ruled editorial list rather than repeated boxed cards.
- Motion: rows reveal from below on scroll and shift slightly on hover.

### FAQ Disclosure

- Structure: direct question button followed by a collapsible answer panel.
- Motion: answer expansion should feel smooth and controlled, paired with a rotating disclosure icon.

## 6. Motion

- Split responsibilities by job: Motion for React handles entry sequences, disclosure, and hover/tap interactions; GSAP handles section reveals, atmospheric drift, and desktop scroll-linked depth.
- Hero motion should suggest lift and atmosphere, not gimmicks. Background depth can move more than the copy, while the copy remains legible and grounded.
- Section reveals should settle into place with transform, opacity, and gentle blur reduction instead of dramatic fly-ins.
- Motion stays on transform, opacity, and filter. No layout-property animation.
- `prefers-reduced-motion` removes parallax-like movement and swaps in calmer opacity-first transitions.

## 7. Depth & Surface

Mixed strategy. Dark tonal shifts create the main hierarchy. Fine translucent borders define interactive or information-rich areas; broader softer shadows are reserved for the hero image frame and key media surfaces.

## 8. Accessibility Constraints & Accepted Debt

Constraints: WCAG 2.2 AA target, 4.5:1 body-text contrast, visible focus, keyboard-reachable links, reduced-motion support, and meaningful alt text on all images.

| Item | Location | Why accepted | Owner / Exit |
|---|---|---|---|
| Direct booking URL not supplied | Booking CTA | Calendly can only be linked once an account and event URL exist | Replace `#calendly-setup` with the live Calendly event URL |
| Portfolio photography is pending | Work section | Brand artwork is carrying the visual load until real drone photography arrives | Replace the repeated brand-art media treatment when portfolio assets are supplied |
