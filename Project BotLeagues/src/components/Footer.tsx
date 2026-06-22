import { footerLinks } from '../data/footerLinks'
import { FacebookIcon, InstagramIcon, TwitterIcon, YoutubeIcon } from './icons/SocialIcons'

export default function Footer() {
  return (
    <footer id="footer" className="bg-bg-2 border-t border-white/10 py-12 pb-7">
      <div className="wrap">
        <div className="flex justify-between gap-10 flex-wrap mb-9">
          <div>
            <h3 className="font-display font-bold text-sm tracking-[0.04em] uppercase text-white mb-[18px]">
              Quick Links
            </h3>
            <ul className="grid grid-cols-2 gap-x-8 gap-y-2.5 w-[260px]">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-[13px] text-white/55 transition-colors hover:text-brand-red">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="text-right max-[640px]:text-left">
            <h3 className="font-display font-bold text-sm tracking-[0.04em] uppercase text-white mb-[18px]">
              Social Media
            </h3>
            <div className="flex gap-3.5 justify-end max-[640px]:justify-start">
              <a href="#" aria-label="YouTube" className="opacity-90 hover:opacity-100 transition-opacity">
                <YoutubeIcon />
              </a>
              <a href="#" aria-label="Instagram" className="opacity-90 hover:opacity-100 transition-opacity">
                <InstagramIcon />
              </a>
              <a href="#" aria-label="Facebook" className="opacity-90 hover:opacity-100 transition-opacity">
                <FacebookIcon />
              </a>
              <a href="#" aria-label="Twitter" className="opacity-90 hover:opacity-100 transition-opacity">
                <TwitterIcon />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/[0.08] pt-[22px] text-center">
          <p className="text-xs text-white/40 tracking-[0.02em]">© 2026 BotLeague. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
