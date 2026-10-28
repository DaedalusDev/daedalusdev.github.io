---
lang: fr
title: "SubRootine — un jeu de programmation à moteur pur et testable"
role: "Projet personnel · conception et développement"
period: "Août 2026"
summary: "Reprogramme des robots dans un monde post-IA : le joueur écrit un script JavaScript qui pilote un robot sur une grille."
order: 2
stack: ["Vue 3", "Quasar", "TypeScript", "Pinia", "Vitest", "Playwright", "Three.js", "Web Audio"]
demo: "/subrootine/"
---
Le jeu est jouable ci-dessous, directement dans le navigateur, sans serveur. Le code source est privé ; voici comment il est construit.

- **Des couches qui ne dépendent que vers le bas.** Interface Vue → helpers de présentation purs → moteur. Le moteur n'importe jamais Vue : toute la logique du jeu se teste sans navigateur.
- **Un moteur pur et déterministe.** L'état du monde est immuable côté API : appliquer une action renvoie un nouveau monde. Mêmes entrées, mêmes résultats.
- **Un langage joueur interprété.** Un sous-ensemble de JavaScript, analysé avec acorn puis exécuté par un interpréteur maison qui appelle le robot à travers une interface dédiée.
- **Un rejeu image par image.** Chaque action du robot est enregistrée comme une frame ; l'interface rejoue cette trace, ce qui rend les animations et le débogage simples.
- **Des niveaux vérifiables.** Chaque niveau fournit sa solution de référence et des variantes de monde pour contrôler la robustesse des scripts. Les tests sont écrits avec Vitest (moteur) et Playwright (parcours complet).

**La dimension artistique**

- **Des sprites 3D « cuits » en images.** Le robot, les cultures, les clôtures, le sol et les décors sont modélisés avec Three.js (rendu « toon » à dégradé, formes arrondies, caméra orthographique en vue 3/4), puis rendus hors ligne dans un Chromium sans écran et enregistrés en images : une par direction et par animation. Le jeu n'embarque aucun moteur 3D, il ne charge que ces images. Le robot existe en six paliers de rareté, obtenus en recolorant son armure.
- **Une musique par monde, un seul morceau.** Huit palettes d'instruments (ferme, mine, cuisine, guinguette…) jouent la même partition : quand le joueur change de lieu, la musique passe d'une palette à l'autre sans casser la phrase. Les notes viennent d'une banque d'instruments (SoundFont FluidR3_GM) et sont chargées à la demande, palette par palette. Un atelier de pages HTML autonomes sert à composer et à arbitrer.
- **Des bruitages décrits, pas enregistrés.** Chaque effet est une recette déclarative qui empile des oscillateurs, du bruit filtré et des cordes pincées, interprétée par le moteur Web Audio.
