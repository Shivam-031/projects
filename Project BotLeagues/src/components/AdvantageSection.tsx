import { advantages } from '../data/advantages'
import {
  CareerOpsIcon,
  FairJudgingIcon,
  HighEnergyIcon,
  NationalRecognitionIcon,
} from './icons/AdvantageIcons'

import type { AdvantageItem } from '../types'

const icons: Record<AdvantageItem['iconColor'], (props: { className?: string }) => JSX.Element> = {
  taurus: NationalRecognitionIcon,
  scale: FairJudgingIcon,
  career: CareerOpsIcon,
  energy: HighEnergyIcon,
}

const iconWrapClasses: Record<AdvantageItem['iconColor'], string> = {
  taurus: 'bg-brand-red/[0.12] border border-brand-red/30',
  scale: 'bg-brand-yellow/10 border border-brand-yellow/30',
  career: 'bg-brand-blue/[0.18] border border-brand-blue/40',
  energy: 'bg-brand-red/[0.12] border border-brand-red/30',
}

export default function AdvantageSection() {
  return (
    <section
      id="ranks"
      className="relative bg-bg-1 py-[90px] pb-[100px] overflow-hidden before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-brand-red/35 before:to-transparent"
    >
      <div
        className="absolute -left-[200px] top-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-brand-red/[0.07] blur-[80px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="wrap relative z-[1]">
        <div className="grid grid-cols-[1fr_420px] max-[960px]:grid-cols-1 gap-16 max-[960px]:gap-12 items-center">
          <div>
            <div className="mb-11">
              <p className="eyebrow">Why Register?</p>
              <h2 className="section-title">The League Advantage</h2>
            </div>

            <div className="flex flex-col gap-7">
              {advantages.map((item) => {
                const Icon = icons[item.iconColor]
                return (
                  <div key={item.id} className="flex gap-[18px] items-start">
                    <div className={`w-[46px] h-[46px] shrink-0 rounded-[10px] flex items-center justify-center ${iconWrapClasses[item.iconColor]}`}>
                      <Icon />
                    </div>
                    <div>
                      <div className="font-display font-bold text-[15px] text-white tracking-[0.03em] mb-[5px]">
                        {item.title}
                      </div>
                      <div className="text-[13px] text-white/55 leading-[1.7] max-w-[440px]">{item.description}</div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="relative max-[960px]:max-w-[380px] max-[960px]:mx-auto">
            <div
              className="absolute -inset-5 rounded-full pointer-events-none -z-10"
              style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(42,31,217,.25), transparent 70%)' }}
            />
            <img src="/images/leadership board.png" alt="Your path league" className="w-full h-full object-cover rounded-xl "></img>
          </div>
        </div>
      </div>
    </section>
  )
}
