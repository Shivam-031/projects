import { useEffect, useState } from 'react'

/**
 * Mirrors the original vanilla-JS scroll-spy: highlights whichever tracked
 * section id is currently scrolled past (with a 140px offset so the header
 * doesn't obscure the heading).
 */
export function useScrollSpy(sectionIds: string[], offset = 140): string {
  const [activeId, setActiveId] = useState('')

  useEffect(() => {
    const spy = () => {
      let current = ''
      for (const id of sectionIds) {
        const el = document.getElementById(id)
        if (el && window.scrollY >= el.offsetTop - offset) {
          current = id
        }
      }
      setActiveId(current)
    }

    spy()
    window.addEventListener('scroll', spy, { passive: true })
    return () => window.removeEventListener('scroll', spy)
  }, [sectionIds, offset])

  return activeId
}
