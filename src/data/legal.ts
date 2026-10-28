export const legalApps = [
  { slug: 'lotomatic', name: 'Lotomatic', image: '/assets/img/lotomatic.svg' },
  { slug: 'champi-farm', name: 'Champi Farm', image: '/assets/img/champi-farm.png' },
  { slug: 'geo-running', name: 'Geo Running', image: '/assets/img/geo-running.svg' },
] as const

export type LegalApp = (typeof legalApps)[number]
