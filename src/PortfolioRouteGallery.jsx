import { useEffect, useRef } from "react";

let routePluginsRegistered = false;

/**
 * Portfolio's visual route is a scroll scene: each waypoint opens the image
 * assigned to that part of the selected work sequence.
 */
export function PortfolioRouteGallery({ items }) {
  const sectionRef = useRef(null);

  useEffect(() => {
    let context;
    let cancelled = false;

    const animate = async () => {
      const section = sectionRef.current;
      if (!section || !matchMedia("(min-width: 1024px) and (prefers-reduced-motion: no-preference)").matches) return;

      const [{ default: gsap }, { DrawSVGPlugin }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/DrawSVGPlugin"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled) return;
      if (!routePluginsRegistered) {
        gsap.registerPlugin(DrawSVGPlugin, ScrollTrigger);
        routePluginsRegistered = true;
      }

      context = gsap.context(() => {
        const route = section.querySelector(".portfolio-route-draw");
        const dots = section.querySelectorAll(".portfolio-route-dot");
        const cards = section.querySelectorAll(".portfolio-route-card");
        if (!route || !dots.length || !cards.length) return;

        const timeline = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: section,
            start: "top 72%",
            end: "bottom 34%",
            scrub: 0.45,
            invalidateOnRefresh: true,
          },
        });

        timeline
          .set([route, dots, cards], { autoAlpha: 1 })
          .set(route, { drawSVG: "0% 0%" })
          .set(dots, { autoAlpha: 0, scale: 0.42, transformOrigin: "50% 50%" })
          .set(cards, { autoAlpha: 0, y: 34, scale: 0.96 })
          .to(route, { drawSVG: "0% 100%", duration: 3 })
          .to(dots[0], { autoAlpha: 1, scale: 1, duration: 0.22, ease: "power3.out" }, 0.48)
          .to(cards[0], { autoAlpha: 1, y: 0, scale: 1, duration: 0.38, ease: "power3.out" }, 0.56)
          .to(dots[1], { autoAlpha: 1, scale: 1, duration: 0.22, ease: "power3.out" }, 1.42)
          .to(cards[1], { autoAlpha: 1, y: 0, scale: 1, duration: 0.38, ease: "power3.out" }, 1.5)
          .to(dots[2], { autoAlpha: 1, scale: 1, duration: 0.22, ease: "power3.out" }, 2.28)
          .to(cards[2], { autoAlpha: 1, y: 0, scale: 1, duration: 0.38, ease: "power3.out" }, 2.36);
      }, section);
    };

    void animate();
    return () => {
      cancelled = true;
      context?.revert();
    };
  }, []);

  return (
    <section className="portfolio-route-gallery" ref={sectionRef} aria-labelledby="portfolio-route-title">
      <div className="portfolio-route-intro">
        <p className="eyebrow">Selected route</p>
        <h2 id="portfolio-route-title">Every waypoint holds a different point of view.</h2>
        <p>Scroll through three recent visual directions. Each waypoint opens the work it connects.</p>
      </div>
      <div className="portfolio-route-scene">
        <svg className="portfolio-route-art" viewBox="0 0 1200 620" fill="none" aria-hidden="true">
          <path className="portfolio-route-base" d="M-40 488C108 522 172 402 278 372S448 144 586 236S766 498 928 332S1080 174 1240 236" />
          <path className="portfolio-route-draw" d="M-40 488C108 522 172 402 278 372S448 144 586 236S766 498 928 332S1080 174 1240 236" />
        </svg>
        {items.map((item, index) => (
          <article className={`portfolio-route-card portfolio-route-card-${index + 1}`} key={item.title}>
            <img src={item.image} alt={item.alt} loading="lazy" />
            <div>
              <p>{item.category}</p>
              <h3>{item.title}</h3>
            </div>
          </article>
        ))}
        <i className="portfolio-route-dot portfolio-route-dot-1" aria-hidden="true" />
        <i className="portfolio-route-dot portfolio-route-dot-2" aria-hidden="true" />
        <i className="portfolio-route-dot portfolio-route-dot-3" aria-hidden="true" />
      </div>
    </section>
  );
}
