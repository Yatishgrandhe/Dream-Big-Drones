import { ConvexHttpClient } from "convex/browser";

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const pageRoot = document.querySelector("[data-page-root]");
const menuButton = document.querySelector("[data-menu-button]");
const menu = document.querySelector("[data-menu]");
const header = document.querySelector("[data-site-header]");
const loader = document.querySelector(".rd-loader");
const overlay = document.querySelector(".rd-route-overlay");
const convexUrl = import.meta.env.VITE_CONVEX_URL;
const client = convexUrl ? new ConvexHttpClient(convexUrl) : null;
let activeSplits = [];
let sideNavigation = false;

document.querySelector("[data-year]").textContent = String(new Date().getFullYear());

const visual = {
  city: "/assets/gallery/city.webp",
  build: "/assets/gallery/build.webp",
  coast: "/assets/gallery/coast.webp",
  farm: "/assets/gallery/farm.webp",
  roof: "/assets/gallery/roof.webp",
  tower: "/assets/gallery/tower.webp",
  storm: "/assets/gallery/storm.webp",
  house: "/assets/gallery/house.webp",
  road: "/assets/gallery/road.webp",
};

const services = [
  ["Real Estate Photography", "Editorial aerial and ground coverage for property marketing.", "Property launches, listings, developments", "Stills, aerial perspectives, detail selects", visual.house],
  ["Aerial Photography", "A decisive viewpoint for landscapes, campaigns, and location stories.", "Land, hospitality, destination media", "Color-finished image collection", visual.coast],
  ["Aerial Video", "Purposeful motion that gives an audience a better sense of place.", "Walkthroughs, campaigns, events", "Short-form clips and hero footage", visual.city],
  ["Roof & Property Inspections", "Clear visual documentation from safer vantage points.", "Roof conditions, property review", "High-resolution documentation", visual.roof],
  ["Construction Progress", "Consistent aerial records that make change easy to communicate.", "Project milestones, stakeholder updates", "Scheduled progress sets", visual.build],
  ["Tower & Infrastructure", "Visual context for difficult-to-reach infrastructure.", "Towers, utilities, industrial sites", "Inspection-ready visual sets", visual.tower],
  ["Emergency Documentation", "Calm, organized evidence when conditions change quickly.", "Storm, flood, damage documentation", "Aerial and ground documentation", visual.storm],
  ["Agriculture & Land Imaging", "A broad perspective for acreage, access, and land narratives.", "Farms, land, environmental context", "Mapped visual coverage", visual.farm],
  ["Commercial Media Production", "Aerial imagery designed to live within a complete story.", "Brands, venues, campaigns", "Photography and video selects", visual.road],
];

const inquiryTypes = ["Property or place", "Event or gathering", "Brand story or campaign", "Something else"];

const projects = [
  ["Harbor line", "General aerial photography", "Coastal location", "Aerial stills", visual.coast],
  ["New site, new perspective", "Construction progress", "Project location", "Progress documentation", visual.build],
  ["Above the listing", "Real estate", "Property location", "Property media", visual.house],
  ["Working landscape", "Land imaging", "Rural location", "Land imagery", visual.farm],
  ["After the weather", "Emergency documentation", "Project location", "Damage documentation", visual.storm],
  ["The route", "Aerial video", "Regional location", "Cinematic motion", visual.road],
  ["Reach and review", "Tower & infrastructure", "Site location", "Inspection imagery", visual.tower],
  ["Roofline study", "Roof & property inspections", "Property location", "Roof documentation", visual.roof],
];

const fleet = [
  ["Surveyor One", "Inspection & documentation", "High-resolution still capture", "4K motion capture", "Close visual review", "Up to 40 minutes", visual.tower],
  ["Vista Cine", "Cinematic media", "Wide-angle visual storytelling", "4K cinematic capture", "Location overview", "Up to 38 minutes", visual.city],
  ["Field Mapper", "Land & progress", "Consistent site perspectives", "4K documentation", "Repeatable flight routes", "Up to 45 minutes", visual.farm],
];

function action(to, label, quiet = false) {
  return `<a class="rd-action ${quiet ? "rd-action--outline" : "rd-action--signal"}" href="${to}" data-route>${label} <span aria-hidden="true">↗</span></a>`;
}

function routeLine(label = "Flight route") {
  return `<div class="rd-page-route" data-reveal aria-hidden="true"><span>${label}</span><svg viewBox="0 0 1200 180" preserveAspectRatio="none"><path class="rd-page-route-base" d="M0 126C150 18 262 184 424 92S693 20 804 102S1026 158 1200 46"/><path class="rd-page-route-draw" d="M0 126C150 18 262 184 424 92S693 20 804 102S1026 158 1200 46"/><circle cx="0" cy="126" r="7"/><circle class="rd-page-route-waypoint" cx="0" cy="126" r="5"/><circle cx="1200" cy="46" r="7"/></svg></div>`;
}

function masthead(kicker, title, copy, image) {
  return `<section class="rd-page-masthead"><div class="rd-page-masthead-copy"><p class="rd-kicker">${kicker}</p><h1 data-split>${title}</h1><p>${copy}</p></div><figure data-masthead-media><img src="${image}" alt="Aerial project context" width="1600" height="1067" fetchpriority="high" /></figure></section>`;
}

function serviceCard(item, index) {
  return `<article class="rd-page-card rd-page-service" data-reveal><img src="${item[4]}" alt="${item[0]}" loading="lazy" width="1600" height="1067"/><div><span>${String(index + 1).padStart(2, "0")} · ${item[2]}</span><h3>${item[0]}</h3><p>${item[1]}</p><small>${item[3]}</small>${action("/contact", "Discuss this service", true)}</div></article>`;
}

function homePage() {
  return `<section class="rd-hero" data-page-hero><canvas class="rd-flight-canvas" data-flight-canvas aria-hidden="true"></canvas><div class="rd-hero-grid" aria-hidden="true"></div><div class="rd-hero-copy"><p class="rd-kicker">Aerial services by RLM</p><h1 data-split><span class="rd-hero-title-main">Global vision.</span><br /><em>Grounded execution.</em></h1><p class="rd-lead">A premium aerial partner for visual storytelling, property documentation, inspections, and the work that needs a clearer point of view.</p><div class="rd-actions">${action("/solutions", "Explore solutions")}${action("/portfolio", "View portfolio", true)}</div></div><div class="rd-hero-media" data-hero-media><img src="/assets/rezzy/hero.png" alt="Dream Big Drones aircraft and destination artwork" width="1600" height="1067" fetchpriority="high"/><svg class="rd-flight-route" viewBox="0 0 600 220" fill="none" aria-hidden="true"><path data-route-path d="M20 178C150 42 210 208 340 86S490 130 580 28" /></svg><p><span>01</span> Aerial vision, grounded execution.</p></div></section><section class="rd-page-feature"><div data-reveal><p class="rd-kicker">Featured visual showcase</p><h2>See the site before anyone steps onto it.</h2><p>Purposeful aerial work gives a project its scale, setting, and story in a single glance.</p>${action("/portfolio", "Explore selected work", true)}</div><img data-reveal src="${visual.coast}" alt="Aerial coastline and blue water" loading="lazy" width="1600" height="1067" /></section><section class="rd-page-section"><div class="rd-section-heading" data-reveal><p class="rd-kicker">Featured solutions</p><h2>Work built for the view that matters.</h2></div><div class="rd-page-grid rd-page-grid--three" data-reveal-group>${services.slice(0, 3).map(serviceCard).join("")}</div></section><section class="rd-process rd-process--brand"><div data-reveal><p class="rd-kicker">Flight plan</p><h2>Plan with clarity.<br />Capture with purpose.<br /><em>Deliver with context.</em></h2></div><ol class="rd-process-list" data-reveal-group><li data-reveal><span>01</span><div><h3>Plan with clarity</h3><p>We align the location, conditions, and deliverables before takeoff.</p></div></li><li data-reveal><span>02</span><div><h3>Capture with purpose</h3><p>Every flight is shaped around the decision the work must support.</p></div></li><li data-reveal><span>03</span><div><h3>Deliver with context</h3><p>Organized visual files prepared for the way your team will use them.</p></div></li></ol></section>${routeLine("Flight plan · 01 / 03")}<section class="rd-page-cta" data-reveal><p class="rd-kicker">Start with the brief</p><h2>Have a project on the horizon?</h2><p>Tell us where it is, what needs to be captured, and what the finished work needs to accomplish.</p>${action("/contact", "Request a quote")}</section>`;
}

function solutionsPage() {
  return `${masthead("Solutions", "Aerial capability, shaped to the work.", "A considered set of drone and visual-documentation services designed to clarify a site, show progress, or tell a stronger location story.", visual.road)}<section class="rd-page-section"><div class="rd-section-heading" data-reveal><p class="rd-kicker">Service library</p><h2>A clear brief. A precise visual answer.</h2></div><div class="rd-page-grid rd-page-grid--three" data-reveal-group>${services.map(serviceCard).join("")}</div></section>`;
}

function fleetPage() {
  return `${masthead("Drone fleet", "The right platform for a confident perspective.", "Aircraft details are organized around the operational conversation: what needs to be captured, how it will be used, and the conditions on site.", visual.tower)}<section class="rd-page-section"><div class="rd-section-heading" data-reveal><p class="rd-kicker">Aircraft library</p><h2>Purpose-built capability.</h2></div><div class="rd-page-grid rd-page-grid--three" data-reveal-group>${fleet.map((drone, index) => `<article class="rd-page-card rd-fleet-card" data-reveal><img src="${drone[6]}" alt="${drone[0]} in aerial context" loading="lazy" width="1600" height="1067"/><div><span>0${index + 1} · ${drone[1]}</span><h3>${drone[0]}</h3><dl><div><dt>Camera</dt><dd>${drone[2]}</dd></div><div><dt>Video</dt><dd>${drone[3]}</dd></div><div><dt>Inspection</dt><dd>${drone[4]}</dd></div><div><dt>Flight time</dt><dd>${drone[5]}</dd></div></dl><button class="rd-text-button" type="button" data-details>Technical details <span aria-hidden="true">↓</span></button><p class="rd-card-details" hidden>Final aircraft model, sensor configuration, operational limits, and safety features are confirmed with the fleet owner before a flight.</p></div></article>`).join("")}</div></section>${routeLine("Aircraft route · 01 / 03")}`;
}

function portfolioPage() {
  const filters = ["All work", "Real estate", "Construction progress", "Tower & infrastructure", "Emergency documentation", "Aerial video"];
  return `${masthead("Portfolio", "A portfolio designed for the details that change the story.", "Filter by assignment, then open a project to review its visual brief, location context, and intended deliverables.", visual.coast)}<section class="rd-page-section"><div class="rd-section-heading" data-reveal><p class="rd-kicker">Selected work</p><h2>Browse by assignment.</h2></div><div class="rd-filters" data-reveal>${filters.map((filter, index) => `<button type="button" class="${index === 0 ? "is-selected" : ""}" data-project-filter="${filter}">${filter}</button>`).join("")}</div><div class="rd-page-grid rd-page-grid--four" data-project-grid>${projects.map((project) => `<button class="rd-project-card" type="button" data-project data-category="${project[1]}"><img src="${project[4]}" alt="${project[0]} aerial project" loading="lazy" width="1600" height="1067"/><span>${project[1]}</span><strong>${project[0]}</strong><i>${project[3]}</i></button>`).join("")}</div></section>`;
}

function supportPage() {
  const faqs = [["How do I schedule a flight?", "Start with a brief describing the location, requested service, deliverables, and timing. We will then confirm the right next step."], ["How are files delivered?", "Final delivery details are planned with each project so the files arrive in a useful, organized format."], ["Can I request revisions?", "Tell us what needs adjustment in the project brief. Revision expectations are agreed before delivery."], ["What should a support inquiry include?", "Include the project name, delivery context, and the change or question that needs attention."]];
  return `${masthead("Service & support", "A clear path from first brief to final handoff.", "The working process stays practical: plan the capture, make the flight, organize the files, and keep communication easy when the project needs follow-up.", visual.build)}<section class="rd-page-split rd-page-section"><div data-reveal><p class="rd-kicker">Service desk</p><h2>Support that respects the project timeline.</h2><ul class="rd-check-list"><li>Scheduling around project needs</li><li>Clear file-delivery handoff</li><li>Revision and support route</li></ul>${action("/contact", "Contact support")}${routeLine("Support route · 01 / 04")}</div><div class="rd-faq" data-reveal>${faqs.map(([question, answer], index) => `<article><button type="button" aria-expanded="${index === 0}" data-faq>${question}<span aria-hidden="true">+</span></button><p ${index === 0 ? "" : "hidden"}>${answer}</p></article>`).join("")}</div></section>`;
}

function aboutPage() {
  return `${masthead("About Dream Big Drones", "A more thoughtful view of every site.", "Dream Big Drones by RLM brings a client-focused aerial approach to property, documentation, media, and location-led storytelling.", visual.farm)}<section class="rd-page-split rd-page-section"><img data-reveal class="rd-about-photo" src="${visual.city}" alt="City from an elevated perspective" loading="lazy" width="1600" height="1067"/><div data-reveal><p class="rd-kicker">Our approach</p><h2>Prepared, precise, and easy to work with.</h2><p>Each project begins with the purpose behind the visual request—not an off-the-shelf package. The workflow stays attentive to quality, conditions, safety, and the people who need to use the finished work.</p><div class="rd-principles"><p><b>01 · Mission</b> Make the aerial perspective practical, beautiful, and clear.</p><p><b>02 · Quality</b> Give the final frame enough context to earn attention.</p><p><b>03 · Flexibility</b> Shape the flight plan around the project, not the other way around.</p></div>${routeLine("Mission route · 01 / 03")}</div></section><section class="rd-page-statement"><div data-reveal><p class="rd-kicker">The point of view</p><h2>Aerial work should make a place easier to understand before it asks for attention.</h2></div><p data-reveal>The best aerial perspective is not simply higher—it is more useful. Dream Big Drones approaches each location with a clear brief, a considered flight plan, and respect for the people who will rely on the finished visual work.</p></section>`;
}

function contactForm() {
  return `<form class="rd-form" data-contact-form novalidate><div class="rd-form-grid"><label>Full name <input name="name" autocomplete="name" required minlength="2" /></label><label>Email address <input name="email" type="email" autocomplete="email" required /></label><label>Phone number <input name="phone" type="tel" autocomplete="tel" /></label><label>Project location <input name="location" autocomplete="address-level1" required minlength="2" /></label><label>Requested service <select name="shootType" required><option value="">Select a service</option>${inquiryTypes.map((type) => `<option value="${type}">${type}</option>`).join("")}</select></label><label>Preferred date <input name="preferredDate" type="date" /></label><label class="rd-form-wide">Project details <textarea name="projectDetails" rows="6" minlength="12" required placeholder="Tell us about the site, requested coverage, and what the finished work needs to accomplish."></textarea></label></div><label class="rd-consent"><input name="consent" type="checkbox" required /> <span>I agree that Dream Big Drones may use these details to respond to my inquiry.</span></label><label class="rd-honeypot" aria-hidden="true">Leave this field empty <input name="honeypot" tabindex="-1" autocomplete="off" /></label><p class="rd-form-message" data-form-message aria-live="polite"></p><button class="rd-action rd-action--dark" type="submit" data-submit-button>Send project details <span aria-hidden="true">↗</span></button></form>`;
}

function contactPage() {
  return `${masthead("Contact & project intake", "Tell us what needs a better view.", "Share the location, scope, and timing. The detailed project intake helps us begin with the right questions.", visual.roof)}<section class="rd-page-split rd-page-section"><div data-reveal><p class="rd-kicker">Project intake</p><h2>A useful brief makes the best first flight.</h2><p>For multi-site or portfolio work, include the approximate total site count. Tell us whether you need photos, video, 3D models, thermal imaging, mapping, or another deliverable.</p><div class="rd-contact-note">Fields marked required are needed to prepare a response. Your details are not displayed publicly.</div>${routeLine("Intake route · 01 / 01")}</div><div data-reveal>${contactForm()}</div></section>`;
}

const pages = { "/": homePage, "/solutions": solutionsPage, "/fleet": fleetPage, "/portfolio": portfolioPage, "/support": supportPage, "/about": aboutPage, "/contact": contactPage };
const routeTitles = { "/": "Dream Big Drones | Aerial Photography & Drone Services", "/solutions": "Solutions | Dream Big Drones", "/fleet": "Drone Fleet | Dream Big Drones", "/portfolio": "Portfolio | Dream Big Drones", "/support": "Service & Support | Dream Big Drones", "/about": "About | Dream Big Drones", "/contact": "Contact | Dream Big Drones" };

function validPath(path) { return pages[path] ? path : "/"; }

function setMenu(open) {
  menu.classList.toggle("is-open", open);
  menuButton.classList.toggle("is-open", open);
  menuButton.setAttribute("aria-expanded", String(open));
  document.body.classList.toggle("menu-open", open);
}

menuButton.addEventListener("click", () => setMenu(!menu.classList.contains("is-open")));
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menu.classList.contains("is-open")) { setMenu(false); menuButton.focus(); }
  if (event.key === "Escape") document.querySelector(".rd-project-modal")?.remove();
});

function updateNavigation() {
  const hero = pageRoot.querySelector("[data-page-hero], .rd-page-masthead");
  const shouldSide = innerWidth >= 1101 && !prefersReducedMotion && hero && scrollY > hero.offsetTop + hero.offsetHeight * 0.42;
  header.classList.toggle("is-scrolled", scrollY > 28);
  if (Boolean(shouldSide) === sideNavigation) return;
  const state = window.Flip ? window.Flip.getState(header) : null;
  sideNavigation = Boolean(shouldSide);
  header.classList.toggle("is-side", sideNavigation);
  document.body.classList.toggle("rd-nav-side-active", sideNavigation);
  if (state) window.Flip.from(state, { duration: 0.72, ease: "power3.inOut", absolute: true, scale: true });
  requestAnimationFrame(() => window.ScrollTrigger?.refresh());
}

addEventListener("scroll", updateNavigation, { passive: true });
addEventListener("resize", () => { sideNavigation = !header.classList.contains("is-side"); updateNavigation(); }, { passive: true });

function initFlightCanvas() {
  const canvas = pageRoot.querySelector("[data-flight-canvas]");
  if (!canvas || prefersReducedMotion) return;
  const gl = canvas.getContext("webgl", { alpha: true, antialias: false, powerPreference: "low-power" });
  if (!gl) return;
  const vertex = "attribute vec2 position; varying vec2 uv; void main(){uv=(position+1.0)*.5;gl_Position=vec4(position,0.,1.);}";
  const fragment = "precision mediump float; varying vec2 uv; uniform float time; uniform vec2 resolution; float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);} void main(){vec2 p=uv;float route=smoothstep(.017,0.,abs(p.y-(.53+.10*sin(p.x*8.+time*.72)+.035*sin(p.x*21.-time*.42))));vec2 cell=floor(p*20.);float spark=step(.983,h(cell+floor(time*.18)))*smoothstep(.10,0.,length(fract(p*20.)-.5));float grain=(h(floor(p*resolution*.1))-.5)*.05;float signal=route*.28+spark*.13+grain;gl_FragColor=vec4(vec3(.04,.20,.28),clamp(signal,0.,.42));}";
  const compile = (type, source) => { const shader = gl.createShader(type); gl.shaderSource(shader, source); gl.compileShader(shader); return shader; };
  const program = gl.createProgram(); gl.attachShader(program, compile(gl.VERTEX_SHADER, vertex)); gl.attachShader(program, compile(gl.FRAGMENT_SHADER, fragment)); gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
  const buffer = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buffer); gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW); gl.useProgram(program);
  const position = gl.getAttribLocation(program, "position"); const time = gl.getUniformLocation(program, "time"); const resolution = gl.getUniformLocation(program, "resolution"); gl.enableVertexAttribArray(position); gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
  let active = true; let frame = 0; let last = 0;
  const resize = () => { const ratio = Math.min(devicePixelRatio || 1, 1.35); canvas.width = Math.floor(canvas.clientWidth * ratio); canvas.height = Math.floor(canvas.clientHeight * ratio); gl.viewport(0, 0, canvas.width, canvas.height); };
  const draw = (now) => { if (!active || document.hidden || !canvas.isConnected) { frame = 0; return; } if (now - last > 33) { last = now; gl.uniform1f(time, now / 1000); gl.uniform2f(resolution, canvas.width, canvas.height); gl.drawArrays(gl.TRIANGLES, 0, 3); } frame = requestAnimationFrame(draw); };
  new ResizeObserver(resize).observe(canvas); new IntersectionObserver(([entry]) => { active = entry.isIntersecting; if (active && !frame) frame = requestAnimationFrame(draw); }, { threshold: .01 }).observe(canvas); resize(); frame = requestAnimationFrame(draw);
}

function splitLines(element) {
  if (!element || !window.SplitText) return [];
  const split = new window.SplitText(element, { type: "lines", linesClass: "rd-split-line" }); activeSplits.push(split);
  split.lines.forEach((line) => { const mask = document.createElement("span"); mask.className = "rd-line-mask"; line.parentNode.insertBefore(mask, line); mask.appendChild(line); });
  return split.lines;
}

function configureMotion(initial = false) {
  if (!window.gsap || prefersReducedMotion) { loader.classList.add("is-done"); return; }
  const { gsap } = window;
  gsap.registerPlugin(window.ScrollTrigger, window.SplitText, window.Flip, window.MotionPathPlugin, window.DrawSVGPlugin, window.ScrollToPlugin);
  const heroHeading = pageRoot.querySelector("[data-page-hero] [data-split]");
  const mastheadHeading = pageRoot.querySelector(".rd-page-masthead [data-split]");
  const heroLines = splitLines(heroHeading); const mastheadLines = splitLines(mastheadHeading);
  const complete = () => loader.classList.add("is-done");
  const timeline = gsap.timeline({ onComplete: complete });
  if (initial) timeline.from(".rd-loader img", { opacity: 0, scale: .72, rotate: -3, duration: .85, ease: "power4.out" }).from(".rd-loader span", { opacity: 0, y: 16, duration: .45, ease: "power3.out" }, "<.18").to(".rd-loader", { opacity: 0, duration: .7, delay: .34, ease: "power3.inOut" });
  const introTargets = heroLines.length ? heroLines : mastheadLines;
  if (introTargets.length) timeline.from(introTargets, { opacity: 0, yPercent: 105, rotate: 2, duration: 1.02, stagger: .1, ease: "expo.out" }, initial ? "<-.12" : 0);
  if (heroHeading) timeline.from(".rd-hero-copy .rd-kicker, .rd-hero-copy .rd-lead, .rd-hero-copy .rd-actions", { opacity: 0, y: 20, duration: .65, stagger: .09, ease: "power3.out" }, "<.18").from("[data-hero-media]", { opacity: 0, scale: 1.08, clipPath: "inset(0 0 100% 0 round 32px)", duration: 1.18, ease: "power4.out" }, "<-.5");
  if (mastheadHeading) timeline.from("[data-masthead-media]", { opacity: 0, scale: 1.08, clipPath: "inset(0 100% 0 0)", duration: 1.05, ease: "power4.out" }, "<.08");
  const route = pageRoot.querySelector("[data-route-path]"); if (route) gsap.from(route, { drawSVG: "0%", duration: 2.1, delay: 1.35, ease: "power2.inOut" });
  const grouped = new Set();
  pageRoot.querySelectorAll("[data-reveal-group]").forEach((group) => { const items = [...group.querySelectorAll(":scope > [data-reveal]")]; if (!items.length) return; items.forEach((item) => grouped.add(item)); gsap.from(items, { opacity: 0, y: innerWidth < 768 ? 18 : 42, scale: .985, duration: innerWidth < 768 ? .5 : .82, stagger: .1, ease: "power3.out", scrollTrigger: { trigger: group, start: "top 82%", once: true } }); });
  gsap.utils.toArray(pageRoot.querySelectorAll("[data-reveal]")).filter((item) => !grouped.has(item)).forEach((element, index) => gsap.from(element, { opacity: 0, x: innerWidth >= 1024 && index % 2 ? 36 : 0, y: innerWidth < 768 ? 18 : 42, duration: innerWidth < 768 ? .52 : .82, ease: "power3.out", scrollTrigger: { trigger: element, start: "top 84%", once: true } }));
  pageRoot.querySelectorAll(".rd-page-route").forEach((routeElement) => { const line = routeElement.querySelector(".rd-page-route-draw"); const waypoint = routeElement.querySelector(".rd-page-route-waypoint"); if (!line) return; const length = line.getTotalLength(); gsap.set(line, { strokeDasharray: length, strokeDashoffset: length }); const routeTimeline = gsap.timeline({ scrollTrigger: { trigger: routeElement, start: "top 78%", once: true } }).to(line, { strokeDashoffset: 0, duration: 1.1, ease: "power2.inOut" }); if (waypoint) routeTimeline.to(waypoint, { motionPath: { path: line, align: line, alignOrigin: [.5, .5] }, duration: 1.05, ease: "power2.inOut" }, 0); });
  if (heroHeading) gsap.to(".rd-hero-media img", { yPercent: 5, ease: "none", scrollTrigger: { trigger: ".rd-hero", start: "top top", end: "bottom top", scrub: .5 } });
}

function initContactForm() {
  const form = pageRoot.querySelector("[data-contact-form]"); if (!form) return;
  const message = form.querySelector("[data-form-message]"); const submitButton = form.querySelector("[data-submit-button]");
  const setMessage = (text, type = "") => { message.textContent = text; message.className = `rd-form-message${type ? ` is-${type}` : ""}`; };
  const validate = () => { let valid = true; form.querySelectorAll("[required]").forEach((field) => { const fieldValid = field.type === "checkbox" ? field.checked : field.checkValidity(); field.setAttribute("aria-invalid", String(!fieldValid)); if (!fieldValid) valid = false; }); return valid; };
  form.addEventListener("input", (event) => { if (event.target.matches("[required]")) event.target.setAttribute("aria-invalid", "false"); setMessage(""); });
  form.addEventListener("submit", async (event) => { event.preventDefault(); if (!validate()) { setMessage("Please complete the required fields before sending your inquiry.", "error"); form.querySelector("[aria-invalid=true]")?.focus(); return; } if (!client) { setMessage("The inquiry service is not configured yet. Please try again shortly.", "error"); return; } const values = new FormData(form); const args = { name: String(values.get("name")).trim(), email: String(values.get("email")).trim(), phone: String(values.get("phone") || "").trim() || undefined, location: String(values.get("location")).trim(), shootType: String(values.get("shootType")), preferredDate: String(values.get("preferredDate") || "") || undefined, projectDetails: String(values.get("projectDetails")).trim(), consent: values.get("consent") === "on", honeypot: String(values.get("honeypot") || ""), sourcePage: location.pathname }; submitButton.disabled = true; submitButton.textContent = "Sending inquiry…"; setMessage("Sending your project details…"); try { await client.mutation("contacts:submit", args); form.reset(); setMessage("Thank you — your inquiry is in. Dream Big Drones will reply using the contact details you provided.", "success"); } catch (error) { setMessage(error?.message || "We could not send your inquiry. Please try again.", "error"); } finally { submitButton.disabled = false; submitButton.innerHTML = 'Send project details <span aria-hidden="true">↗</span>'; } });
}

function initPageControls() {
  pageRoot.querySelectorAll("[data-details]").forEach((button) => button.addEventListener("click", () => { const details = button.parentElement.querySelector(".rd-card-details"); details.hidden = !details.hidden; button.querySelector("span").textContent = details.hidden ? "↓" : "↑"; }));
  pageRoot.querySelectorAll("[data-faq]").forEach((button) => button.addEventListener("click", () => { const answer = button.parentElement.querySelector("p"); const open = button.getAttribute("aria-expanded") === "true"; pageRoot.querySelectorAll("[data-faq]").forEach((item) => { item.setAttribute("aria-expanded", "false"); item.parentElement.querySelector("p").hidden = true; item.querySelector("span").textContent = "+"; }); if (!open) { button.setAttribute("aria-expanded", "true"); answer.hidden = false; button.querySelector("span").textContent = "−"; } }));
  pageRoot.querySelectorAll("[data-project-filter]").forEach((button) => button.addEventListener("click", () => { const filter = button.dataset.projectFilter; pageRoot.querySelectorAll("[data-project-filter]").forEach((item) => item.classList.toggle("is-selected", item === button)); pageRoot.querySelectorAll("[data-project]").forEach((card) => { card.hidden = filter !== "All work" && card.dataset.category !== filter; }); }));
  pageRoot.querySelectorAll("[data-project]").forEach((card) => card.addEventListener("click", () => { const modal = document.createElement("div"); modal.className = "rd-project-modal"; modal.innerHTML = `<button type="button" aria-label="Close project">×</button><img src="${card.querySelector("img").src}" alt=""/><div><p class="rd-kicker">${card.dataset.category}</p><h2>${card.querySelector("strong").textContent}</h2><p>${card.querySelector("i").textContent}</p><p>Structured portfolio detail ready for final location, scope, and approved deliverable notes.</p>${action("/contact", "Discuss a similar project")}</div>`; modal.addEventListener("click", (event) => { if (event.target === modal || event.target.closest("button")) modal.remove(); }); document.body.append(modal); }));
}

function updateActiveRoute(path) { document.querySelectorAll("[data-route]").forEach((link) => link.classList.toggle("is-active", link.getAttribute("href") === path)); }

function render(path, { initial = false, transition = false } = {}) {
  const route = validPath(path); activeSplits.forEach((split) => split.revert()); activeSplits = []; window.ScrollTrigger?.getAll().forEach((trigger) => trigger.kill()); pageRoot.innerHTML = pages[route](); document.title = routeTitles[route]; updateActiveRoute(route); initContactForm(); initPageControls(); initFlightCanvas(); sideNavigation = false; header.classList.remove("is-side"); document.body.classList.remove("rd-nav-side-active"); window.scrollTo({ top: 0, behavior: "instant" }); configureMotion(initial); requestAnimationFrame(() => { window.ScrollTrigger?.refresh(); updateNavigation(); }); if (transition && !prefersReducedMotion) { overlay.classList.add("is-active"); setTimeout(() => overlay.classList.remove("is-active"), 720); } pageRoot.focus({ preventScroll: true });
}

document.addEventListener("click", (event) => { const link = event.target.closest("a[data-route]"); if (!link || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return; const path = new URL(link.href).pathname; if (!pages[path]) return; event.preventDefault(); if (path === location.pathname) { setMenu(false); return; } history.pushState({}, "", path); setMenu(false); render(path, { transition: true }); });
addEventListener("popstate", () => render(location.pathname, { transition: true }));

render(location.pathname, { initial: true });
