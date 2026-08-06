import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Flip } from "gsap/Flip";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger, Flip, MotionPathPlugin, SplitText, useGSAP);

const reveal = (targets, vars = {}) => {
  if (!targets?.length) return;
  gsap.from(targets, {
    autoAlpha: 0, y: 34, duration: 0.7, stagger: 0.09, ease: "power3.out",
    scrollTrigger: { trigger: targets[0], start: "top 80%", once: true }, ...vars,
  });
};

export function runRouteTransition({ overlay, logo, next, returnHome }) {
  if (!overlay || !logo) { next(); return Promise.resolve(); }
  const line = overlay.querySelector(".route-line");
  gsap.set(overlay, { pointerEvents: "auto", clipPath: returnHome ? "inset(0 0 0 100%)" : "inset(0 100% 0 0)" });
  gsap.set(line, { scaleX: 0 });
  return new Promise((resolve) => {
    gsap.timeline({ defaults: { ease: "power3.inOut" }, onComplete: () => { gsap.set(overlay, { pointerEvents: "none" }); resolve(); } })
      .to(overlay, { clipPath: "inset(0)", duration: 0.42 })
      .fromTo(logo, { autoAlpha: 0, scale: .58, y: -18 }, { autoAlpha: 1, scale: 1, y: 0, duration: .48 }, "<.1")
      .to(line, { scaleX: 1, duration: .34 }, "<.12")
      .add(next, ">-.08")
      .to(logo, { autoAlpha: 0, scale: 1.14, duration: .22 })
      .to(overlay, { clipPath: "inset(0 0 0 100%)", duration: .4 }, "<.03");
  });
}

export function flipAfterLayout(grid, update) {
  const state = grid ? Flip.getState(grid.children) : null;
  update();
  requestAnimationFrame(() => state && Flip.from(state, { duration: .48, ease: "power4.inOut", absolute: true, scale: true, stagger: .05 }));
}

export default function DesktopMotion({ rootRef, path }) {
  useGSAP(() => {
    const root = rootRef.current;
    if (!root) return;
    let removeHeroPointer = null;
    // Responsive momentum: smooth enough to feel composed, short enough to keep up with fast input.
    const lenis = new Lenis({
      duration: 0.72,
      easing: (t) => 1 - (1 - t) ** 3,
      smoothWheel: true,
      wheelMultiplier: 0.92,
      syncTouch: false,
    });
    const tick = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    const splits = [];
    const masthead = root.querySelector(".page-masthead");
    if (masthead) {
      gsap.from(masthead.querySelector(".masthead-copy"), { autoAlpha: 0, x: -42, duration: .8, ease: "power3.out" });
      gsap.fromTo(masthead.querySelector("img"), { clipPath: "inset(0 100% 0 0)", scale: 1.12 }, { clipPath: "inset(0)", scale: 1, duration: 1.05, ease: "power4.out" });
    }
    root.querySelectorAll(".masthead-copy h1, .section-head h2, .about-statement h2").forEach((heading) => {
      const split = SplitText.create(heading, { type: "lines", mask: "lines", autoSplit: true });
      splits.push(split);
      gsap.from(split.lines, { yPercent: 110, autoAlpha: 0, duration: .78, stagger: .055, ease: "power4.out", scrollTrigger: { trigger: heading, start: "top 80%", once: true } });
    });
    root.querySelectorAll(".flight-route").forEach((route) => {
      const line = route.querySelector(".flight-route-draw");
      const waypoint = route.querySelector(".flight-route-waypoint");
      if (!line || !waypoint) return;
      const length = line.getTotalLength();
      gsap.set(line, { strokeDasharray: length, strokeDashoffset: length });
      gsap.timeline({ scrollTrigger: { trigger: route, start: "top 78%", once: true } })
        .to(line, { strokeDashoffset: 0, duration: 1.15, ease: "power2.inOut" })
        .from(waypoint, { scale: 0, duration: .18 }, 0)
        .to(waypoint, { motionPath: { path: line, align: line, alignOrigin: [.5, .5] }, duration: 1.08, ease: "power2.inOut" }, 0);
    });
    root.querySelectorAll(".aerial-hud").forEach((hud) => {
      const brightRoute = hud.querySelector(".hud-route-bright");
      const orbit = hud.querySelector(".hud-orbit");
      const target = hud.querySelector(".hud-target");
      const scene = hud.parentElement;
      if (brightRoute) {
        const length = brightRoute.getTotalLength();
        gsap.set(brightRoute, { strokeDasharray: length, strokeDashoffset: length });
        gsap.to(brightRoute, {
          strokeDashoffset: 0,
          duration: 1.1,
          ease: "power2.inOut",
          scrollTrigger: { trigger: scene, start: "top 82%", once: true },
        });
      }
      if (orbit) gsap.to(orbit, { rotation: 130, transformOrigin: "50% 50%", ease: "none", scrollTrigger: { trigger: scene, start: "top bottom", end: "bottom top", scrub: 0.45 } });
      if (target) gsap.from(target, { scale: 0.35, autoAlpha: 0, duration: .55, ease: "power3.out", scrollTrigger: { trigger: scene, start: "top 80%", once: true } });
    });
    root.querySelectorAll(".telemetry-glyph").forEach((glyph) => {
      const trace = glyph.querySelector(".glyph-trace");
      if (!trace) return;
      const length = trace.getTotalLength();
      gsap.set(trace, { strokeDasharray: length, strokeDashoffset: length });
      gsap.to(trace, { strokeDashoffset: 0, duration: 1.15, ease: "power2.inOut" });
    });
    if (path === "/") {
      const hero = root.querySelector(".hero-brand-art");
      const words = root.querySelectorAll(".hero-word");
      gsap.fromTo(hero, { clipPath: "inset(0 0 100% 0)", scale: 1.08 }, { clipPath: "inset(0)", scale: 1, duration: 1.1, ease: "power4.out" });
      gsap.from(words, { yPercent: 130, autoAlpha: 0, stagger: .055, duration: .78, ease: "power4.out", delay: .18 });
      const onMove = (event) => { const x = (event.clientX / innerWidth - .5) * 16; const y = (event.clientY / innerHeight - .5) * 12; gsap.to(hero, { x, y, duration: .7, ease: "power3.out", overwrite: true }); };
      const heroStage = root.querySelector(".page-hero");
      heroStage?.addEventListener("pointermove", onMove);
      removeHeroPointer = () => heroStage?.removeEventListener("pointermove", onMove);
      const showcase = root.querySelector(".showcase img");
      if (showcase) gsap.fromTo(showcase, { clipPath: "inset(0 30% 0 30%)", scale: 1.1 }, { clipPath: "inset(0)", scale: 1, duration: .85, ease: "power3.out", scrollTrigger: { trigger: showcase, start: "top 78%", once: true } });
      reveal(root.querySelectorAll(".solution-card"), { y: 52, stagger: .1 });
    }
    if (path === "/solutions") { const cards = [...root.querySelectorAll(".solution-card")]; for (let i = 0; i < cards.length; i += 3) reveal(cards.slice(i, i + 3), { x: i % 2 ? 36 : -36, y: 20, stagger: .09 }); }
    if (path === "/fleet") reveal(root.querySelectorAll(".fleet-card"), { y: 46, stagger: .12 });
    if (path === "/portfolio") reveal(root.querySelectorAll(".project-card"), { scale: .94, y: 0, stagger: .07 });
    if (path === "/support") reveal(root.querySelectorAll(".faq article"), { x: 34, y: 0, stagger: .09 });
    if (path === "/about") reveal(root.querySelectorAll(".principles p, .about-notes article"), { x: 44, y: 0, stagger: .1 });
    if (path === "/contact") reveal(root.querySelectorAll(".contact-layout > *, .contact-form .form-field"), { y: 26, stagger: .05, duration: .6 });
    const footer = root.querySelector(".site-footer");
    if (footer) reveal(footer.children, { y: 26, stagger: .07, duration: .65 });
    return () => {
      removeHeroPointer?.();
      gsap.ticker.remove(tick);
      lenis.destroy();
      splits.forEach((split) => split.revert());
    };
  }, { scope: rootRef, dependencies: [path], revertOnUpdate: true });
  return null;
}
