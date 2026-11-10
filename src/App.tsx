import { useEffect, useState, type ReactNode } from 'react'
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Menu, Moon, Sun, X } from 'lucide-react'
import { experience, navigation, projects, skillGroups } from './data'

function Reveal({ children, className = '', delay = 0, code }: { children: ReactNode; className?: string; delay?: number; code?: string[] }) {
  const codeLines = code ?? [
    `<div class="${className.split(/\s+/)[0] || 'component'}">`,
    '  {content}',
    '</div>',
  ]
  const typeDurations = codeLines.map((line) => Math.max(280, Math.min(line.length * 24, 1600)))
  const typeDelays = typeDurations.map((_, index) => delay + 100 + typeDurations.slice(0, index).reduce((total, duration) => total + duration + 120, 0))
  const typingTime = typeDurations.reduce((total, duration) => total + duration, 0) + (codeLines.length - 1) * 120 + 100

  return (
    <div className={`reveal ${className}`}>
      <span className="build-sequence" style={{ animationDelay: `${delay + typingTime + 1700}ms` }} aria-hidden="true">
        <span className="build-code" style={{ animationDelay: `${delay}ms`, animationDuration: `${typingTime + 700}ms` }}>
          {codeLines.map((line, index) => (
            <span
              className="build-code__line"
              style={{ animationDelay: `${typeDelays[index]}ms`, animationDuration: `${typeDurations[index]}ms`, animationTimingFunction: `steps(${line.length}, end)` }}
              key={`${line}-${index}`}
            >{renderCodeLine(line)}</span>
          ))}
        </span>
        <span className="build-frame" style={{ animationDelay: `${delay + typingTime + 650}ms` }} />
      </span>
      <div className="reveal-content" inert style={{ animationDelay: `${delay + typingTime + 1050}ms` }}>
        {children}
      </div>
    </div>
  )
}

function renderCodeLine(line: string) {
  const tokens = line.split(/(<\/?[a-z][\w-]*|\/?>|\b(?:href|class|id|role|src|alt)=|"[^"]*")/gi)

  return tokens.map((token, index) => {
    if (/^<\/?[a-z]/i.test(token) || /^\/?\>$/.test(token)) return <b key={index}>{token}</b>
    if (/^(href|class|id|role|src|alt)=$/i.test(token)) return <i key={index}>{token}</i>
    if (/^".*"$/.test(token)) return <span className="build-code__string" key={index}>{token}</span>
    return token
  })
}

function SectionLabel({ number, children }: { number: string; children: ReactNode }) {
  return (
    <div className="section-label">
      <span className="section-label__index">{number}</span>
      <span className="section-label__line" aria-hidden="true" />
      <span>{children}</span>
    </div>
  )
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    try {
      return window.localStorage.getItem('kirill-portfolio-theme') === 'light' ? 'light' : 'dark'
    } catch {
      return 'dark'
    }
  })

  useEffect(() => {
    document.body.classList.toggle('menu-is-open', menuOpen)
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => {
      document.body.classList.remove('menu-is-open')
      window.removeEventListener('keydown', closeOnEscape)
    }
  }, [menuOpen])

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    try {
      window.localStorage.setItem('kirill-portfolio-theme', theme)
    } catch {
      // The theme still works for this session if storage is unavailable.
    }
  }, [theme])

  return (
    <header className="site-header">
      <a className="wordmark" href="#top" aria-label="Kirill Khlopunov, back to top">
        <span className="wordmark__symbol">K<span>.</span></span>
        <span className="wordmark__name">KIRILL KHLOPUNOV</span>
      </a>
      <div className="header-status"><span className="status-dot" /> STUDENT PROFILE / ASTANA</div>
      <nav id="primary-navigation" className={`primary-nav ${menuOpen ? 'primary-nav--open' : ''}`} aria-label="Main navigation">
        {navigation.map((item, index) => (
          <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>
            <span className="nav-index">0{index + 1}</span>{item.label}
          </a>
        ))}
      </nav>
      <div className="header-actions">
        <button className="theme-toggle" type="button" aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`} aria-pressed={theme === 'light'} onClick={() => setTheme((current) => current === 'dark' ? 'light' : 'dark')}>
          {theme === 'dark' ? <Sun size={16} aria-hidden="true" /> : <Moon size={16} aria-hidden="true" />}
          <span>{theme === 'dark' ? 'LIGHT' : 'DARK'}</span>
        </button>
        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={19} /> : <Menu size={19} />}
        </button>
      </div>
    </header>
  )
}

function Hero() {
  return (
    <section className="hero page-shell" id="top" aria-labelledby="hero-title">
      <div className="hero-topline mono">
        <span>INDEPENDENT MIND. PRACTICAL SYSTEMS.</span>
        <span>BASED IN ASTANA, KAZAKHSTAN</span>
      </div>
      <div className="hero-word-wrap" aria-hidden="true">
        <Reveal className="hero-word-build" code={['<div class="hero-word">', '  PORTFOLIO', '</div>']}>
        <div className="hero-word">PORTFOLIO</div>
        <span className="hero-word-index mono">PROFILE / 001</span>
        </Reveal>
      </div>
      <div className="hero-content">
        <div className="hero-copy">
          <Reveal code={['<section id="hero">', '  <h1>Kirill Khlopunov</h1>', '</section>']}>
            <p className="eyebrow"><span className="eyebrow__bar" /> HELLO, I'M</p>
            <h1 id="hero-title">KIRILL<br /><span>KHLOPUNOV</span></h1>
            <p className="hero-role">IT STUDENT <b>/</b> JUNIOR DEVELOPER <b>/</b><br className="role-break" /> IoT ENTHUSIAST</p>
            <p className="hero-intro">I study smart security technologies and explore software, intelligent systems, and connected devices through hands-on projects.</p>
          </Reveal>
          <Reveal className="hero-actions-build" delay={180} code={['<div class="hero-actions">', '  <a href="#projects">EXPLORE PROJECTS</a>', '</div>']}>
            <div className="hero-actions">
              <a href="#projects" className="button button--solid">EXPLORE PROJECTS <ArrowDown size={15} /></a>
              <a href="#contact" className="button button--text">CONTACT ME <ArrowUpRight size={15} /></a>
            </div>
          </Reveal>
        </div>
        <Reveal className="hero-art-wrap" delay={120} code={['<div role="img">', '  PORTRAIT SLOT', '</div>']}>
          <div className="hero-art" aria-label="Abstract portrait placeholder; a personal photo can be added here later" role="img">
            <div className="art-corner art-corner--tl" /><div className="art-corner art-corner--tr" />
            <div className="art-corner art-corner--bl" /><div className="art-corner art-corner--br" />
            <div className="art-coordinate mono">FIG. 01 <span>—</span> PERSONAL ARCHIVE</div>
            <div className="art-grid" />
            <div className="orbit orbit--outer" /><div className="orbit orbit--inner" />
            <div className="art-core"><span>K</span><i /><i /><i /></div>
            <div className="art-axis art-axis--horizontal" /><div className="art-axis art-axis--vertical" />
            <div className="art-target art-target--one" /><div className="art-target art-target--two" />
            <div className="art-caption mono"><span className="status-dot" /> PORTRAIT SLOT <span>READY FOR IMAGE</span></div>
            <span className="art-serial mono">KK—001</span>
          </div>
        </Reveal>
        <a className="hero-scroll mono" href="#about"><span>SCROLL TO EXPLORE</span><span className="hero-scroll__line" /><ArrowDown size={13} /></a>
      </div>
      <div className="hero-bottomline mono"><span>SOFTWARE / SYSTEMS / SECURITY</span><span>BASED IN KAZAKHSTAN <span className="red-mark">✳</span></span></div>
    </section>
  )
}

function About() {
  return (
    <section className="section page-shell about-section" id="about" aria-labelledby="about-title">
      <SectionLabel number="01">BACKGROUND &amp; PHILOSOPHY</SectionLabel>
      <div className="about-grid">
        <Reveal className="about-heading" code={['<h2 id="about-title">', '  CURIOUS BY DESIGN.', '</h2>']}>
          <p className="eyebrow eyebrow--muted">A LITTLE CONTEXT</p>
          <h2 id="about-title">CURIOUS BY<br /><span>DESIGN.</span></h2>
          <p className="about-note mono">LEARNING IS A PRACTICE.<br />BUILDING MAKES IT REAL.</p>
        </Reveal>
        <Reveal className="about-story" delay={100} code={['<p class="about-lead">', '  Smart Security Technologies', '</p>']}>
          <span className="story-marker mono">// 01 — THE APPROACH</span>
          <p className="about-lead">I’m an Astana IT University student specializing in <span>Smart Security Technologies.</span></p>
          <p>I’m interested in software development, artificial intelligence, cybersecurity, IoT, and automation systems. I enjoy exploring different technologies, building programming projects, and gaining practical experience.</p>
          <div className="story-foot mono"><span>ASTANA IT UNIVERSITY</span><span>STUDENT / 2025—</span></div>
        </Reveal>
        <Reveal className="interest-panel-build" delay={120} code={['<section class="interest-panel">', '  05 AREAS OF INTEREST', '</section>']}>
          <div className="interest-panel">
          <div className="interest-panel__title mono">AREAS OF INTEREST <span>05 NODES</span></div>
          {['Software Development', 'Artificial Intelligence', 'Cybersecurity', 'Internet of Things', 'Automation Systems'].map((item, index) => (
            <div className="interest-row" key={item}><span className="interest-num mono">0{index + 1}</span><span>{item}</span><ArrowUpRight size={14} /></div>
          ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function Experience() {
  return (
    <section className="section section--alt page-shell" id="experience" aria-labelledby="experience-title">
      <SectionLabel number="02">EXPERIENCE</SectionLabel>
      <div className="section-intro-row">
        <Reveal code={['<h2 id="experience-title">', '  FIELD NOTES', '</h2>']}><h2 className="section-title" id="experience-title">FIELD<br />NOTES<span className="red-mark">.</span></h2></Reveal>
        <Reveal delay={100} code={['<p class="section-intro">', '  Hands-on experience', '</p>']}><p className="section-intro">Hands-on experience with physical systems and data workflows.</p></Reveal>
      </div>
      <div className="experience-list">
        {experience.map((item, index) => (
          <Reveal key={item.number} className="experience-item" delay={index * 100} code={['<div class="experience-item">', `  ${item.role}`, '</div>']}>
            <div className="experience-index mono"><span>{item.number}</span><span className="timeline-node" /></div>
            <div className="experience-main">
              <div className="experience-top mono"><span>{item.date}</span><span>{item.duration}</span></div>
              <h3>{item.role}</h3>
              <p className="experience-field">{item.field}</p>
              <ul>{item.responsibilities.map((responsibility) => <li key={responsibility}>{responsibility}</li>)}</ul>
            </div>
            <div className="experience-arrow" aria-hidden="true"><ArrowUpRight size={19} /></div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function Projects() {
  return (
    <section className="section page-shell projects-section" id="projects" aria-labelledby="projects-title">
      <SectionLabel number="03">SELECTED PROJECTS</SectionLabel>
      <div className="section-intro-row projects-heading">
        <Reveal code={['<h2 id="projects-title">', '  SELECTED PROJECTS', '</h2>']}><h2 className="section-title" id="projects-title">BUILT TO<br /><span>UNDERSTAND.</span></h2></Reveal>
        <Reveal delay={100} code={['<p class="section-intro">', '  Academic work & explorations', '</p>']}><p className="section-intro">A selection of academic work and technical explorations.</p></Reveal>
      </div>
      <div className="projects-grid">
        {projects.map((project, index) => (
          <Reveal key={project.number} className={`project-card project-card--${index + 1}`} delay={index * 100} code={['<a href="#contact" class="project-link">', `  ${project.title}`, '</a>']}>
            <a href="#contact" className="project-link" aria-label={`Discuss ${project.title} with Kirill`}>
              <div className="project-card__top mono"><span>{project.marker}</span><span className="project-card__arrow"><ArrowUpRight size={18} /></span></div>
              <div className="project-visual" aria-hidden="true">
                {index === 0 ? <div className="visual-circuit"><span className="circuit-chip">ESP<br /><b>32</b></span><i /><i /><i /><i /><span className="circuit-label mono">SIGNAL / NODE</span></div> : null}
                {index === 1 ? (
                  <svg className="visual-graph" viewBox="0 0 420 160" aria-hidden="true" focusable="false">
                    <path d="M210 42V55H110V68M210 55H310V68M110 92V102H55V120M110 102H145V120M310 92V102H255V120M310 102H345V120" />
                    <path className="visual-graph__active" d="M210 42V55H110V68M110 92V102H55V120" />
                    <g><rect x="186" y="18" width="48" height="24" /><rect x="90" y="68" width="40" height="24" /><rect x="290" y="68" width="40" height="24" /><rect x="37" y="120" width="36" height="22" /><rect x="127" y="120" width="36" height="22" /><rect x="237" y="120" width="36" height="22" /><rect x="327" y="120" width="36" height="22" /></g>
                    <g className="visual-graph__nodes"><circle cx="210" cy="30" r="3" /><circle cx="110" cy="80" r="2.5" /><circle cx="310" cy="80" r="2.5" /><circle cx="55" cy="131" r="2" /><circle cx="145" cy="131" r="2" /><circle cx="255" cy="131" r="2" /><circle cx="345" cy="131" r="2" /></g>
                  </svg>
                ) : null}
                {index === 2 ? <div className="visual-orbit"><div className="orbit-chip orbit-chip--a">WEB</div><div className="orbit-chip orbit-chip--b">BOT</div><div className="orbit-chip orbit-chip--c">DATA</div><span className="orbit-center">03</span><i /><i /></div> : null}
              </div>
              <div className="project-card__body">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="tag-list">{project.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}</div>
              </div>
              <div className="project-card__footer mono"><span>DISCUSS THIS PROJECT</span><ArrowRight size={15} /></div>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function Skills() {
  return (
    <section className="section section--alt page-shell skills-section" id="skills" aria-labelledby="skills-title">
      <SectionLabel number="04">TOOLS &amp; INTERESTS</SectionLabel>
      <div className="skills-heading-row">
        <Reveal code={['<h2 id="skills-title">', '  THE SYSTEMS MATRIX', '</h2>']}><h2 className="section-title" id="skills-title">CURRENT<br />TOOLKIT<span className="red-mark">.</span></h2></Reveal>
        <Reveal delay={90} code={['<p class="skills-note">', '  Tools & areas of interest', '</p>']}><p className="skills-note">Tools I’ve worked with and topics I’m exploring. No scores, just a map.</p></Reveal>
      </div>
      <div className="skills-grid">
        {skillGroups.map((group, index) => (
          <Reveal className={`skill-cell skill-cell--${index + 1}`} key={group.index} delay={index * 70} code={['<div class="skill-cell">', `  ${group.title}`, '</div>']}>
            <div className="skill-cell__head mono"><span>{group.index} / 04</span><span className="skill-cross">+</span></div>
            <h3>{group.title}</h3>
            <ul>{group.items.map((item) => <li key={item}><span className="skill-diamond" />{item}</li>)}</ul>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function Education() {
  return (
    <section className="section page-shell education-section" id="education" aria-labelledby="education-title">
      <SectionLabel number="05">EDUCATION &amp; LANGUAGES</SectionLabel>
      <div className="education-grid">
        <div className="education-main">
          <Reveal className="education-intro" code={['<h2 id="education-title">', '  FOUNDATIONS FOR WHAT’S NEXT', '</h2>']}>
            <p className="eyebrow eyebrow--muted">LEARNING IN PROGRESS</p>
            <h2 id="education-title">FOUNDATIONS<br /><span>FOR WHAT'S NEXT.</span></h2>
          </Reveal>
          <Reveal delay={120} code={['<div class="education-record">', '  Astana IT University', '</div>']}>
            <div className="education-record">
            <div className="education-record__year mono">2025 — PRESENT <span>01 / CURRENT</span></div>
            <div><h3>Astana IT University</h3><p>Smart Security Technologies</p></div>
            <ArrowUpRight size={18} aria-hidden="true" />
            </div>
          </Reveal>
        </div>
        <Reveal className="language-block-build" delay={110} code={['<section class="language-block">', '  Russian / English', '</section>']}>
        <div className="language-block">
            <div className="language-block__title mono">LANGUAGES <span>02</span></div>
            <div className="language-row"><span>Russian</span><span className="language-level">FLUENT</span></div>
            <div className="language-row"><span>English</span><span className="language-level">IELTS 6.0</span></div>
            <p className="language-foot mono">LANGUAGE PROFILE / 02</p>
        </div>
        </Reveal>
      </div>
    </section>
  )
}

function Contact() {
  return (
    <section className="contact-section page-shell" id="contact" aria-labelledby="contact-title">
      <SectionLabel number="06">CONTACT</SectionLabel>
      <div className="contact-main">
        <div className="contact-title-block">
          <Reveal className="contact-heading" code={['<h2 id="contact-title">', '  LET’S BUILD SOMETHING', '</h2>']}>
            <p className="eyebrow"><span className="eyebrow__bar" /> OPEN TO A GOOD CONVERSATION</p>
            <h2 id="contact-title">LET'S BUILD<br />SOMETHING<br /><span>INTERESTING.</span></h2>
          </Reveal>
          <Reveal className="contact-cta-build" delay={220} code={['<a href="mailto:Khlopunov2007@gmail.com">', '  CONTACT ME', '</a>']}>
            <a className="button button--solid contact-cta" href="mailto:Khlopunov2007@gmail.com">CONTACT ME <ArrowUpRight size={17} /></a>
          </Reveal>
        </div>
        <Reveal className="contact-details-build" delay={120} code={['<div class="contact-details">', '  <a href="mailto:Khlopunov2007@gmail.com">', '</div>']}>
        <div className="contact-details">
            <div className="contact-aside mono">A DIRECT LINE<br />IS ALWAYS OPEN <span className="contact-aside__symbol">↘</span></div>
            <a className="contact-link" href="mailto:Khlopunov2007@gmail.com"><span className="contact-label mono">EMAIL <ArrowUpRight size={13} /></span><span>Khlopunov2007@gmail.com</span></a>
            <a className="contact-link" href="tel:+77057609014"><span className="contact-label mono">PHONE <ArrowUpRight size={13} /></span><span>+7 705 760 9014</span></a>
            <a className="contact-link" href="https://github.com/Kuril123" target="_blank" rel="noreferrer"><span className="contact-label mono">GITHUB <ArrowUpRight size={13} /></span><span>github.com/Kuril123</span></a>
            <a className="contact-link" href="https://www.linkedin.com/in/kirill-khlopunov-671b29446/" target="_blank" rel="noreferrer"><span className="contact-label mono">LINKEDIN <ArrowUpRight size={13} /></span><span>linkedin.com/in/kirill-khlopunov</span></a>
        </div>
        </Reveal>
      </div>
      <div className="contact-bottom mono"><span>ASTANA, KAZAKHSTAN</span><a href="#top"><ArrowLeft size={13} /> BACK TO TOP</a><span>© {new Date().getFullYear()} KIRILL KHLOPUNOV</span></div>
    </section>
  )
}

export default function App() {
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>('.reveal')
    const unlockTimers = new Set<number>()
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!('IntersectionObserver' in window)) {
      elements.forEach((element) => {
        element.classList.add('is-visible')
        const content = element.querySelector<HTMLElement>('.reveal-content')
        if (content) content.inert = false
      })
      return () => undefined
    }
    elements.forEach((element) => {
      const content = element.querySelector<HTMLElement>('.reveal-content')
      if (content) content.inert = true
    })
    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          const content = (entry.target as HTMLElement).querySelector<HTMLElement>('.reveal-content')
          if (content) {
            const animationDelay = Number.parseFloat(content.style.animationDelay) || 0
            const timer = window.setTimeout(() => {
              content.inert = false
              unlockTimers.delete(timer)
            }, reducedMotion ? 0 : animationDelay + 650)
            unlockTimers.add(timer)
          }
          currentObserver.unobserve(entry.target)
        }
      })
    }, { threshold: 0.12, rootMargin: '0px 0px -24px 0px' })
    elements.forEach((element) => observer.observe(element))
    return () => {
      observer.disconnect()
      unlockTimers.forEach(window.clearTimeout)
    }
  }, [])

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Header />
      <main id="main-content">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Education />
        <Contact />
      </main>
    </>
  )
}
