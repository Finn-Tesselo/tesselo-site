import { useRef, useState } from 'react'
import { useReveal } from '../hooks/useReveal'

const PROJECTS = [
  {
    id: 'bookit',
    title: 'BookIt',
    category: 'Wellness Booking',
    tags: ['Booking App', 'Animations', 'Multi-step Flow'],
    desc: 'Luxury wellness booking experience. Aesop-inspired editorial aesthetic with persistent DOM transitions and cinematic micro-interactions.',
    href: 'https://tesselo.dev/bookit.html',
    accent: '#b5654a',
    pattern: 'radial',
  },
  {
    id: 'kanflow',
    title: 'Kanflow',
    category: 'Project Management',
    tags: ['Kanban', 'Drag & Drop', 'Dark UI'],
    desc: 'Control Room–inspired Kanban board. Dark cinematic aesthetic with coral accents and smooth card-drag interactions.',
    href: 'https://tesselo.dev/kanflow.html',
    accent: '#e06b52',
    pattern: 'grid',
  },
  {
    id: 'briefly',
    title: 'Briefly',
    category: 'AI Summariser',
    tags: ['Claude API', 'AI Tool', 'Real-time'],
    desc: 'Signal aesthetic AI summariser with real Claude API integration, dark glass UI, and electric indigo accents.',
    href: 'https://tesselo.dev/briefly.html',
    accent: '#6366f1',
    pattern: 'diagonal',
  },
  {
    id: 'mapstudio',
    title: 'Map Studio',
    category: 'Mapping Tool',
    tags: ['Mapping', 'Data Vis', 'Interactive'],
    desc: 'Interactive mapping tool for data exploration. Custom controls, layer management, and a clean studio interface.',
    href: 'https://tesselo.dev/mapstudio.html',
    accent: '#2a9d8f',
    pattern: 'dots',
  },
  {
    id: 'tesselo',
    title: 'Tesselo.Dev',
    category: 'Studio Site',
    tags: ['Portfolio', 'Animations', 'SPA'],
    desc: 'The site you\'re on right now. Dark editorial portfolio with MagnetLines, tile parallax, custom cursor, and terminal about page.',
    href: 'https://tesselo.dev',
    accent: '#c4431a',
    pattern: 'tile',
  },
  {
    id: 'flowdesk',
    title: 'FlowDesk',
    category: 'AI SaaS',
    tags: ['SaaS', 'Claude API', 'SMB Tool'],
    desc: 'AI-powered admin assistant for SMBs. Streaming Claude API integration, £49/mo pricing, built for real business workflows.',
    href: '#',
    accent: '#8b5cf6',
    pattern: 'wave',
    comingSoon: true,
  },
]

/* Pattern generators for card preview areas */
const getPattern = (accent, pattern) => {
  switch (pattern) {
    case 'radial':
      return `radial-gradient(circle at 30% 50%, ${accent}28 0%, transparent 60%), radial-gradient(circle at 80% 20%, ${accent}15 0%, transparent 50%)`
    case 'grid':
      return `linear-gradient(${accent}12 1px, transparent 1px), linear-gradient(90deg, ${accent}12 1px, transparent 1px)`
    case 'diagonal':
      return `repeating-linear-gradient(45deg, ${accent}10 0px, ${accent}10 1px, transparent 1px, transparent 12px)`
    case 'dots':
      return `radial-gradient(${accent}30 1.5px, transparent 1.5px)`
    case 'tile':
      return `linear-gradient(135deg, ${accent}18 25%, transparent 25%), linear-gradient(225deg, ${accent}18 25%, transparent 25%)`
    case 'wave':
      return `repeating-linear-gradient(90deg, ${accent}10 0px, transparent 1px, transparent 16px, ${accent}10 17px)`
    default:
      return `linear-gradient(135deg, ${accent}20, transparent)`
  }
}

const getPatternSize = (pattern) => {
  switch (pattern) {
    case 'grid': return '24px 24px'
    case 'dots': return '18px 18px'
    case 'tile': return '30px 30px'
    default: return 'auto'
  }
}

const FILTERS = ['All', 'Booking App', 'Kanban', 'AI Tool', 'Mapping', 'Portfolio', 'SaaS']

const TAG_MAP = {
  'Booking App': ['Booking App'],
  'Kanban': ['Kanban'],
  'AI Tool': ['AI Tool', 'Claude API'],
  'Mapping': ['Mapping'],
  'Portfolio': ['Portfolio'],
  'SaaS': ['SaaS'],
}

export default function Work({ setActiveTab }) {
  const revealRef = useReveal()
  const [activeFilter, setActiveFilter] = useState('All')

  const filtered = activeFilter === 'All'
    ? PROJECTS
    : PROJECTS.filter(p => {
        const match = TAG_MAP[activeFilter] ?? [activeFilter]
        return p.tags.some(t => match.some(m => t.includes(m)))
      })

  return (
    <div ref={revealRef} style={{ paddingBottom: 80 }}>
      <section style={{ padding: 'clamp(48px, 8vw, 96px) 0 0' }}>
        <div className="container">
          <div className="reveal" style={{ marginBottom: 'clamp(28px, 4vw, 44px)' }}>
            <p className="tag" style={{ marginBottom: 16 }}>Selected work</p>
            <h1 style={{
              fontFamily: 'var(--serif)',
              fontSize: 'clamp(32px, 5vw, 62px)',
              color: 'var(--text)',
              marginBottom: 16,
            }}>
              What we&apos;ve built
            </h1>
            <p style={{ fontSize: 16, color: 'var(--text-dim)', maxWidth: 480, lineHeight: 1.65 }}>
              Live demos — every project is a working product, not a mockup.
            </p>
          </div>
        </div>

        {/* Sticky filter bar */}
        <div style={{
          position: 'sticky',
          top: 0,
          zIndex: 10,
          background: 'rgba(13,11,9,0.92)',
          backdropFilter: 'blur(12px)',
          borderTop: '1px solid var(--border)',
          borderBottom: '1px solid var(--border)',
          padding: '12px clamp(20px, 4vw, 60px)',
          display: 'flex',
          gap: 6,
          flexWrap: 'wrap',
          marginBottom: 1,
        }}>
          {FILTERS.map(f => (
            <button
              key={f}
              data-hover
              onClick={() => setActiveFilter(f)}
              style={{
                fontFamily: 'var(--sans)',
                fontSize: 11,
                fontWeight: 500,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                padding: '6px 14px',
                borderRadius: 6,
                border: '1px solid',
                borderColor: activeFilter === f ? 'var(--red)' : 'var(--border)',
                background: activeFilter === f ? 'var(--red)' : 'transparent',
                color: activeFilter === f ? '#fff' : 'var(--text-dim)',
                transition: 'all 0.2s var(--ease-out)',
                cursor: 'none',
              }}
            >
              {f}
            </button>
          ))}
          <span style={{
            marginLeft: 'auto',
            fontSize: 11,
            color: 'var(--text-faint)',
            letterSpacing: '0.06em',
            alignSelf: 'center',
          }}>
            {filtered.length} project{filtered.length !== 1 ? 's' : ''}
          </span>
        </div>

        <div className="container" style={{ paddingTop: 1 }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: 1,
            border: '1px solid var(--border)',
            marginTop: 1,
          }}>
            {filtered.length > 0 ? filtered.map((p, i) => (
              <ProjectCard key={p.id} project={p} index={i} total={filtered.length} />
            )) : (
              <div style={{
                gridColumn: '1 / -1',
                padding: '64px 40px',
                textAlign: 'center',
                color: 'var(--text-faint)',
              }}>
                <p style={{ fontFamily: 'var(--serif)', fontSize: 22, marginBottom: 8, color: 'var(--text-dim)' }}>Nothing here yet</p>
                <p style={{ fontSize: 13 }}>More projects coming soon.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <div className="container reveal">
        <div style={{
          padding: 'clamp(32px, 5vw, 56px)',
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: 8,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 24,
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* Subtle accent glow */}
          <div style={{
            position: 'absolute', right: 0, top: 0, bottom: 0, width: 200,
            background: 'radial-gradient(ellipse at right, rgba(196,67,26,0.06) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <h3 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(20px, 3vw, 30px)', color: 'var(--text)', marginBottom: 8 }}>
              Want something like this?
            </h3>
            <p style={{ fontSize: 14, color: 'var(--text-dim)' }}>
              Every demo here was built in under 48 hours.
            </p>
          </div>
          <button
            data-hover
            onClick={() => setActiveTab('Contact')}
            className="btn-primary"
            style={{ flexShrink: 0, position: 'relative', zIndex: 1 }}
          >
            Start a project →
          </button>
        </div>
      </div>

      <footer style={{
        marginTop: 'clamp(40px, 6vw, 80px)',
        padding: 'clamp(24px, 3vw, 40px) 0',
        borderTop: '1px solid var(--border)',
        textAlign: 'center',
      }}>
        <a href="https://tesselo.dev" target="_blank" rel="noopener noreferrer"
          style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-faint)', transition: 'color 0.2s' }}
          onMouseEnter={e => e.currentTarget.style.color = 'var(--text-dim)'}
          onMouseLeave={e => e.currentTarget.style.color = 'var(--text-faint)'}>
          Designed &amp; Built by Tesselo
        </a>
      </footer>
    </div>
  )
}

function ProjectCard({ project: p, index: i, total }) {
  const shimmerRef = useRef(null)

  const onMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    if (shimmerRef.current) {
      shimmerRef.current.style.left = `${x - 25}%`
      shimmerRef.current.style.opacity = '1'
    }
  }

  const onMouseLeave = (e) => {
    e.currentTarget.style.background = 'var(--bg)'
    if (shimmerRef.current) shimmerRef.current.style.opacity = '0'
  }

  const handleRipple = (e) => {
    if (!window.matchMedia('(pointer: coarse)').matches) return
    const rect = e.currentTarget.getBoundingClientRect()
    const touch = e.touches[0]
    const ripple = document.createElement('div')
    ripple.style.cssText = `position:absolute;left:${touch.clientX-rect.left}px;top:${touch.clientY-rect.top}px;
      width:20px;height:20px;margin:-10px;border-radius:50%;background:rgba(196,67,26,0.2);
      pointer-events:none;animation:ripple-out 0.6s ease forwards;z-index:10;`
    e.currentTarget.appendChild(ripple)
    ripple.addEventListener('animationend', () => ripple.remove())
  }

  const patternBg = getPattern(p.accent, p.pattern)
  const patternSize = getPatternSize(p.pattern)

  return (
    <div
      className="reveal project-card"
      style={{
        position: 'relative',
        overflow: 'hidden',
        background: 'var(--bg)',
        borderRight: (i % 2 === 0) ? '1px solid var(--border)' : 'none',
        borderBottom: i < (total ?? PROJECTS.length) - 2 ? '1px solid var(--border)' : 'none',
        transitionDelay: `${i * 0.07}s`,
        transition: 'background 0.3s',
        display: 'flex',
        flexDirection: 'column',
      }}
      onMouseEnter={e => e.currentTarget.style.background = 'var(--surface)'}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onTouchStart={handleRipple}
    >
      {/* Shimmer sweep */}
      <div ref={shimmerRef} style={{
        position: 'absolute',
        top: 0, bottom: 0,
        width: '50%',
        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.02), transparent)',
        opacity: 0,
        transition: 'opacity 0.3s',
        pointerEvents: 'none',
        zIndex: 5,
      }} />

      {/* Visual preview header */}
      <div style={{
        height: 110,
        background: `linear-gradient(160deg, var(--surface) 0%, rgba(13,11,9,0.8) 100%)`,
        position: 'relative',
        overflow: 'hidden',
        flexShrink: 0,
      }}>
        {/* Pattern layer */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: patternBg,
          backgroundSize: patternSize !== 'auto' ? patternSize : undefined,
          opacity: 0.9,
        }} />
        {/* Accent glow */}
        <div style={{
          position: 'absolute', bottom: -20, right: -20,
          width: 100, height: 100, borderRadius: '50%',
          background: `radial-gradient(circle, ${p.accent}40 0%, transparent 70%)`,
        }} />
        {/* Top accent line */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 2,
          background: p.accent,
          opacity: 0.8,
          transform: 'scaleX(0)',
          transformOrigin: 'left',
          transition: 'transform 0.4s var(--ease-out)',
        }} className="accent-bar" />
        {/* Category label in preview */}
        <div style={{
          position: 'absolute', bottom: 12, left: 16,
          fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase',
          color: `${p.accent}cc`,
          fontWeight: 500,
        }}>{p.category}</div>
      </div>

      <div style={{ padding: 'clamp(20px, 2.5vw, 28px)', display: 'flex', flexDirection: 'column', flex: 1 }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 12 }}>
          <h3 style={{
            fontFamily: 'var(--serif)',
            fontSize: 'clamp(20px, 2.5vw, 26px)',
            color: 'var(--text)',
            lineHeight: 1.1,
          }}>{p.title}</h3>

          {p.comingSoon ? (
            <span style={{
              fontSize: 10, fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase',
              color: 'var(--text-faint)', border: '1px solid var(--border)', borderRadius: 3,
              padding: '4px 8px', whiteSpace: 'nowrap', flexShrink: 0, marginLeft: 8,
            }}>Soon</span>
          ) : (
            <a
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              data-hover
              style={{
                fontSize: 11, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase',
                color: 'var(--red)', border: '1px solid var(--border-red)', borderRadius: 3,
                padding: '5px 10px', whiteSpace: 'nowrap', flexShrink: 0, marginLeft: 8,
                transition: 'background 0.2s, color 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'var(--red)'; e.currentTarget.style.color = '#fff' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--red)' }}
            >
              Live Demo ↗
            </a>
          )}
        </div>

        <p style={{ fontSize: 14, lineHeight: 1.7, color: 'var(--text-dim)', marginBottom: 16, flex: 1 }}>{p.desc}</p>

        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {p.tags.map(tag => (
            <span key={tag} style={{
              fontSize: 11, padding: '3px 8px',
              background: 'var(--surface-2)',
              border: '1px solid var(--border)',
              borderRadius: 3, color: 'var(--text-dim)',
              letterSpacing: '0.04em',
            }}>{tag}</span>
          ))}
        </div>
      </div>
    </div>
  )
}
