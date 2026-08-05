import { useEffect } from "react";
import { animate, createDrawable, createMotionPath, createTimeline, splitText, stagger } from "animejs";

const ease = "out(4)";
const seen = (target, callback, observers) => {
  if (!target) return;
  const observer = new IntersectionObserver(([entry]) => {
    if (!entry.isIntersecting) return;
    callback();
    observer.disconnect();
  }, { threshold: 0.16 });
  observer.observe(target);
  observers.push(observer);
};
const reveal = (targets, options = {}, animations) => {
  if (!targets?.length) return;
  const run = () => animations.push(animate(targets, {
    opacity: { from: 0, to: 1 }, translateY: { from: options.y ?? 38, to: 0 },
    translateX: { from: options.x ?? 0, to: 0 }, scale: options.scale ? { from: options.scale, to: 1 } : undefined,
    duration: options.duration ?? 720, delay: stagger(options.stagger ?? 80), ease,
  }));
  return run;
};

export function runRouteTransition({ overlay, logo, next, returnHome }) {
  if (!overlay || !logo) { next(); return Promise.resolve(); }
  overlay.style.pointerEvents = "auto";
  const start = returnHome ? "inset(0 0 0 100%)" : "inset(0 100% 0 0)";
  const line = overlay.querySelector(".route-line");
  const timeline = createTimeline({ defaults: { ease } });
  return new Promise((resolve) => {
    timeline
      .add(overlay, { clipPath: { from: start, to: "inset(0 0 0 0)" }, duration: 460 }, 0)
      .add(logo, { opacity: { from: 0, to: 1 }, scale: { from: .58, to: 1 }, translateY: { from: -18, to: 0 }, duration: 480 }, 120)
      .add(line, { scaleX: { from: 0, to: 1 }, duration: 360 }, 190)
      .add({ duration: 1, onComplete: next }, 490)
      .add(logo, { opacity: { from: 1, to: 0 }, scale: { from: 1, to: 1.14 }, duration: 240 }, 620)
      .add(overlay, { clipPath: { from: "inset(0 0 0 0)", to: "inset(0 0 0 100%)" }, duration: 420, onComplete: () => { overlay.style.pointerEvents = "none"; resolve(); } }, 690);
  });
}

export function flipAfterLayout(grid, update) {
  const cards = [...(grid?.children ?? [])];
  cards.forEach((card) => animate(card, { opacity: { from: 1, to: 0 }, scale: { from: 1, to: .96 }, duration: 150, ease: "in(3)" }));
  setTimeout(() => {
    update();
    requestAnimationFrame(() => animate([...grid.children], { opacity: { from: 0, to: 1 }, scale: { from: .96, to: 1 }, duration: 440, delay: stagger(55), ease: "out(5)" }));
  }, 150);
}

export default function DesktopMotion({ rootRef, path }) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;
    const animations = [], observers = [], splitters = [];
    const masthead = root.querySelector(".page-masthead");
    if (masthead) {
      animations.push(animate(masthead.querySelector(".masthead-copy"), { opacity: { from: 0, to: 1 }, translateX: { from: -46, to: 0 }, duration: 760, ease }));
      animations.push(animate(masthead.querySelector("img"), { clipPath: { from: "inset(0 100% 0 0)", to: "inset(0)" }, scale: { from: 1.14, to: 1 }, duration: 1050, ease }));
    }
    root.querySelectorAll(".masthead-copy h1, .section-head h2, .about-statement h2").forEach((heading) => {
      const split = splitText(heading, { lines: { wrap: "clip" }, accessible: true });
      splitters.push(split);
      seen(heading, () => animations.push(animate(split.lines, { translateY: { from: "110%", to: "0%" }, opacity: { from: 0, to: 1 }, duration: 760, delay: stagger(52), ease })), observers);
    });
    root.querySelectorAll(".flight-route").forEach((route) => {
      const pathElement = route.querySelector(".flight-route-draw");
      const waypoint = route.querySelector(".flight-route-waypoint");
      if (!pathElement || !waypoint) return;
      const drawable = createDrawable(pathElement)[0];
      const motionPath = createMotionPath(pathElement);
      seen(route, () => {
        animations.push(animate(drawable, { draw: ["0 0", "0 1"], duration: 1200, ease: "inOut(3)" }));
        animations.push(animate(waypoint, { ...motionPath, opacity: { from: 0, to: 1 }, duration: 1120, ease: "inOut(3)" }));
      }, observers);
    });
    if (path === "/") {
      const hero = root.querySelector(".hero-brand-art");
      const words = root.querySelectorAll(".hero-word");
      animations.push(animate(hero, { clipPath: { from: "inset(0 0 100% 0)", to: "inset(0)" }, scale: { from: 1.08, to: 1 }, duration: 1100, ease }));
      animations.push(animate(words, { translateY: { from: "135%", to: "0%" }, opacity: { from: 0, to: 1 }, duration: 780, delay: stagger(58), ease }));
      const showcase = root.querySelector(".showcase img");
      seen(showcase, () => animations.push(animate(showcase, { clipPath: { from: "inset(0 32% 0 32%)", to: "inset(0)" }, scale: { from: 1.1, to: 1 }, duration: 850, ease })), observers);
      const cards = root.querySelectorAll(".solution-card");
      seen(cards[0], reveal(cards, { y: 52, stagger: 95 }, animations), observers);
    }
    if (path === "/solutions") {
      const cards = [...root.querySelectorAll(".solution-card")];
      for (let i = 0; i < cards.length; i += 3) seen(cards[i], reveal(cards.slice(i, i + 3), { x: i % 2 ? 38 : -38, y: 24, stagger: 85 }, animations), observers);
    }
    if (path === "/fleet") seen(root.querySelector(".fleet-card"), reveal([...root.querySelectorAll(".fleet-card")], { y: 46, stagger: 120 }, animations), observers);
    if (path === "/portfolio") seen(root.querySelector(".project-card"), reveal([...root.querySelectorAll(".project-card")], { scale: .93, y: 0, stagger: 70 }, animations), observers);
    if (path === "/support") seen(root.querySelector(".faq"), reveal([...root.querySelectorAll(".faq article")], { x: 34, y: 0, stagger: 90 }, animations), observers);
    if (path === "/about") seen(root.querySelector(".about-grid"), reveal([...root.querySelectorAll(".principles p, .about-notes article")], { x: 44, y: 0, stagger: 105 }, animations), observers);
    if (path === "/contact") seen(root.querySelector(".contact-layout"), reveal([...root.querySelectorAll(".contact-layout > *, .contact-form .form-field")], { y: 30, stagger: 50, duration: 600 }, animations), observers);
    const footer = root.querySelector(".site-footer");
    seen(footer, () => animations.push(animate(footer.children, { opacity: { from: 0, to: 1 }, translateY: { from: 28, to: 0 }, duration: 650, delay: stagger(70), ease })), observers);
    return () => { observers.forEach((observer) => observer.disconnect()); animations.forEach((animation) => animation.revert?.()); splitters.forEach((splitter) => splitter.revert()); };
  }, [rootRef, path]);
  return null;
}
