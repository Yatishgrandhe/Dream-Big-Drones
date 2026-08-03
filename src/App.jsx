import { ArrowDownRight, ArrowUpRight, Check, ChevronDown, Menu, Play, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Button } from './components/ui/button'
import './App.css'

const capabilities = [
  ['Aerial photography', 'Still images with a bigger point of view'],
  ['Cinematic video', 'Motion that gives your story room to move'],
  ['Custom flight plan', 'A shoot built around your place and goal'],
  ['Personal partnership', 'A clear, thoughtful process from first call to delivery'],
]

const services = [
  { number: '01', title: 'Spaces with a story', text: 'Property, architecture, venues, and destinations—made more memorable from above.' },
  { number: '02', title: 'Moments in motion', text: 'Events and celebrations, captured with scale, feeling, and an eye for what matters.' },
  { number: '03', title: 'Brands that go farther', text: 'Aerial content that gives a business launch, campaign, or team a more compelling frame.' },
]

const faqs = [
  ['What does a discovery call cover?', 'We will talk through your location, desired footage, timing, and the feeling you want the final work to create.'],
  ['How is pricing determined?', 'Every project is custom. The quote reflects the location, scope, flight time, deliverables, and any creative planning required.'],
  ['When should I schedule?', 'Reach out as early as you can. A little room to plan means we can choose the best light, weather window, and flight approach.'],
  ['Do you work with both individuals and businesses?', 'Yes. Dream Big Drones works with homeowners, families, venues, real-estate professionals, and businesses with a story to tell.'],
]

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeFaq, setActiveFaq] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const closeMenu = () => setMenuOpen(false)

  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoading(false), 1200)
    return () => window.clearTimeout(timer)
  }, [])

  return (
    <>
      {isLoading && <div className="flight-loader" aria-label="Loading Dream Big Drones">
        <div className="loader-mark"><span>Dream Big</span><strong>Drones</strong></div><div className="loader-line" /><p>Preparing your point of view</p>
      </div>}
      <div className="site-shell">
      <header className="site-header">
        <a className="wordmark" href="#top" onClick={closeMenu} aria-label="Dream Big Drones home"><span>Dream Big</span><strong>Drones</strong><em>by RLM</em></a>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-controls="site-navigation">{menuOpen ? <X size={22} /> : <Menu size={22} />}<span className="sr-only">Toggle navigation</span></button>
        <nav id="site-navigation" className={menuOpen ? 'nav-open' : ''} aria-label="Main navigation">
          <a href="#approach" onClick={closeMenu}>Approach</a><a href="#services" onClick={closeMenu}>Services</a><a href="#questions" onClick={closeMenu}>Questions</a>
          <Button asChild variant="secondary"><a href="#booking" onClick={closeMenu}>Start a project <ArrowUpRight size={15} /></a></Button>
        </nav>
      </header>

      <main id="top">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-backdrop"><img src="/dream-big-drones-hero.png" width="1698" height="922" alt="Dream Big Drones artwork with a drone, imagined destinations, and city park setting" /></div><div className="hero-scrim" />
          <div className="hero-copy"><p className="kicker">Aerial photo + video</p><h1 id="hero-title">See the moment.<br /><i>Dream bigger.</i></h1><p>Dream Big Drones by RLM gives your biggest moments, places, and ideas the perspective they deserve.</p><div className="hero-actions"><Button asChild><a href="#booking">Plan your flight <ArrowDownRight size={18} /></a></Button><a className="text-link" href="#approach">How it works <ArrowDownRight size={17} /></a></div></div>
        </section>
        <div className="capability-strip" aria-label="Dream Big Drones capabilities">{capabilities.map(([title, text], index) => <div key={title}><span>{String(index + 1).padStart(2, '0')}</span><p><b>{title}</b><small>{text}</small></p></div>)}</div>

        <section id="approach" className="approach" aria-labelledby="approach-title"><div className="section-heading"><p className="kicker">The Dream Big approach</p><h2 id="approach-title">Your story is the<br /><i>flight plan.</i></h2></div><div className="approach-body"><p className="lead-copy">Great aerial work is more than sending a drone up. It is about understanding what you want people to notice when they look back.</p><div className="approach-points"><p><Check size={17} /> A clear discovery call before takeoff</p><p><Check size={17} /> Creative direction matched to your goal</p><p><Check size={17} /> A custom quote—never a one-size-fits-all package</p></div></div></section>

        <section id="services" className="services" aria-labelledby="services-title"><div className="services-intro"><p className="kicker">What we make possible</p><h2 id="services-title">A clearer view<br />changes everything.</h2></div><div className="services-list">{services.map((service) => <article key={service.number} className="service"><span>{service.number}</span><div><h3>{service.title}</h3><p>{service.text}</p></div><a href="#booking" aria-label={`Plan ${service.title}`}><ArrowUpRight size={21} /></a></article>)}</div></section>

        <section className="feature-film" aria-label="The Dream Big Drones perspective"><div className="film-media"><img src="/dream-big-drones-hero.png" width="1698" height="922" alt="Drone carrying imagined destinations above a city park" /><span><Play size={21} fill="currentColor" /> Your perspective, in motion</span></div><div className="film-copy"><p className="kicker">From idea to flight</p><h2>Designed around what <i>matters most.</i></h2><p>From an intimate family milestone to a business with a big launch ahead, the work is shaped around the feeling you want to leave behind.</p><a className="text-link" href="#booking">Start the conversation <ArrowDownRight size={17} /></a></div></section>

        <section id="questions" className="questions" aria-labelledby="questions-title"><div className="faq-intro"><p className="kicker">Good questions welcome</p><h2 id="questions-title">Before we<br />take off.</h2><p>Have a different question? Bring it to the discovery call.</p></div><div className="faq-list">{faqs.map(([question, answer], index) => <div className={`faq-item ${activeFaq === index ? 'faq-open' : ''}`} key={question}><button onClick={() => setActiveFaq(activeFaq === index ? -1 : index)} aria-expanded={activeFaq === index}><span>{question}</span><ChevronDown size={19} /></button>{activeFaq === index && <p>{answer}</p>}</div>)}</div></section>

        <section id="booking" className="booking" aria-labelledby="booking-title"><div><p className="kicker">Let’s make it happen</p><h2 id="booking-title">Your next view<br />is <i>waiting.</i></h2></div><div className="booking-card"><p>Choose a quick discovery call, tell us what you are imagining, and we will create the right flight plan and a custom quote.</p><Button asChild><a href="#calendly-setup">Schedule with Calendly <ArrowUpRight size={18} /></a></Button><small>Custom pricing for every project.</small></div></section>

        <section id="calendly-setup" className="calendly-guide"><p className="kicker">Scheduling made simple</p><p><b>Set up Calendly:</b> create a Discovery Call event, connect your calendar, then send us its booking link. We will connect it to the button above.</p></section>
      </main>
      <footer><a className="wordmark footer-mark" href="#top"><span>Dream Big</span><strong>Drones</strong><em>by RLM</em></a><p>Made for the stories worth looking up for.</p><a href="#top" className="back-top">Back to top <ArrowUpRight size={15} /></a></footer>
      </div>
    </>
  )
}

export default App
