# Dream Big Drones by RLM Design System

## 0. Research Log

- Supplied visual reference: `public/dream-big-drones-hero.png`; kept as the core branded hero image while moving the overall layout toward a cleaner, lighter product-page structure.
- Supplied motion reference: `1355d6fa0abf46de71b3764b18ab4aa1.mp4`; used for a more minimal product-film style loading moment rather than the previous dark splash overlay.
- Supplied screenshot reference: `Screenshot 2026-08-03 at 5.12.30 PM.png`; extracted the key composition cues: white canvas, concise nav, oversized left copy, dominant right visual, rounded CTA buttons, and bottom support cards.
- Font research: reviewed Google Fonts specimens for [Hanken Grotesk](https://fonts.google.com/specimen/Hanken+Grotesk), [Onest](https://fonts.google.com/specimen/Onest), and [Public Sans](https://fonts.google.com/specimen/Public+Sans). Chosen direction: Hanken Grotesk, because its classic-grotesque foundation reads cleaner and more product-grade than the previous Manrope styling.
- Product context: placeholders are intentional because the user plans to send additional drone photography later. The layout needs obvious drop zones that feel designed now and easy to replace later.
- DJI runtime study (Chrome, 2026-08-03): inspected the rendered homepage at desktop, tablet, and mobile viewport overrides. Its product modules use edge-led media, 16px gutters, 576px desktop media tiles, compact 48px-top text treatment, and deliberate two-up / full-width grid spans rather than isolated floating cards. We are borrowing that layout grammar only, not DJI copy, branding, or assets.
- Image sourcing: selected three temporary, replaceable Unsplash aerial images for the portfolio placeholders. Each remains visibly labelled as a placeholder and can be swapped for original Dream Big Drones photography later.
- Official logo asset: extracted the supplied Dream Big Drones by RLM PNG into a non-destructive full wordmark (`public/dream-big-drones-logo.png`) and compact flight-path crop (`public/dream-big-drones-mark.png`). These preserve the original navy/gold artwork and are matted for use against white.

## 1. Atmosphere & Identity

An editorial aerial journal for elevated local stories. The signature is real, full-bleed photography framed by warm off-white space, charcoal type, and a restrained golden signal—less service-template UI, more considered visual publication.

## 2. Color

| Role | Token | Value | Usage |
|---|---|---:|---|
| Ink | `--ink` | `#102C46` | Primary text and structural contrast; logo navy |
| Soft ink | `--ink-soft` | `#5B6670` | Supporting copy |
| Paper | `--paper` | `#FFFFFF` | Main page background |
| Paper deep | `--paper-deep` | `#F7F4EE` | Soft panels and secondary fills |
| Gold | `--gold` | `#D99027` | Primary CTA, route line, and focus emphasis; logo gold |
| Amber | `--amber` | `#E4A645` | Hover emphasis only |
| Forest | `--forest` | `#102C46` | Dark editorial section / image scrim |

## 3. Typography

Display family: `DM Serif Display, Georgia, serif`.

Interface family: `Manrope, Avenir Next, Avenir, Helvetica Neue, Arial, sans-serif`.

Why this family:

- DM Serif Display gives the editorial headlines a calm, cinematic character without becoming ornate.
- Manrope keeps navigation, labels, forms, and body copy restrained and exceptionally legible.

Type rules:

- Hero display: `clamp(3.5rem, 6vw, 6.5rem)`, 0.92 line-height, `-0.055em` tracking; mobile caps at `3rem` and 0.96 line-height.
- Section display: `clamp(2.25rem, 4vw, 4rem)`.
- Body copy: 16–18px desktop / 16px mobile at 1.65 line-height; eyebrow labels are 11px uppercase with 0.14em tracking.
- Navigation and CTA labels are 13px and remain quiet, not over-tracked marketing chrome.

## 4. Spacing & Layout

Base unit: 8px.

Layout direction:

- Max shell width: `1280px`, with 28–40px desktop gutters.
- Hero begins 48px beneath the 64px desktop header (28px beneath the 56px mobile header), with 72–96px desktop and 48–64px mobile vertical padding.
- Editorial media grid: 16px gutters; on wide screens the gallery uses two equal feature cards followed by one full-width card, on tablet two columns with the final card spanning both columns, and on mobile a single column. This prevents a stranded narrow card and uses the full available line length.
- DJI-derived page frame: a full-width, hairline-divided header; a full-bleed hero with no rounded outer container; then 16px-gutter media modules that use the whole viewport. Explanatory copy, FAQs, and booking content remain constrained to the `1380px` reading width.
- The selected-work grid uses a 7/5 asymmetric editorial composition at desktop: one tall anchor image and two stacked supporting images; it collapses deliberately without leaving empty tracks.
- Hero uses a two-part composition on wide screens and a stacked composition on narrower screens.
- Bottom-of-hero support cards should feel like product feature blocks, not random floating badges.

## 5. Components

### Header Capsule

- Sticky 64px/56px white header with the supplied full logo at 160px/136px, fine lower divider, and compact gold CTA on the right.
- A translucent blur and shadow only appear after scroll. Navigation links use a fine gold underline state.
- Navigation is constrained to `Home`, `About`, `Services`, `Portfolio`, and `Contact`; the matching scroll section receives the active underline. Pricing is custom-quote copy inside Contact only, never a navigation destination.

### Hero Module

- Full-bleed, unrounded product stage with left copy and a right hero image stage for the branded drone artwork.
- Uses generous desktop height and deliberate edge-to-edge framing, inspired by DJI's 800px hero module, while preserving the Dream Big content and artwork.
- A new secondary action: `See more pictures`.
- Soft foreground wash at the bottom to echo the cleaner agricultural/product-page style without copying DJI branding.

### Placeholder Gallery Cards

- Presented as “Selected work,” using temporary Unsplash aerial photography until original work is available.
- The gallery begins directly with its media cards; it does not repeat an introductory heading or explanatory paragraph above them.
- Structure: semantic `article` with a full-bleed image, darkened gradient scrim, label, title, and supporting copy aligned to the lower edge.
- Variants: two half-width feature cards plus one full-width landscape card on desktop; final card spans the row at tablet; one column on mobile.
- States: default, hover (image-only transform), focus-visible when cards become links, loading, and empty/fallback.
- Accessibility: descriptive image alt text; text remains on a high-contrast scrim; images use explicit aspect ratios to avoid layout shift.
- Surface: `--radius-xl` rounded image tiles with a subtle white inner edge and restrained shadow.
- Motion: image transform only, 280ms ease-out; no decorative placeholder bars.

### Clean Service Cards

- Three short, rounded cards with direct copy.
- No overbuilt iconography or fake dashboard decoration.

### Project Standards Strip

- A three-part, border-led proof strip replacing generic value cards.
- Covers project direction, flight planning, and final handoff without inventing certifications, clients, or delivery-time claims.

### Contact Form

- Contact uses a deliberate two-column editorial composition: calm explanation and scheduling handoff on the left; a white, navy-hairline form panel with a single muted-gold flight-path line on the right.
- Form fields are square-edged, clearly labelled, and use gold focus treatment with inline red error text. The success state replaces the form in-place so the reading rhythm never jumps.
- The invisible honeypot is visually removed without taking keyboard focus. Server-side submission limiting is intentionally invisible unless it needs to explain a retry.

### Private Studio Dashboard

- The unlinked studio route uses the same white/navy/gold system, but trims the marketing motion in favour of fast, accessible data scanning.
- Desktop uses a structured table and restrained status pills; mobile deliberately changes to stacked inquiry cards rather than shrinking the table into an unreadable surface.
- The detail drawer is a white editorial sheet with no dark SaaS chrome. Its only decorative treatment is typography and navy/gold hierarchy.

### Editorial Proof Blocks

- A quiet testimonial treatment sits between selected work and services; it must never name an unverified client or invent attribution.
- A delivery-detail block names the tangible handoff: edited stills, short-form video, delivery timeline, and usage-ready files.
- Footer contact and service-area fields are visibly ready for verified business details instead of fabricating them.

### One-page Section Grammar

- Home: editorial hero with two direct actions.
- About: one wide image, editorial explanation, numbered principles, and the flight-plan timeline.
- Services: three services followed by a thin delivery-detail row and one concise custom-quote note.
- Portfolio: the large lead / two supporting image composition is the most expressive visual moment.
- Contact: a validated inquiry form plus one secondary external Calendly call-to-action, quoted as custom after the introductory call.

### Official Brand Assets

- Use `dream-big-drones-logo.png` for desktop/mobile navigation, the hero anchor, and footer.
- Use `dream-big-drones-mark.png` only for loader and mobile navigation treatment.
- Never redraw, recolor, or place the supplied raster logo against a grey or dark boxed background. The footer uses a small white logo frame for legibility.

### Cinematic Flight-Path Loader

- Desktop-only warm-white flight briefing, under 2.1 seconds, with the supplied unaltered full logo centered inside a white framed presentation card.
- Structure: a single logo-led entrance over a fine navy coordinate grid, restrained editorial flight route, short status line, and one gold progress rail. The loader must never run a preliminary animation before the branded scene; all visual elements resolve as one coordinated sequence.
- States: desktop normal journey; reduced-motion 250ms fade. It is omitted below 768px.
- Motion: SVG stroke-dashoffset draws the route and a gold trailing segment; logo-frame sheen, progress rail, and overlay exit use transform, opacity, and filter only.

## 6. Motion

- Cinematic flight-path loading moment on a warm white stage: the travel line resolves into a low horizon, then cloud-cover-like upward dissolve reveals the hero.
- Navigation and eyebrow fade up on load; the hero claim enters line-by-line with a 500–900ms upward blur-to-sharp reveal. The hero image settles from `scale(1.04)` to `scale(1)` over 1.8 seconds.
- GSAP handles scoped, intersection-driven section reveals, the reading-progress scale, a restrained gallery media parallax, and the process route-line draw. It must not animate layout properties. Below 768px, it uses only short opacity / 12–16px translateY reveals; parallax, grain drift, and large image-scale entrances are disabled.
- Gallery hover deepens the overlay, slowly scales the image, and fades project metadata up. Service cards rise 6px while a gold top-line draws across. FAQ disclosure rotates its icon and expands its answer.
- A desktop-only `View project` cursor follows only gallery pointers; touch users see no custom cursor and always retain visible project copy.
- Motion should feel cleaner and more precise than flashy: reveal, settle, breathe. Durations are 500–900ms unless the hero-settle or slow sunlight drift explicitly needs longer.
- Reduced motion remains supported: transitions become near-instant, section content stays visible, and the reading indicator renders complete.

## 7. Depth & Surface

Primary surface language:

- Warm ivory canvas (`#F4F0E8`), deep blue-charcoal ink (`#162018`), muted olive supporting text (`#5E655E`), and selective burnt ochre (`#B96E35`).
- Rounded editorial media frames, low-contrast borders, and light shadow depth
- Minimal chrome and strong image framing with muted contrast, warm highlights, rich shadows, and a restrained grain treatment

This redesign should feel more refined by subtraction, not by removing personality altogether.

## 8. Accessibility Constraints & Accepted Debt

Constraints:

- WCAG 2.2 AA contrast target
- Visible focus states
- Reduced motion fallback
- Meaningful alt text
- Touch-friendly button sizing
- Contact error and success feedback is exposed with `role="alert"` / `role="status"`; the admin table has a mobile card alternative and each status control remains label-addressable.

Accepted debt:

| Item | Location | Why accepted | Exit |
|---|---|---|---|
| Owned gallery imagery pending | Selected work gallery and hero | Temporary Unsplash aerial imagery keeps the layout editorial while the user gathers original photos | Replace each temporary source with Dream Big Drones photos when assets arrive |
| Live Calendly URL pending | Booking CTA | Calendly setup is not yet supplied | Swap placeholder CTA target with the final booking URL |
| First admin credential provisioning | Convex Auth password provider | A strong unique password must be selected by the owner; no default can be safely generated or committed | Run `npm run admin:hash`, set the resulting hash as `ADMIN_PASSWORD_HASH` on Convex, then create the single allowed admin account |

## 9. August 2026 rebuild contract

### Reference fidelity and direction

- The supplied browser screenshot is the structural reference: a legible brand header, cinematic hero, editorial media stage, solution cards, and a utilitarian contact/footer ending. It is not a visual style to copy; the new surface replaces its dated cards and cramped proportions with a spacious navy, sand, and copper editorial system.
- The supplied original `dream-big-drones-hero.png` is the official hero/logo artwork. It is never recolored, stretched, cropped, or replaced with an invented drone mark. `dream-big-drones-logo.png` remains the clean wordmark treatment for navigation and footer surfaces.
- Signature moment: a single logo-led launch brief. It paints as one complete scene from the first frame, then fades away; no preliminary logo flash, competing animation, or second loader is permitted.
- August 2026 visual correction: `dream-big-drones-hero.png` is a complete illustrated brand scene (drone, destination bubbles, stonework sign, sky, and park), not just a wordmark. The global tone now takes its cues from that scene: sky blue, deep blue-green, leaf green, weathered limestone, warm copper, and the logo's jewel-like cyan/red/gold details. The homepage hero is always full-bleed art with an accessible navy gradient for copy—never a split stock-photo panel with the artwork reduced to a floating card.
- The loader begins with the official brand artwork at full stage scale, has one brief focus/settle motion, and dissolves directly into the matching homepage hero. It does not introduce a disconnected card or secondary logo treatment.
- Route hierarchy correction: only Home uses the full-viewport illustrated brand hero. Inner routes use compact, individually art-directed mastheads with their own content image, information density, and task-oriented headline. This preserves the homepage as the signature moment and makes route changes feel intentional.
- Motion correction: section content enters only when it becomes relevant in the viewport; cards stagger in as a related group, images settle from a subtle scale, and interactive panels transition only when their state changes. Every sequence uses opacity, transform, and filter; reduced-motion users receive fully visible static content.

### Route grammar

- Public routes: `/`, `/solutions`, `/fleet`, `/portfolio`, `/support`, `/about`, and `/contact`. All share the same header, flight-strip, floating quote CTA, and footer.
- The header uses the screenshot's requested seven navigation destinations and a compact mobile disclosure. Route changes retain keyboard focus on the document main landmark.
- Page modules use only documented `--dbd-*` tokens. Reusable primitives: `SiteHeader`, `PageHero`, `Action`, `SolutionCard`, `AircraftCard`, `PortfolioGallery`, `Modal`, `FaqList`, `IntakeForm`, and `SiteFooter`.

### Accessibility and inclusive tasks

- A keyboard-only visitor can open every menu, filter the gallery, open/close a project dialog, expand fleet details and FAQ items, and submit or recover from the intake form.
- A motion-sensitive visitor sees the entire loader as a short static fade and never receives auto-playing decorative motion.
- A busy project manager receives a progressive-disclosure intake form with clear labels, non-color validation, explicit required status, live counters, and an in-place completion state.

### Current accepted debt

| Item | Affected users | Resolution path |
|---|---|---|
| Placeholder imagery is hosted by Unsplash | Visitors with offline/slow connections | Replace with supplied, responsive client photography once available. Fallback color treatments remain in place. |
| Mail/delivery endpoint requires Convex deployment configuration | Prospective clients | The built form submits to the existing Convex integration when configured; the UI communicates retry rather than pretending delivery succeeded. |
