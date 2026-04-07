import { useEffect, useRef } from 'react'

export function useReveal(options = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: options.threshold ?? 0.15, rootMargin: options.rootMargin ?? '0px' }
    )

    const targets = el.querySelectorAll('.reveal')
    if (el.classList.contains('reveal')) observer.observe(el)
    targets.forEach(t => observer.observe(t))

    return () => observer.disconnect()
  }, [options.threshold, options.rootMargin])

  return ref
}
