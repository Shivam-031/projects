interface IconProps {
  className?: string
}

export function NationalRecognitionIcon({ className }: IconProps) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M4 6C4 6 6 4 8 5C9 5.5 10 7 10 7H14C14 7 15 5.5 16 5C18 4 20 6 20 6"
        stroke="#FF4C4C"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M10 7C10 7 9 9 9 11C9 14 10.5 16 12 16C13.5 16 15 14 15 11C15 9 14 7 14 7"
        stroke="#FF4C4C"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M7 19h10" stroke="#FF4C4C" strokeWidth="1.8" strokeLinecap="round" opacity=".5" />
      <circle cx="12" cy="11" r="1.5" fill="#FF4C4C" />
    </svg>
  )
}

export function FairJudgingIcon({ className }: IconProps) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M12 4v16M12 4L7 8M12 4L17 8"
        stroke="#FFC702"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5 8L3 13h4L5 8zM19 8L17 13h4L19 8z"
        stroke="#FFC702"
        strokeWidth="1.5"
        strokeLinejoin="round"
        fill="none"
      />
      <path d="M8 20h8" stroke="#FFC702" strokeWidth="1.8" strokeLinecap="round" opacity=".5" />
    </svg>
  )
}

export function CareerOpsIcon({ className }: IconProps) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="3" y="8" width="18" height="13" rx="2" stroke="#8b82ff" strokeWidth="1.8" />
      <path d="M8 8V6a2 2 0 012-2h4a2 2 0 012 2v2" stroke="#8b82ff" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M3 13h18" stroke="#8b82ff" strokeWidth="1.5" strokeLinecap="round" opacity=".5" />
      <path d="M10 13v2M14 13v2" stroke="#8b82ff" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

export function HighEnergyIcon({ className }: IconProps) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M13 3L5 14h7l-1 7 8-11h-7l1-7z"
        stroke="#FF4C4C"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="rgba(255,76,76,.15)"
      />
    </svg>
  )
}
