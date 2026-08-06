import { useEffect, useRef } from "react";

let drawSVGRegistered = false;

/**
 * The image is always present for progressive rendering. On desktop, its
 * associated flight path draws first, then opens the image stage behind it.
 */
export function MastheadImageReveal({ src, alt }) {
  const stageRef = useRef(null);

  useEffect(() => {
    let context;
    let cancelled = false;

    const animate = async () => {
      const stage = stageRef.current;
      if (!stage || !matchMedia("(min-width: 1024px) and (prefers-reduced-motion: no-preference)").matches) return;

      const [{ default: gsap }, { DrawSVGPlugin }] = await Promise.all([
        import("gsap"),
        import("gsap/DrawSVGPlugin"),
      ]);
      if (cancelled) return;
      if (!drawSVGRegistered) {
        gsap.registerPlugin(DrawSVGPlugin);
        drawSVGRegistered = true;
      }

      context = gsap.context(() => {
        const image = stage.querySelector("img");
        const route = stage.querySelector(".masthead-route-draw");
        const trail = stage.querySelector(".masthead-route-trail");
        const markers = stage.querySelectorAll(".masthead-route-marker");
        if (!image || !route || !trail) return;

        const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });
        timeline
          .set(image, { clipPath: "inset(0 100% 0 0)", scale: 1.075 })
          .set([route, trail], { autoAlpha: 1 })
          .set(markers, { autoAlpha: 0, scale: 0.45, transformOrigin: "50% 50%" })
          .set(route, { drawSVG: "0% 0%" })
          .set(trail, { drawSVG: "0% 0%" })
          .to(route, { drawSVG: "0% 100%", duration: 1.15, ease: "power2.inOut" })
          .to(image, { clipPath: "inset(0 0% 0 0)", scale: 1, duration: 0.82, ease: "power4.out" }, 0.2)
          .to(markers, { autoAlpha: 1, scale: 1, duration: 0.22, stagger: 0.16 }, 0.35)
          .to(trail, { drawSVG: "0% 100%", duration: 0.62, ease: "power2.out" }, 0.5);
      }, stage);
    };

    void animate();
    return () => {
      cancelled = true;
      context?.revert();
    };
  }, []);

  return (
    <div className="masthead-image-route" ref={stageRef}>
      <img src={src} alt={alt} />
      <div className="masthead-image-shade" aria-hidden="true" />
      <svg className="masthead-route-art" viewBox="0 0 760 520" fill="none" aria-hidden="true">
        <path className="masthead-route-base" d="M-28 404 C120 430 156 248 292 310 S456 472 538 278 S662 112 792 146" />
        <path className="masthead-route-draw" d="M-28 404 C120 430 156 248 292 310 S456 472 538 278 S662 112 792 146" />
        <path className="masthead-route-trail" d="M292 310 C388 354 456 472 538 278 S662 112 792 146" />
        <circle className="masthead-route-marker" cx="292" cy="310" r="7" />
        <circle className="masthead-route-marker" cx="538" cy="278" r="7" />
        <circle className="masthead-route-marker masthead-route-marker-end" cx="706" cy="126" r="8" />
      </svg>
      <p className="masthead-route-caption" aria-hidden="true">Image route / 01</p>
    </div>
  );
}
