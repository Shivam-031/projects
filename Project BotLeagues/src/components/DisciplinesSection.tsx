import { disciplines } from '../data/disciplines'
import ImagePlaceholder from './ImagePlaceholder'

export default function DisciplinesSection() {
  return (
    <section
      id="disciplines"
      className="relative bg-bg-0 py-[88px] pb-[100px] before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-brand-red/30 before:to-transparent"
    >
      <div className="wrap">
        <div className="mb-3">
          <p className="font-body font-bold text-[13px] tracking-[0.2em] uppercase text-brand-red mb-2">Sports</p>
          <h2 className="section-title mb-0">Competition Disciplines</h2>
        </div>
        <p className="text-sm text-white/55 max-w-[500px] mb-12 leading-[1.6]">
          Five arenas. One league. Pick your discipline and dominate the national circuit.
        </p>

        <div className="grid grid-cols-3 max-[900px]:grid-cols-2 max-[520px]:grid-cols-1 gap-5">
          {disciplines.map((discipline) => (
            <div key={discipline.id} className="group relative rounded-xl overflow-hidden cursor-pointer" style={{ aspectRatio: '4/3' }}>
              <ImagePlaceholder
                label={discipline.name}
                className="w-full h-full transition-transform duration-[400ms] group-hover:scale-105 "
              />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: discipline.placeholder
                    ? 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,.85) 100%)'
                    : 'linear-gradient(180deg, rgba(0,0,0,0) 30%, rgba(0,0,0,.75) 75%, rgba(0,0,0,.92) 100%)',
                }}
              />
              <div className="absolute bottom-0 left-0 right-0 px-[18px] pb-[18px] pt-5 z-[2]">
                <div className="font-display font-bold text-[15px] text-white tracking-[0.03em] mb-1">
                  {discipline.name}
                </div>
                <div className="text-[11px] text-white/65 leading-[1.5]">{discipline.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
