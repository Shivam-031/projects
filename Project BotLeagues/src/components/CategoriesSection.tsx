import { categories } from '../data/categories'
import { ChevronRightIcon } from './icons/EventIcons'
import {
  JuniorInnovatorsIcon,
  MiniMakersIcon,
  RoboMindsIcon,
  YoungEngineersIcon,
} from './icons/CategoryIcons'
import type { CategoryCard } from '../types'

const icons: Record<CategoryCard['icon'], (props: { className?: string }) => JSX.Element> = {
  'mini-makers': MiniMakersIcon,
  'junior-innovators': JuniorInnovatorsIcon,
  'young-engineers': YoungEngineersIcon,
  'robo-minds': RoboMindsIcon,
}

const badgeClasses: Record<CategoryCard['badgeColor'], string> = {
  gold: 'bg-brand-yellow/[0.15] text-brand-yellow border border-brand-yellow/30',
  blue: 'bg-brand-blue/20 text-[#8b82ff] border border-[#8b82ff]/35',
  green: 'bg-[#4dff8a]/10 text-[#4dff8a] border border-[#4dff8a]/30',
  red: 'bg-brand-red/[0.15] text-brand-red border border-brand-red/35',
}

export default function CategoriesSection() {
  return (
    <section
      id="categories"
      className="relative bg-bg-1 py-[88px] pb-24 before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent"
    >
      <div className="wrap">
        <div className="mb-12">
          <p className="eyebrow">Categories</p>
          <h2 className="section-title">Categories</h2>
        </div>

        <div className="grid grid-cols-4 max-[900px]:grid-cols-2 max-[480px]:grid-cols-1 gap-5">
          {categories.map((category) => {
            const Icon = icons[category.icon]
            return (
              <div
                key={category.id}
                className="group relative bg-card border border-white/[0.08] rounded-xl px-[22px] pt-7 pb-[26px] overflow-hidden transition-all duration-200 hover:border-brand-red/50 hover:-translate-y-[3px] hover:shadow-[0_12px_32px_rgba(0,0,0,.35)] cursor-pointer"
              >
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: 'linear-gradient(135deg, rgba(255,76,76,.06) 0%, transparent 60%)' }}
                />
                <div className="mb-[18px]">
                  <Icon className="h-[60px] w-auto" />
                </div>
                <div className={`inline-block text-[9px] font-bold tracking-[0.14em] uppercase rounded px-2 py-[3px] mb-3.5 ${badgeClasses[category.badgeColor]}`}>
                  {category.title}
                </div>
                <div className="font-display font-bold text-[15px] text-white mb-1.5 tracking-[0.03em]">
                  {category.title}
                </div>
                <div className="text-[11px] text-white/40 font-semibold mb-3 tracking-[0.04em]">
                  {category.ageRange}
                </div>
                <div className="text-xs text-white/55 leading-[1.65] mb-[18px]">{category.description}</div>
                <a
                  href="#"
                  className="text-[11px] font-bold tracking-[0.08em] text-brand-red uppercase inline-flex items-center gap-[5px] transition-[gap] duration-200 group-hover:gap-2"
                >
                  Learn more <ChevronRightIcon />
                </a>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
