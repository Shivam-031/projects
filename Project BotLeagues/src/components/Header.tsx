import { useEffect, useState } from 'react'
import { navLinks, spySectionIds } from '../data/navLinks'
import { useHeaderScrolled } from '../hooks/useHeaderScrolled'
import { useScrollSpy } from '../hooks/useScrollSpy'
// import ImagePlaceholder from './ImagePlaceholder'

export default function Header() {
  const scrolled = useHeaderScrolled()
  const activeSection = useScrollSpy(spySectionIds)
  const [menuOpen, setMenuOpen] = useState(false)

  // Lock body scroll while the mobile nav drawer is open, matching the
  // original vanilla-JS behaviour.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[1000] transition-[background,padding] duration-300 ${
        scrolled
          ? 'bg-black/85 backdrop-blur-md py-3 border-b border-white/[0.08]'
          : 'bg-transparent py-[18px]'
      }`}
    >
      <div className="wrap flex items-center justify-between">
        <a href="#hero" className="flex items-center gap-2.5">
          <img src='/images/logo.png' alt='site logo' className="h-[38px] w-[140px] rounded" />
        </a>

        <nav
          id="nav-links"
          className={`flex items-center gap-[42px] max-[880px]:fixed max-[880px]:top-0 max-[880px]:right-0 max-[880px]:h-screen max-[880px]:w-[min(78vw,320px)] max-[880px]:bg-[#0c0c0c] max-[880px]:flex-col max-[880px]:justify-center max-[880px]:gap-[34px] max-[880px]:shadow-[-10px_0_30px_rgba(0,0,0,.5)] max-[880px]:transition-transform max-[880px]:duration-[350ms] max-[880px]:z-[1050] ${
            menuOpen ? 'max-[880px]:translate-x-0' : 'max-[880px]:translate-x-full'
          }`}
        >
          {navLinks.map((link) => (
            <a
              key={link.sectionId}
              href={link.href}
              onClick={closeMenu}
              className={`relative font-display text-base py-1.5 transition-colors duration-200 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:bg-brand-red after:transition-[width] after:duration-200 hover:text-brand-red hover:after:w-full ${
                activeSection === link.sectionId ? 'text-brand-red after:w-full' : 'text-white after:w-0'
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3.5">
          <a href="#" className="btn btn-outline btn-sm max-[880px]:hidden">
            Login
          </a>
          <a href="#ecosystem" className="btn btn-fill btn-sm">
            Register Now
          </a>
        </div>

        <button
          className="hidden max-[880px]:flex flex-col gap-[5px] w-7 z-[1100]"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span
            className={`h-0.5 w-full bg-white transition-transform duration-300 ${
              menuOpen ? 'translate-y-[7px] rotate-45' : ''
            }`}
          />
          <span className={`h-0.5 w-full bg-white transition-opacity duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span
            className={`h-0.5 w-full bg-white transition-transform duration-300 ${
              menuOpen ? '-translate-y-[7px] -rotate-45' : ''
            }`}
          />
        </button>
      </div>
    </header>
  )
}
