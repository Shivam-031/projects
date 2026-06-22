import type { BracketMatch } from '../../types'

function BracketTeamBox({ name, winner }: { name: string; winner?: boolean }) {
  return (
    <div
      className={`rounded px-2 py-1 text-[10px] font-semibold min-w-[70px] flex items-center justify-between gap-1 ${
        winner
          ? 'bg-brand-red/[0.18] border border-brand-red/50 text-white'
          : 'bg-white/[0.07] border border-white/[0.12] text-grey-1'
      }`}
    >
      {name}
      {winner && <span className="text-[8px] font-bold text-brand-red">W</span>}
    </div>
  )
}

function BracketConnector({ height }: { height: number }) {
  return (
    <div className="relative flex flex-col justify-center items-center px-1" style={{ height }}>
      <div className="absolute left-1/2 top-1/4 bottom-1/4 w-px bg-white/20" />
    </div>
  )
}

interface BracketCardProps {
  title: string
  subtitle: string
  round1: BracketMatch[]
  semis: BracketMatch[]
  final: [string, string]
}

export default function BracketCard({ title, subtitle, round1, semis, final }: BracketCardProps) {
  return (
    <div className="bg-card border border-white/10 rounded-[10px] p-4 mb-4">
      <div className="font-display font-semibold text-[13px] text-white mb-1">{title}</div>
      <div className="text-[11px] text-white/55 mb-3.5">{subtitle}</div>

      <div className="flex gap-2 items-center">
        <div className="flex flex-col gap-1.5">
          {round1.map((match, i) => (
            <div key={i} className="flex flex-col gap-[3px]">
              <BracketTeamBox name={match.teams[0].name} winner={match.teams[0].winner} />
              <BracketTeamBox name={match.teams[1].name} winner={match.teams[1].winner} />
            </div>
          ))}
        </div>

        <BracketConnector height={130} />

        <div className="flex flex-col gap-1.5">
          {semis.map((match, i) => (
            <div key={i} className="flex flex-col gap-[3px]" style={{ marginTop: i === 0 ? 10 : 28 }}>
              <BracketTeamBox name={match.teams[0].name} winner={match.teams[0].winner} />
              <BracketTeamBox name={match.teams[1].name} winner={match.teams[1].winner} />
            </div>
          ))}
        </div>

        <BracketConnector height={100} />

        <div className="flex flex-col gap-[3px] justify-center">
          <div className="rounded px-2 py-1 text-[9px] font-semibold bg-brand-yellow/10 border border-brand-yellow/30 text-brand-yellow">
            FINAL
          </div>
          <div className="rounded px-2 py-1 text-[10px] font-semibold bg-white/[0.07] border border-white/[0.12] text-grey-1 min-w-[70px] mt-1">
            {final[0]}
          </div>
          <div className="rounded px-2 py-1 text-[10px] font-semibold bg-white/[0.07] border border-white/[0.12] text-grey-1 min-w-[70px]">
            {final[1]}
          </div>
        </div>
      </div>
    </div>
  )
}
