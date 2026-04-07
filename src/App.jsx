import { useState, useRef, useEffect } from 'react'
import './index.css'
import Nav from './components/Nav'
import Cursor from './components/Cursor'
import Home from './sections/Home'
import Work from './sections/Work'
import About from './sections/About'
import Contact from './sections/Contact'

const TABS = ['Home', 'Work', 'About', 'Contact']

function ScrollProgress({ panelRef }) {
  const barRef = useRef(null)

  useEffect(() => {
    const panel = panelRef.current
    if (!panel) return

    const onScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = panel
      const pct = scrollHeight <= clientHeight ? 0 : (scrollTop / (scrollHeight - clientHeight)) * 100
      if (barRef.current) barRef.current.style.transform = `scaleX(${pct / 100})`
    }

    panel.addEventListener('scroll', onScroll, { passive: true })
    return () => panel.removeEventListener('scroll', onScroll)
  }, [panelRef])

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      height: 2,
      zIndex: 200,
      background: 'transparent',
    }}>
      <div
        ref={barRef}
        style={{
          height: '100%',
          background: 'linear-gradient(90deg, #c4431a, #e8763d)',
          transformOrigin: 'left',
          transform: 'scaleX(0)',
          transition: 'transform 0.08s linear',
          willChange: 'transform',
        }}
      />
    </div>
  )
}

function App() {
  const [activeTab, setActiveTab] = useState('Home')
  const [exiting, setExiting] = useState(null)
  const [scrolled, setScrolled] = useState(false)
  const prevTab = useRef('Home')
  const activePanelRef = useRef(null)

  const switchTab = (tab) => {
    if (tab === activeTab) return
    setExiting(activeTab)
    prevTab.current = activeTab
    setScrolled(false)
    setTimeout(() => {
      setActiveTab(tab)
      setExiting(null)
    }, 250)
  }

  // Track scroll for nav elevation
  useEffect(() => {
    const panel = activePanelRef.current
    if (!panel) return
    const onScroll = () => setScrolled(panel.scrollTop > 20)
    panel.addEventListener('scroll', onScroll, { passive: true })
    return () => panel.removeEventListener('scroll', onScroll)
  }, [activeTab])

  const panelProps = (tab) => ({
    className: `section-panel ${activeTab === tab ? 'active' : ''} ${exiting === tab ? 'exiting' : ''}`,
    ref: activeTab === tab ? activePanelRef : null,
  })

  return (
    <>
      <Cursor />
      <ScrollProgress panelRef={activePanelRef} />
      <Nav activeTab={activeTab} setActiveTab={switchTab} scrolled={scrolled} />

      {TABS.map(tab => (
        <button key={tab} data-tab={tab} onClick={() => switchTab(tab)} style={{ display: 'none' }} />
      ))}

      <main style={{ position: 'fixed', inset: 0, top: 'var(--nav-h)', overflow: 'hidden' }}>
        <div {...panelProps('Home')}><Home /></div>
        <div {...panelProps('Work')}><Work setActiveTab={switchTab} /></div>
        <div {...panelProps('About')}><About active={activeTab === 'About'} /></div>
        <div {...panelProps('Contact')}><Contact /></div>
      </main>
    </>
  )
}

export default App
