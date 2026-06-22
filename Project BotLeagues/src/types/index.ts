export interface NavLink {
  label: string
  href: string
  sectionId: string
}

export interface BracketTeam {
  name: string
  winner?: boolean
}

export interface BracketMatch {
  teams: [BracketTeam, BracketTeam]
}

export interface UpcomingEvent {
  id: string
  city: string
  discipline: string
  tag: 'Upcoming' | 'Open'
  date: string
  daysLeft: string
  teams: string
}

export interface PastResult {
  id: string
  eventName: string
  winner: string
  opponent: string
  discipline: string
}

export interface CategoryCard {
  id: string
  badgeColor: 'gold' | 'blue' | 'green' | 'red'
  title: string
  ageRange: string
  description: string
  icon: 'mini-makers' | 'junior-innovators' | 'young-engineers' | 'robo-minds'
}

export interface DisciplineCard {
  id: string
  name: string
  description: string
  placeholder?: boolean
}

export interface AdvantageItem {
  id: string
  iconColor: 'taurus' | 'scale' | 'career' | 'energy'
  title: string
  description: string
}

export interface SponsorItem {
  id: string
  name: string
}

export type EcosystemRole = 'Become In Judge' | 'Volunteer' | 'Community Member'

export interface SignupFormData {
  name: string
  location: string
  email: string
}
