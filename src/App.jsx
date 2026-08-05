import {
  ArrowRight,
  Check,
  ChevronDown,
  Menu,
  Search,
  Send,
  X,
} from "lucide-react";
import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ContactForm } from "./components/ContactForm";
import "./App.css";
import "./RouteMasthead.css";
import "./BrandArtwork.css";
import "./FlightMotion.css";
import "./HeaderSizing.css";

const DesktopMotion = lazy(() => import("./DesktopMotion"));

const routes = [
  ["/", "Home"],
  ["/solutions", "Solutions"],
  ["/fleet", "Drone Fleet"],
  ["/portfolio", "Portfolio"],
  ["/support", "Service & Support"],
  ["/about", "About Us"],
  ["/contact", "Contact"],
];

const image = (id, width = 1500) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=82`;
const visual = {
  city: image("photo-1500534623283-312aade485b7"),
  build: image("photo-1541888946425-d81bb19240f5"),
  coast: image("photo-1507525428034-b723cf961d3e"),
  farm: image("photo-1469474968028-56623f02e42e"),
  roof: image("photo-1511818966892-d7d671e672a2"),
  tower: image("photo-1494526585095-c41746248156"),
  storm: image("photo-1527482797697-8795b05a13fe"),
  house: image("photo-1600585154340-be6161a56a0c"),
  road: image("photo-1473445361085-b9a07f55608b"),
};
const solutionData = [
  [
    "Real Estate Photography",
    "Editorial aerial and ground coverage for property marketing.",
    "Property launches, listings, developments",
    "Stills, aerial perspectives, detail selects",
    visual.house,
  ],
  [
    "Aerial Photography",
    "A decisive viewpoint for landscapes, campaigns, and location stories.",
    "Land, hospitality, destination media",
    "Color-finished image collection",
    visual.coast,
  ],
  [
    "Aerial Video",
    "Purposeful motion that gives an audience a better sense of place.",
    "Walkthroughs, campaigns, events",
    "Short-form clips and hero footage",
    visual.city,
  ],
  [
    "Roof & Property Inspections",
    "Clear visual documentation from safer vantage points.",
    "Roof conditions, property review",
    "High-resolution documentation",
    visual.roof,
  ],
  [
    "Construction Progress",
    "Consistent aerial records that make change easy to communicate.",
    "Project milestones, stakeholder updates",
    "Scheduled progress sets",
    visual.build,
  ],
  [
    "Tower & Infrastructure",
    "Visual context for difficult-to-reach infrastructure.",
    "Towers, utilities, industrial sites",
    "Inspection-ready visual sets",
    visual.tower,
  ],
  [
    "Emergency Documentation",
    "Calm, organized evidence when conditions change quickly.",
    "Storm, flood, damage documentation",
    "Aerial and ground documentation",
    visual.storm,
  ],
  [
    "Agriculture & Land Imaging",
    "A broad perspective for acreage, access, and land narratives.",
    "Farms, land, environmental context",
    "Mapped visual coverage",
    visual.farm,
  ],
  [
    "Commercial Media Production",
    "Aerial imagery designed to live within a complete story.",
    "Brands, venues, campaigns",
    "Photography and video selects",
    visual.road,
  ],
];
const projects = [
  [
    "Harbor line",
    "General Aerial Photography",
    "Coastal location",
    "Aerial stills",
    visual.coast,
  ],
  [
    "New site, new perspective",
    "Construction Progress",
    "Project location",
    "Progress documentation",
    visual.build,
  ],
  [
    "Above the listing",
    "Real Estate – Drone",
    "Property location",
    "Property media",
    visual.house,
  ],
  [
    "Working landscape",
    "Agriculture and Land Imaging",
    "Rural location",
    "Land imagery",
    visual.farm,
  ],
  [
    "After the weather",
    "Storm Damage",
    "Project location",
    "Damage documentation",
    visual.storm,
  ],
  [
    "The route",
    "Aerial Video",
    "Regional location",
    "Cinematic motion",
    visual.road,
  ],
  [
    "Reach and review",
    "Tower & Infrastructure",
    "Site location",
    "Inspection imagery",
    visual.tower,
  ],
  [
    "Roofline study",
    "Roof & Property Inspections",
    "Property location",
    "Roof documentation",
    visual.roof,
  ],
];
const categories = [
  "All work",
  "Real Estate – Ground",
  "Real Estate – Drone",
  "Roof & Property Inspections",
  "Construction Progress",
  "Tower & Infrastructure",
  "Emergency & Disaster Damage Documentation",
  "Aerial Video",
  "General Aerial Photography",
];
const disaster = [
  "Aerial/Drone Documentation",
  "Ground Damage Documentation",
  "Storm Damage",
  "Flood/Water Damage",
  "Structural/Property Damage",
  "Debris & Site Conditions",
];
const fleet = [
  [
    "Surveyor One",
    "Inspection & documentation",
    "High-resolution still capture",
    "4K motion capture",
    "Close visual review",
    "Up to 40 minutes",
    visual.tower,
  ],
  [
    "Vista Cine",
    "Cinematic media",
    "Wide-angle visual storytelling",
    "4K cinematic capture",
    "Location overview",
    "Up to 38 minutes",
    visual.city,
  ],
  [
    "Field Mapper",
    "Land & progress",
    "Consistent site perspectives",
    "4K documentation",
    "Repeatable flight routes",
    "Up to 45 minutes",
    visual.farm,
  ],
];

function go(path) {
  window.history.pushState({}, "", path);
  window.dispatchEvent(new PopStateEvent("popstate"));
}
function useDesktopMotionEnabled() {
  const reduced = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    const query = matchMedia("(min-width: 1024px)");
    const sync = () => setEnabled(query.matches && !reduced);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, [reduced]);
  return enabled;
}
function Link({ to, children, className = "", onClick }) {
  return (
    <a
      className={className}
      href={to}
      onClick={(e) => {
        if (to.startsWith("#")) return;
        e.preventDefault();
        onClick?.();
        window.dispatchEvent(
          new CustomEvent("dbd:navigate", {
            detail: { path: to, returnHome: to === "/" },
          }),
        );
      }}
      onPointerMove={(e) => {
        if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches)
          return;
        const box = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty(
          "--mx",
          `${(e.clientX - box.left - box.width / 2) * 0.12}px`,
        );
        e.currentTarget.style.setProperty(
          "--my",
          `${(e.clientY - box.top - box.height / 2) * 0.12}px`,
        );
      }}
      onPointerLeave={(e) => {
        e.currentTarget.style.setProperty("--mx", "0px");
        e.currentTarget.style.setProperty("--my", "0px");
      }}
    >
      {children}
    </a>
  );
}
function BrandLogo({ compact = false }) {
  return (
    <img
      className={compact ? "brand-logo compact" : "brand-logo"}
      src="/dream-big-drones-nav-logo.png"
      alt="Dream Big Drones by RLM official logo"
    />
  );
}
function Action({ to = "/contact", children, quiet = false, onClick }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`action ${quiet ? "action-quiet" : ""}`}
    >
      {children}
      <ArrowRight size={16} aria-hidden="true" />
    </Link>
  );
}

function Loader({ complete }) {
  const reduced = useReducedMotion();
  const desktopMotion = useDesktopMotionEnabled();
  if (!desktopMotion) return null;
  return (
    <AnimatePresence>
      {!complete && (
        <motion.div
          className="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: reduced ? 0.12 : 0.38 } }}
          aria-label="Loading Dream Big Drones"
        >
          <motion.img
            className="loader-art"
            src="/dream-big-drones-hero.png"
            alt=""
            initial={{ opacity: 0.68, scale: reduced ? 1 : 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: reduced ? 0.01 : 1.1 }}
          />
          <div className="loader-shade" />
          <motion.div
            className="loader-card"
            initial={{ opacity: 0, y: reduced ? 0 : 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduced ? 0.01 : 0.42 }}
          >
            <span>Dream Big Drones by RLM</span>
            <strong>Preparing your aerial perspective</strong>
            <motion.i
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: reduced ? 0.01 : 1.08, delay: 0.1 }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Header({ path }) {
  const [open, setOpen] = useState(false);
  const menuButtonRef = useRef(null);
  useEffect(() => {
    setOpen(false);
  }, [path]);
  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    const closeWithEscape = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    document.body.style.overflow = "hidden";
    addEventListener("keydown", closeWithEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      removeEventListener("keydown", closeWithEscape);
    };
  }, [open]);
  const closeMenu = () => setOpen(false);
  return (
    <header className="site-header">
      <Link to="/" className="logo-link" onClick={closeMenu}>
        <BrandLogo />
      </Link>
      <button
        ref={menuButtonRef}
        className="menu-button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls="primary-nav"
      >
        {open ? <X /> : <Menu />}
        <span className="sr-only">Toggle menu</span>
      </button>
      <nav
        id="primary-nav"
        className={open ? "open" : ""}
        aria-label="Primary navigation"
        aria-hidden={!open && undefined}
      >
        {routes.map(([to, label]) => (
          <Link
            key={to}
            to={to}
            onClick={closeMenu}
            className={path === to ? "active nav-link" : "nav-link"}
          >
            {label}
            {path === to && (
              <motion.i
                className="nav-travel"
                layoutId="nav-travel"
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              />
            )}
          </Link>
        ))}
        <Action to="/contact" onClick={closeMenu}>
          Request a quote
        </Action>
      </nav>
    </header>
  );
}
function Reveal({ children, delay = 0, className = "" }) {
  const desktopMotion = useDesktopMotionEnabled();
  if (!desktopMotion) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 22, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.16 }}
      transition={{ duration: 0.62, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
function HomeHero({ kicker, title, copy, children }) {
  const desktopMotion = useDesktopMotionEnabled();
  const content = (
    <>
      <p className="eyebrow">{kicker}</p>
      <h1 className="hero-headline">
        {title.split(" ").map((word, index) => (
          <span className="hero-word" key={`${word}${index}`}>
            {word}&nbsp;
          </span>
        ))}
      </h1>
      <p>{copy}</p>
      {children}
    </>
  );
  return (
    <section className="page-hero">
      <img
        className="hero-brand-art"
        src="/dream-big-drones-hero.png"
        alt="Dream Big Drones by RLM drone and world-imagery artwork"
        fetchPriority="high"
      />
      <div className="hero-shade" />
      {desktopMotion ? (
        <motion.div className="hero-copy" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}>{content}</motion.div>
      ) : <div className="hero-copy">{content}</div>}
      <p className="hero-caption">
        Dream Big Drones <i>by RLM</i>
      </p>
    </section>
  );
}
function PageMasthead({ kicker, title, copy, image, index }) {
  const desktopMotion = useDesktopMotionEnabled();
  return (
    <section className="page-masthead">
      <div className="masthead-copy">
        <span className="masthead-index" aria-hidden="true">{index}</span>
        <p className="eyebrow">{kicker}</p>
        <h1>{title}</h1>
        <p>{copy}</p>
      </div>
      {desktopMotion ? <motion.img src={image} alt="Aerial project context" initial={{ opacity: 0, scale: 1.05 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} /> : <img src={image} alt="Aerial project context" />}
    </section>
  );
}
function SectionHead({ eyebrow, title, copy }) {
  return (
    <div className="section-head">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {copy && <p>{copy}</p>}
    </div>
  );
}
function FlightRoute({ label = "Flight route" }) {
  return (
    <div className="flight-route" aria-hidden="true">
      <span>{label}</span>
      <svg viewBox="0 0 1200 180" preserveAspectRatio="none">
        <path className="flight-route-base" d="M0 126 C150 18 262 184 424 92 S693 20 804 102 S1026 158 1200 46" />
        <path className="flight-route-draw" d="M0 126 C150 18 262 184 424 92 S693 20 804 102 S1026 158 1200 46" />
        <circle className="flight-route-origin" cx="0" cy="126" r="7" />
        <circle className="flight-route-waypoint" cx="0" cy="126" r="5" />
        <circle className="flight-route-destination" cx="1200" cy="46" r="7" />
      </svg>
    </div>
  );
}
function TelemetryLine() {
  return (
    <svg className="telemetry-line" viewBox="0 0 600 80" preserveAspectRatio="none" aria-hidden="true">
      <path className="telemetry-base" d="M0 52 H72 L105 22 L138 56 L203 36 L256 58 L322 16 L365 49 L432 28 L494 55 H600" />
      <path className="telemetry-draw" d="M0 52 H72 L105 22 L138 56 L203 36 L256 58 L322 16 L365 49 L432 28 L494 55 H600" />
    </svg>
  );
}
function Footer() {
  return (
    <footer className="site-footer">
      <div>
        <div className="footer-logo">
          <BrandLogo />
        </div>
        <p>
          Elevated visual documentation, imagery, and aerial
          storytelling—planned around the job in front of you.
        </p>
      </div>
      <div>
        <b>Explore</b>
        {routes.slice(1).map(([to, name]) => (
          <Link key={to} to={to}>
            {name}
          </Link>
        ))}
      </div>
      <div>
        <b>Quick contact</b>
        <p>
          Ready to discuss a project? Share the location, desired coverage, and
          timing.
        </p>
        <Action to="/contact">Start an inquiry</Action>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Dream Big Drones by RLM</span>
        <span>Privacy Policy · Terms of Use · Sitemap</span>
      </div>
    </footer>
  );
}

function Home() {
  return (
    <>
      <HomeHero
        kicker="Aerial services by RLM"
        title="Global vision. Grounded execution."
        copy="A premium aerial partner for visual storytelling, property documentation, inspections, and the work that needs a clearer point of view."
      >
        <div className="hero-actions">
          <Action to="/solutions">Explore solutions</Action>
          <Action to="/portfolio" quiet>
            View portfolio
          </Action>
        </div>
      </HomeHero>
      <Reveal>
        <section className="showcase">
          <div>
            <p className="eyebrow">Featured visual showcase</p>
            <h2>See the site before anyone steps onto it.</h2>
            <p>
              Purposeful aerial work gives a project its scale, setting, and
              story in a single glance.
            </p>
            <Action to="/portfolio" quiet>
              Explore selected work
            </Action>
          </div>
          <img src={visual.coast} alt="Aerial coastline with blue water" />
        </section>
      </Reveal>
      <section className="section">
        <Reveal>
          <SectionHead
            eyebrow="Featured solutions"
            title="Work built for the view that matters."
          />
        </Reveal>
        <div className="solution-grid">
          {solutionData.slice(0, 3).map((item, index) => (
            <Reveal key={item[0]} delay={index * 0.09}>
              <SolutionCard item={item} />
            </Reveal>
          ))}
        </div>
      </section>
      <section className="proof-strip">
        {[
          [
            "01",
            "Plan with clarity",
            "We align the location, conditions, and deliverables before takeoff.",
          ],
          [
            "02",
            "Capture with purpose",
            "Every flight is shaped around the decision the work must support.",
          ],
          [
            "03",
            "Deliver with context",
            "Organized visual files prepared for the way your team will use them.",
          ],
        ].map(([no, title, text], index) => (
          <Reveal key={no} delay={index * 0.1}>
            <article>
              <span>{no}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          </Reveal>
        ))}
      </section>
      <FlightRoute label="Flight plan · 01 / 03" />
      <Reveal>
        <section className="section cta-band">
          <SectionHead
            eyebrow="Start with the brief"
            title="Have a project on the horizon?"
            copy="Tell us where it is, what needs to be captured, and what the finished work needs to accomplish."
          />
          <Action>Request a quote</Action>
        </section>
      </Reveal>
    </>
  );
}
function SolutionCard({ item }) {
  return (
    <article className="solution-card">
      <img src={item[4]} alt="" loading="lazy" />
      <div>
        <p className="eyebrow">{item[2]}</p>
        <h3>{item[0]}</h3>
        <p>{item[1]}</p>
        <small>{item[3]}</small>
        <Action to="/contact" quiet>
          Discuss this service
        </Action>
      </div>
    </article>
  );
}
function Solutions() {
  return (
    <>
      <PageMasthead
        index="01"
        kicker="Solutions"
        title="Aerial capability, shaped to the work."
        copy="A considered set of drone and visual-documentation services designed to clarify a site, show progress, or tell a stronger location story."
        image={visual.road}
      />
      <section className="section">
        <Reveal>
          <SectionHead
            eyebrow="Service library"
            title="A clear brief. A precise visual answer."
          />
        </Reveal>
        <div className="solution-grid all-solutions">
          {solutionData.map((item, index) => (
            <Reveal key={item[0]} delay={(index % 3) * 0.08}>
              <SolutionCard item={item} />
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
function Fleet() {
  return (
    <>
      <PageMasthead
        index="02"
        kicker="Drone fleet"
        title="The right platform for a confident perspective."
        copy="Aircraft details shown here are editable placeholders until final fleet specifications are supplied. Each card keeps the essential operational conversation easy to compare."
        image={visual.tower}
      />
      <section className="section">
        <Reveal>
          <SectionHead
            eyebrow="Aircraft library"
            title="Purpose-built capability."
          />
        </Reveal>
        <div className="fleet-grid">
          {fleet.map((drone, index) => (
            <Reveal key={drone[0]} delay={index * 0.1}>
              <FleetCard drone={drone} />
            </Reveal>
          ))}
        </div>
        <TelemetryLine />
      </section>
    </>
  );
}
function FleetCard({ drone }) {
  const [open, setOpen] = useState(false);
  return (
    <article className="fleet-card">
      <img src={drone[6]} alt="" loading="lazy" />
      <div>
        <p className="eyebrow">{drone[1]}</p>
        <h3>{drone[0]}</h3>
        <dl>
          <div>
            <dt>Camera</dt>
            <dd>{drone[2]}</dd>
          </div>
          <div>
            <dt>Video</dt>
            <dd>{drone[3]}</dd>
          </div>
          <div>
            <dt>Inspection</dt>
            <dd>{drone[4]}</dd>
          </div>
          <div>
            <dt>Flight time</dt>
            <dd>{drone[5]}</dd>
          </div>
        </dl>
        <button
          className="text-button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
        >
          Technical details{" "}
          <ChevronDown className={open ? "rotated" : ""} size={17} />
        </button>
        {open && (
          <p className="specs">
            Editable placeholder: final aircraft model, sensor configuration,
            operational limits, and safety features will be confirmed with the
            fleet owner.
          </p>
        )}
      </div>
    </article>
  );
}
function Portfolio() {
  const [filter, setFilter] = useState("All work");
  const [modal, setModal] = useState(null);
  const gridRef = useRef(null);
  const list =
    filter === "All work"
      ? projects
      : projects.filter(
          (p) =>
            p[1] === filter ||
            (filter === "Emergency & Disaster Damage Documentation" &&
              disaster.includes(p[1])),
        );
  const changeFilter = async (next) => {
    if (next === filter) return;
    if (innerWidth < 1024 || matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setFilter(next);
      return;
    }
    const { flipAfterLayout } = await import("./DesktopMotion");
    flipAfterLayout(gridRef.current, () => setFilter(next));
  };
  useEffect(() => {
    const esc = (e) => e.key === "Escape" && setModal(null);
    addEventListener("keydown", esc);
    return () => removeEventListener("keydown", esc);
  }, []);
  return (
    <>
      <PageMasthead
        index="03"
        kicker="Portfolio"
        title="A portfolio designed for the details that change the story."
        copy="Filter by assignment, then open a project to review its visual brief, location context, and intended deliverables."
        image={visual.coast}
      />
      <section className="section portfolio">
        <Reveal>
          <SectionHead eyebrow="Selected work" title="Browse by assignment." />
          <div className="filters" aria-label="Portfolio filters">
            {categories.map((cat) => (
              <button
                key={cat}
                className={filter === cat ? "selected" : ""}
                onClick={() => changeFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </Reveal>
        {filter === "Emergency & Disaster Damage Documentation" && (
          <div className="subfilters">
            {disaster.map((sub) => (
              <button key={sub} onClick={() => changeFilter(sub)}>
                {sub}
              </button>
            ))}
          </div>
        )}
        <div className="project-grid" ref={gridRef}>
          {list.map((project, index) => (
            <Reveal key={`${project[0]}${index}`} delay={(index % 4) * 0.07}>
              <button
                className="project-card"
                onClick={() => setModal(project)}
              >
                <img
                  src={project[4]}
                  alt={`${project[0]} project`}
                  loading="lazy"
                />
                <span>{project[1]}</span>
                <strong>{project[0]}</strong>
                <i>{project[3]}</i>
                <ArrowRight className="project-arrow" size={18} aria-hidden="true" />
              </button>
            </Reveal>
          ))}
        </div>
        {!list.length && (
          <div className="empty">
            <Search />
            <h3>No matching projects yet.</h3>
            <button onClick={() => changeFilter("All work")}>
              Reset filters
            </button>
          </div>
        )}
      </section>
      <AnimatePresence>
        {modal && (
          <ProjectModal project={modal} onClose={() => setModal(null)} />
        )}
      </AnimatePresence>
    </>
  );
}
function ProjectModal({ project, onClose }) {
  return (
    <motion.div
      className="modal-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onMouseDown={onClose}
    >
      <motion.article
        className="project-modal"
        initial={{ y: 24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 24, opacity: 0 }}
        onMouseDown={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={project[0]}
      >
        <button className="modal-close" onClick={onClose}>
          <X />
          <span className="sr-only">Close project</span>
        </button>
        <img src={project[4]} alt="" />
        <div>
          <p className="eyebrow">{project[1]}</p>
          <h2>{project[0]}</h2>
          <p>
            {project[2]} · {project[3]}
          </p>
          <p>
            This is a structured portfolio placeholder ready for final project
            imagery, title, location details, scope, and approved deliverable
            notes.
          </p>
          <Action>Discuss a similar project</Action>
        </div>
      </motion.article>
    </motion.div>
  );
}
function Support() {
  const questions = [
    [
      "How do I schedule a flight?",
      "Start with a brief describing the location, requested service, deliverables, and timing. We will then confirm the right next step.",
    ],
    [
      "How are files delivered?",
      "Final delivery details are planned with each project so the files arrive in a useful, organized format.",
    ],
    [
      "Can I request revisions?",
      "Tell us what needs adjustment in the project brief. Revision expectations are agreed before delivery.",
    ],
    [
      "What should a support inquiry include?",
      "Include the project name, delivery context, and the change or question that needs attention.",
    ],
  ];
  return (
    <>
      <PageMasthead
        index="04"
        kicker="Service & support"
        title="A clear path from first brief to final handoff."
        copy="The working process stays practical: plan the capture, make the flight, organize the files, and keep communication easy when the project needs follow-up."
        image={visual.build}
      />
      <section className="support-grid section">
        <Reveal>
          <div>
            <SectionHead
              eyebrow="Service desk"
              title="Support that respects the project timeline."
            />
            <ul className="support-list">
              <li>
                <Check />
                Scheduling around project needs
              </li>
              <li>
                <Check />
                Clear file-delivery handoff
              </li>
              <li>
                <Check />
                Revision and support route
              </li>
            </ul>
            <Action>Contact support</Action>
          </div>
          <FlightRoute label="Support route · 01 / 04" />
        </Reveal>
        <Reveal delay={0.1}>
          <Faq questions={questions} />
        </Reveal>
      </section>
    </>
  );
}
function Faq({ questions }) {
  const [open, setOpen] = useState(0);
  return (
    <div className="faq">
      {questions.map(([q, a], i) => (
        <article key={q}>
          <button
            onClick={() => setOpen(open === i ? -1 : i)}
            aria-expanded={open === i}
          >
            {q}
            <ChevronDown className={open === i ? "rotated" : ""} />
          </button>
          <AnimatePresence>
            {open === i && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
              >
                {a}
              </motion.p>
            )}
          </AnimatePresence>
        </article>
      ))}
    </div>
  );
}
function About() {
  return (
    <>
      <PageMasthead
        index="05"
        kicker="About Dream Big Drones"
        title="A more thoughtful view of every site."
        copy="Dream Big Drones by RLM brings a client-focused aerial approach to property, documentation, media, and location-led storytelling."
        image={visual.farm}
      />
      <section className="about-grid section">
        <Reveal>
          <img
            src={visual.city}
            alt="City from an elevated perspective"
            loading="lazy"
          />
        </Reveal>
        <Reveal delay={0.1}>
          <div>
            <SectionHead
              eyebrow="Our approach"
              title="Prepared, precise, and easy to work with."
            />
            <p>
              Each project begins with the purpose behind the visual request—not
              an off-the-shelf package. The workflow stays attentive to quality,
              conditions, safety, and the people who need to use the finished
              work.
            </p>
            <div className="principles">
              <p>
                <b>01 · Mission</b> Make the aerial perspective practical,
                beautiful, and clear.
              </p>
              <p>
                <b>02 · Quality</b> Give the final frame enough context to earn
                attention.
              </p>
              <p>
                <b>03 · Flexibility</b> Shape the flight plan around the
                project, not the other way around.
              </p>
            </div>
            <FlightRoute label="Mission route · 01 / 03" />
          </div>
        </Reveal>
      </section>
    </>
  );
}
function Contact() {
  return (
    <>
      <PageMasthead
        index="06"
        kicker="Contact & project intake"
        title="Tell us what needs a better view."
        copy="Share the location, scope, and timing. The detailed project intake helps us begin with the right questions."
        image={visual.roof}
      />
      <section id="intake" className="contact-layout section">
        <Reveal>
          <div>
            <SectionHead
              eyebrow="Project intake"
              title="A useful brief makes the best first flight."
            />
            <p>
              For multi-site or portfolio work, include the approximate total
              site count. Tell us whether you need photos, video, 3D models,
              thermal imaging, mapping, or another deliverable.
            </p>
            <div className="contact-note">
              <Send />
              <p>
                Fields marked required are needed to prepare a response. Your
                details are not displayed publicly.
              </p>
            </div>
            <FlightRoute label="Intake route · 01 / 01" />
          </div>
        </Reveal>
        <Reveal delay={0.12}>
          <ContactForm />
        </Reveal>
      </section>
    </>
  );
}

function App() {
  const [path, setPath] = useState(location.pathname);
  const [loading, setLoading] = useState(true);
  const [desktopMotion, setDesktopMotion] = useState(false);
  const rootRef = useRef(null);
  const overlayRef = useRef(null);
  const routeLogoRef = useRef(null);
  const reduced = useReducedMotion();
  useEffect(() => {
    const query = matchMedia("(min-width: 1024px)");
    const sync = () => setDesktopMotion(query.matches && !reduced);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, [reduced]);
  useEffect(() => {
    const update = () => {
      setPath(location.pathname);
      scrollTo({ top: 0, behavior: "instant" });
    };
    addEventListener("popstate", update);
    const timer = setTimeout(() => setLoading(false), 1250);
    return () => {
      removeEventListener("popstate", update);
      clearTimeout(timer);
    };
  }, []);
  useEffect(() => {
    const navigate = (event) => {
      const next = event.detail?.path;
      if (!next || next === path) return;
      if (reduced || innerWidth < 1024) {
        go(next);
        return;
      }
      import("./DesktopMotion").then(({ runRouteTransition }) =>
        runRouteTransition({
          overlay: overlayRef.current,
          logo: routeLogoRef.current,
          next: () => go(next),
          returnHome: event.detail?.returnHome,
        }),
      );
    };
    addEventListener("dbd:navigate", navigate);
    return () => removeEventListener("dbd:navigate", navigate);
  }, [path, reduced]);
  useEffect(() => {
    const name = routes.find(([route]) => route === path)?.[1] ?? "Home";
    document.title =
      name === "Home"
        ? "Dream Big Drones by RLM"
        : `${name} | Dream Big Drones by RLM`;
  }, [path]);
  const pages = {
    "/": <Home />,
    "/solutions": <Solutions />,
    "/fleet": <Fleet />,
    "/portfolio": <Portfolio />,
    "/support": <Support />,
    "/about": <About />,
    "/contact": <Contact />,
  };
  return (
    <div ref={rootRef}>
      {desktopMotion && (
        <Suspense fallback={null}>
          <DesktopMotion rootRef={rootRef} path={path} />
        </Suspense>
      )}
      <Loader complete={!loading} />
      <div className="flight-overlay" ref={overlayRef} aria-hidden="true">
        <div className="route-line" />
        <img ref={routeLogoRef} src="/dream-big-drones-nav-logo.png" alt="" />
      </div>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header path={path} />
      <main id="main" tabIndex="-1">
        {pages[path] || <Home />}
      </main>
      <Footer />
    </div>
  );
}
export default App;
