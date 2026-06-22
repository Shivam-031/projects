import type { NavLink } from '../types'

export const navLinks: NavLink[] = [
  { label: 'Events', href: '#events', sectionId: 'events' },
  { label: 'Programs', href: '#about', sectionId: 'about' },
  { label: 'Community', href: '#categories', sectionId: 'categories' },
  { label: 'Ranks', href: '#ranks', sectionId: 'ranks' },
]

// Section ids tracked by the scroll-spy to highlight the active nav link
export const spySectionIds = ['events', 'about', 'categories', 'ranks']
