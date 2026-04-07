import { useEffect, useRef, useState, useCallback } from 'react'
import { useReveal } from '../hooks/useReveal'

/* ── Data ──────────────────────────────────── */
const TILES = [
  { w: 140, h: 140, top: '8%',  left: '62%', r: '3deg',  float: '-10px', delay: '0s',   glow: true },
  { w: 80,  h: 80,  top: '18%', left: '78%', r: '-5deg', float: '-7px',  delay: '0.4s', glow: false },
  { w: 100, h: 100, top: '42%', left: '70%', r: '7deg',  float: '-12px', delay: '0.8s', glow: true },
  { w: 60,  h: 60,  top: '28%', left: '88%', r: '-2deg', float: '-6px',  delay: '0.2s', glow: false },
  { w: 120, h: 120, top: '58%', left: '80%', r: '4deg',  float: '-9px',  delay: '1s',   glow: false },
  { w: 50,  h: 50,  top: '12%', left: '54%', r: '-8deg', float: '-5px',  delay: '0.6s', glow: true },
  { w: 90,  h: 90,  top: '72%', left: '64%', r: '6deg',  float: '-8px',  delay: '1.2s', glow: false },
  { w: 70,  h: 70,  top: '35%', left: '56%', r: '-4deg', float: '-7px',  delay: '0.3s', glow: false },
]

const SERVICES = [
  { n: '01', title: 'MVP Builds',       desc: 'Functional web apps and products built to impress clients and validate ideas — fast.' },
  { n: '02', title: 'Landing Pages',    desc: 'High-converting pages that make your business look like it spent ten times as much.' },
  { n: '03', title: 'AI-Powered Tools', desc: 'Custom tools with real Claude API integration — summarisers, assistants, workflows.' },
  { n: '04', title: 'Internal Tools',   desc: 'Dashboards, admin panels, and workflow tools that your team will actually use.' },
  { n: '05', title: 'Dev Retainer',     desc: 'Ongoing development partner. New features, iterations, and improvements on demand.' },
  { n: '06', title: 'AI Consulting',    desc: 'Strategy and implementation advice on bringing AI into your product or business.' },
]

const TESTIMONIALS = [
  { quote: 'Tesselo turned our idea into a working web app in 48 hours. The quality blew our whole team away.', name: 'Sarah M.', role: 'SaaS Founder' },
  { quote: 'We needed an internal dashboard built fast. Finn delivered something that looked like it cost three times what we paid.', name: 'James R.', role: 'Operations Director' },
  { quote: 'The AI-powered summariser Tesselo built has genuinely changed how our team processes content every day.', name: 'Priya K.', role: 'Product Manager' },
  { quote: 'Fast, communicative, and the final product was exactly what we imagined — just better.', name: 'Tom C.', role: 'E-commerce Owner' },
]

const STATS = [
  { value: 48,  suffix: 'hr',  label: 'Avg. delivery' },
  { value: 6,   suffix: '+',   label: 'Project types' },
  { value: 100, suffix: '%',   label: 'AI-assisted' },
  { value: 0,   suffix: '',    label: 'Dependencies' },
]

const PROCESS = [
  { n: 'i',   title: 'Brief',  desc: 'Tell me what you want to build. No specs needed — a conversation is enough.' },
  { n: 'ii',  title: 'Build',  desc: 'I build fast using AI-assisted development. You see real progress within hours.' },
  { n: 'iii', title: 'Refine', desc: 'Direct feedback loop. You point, I fix. Iterate until it\'s exactly right.' },
  { n: 'iv',  title: 'Ship',   desc: 'You own everything — the code, the domain, the product. No lock-in.' },
]

/* ── CountUp ───────────────────────────────── */
function CountUp({ target, suffix, duration = 1800 }) {
  const [val, setVal] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true
        const start = performance.now()
        const tick = (now) => {
          const t = Math.min((now - start) / duration, 1)
          const ease = 1 - Math.pow(1 - t, 4)
          setVal(Math.round(ease * target))
          if (t < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
        observer.disconnect()
      }
    }, { threshold: 0.5 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [target, duration])

  return <span ref={ref}>{val}{suffix}</span>
}

/* ── SpotlightCard ─────────────────────────── */
function SpotlightCard({ children }) {
  const ref = useRef(null)
  const onMove = (e) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    ref.current.style.setProperty('--mx', `${((e.clientX - rect.left) / rect.width) * 100}%`)
    ref.current.style.setProperty('--my', `${((e.clientY - rect.top) / rect.height) * 100}%`)
  }
  const onLeave = () => {
    ref.current?.style.setProperty('--mx', '50%')
    ref.current?.style.setProperty('--my', '50%')
  }
  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} className="spotlight-card">
      {children}
    </div>
  )
}

/* ── MagnetLines (enhanced) ────────────────── */
function MagnetLines() {
  const canvasRef = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let mouse = { x: -999, y: -999 }
    let raf

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight }
    resize()
    window.addEventListener('resize', resize)
    const onMove = (e) => { mouse = { x: e.clientX, y: e.clientY } }
    window.addEventListener('mousemove', onMove)

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const spacing = 52, radius = 200
      const cols = Math.ceil(canvas.width / spacing) + 1
      const rows = Math.ceil(canvas.height / spacing) + 1

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const bx = c * spacing, by = r * spacing
          const dx = mouse.x - bx, dy = mouse.y - by
          const dist = Math.sqrt(dx * dx + dy * dy)
          const pull = Math.max(0, 1 - dist / radius)
          const px = bx + dx * pull * 0.4
          const py = by + dy * pull * 0.4
          const size = 1.1 + pull * 1.2

          ctx.beginPath()
          ctx.arc(px, py, size, 0, Math.PI * 2)
          if (pull > 0.3) {
            ctx.fillStyle = `rgba(196, 67, 26, ${pull * 0.25})`
          } else {
            ctx.fillStyle = `rgba(240, 235, 228, ${0.05 + pull * 0.07})`
          }
          ctx.fill()
        }
      }
      raf = requestAnimationFrame(draw)
    }
    draw()
    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return <canvas ref={canvasRef} style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }} />
}

/* ── Grain overlay ─────────────────────────── */
function Grain() {
  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      zIndex: 3,
      pointerEvents: 'none',
      opacity: 0.035,
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
      backgroundSize: '180px',
    }} />
  )
}

/* ── FloatingParticles ─────────────────────── */
function FloatingParticles() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let raf

    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight }
    resize()
    window.addEventListener('resize', resize)

    const particles = Array.from({ length: 28 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: 0.6 + Math.random() * 1.2,
      vx: (Math.random() - 0.5) * 0.25,
      vy: -0.1 - Math.random() * 0.3,
      alpha: 0.1 + Math.random() * 0.25,
      pulse: Math.random() * Math.PI * 2,
    }))

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach(p => {
        p.x += p.vx
        p.y += p.vy
        p.pulse += 0.018
        if (p.y < -4) { p.y = canvas.height + 4; p.x = Math.random() * canvas.width }
        if (p.x < -4) p.x = canvas.width + 4
        if (p.x > canvas.width + 4) p.x = -4

        const a = p.alpha * (0.7 + 0.3 * Math.sin(p.pulse))
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(196, 67, 26, ${a})`
        ctx.fill()
      })
      raf = requestAnimationFrame(draw)
    }
    draw()
    return () => { window.removeEventListener('resize', resize); cancelAnimationFrame(raf) }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 2, pointerEvents: 'none' }}
    />
  )
}

/* ── BlurText ──────────────────────────────── */
function BlurText({ text }) {
  return (
    <span aria-label={text}>
      {text.split(' ').map((word, i) => (
        <span key={i} aria-hidden style={{
          display: 'inline-block',
          animation: `blur-word 0.75s var(--ease-out) ${0.1 + i * 0.09}s both`,
          marginRight: '0.25em',
        }}>{word}</span>
      ))}
    </span>
  )
}

/* ── AnimatedTag ───────────────────────────── */
function AnimatedTag({ children, delay = 0, center = false }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.classList.add('tag-visible'); obs.disconnect() }
    }, { threshold: 0.5 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return (
    <p
      ref={ref}
      className="tag tag-anim"
      style={{ justifyContent: center ? 'center' : undefined, marginBottom: 16, '--tag-delay': `${delay}s` }}
    >
      {children}
    </p>
  )
}

/* ── SectionHeading ────────────────────────── */
function SectionHeading({ children, style }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.classList.add('heading-visible'); obs.disconnect() }
    }, { threshold: 0.3 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return (
    <div ref={ref} className="section-heading-wrap" style={style}>
      <h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', color: 'var(--text)' }}>{children}</h2>
      <div className="heading-underline" />
    </div>
  )
}

/* ── Main Home ─────────────────────────────── */
export default function Home() {
  const revealRef = useReveal()
  const [tileShift, setTileShift] = useState({ x: 0, y: 0 })
  const [testimonialIdx, setTestimonialIdx] = useState(0)
  const [hoverProcess, setHoverProcess] = useState(null)
  const [processVisible, setProcessVisible] = useState(false)
  const processRef = useRef(null)

  // Hero parallax
  useEffect(() => {
    const onMove = (e) => {
      setTileShift({
        x: (e.clientX / window.innerWidth - 0.5) * 22,
        y: (e.clientY / window.innerHeight - 0.5) * 14,
      })
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  // Testimonials rotation
  useEffect(() => {
    const id = setInterval(() => setTestimonialIdx(i => (i + 1) % TESTIMONIALS.length), 5000)
    return () => clearInterval(id)
  }, [])

  // Process visibility for timeline
  useEffect(() => {
    const el = processRef.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setProcessVisible(true); obs.disconnect() }
    }, { threshold: 0.2 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  // Mobile tap sparks
  useEffect(() => {
    if (!window.matchMedia('(pointer: coarse)').matches) return
    const onTap = (e) => {
      const touch = e.changedTouches[0]
      for (let i = 0; i < 8; i++) {
        const angle = (Math.PI * 2 * i) / 8
        const dist = 30 + Math.random() * 40
        const spark = document.createElement('div')
        spark.style.cssText = `position:fixed;left:${touch.clientX}px;top:${touch.clientY}px;
          width:5px;height:5px;border-radius:50%;background:#c4431a;pointer-events:none;z-index:9999;
          --tx:${Math.cos(angle)*dist}px;--ty:${Math.sin(angle)*dist}px;
          animation:spark-out 0.55s var(--ease-out) forwards;`
        document.body.appendChild(spark)
        spark.addEventListener('animationend', () => spark.remove())
      }
    }
    document.addEventListener('touchstart', onTap)
    return () => document.removeEventListener('touchstart', onTap)
  }, [])

  const t = TESTIMONIALS[testimonialIdx]

  return (
    <div ref={revealRef} style={{ position: 'relative', zIndex: 1 }}>
      <MagnetLines />

      {/* ── Hero ──────────────────────────────────── */}
      <section style={{
        minHeight: 'calc(100dvh - var(--nav-h))',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        padding: 'clamp(60px, 10vh, 120px) 0',
      }}>
        {/* Grid texture */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          opacity: 0.45,
          pointerEvents: 'none',
          zIndex: 1,
        }} />

        {/* Grain */}
        <Grain />

        {/* Floating particles */}
        <FloatingParticles />

        {/* Dual orbs */}
        <div style={{
          position: 'absolute', top: '-5%', right: '18%',
          width: 600, height: 600, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(196,67,26,0.14) 0%, transparent 68%)',
          pointerEvents: 'none', zIndex: 1,
          animation: 'pulse-orb 7s ease-in-out infinite',
        }} />
        <div style={{
          position: 'absolute', bottom: '-10%', left: '-5%',
          width: 400, height: 400, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(196,67,26,0.06) 0%, transparent 70%)',
          pointerEvents: 'none', zIndex: 1,
          animation: 'pulse-orb 9s ease-in-out 1.5s infinite',
        }} />

        {/* Tile cluster */}
        <div style={{
          position: 'absolute', inset: 0,
          pointerEvents: 'none', zIndex: 2,
          transform: `translate(${tileShift.x}px, ${tileShift.y}px)`,
          transition: 'transform 0.5s var(--ease-out)',
        }}>
          {TILES.map((tile, i) => (
            <div key={i} style={{
              position: 'absolute',
              width: tile.w, height: tile.h,
              top: tile.top, left: tile.left,
              '--r': tile.r,
              '--float-y': tile.float,
              background: tile.glow
                ? 'linear-gradient(135deg, rgba(196,67,26,0.12) 0%, var(--surface) 60%)'
                : 'var(--surface)',
              border: tile.glow ? '1px solid rgba(196,67,26,0.2)' : '1px solid var(--border)',
              borderRadius: 6,
              boxShadow: tile.glow ? '0 0 30px rgba(196,67,26,0.08), inset 0 0 20px rgba(196,67,26,0.04)' : 'none',
              animation: `tile-float ${4 + i * 0.5}s ease-in-out ${tile.delay} infinite, fade-in 0.6s var(--ease-out) ${0.3 + i * 0.1}s both`,
            }} />
          ))}
        </div>

        {/* Content */}
        <div className="container" style={{ position: 'relative', zIndex: 4 }}>
          <div style={{ maxWidth: 680 }}>
            <p style={{
              fontSize: 11, fontWeight: 500, letterSpacing: '0.16em',
              textTransform: 'uppercase', marginBottom: 28,
              background: 'linear-gradient(90deg, var(--red), #e8763d, var(--red))',
              backgroundSize: '200% auto',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              animation: 'eyebrow-shimmer 3s linear infinite, fade-in 0.5s ease both',
            }}>
              AI-Assisted Development Studio
            </p>

            <h1 style={{
              fontSize: 'clamp(52px, 10vw, 108px)',
              lineHeight: 0.95,
              letterSpacing: '-0.04em',
              marginBottom: 32,
              color: 'var(--text)',
            }}>
              <BlurText text="Build" />{' '}
              <span style={{
                display: 'inline-block',
                background: 'var(--red)',
                color: '#fff',
                padding: '0 0.1em 0.04em',
                animation: 'blur-word 0.75s var(--ease-out) 0.28s both',
              }}>fast.</span>
              <br />
              <span style={{ fontStyle: 'italic', color: 'var(--text-dim)' }}>
                <BlurText text="Ship real." />
              </span>
            </h1>

            <p style={{
              fontSize: 'clamp(16px, 2vw, 19px)',
              lineHeight: 1.7,
              color: 'var(--text-dim)',
              maxWidth: 480, marginBottom: 44,
              animation: 'fade-up 0.7s var(--ease-out) 0.65s both',
            }}>
              Tesselo builds high-quality web apps, tools, and MVPs using AI-assisted development. Your idea live in 48 hours — and you own everything.
            </p>

            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', animation: 'fade-up 0.7s var(--ease-out) 0.85s both' }}>
              <button
                data-hover
                onClick={() => document.querySelector('[data-tab="Contact"]')?.click()}
                className="btn-primary"
              >
                Start a project
              </button>
              <button
                data-hover
                onClick={() => document.querySelector('[data-tab="Work"]')?.click()}
                className="btn-ghost"
              >
                <span>View work ↗</span>
              </button>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{
          position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
          animation: 'fade-in 1s ease 1.4s both', opacity: 0.35,
        }}>
          <span style={{ fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--text-dim)' }}>Scroll</span>
          <div style={{
            width: 1, height: 40,
            background: 'linear-gradient(to bottom, var(--red), transparent)',
            animation: 'scroll-bar 2s ease-in-out infinite',
          }} />
        </div>
      </section>

      {/* ── Stats ─────────────────────────────────── */}
      <div style={{
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
        background: 'var(--bg-2)',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Subtle red gradient edge */}
        <div style={{
          position: 'absolute', left: 0, top: 0, bottom: 0, width: 3,
          background: 'linear-gradient(to bottom, var(--red), transparent)',
          opacity: 0.6,
        }} />
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1 }}>
            {STATS.map((s, i) => (
              <div key={i} className="reveal" style={{
                padding: 'clamp(24px, 3vw, 36px) 20px',
                textAlign: 'center',
                borderRight: i < 3 ? '1px solid var(--border)' : 'none',
                transitionDelay: `${i * 0.08}s`,
                position: 'relative',
              }}>
                <div style={{
                  fontFamily: 'var(--serif)',
                  fontSize: 'clamp(30px, 4.5vw, 48px)',
                  lineHeight: 1, marginBottom: 6, color: 'var(--text)',
                }}>
                  <CountUp target={s.value} suffix={s.suffix} />
                </div>
                <p style={{ fontSize: 11, color: 'var(--text-dim)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Services ──────────────────────────────── */}
      <section style={{ padding: 'clamp(60px, 10vw, 120px) 0' }}>
        <div className="container">
          {/* Section label with extending line */}
          <div className="reveal section-label-row" style={{ marginBottom: 'clamp(36px, 5vw, 56px)', display: 'flex', alignItems: 'center', gap: 20 }}>
            <span style={{
              fontFamily: 'var(--serif)',
              fontSize: 'clamp(22px, 3vw, 32px)',
              color: 'var(--text)',
              whiteSpace: 'nowrap',
            }}>
              Services
            </span>
            <span style={{
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--red)',
              whiteSpace: 'nowrap',
            }}>What we build</span>
            <div className="label-line" style={{
              flex: 1,
              height: 1,
              background: 'var(--border)',
              position: 'relative',
              overflow: 'hidden',
            }}>
              <div className="label-line-fill" style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(90deg, rgba(196,67,26,0.4), transparent)',
                transform: 'scaleX(0)',
                transformOrigin: 'left',
                transition: 'transform 1.2s var(--ease-out) 0.3s',
              }} />
            </div>
          </div>

          {/* Grid — background trick creates all grid lines automatically */}
          <div className="services-2col" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '1px',
            background: 'var(--border)',
            border: '1px solid var(--border)',
          }}>
            {SERVICES.map((s, i) => (
              <SpotlightCard key={i}>
                <div
                  className="reveal service-card"
                  style={{
                    padding: 'clamp(28px, 3vw, 44px)',
                    transitionDelay: `${i * 0.06}s`,
                    position: 'relative',
                    background: 'var(--bg)',
                    transition: 'background 0.45s var(--ease-out), color 0.45s var(--ease-out)',
                    cursor: 'default',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = '#f0ebe4'
                    e.currentTarget.style.color = '#0d0b09'
                    const num = e.currentTarget.querySelector('.svc-num')
                    const desc = e.currentTarget.querySelector('.svc-desc')
                    const arrow = e.currentTarget.querySelector('.svc-arrow')
                    if (num) num.style.color = 'var(--red)'
                    if (desc) desc.style.color = 'rgba(13,11,9,0.6)'
                    if (arrow) { arrow.style.opacity = '1'; arrow.style.transform = 'translate(0,0)' }
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'var(--bg)'
                    e.currentTarget.style.color = ''
                    const num = e.currentTarget.querySelector('.svc-num')
                    const desc = e.currentTarget.querySelector('.svc-desc')
                    const arrow = e.currentTarget.querySelector('.svc-arrow')
                    if (num) num.style.color = ''
                    if (desc) desc.style.color = ''
                    if (arrow) { arrow.style.opacity = '0'; arrow.style.transform = 'translate(-6px,4px)' }
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 16 }}>
                    <span className="svc-num" style={{
                      fontFamily: 'var(--serif)',
                      fontSize: 'clamp(28px, 3vw, 40px)',
                      color: 'var(--surface-2)',
                      lineHeight: 1,
                      transition: 'color 0.4s',
                    }}>{s.n}</span>
                    <span className="svc-arrow" style={{ fontSize: 18, color: 'var(--red)', opacity: 0, transform: 'translate(-6px, 4px)', transition: 'all 0.25s' }}>↗</span>
                  </div>
                  <h3 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(18px, 2vw, 24px)', marginBottom: 12, transition: 'color 0.4s' }}>{s.title}</h3>
                  <p className="svc-desc" style={{ fontSize: 14, lineHeight: 1.7, color: 'var(--text-dim)', transition: 'color 0.4s', flex: 1 }}>{s.desc}</p>
                </div>
              </SpotlightCard>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ──────────────────────────── */}
      <section style={{
        padding: 'clamp(60px, 10vw, 120px) 0',
        background: 'var(--bg-2)',
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Large decorative quote mark */}
        <div style={{
          position: 'absolute', top: '-0.1em', left: '50%', transform: 'translateX(-50%)',
          fontFamily: 'var(--serif)', fontSize: 'clamp(120px, 20vw, 260px)',
          color: 'var(--surface-2)', lineHeight: 1, pointerEvents: 'none',
          userSelect: 'none', zIndex: 0, opacity: 0.6,
        }}>&#8220;</div>

        <div className="container">
          <div className="reveal" style={{ maxWidth: 760, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
            <AnimatedTag delay={0} center>What clients say</AnimatedTag>

            <div style={{ minHeight: 160, marginTop: 16 }}>
              <blockquote
                key={testimonialIdx}
                style={{
                  fontFamily: 'var(--serif)',
                  fontSize: 'clamp(20px, 3vw, 32px)',
                  fontStyle: 'italic',
                  lineHeight: 1.45,
                  color: 'var(--text)',
                  marginBottom: 28,
                  animation: 'fade-up 0.5s var(--ease-out) both',
                }}
              >
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <p style={{ fontSize: 13, color: 'var(--text-dim)' }}>
                <strong style={{ color: 'var(--text)', fontWeight: 500 }}>{t.name}</strong>
                {' — '}{t.role}
              </p>
            </div>

            <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginTop: 36 }}>
              {TESTIMONIALS.map((_, i) => (
                <button key={i} data-hover onClick={() => setTestimonialIdx(i)} style={{
                  width: i === testimonialIdx ? 28 : 8, height: 8, borderRadius: 4,
                  background: i === testimonialIdx ? 'var(--red)' : 'var(--surface-2)',
                  border: 'none',
                  transition: 'all 0.35s var(--ease-out)',
                }} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Process ───────────────────────────────── */}
      <section ref={processRef} style={{ padding: 'clamp(60px, 10vw, 120px) 0', position: 'relative', overflow: 'hidden' }}>
        {/* Watermark — scoped to section, not grid, so it never overlaps step content */}
        <div style={{
          position: 'absolute', top: '50%', right: '-0.05em',
          transform: 'translateY(-50%)',
          fontFamily: 'var(--serif)', fontSize: 'clamp(120px, 22vw, 280px)',
          fontStyle: 'italic', color: 'var(--surface)',
          pointerEvents: 'none', userSelect: 'none',
          lineHeight: 1, zIndex: 0, opacity: 0.55,
          transition: 'content 0s',
        }}>
          {hoverProcess ?? 'i'}
        </div>

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          {/* Section label with extending line */}
          <div className="reveal section-label-row" style={{ marginBottom: 'clamp(36px, 5vw, 56px)', display: 'flex', alignItems: 'center', gap: 20 }}>
            <span style={{
              fontFamily: 'var(--serif)',
              fontSize: 'clamp(22px, 3vw, 32px)',
              color: 'var(--text)',
              whiteSpace: 'nowrap',
            }}>
              How it works
            </span>
            <span style={{
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--red)',
              whiteSpace: 'nowrap',
            }}>Simple by design</span>
            <div className="label-line" style={{
              flex: 1, height: 1, background: 'var(--border)',
              position: 'relative', overflow: 'hidden',
            }}>
              <div className="label-line-fill" style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(90deg, rgba(196,67,26,0.4), transparent)',
                transform: 'scaleX(0)', transformOrigin: 'left',
                transition: 'transform 1.2s var(--ease-out) 0.3s',
              }} />
            </div>
          </div>

          <div style={{ position: 'relative' }}>
            {/*
              Timeline line: top = paddingTop(40) + half circle(21) = 61px
              inset 21px each side so line starts/ends at circle centres, not the wall
            */}
            <div style={{
              position: 'absolute',
              top: 61,
              left: 21, right: 21,
              height: 1,
              background: 'var(--border)',
              zIndex: 0,
              display: 'none',
            }} className="process-line-bg" />
            <div style={{
              position: 'absolute',
              top: 61, left: 21,
              height: 1,
              background: 'linear-gradient(90deg, var(--red), rgba(196,67,26,0.25))',
              width: processVisible ? 'calc(100% - 42px)' : '0%',
              transition: 'width 1.6s var(--ease-out) 0.4s',
              zIndex: 0,
              display: 'none',
            }} className="process-line-fill" />

            <div className="process-4col" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0, position: 'relative' }}>
              {PROCESS.map((step, i) => (
                <div
                  key={i}
                  className="reveal"
                  style={{
                    position: 'relative',
                    zIndex: 1,
                    transitionDelay: `${i * 0.1}s`,
                    cursor: 'default',
                    /* Equal padding all round — no special-casing first/last */
                    padding: '40px clamp(20px, 2.5vw, 36px) 0',
                    borderLeft: i > 0 ? '1px solid var(--border)' : 'none',
                  }}
                  onMouseEnter={() => setHoverProcess(step.n)}
                  onMouseLeave={() => setHoverProcess(null)}
                >
                  {/* Circle — solid bg so it sits on top of the timeline line */}
                  <div style={{
                    width: 42, height: 42, borderRadius: '50%',
                    border: hoverProcess === step.n ? '1px solid var(--red)' : '1px solid rgba(196,67,26,0.35)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    marginBottom: 28,
                    fontFamily: 'var(--serif)', fontSize: 15, fontStyle: 'italic', color: 'var(--red)',
                    background: hoverProcess === step.n ? '#1a1208' : 'var(--bg)',
                    transition: 'border-color 0.25s, background 0.25s, box-shadow 0.25s',
                    boxShadow: hoverProcess === step.n ? '0 0 0 5px rgba(196,67,26,0.07)' : 'none',
                    position: 'relative', zIndex: 2,
                  }}>{step.n}</div>

                  <h3 style={{ fontFamily: 'var(--serif)', fontSize: 20, color: 'var(--text)', marginBottom: 10 }}>{step.title}</h3>
                  <p style={{ fontSize: 13.5, lineHeight: 1.75, color: 'var(--text-dim)', paddingBottom: 40 }}>{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────── */}
      <section style={{
        padding: 'clamp(60px, 8vw, 110px) 0',
        background: 'var(--surface)',
        borderTop: '1px solid var(--border)',
        textAlign: 'center',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Red glow behind CTA */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 500, height: 300, borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(196,67,26,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div className="container reveal" style={{ position: 'relative', zIndex: 1 }}>
          <AnimatedTag center>Ready?</AnimatedTag>
          <h2 style={{ fontSize: 'clamp(28px, 4.5vw, 58px)', marginBottom: 16, color: 'var(--text)', fontFamily: 'var(--serif)' }}>
            Let&apos;s build something real.
          </h2>
          <p style={{ fontSize: 16, color: 'var(--text-dim)', marginBottom: 40, maxWidth: 400, margin: '0 auto 40px', lineHeight: 1.65 }}>
            Describe what you want. Get a response within the hour.
          </p>
          <a href="mailto:hello@tesselo.dev" data-hover className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            hello@tesselo.dev ↗
          </a>
        </div>
      </section>

      {/* ── Footer ────────────────────────────────── */}
      <footer style={{ padding: 'clamp(28px, 4vw, 44px) 0', borderTop: '1px solid var(--border)', background: 'var(--bg)' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <span style={{ fontFamily: 'var(--serif)', fontSize: 15, color: 'var(--text-dim)' }}>
            Tesselo<span style={{ color: 'var(--red)' }}>.Dev</span>
          </span>
          <a href="https://tesselo.dev" target="_blank" rel="noopener noreferrer" style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-faint)', transition: 'color 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--text-dim)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--text-faint)'}>
            Designed &amp; Built by Tesselo
          </a>
          <span style={{ fontSize: 12, color: 'var(--text-faint)' }}>© {new Date().getFullYear()}</span>
        </div>
      </footer>
    </div>
  )
}
