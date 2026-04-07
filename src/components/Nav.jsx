import { useState } from 'react'

const TABS = ['Home', 'Work', 'About', 'Contact']

function LogoMark() {
  return (
    <div style={{ position: 'relative', width: 24, height: 24, flexShrink: 0 }}>
      <div style={{
        position: 'absolute', top: 0, left: 0,
        width: 11, height: 11, borderRadius: 3,
        background: 'var(--red)',
      }} />
      <div style={{
        position: 'absolute', bottom: 0, right: 0,
        width: 11, height: 11, borderRadius: 3,
        background: '#f0ebe4',
      }} />
    </div>
  )
}

export default function Nav({ activeTab, setActiveTab, scrolled }) {
  const [menuOpen, setMenuOpen] = useState(false)

  const handleTab = (tab) => {
    setActiveTab(tab)
    setMenuOpen(false)
  }

  return (
    <>
      <nav style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        height: 'var(--nav-h)',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        padding: '0 clamp(20px, 4vw, 60px)',
        borderBottom: scrolled ? '1px solid rgba(196,67,26,0.15)' : '1px solid var(--border)',
        background: scrolled ? 'rgba(10, 8, 7, 0.97)' : 'rgba(13, 11, 9, 0.82)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        boxShadow: scrolled ? '0 4px 40px rgba(0,0,0,0.5)' : 'none',
        transition: 'border-color 0.35s, box-shadow 0.35s, background 0.35s',
      }}>
        {/* Logo */}
        <button
          onClick={() => handleTab('Home')}
          data-hover
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            marginRight: 'auto',
          }}
        >
          <LogoMark />
          <span style={{
            fontFamily: 'var(--serif)',
            fontSize: 17,
            fontWeight: 400,
            color: 'var(--text)',
            letterSpacing: '-0.01em',
          }}>
            Tesselo<span style={{ color: 'var(--red)' }}>.Dev</span>
          </span>
        </button>

        {/* Desktop tabs — pill group */}
        <div
          className="nav-desktop"
          style={{
            display: 'flex',
            alignItems: 'center',
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid var(--border)',
            borderRadius: 10,
            padding: 4,
            gap: 2,
          }}
        >
          {TABS.map(tab => (
            <button
              key={tab}
              onClick={() => handleTab(tab)}
              data-hover
              style={{
                padding: '7px 16px',
                fontSize: 12,
                fontWeight: 500,
                letterSpacing: '0.05em',
                color: activeTab === tab ? 'var(--text)' : 'rgba(240,235,228,0.4)',
                borderRadius: 7,
                background: activeTab === tab ? 'rgba(255,255,255,0.1)' : 'transparent',
                border: 'none',
                transition: 'color 0.2s, background 0.2s',
                whiteSpace: 'nowrap',
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Hamburger */}
        <button
          className="nav-hamburger"
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Menu"
          data-hover
          style={{ display: 'none', flexDirection: 'column', gap: 5, padding: 8 }}
        >
          {[0, 1, 2].map(i => (
            <span key={i} style={{
              display: 'block', width: 22, height: 1.5,
              background: 'var(--text)',
              transition: 'transform 0.25s, opacity 0.25s',
              transformOrigin: 'center',
              transform: menuOpen
                ? i === 0 ? 'translateY(6.5px) rotate(45deg)'
                  : i === 2 ? 'translateY(-6.5px) rotate(-45deg)'
                  : 'scaleX(0)'
                : 'none',
              opacity: menuOpen && i === 1 ? 0 : 1,
            }} />
          ))}
        </button>
      </nav>

      {/* Mobile menu */}
      <div style={{
        position: 'fixed', inset: 0, top: 'var(--nav-h)',
        background: 'rgba(10, 8, 7, 0.97)',
        backdropFilter: 'blur(16px)',
        zIndex: 99,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        gap: 8,
        opacity: menuOpen ? 1 : 0,
        pointerEvents: menuOpen ? 'auto' : 'none',
        transition: 'opacity 0.25s',
      }}>
        {TABS.map((tab, i) => (
          <button
            key={tab}
            onClick={() => handleTab(tab)}
            style={{
              fontFamily: 'var(--serif)',
              fontSize: 'clamp(32px, 8vw, 52px)',
              fontWeight: 400,
              color: activeTab === tab ? 'var(--red)' : 'var(--text)',
              padding: '12px 0',
              opacity: menuOpen ? 1 : 0,
              transform: menuOpen ? 'translateY(0)' : 'translateY(20px)',
              transition: `opacity 0.35s ${i * 0.06}s, transform 0.35s ${i * 0.06}s var(--ease-out)`,
            }}
          >
            {tab}
          </button>
        ))}
      </div>
    </>
  )
}
