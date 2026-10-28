# daedalusdev.github.io

Portfolio de Florian Saleur (Tech Lead / DevOps), en ligne sur <https://daedalusdev.github.io/> (français) et <https://daedalusdev.github.io/en/> (anglais).

Le site est statique, généré avec [Astro](https://astro.build) et hébergé sur GitHub Pages. Les pages du portfolio n'embarquent ni suivi d'audience ni script tiers.

## Contenu

- Réalisations et parcours, en français et en anglais.
- **SubRootine** : un jeu de programmation personnel, jouable sous [`/subrootine/`](https://daedalusdev.github.io/subrootine/). Seul le build statique est publié ; le code source est privé.
- Pages d'applications Android (conditions d'utilisation) dont les URL doivent rester stables : `/lotomatic/`, `/champi-farm/`, `/geo-running/` et leurs versions `/en/…`.

## Structure

| Chemin | Rôle |
|---|---|
| `src/content/cases/` | Études de cas en Markdown (`<nom>.fr.md`, `<nom>.en.md`) : ajouter un fichier ajoute une étude. |
| `src/data/profile.ts` | Titre, parcours, compétences et projets personnels (FR/EN). |
| `src/i18n.ts` | Libellés de l'interface. |
| `src/legal/` | Pages légales des applications, reprises à l'identique de l'ancien site. |
| `public/subrootine/` | Build statique du jeu (généré, ne pas modifier à la main). |
| `scripts/check-dist.mjs` | Contrôle du site généré : langues, métadonnées, pages légales identiques à la référence, poids et attributs des images, absence de suivi tiers, de source maps et de chaînes interdites. |
| `scripts/build-subrootine.sh` | Reconstruit le jeu depuis son dépôt privé. |

## Développement

Node.js ≥ 22.23.4 est requis (Astro 7).

```bash
npm ci
npm run dev       # serveur local
npm run build     # génère dist/
npm run check     # vérifie dist/
```

## Déploiement

Chaque push sur `master` lance `.github/workflows/deploy.yml` : build, `npm run check`, puis publication sur GitHub Pages.

## Licence

Tous droits réservés, voir [LICENSE](LICENSE). Le dépôt est public pour être consulté, pas pour être réutilisé.
