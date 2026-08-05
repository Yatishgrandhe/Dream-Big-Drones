# Dream Big Drones — Nesh Design System

## 1. Atmosphere & Identity

The supplied Nesh export is the visual contract: bold editorial type, generous asymmetric space, rounded image stages, and deliberate, slow-moving transitions. Dream Big Drones changes the story and assets only. Its signature moment is the approved drone mark moving through the same oversized, high-contrast editorial frame.

## 2. Color

| Role | Token | Value | Usage |
|---|---|---:|---|
| Canvas | `--rd-paper` | `#eef4f2` | Cloud-blue field sampled from the logo artwork |
| Ink | `--rd-ink` | `#102f43` | Deep drone-body navy sampled from the logo |
| Signal | `--rd-signal` | `#d98a16` | Warm gold from the Dream Big Drones lettering and stars |
| Accent | `--rd-accent` | `#178cc4` | Sky blue from the logo clouds and lettering |
| Night | `--rd-night` | `#0b2436` | Dark navy portfolio and footer stage |
| Cloud | `--rd-cloud` | `#ffffff` | Form and card surfaces |
| Error | `--rd-error` | `#b42020` | Form errors |

## 3. Typography

- Display and interface: the Nesh export’s bundled `Tra` family, with Arial fallback.
- Display: `clamp(3rem, 8vw, 8.75rem)`, 0.88 line-height, tight tracking.
- Section headings: `clamp(2.25rem, 4.7vw, 5.4rem)`.
- Body: `clamp(1rem, 1.35vw, 1.25rem)`, 1.45 line-height.
- Labels and controls: 12–14px, uppercase, 0.08em tracking.

## 4. Spacing & Layout

Base unit: 8px. Content gutters use `clamp(20px, 4vw, 64px)`; page moments use `clamp(96px, 15vw, 240px)` vertically. The Nesh asymmetric desktop composition collapses to one readable column at 767px.

## 5. Components

### Nesh Navigation
- Structure: fixed top navigation that FLIPs into a compact vertical left-side navigation after the hero is crossed; mobile keeps the disclosure panel.
- States: top, side, hover signal underline, active route, focus-visible outline, open/closed mobile panel.
- Side-rail layout: at desktop widths, the side state reserves a 252px left rail and the document reflows to its right; tablet and mobile retain the top/disclosure navigation.
- Accessibility: semantic navigation, `aria-expanded`, Escape close, 44px mobile target.

### Editorial Action
- Structure: text link inside a rounded Nesh-style pill.
- States: default, signal hover, focus, disabled for form submission.
- Motion: transform/color feedback only.

### Drone Work Card
- Structure: cropped media, number, label, title, direct service detail.
- States: dark overlay default, image settle/scale hover, visible keyboard focus.

### Editorial Route Masthead
- Structure: an asymmetric text column paired with one uninterrupted media stage; the media keeps a rounded inner edge on desktop and an inset rounded frame below the copy on tablet and mobile.
- States: masked heading and media reveal on route entry; the media remains static and fully visible under reduced motion.
- Responsive: text first below 1000px, with the media framed by the same content gutter so it never reads as a disconnected full-bleed strip.

### Flight Canvas
- Structure: one decorative, behind-content WebGL canvas with a companion static image/fallback field.
- States: active only while visible; paused while offscreen; static under reduced motion.
- Accessibility: `aria-hidden="true"`; it never contains information or intercepts a pointer target.
- Motion: the canvas draws a low-cost moving route and atmospheric points; all document choreography remains GSAP transform/opacity based.

### Inquiry Form
- Structure: labelled two-column fields, consent, hidden honeypot, status region.
- States: default, invalid, loading, success, server error.
- Accessibility: explicit labels, error `aria-describedby`, `role=status` / `role=alert`.

## 6. Motion & Interaction

Nesh’s slow, controlled pacing is preserved: 160ms feedback, 600–900ms section entrances, 900–1200ms hero entrance, `power3.out` / `power4.out`. The restored choreography uses masked type reveals, alternating crop reveals, card FLIP ordering, directional route drawing, controlled page travel, and the navigation’s top-to-side FLIP. Motion uses opacity, transforms, filter, and clip-path only. Mobile keeps the full narrative with shorter (not removed) 400–560ms reveals; reduced-motion visitors receive visible static content.

## 7. Depth & Surface

Mixed strategy: high-contrast flat fields provide the Nesh foundation; drone media uses a dark gradient scrim, thin white edge, rounded framing, and a restrained shadow. Avoid new glass, gradients, or stock card language.

## 8. Accessibility Constraints & Accepted Debt

- WCAG 2.2 AA contrast target, visible focus, keyboard-reachable controls, touch-safe controls, and reduced-motion support.
- The source project’s curated Unsplash aerial media is restored locally in `public/assets/gallery/` with explicit dimensions and lazy loading; replace it with owned project media when it becomes available.
