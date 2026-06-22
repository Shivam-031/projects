import { useEffect, useState } from 'react'

/**
 * Mirrors the original vanilla-JS behaviour:
 *   header.classList.add('scrolled') once window.scrollY > 20
 */
export function useHeaderScrolled(threshold = 20): boolean {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [threshold])

  return scrolled
}
