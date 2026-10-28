import type { Lang } from '../i18n'

export type Profile = {
  name: string
  title: string
  hook: string
  availability: string
  searching: string
  email: string
  links: { label: string; href: string }[]
  timeline: { period: string; role: string; place: string; summary: string }[]
  skills: { theme: string; items: string }[]
  projects: { name: string; icon: string; shots: { src: string; alt: string }[]; summary: string; stack: string[]; links: { label: string; href: string }[] }[]
}

const shared = {
  name: 'Florian Saleur',
  email: 'dev.daedalus@gmail.com',
  links: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/florian-saleur-355892123/' },
    { label: 'GitLab', href: 'https://gitlab.com/DaedalusDev' },
    { label: 'GitHub', href: 'https://github.com/DaedalusDev' },
  ],
}

export const profile: Record<Lang, Profile> = {
  fr: {
    ...shared,
    title: "Tech Lead / DevOps · Vue.js · Symfony · Kubernetes · 10 ans d'expérience",
    hook: "Tech Lead full-stack et DevOps : j'ai piloté la plateforme technique d'une société dont l'activité a été multipliée par ~15 en 6 ans.",
    availability: 'Disponible immédiatement',
    searching: "CDI en priorité, ouvert à une mission CDD / intérim. Nîmes et alentours, télétravail possible.",
    timeline: [
      { period: 'Janv. 2020 – juil. 2026', role: 'Tech Lead / DevOps', place: 'Le Web Français', summary: "Architecture, qualité et exploitation d'une plateforme applicative multi-produits (SEKUR, Propret). Plateau technique de 2 à 5 personnes." },
      { period: '2015 – 2018', role: 'Développeur DevOps', place: 'Gendarmerie nationale', summary: "Applications web (Zend, jQuery, MaterializeCss) et traitement de données (Hadoop)." },
    ],
    skills: [
      { theme: 'Back-end', items: 'PHP 8, Symfony 6, API Platform, PostgreSQL' },
      { theme: 'Front-end', items: 'Vue 3, Quasar, Pinia, TypeScript, Capacitor / Cordova' },
      { theme: 'DevOps', items: 'Kubernetes, Helm, Docker, infrastructure as code, GitLab CI/CD, SonarQube' },
      { theme: 'Observabilité', items: 'Prometheus, Alertmanager, Grafana, Loki' },
      { theme: 'IA dans le développement', items: 'Claude et Codex intégrés aux processus de l’équipe' },
    ],
    projects: [
      {
        name: 'Champi Farm',
        icon: '/assets/img/champi-farm-icon.webp',
        shots: [
          { src: '/assets/img/champi-farm-carte.webp', alt: 'Champi Farm : la carte avec le joueur, la barre de niveau et des champignons à collecter autour de lui.' },
          { src: '/assets/img/champi-farm-collecte.webp', alt: "Champi Farm : fenêtre « Vous avez trouvé un champignon commun ! » indiquant les points d'expérience gagnés." },
        ],
        summary: "Application Android de chasse aux champignons, en famille ou entre amis, dans l'esprit de « Pokémon Go ».",
        stack: ['Vue.js', 'Quasar', 'Cordova', 'Firebase'],
        links: [
          { label: 'Play Store', href: 'https://play.google.com/store/apps/details?id=app.web.georunning' },
          { label: 'Code (GitLab)', href: 'https://gitlab.com/DaedalusDev/champi-farm' },
          { label: "Conditions d'utilisation", href: '/champi-farm/' },
        ],
      },
      {
        name: 'Lotomatik',
        icon: '/assets/img/lotomatic.svg',
        shots: [
          { src: '/assets/img/lotomatik-cartons.webp', alt: 'Lotomatik : liste de cartons de loto colorés avec leurs numéros.' },
          { src: '/assets/img/lotomatik-tirage.webp', alt: 'Lotomatik : grille des numéros de 1 à 90 pour saisir les tirages, avec les numéros sortis en rouge.' },
        ],
        summary: 'Application Android pour gérer ses cartons de loto.',
        stack: ['Vue.js', 'Quasar', 'Cordova', 'Capacitor'],
        links: [
          { label: 'Play Store', href: 'https://play.google.com/store/apps/details?id=com.daedalusdev.lotomatik' },
          { label: 'Code (GitLab)', href: 'https://gitlab.com/DaedalusDev/lotomatik' },
          { label: "Conditions d'utilisation", href: '/lotomatic/' },
        ],
      },
    ],
  },
  en: {
    ...shared,
    title: 'Tech Lead / DevOps · Vue.js · Symfony · Kubernetes · 10 years of experience',
    hook: 'Full-stack and DevOps Tech Lead: I led the technical platform of a company whose business grew ~15× in 6 years.',
    availability: 'Available immediately',
    searching: 'Permanent role preferred, open to a fixed-term or interim assignment. Nîmes area (France), remote-friendly.',
    timeline: [
      { period: 'Jan. 2020 – Jul. 2026', role: 'Tech Lead / DevOps', place: 'Le Web Français', summary: 'Architecture, quality and operations of a multi-product application platform (SEKUR, Propret). Engineering team grown from 2 to 5 people.' },
      { period: '2015 – 2018', role: 'DevOps Developer', place: 'Gendarmerie nationale', summary: 'Web applications (Zend, jQuery, MaterializeCss) and data processing (Hadoop).' },
    ],
    skills: [
      { theme: 'Back-end', items: 'PHP 8, Symfony 6, API Platform, PostgreSQL' },
      { theme: 'Front-end', items: 'Vue 3, Quasar, Pinia, TypeScript, Capacitor / Cordova' },
      { theme: 'DevOps', items: 'Kubernetes, Helm, Docker, infrastructure as code, GitLab CI/CD, SonarQube' },
      { theme: 'Observability', items: 'Prometheus, Alertmanager, Grafana, Loki' },
      { theme: 'AI in development', items: 'Claude and Codex integrated into the team’s workflows' },
    ],
    projects: [
      {
        name: 'Champi Farm',
        icon: '/assets/img/champi-farm-icon.webp',
        shots: [
          { src: '/assets/img/champi-farm-carte.webp', alt: 'Champi Farm: the map showing the player, the level bar and mushrooms to collect nearby.' },
          { src: '/assets/img/champi-farm-collecte.webp', alt: 'Champi Farm: a “You found a common mushroom!” dialog showing the experience points earned.' },
        ],
        summary: "Android mushroom-hunting app for family and friends, in the spirit of “Pokémon Go”.",
        stack: ['Vue.js', 'Quasar', 'Cordova', 'Firebase'],
        links: [
          { label: 'Play Store', href: 'https://play.google.com/store/apps/details?id=app.web.georunning' },
          { label: 'Code (GitLab)', href: 'https://gitlab.com/DaedalusDev/champi-farm' },
          { label: "Terms & Conditions", href: '/en/champi-farm/' },
        ],
      },
      {
        name: 'Lotomatik',
        icon: '/assets/img/lotomatic.svg',
        shots: [
          { src: '/assets/img/lotomatik-cartons.webp', alt: 'Lotomatik: a list of colourful lotto cards with their numbers.' },
          { src: '/assets/img/lotomatik-tirage.webp', alt: 'Lotomatik: the grid of numbers 1 to 90 used to enter draws, with drawn numbers in red.' },
        ],
        summary: 'Android app to manage your lotto cards.',
        stack: ['Vue.js', 'Quasar', 'Cordova', 'Capacitor'],
        links: [
          { label: 'Play Store', href: 'https://play.google.com/store/apps/details?id=com.daedalusdev.lotomatik' },
          { label: 'Code (GitLab)', href: 'https://gitlab.com/DaedalusDev/lotomatik' },
          { label: "Terms & Conditions", href: '/en/lotomatic/' },
        ],
      },
    ],
  },
}
