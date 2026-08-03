# Dream Big Drones by RLM Design System

## 0. Research Log

- Live reference: reviewed Dribbble's drone landing page collection and the Flight concept in Chrome; harvested its image-led hero, dark technical canvas, clear service path, and concise conversion treatment without copying its visuals or copy.
- Supplied visual reference: `public/dream-big-drones-hero.png`; extracted a luminous blue, coral, gold, and garden-green palette and a dream-to-flight narrative.
- Supplied motion reference: `1355d6fa0abf46de71b3764b18ab4aa1.mp4`; reviewed clean product-film composition, large single-object imagery, green accent, capability rows, and FAQ disclosure. Adapted the grammar for Dream Big Drones without reusing DJI identity, copy, or claims.
- Embedded references: the available design reference library did not contain the prescribed Layer A/Layer B files, so the brand register and supplied art act as the source of truth.
- Skipped lanes: Imagen drafts and lazyweb research were not needed because the approved supplied image is the hero art direction and a live inspiration site was reviewed.

## 1. Atmosphere & Identity

A product-film for ambitious ideas: image-first, direct, and composed. The signature is the **full-bleed flight frame**—the supplied Dream Big artwork is allowed to fill the arrival moment, while calm, high-contrast copy and a low-profile capability strip retain clarity.

## 2. Color

| Role | Token | Value | Usage |
|---|---|---:|---|
| Night | `--ink` | `oklch(20% 0.03 240)` | Main canvas and dark panels |
| Sky | `--sky` | `oklch(70% 0.12 235)` | Supporting surfaces and links |
| Cloud | `--cloud` | `oklch(97% 0.01 230)` | Light sections and primary text |
| Teal | `--teal` | `oklch(72% 0.13 190)` | Focus treatment and service markers |
| Coral | `--coral` | `oklch(68% 0.16 34)` | Primary action and warmth |
| Gold | `--gold` | `oklch(80% 0.16 80)` | Featured details and star points |
| Mist | `--mist` | `oklch(70% 0.025 235)` | Secondary text |

Rules: coral is reserved for the main conversion path; teal signals navigation and links; gold is used sparingly to echo the supplied artwork.

## 3. Typography

| Level | Size | Weight | Line-height | Usage |
|---|---:|---:|---:|---|
| Display | `clamp(3rem, 7vw, 6rem)` | 700 | 0.96 | Hero statement |
| H1 | `clamp(2.25rem, 4vw, 4rem)` | 700 | 1.02 | Major section title |
| H2 | `clamp(1.5rem, 2.4vw, 2.5rem)` | 700 | 1.12 | Service and CTA titles |
| Body large | `1.125rem` | 400 | 1.6 | Leads |
| Body | `1rem` | 400 | 1.6 | Supporting text |
| Label | `0.75rem` | 700 | 1.3 | Navigation and metadata |

Font stack: `Manrope, Avenir Next, Avenir, Helvetica Neue, Arial, sans-serif`. Display uses the same family at a weight/scale contrast; no secondary family is necessary.

## 4. Spacing & Layout

Base unit: 4px. Use spacing steps `--space-2` (8px), `--space-3` (12px), `--space-4` (16px), `--space-6` (24px), `--space-8` (32px), `--space-12` (48px), `--space-16` (64px), `--space-20` (80px), and `--space-28` (112px). Content max width: 1200px. Mobile gutter: 20px; desktop gutter: 40px. Grid shifts from one column below 720px to 12-column composition above it.

## 5. Components

### Flight Button
- Structure: accessible anchor or button with optional Lucide arrow icon.
- Variants: coral primary, transparent light secondary, compact nav.
- States: hover lifts 2px, active returns to baseline, high-contrast teal focus ring, disabled lowers opacity.
- Motion: 180ms transform and color transition; no motion when reduced motion is requested.

### Service Route
- Structure: number, title, concise outcome, and arrow link.
- Layout: ruled editorial list rather than repeated cards; stacks to a readable single column.
- Accessibility: action has a service-specific accessible name.

### Booking Panel
- Structure: an expectation-setting message, a direct schedule CTA, and a clear custom-pricing note.
- States: CTA follows Flight Button behavior.

### FAQ Disclosure
- Structure: native button, question, directional chevron, and an answer revealed on selection.
- States: one open answer initially; selected chevron rotates; every control has an `aria-expanded` state.

## 6. Motion & Interaction

Use 180ms for micro-interactions and 700ms cubic-bezier(0.16, 1, 0.3, 1) for initial hero choreography. A 1.2-second entry loader gives the initial visual a purposeful reveal; it animates only transform and opacity and disappears immediately when reduced motion is requested. `prefers-reduced-motion` removes nonessential movement.

## 7. Depth & Surface

Strategy: mixed. Dark tonal shifts create main hierarchy. Fine translucent borders define interactive or information-rich areas; broad, soft shadows are reserved for the hero image frame.

## 8. Accessibility Constraints & Accepted Debt

Constraints: WCAG 2.2 AA target; 4.5:1 body-text contrast; visible focus; keyboard-reachable links; reduced motion; all images receive alt text.

| Item | Location | Why accepted | Owner / Exit |
|---|---|---|---|
| Direct booking URL is not supplied | Booking CTA | Calendly can only be linked once the account/event link exists | Replace `#calendly-setup` with the live Calendly event URL |
| Portfolio photography is pending | Work section | Use a transparent, clearly labelled placeholder rather than stock imagery | Replace the placeholders when user supplies drone photography |
