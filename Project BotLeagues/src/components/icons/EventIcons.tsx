interface IconProps {
  className?: string
}

export function CalendarIcon({ className }: IconProps) {
  return (
    <svg width="11" height="11" fill="none" viewBox="0 0 12 12" className={className}>
      <rect x="1" y="2" width="10" height="9" rx="2" stroke="currentColor" strokeWidth="1.2" />
      <path d="M1 5h10" stroke="currentColor" strokeWidth="1.2" />
      <path d="M4 1v2M8 1v2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  )
}

export function ClockIcon({ className }: IconProps) {
  return (
    <svg width="11" height="11" fill="none" viewBox="0 0 12 12" className={className}>
      <path d="M6 1a4 4 0 100 8A4 4 0 006 1z" stroke="currentColor" strokeWidth="1.2" />
      <path d="M6 3v3l2 1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  )
}

export function TeamsIcon({ className }: IconProps) {
  return (
    <svg width="11" height="11" fill="none" viewBox="0 0 12 12" className={className}>
      <circle cx="6" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.2" />
      <path
        d="M2 10.5c0-2.2 1.8-4 4-4s4 1.8 4 4"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function ChevronRightIcon({ className }: IconProps) {
  return (
    <svg width="12" height="12" fill="none" viewBox="0 0 12 12" className={className}>
      <path
        d="M2 6h8M6 2l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
