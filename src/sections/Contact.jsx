import { useState } from 'react'
import { useReveal } from '../hooks/useReveal'

const SERVICES = [
  'MVP Build', 'Landing Page', 'AI-Powered Tool',
  'Internal Tool', 'Dev Retainer', 'AI Consulting',
]

const BUDGETS = ['< £1,500', '£1,500 – £5,000', '£5,000 – £15,000', '£15,000+']

export default function Contact() {
  const revealRef = useReveal()
  const [form, setForm] = useState({ name: '', email: '', service: '', budget: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | sending | success | error

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('https://formspree.io/f/mjgpgrkk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(form),
      })
      setStatus(res.ok ? 'success' : 'error')
    } catch {
      setStatus('error')
    }
  }

  const inputStyle = {
    width: '100%',
    padding: '13px 16px',
    background: 'var(--surface)',
    border: '1px solid var(--border)',
    borderRadius: 4,
    color: 'var(--text)',
    fontFamily: 'var(--sans)',
    fontSize: 14,
    outline: 'none',
    transition: 'border-color 0.2s, box-shadow 0.2s',
  }

  const labelStyle = {
    display: 'block',
    fontSize: 12,
    fontWeight: 500,
    letterSpacing: '0.07em',
    textTransform: 'uppercase',
    color: 'var(--text-dim)',
    marginBottom: 8,
  }

  return (
    <div ref={revealRef} style={{ paddingBottom: 80 }}>
      <section style={{ padding: 'clamp(48px, 8vw, 96px) 0' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 'clamp(40px, 6vw, 80px)',
          }}>
            {/* Left — info */}
            <div className="reveal">
              <p className="tag" style={{ marginBottom: 20 }}>Get in touch</p>
              <h1 style={{
                fontFamily: 'var(--serif)',
                fontSize: 'clamp(32px, 5vw, 56px)',
                color: 'var(--text)',
                marginBottom: 20,
                lineHeight: 1.1,
              }}>
                Start a project.<br />
                <span style={{ fontStyle: 'italic', color: 'var(--text-dim)' }}>Get a reply today.</span>
              </h1>
              <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--text-dim)', marginBottom: 40 }}>
                Describe what you&apos;re trying to build. No specs needed — a conversation is enough to get started. I respond fast.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                {[
                  { icon: '✉', label: 'Email', value: 'hello@tesselo.dev', href: 'mailto:hello@tesselo.dev' },
                  { icon: '⏱', label: 'Response time', value: 'Usually within an hour' },
                  { icon: '📍', label: 'Based in', value: 'United Kingdom' },
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                    <div style={{
                      width: 40,
                      height: 40,
                      borderRadius: 4,
                      background: 'var(--surface)',
                      border: '1px solid var(--border)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 16,
                      flexShrink: 0,
                    }}>
                      {item.icon}
                    </div>
                    <div>
                      <p style={{ fontSize: 11, color: 'var(--text-faint)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 2 }}>
                        {item.label}
                      </p>
                      {item.href ? (
                        <a href={item.href} data-hover style={{ fontSize: 14, color: 'var(--red)', fontWeight: 500 }}>
                          {item.value}
                        </a>
                      ) : (
                        <p style={{ fontSize: 14, color: 'var(--text)', fontWeight: 500 }}>{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — form */}
            <div className="reveal" style={{ transitionDelay: '0.15s' }}>
              {status === 'success' ? (
                <div style={{
                  padding: 'clamp(32px, 5vw, 56px)',
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderRadius: 8,
                  textAlign: 'center',
                  animation: 'fade-up 0.5s var(--ease-out) both',
                }}>
                  <div style={{
                    width: 56,
                    height: 56,
                    borderRadius: '50%',
                    background: 'var(--red-dim)',
                    border: '1px solid var(--border-red)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 20px',
                    fontSize: 22,
                  }}>✓</div>
                  <h3 style={{ fontFamily: 'var(--serif)', fontSize: 26, color: 'var(--text)', marginBottom: 12 }}>
                    Message sent.
                  </h3>
                  <p style={{ fontSize: 14, color: 'var(--text-dim)', lineHeight: 1.65 }}>
                    I'll be in touch within the hour. Looking forward to building with you.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                  {/* Name + Email row */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                    <div>
                      <label style={labelStyle}>Name</label>
                      <input
                        required
                        type="text"
                        placeholder="Finn Alderton"
                        value={form.name}
                        onChange={e => set('name', e.target.value)}
                        style={inputStyle}
                        onFocus={e => { e.target.style.borderColor = 'var(--border-red)'; e.target.style.boxShadow = '0 0 0 3px rgba(196,67,26,0.08)' }}
                        onBlur={e => { e.target.style.borderColor = 'var(--border)'; e.target.style.boxShadow = 'none' }}
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>Email</label>
                      <input
                        required
                        type="email"
                        placeholder="hello@example.com"
                        value={form.email}
                        onChange={e => set('email', e.target.value)}
                        style={inputStyle}
                        onFocus={e => { e.target.style.borderColor = 'var(--border-red)'; e.target.style.boxShadow = '0 0 0 3px rgba(196,67,26,0.08)' }}
                        onBlur={e => { e.target.style.borderColor = 'var(--border)'; e.target.style.boxShadow = 'none' }}
                      />
                    </div>
                  </div>

                  {/* Service */}
                  <div>
                    <label style={labelStyle}>Service</label>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                      {SERVICES.map(s => (
                        <button
                          key={s}
                          type="button"
                          data-hover
                          onClick={() => set('service', form.service === s ? '' : s)}
                          style={{
                            padding: '8px 14px',
                            borderRadius: 4,
                            fontSize: 13,
                            border: form.service === s ? '1px solid var(--red)' : '1px solid var(--border)',
                            background: form.service === s ? 'var(--red-dim)' : 'var(--surface)',
                            color: form.service === s ? 'var(--red)' : 'var(--text-dim)',
                            transition: 'all 0.15s',
                          }}
                        >{s}</button>
                      ))}
                    </div>
                  </div>

                  {/* Budget */}
                  <div>
                    <label style={labelStyle}>Budget</label>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                      {BUDGETS.map(b => (
                        <button
                          key={b}
                          type="button"
                          data-hover
                          onClick={() => set('budget', form.budget === b ? '' : b)}
                          style={{
                            padding: '8px 14px',
                            borderRadius: 4,
                            fontSize: 13,
                            border: form.budget === b ? '1px solid var(--red)' : '1px solid var(--border)',
                            background: form.budget === b ? 'var(--red-dim)' : 'var(--surface)',
                            color: form.budget === b ? 'var(--red)' : 'var(--text-dim)',
                            transition: 'all 0.15s',
                          }}
                        >{b}</button>
                      ))}
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label style={labelStyle}>Tell me about the project</label>
                    <textarea
                      required
                      rows={5}
                      placeholder="I want to build a..."
                      value={form.message}
                      onChange={e => set('message', e.target.value)}
                      style={{ ...inputStyle, resize: 'vertical', minHeight: 120 }}
                      onFocus={e => { e.target.style.borderColor = 'var(--border-red)'; e.target.style.boxShadow = '0 0 0 3px rgba(196,67,26,0.08)' }}
                      onBlur={e => { e.target.style.borderColor = 'var(--border)'; e.target.style.boxShadow = 'none' }}
                    />
                  </div>

                  {status === 'error' && (
                    <p style={{ fontSize: 13, color: '#e06b52' }}>
                      Something went wrong. Email hello@tesselo.dev directly.
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    data-hover
                    style={{
                      padding: '14px 28px',
                      background: status === 'sending' ? 'var(--surface)' : 'var(--red)',
                      color: status === 'sending' ? 'var(--text-dim)' : '#fff',
                      fontFamily: 'var(--sans)',
                      fontSize: 14,
                      fontWeight: 500,
                      borderRadius: 4,
                      transition: 'background 0.2s',
                      border: 'none',
                      alignSelf: 'flex-start',
                    }}
                  >
                    {status === 'sending' ? 'Sending...' : 'Send message →'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        padding: 'clamp(24px, 3vw, 40px) 0',
        borderTop: '1px solid var(--border)',
        textAlign: 'center',
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
