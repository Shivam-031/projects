import type { BracketMatch, UpcomingEvent, PastResult } from '../types'

export const bracketRound1: BracketMatch[] = [
  { teams: [{ name: 'ARES-7', winner: true }, { name: 'TurboClaw' }] },
  { teams: [{ name: 'IronStrike', winner: true }, { name: 'Volt-X' }] },
  { teams: [{ name: 'CyberRam', winner: true }, { name: 'Spectre' }] },
  { teams: [{ name: 'ThunderBot' }, { name: 'BlazeUnit', winner: true }] },
]

export const bracketSemis: BracketMatch[] = [
  { teams: [{ name: 'ARES-7', winner: true }, { name: 'IronStrike' }] },
  { teams: [{ name: 'CyberRam' }, { name: 'BlazeUnit', winner: true }] },
]

export const bracketFinal: [string, string] = ['ARES-7', 'BlazeUnit']

export const upcomingEvents: UpcomingEvent[] = [
  {
    id: 'mumbai',
    city: 'Event in Mumbai',
    discipline: 'Robo War · Line Follower',
    tag: 'Upcoming',
    date: 'Jun 22, 2026',
    daysLeft: '2 Days Left',
    teams: '48 Teams',
  },
  {
    id: 'delhi',
    city: 'Event in Delhi',
    discipline: 'RC Racing · FPV Drone',
    tag: 'Open',
    date: 'Jul 5, 2026',
    daysLeft: '15 Days Left',
    teams: '32 Teams',
  },
]

export const pastResults: PastResult[] = [
  {
    id: 'bengaluru-13',
    eventName: 'Bengaluru Regionals — Ep. 13',
    winner: 'Team Nexus',
    opponent: 'IronStrike',
    discipline: 'Robo War',
  },
  {
    id: 'bengaluru-12',
    eventName: 'Bengaluru Regionals — Ep. 12',
    winner: 'ARES-7 Squad',
    opponent: 'TurboClaw',
    discipline: 'Line Follower',
  },
  {
    id: 'delhi-finals',
    eventName: 'Delhi Invitational — Finals',
    winner: 'CyberRam',
    opponent: 'BlazeUnit',
    discipline: 'RC Racing',
  },
  {
    id: 'mumbai-r2',
    eventName: 'Mumbai Open — Round 2',
    winner: 'Volt-X',
    opponent: 'Spectre',
    discipline: 'Robo Race',
  },
]
