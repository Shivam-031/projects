import { ecosystemRoles } from '../data/sponsors'
import SignupForm from './ecosystem/SignupForm'

export default function EcosystemSection() {
  return (
    <section id="ecosystem" className="bg-bg-2 py-[90px] pb-24">
      <div className="wrap">
        <div className="mb-10">
          <h2 className="font-display font-bold text-white tracking-[0.02em] text-[clamp(26px,3.6vw,40px)]">
            Join the Ecosystem
          </h2>
        </div>

        <div className="grid grid-cols-3 max-[900px]:grid-cols-1 gap-6">
          {ecosystemRoles.map((role) => (
            <div key={role} className="bg-card border border-white/[0.08] rounded-xl px-6 pt-[26px] pb-7">
              <h3 className="font-display font-bold text-[15px] tracking-[0.04em] uppercase text-white mb-[18px]">
                {role}
              </h3>
              <SignupForm role={role} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
