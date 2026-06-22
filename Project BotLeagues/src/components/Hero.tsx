import ImagePlaceholder from './ImagePlaceholder'

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-[120px] pb-20 overflow-hidden bg-[#050505]">
      <ImagePlaceholder
        label="Hero background"
        className="absolute inset-0 w-full h-full opacity-90 max-[980px]:opacity-70 left-[220px] max-[980px]:left-0 z-0"
      />

      <div
        className="absolute inset-0 z-[1]"
        aria-hidden="true"
        style={{
          background:
            'linear-gradient(90deg, rgba(5,5,5,0.92) 0%, rgba(5,5,5,0.55) 55%, rgba(5,5,5,0.2) 100%), linear-gradient(180deg, rgba(5,5,5,0.3) 0%, rgba(5,5,5,0.0) 30%, rgba(5,5,5,0.7) 85%, rgba(5,5,5,1) 100%)',
        }}
      />

      <div
        className="absolute w-[700px] h-[700px] rounded-full blur-[80px] bg-brand-red/[0.18] -top-[150px] -right-[120px] pointer-events-none z-[1]"
        aria-hidden="true"
      />

      <div className="wrap relative z-[2] grid grid-cols-[1.05fr_0.95fr] max-[980px]:grid-cols-1 gap-10 items-center w-full">
        <div>
          <div className="inline-flex items-center gap-2.5 border border-grey-1/40 bg-[#1a1919]/70 rounded-md px-[18px] py-[9px] text-sm font-semibold tracking-[0.02em] text-brand-red mb-7">
            <span className="w-2 h-2 rounded-full bg-brand-red animate-pulse-dot" />
            LIVE: Episode 14 · Bengaluru Regionals
            <span className="text-grey-1/50">|</span>
            <a href="#events" className="text-white underline decoration-white/30">
              WATCH LIVE
            </a>
          </div>

          <h1 className="font-display font-bold leading-[1.12] tracking-[0.01em] mb-[26px] text-[clamp(38px,5.6vw,72px)]">
            India&apos;s Ultimate <span className="text-brand-red">Robotics</span> Arena
          </h1>

          <p className="text-[clamp(18px,2vw,24px)] font-medium text-grey-1 max-w-[460px] leading-[1.4] mb-[38px]">
            Build<span className="text-brand-red mx-0.5">.</span>Compete
            <span className="text-brand-red mx-0.5">.</span>Rank<span className="text-brand-red mx-0.5">.</span>
            <br />
            The national ecosystem for robotics arena.
          </p>

          <div className="flex gap-[18px] flex-wrap max-[480px]:flex-col max-[480px]:items-stretch">
            <a href="#ecosystem" className="btn btn-fill max-[480px]:text-sm">
              Create Account
            </a>
            <a href="#events" className="btn btn-outline max-[480px]:text-sm">
              Explore Events
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
