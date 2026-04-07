import { useEffect, useRef, useState } from 'react'

export default function Cursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const [active, setActive] = useState(false)
  const pos = useRef({ x: -100, y: -100 })
  const ring = useRef({ x: -100, y: -100 })
  const raf = useRef(null)

  useEffect(() => {
    // Hide on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return

    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`
      }
    }

    const lerp = (a, b, t) => a + (b - a) * t

    const tick = () => {
      ring.current.x = lerp(ring.current.x, pos.current.x, 0.12)
      ring.current.y = lerp(ring.current.y, pos.current.y, 0.12)
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.current.x}px, ${ring.current.y}px) translate(-50%, -50%)`
      }
      raf.current = requestAnimationFrame(tick)
    }

    const onDown = () => setActive(true)
    const onUp = () => setActive(false)

    const onEnterHover = () => {
      if (ringRef.current) ringRef.current.classList.add('expanded')
    }
    const onLeaveHover = () => {
      if (ringRef.current) ringRef.current.classList.remove('expanded')
    }

    const bindHover = () => {
      document.querySelectorAll('a, button, [data-hover]').forEach(el => {
        el.addEventListener('mouseenter', onEnterHover)
        el.addEventListener('mouseleave', onLeaveHover)
      })
    }

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mousedown', onDown)
    document.addEventListener('mouseup', onUp)
    raf.current = requestAnimationFrame(tick)
    bindHover()

    // Re-bind on DOM changes
    const observer = new MutationObserver(bindHover)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('mouseup', onUp)
      cancelAnimationFrame(raf.current)
      observer.disconnect()
    }
  }, [])

  return (
    <>
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: active ? 6 : 8,
          height: active ? 6 : 8,
          borderRadius: '50%',
          background: '#c4431a',
          pointerEvents: 'none',
          zIndex: 9999,
          transition: 'width 0.15s, height 0.15s',
          willChange: 'transform',
        }}
      />
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 34,
          height: 34,
          borderRadius: '50%',
          border: '1.5px solid rgba(196, 67, 26, 0.55)',
          pointerEvents: 'none',
          zIndex: 9998,
          willChange: 'transform',
          transition: 'width 0.2s, height 0.2s, border-color 0.2s',
        }}
        className="cursor-ring"
      />
    </>
  )
}
