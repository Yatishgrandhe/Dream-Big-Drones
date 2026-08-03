import { ArrowDownRight, ArrowUpRight, Check, ChevronDown, Menu, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { AnimatePresence, MotionConfig, motion, useReducedMotion } from 'motion/react'
import { Button } from './components/ui/button'
import './App.css'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const capabilities = [
  ['Aerial photography', 'Still images with a bigger point of view'],
  ['Cinematic video', 'Motion that gives your story room to move'],
  ['Custom flight plan', 'A shoot built around your place and goal'],
  ['Personal partnership', 'A thoughtful process from first call to delivery'],
]

const services = [
  {
    number: '01',
    title: 'Spaces with story',
    text: 'Property, architecture, venues, and destinations made more memorable from above.',
  },
  {
    number: '02',
    title: 'Moments in motion',
    text: 'Events and celebrations, captured with scale, feeling, and an eye for what matters.',
  },
  {
    number: '03',
    title: 'Brands that go farther',
    text: 'Aerial content that gives a launch, campaign, or team a more compelling frame.',
  },
]

const faqs = [
  [
    'What does the discovery call cover?',
    'We talk through your location, the footage you need, timing, and the feeling you want the final work to create.',
  ],
  [
    'How is pricing determined?',
    'Every project is custom. Quotes reflect location, scope, flight time, deliverables, and any creative planning required.',
  ],
  [
    'When should I schedule?',
    'Reach out as early as you can. A little room to plan means we can choose the best light, weather window, and flight approach.',
  ],
  [
    'Do you work with both individuals and businesses?',
    'Yes. Dream Big Drones works with homeowners, families, venues, real-estate professionals, and businesses with a story to tell.',
  ],
]

const heroVariants = {
  hidden: { opacity: 0, y: 28, filter: 'blur(12px)' },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      delay,
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeFaq, setActiveFaq] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  const rootRef = useRef(null)
  const heroRef = useRef(null)
  const heroBackdropRef = useRef(null)
  const capabilityRef = useRef(null)
  const prefersReducedMotion = useReducedMotion()

  const closeMenu = () => setMenuOpen(false)

  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoading(false), 1200)
    return () => window.clearTimeout(timer)
  }, [])

  useGSAP(
    () => {
      const scope = rootRef.current
      if (!scope) return undefined

      if (prefersReducedMotion) {
        gsap.set(scope.querySelectorAll('[data-reveal], [data-reveal-card], [data-float]'), {
          clearProps: 'all',
        })
        return undefined
      }

      const mm = gsap.matchMedia()

      gsap.set(scope.querySelectorAll('[data-reveal]'), {
        opacity: 0,
        y: 42,
        filter: 'blur(14px)',
      })

      gsap.set(scope.querySelectorAll('[data-reveal-card]'), {
        opacity: 0,
        y: 24,
        scale: 0.985,
      })

      ScrollTrigger.batch(scope.querySelectorAll('[data-reveal]'), {
        start: 'top 82%',
        once: true,
        onEnter: (batch) => {
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 0.9,
            ease: 'power3.out',
            stagger: 0.12,
            overwrite: true,
          })
        },
      })

      ScrollTrigger.batch(scope.querySelectorAll('[data-reveal-card]'), {
        start: 'top 88%',
        once: true,
        onEnter: (batch) => {
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.75,
            ease: 'power3.out',
            stagger: 0.09,
            overwrite: true,
          })
        },
      })

      mm.add('(min-width: 901px)', () => {
        if (heroBackdropRef.current) {
          gsap.to(heroBackdropRef.current, {
            yPercent: 10,
            scale: 1.08,
            ease: 'none',
            scrollTrigger: {
              trigger: heroRef.current,
              start: 'top top',
              end: 'bottom top',
              scrub: 1.1,
            },
          })
        }

        if (capabilityRef.current) {
          gsap.fromTo(
            capabilityRef.current,
            { y: 18, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.9,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: capabilityRef.current,
                start: 'top bottom-=80',
                once: true,
              },
            },
          )
        }
      })

      gsap.to(scope.querySelectorAll('[data-float]'), {
        yPercent: -7,
        xPercent: 1.5,
        duration: 4.8,
        repeat: -1,
        yoyo: true,
        stagger: 0.45,
        ease: 'sine.inOut',
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
            key="loader"
            className="flight-loader"
            aria-label="Loading Dream Big Drones"
            exit={{ opacity: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } }}
          >
            <div className="loader-mark">
              <span>Dream Big</span>
              <strong>Drones</strong>
            </div>
            <div className="loader-line" />
            <p>Preparing your point of view</p>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <div className="site-shell" ref={rootRef}>
        <motion.header
          className="site-header"
          initial={{ opacity: 0, y: -18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
        >
          <a className="wordmark" href="#top" onClick={closeMenu} aria-label="Dream Big Drones home">
            <span>Dream Big</span>
            <strong>Drones</strong>
            <em>by RLM</em>
          </a>

          <button
            className="menu-toggle"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="site-navigation"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
            <span className="sr-only">Toggle navigation</span>
          </button>

          <nav id="site-navigation" className={menuOpen ? 'nav-open' : ''} aria-label="Main navigation">
            <a href="#approach" onClick={closeMenu}>
              Approach
            </a>
            <a href="#services" onClick={closeMenu}>
              Services
            </a>
            <a href="#questions" onClick={closeMenu}>
              Questions
            </a>
            <motion.div whileHover={prefersReducedMotion ? undefined : { y: -2, scale: 1.01 }} whileTap={{ scale: 0.985 }}>
              <Button asChild variant="secondary">
                <a href="#booking" onClick={closeMenu}>
                  Start a project <ArrowUpRight size={15} />
                </a>
              </Button>
            </motion.div>
          </nav>
        </motion.header>

        <main id="top">
          <section className="hero" aria-labelledby="hero-title" ref={heroRef}>
            <div className="hero-backdrop hero-parallax" ref={heroBackdropRef}>
              <img
                src="/dream-big-drones-hero.png"
                width="1698"
                height="922"
                alt="Dream Big Drones artwork with drone, imagined destinations, and a city park setting"
              />
            </div>
            <div className="hero-scrim" />
            <div className="hero-atmosphere hero-atmosphere--one" data-float />
            <div className="hero-atmosphere hero-atmosphere--two" data-float />

            <motion.div className="hero-copy" initial="hidden" animate="visible">
              <motion.p className="kicker" variants={heroVariants} custom={0.2}>
                Aerial photo + video
              </motion.p>
              <motion.h1 id="hero-title" variants={heroVariants} custom={0.28}>
                See moment.
                <br />
                <i>Dream bigger.</i>
              </motion.h1>
              <motion.p variants={heroVariants} custom={0.38}>
                Dream Big Drones by RLM gives your biggest moments, places, and ideas the perspective they deserve.
              </motion.p>
              <motion.div className="hero-actions" variants={heroVariants} custom={0.48}>
                <motion.div whileHover={prefersReducedMotion ? undefined : { y: -3, scale: 1.01 }} whileTap={{ scale: 0.985 }}>
                  <Button asChild>
                    <a href="#booking">
                      Plan your flight <ArrowDownRight size={18} />
                    </a>
                  </Button>
                </motion.div>
                <motion.a
                  className="text-link"
                  href="#approach"
                  whileHover={prefersReducedMotion ? undefined : { x: 4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  How it works <ArrowDownRight size={17} />
                </motion.a>
              </motion.div>
            </motion.div>
          </section>

          <section className="capability-strip" aria-label="Capabilities" ref={capabilityRef}>
            {capabilities.map(([title, text], index) => (
              <motion.div
                key={title}
                data-reveal-card
                whileHover={prefersReducedMotion ? undefined : { y: -6 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
              >
                <span>{String(index + 1).padStart(2, '0')}</span>
                <b>{title}</b>
                <small>{text}</small>
              </motion.div>
            ))}
          </section>

          <section id="approach" className="approach" data-reveal>
            <div className="section-heading">
              <p className="kicker">The dream big approach</p>
              <h2>
                Thoughtful planning.
                <br />
                Smooth lift-off.
              </h2>
            </div>
            <div className="approach-body">
              <p className="lead-copy">
                We shape each flight around your place, timing, and the feeling you want the final photo or film to carry.
              </p>
              <div className="approach-points">
                {[
                  'Discovery call to map the location, timing, and deliverables.',
                  'A custom flight plan built around light, weather, and story.',
                  'Polished photo or video delivery with a personal handoff.',
                ].map((point) => (
                  <p key={point} data-reveal-card>
                    <Check size={16} />
                    <span>{point}</span>
                  </p>
                ))}
              </div>
            </div>
          </section>

          <section id="services" className="services" data-reveal>
            <div className="services-intro">
              <p className="kicker">Services</p>
              <h2>
                Built for places,
                <br />
                events, and brands.
              </h2>
            </div>
            <div className="services-list">
              {services.map((service) => (
                <motion.article
                  key={service.number}
                  className="service"
                  data-reveal-card
                  whileHover={prefersReducedMotion ? undefined : { x: 8 }}
                  transition={{ duration: 0.28, ease: 'easeOut' }}
                >
                  <span>{service.number}</span>
                  <div>
                    <h3>{service.title}</h3>
                    <p>{service.text}</p>
                  </div>
                  <a href="#booking" aria-label={`Book ${service.title}`}>
                    <ArrowUpRight size={16} />
                  </a>
                </motion.article>
              ))}
            </div>
          </section>

          <section className="feature-film" data-reveal>
            <div className="film-copy">
              <p className="kicker">Custom pricing</p>
              <h2>
                Every project gets
                <br />
                its own flight path.
              </h2>
              <p>
                Pricing is custom so the shoot, safety planning, deliverables, and editing match the story you actually need to tell.
              </p>
            </div>
            <motion.div
              className="film-media"
              data-reveal-card
              whileHover={prefersReducedMotion ? undefined : { scale: 1.015 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
            >
              <img
                src="/dream-big-drones-hero.png"
                alt="Dream Big Drones brand artwork featured as a cinematic service preview"
              />
            </motion.div>
          </section>

          <section id="questions" className="questions" data-reveal>
            <div className="faq-intro">
              <p className="kicker">Questions</p>
              <h2>
                Clear answers
                <br />
                before takeoff.
              </h2>
              <p>Everything starts with a conversation, then we shape the right flight plan, schedule, and delivery around it.</p>
            </div>

            <div className="faq-list">
              {faqs.map(([question, answer], index) => {
                const isOpen = index === activeFaq

                return (
                  <div key={question} className={`faq-item ${isOpen ? 'faq-open' : ''}`} data-reveal-card>
                    <button type="button" onClick={() => setActiveFaq(isOpen ? -1 : index)} aria-expanded={isOpen}>
                      <span>{question}</span>
                      <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
                        <ChevronDown size={18} />
                      </motion.span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen ? (
                        <motion.div
                          className="faq-answer"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
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

          <section id="booking" className="booking" data-reveal>
            <div>
              <p className="kicker">Start your project</p>
              <h2>
                Book the call.
                <br />
                Shape the shot.
              </h2>
            </div>
            <motion.div
              className="booking-card"
              data-reveal-card
              whileHover={prefersReducedMotion ? undefined : { y: -8 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              <p>Tell us what you are imagining, and we will create the right flight plan and custom quote.</p>
              <motion.div whileHover={prefersReducedMotion ? undefined : { y: -2 }} whileTap={{ scale: 0.985 }}>
                <Button asChild>
                  <a href="#calendly-setup">
                    Schedule with Calendly <ArrowUpRight size={18} />
                  </a>
                </Button>
              </motion.div>
              <small>Custom pricing for every project.</small>
            </motion.div>
          </section>

          <section id="calendly-setup" className="calendly-guide" data-reveal>
            <p className="kicker">Scheduling made simple</p>
            <p>
              <b>Set up Calendly:</b> create a Discovery Call event, connect your calendar, and send us your booking link. We will connect it to the main call-to-action.
            </p>
          </section>
        </main>

        <footer>
          <a className="wordmark footer-mark" href="#top">
            <span>Dream Big</span>
            <strong>Drones</strong>
            <em>by RLM</em>
          </a>
          <p>Made for stories worth looking up for.</p>
          <motion.a
            href="#top"
            className="back-top"
            whileHover={prefersReducedMotion ? undefined : { x: 3, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            Back to top <ArrowUpRight size={15} />
          </motion.a>
        </footer>
      </div>
    </MotionConfig>
  )
}

export default App
