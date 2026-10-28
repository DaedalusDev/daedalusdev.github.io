---
lang: fr
title: "SubRootine — un jeu de programmation à moteur pur et testable"
role: "Projet personnel · conception et développement"
period: "Août 2026"
summary: "Reprogramme des robots dans un monde post-IA : le joueur écrit un script JavaScript qui pilote un robot sur une grille."
order: 2
stack: ["Vue 3", "Quasar", "TypeScript", "Pinia", "Vitest", "Playwright", "Three.js", "Web Audio"]
demo: "/subrootine/"
images:
  - src: "/assets/img/subrootine-mobile.webp"
    alt: "Premier niveau de SubRootine sur téléphone : la ferme en 3D en haut, et en bas un programme de trois blocs « Move » construit d'un simple toucher."
    width: 360
    height: 779
  - src: "/assets/img/subrootine.webp"
    alt: "Premier niveau de SubRootine sur ordinateur : l'éditeur de blocs à gauche, et à droite la ferme en 3D avec le robot, des caisses, des clôtures et un tracteur."
    width: 960
    height: 600
---
Le jeu est jouable ci-dessous, directement dans le navigateur, sans serveur. Le code source est privé ; voici comment il est construit.

- **Des couches qui ne dépendent que de celles du dessous.** Interface Vue → fonctions de présentation pures → moteur. Le moteur n'importe jamais Vue : toute la logique du jeu se teste sans navigateur.
- **Un moteur pur et déterministe.** L'état du monde est immuable du point de vue de l'API : appliquer une action renvoie un nouveau monde. Mêmes entrées, mêmes résultats.
- **Un langage de script pour le joueur, interprété.** Un sous-ensemble de JavaScript, analysé avec acorn puis exécuté par un interpréteur maison qui appelle le robot à travers une interface dédiée.
- **Un rejeu frame par frame.** Chaque action du robot est enregistrée comme une frame ; l'interface rejoue cette trace, ce qui simplifie les animations et le débogage.
- **Des niveaux vérifiables.** Chaque niveau fournit sa solution de référence et des variantes de monde pour contrôler la robustesse des scripts. Les tests sont écrits avec Vitest (moteur) et Playwright (parcours utilisateur de bout en bout).

**La dimension artistique**

- **Des sprites 3D pré-rendus en images.** Le robot, les cultures, les clôtures, le sol et les décors sont modélisés avec Three.js (ombrage « toon » à rampe de dégradé, formes arrondies, caméra orthographique en vue 3/4), puis calculés hors ligne dans un Chromium headless et enregistrés en images : une par direction et par animation. Le jeu n'embarque aucun moteur 3D, il ne charge que ces images. Le robot existe en six paliers de rareté, obtenus en recolorant son armure.
- **Une musique par monde, un seul morceau.** Huit palettes d'instruments (ferme, mine, cuisine, guinguette…) jouent la même partition : quand le joueur change de lieu, la musique passe d'une palette à l'autre sans casser la phrase. Les notes viennent d'une banque d'instruments (SoundFont FluidR3_GM) et sont chargées à la demande, palette par palette. Un atelier de pages HTML autonomes sert à composer et à comparer les variantes.
- **Des bruitages décrits, pas enregistrés.** Chaque effet est une recette déclarative qui empile des oscillateurs, du bruit filtré et des cordes pincées, interprétée par le moteur Web Audio.
