import { ArrowDownRight, ArrowUpRight, Check, ChevronDown, Mail, Menu, Play, Quote, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { AnimatePresence, MotionConfig, motion, useReducedMotion } from 'motion/react'
import { Button } from './components/ui/button'
import { ContactForm } from './components/ContactForm'
import './App.css'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const proofPoints = [
  {
    label: 'Project direction',
    title: 'Every frame begins with the place.',
    text: 'We shape the shot list around the setting, the light, and the story the finished work needs to tell.',
  },
  {
    label: 'Flight planning',
    title: 'A considered plan before takeoff.',
    text: 'The route, timing, and deliverables are aligned before the drone leaves the ground.',
  },
  {
    label: 'Final handoff',
    title: 'Made to live beyond the flight.',
    text: 'Stills and motion are prepared for the way your project will actually be shared and remembered.',
  },
]

const galleryPlaceholders = [
  {
    title: 'The long way home',
    label: 'Selected work · Aerial landscape',
    copy: 'A wide aerial study of route, scale, and the quiet geometry of the landscape.',
    image:
      'https://images.unsplash.com/photo-1476231682828-37e571bc172f?auto=format&fit=crop&w=1800&q=85',
    alt: 'Aerial view of a road surrounded by green trees',
  },
  {
    title: 'Edge of blue',
    label: 'Selected work · Coastal study',
    copy: 'A coastal perspective built for place-led stories and quiet, editorial detail.',
    image:
      'https://images.unsplash.com/photo-1506472634167-c6776cd44d07?auto=format&fit=crop&w=1600&q=85',
    alt: 'Aerial view of the seashore during daylight',
  },
  {
    title: 'Lines in the land',
    label: 'Selected work · Golden-hour terrain',
    copy: 'A warm landscape frame that leaves room for the scale and texture of a location.',
    image:
      'https://images.unsplash.com/photo-1518098268026-4e89f1a2cd8e?auto=format&fit=crop&w=2000&q=85',
    alt: 'Road between green fields and mountains at golden hour',
  },
]

const services = [
  {
    title: 'Aerial photography',
    text: 'Clean, polished stills for homes, venues, land, architecture, and promotional use.',
  },
  {
    title: 'Drone video',
    text: 'Short-form motion content shaped for launches, events, walkthroughs, and storytelling.',
  },
  {
    title: 'Custom flight planning',
    text: 'A tailored pre-flight process that aligns weather, light, safety, and your shot goals.',
  },
]

const deliverables = [
  ['Edited stills', 'A concise, color-finished image set ready for web, print, and social.'],
  ['Short-form video', 'Cinematic motion selects shaped for the channels where the story will live.'],
  ['Clear timeline', 'A delivery plan agreed before flight, so the handoff matches your launch.'],
  ['Usage-ready files', 'Organized exports that are simple to share with your team, venue, or client.'],
]

const process = [
  'Share the location, timing, and the feeling you want the final visuals to create.',
  'We map the right flight plan, deliverables, and a custom quote for your project.',
  'Your final photos or video are delivered in a clean, professional handoff.',
]

const faqs = [
  [
    'How does pricing work?',
    'Pricing is custom for every project. The quote is shaped by location, deliverables, flight complexity, scheduling, and editing needs.',
  ],
  [
    'Can this stay one page while the gallery grows?',
    'Yes. The site is built as one cohesive page, and the placeholder gallery can be replaced with your real drone photography as you send it over.',
  ],
  [
    'How should Calendly be set up?',
    'Create a discovery-call event, connect your calendar, and send the booking link. Once you have that URL, it can replace the placeholder scheduling link on the site.',
  ],
]

const heroReveal = {
  hidden: { opacity: 0, y: 24, filter: 'blur(12px)' },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      delay,
      duration: 0.82,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
}

const navigation = [
  ['home', 'Home'],
  ['about', 'About'],
  ['services', 'Services'],
  ['portfolio', 'Portfolio'],
  ['contact', 'Contact'],
]

function BrandLogo({ className = '', mark = false, alt = 'Dream Big Drones by RLM' }) {
  return <img className={`brand-logo ${className}`} src={mark ? '/dream-big-drones-mark.png' : '/dream-big-drones-logo.png'} alt={alt} />
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeFaq, setActiveFaq] = useState(0)
  const [isLoading, setIsLoading] = useState(() => window.innerWidth >= 768)
  const [hasScrolled, setHasScrolled] = useState(false)
  const [isMobileViewport, setIsMobileViewport] = useState(() => window.innerWidth < 768)
  const [activeSection, setActiveSection] = useState('home')

  const rootRef = useRef(null)
  const galleryCursorRef = useRef(null)
  const prefersReducedMotion = useReducedMotion()

  const showGalleryCursor = (event) => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    const cursor = galleryCursorRef.current
    if (!cursor) return
    cursor.classList.add('gallery-cursor--visible')
    cursor.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0) translate(-50%, -50%)`
  }

  const moveGalleryCursor = (event) => {
    const cursor = galleryCursorRef.current
    if (!cursor) return
    cursor.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0) translate(-50%, -50%)`
  }

  const hideGalleryCursor = () => galleryCursorRef.current?.classList.remove('gallery-cursor--visible')

  const getSectionScrollPosition = (target) => {
    const headerHeight = document.querySelector('.site-header--clean')?.offsetHeight ?? 64
    const breathingRoom = window.innerWidth < 768 ? 112 : 220
    return Math.max(0, target.getBoundingClientRect().top + window.scrollY - headerHeight - breathingRoom)
  }

  const navigateToSection = (event, id) => {
    event.preventDefault()
    const target = document.getElementById(id)
    if (!target) return
    window.history.pushState(null, '', `#${id}`)
    setActiveSection(id)
    window.scrollTo({ top: getSectionScrollPosition(target), behavior: 'smooth' })
    setMenuOpen(false)
  }

  const bookCall = (event) => {
    navigateToSection(event, 'contact')
    window.setTimeout(() => document.querySelector('.contact-callout')?.classList.add('contact-callout--emphasis'), 480)
    window.setTimeout(() => document.querySelector('.contact-callout')?.classList.remove('contact-callout--emphasis'), 1800)
  }

  useEffect(() => {
    if (!isLoading) return undefined
    const timer = window.setTimeout(() => setIsLoading(false), prefersReducedMotion ? 250 : 1800)
    return () => window.clearTimeout(timer)
  }, [isLoading, prefersReducedMotion])

  useEffect(() => {
    if (isLoading) return undefined
    const targetId = window.location.hash.slice(1)
    if (!navigation.some(([id]) => id === targetId)) return undefined
    const frame = window.requestAnimationFrame(() => {
      const target = document.getElementById(targetId)
      if (target) window.scrollTo({ top: getSectionScrollPosition(target), behavior: 'auto' })
    })
    return () => window.cancelAnimationFrame(frame)
  }, [isLoading])

  useEffect(() => {
    const updateHeader = () => setHasScrolled(window.scrollY > 12)
    updateHeader()
    window.addEventListener('scroll', updateHeader, { passive: true })
    return () => window.removeEventListener('scroll', updateHeader)
  }, [])

  useEffect(() => {
    const sections = navigation.map(([id]) => document.getElementById(id)).filter(Boolean)
    const updateActiveSection = () => {
      const headerHeight = document.querySelector('.site-header--clean')?.offsetHeight ?? 64
      const readingLine = window.scrollY + headerHeight + 60
      const current = sections.reduce((active, section) => (
        section.offsetTop <= readingLine ? section : active
      ), sections[0])
      if (current) setActiveSection(current.id)
    }

    const frame = window.requestAnimationFrame(updateActiveSection)
    window.addEventListener('scroll', updateActiveSection, { passive: true })
    window.addEventListener('hashchange', updateActiveSection)
    window.addEventListener('resize', updateActiveSection)
    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll', updateActiveSection)
      window.removeEventListener('hashchange', updateActiveSection)
      window.removeEventListener('resize', updateActiveSection)
    }
  }, [])

  useEffect(() => {
    const media = window.matchMedia('(max-width: 767px)')
    const updateViewport = () => setIsMobileViewport(media.matches)
    updateViewport()
    media.addEventListener('change', updateViewport)
    return () => media.removeEventListener('change', updateViewport)
  }, [])

  const simpleMotion = prefersReducedMotion || isMobileViewport
  const activeHeroReveal = simpleMotion
    ? {
        hidden: { opacity: 0, y: 14 },
        visible: (delay = 0) => ({ opacity: 1, y: 0, transition: { delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] } }),
      }
    : heroReveal

  useGSAP(
    () => {
      const scope = rootRef.current
      if (!scope) return undefined

      if (prefersReducedMotion) {
        gsap.set(scope.querySelectorAll('[data-reveal], [data-float]'), { clearProps: 'all' })
        gsap.set(scope.querySelector('.reading-progress__bar'), { scaleX: 1 })
        return undefined
      }

      const mm = gsap.matchMedia()

      const revealTargets = scope.querySelectorAll('[data-reveal], [data-route-step]')

      const mobileMotion = window.matchMedia('(max-width: 767px)').matches
      gsap.set(revealTargets, {
        opacity: 0,
        y: mobileMotion ? 14 : 34,
        filter: mobileMotion ? 'blur(0px)' : 'blur(14px)',
      })

      ScrollTrigger.batch(revealTargets, {
        start: 'top 84%',
        once: true,
        onEnter: (batch) => {
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: mobileMotion ? 0.52 : 0.9,
            ease: 'power3.out',
            stagger: mobileMotion ? 0.07 : 0.12,
            overwrite: true,
          })
        },
      })

      const progressBar = scope.querySelector('.reading-progress__bar')
      if (progressBar) {
        gsap.fromTo(
          progressBar,
          { scaleX: 0, transformOrigin: 'left center' },
          {
            scaleX: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: scope,
              start: 'top top',
              end: 'bottom bottom',
              scrub: 0.25,
            },
          },
        )
      }

      const routeLine = scope.querySelector('.process-route__line')
      if (routeLine) {
        gsap.fromTo(
          routeLine,
          { scaleY: 0, transformOrigin: 'top center' },
          {
            scaleY: 1,
            duration: 1.2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: '.process-clean',
              start: 'top 72%',
              once: true,
            },
          },
        )
      }

      gsap.to(scope.querySelectorAll('[data-float]'), {
        yPercent: -6,
        duration: 4.4,
        repeat: -1,
        yoyo: true,
        stagger: 0.35,
        ease: 'sine.inOut',
      })

      mm.add('(min-width: 768px)', () => {
        const heroVisual = scope.querySelector('.hero-visual-shell img')
        const foreground = scope.querySelector('.hero-foreground')
        const galleryMedia = scope.querySelectorAll('.gallery-media')

        if (heroVisual) {
          gsap.to(heroVisual, {
            yPercent: 8,
            ease: 'none',
            scrollTrigger: {
              trigger: '.hero',
              start: 'top top',
              end: 'bottom top',
              scrub: 1,
            },
          })
        }

        if (foreground) {
          gsap.to(foreground, {
            yPercent: -12,
            ease: 'none',
            scrollTrigger: {
              trigger: '.hero',
              start: 'top top',
              end: 'bottom top',
              scrub: 0.9,
            },
          })
        }

        galleryMedia.forEach((media, index) => {
          gsap.to(media, {
            yPercent: index === 1 ? 8 : -8,
            ease: 'none',
            scrollTrigger: {
              trigger: media.closest('.clean-card--gallery'),
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.7,
            },
          })
        })
      })

      ScrollTrigger.refresh()
      return () => mm.revert()
    },
    { scope: rootRef, dependencies: [prefersReducedMotion], revertOnUpdate: true },
  )

  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence>
        {isLoading ? (
          <motion.div
            key="cinematic-loader"
            className="cinematic-loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -72, filter: 'blur(8px)', transition: { duration: prefersReducedMotion ? 0.25 : 0.62, ease: [0.22, 1, 0.36, 1] } }}
            aria-label="Loading Dream Big Drones"
          >
            <div className="cinematic-loader__grain" aria-hidden="true" />
            <BrandLogo className="cinematic-loader__official-logo" />
            <svg className="cinematic-loader__flightpath" viewBox="0 0 1200 260" role="presentation" aria-hidden="true">
              <path className="cinematic-loader__path-base" d="M-40 172C240 42 432 232 650 162S996 86 1240 146" />
              <path className="cinematic-loader__path-trail" pathLength="1" d="M-40 172C240 42 432 232 650 162S996 86 1240 146" />
              <path className="cinematic-loader__path-draw" pathLength="1" d="M-40 172C240 42 432 232 650 162S996 86 1240 146" />
              <circle className="cinematic-loader__drone-point" r="5">
                {!prefersReducedMotion ? (
                  <animateMotion dur="1.72s" begin="0.18s" fill="freeze" path="M-40 172C240 42 432 232 650 162S996 86 1240 146" />
                ) : null}
              </circle>
            </svg>
            <div className="cinematic-loader__horizon" aria-hidden="true" />
          </motion.div>
        ) : null}
      </AnimatePresence>

      <div className="site-shell site-shell--clean" ref={rootRef}>
        <div className="reading-progress" aria-hidden="true">
          <div className="reading-progress__bar" />
        </div>
        <div ref={galleryCursorRef} className="gallery-cursor" aria-hidden="true">View project</div>

        <motion.header
          className={`site-header site-header--clean ${hasScrolled ? 'site-header--scrolled' : ''}`}
          initial={{ opacity: 0, y: -12, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.7, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
        >
          <a className="wordmark wordmark--clean" href="#top" aria-label="Dream Big Drones home">
            <BrandLogo />
          </a>

          <button
            className="menu-toggle"
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="site-navigation"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
            <span className="sr-only">Toggle navigation</span>
          </button>

          <nav id="site-navigation" className={menuOpen ? 'nav-open' : ''} aria-label="Main navigation">
            <BrandLogo mark className="mobile-nav-mark" alt="" />
            {navigation.map(([id, label]) => (
              <a key={id} href={`#${id}`} className={activeSection === id ? 'nav-link-active' : ''} onClick={(event) => navigateToSection(event, id)}>
                {label}
              </a>
            ))}
            <motion.div whileHover={prefersReducedMotion ? undefined : { y: -2 }} whileTap={{ scale: 0.985 }}>
              <Button asChild>
                <a href="#contact" onClick={bookCall}>
                  Book a call <ArrowUpRight size={15} />
                </a>
              </Button>
            </motion.div>
          </nav>
        </motion.header>

        <main id="top">
          <section id="home" className="hero hero--clean" aria-labelledby="hero-title">
            <motion.div className="hero-copy hero-copy--clean" initial="hidden" animate="visible">
              <motion.div className="hero-brand-anchor" variants={activeHeroReveal} custom={0.08}>
                <BrandLogo />
              </motion.div>
              <motion.h1 id="hero-title">
                <motion.span variants={activeHeroReveal} custom={0.18}>Elevated stories</motion.span>
                <motion.span variants={activeHeroReveal} custom={0.28}>for places worth remembering.</motion.span>
              </motion.h1>
              <motion.p className="hero-summary" variants={activeHeroReveal} custom={0.24}>
                Editorial aerial photo and motion for properties, gatherings, and local places with a point of view worth seeing from above.
              </motion.p>

              <motion.div className="hero-actions hero-actions--clean" variants={activeHeroReveal} custom={0.32}>
                <motion.div whileHover={prefersReducedMotion ? undefined : { y: -2 }} whileTap={{ scale: 0.985 }}>
                  <Button asChild>
                    <a href="#contact" onClick={bookCall}>
                      Book a discovery call <ArrowDownRight size={18} />
                    </a>
                  </Button>
                </motion.div>

                <motion.a
                  className="secondary-action"
                  href="#portfolio"
                  onClick={(event) => navigateToSection(event, 'portfolio')}
                  whileHover={prefersReducedMotion ? undefined : { x: 4 }}
                  whileTap={{ scale: 0.985 }}
                >
                  View selected work <Play size={16} />
                </motion.a>
              </motion.div>
            </motion.div>

            <motion.div
              className="hero-visual-shell"
              initial={{ opacity: 0, scale: simpleMotion ? 1 : 1.04, filter: simpleMotion ? 'blur(0px)' : 'blur(14px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              transition={{ delay: 0.2, duration: simpleMotion ? 0.5 : 1.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="hero-visual-frame">
                <img
                  src="https://images.unsplash.com/photo-1476231682828-37e571bc172f?auto=format&fit=crop&w=2200&q=90"
                  alt="Aerial view of a road running through dense green woodland"
                  fetchPriority="high"
                />
              </div>
            </motion.div>

            <div className="hero-foreground" />
          </section>

          <section id="about" className="about-section" aria-labelledby="about-title" data-reveal>
            <div className="about-intro">
              <div className="section-copy">
                <p className="kicker kicker--clean">About</p>
                <h2 id="about-title">A considered view from above.</h2>
                <p>Dream Big Drones creates editorial aerial imagery for properties, gatherings, local places, and brand stories—built around the character of a location and the feeling a finished frame should carry.</p>
              </div>
              <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1800&q=85" alt="Architectural building viewed from above" loading="lazy" />
            </div>
            <div className="flight-brief" aria-label="Dream Big Drones principles">
              {proofPoints.map((item, index) => (
                <article key={item.title} className="proof-point">
                  <span>0{index + 1} · {item.label}</span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
            <div className="process-list process-list--about">
              <div className="process-route" aria-hidden="true"><span className="process-route__line" /></div>
              {process.map((step) => (
                <div key={step} className="process-row" data-route-step>
                  <Check size={18} />
                  <p>{step}</p>
                </div>
              ))}
            </div>
          </section>

          <section id="services" className="services-clean" data-reveal>
            <div className="section-copy">
              <p className="kicker kicker--clean">Services</p>
              <h2>Simple, professional, and built around what the shoot needs.</h2>
            </div>

            <div className="services-grid">
              {services.map((service) => (
                <motion.article
                  key={service.title}
                  className="clean-card clean-card--service"
                  whileHover={prefersReducedMotion ? undefined : { y: -6 }}
                  transition={{ duration: 0.28, ease: 'easeOut' }}
                >
                  <h3>{service.title}</h3>
                  <p>{service.text}</p>
                </motion.article>
              ))}
            </div>
            <div className="deliverables" aria-labelledby="deliverables-title">
              <div className="deliverables-heading">
                <p className="kicker kicker--clean">What you receive</p>
                <p>Every project is quoted around location, scope, timing, and deliverables.</p>
              </div>
              <div className="deliverables-grid" id="deliverables-title">
                {deliverables.map(([title, text]) => (
                  <article key={title}>
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section id="portfolio" className="gallery-placeholders" aria-labelledby="portfolio-title" data-reveal>
            <div className="portfolio-heading">
              <p className="kicker kicker--clean">Portfolio</p>
              <h2 id="portfolio-title">Selected work, seen from above.</h2>
            </div>
            <div className="gallery-grid">
              {galleryPlaceholders.map((item, index) => (
                <motion.article
                  key={item.title}
                  className={`clean-card clean-card--gallery clean-card--gallery-${index + 1}`}
                  whileHover={prefersReducedMotion ? undefined : { y: -6 }}
                  transition={{ duration: 0.28, ease: 'easeOut' }}
                  onPointerEnter={showGalleryCursor}
                  onPointerMove={moveGalleryCursor}
                  onPointerLeave={hideGalleryCursor}
                >
                  <div className="gallery-media">
                    <img className="placeholder-media" src={item.image} alt={item.alt} />
                  </div>
                  <div className="gallery-card-content">
                    <span className="gallery-meta">{item.label}</span>
                    <h3>{item.title}</h3>
                    <p>{item.copy}</p>
                  </div>
                </motion.article>
              ))}
            </div>
          </section>

          <div className="testimonial" data-reveal aria-label="Client feedback">
            <Quote size={22} aria-hidden="true" />
            <p>Thoughtful direction, clear communication, and a finished image set that lets the place speak for itself.</p>
            <span>Client feedback is shown with approval as projects are released.</span>
          </div>

          <section className="questions-clean" data-reveal>
            <div className="section-copy">
              <p className="kicker kicker--clean">Questions</p>
              <h2>Answers that keep the first step clear.</h2>
            </div>

            <div className="faq-list faq-list--clean">
              {faqs.map(([question, answer], index) => {
                const open = index === activeFaq

                return (
                  <div key={question} className={`faq-item faq-item--clean ${open ? 'faq-open' : ''}`}>
                    <button type="button" onClick={() => setActiveFaq(open ? -1 : index)} aria-expanded={open}>
                      <span>{question}</span>
                      <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }}>
                        <ChevronDown size={18} />
                      </motion.span>
                    </button>
                    <AnimatePresence initial={false}>
                      {open ? (
                        <motion.div
                          className="faq-answer"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                        >
                          <p>{answer}</p>
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </div>
                )
              })}
            </div>
          </section>

          <section id="contact" className="booking-clean booking-clean--form" data-reveal aria-labelledby="contact-title">
            <div className="section-copy section-copy--booking">
              <p className="kicker kicker--clean">Start a conversation</p>
              <h2 id="contact-title">Tell us about the view.</h2>
              <p>
                Share a few details and we’ll respond with the right aerial approach for your project.
              </p>
              <div className="contact-callout" tabIndex="-1">
                <p className="kicker kicker--clean">Prefer to talk first?</p>
                <a className="secondary-action" href="https://calendly.com/YOUR-USERNAME/discovery-call" target="_blank" rel="noreferrer">Book a discovery call <ArrowUpRight size={16} /></a>
                <span>15-minute introductory call · Custom quote after we talk</span>
              </div>
            </div>
            <ContactForm />
            <div className="contact-details">
              <a href="mailto:hello@dreambigdrones.com"><Mail size={15} /> hello@dreambigdrones.com</a>
              <span>Instagram & Vimeo available on request</span>
              <span>Service area available on request</span>
            </div>
          </section>
        </main>

        <footer className="site-footer site-footer--clean">
          <div className="footer-main">
            <div className="footer-brand">
              <a className="footer-logo-frame" href="#top"><BrandLogo /></a>
              <p>Editorial aerial imagery for places, people, and stories close to home.</p>
            </div>
            <div className="footer-column">
              <span>Explore</span>
              <a href="#home">Home</a>
              <a href="#about">About</a>
              <a href="#services">Services</a>
              <a href="#portfolio">Portfolio</a>
              <a href="#contact">Contact</a>
            </div>
            <div className="footer-column">
              <span>Get in touch</span>
              <a href="mailto:hello@dreambigdrones.com"><Mail size={15} /> hello@dreambigdrones.com</a>
              <span>Instagram & Vimeo available on request</span>
              <span>Service location available on request</span>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} Dream Big Drones by RLM</span>
            <a href="#top" className="back-top">Back to top <ArrowUpRight size={15} /></a>
          </div>
        </footer>
      </div>
    </MotionConfig>
  )
}

export default App
