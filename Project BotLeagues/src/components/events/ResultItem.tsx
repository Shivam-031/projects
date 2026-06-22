import type { PastResult } from '../../types'

export default function ResultItem({ result }: { result: PastResult }) {
  return (
    <div className="py-3 border-b border-white/[0.07] last:border-b-0">
      <div className="font-display font-semibold text-xs text-white mb-[5px]">{result.eventName}</div>
      <div className="flex items-center gap-2 text-[11px]">
        <span className="text-brand-yellow text-[13px]">🏆</span>
        <span className="font-bold text-grey-1">{result.winner}</span>
        <span className="ml-auto text-[11px] font-bold text-brand-red font-display">WIN</span>
      </div>
      <div className="text-[10px] text-white/40 mt-1">
        vs. {result.opponent} · {result.discipline}
      </div>
    </div>
  )
}
