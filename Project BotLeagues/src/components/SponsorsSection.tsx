import { sponsors } from '../data/sponsors'
import ImagePlaceholder from './ImagePlaceholder'

export default function SponsorsSection() {
  return (
    <section id="sponsors" className="bg-bg-2 pt-2.5 pb-[70px]">
      <div className="wrap">
        <div className="mb-10">
          <h2 className="font-display font-bold text-white tracking-[0.02em] text-[clamp(22px,3vw,32px)]">
            Sponsors
          </h2>
        </div>

        <div className="grid grid-cols-3 max-[900px]:grid-cols-2 max-[560px]:grid-cols-1 gap-x-6 gap-y-[34px]">
          {sponsors.map((sponsor) => (
            <div key={sponsor.id} className="flex items-center gap-4">
              <ImagePlaceholder
                label={sponsor.name}
                className="shrink-0 w-16 h-16 rounded-full border-[1.5px] border-dashed border-white/[0.28] bg-white/[0.03] text-[9px]"
              />
              <span className="font-display font-bold text-[13px] tracking-[0.03em] uppercase text-white/55 leading-[1.4]">
                {sponsor.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
