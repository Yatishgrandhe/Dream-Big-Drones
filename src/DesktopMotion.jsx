import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Flip } from "gsap/Flip";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

gsap.registerPlugin(ScrollTrigger, Flip, SplitText, MotionPathPlugin, useGSAP);

const inView = (targets, options = {}) => {
  if (!targets?.length) return;
  gsap.from(targets, {
    opacity: 0,
    y: 36,
    duration: 0.82,
    stagger: 0.11,
    ease: "power3.out",
    scrollTrigger: { trigger: targets[0], start: "top 78%", once: true },
    ...options,
  });
};

export function runRouteTransition({ overlay, logo, next, returnHome }) {
  return new Promise((resolve) => {
    const line = overlay?.querySelector(".route-line");
    if (!overlay || !logo || !line) {
      resolve();
      return;
    }
    const tl = gsap.timeline({
      defaults: { ease: "power3.inOut" },
      onComplete: () => {
        gsap.set(overlay, { pointerEvents: "none" });
        resolve();
      },
    });
    gsap.set(overlay, {
      pointerEvents: "auto",
      clipPath: returnHome ? "inset(0 0 0 100%)" : "inset(0 100% 0 0)",
    });
    gsap.set(line, { scaleX: 0 });
    tl.to(overlay, { clipPath: "inset(0 0% 0 0)", duration: 0.48 })
      .fromTo(
        logo,
        { opacity: 0, scale: 0.55, rotation: -3, filter: "blur(10px)" },
        { opacity: 1, scale: 1, rotation: 3, filter: "blur(0px)", duration: 0.48 },
        "<.12",
      )
      .to(line, { scaleX: 1, duration: 0.4 }, "<.12")
      .add(next, ">-0.08")
      .to(logo, { opacity: 0, scale: 1.18, filter: "blur(12px)", duration: 0.28 })
      .to(overlay, { clipPath: "inset(0 0 0 100%)", duration: 0.46 }, "<.04");
  });
}

export function flipAfterLayout(grid, update) {
  const state = grid ? Flip.getState(grid.children) : null;
  update();
  requestAnimationFrame(() => {
    if (state) Flip.from(state, {
      duration: 0.55,
      ease: "power3.inOut",
      absolute: true,
      scale: true,
      stagger: 0.025,
    });
  });
}

export default function DesktopMotion({ rootRef, path }) {
  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;
      const splitInstances = [];
      const masthead = root.querySelector(".page-masthead");
      if (masthead) {
        gsap.from(masthead.querySelector(".masthead-copy"), {
          opacity: 0, x: -42, duration: 0.8, ease: "power3.out",
        });
        gsap.fromTo(masthead.querySelector("img"), { clipPath: "inset(0 100% 0 0)", scale: 1.16 }, { clipPath: "inset(0)", scale: 1, duration: 1.15, ease: "power4.out" });
        const index = masthead.querySelector(".masthead-index");
        if (index) {
          gsap.from(index, { xPercent: 120, duration: 1.15, ease: "power4.out" });
          gsap.to(index, { xPercent: -26, ease: "none", scrollTrigger: { trigger: masthead, start: "top top", end: "bottom top", scrub: 0.8 } });
        }
      }
      const splitHeads = [...root.querySelectorAll(".masthead-copy h1, .section-head h2")];
      splitHeads.forEach((heading) => {
        const split = SplitText.create(heading, { type: "lines", mask: "lines", autoSplit: true });
        splitInstances.push(split);
        gsap.from(split.lines, {
          yPercent: 105,
          opacity: 0,
          duration: 0.86,
          stagger: 0.1,
          ease: "power4.out",
          scrollTrigger: { trigger: heading, start: "top 82%", once: true },
        });
      });
      root.querySelectorAll(".flight-route").forEach((route) => {
        const path = route.querySelector(".flight-route-draw");
        if (!path) return;
        const length = path.getTotalLength();
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
        const dot = route.querySelector(".flight-route-destination");
        const waypoint = route.querySelector(".flight-route-waypoint");
        const tl = gsap.timeline({ scrollTrigger: { trigger: route, start: "top 78%", once: true } });
        tl.to(path, { strokeDashoffset: 0, duration: 1.35, ease: "power2.inOut" })
          .from(waypoint, { scale: 0, duration: 0.2, ease: "power2.out" }, 0)
          .to(waypoint, { motionPath: { path, align: path, alignOrigin: [0.5, 0.5] }, duration: 1.22, ease: "power2.inOut" }, 0)
          .from(dot, { scale: 0, duration: 0.32, ease: "back.out(1.5)" }, "<.86");
      });
      if (path === "/") {
        const words = root.querySelectorAll(".hero-word");
        gsap.from(words, { yPercent: 150, rotation: 4, opacity: 0, stagger: 0.09, duration: 0.84, ease: "power4.out", delay: 0.2 });
        const hero = root.querySelector(".hero-brand-art");
        if (hero) gsap.to(hero, { yPercent: 5, ease: "none", scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: 0.7 } });
        const stage = root.querySelector(".showcase img");
        if (stage) gsap.fromTo(stage, { clipPath: "inset(0 30% 0 30%)", scale: 1.12 }, { clipPath: "inset(0)", scale: 1, ease: "power2.out", scrollTrigger: { trigger: stage, start: "top 78%", end: "top 35%", scrub: 0.7 } });
        inView(root.querySelectorAll(".solution-card"), { y: 54, stagger: 0.14 });
        inView(root.querySelectorAll(".proof-strip article"), { x: 42, y: 0, stagger: 0.16 });
      }
      if (path === "/solutions") {
        const cards = [...root.querySelectorAll(".solution-card")];
        for (let index = 0; index < cards.length; index += 3) inView(cards.slice(index, index + 3), { x: (cardIndex) => ((index + cardIndex) % 2 ? 44 : -44), y: 0, stagger: 0.12 });
        gsap.utils.toArray(root.querySelectorAll(".solution-card img")).forEach((image) => gsap.fromTo(image, { clipPath: "inset(0 50% 0 50%)", scale: 1.16 }, { clipPath: "inset(0)", scale: 1, duration: 1.1, ease: "power3.out", scrollTrigger: { trigger: image, start: "top 80%", once: true } }));
      }
      if (path === "/fleet") {
        inView(root.querySelectorAll(".fleet-card"), { y: 48, stagger: 0.16 });
        gsap.utils.toArray(root.querySelectorAll(".fleet-card dl")).forEach((specs) => gsap.from(specs.children, { opacity: 0, x: -18, stagger: 0.07, duration: 0.5, ease: "power3.out", scrollTrigger: { trigger: specs, start: "top 84%", once: true } }));
        const telemetry = root.querySelector(".telemetry-draw");
        if (telemetry) {
          const length = telemetry.getTotalLength();
          gsap.fromTo(telemetry, { strokeDasharray: length, strokeDashoffset: length }, { strokeDashoffset: 0, duration: 1.2, ease: "power2.inOut", scrollTrigger: { trigger: telemetry, start: "top 84%", once: true } });
        }
      }
      if (path === "/portfolio") {
        inView(root.querySelectorAll(".project-card"), { scale: 0.94, y: 0, stagger: 0.07 });
        gsap.utils.toArray(root.querySelectorAll(".project-card img")).forEach((image) => gsap.fromTo(image, { scale: 1.14 }, { scale: 1, duration: 1.05, ease: "power3.out", scrollTrigger: { trigger: image, start: "top 82%", once: true } }));
      }
      if (path === "/support") {
        inView(root.querySelectorAll(".faq article"), { x: 46, y: 0, stagger: 0.13 });
        inView(root.querySelectorAll(".support-list li"), { x: -32, y: 0, stagger: 0.15 });
      }
      if (path === "/about") {
        inView(root.querySelectorAll(".principles p"), { x: 64, y: 0, stagger: 0.18 });
        const image = root.querySelector(".about-grid > div > img");
        if (image) gsap.to(image, { yPercent: -8, ease: "none", scrollTrigger: { trigger: image, start: "top 85%", end: "bottom 20%", scrub: 0.8 } });
      }
      if (path === "/contact") {
        inView(root.querySelectorAll(".contact-layout > *"), { y: 58, stagger: 0.2 });
        inView(root.querySelectorAll(".contact-form .form-field"), { y: 30, opacity: 0, stagger: 0.055, duration: 0.62 });
      }
      const footer = root.querySelector(".footer-logo");
      if (footer) gsap.from(footer, { y: 20, opacity: 0, duration: 0.7, scrollTrigger: { trigger: footer, start: "top 88%", once: true } });
      return () => splitInstances.forEach((split) => split.revert());
    },
    { scope: rootRef, dependencies: [path], revertOnUpdate: true },
  );
  return null;
}
