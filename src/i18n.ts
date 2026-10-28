export const LANGS = ['fr', 'en'] as const
export type Lang = (typeof LANGS)[number]

export const ui = {
  fr: { work: 'Réalisations', projects: 'Projets personnels', timeline: 'Parcours', skills: 'Compétences', contact: 'Contact', play: 'Jouer à la démo', gallery: "Captures d'écran", updated: 'Mis à jour', switchTo: 'English', skip: 'Aller au contenu' },
  en: { work: 'Selected work', projects: 'Personal projects', timeline: 'Experience', skills: 'Skills', contact: 'Contact', play: 'Play the demo', gallery: 'Screenshots', updated: 'Updated', switchTo: 'Français', skip: 'Skip to content' },
} satisfies Record<Lang, Record<string, string>>

export const homePath = (lang: Lang) => (lang === 'fr' ? '/' : '/en/')
