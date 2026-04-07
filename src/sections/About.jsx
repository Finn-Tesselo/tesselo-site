import { useEffect, useRef } from 'react'
import { useReveal } from '../hooks/useReveal'

const TERMINAL_SCRIPT = [
  { cmd: 'whoami', output: 'finn alderton — founder, tesselo.dev' },
  { cmd: 'cat about.json', output: `{
  "role": "AI-Assisted Developer",
  "location": "United Kingdom",
  "stack": ["Claude API", "HTML", "CSS", "JS", "React"],
  "delivery": "48 hours",
  "ownership": "100% yours"
}` },
  { cmd: 'ls ./services', output: 'mvp-builds/  landing-pages/  ai-tools/\ninternal-tools/  retainer/  consulting/' },
  { cmd: 'echo $PHILOSOPHY', output: '"build fast. ship real. own everything."' },
]

function Terminal({ active }) {
  const outputRef = useRef(null)
  const idxRef = useRef(0)
  const timeouts = useRef([])

  const clear = () => timeouts.current.forEach(clearTimeout)

  const typeText = (el, text, done) => {
    let i = 0
    el.textContent = ''
    const tick = () => {
      if (i < text.length) {
        el.textContent += text[i++]
        timeouts.current.push(setTimeout(tick, 18 + Math.random() * 22))
      } else {
        done?.()
      }
    }
    tick()
  }

  const runScript = () => {
    const container = outputRef.current
    if (!container) return
    container.innerHTML = ''
    idxRef.current = 0

    const runStep = (i) => {
      if (i >= TERMINAL_SCRIPT.length || !container) return
      const step = TERMINAL_SCRIPT[i]

      // Command line
      const cmdLine = document.createElement('div')
      cmdLine.style.cssText = 'display:flex;align-items:center;gap:8px;margin-bottom:4px;'
      const prompt = document.createElement('span')
      prompt.textContent = '❯'
      prompt.style.color = '#c4431a'
      const cmdSpan = document.createElement('span')
      cmdSpan.style.color = '#f0ebe4'
      cmdLine.appendChild(prompt)
      cmdLine.appendChild(cmdSpan)
      container.appendChild(cmdLine)
      container.scrollTop = container.scrollHeight

      typeText(cmdSpan, step.cmd, () => {
        // Output
        const out = document.createElement('pre')
        out.style.cssText = `
          color: rgba(240,235,228,0.55);
          font-size: 13px;
          line-height: 1.6;
          margin: 4px 0 20px 0;
          white-space: pre-wrap;
          word-break: break-word;
          font-family: ui-monospace, 'Cascadia Code', Consolas, monospace;
          animation: fade-in 0.3s ease both;
        `
        out.textContent = step.output
        container.appendChild(out)
        container.scrollTop = container.scrollHeight

        timeouts.current.push(setTimeout(() => runStep(i + 1), 600))
      })
    }

    runStep(0)
  }

  useEffect(() => {
    if (active) {
      clear()
      timeouts.current.push(setTimeout(runScript, 300))
    }
    return clear
  }, [active])

  return (
    <div style={{
      background: '#0a0a0a',
      border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: 10,
      overflow: 'hidden',
      fontFamily: 'ui-monospace, "Cascadia Code", Consolas, monospace',
    }}>
      {/* Title bar */}
      <div style={{
        padding: '12px 16px',
        background: '#141414',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
      }}>
        {['#ff5f57', '#febc2e', '#28c840'].map((c, i) => (
          <div key={i} style={{ width: 10, height: 10, borderRadius: '50%', background: c }} />
        ))}
        <span style={{
          marginLeft: 8,
          fontSize: 12,
          color: 'rgba(240,235,228,0.3)',
          letterSpacing: '0.04em',
        }}>tesselo — bash</span>
      </div>

      {/* Output */}
      <div
        ref={outputRef}
        style={{
          padding: '20px 20px 24px',
          minHeight: 280,
          maxHeight: 340,
          overflowY: 'auto',
          scrollbarWidth: 'thin',
          scrollbarColor: '#333 transparent',
        }}
      />

      {/* Blinking cursor at bottom */}
      <div style={{
        padding: '0 20px 16px',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
      }}>
        <span style={{ color: '#c4431a', fontSize: 14 }}>❯</span>
        <span style={{
          display: 'inline-block',
          width: 8,
          height: 16,
          background: 'rgba(240,235,228,0.7)',
          animation: 'blink 1s step-end infinite',
        }} />
      </div>
    </div>
  )
}

export default function About({ active }) {
  const revealRef = useReveal()

  return (
    <div ref={revealRef} style={{ paddingBottom: 80 }}>
      <section style={{ padding: 'clamp(48px, 8vw, 96px) 0' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 'clamp(40px, 6vw, 80px)',
            alignItems: 'center',
          }}>
            {/* Left */}
            <div className="reveal">
              <p className="tag" style={{ marginBottom: 20 }}>About Tesselo</p>
              <h1 style={{
                fontFamily: 'var(--serif)',
                fontSize: 'clamp(32px, 5vw, 56px)',
                color: 'var(--text)',
                marginBottom: 24,
                lineHeight: 1.1,
              }}>
                Vibe coding,<br />
                <span style={{ fontStyle: 'italic', color: 'var(--text-dim)' }}>actually shipped.</span>
              </h1>
              <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--text-dim)', marginBottom: 20 }}>
                Tesselo is a one-person AI-assisted development studio run by Finn Alderton, based in the UK. I use Claude as my primary development partner to build fast, high-quality digital products.
              </p>
              <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--text-dim)', marginBottom: 32 }}>
                The pitch is simple: you describe what you want, I build it — usually within 48 hours — and you own the code completely. No agency markup, no lock-in, no fluff.
              </p>

              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 1,
                border: '1px solid var(--border)',
              }}>
                {[
                  { label: 'Location', value: 'United Kingdom' },
                  { label: 'Delivery', value: '48 hours avg.' },
                  { label: 'Speciality', value: 'AI-assisted builds' },
                  { label: 'Ownership', value: '100% client-owned' },
                ].map((item, i) => (
                  <div key={i} style={{
                    padding: '16px 20px',
                    borderRight: i % 2 === 0 ? '1px solid var(--border)' : 'none',
                    borderBottom: i < 2 ? '1px solid var(--border)' : 'none',
                    background: 'var(--surface)',
                  }}>
                    <p style={{ fontSize: 11, color: 'var(--text-faint)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>
                      {item.label}
                    </p>
                    <p style={{ fontSize: 14, color: 'var(--text)', fontWeight: 500 }}>{item.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Terminal */}
            <div className="reveal" style={{ transitionDelay: '0.15s' }}>
              <Terminal active={active} />
            </div>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section style={{
        padding: 'clamp(40px, 6vw, 72px) 0',
        background: 'var(--bg-2)',
        borderTop: '1px solid var(--border)',
      }}>
        <div className="container">
          <p className="tag reveal" style={{ marginBottom: 32 }}>Tools &amp; stack</p>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 10,
          }}>
            {[
              'Claude API', 'HTML5', 'CSS3', 'JavaScript', 'React',
              'Vite', 'GitHub Pages', 'Formspree', 'Figma', 'Hostinger',
            ].map((skill, i) => (
              <span
                key={skill}
                className="reveal"
                style={{
                  padding: '8px 16px',
                  border: '1px solid var(--border)',
                  borderRadius: 4,
                  fontSize: 13,
                  color: 'var(--text-dim)',
                  background: 'var(--surface)',
                  transitionDelay: `${i * 0.04}s`,
                  transition: 'border-color 0.2s, color 0.2s, transform 0.65s var(--ease-out)',
                  transform: 'translateY(28px)',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--border-red)'; e.currentTarget.style.color = 'var(--text)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-dim)' }}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        padding: 'clamp(24px, 3vw, 40px) 0',
        borderTop: '1px solid var(--border)',
        textAlign: 'center',
        marginTop: 40,
      }}>
        <a
          href="https://tesselo.dev"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontSize: 11,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'var(--text-faint)',
            transition: 'color 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.color = 'var(--text-dim)'}
          onMouseLeave={e => e.currentTarget.style.color = 'var(--text-faint)'}
        >
          Designed &amp; Built by Tesselo
        </a>
      </footer>
    </div>
  )
}
