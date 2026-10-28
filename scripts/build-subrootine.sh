#!/usr/bin/env bash
# Construit SubRootine (dépôt privé) en SPA statique sous /subrootine/ et le copie dans public/subrootine/.
# Usage : scripts/build-subrootine.sh <chemin-du-dépôt-subrootine> [ref-git]   (ref par défaut : origin/master)
# Le dépôt source n'est pas modifié : on exporte la ref dans un dossier temporaire.
set -euo pipefail

repo=$(cd "${1:?chemin du dépôt subrootine requis}" && pwd)
ref=${2:-origin/master}
here=$(cd "$(dirname "$0")/.." && pwd)
work=$(mktemp -d)
trap 'rm -rf "$work"' EXIT

git -C "$repo" archive "$ref" | tar -x -C "$work"
cd "$work"

# Base publique /subrootine/ ; routage en hash déjà configuré côté jeu (aucun rewrite serveur).
sed -i "s#// publicPath: '/',#publicPath: '/subrootine/',#" quasar.config.ts
grep -q "publicPath: '/subrootine/'" quasar.config.ts || { echo "publicPath introuvable dans quasar.config.ts" >&2; exit 1; }

npm ci --no-audit --no-fund
npx quasar build   # mode SPA : pas de service worker

[ -f dist/spa/index.html ] || { echo "dist/spa/index.html absent" >&2; exit 1; }
find dist/spa -name '*.map' -delete   # jamais de source maps dans le dépôt public
find dist/spa -name 'eruda*' -delete  # console de débogage (14 Mo), inutile dans une démo publique
# La meta description d'origine porte un ancien nom du jeu : on la ramène à « SubRootine ».
sed -i 's#content="[^"]*— programme#content="SubRootine — programme#' dist/spa/index.html

rm -rf "$here/public/subrootine"
mkdir -p "$here/public/subrootine"
cp -a dist/spa/. "$here/public/subrootine/"
echo "✓ SubRootine ($ref) copié dans public/subrootine/"
