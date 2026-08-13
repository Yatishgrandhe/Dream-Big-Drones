# Dream Big Drones by RLM Design System

## 0. Research Log

- Supplied visual reference: `public/dream-big-drones-hero.png`; kept as the core branded hero image while moving the overall layout toward a cleaner, lighter product-page structure.
- Supplied motion reference: `1355d6fa0abf46de71b3764b18ab4aa1.mp4`; used for a more minimal product-film style loading moment rather than the previous dark splash overlay.
- Supplied screenshot reference: `Screenshot 2026-08-03 at 5.12.30 PM.png`; extracted the key composition cues: white canvas, concise nav, oversized left copy, dominant right visual, rounded CTA buttons, and bottom support cards.
- Font research: reviewed Google Fonts specimens for [Hanken Grotesk](https://fonts.google.com/specimen/Hanken+Grotesk), [Onest](https://fonts.google.com/specimen/Onest), and [Public Sans](https://fonts.google.com/specimen/Public+Sans). Chosen direction: Hanken Grotesk, because its classic-grotesque foundation reads cleaner and more product-grade than the previous Manrope styling.
- Product context: placeholders are intentional because the user plans to send additional drone photography later. The layout needs obvious drop zones that feel designed now and easy to replace later.
- DJI runtime study (Chrome, 2026-08-03): inspected the rendered homepage at desktop, tablet, and mobile viewport overrides. Its product modules use edge-led media, 16px gutters, 576px desktop media tiles, compact 48px-top text treatment, and deliberate two-up / full-width grid spans rather than isolated floating cards. We are borrowing that layout grammar only, not DJI copy, branding, or assets.
- Image sourcing: selected three temporary, replaceable Unsplash aerial images for the portfolio placeholders. Each remains visibly labelled as a placeholder and can be swapped for original Dream Big Drones photography later.
- Official logo asset: use the supplied `public/dream-big-drones-nav-logo.png` unchanged for all rendered logo placements.

## 1. Atmosphere & Identity

An editorial aerial journal for elevated local stories. The signature is real, full-bleed photography framed by warm off-white space, charcoal type, and a restrained golden signal, less service-template UI and more considered visual publication.

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
- Navigation is constrained to `Home`, `About Us`, `Services`, `Portfolio`, and `Contact`; the matching route receives the active underline. Portfolio holds all drone-photo collections; fleet and support remain reachable only from contextual page links, not the primary menu. Pricing is custom-quote copy inside Contact only, never a navigation destination.

### Hero Module

- The homepage protects the supplied brand artwork as a clear, full-width top stage. No headline, call-to-action, scrim, or decorative overlay may cover the sign or drone artwork.
- A white information band beneath the artwork carries the headline, supporting copy, and two actions. This follows the supplied reference's visual rhythm while keeping the official mark legible as a standalone image.
- On desktop the title, short explanation, and actions use a three-part horizontal composition. On tablet the actions move to a second row; on mobile all content stacks below the artwork with a light copper divider.
- The desktop claim resolves as two deliberate lines: `Global vision.` then `Grounded results.`. The image remains immediately visible above it rather than competing with the copy.

### Masthead Image Route

- Inner-route mastheads use a single right-hand image stage with a white-to-copper flight path. On desktop, DrawSVG draws the route before opening the image from the left; the waypoint markers then settle along the finished route.
- The image itself is always in the document and fully visible for mobile and reduced-motion visitors. The route is supporting context, not a control or a source of essential information.

### Placeholder Gallery Cards

- Presented as “Selected work,” using temporary Unsplash aerial photography until original work is available.
- The gallery begins directly with its media cards; it does not repeat an introductory heading or explanatory paragraph above them.
- Structure: semantic `article` with a full-bleed image, darkened gradient scrim, label, title, and supporting copy aligned to the lower edge.
- Variants: two half-width feature cards plus one full-width landscape card on desktop; final card spans the row at tablet; one column on mobile.
- States: default, hover (image-only transform), focus-visible when cards become links, loading, and empty/fallback.
- Accessibility: descriptive image alt text; text remains on a high-contrast scrim; images use explicit aspect ratios to avoid layout shift.
- Surface: `--radius-xl` rounded image tiles with a subtle white inner edge and restrained shadow.
- Motion: image transform only, 280ms ease-out; no decorative placeholder bars.

### Portfolio Image Route

- Portfolio keeps its masthead image static. Its flight route is a dedicated vertical scroll scene immediately below the masthead, where three copper waypoints reveal three alternating project-image stages in sequence.
- Desktop uses DrawSVG plus ScrollTrigger to tie line progress, waypoint arrival, and image appearance to the visitor’s scroll position. Mobile and reduced-motion visitors receive the same three images as a readable static stack.

### Clean Service Cards

- The homepage uses an asymmetric lead-card composition: one tall first service beside two supporting services. Service context is sentence-case supporting copy, not a repeated uppercase eyebrow.
- Inner service lists retain compact cards with direct copy and no overbuilt iconography or fake dashboard decoration.

### Interaction Refinement

- Primary actions, filters, and text controls share a concise press response (`scale(0.97)`) and strong gold focus outline. Hover motion remains desktop-pointer only.
- Decorative flight-route labels are reserved for functional navigation only. Page sections no longer use route numbering or image-overlay labels as filler.

### Project Standards Strip

- A three-part, border-led proof strip replacing generic value cards.
- Covers project direction, flight planning, and final handoff without inventing certifications, clients, or delivery-time claims.

### Contact Form

- Contact uses a deliberate two-column editorial composition: calm explanation and scheduling handoff on the left; a white, navy-hairline form panel with a single muted-gold flight-path line on the right.
- Form fields are square-edged, clearly labelled, and use gold focus treatment with inline red error text. The success state replaces the form in-place so the reading rhythm never jumps.
- The invisible honeypot is visually removed without taking keyboard focus. Server-side submission limiting is intentionally invisible unless it needs to explain a retry.
- The Contact intake always renders on a direct `/contact` document load. Desktop animation may enhance the section after it is available, but no animation wrapper may control whether the form is visible.

### Private Studio Dashboard

- The unlinked studio route uses the same white/navy/gold system, but trims the marketing motion in favour of fast, accessible data scanning.
- Desktop uses a structured table and restrained status pills; mobile deliberately changes to stacked inquiry cards rather than shrinking the table into an unreadable surface.
- The detail drawer is a white editorial sheet with no dark SaaS chrome. Its only decorative treatment is typography and navy/gold hierarchy.
- Login, search, and status-filter inputs use clear white bounded surfaces with a navy border; focus strengthens the boundary with a restrained gold ring so fields remain easy to scan and operate.

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

### About narrative extension

- The About masthead remains free of decorative route numerals so the company point of view leads. Its body follows the owner-defined sequence: About Us; Professional Background, Licenses & Certifications; Technology & Innovation; What We Bring to Your Project; Our Core Values; Our Process, From Your Vision to the View Above; then Ready to Get Started? with the project-brief conversion.
- The owner-approved About hierarchy removes the redundant oversized display headlines from the masthead, introduction, credentials, technology, and project-value blocks. Their orange or copper labels become the visible headings, with a stronger weight and a modestly larger scale; the semantic page heading remains available to assistive technology.
- Credentials and technology use a semantically structured, high-contrast list; the core values are an editorial card grid that becomes a single reading column on mobile. No emojis serve as icons or meaning-bearing controls.
- Core-value cards carry distinct Lucide line icons inside a restrained copper-ring treatment. The icons reinforce the value headings for respect, inclusion, fair pricing, safety, integrity, detail, and purposeful innovation without becoming decorative emoji substitutes.
- The seven-card core-values collection never exposes an accidental empty grid remainder: the final innovation card spans the last desktop row in a deliberate icon / heading / supporting-copy arrangement, then reverts to the standard reading card on small screens.

### Connected Process Route

- The About process is one image-backed planning journey, not a stack of generic feature cards: a concise heading and purpose statement lead into five numbered stages connected by a single copper dashed flight route.
- Every stage pairs a Lucide line icon with the owner-approved title and explanation. A small real-image strip anchors the stages in the fieldwork they represent; images are cropped as consistent, bordered editorial frames and remain decorative support rather than a replacement for the written steps.
- On desktop the route reads left-to-right across five equal stages; at tablet it becomes a two-column grid without relying on the decorative line; at mobile it becomes one clear reading column with the route omitted. Reduced-motion users receive the fully readable static arrangement.
- The closing conversion is a dark navy callout within the same visual stage. It uses the existing `Action` primitive and the exact `Get a quote` label, routing to the Contact intake rather than creating a second form.

### Official Brand Assets

- Use `dream-big-drones-nav-logo.png` for every rendered logo treatment: desktop/mobile navigation, footer, administration screens, and browser icons.
- `dream-big-drones-hero.png` remains the homepage illustration and loader artwork; it is not a substitute for the official logo.
- Never redraw, recolor, crop, or replace the supplied raster logo. The footer presents it directly against the navy surface without a substitute wordmark.

### Cinematic Flight-Path Loader

- Desktop-only warm-white flight briefing, under 2.1 seconds, with the supplied unaltered hero artwork centered inside a navy-hairline presentation frame.
- Structure: one artwork-led entrance over a fine navy coordinate grid, restrained editorial flight route, short status line, and one gold progress rail. The loader must never run a preliminary animation before the branded scene; all visual elements resolve as one coordinated sequence.
- States: desktop normal journey; reduced-motion 250ms fade. It is omitted below 768px.
- Motion: SVG stroke-dashoffset draws the route and a gold trailing segment; logo-frame sheen, progress rail, and overlay exit use transform, opacity, and filter only.

## 6. Motion

### Navigation control

- The mobile navigation reveals as one contained flight-deck panel: its surface settles first over 780ms, followed by 80ms-spaced links and the quote action last. The header remains above the panel so the close control is always visible.
- While the panel is open, document scrolling is locked. Escape closes the panel and returns keyboard focus to the trigger; selecting any route closes it before the page-travel overlay begins.
- Reduced-motion users receive the same complete navigation state without staged movement.

- Cinematic flight-path loading moment on a warm white stage: the travel line resolves into a low horizon, then cloud-cover-like upward dissolve reveals the hero.
- Navigation and eyebrow fade up on load; the hero claim enters line-by-line with a 500–900ms upward blur-to-sharp reveal. The hero image settles from `scale(1.04)` to `scale(1)` over 1.8 seconds.
- GSAP handles scoped, intersection-driven section reveals, the reading-progress scale, a restrained gallery media parallax, and the process route-line draw. It must not animate layout properties. Below 768px, it uses only short opacity / 12–16px translateY reveals; parallax, grain drift, and large image-scale entrances are disabled.
- Gallery hover deepens the overlay, slowly scales the image, and fades project metadata up. Service cards rise 6px while a gold top-line draws across. FAQ disclosure rotates its icon and expands its answer.
- A desktop-only `View project` cursor follows only gallery pointers; touch users see no custom cursor and always retain visible project copy.
- Motion should feel cleaner and more precise than flashy: reveal, settle, breathe. Durations are 500–900ms unless the hero-settle or slow sunlight drift explicitly needs longer.
- Reduced motion remains supported: transitions become near-instant, section content stays visible, and the reading indicator renders complete.

### Desktop editorial motion layer

- Desktop motion is loaded only after a `min-width: 1024px` media query passes and is kept in a GSAP/ScrollTrigger chunk. Lenis uses a responsive 0.72-second ease-out-cubic desktop profile: it settles smoothly but immediately responds to a fast wheel gesture. Mobile and reduced-motion visitors never request the complex controller.
- Motion tokens: feedback `120–180ms`; controls `180–260ms`; small reveals `350–550ms`; section scenes `600–850ms`; hero scenes `900–1200ms`; primary easing uses `power3.out` / `power3.inOut`, with `power4.out` reserved for the hero and masked editorial headings.
- The visual grammar borrows only interaction principles from the supplied NESH reference: masked headings, changing directional entrances, oversized route indices, image stages that reveal through a crop, and a single continuous navigation flight. It does not reuse reference assets, markup, copy, or source.
- Each route has one story-specific moment: shuttered solution rows, technical fleet scans, FLIP portfolio filtering, a support process line, connected About principles, and restrained grouped Contact intake. Repeated generic fade-ups are prohibited.
- The desktop scenes must read as a deliberate moment at normal scroll speed: Home gets an oversized launch-scale editorial reveal; Solutions uses alternating camera shutters; Fleet exposes a scanning specification sequence; Portfolio uses a filter-led FLIP choreography; Support carries a calm line through its FAQ; About resolves principles into a route; Contact concentrates attention into a staged intake approach.
- Original flight-control SVG primitives, including launch grids, survey rings, route traces, telemetry pulses, and card-level scan and route markers, provide the site’s technical detail. They are composed in brand navy, sky-cyan, and copper and are decorative only; no third-party artwork or source is reused.
- Home now has a richer staged journey: the protected artwork remains visible from first paint and settles from a subtle scale, its information band enters in three beats (claim, project context, actions), the artwork has a restrained scroll parallax inside its own clipped stage, the showcase image opens from a centered crop, and the proof strip rises as one related group. These moments use only transform, opacity, and clip-path, and are desktop-only; reduced-motion and smaller screens render the same content without staged movement.

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
| First admin credential provisioning | Supabase Auth password provider | A strong unique password must be selected by the owner; no default can be safely generated or committed | Create the single owner account from the private setup route, then sign in through the private studio route |

## 9. August 2026 rebuild contract

### Reference fidelity and direction

- The supplied browser screenshot is the structural reference: a legible brand header, cinematic hero, editorial media stage, solution cards, and a utilitarian contact/footer ending. It is not a visual style to copy; the new surface replaces its dated cards and cramped proportions with a spacious navy, sand, and copper editorial system.
- The supplied original `dream-big-drones-hero.png` is the official homepage illustration. It is never recolored, stretched, cropped, or replaced with an invented drone scene. `dream-big-drones-nav-logo.png` is the confirmed logo treatment for navigation and footer surfaces.
- Signature moment: a single logo-led launch brief. It paints as one complete scene from the first frame, then fades away; no preliminary logo flash, competing animation, or second loader is permitted.
- August 2026 visual correction: `dream-big-drones-hero.png` is a complete illustrated brand scene (drone, destination bubbles, stonework sign, sky, and park), not just a wordmark. The global tone now takes its cues from that scene: sky blue, deep blue-green, leaf green, weathered limestone, warm copper, and the logo's jewel-like cyan/red/gold details. The homepage hero is always full-bleed art with an accessible navy gradient for copy, never a split stock-photo panel with the artwork reduced to a floating card.
- The loader begins with the official brand artwork at full stage scale, has one brief focus/settle motion, and dissolves directly into the matching homepage hero. It does not introduce a disconnected card or secondary logo treatment.
- Route hierarchy correction: only Home uses the full-viewport illustrated brand hero. Inner routes use compact, individually art-directed mastheads with their own content image, information density, and task-oriented headline. This preserves the homepage as the signature moment and makes route changes feel intentional.
- Motion correction: section content enters only when it becomes relevant in the viewport; cards stagger in as a related group, images settle from a subtle scale, and interactive panels transition only when their state changes. Every sequence uses opacity, transform, and filter; reduced-motion users receive fully visible static content.
- Brand asset correction: the navigation, footer, administration screens, and browser-tab icon use `dream-big-drones-nav-logo.png`, the owner-confirmed official logo artwork. It stays contained at its native proportion.
- Motion system upgrade: GSAP + ScrollTrigger owns page travel, image parallax, route-line drawing, and footer landing. Navigation uses a navy flight overlay with the current Dream Big Drones logo as its central altitude-change object; it is bypassed under reduced motion. Motion duration stays between 0.45–0.9s and only transforms, opacity, filter, and clip-path are animated.

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
| Mail/delivery endpoint requires Google Sheets web app configuration | Prospective clients | The built form already stores inquiries and emails the owner; Sheet synchronization begins after its protected Apps Script web app URL is configured. | Add `GOOGLE_SHEETS_WEBHOOK_URL` and `GOOGLE_SHEETS_WEBHOOK_SECRET` in Vercel, then redeploy. |

## 10. Homepage reference refresh, August 11, 2026

### Visual contract

- Hero sequence correction, August 13, 2026: the original supplied `dream-big-drones-hero.png` is an artwork-only first viewport with no overlaid text, controls, or shade. Its message and all next-step actions move into the immediately following compact ivory editorial introduction; no stock ocean media or empty media column remains there.
- The supplied `1000050562.png`, `1000050563.png`, and `1000050564.png` screenshots are the homepage composition contract. They replace the prior illustrated-homepage requirement only; navigation, footer, inner routes, and existing form behavior remain unchanged.
- The page begins with a warm ivory, wide editorial hero. On desktop, the two-line serif promise occupies the left third, a thin vertical divider separates the explanatory copy, and a full-width aerial image recedes from the lower right. The text remains on a calm ivory field instead of sitting over the imagery.
- Hero headline: `Your Vision.` in navy and `Captured from Above.` in copper. Supporting copy and controls sit to the right of the divider. Controls are a filled navy `View our work` action and a quiet outlined `Explore services` action.
- The service section begins immediately after the hero. Its copper eyebrow, compact navy display heading, and two-by-two image-led cards follow the supplied reference. Each card uses an actual Lucide line icon, a 16:10 cropped image, concise service title, and a short, readable description.
- The proof strip is exactly three equal, navy panels. Each panel includes a copper number, a serif title, a short description, and a copper Lucide icon that is decorative and hidden from assistive technology. No emoji icons are used.
- The closing conversion returns to warm ivory with a wide two-column layout: large navy serif heading and supporting copy left, one compact navy pill action right.

### Tokens and responsive behavior

- Homepage layout tokens: `--dbd-home-max: 1880px`, `--dbd-home-gutter: clamp(24px, 4.5vw, 92px)`, `--dbd-home-section: clamp(72px, 8vw, 136px)`, and `--dbd-home-card-radius: 14px`.
- Desktop is designed from the 2170px-wide reference. At 1280px, the hero maintains its text, divider, and controls in a three-column layout. At 768px, the hero and closeout stack cleanly while services remain two columns. At 375px, all modules become one reading column, cards retain their full image-to-copy hierarchy, and controls are full-width touch targets.
- Hero and service imagery are temporary stock placeholders pending owner photography. Each image has an explicit aspect ratio and descriptive alt text when it conveys content; decorative proof-strip icons are `aria-hidden`.

### Homepage primitives and states

- `HomeReferenceHero`: default, keyboard-focus-visible CTA state, reduced-motion static state.
- `HomeServiceCard`: default, hover media lift on fine pointers, keyboard-focus-visible action state, single-column mobile state.
- `ProjectProofStrip`: static three-panel desktop state, stacked tablet/mobile state, reduced-motion static state.
- `HomeClosingCallout`: split desktop state and stacked mobile state, with a visible focus style on its action.
