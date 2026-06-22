import type { CategoryCard } from '../types'

export const categories: CategoryCard[] = [
  {
    id: 'mini-makers',
    badgeColor: 'gold',
    title: 'Mini Makers',
    ageRange: 'Age 6 – 10',
    description:
      'Build your first bot and take your first steps into the world of robotics — no experience required.',
    icon: 'mini-makers',
  },
  {
    id: 'junior-innovators',
    badgeColor: 'blue',
    title: 'Junior Innovators',
    ageRange: 'Age 11 – 14',
    description:
      'Level up your design and strategy skills. Compete in structured events with real elimination brackets.',
    icon: 'junior-innovators',
  },
  {
    id: 'young-engineers',
    badgeColor: 'green',
    title: 'Young Engineers',
    ageRange: 'Age 15 – 18',
    description:
      'Advanced competition with full engineering challenges, sensors, autonomy, and national ranking points.',
    icon: 'young-engineers',
  },
  {
    id: 'robo-minds',
    badgeColor: 'red',
    title: 'Robo Minds',
    ageRange: 'Elite Pro & College',
    description:
      'Championship-level league for top builders. Prize pools, sponsor spotlights, and national recognition.',
    icon: 'robo-minds',
  },
]
