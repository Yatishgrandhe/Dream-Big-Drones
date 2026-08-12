import {
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  Camera,
  Check,
  ChevronDown,
  Download,
  FolderCheck,
  Globe,
  Handshake,
  HardHat,
  House,
  Lightbulb,
  Map,
  MapPin,
  Menu,
  MessageCircle,
  Search,
  SearchCheck,
  Send,
  ShieldCheck,
  Scale,
  X,
} from "lucide-react";
import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ContactForm } from "./components/ContactForm";
import { MastheadImageReveal } from "./MastheadImageReveal";
import { PortfolioRouteGallery } from "./PortfolioRouteGallery";
import "./App.css";
import "./RouteMasthead.css";
import "./BrandArtwork.css";
import "./FlightMotion.css";
import "./HeaderSizing.css";
import "./AerialInstruments.css";

const DesktopMotion = lazy(() => import("./DesktopMotion"));
const navigationLogoSrc = "/dream-big-drones-nav-logo.png?v=20260812";

const routes = [
  ["/", "Home"],
  ["/solutions", "Solutions"],
  ["/fleet", "Drone Fleet"],
  ["/portfolio", "Portfolio"],
  ["/support", "Service & Support"],
  ["/about", "About Us"],
  ["/contact", "Contact"],
];
const primaryRoutes = [
  ["/", "Home"],
  ["/about", "About Us"],
  ["/solutions", "Services"],
  ["/portfolio", "Portfolio"],
  ["/contact", "Contact"],
];
const professionalCredentials = [
  "FAA Part 107 Remote Pilot Certificate",
  "North Carolina Licensed Insurance Adjuster",
  "OSHA Authorized Safety & Construction Trainer: 10-Hour & 30-Hour",
  "Property Inspection, Insurance & Risk Assessment Experience",
  "Compliance & Regulatory Experience",
  "FEMA Disaster Housing Inspection Experience",
];
const technologyCapabilities = [
  "AI & Digital Productivity Tools",
  "Drone Imaging & Aerial Data Collection",
  "Digital Property & Damage Documentation",
];
const coreValues = [
  ["Respect & Professionalism", "We treat every client, property, community, and project with respect. Professional communication, reliability, confidentiality, and responsible operations are central to how we conduct business.", Handshake],
  ["Inclusive Service", "We welcome clients from all backgrounds and communities and are committed to providing every client with fair, professional, and thoughtful service.", Globe],
  ["Fair Pricing", "Professional drone services should provide real value without unnecessary or confusing costs. We are committed to competitive, transparent pricing based on the scope and requirements of each project.", Scale],
  ["Safety & Responsibility", "Safety is incorporated into every stage of our operations. We approach drone flights, property documentation, inspections, and project sites with careful planning and a commitment to responsible operating practices.", ShieldCheck],
  ["Integrity & Accountability", "We believe in doing business honestly. We communicate clearly about our capabilities, follow through on our commitments, and take responsibility for the quality of the services we provide.", BadgeCheck],
  ["Quality & Attention to Detail", "Every image, video, inspection assignment, and documentation project represents our work. We strive to provide clear, organized, professional results that clients can confidently use.", SearchCheck],
  ["Innovation With Purpose", "We embrace drone technology, digital tools, and artificial intelligence when they can improve efficiency, documentation, communication, and the client experience. Technology should make our services more useful, not unnecessarily complicated.", Lightbulb],
];

const image = (id, width = 1500) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=82`;
const visual = {
  homeShowcase: image("photo-1507525428034-b723cf961d3e", 1900),
  solutionRealEstate: image("photo-1600585154340-be6161a56a0c"),
  solutionAerial: image("photo-1470770841072-f978cf4d019e"),
  solutionVideo: image("photo-1519501025264-65ba15a82390"),
  solutionInspection: image("photo-1511818966892-d7d671e672a2"),
  solutionConstruction: image("photo-1541888946425-d81bb19240f5"),
  solutionInfrastructure: image("photo-1486325212027-8081e485255e"),
  solutionEmergency: image("photo-1527482797697-8795b05a13fe"),
  solutionAgriculture: image("photo-1469474968028-56623f02e42e"),
  solutionCommercial: image("photo-1511497584788-876760111969"),
  projectHarbor: image("photo-1501785888041-af3ef285b470"),
  projectConstruction: image("photo-1526498460520-4c246339dccb"),
  projectListing: image("photo-1482192505345-5655af888cc4"),
  projectLandscape: image("photo-1464822759023-fed622ff2c3b"),
  projectStorm: image("photo-1530789253388-582c481c54b0"),
  projectVideo: image("photo-1500530855697-b586d89ba3ee"),
  projectInfrastructure: image("photo-1497366754035-f200968a6e72"),
  projectRoof: image("photo-1518005020951-eccb494ad742"),
  fleetSurveyor: image("photo-1461696114087-397271a7aedc"),
  fleetVista: image("photo-1477959858617-67f85cf4f1df"),
  fleetMapper: image("photo-1444723121867-7a241cacace9"),
  mastheadSolutions: image("photo-1482192596544-9eb780fc7f66"),
  mastheadFleet: image("photo-1500534623283-312aade485b7"),
  mastheadPortfolio: image("photo-1526772662000-3f88f10405ff"),
  mastheadSupport: image("photo-1500534314209-a25ddb2bd429"),
  mastheadAbout: image("photo-1531058020387-3be344556be6"),
  aboutPerspective: image("photo-1487958449943-2429e8be8625"),
  aboutFieldwork: image("photo-1494522358652-f30e61a60313"),
  processBrief: image("photo-1556761175-b413da4baf72"),
  processPlan: image("photo-1516321318423-f06f85e504b3"),
  processSafety: image("photo-1531058020387-3be344556be6"),
  processCapture: image("photo-1500530855697-b586d89ba3ee"),
  processDelivery: image("photo-1497366754035-f200968a6e72"),
  mastheadContact: image("photo-1558618666-fcd25c85cd64"),
};
const processSteps = [
  ["01", "Tell Us About Your Project", "Tell us what you need, where the project is located, your preferred timeframe, and what you hope to accomplish. We’ll work with you to understand the scope and desired deliverables.", MessageCircle, visual.processBrief],
  ["02", "Plan the Mission", "We develop a flight and data-collection approach based on your project’s requirements. We consider the location, property or site conditions, requested imagery, project scope, scheduling, and other mission-specific factors.", MapPin, visual.processPlan],
  ["03", "Safety & Airspace Review", "Before takeoff, we evaluate applicable airspace requirements, weather conditions, site considerations, and potential flight restrictions. When required, appropriate FAA airspace authorization is obtained before operations begin.", ShieldCheck, visual.processSafety],
  ["04", "Capture & Document", "It’s time to fly. We conduct the mission and collect the aerial imagery, video, or project documentation requested. Our focus is on safe operations, quality imagery, attention to detail, and capturing information that supports your project’s goals.", Camera, visual.processCapture],
  ["05", "Review & Deliver", "After the mission, collected imagery and documentation are reviewed and organized according to the project scope. Your completed deliverables are then provided digitally, giving you convenient access to the information you need.", FolderCheck, visual.processDelivery],
];
const solutionData = [
  [
    "Real Estate Photography",
    "Editorial aerial and ground coverage for property marketing.",
    "Property launches, listings, developments",
    "Stills, aerial perspectives, detail selects",
    visual.solutionRealEstate,
  ],
  [
    "Aerial Photography",
    "A decisive viewpoint for landscapes, campaigns, and location stories.",
    "Land, hospitality, destination media",
    "Color-finished image collection",
    visual.solutionAerial,
  ],
  [
    "Aerial Video",
    "Purposeful motion that gives an audience a better sense of place.",
    "Walkthroughs, campaigns, events",
    "Short-form clips and hero footage",
    visual.solutionVideo,
  ],
  [
    "Roof & Property Inspections",
    "Clear visual documentation from safer vantage points.",
    "Roof conditions, property review",
    "High-resolution documentation",
    visual.solutionInspection,
  ],
  [
    "Construction Progress",
    "Consistent aerial records that make change easy to communicate.",
    "Project milestones, stakeholder updates",
    "Scheduled progress sets",
    visual.solutionConstruction,
  ],
  [
    "Tower & Infrastructure",
    "Visual context for difficult-to-reach infrastructure.",
    "Towers, utilities, industrial sites",
    "Inspection-ready visual sets",
    visual.solutionInfrastructure,
  ],
  [
    "Emergency Documentation",
    "Calm, organized evidence when conditions change quickly.",
    "Storm, flood, damage documentation",
    "Aerial and ground documentation",
    visual.solutionEmergency,
  ],
  [
    "Agriculture & Land Imaging",
    "A broad perspective for acreage, access, and land narratives.",
    "Farms, land, environmental context",
    "Mapped visual coverage",
    visual.solutionAgriculture,
  ],
  [
    "Commercial Media Production",
    "Aerial imagery designed to live within a complete story.",
    "Brands, venues, campaigns",
    "Photography and video selects",
    visual.solutionCommercial,
  ],
];
const homeServices = [
  [
    "Construction Site Monitoring",
    "Monitor construction progress from above. Track site development, verify milestones, and identify potential issues to keep projects on schedule and within budget.",
    visual.solutionConstruction,
    HardHat,
  ],
  [
    "Residential Real Estate Photography",
    "Showcase homes in their best light with aerial photography and videography that highlights property features, neighborhood appeal, and lifestyle.",
    visual.solutionRealEstate,
    House,
  ],
  [
    "Commercial Real Estate Photography",
    "High-quality aerial imagery and video that helps businesses, investors, and developers market commercial properties and attract the right opportunities.",
    visual.solutionCommercial,
    BriefcaseBusiness,
  ],
  [
    "Drone Inspection Services",
    "Safe, efficient, and cost-effective inspections for roofs, structures, towers, and hard-to-reach areas. Identify potential concerns with high-resolution aerial data.",
    visual.solutionInspection,
    ShieldCheck,
  ],
];
const projects = [
  [
    "Harbor line",
    "General Aerial Photography",
    "Coastal location",
    "Aerial stills",
    visual.projectHarbor,
  ],
  [
    "New site, new perspective",
    "Construction Progress",
    "Project location",
    "Progress documentation",
    visual.projectConstruction,
  ],
  [
    "Above the listing",
    "Real Estate – Drone",
    "Property location",
    "Property media",
    visual.projectListing,
  ],
  [
    "Working landscape",
    "Agriculture and Land Imaging",
    "Rural location",
    "Land imagery",
    visual.projectLandscape,
  ],
  [
    "After the weather",
    "Storm Damage",
    "Project location",
    "Damage documentation",
    visual.projectStorm,
  ],
  [
    "The route",
    "Aerial Video",
    "Regional location",
    "Cinematic motion",
    visual.projectVideo,
  ],
  [
    "Reach and review",
    "Tower & Infrastructure",
    "Site location",
    "Inspection imagery",
    visual.projectInfrastructure,
  ],
  [
    "Roofline study",
    "Roof & Property Inspections",
    "Property location",
    "Roof documentation",
    visual.projectRoof,
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
    visual.fleetSurveyor,
  ],
  [
    "Vista Cine",
    "Cinematic media",
    "Wide-angle visual storytelling",
    "4K cinematic capture",
    "Location overview",
    "Up to 38 minutes",
    visual.fleetVista,
  ],
  [
    "Field Mapper",
    "Land & progress",
    "Consistent site perspectives",
    "4K documentation",
    "Repeatable flight routes",
    "Up to 45 minutes",
    visual.fleetMapper,
  ],
];

function go(path) {
  window.history.pushState({}, "", path);
  window.dispatchEvent(new PopStateEvent("popstate"));
}
function normalizePath(pathname) {
  return pathname === "/" ? "/" : pathname.replace(/\/+$/, "");
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
function BrandLogo({ compact = false, navigation = false }) {
  return (
    <img
      className={compact ? "brand-logo compact" : "brand-logo"}
      src={navigation ? navigationLogoSrc : "/dream-big-drones-logo.png"}
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

function Loader({ complete, home }) {
  const reduced = useReducedMotion();
  const desktopMotion = useDesktopMotionEnabled();
  if (!desktopMotion || !home) return null;
  return (
    <AnimatePresence>
      {!complete && (
        <motion.div
          className="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: reduced ? 1 : 1.015, transition: { duration: reduced ? 0.12 : 0.28, ease: [0.4, 0, 0.2, 1] } }}
          role="status"
          aria-label="Preparing Dream Big Drones"
        >
          <div className="loader-grid" aria-hidden="true" />
          <motion.p
            className="loader-kicker"
            initial={{ opacity: 0, y: reduced ? 0 : -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduced ? 0.01 : 0.32, ease: [0.22, 1, 0.36, 1] }}
          >
            Dream Big Drones / RLM
          </motion.p>
          <motion.div
            className="loader-art-frame"
            initial={{ scale: reduced ? 1 : 1.018 }}
            animate={{ scale: 1 }}
            transition={{ duration: reduced ? 0.01 : 0.72, ease: [0.22, 1, 0.36, 1] }}
          >
            <img className="loader-art" src="/dream-big-drones-hero.png" alt="" />
            <div className="loader-shade" aria-hidden="true" />
          </motion.div>
          <motion.p
            className="loader-status"
            initial={{ opacity: 0, y: reduced ? 0 : 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduced ? 0.01 : 0.36, delay: reduced ? 0 : 0.38, ease: [0.22, 1, 0.36, 1] }}
          >
            Preparing a clearer view
          </motion.p>
          <svg className="loader-flight" viewBox="0 0 1200 240" fill="none" aria-hidden="true">
            <path className="loader-flight-base" d="M-20 174 C174 82 324 222 526 128 S852 26 1220 102" />
            <motion.path
              className="loader-flight-draw"
              d="M-20 174 C174 82 324 222 526 128 S852 26 1220 102"
              pathLength="1"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: reduced ? 0.01 : 0.72, delay: reduced ? 0 : 0.58, ease: [0.4, 0, 0.2, 1] }}
            />
          </svg>
          <motion.i
            className="loader-progress"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: reduced ? 0.01 : 0.84, delay: reduced ? 0 : 0.64, ease: [0.22, 1, 0.36, 1] }}
            aria-hidden="true"
          />
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
        <BrandLogo navigation />
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
        {primaryRoutes.map(([to, label]) => (
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
    <div className="hero-info-inner">
      <div className="hero-title-block">
        <p className="eyebrow">{kicker}</p>
        <h2 className="hero-headline">
          {title.split(" ").map((word, index) => (
            <span className="hero-word" key={`${word}${index}`}>
              {word}{" "}
            </span>
          ))}
        </h2>
      </div>
      <div className="hero-detail-block">
        <p>{copy}</p>
      </div>
      <div className="hero-actions">{children}</div>
    </div>
  );
  return (
    <section className="page-hero home-reference-hero">
      {desktopMotion ? (
        <motion.div className="hero-copy" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}>{content}</motion.div>
      ) : <div className="hero-copy">{content}</div>}
      <div className="home-hero-media">
        <img
          src={visual.homeShowcase}
          alt="Aerial view of a coastal city at sunset"
          fetchPriority="high"
        />
      </div>
    </section>
  );
}
function LegacyHomeHero() {
  return (
    <section className="legacy-home-hero" aria-labelledby="legacy-home-title">
      <img
        className="legacy-home-hero-art"
        src="/dream-big-drones-hero.png"
        alt="Dream Big Drones illustrated scene with a drone above a park and project destinations"
        fetchPriority="high"
      />
      <div className="legacy-home-hero-shade" aria-hidden="true" />
      <div className="legacy-home-hero-copy">
        <p className="eyebrow">Dream Big Drones by RLM</p>
        <h1 id="legacy-home-title">A clearer perspective starts here.</h1>
        <p>Thoughtful aerial imagery and documentation for the work ahead.</p>
        <Action to="/contact">Start a project</Action>
      </div>
    </section>
  );
}
function PageMasthead({ kicker, title, copy, image, revealImage = true, className = "", hideTitle = false }) {
  return (
    <section className={`page-masthead ${className}`}>
      <div className="masthead-copy">
        <p className={`eyebrow ${className ? `${className}-kicker` : ""}`}>{kicker}</p>
        {title && <h1 className={hideTitle ? "sr-only" : ""}>{title}</h1>}
        <p>{copy}</p>
      </div>
      {revealImage ? (
        <MastheadImageReveal src={image} alt="Aerial project context" />
      ) : (
        <div className="masthead-image-route masthead-image-static">
          <img src={image} alt="Aerial project context" />
        </div>
      )}
    </section>
  );
}
function SectionHead({ eyebrow, title, copy }) {
  return (
    <div className="section-head">
      <p className="eyebrow">{eyebrow}</p>
      {title && <h2>{title}</h2>}
      {copy && <p>{copy}</p>}
    </div>
  );
}
function CardSignal({ type = "route" }) {
  return (
    <svg className="card-signal" viewBox="0 0 80 80" fill="none" aria-hidden="true">
      {type === "scan" ? <><circle cx="40" cy="40" r="27" /><path d="M40 5V75M5 40H75" /><path className="card-signal-sweep" d="M40 40L67 24" /></> : <><path d="M6 64C23 14 50 78 74 16" /><circle cx="6" cy="64" r="3" /><circle cx="74" cy="16" r="3" /></>}
    </svg>
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
          storytelling, planned around the job in front of you.
        </p>
      </div>
      <div>
        <b>Explore</b>
        {primaryRoutes.slice(1).map(([to, name]) => (
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

function HomeServiceCard({ item: [title, copy, imageUrl, Icon] }) {
  return (
    <article className="home-service-card">
      <img src={imageUrl} alt="" loading="lazy" />
      <div className="home-service-card-copy">
        <Icon aria-hidden="true" />
        <div>
          <h3>{title}</h3>
          <p>{copy}</p>
        </div>
      </div>
    </article>
  );
}

function Home() {
  return (
    <>
      <LegacyHomeHero />
      <HomeHero
        kicker="Dream Big Drones by RLM"
        title="Your Vision. Captured from Above."
        copy="Professional drone imaging, aerial documentation, and visual solutions that help businesses see more, plan smarter, and achieve more."
      >
        <div className="hero-actions">
          <Action to="/portfolio">View our work</Action>
          <Action to="/solutions" quiet>
            Explore services
          </Action>
        </div>
      </HomeHero>
      <section className="section home-services">
        <Reveal>
          <SectionHead
            eyebrow="Our services"
            title="Work built for the view that matters."
          />
        </Reveal>
        <div className="home-service-grid">
          {homeServices.map((item, index) => (
            <Reveal key={item[0]} delay={index * 0.09}>
              <HomeServiceCard item={item} />
            </Reveal>
          ))}
        </div>
      </section>
      <section className="proof-strip home-proof-strip" aria-label="Project standards">
        {[
          [
            "01",
            "Plan with clarity",
            "We align the location, conditions, and deliverables before takeoff.",
            Map,
          ],
          [
            "02",
            "Capture with purpose",
            "Every flight is shaped around the decision the work must support.",
            Camera,
          ],
          [
            "03",
            "Deliver with context",
            "Organized visual files prepared for the way your team will use them.",
            Download,
          ],
        ].map(([no, title, text, Icon], index) => (
          <Reveal key={no} delay={index * 0.1}>
            <article>
              <span>{no}</span>
              <h3>{title}</h3>
              <p>{text}</p>
              <Icon aria-hidden="true" />
            </article>
          </Reveal>
        ))}
      </section>
      <Reveal>
        <section className="home-closing-callout">
          <div>
            <h2>Have a project on the horizon?</h2>
            <p>Tell us where it is, what needs to be captured, and what the finished work needs to accomplish.</p>
          </div>
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
      <CardSignal />
      <div>
        <p className="service-context">{item[2]}</p>
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
        kicker="Solutions"
        title="Aerial capability, shaped to the work."
        copy="A considered set of drone and visual-documentation services designed to clarify a site, show progress, or tell a stronger location story."
        image={visual.mastheadSolutions}
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
        kicker="Drone fleet"
        title="The right platform for a confident perspective."
        copy="Aircraft details shown here are editable placeholders until final fleet specifications are supplied. Each card keeps the essential operational conversation easy to compare."
        image={visual.mastheadFleet}
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
      <CardSignal type="scan" />
      <div>
        <p className="service-context">{drone[1]}</p>
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
  const modalTriggerRef = useRef(null);
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
  const closeModal = () => {
    setModal(null);
    requestAnimationFrame(() => modalTriggerRef.current?.focus());
  };
  return (
    <>
      <PageMasthead
        kicker="Portfolio"
        title="A portfolio designed for the details that change the story."
        copy="Filter by assignment, then open a project to review its visual brief, location context, and intended deliverables."
        image={visual.mastheadPortfolio}
        revealImage={false}
      />
      <PortfolioRouteGallery
        items={[
          { title: projects[0][0], category: projects[0][1], image: projects[0][4], alt: "Coastal aerial project" },
          { title: projects[1][0], category: projects[1][1], image: projects[1][4], alt: "Construction project from above" },
          { title: projects[4][0], category: projects[4][1], image: projects[4][4], alt: "Weather documentation project" },
        ]}
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
                onClick={(event) => {
                  modalTriggerRef.current = event.currentTarget;
                  setModal(project);
                }}
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
                <CardSignal />
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
          <ProjectModal project={modal} onClose={closeModal} />
        )}
      </AnimatePresence>
    </>
  );
}
function ProjectModal({ project, onClose }) {
  const closeButtonRef = useRef(null);
  const dialogRef = useRef(null);
  useEffect(() => {
    closeButtonRef.current?.focus();
    const handleKeydown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== "Tab") return;
      const focusable = dialogRef.current?.querySelectorAll(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (!focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    addEventListener("keydown", handleKeydown);
    return () => removeEventListener("keydown", handleKeydown);
  }, [onClose]);
  return (
    <motion.div
      className="modal-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onMouseDown={onClose}
    >
      <motion.article
        ref={dialogRef}
        className="project-modal"
        initial={{ y: 24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 24, opacity: 0 }}
        onMouseDown={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={project[0]}
      >
        <button ref={closeButtonRef} className="modal-close" onClick={onClose}>
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
        kicker="Service & support"
        title="A clear path from first brief to final handoff."
        copy="The working process stays practical: plan the capture, make the flight, organize the files, and keep communication easy when the project needs follow-up."
        image={visual.mastheadSupport}
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
        kicker="About Dream Big Drones"
        title="About Us"
        copy="Dream Big Drones by RLM brings a client-focused aerial approach to property, documentation, media, and location-led storytelling."
        image={visual.mastheadAbout}
        className="about-masthead"
        hideTitle
      />
      <section className="about-grid about-introduction section">
        <Reveal>
          <img
            src={visual.aboutPerspective}
            alt="City from an elevated perspective"
            loading="lazy"
          />
        </Reveal>
        <Reveal delay={0.1}>
          <div>
            <SectionHead
              eyebrow="01 / About Us"
            />
            <p>
              We provide professional drone imaging, aerial data collection,
              property documentation, and inspection support services designed
              to help businesses capture accurate visual information and make
              informed decisions.
            </p>
            <p>
              Our experience combines drone technology, property inspections,
              insurance, risk assessment, construction safety, compliance, and
              digital documentation. This multidisciplinary background allows
              us to understand both the technology being used and the real-world
              business needs behind the data being collected.
            </p>
          </div>
        </Reveal>
      </section>
      <section className="about-credentials">
        <div className="about-credentials-inner">
          <div className="about-credentials-title">
            <p className="eyebrow">02 / Professional Background, Licenses & Certifications</p>
          </div>
          <ul className="credential-list">
            {professionalCredentials.map((credential) => <li key={credential}>{credential}</li>)}
          </ul>
        </div>
        <div className="about-technology">
          <div>
            <p className="eyebrow">Technology & Innovation</p>
          </div>
          <ul>
            {technologyCapabilities.map((capability) => <li key={capability}>{capability}</li>)}
          </ul>
        </div>
      </section>
      <section className="about-project-value section">
        <Reveal>
          <SectionHead
            eyebrow="What We Bring to Your Project"
          />
        </Reveal>
        <Reveal delay={0.1}>
          <div className="about-project-value-copy">
            <p>
              Whether supporting property documentation, construction projects,
              insurance-related inspections, damage documentation, or other
              commercial needs, we focus on professionalism, safety, accurate
              documentation, and efficient data collection.
            </p>
            <p>
              We combine field experience with modern drone and digital
              technology to help clients document conditions, identify areas
              requiring attention, improve project visibility, and maintain
              reliable visual records.
            </p>
          </div>
        </Reveal>
      </section>
      <section className="about-values section">
        <Reveal>
          <SectionHead
            eyebrow="03 / Our Core Values"
            title="The principles behind the perspective."
            copy="Our values guide how we serve our clients, conduct our operations, and build lasting professional relationships."
          />
        </Reveal>
        <Reveal delay={0.1}>
          <div className="core-values-grid">
            {coreValues.map(([title, copy, Icon]) => (
              <article key={title}>
                <div className="core-value-icon" aria-hidden="true"><Icon /></div>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </Reveal>
      </section>
      <section className="about-process">
        <div className="about-process-inner">
          <Reveal>
            <div className="about-process-intro">
              <p className="eyebrow">04 / Our Process</p>
              <h2>From Your Vision to the View Above</h2>
              <p>
                Every project starts with understanding what you need. From property
                documentation and inspections to construction progress, aerial
                photography, and damage documentation, our process is designed to
                keep your project clear, safe, and organized from start to finish.
              </p>
            </div>
          </Reveal>
          <div className="process-route" aria-hidden="true">
            <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
              <path d="M 42 64 C 160 4, 240 116, 360 58 S 560 0, 680 62 S 880 120, 1000 56 S 1100 18, 1175 56" />
            </svg>
          </div>
          <div className="process-steps">
            {processSteps.map(([number, title, copy, Icon, imageSrc]) => (
              <Reveal key={number} delay={Number(number) * 0.04}>
                <article className="process-step">
                  <div className="process-icon" aria-hidden="true"><Icon /></div>
                  <p className="process-number">Step {number}</p>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                  <img src={imageSrc} alt="" loading="lazy" />
                </article>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.15}>
            <div className="process-quote">
              <div className="process-quote-mark" aria-hidden="true"><MapPin /></div>
              <div>
                <p className="eyebrow">Ready to Get Your Project Off the Ground?</p>
                <h2>Tell us about your project and we&apos;ll help determine the right approach for your aerial imaging or documentation needs.</h2>
              </div>
              <Action to="/contact">Get a quote</Action>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
function Contact() {
  return (
    <>
      <PageMasthead
        kicker="Contact & project intake"
        title="Tell us what needs a better view."
        copy="Share the location, scope, and timing. The detailed project intake helps us begin with the right questions."
        image={visual.mastheadContact}
      />
      <section id="intake" className="contact-layout section">
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
        </div>
        <ContactForm />
      </section>
    </>
  );
}

function NotFound() {
  return (
    <section className="not-found section">
      <p className="eyebrow">404 · Route not found</p>
      <h1>This flight path does not exist.</h1>
      <p>
        The address may have changed, or it may not be available. Return to
        the main site or tell us what you need.
      </p>
      <div className="hero-actions">
        <Action to="/">Return home</Action>
        <Action to="/contact" quiet>Start an inquiry</Action>
      </div>
    </section>
  );
}

function App() {
  const [path, setPath] = useState(normalizePath(location.pathname));
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
      setPath(normalizePath(location.pathname));
      scrollTo({ top: 0, behavior: "instant" });
    };
    addEventListener("popstate", update);
    const timer = setTimeout(() => setLoading(false), 1725);
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
    const name = routes.find(([route]) => route === path)?.[1] ?? "Page not found";
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
      <Loader complete={!loading} home={path === "/"} />
      <div className="flight-overlay" ref={overlayRef} aria-hidden="true">
        <div className="route-line" />
        <img ref={routeLogoRef} src={navigationLogoSrc} alt="" />
      </div>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header path={path} />
      <main id="main" tabIndex="-1">
        {pages[path] || <NotFound />}
      </main>
      <Footer />
    </div>
  );
}
export default App;
