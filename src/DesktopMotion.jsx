import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Flip } from "gsap/Flip";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, Flip, useGSAP);

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
      const masthead = root.querySelector(".page-masthead");
      if (masthead) {
        gsap.from(masthead.querySelector(".masthead-copy"), {
          opacity: 0, x: -42, duration: 0.8, ease: "power3.out",
        });
      }
      if (path === "/") {
        const words = root.querySelectorAll(".hero-word");
        gsap.from(words, { yPercent: 120, opacity: 0, stagger: 0.075, duration: 0.62, ease: "power4.out", delay: 0.2 });
        const hero = root.querySelector(".hero-brand-art");
        if (hero) gsap.to(hero, { yPercent: 5, ease: "none", scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: 0.7 } });
        const stage = root.querySelector(".showcase img");
        if (stage) gsap.fromTo(stage, { clipPath: "inset(0 30% 0 30%)", scale: 1.12 }, { clipPath: "inset(0)", scale: 1, ease: "power2.out", scrollTrigger: { trigger: stage, start: "top 78%", end: "top 35%", scrub: 0.7 } });
        inView(root.querySelectorAll(".solution-card"), { y: 54, stagger: 0.14 });
        inView(root.querySelectorAll(".proof-strip article"), { x: 42, y: 0, stagger: 0.16 });
      }
      if (path === "/solutions") inView(root.querySelectorAll(".solution-card"), { x: (index) => (index % 2 ? 44 : -44), y: 0, stagger: 0.09 });
      if (path === "/fleet") inView(root.querySelectorAll(".fleet-card"), { y: 48, stagger: 0.16 });
      if (path === "/portfolio") {
        inView(root.querySelectorAll(".project-card"), { scale: 0.94, y: 0, stagger: 0.07 });
        gsap.utils.toArray(root.querySelectorAll(".project-card img")).forEach((image) => gsap.fromTo(image, { scale: 1.14 }, { scale: 1, duration: 1.05, ease: "power3.out", scrollTrigger: { trigger: image, start: "top 82%", once: true } }));
      }
      if (path === "/support") inView(root.querySelectorAll(".faq article"), { x: 28, y: 0, stagger: 0.1 });
      if (path === "/about") inView(root.querySelectorAll(".principles p"), { x: 44, y: 0, stagger: 0.15 });
      if (path === "/contact") inView(root.querySelectorAll(".contact-layout > *"), { y: 40, stagger: 0.18 });
      const footer = root.querySelector(".footer-logo");
      if (footer) gsap.from(footer, { y: 20, opacity: 0, duration: 0.7, scrollTrigger: { trigger: footer, start: "top 88%", once: true } });
    },
    { scope: rootRef, dependencies: [path], revertOnUpdate: true },
  );
  return null;
}
