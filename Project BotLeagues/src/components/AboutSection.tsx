interface Feature {
  num: string
  title: string
  desc: string
}

const features: Feature[] = [
  {
    num: '1.',
    title: 'Structured Events',
    desc: 'Professionally organized robotics competitions run on a fixed seasonal calendar — so you can plan, prepare, and peak at the right moment.',
  },
  {
    num: '2.',
    title: 'Digital Identity',
    desc: 'Every builder gets a verified profile — your stats, rankings, event history, and achievements in one shareable portfolio.',
  },
  {
    num: '3.',
    title: 'National Ranking',
    desc: 'A transparent, points-based national ranking system that gives every team fair recognition — from first-timers to champions.',
  },
  {
    num: '4.',
    title: 'Career Pathway',
    desc: 'Top-ranked builders get direct connections to sponsors, colleges, and robotics companies actively scouting for talent.',
  },
]

export default function AboutSection() {
  return (
    <section id="about" className="bg-bg-2 py-[90px] pb-[100px]">
      <div className="wrap">
        <div className="grid grid-cols-2 max-[760px]:grid-cols-1 gap-x-20 gap-y-9 items-start">
          <div className="col-span-2 max-[760px]:col-span-1 mb-2">
            <h2 className="section-title">What is BotLeague?</h2>
          </div>

          {features.slice(0, 2).map((feature) => (
            <div key={feature.num} className="flex gap-5 items-start">
              <div className="font-display font-extrabold text-[38px] leading-none text-brand-red/90 min-w-[36px] -mt-1">
                {feature.num}
              </div>
              <div>
                <div className="font-display font-bold text-[17px] text-white mb-2.5 tracking-[0.03em]">
                  {feature.title}
                </div>
                <div className="text-sm text-white/55 leading-[1.7]">{feature.desc}</div>
              </div>
            </div>
          ))}

          <div className="col-span-2 max-[760px]:col-span-1 h-px bg-white/[0.07] my-1" />

          {features.slice(2, 4).map((feature) => (
            <div key={feature.num} className="flex gap-5 items-start">
              <div className="font-display font-extrabold text-[38px] leading-none text-brand-red/90 min-w-[36px] -mt-1">
                {feature.num}
              </div>
              <div>
                <div className="font-display font-bold text-[17px] text-white mb-2.5 tracking-[0.03em]">
                  {feature.title}
                </div>
                <div className="text-sm text-white/55 leading-[1.7]">{feature.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
