import { bracketFinal, bracketRound1, bracketSemis, pastResults, upcomingEvents } from '../data/events'
import BracketCard from './events/BracketCard'
import EventCard from './events/EventCard'
import ResultItem from './events/ResultItem'

export default function EventsSection() {
  return (
    <section
      id="events"
      className="relative bg-bg-1 py-20 pb-[90px] before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-brand-red/40 before:to-transparent"
    >
      <div className="wrap">
        <div className="mb-12">
          <p className="eyebrow">Events</p>
          <h2 className="section-title">Competitions &amp; Events</h2>
        </div>

        <div className="grid grid-cols-3 max-[960px]:grid-cols-2 max-[600px]:grid-cols-1 gap-6">
          {/* COL 1: LIVE NOW */}
          <div>
            <div className="font-bold text-[11px] tracking-[0.18em] uppercase text-white/40 mb-4 pb-2.5 border-b border-white/10">
              Live Now
            </div>
            <div className="inline-flex items-center gap-1.5 bg-brand-red text-white text-[10px] font-bold tracking-[0.12em] uppercase px-2 py-[3px] rounded mb-3.5">
              <span className="w-[5px] h-[5px] rounded-full bg-white animate-pulse-dot" /> Live
            </div>

            <BracketCard
              title="Bengaluru Regionals"
              subtitle="Episode 14 · Quarter-Finals"
              round1={bracketRound1}
              semis={bracketSemis}
              final={bracketFinal}
            />
          </div>

          {/* COL 2: UPCOMING */}
          <div>
            <div className="font-bold text-[11px] tracking-[0.18em] uppercase text-white/40 mb-4 pb-2.5 border-b border-white/10">
              Upcoming
            </div>
            {upcomingEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>

          {/* COL 3: PAST RESULTS */}
          <div>
            <div className="font-bold text-[11px] tracking-[0.18em] uppercase text-white/40 mb-4 pb-2.5 border-b border-white/10">
              Past Results
            </div>
            {pastResults.map((result) => (
              <ResultItem key={result.id} result={result} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
