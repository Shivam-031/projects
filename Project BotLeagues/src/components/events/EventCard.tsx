import type { UpcomingEvent } from '../../types'
import { CalendarIcon, ClockIcon, TeamsIcon } from '../icons/EventIcons'

export default function EventCard({ event }: { event: UpcomingEvent }) {
  const isOpen = event.tag === 'Open'

  return (
    <div className="bg-card border border-white/[0.09] rounded-[10px] p-4 mb-3 transition-colors hover:border-brand-red/35 hover:bg-brand-red/5">
      <div className="flex justify-between items-start mb-2.5 gap-2">
        <div className="font-display font-semibold text-[13px] text-white leading-[1.3]">
          {event.city}
          <br />
          <span className="text-[11px] font-normal text-white/55">{event.discipline}</span>
        </div>
        <div
          className={`text-[9px] font-bold tracking-[0.1em] uppercase px-2 py-[3px] rounded shrink-0 ${
            isOpen
              ? 'bg-[#4dff8a]/10 text-[#4dff8a] border border-[#4dff8a]/30'
              : 'bg-brand-yellow/[0.15] text-brand-yellow border border-brand-yellow/30'
          }`}
        >
          {event.tag}
        </div>
      </div>

      <div className="flex gap-4 text-[11px] text-white/55">
        <span className="flex items-center gap-1">
          <CalendarIcon className="opacity-60" />
          {event.date}
        </span>
        <span className="flex items-center gap-1">
          <ClockIcon className="opacity-60" />
          {event.daysLeft}
        </span>
        <span className="flex items-center gap-1">
          <TeamsIcon className="opacity-60" />
          {event.teams}
        </span>
      </div>

      <a
        href="#"
        className="flex items-center justify-center w-full mt-3.5 py-[9px] rounded-md text-white font-bold text-xs tracking-[0.06em] uppercase transition-opacity hover:opacity-85"
        style={{ background: 'linear-gradient(90deg, #FF4C4C, #992E2E)' }}
      >
        Register Now
      </a>
    </div>
  )
}
