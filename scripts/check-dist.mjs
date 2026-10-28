// Vérifie le build (`dist/`) : structure, langues, chaînes interdites.
// Usage : npm run build && npm run check  (exit 1 au premier écart signalé)
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs'
import { join } from 'node:path'

const DIST = new URL('../dist/', import.meta.url).pathname
const failures = []
const check = (ok, message) => { if (!ok) failures.push(message) }
const read = (path) => existsSync(join(DIST, path)) ? readFileSync(join(DIST, path), 'utf8') : ''

// --- Task 1 : socle, langues, pas de suivi tiers
const PAGES = { fr: 'index.html', en: 'en/index.html' }
for (const [lang, file] of Object.entries(PAGES)) {
  const html = read(file)
  check(existsSync(join(DIST, file)), `${file} manquant`)
  check(html.includes('href="https://www.linkedin.com/in/florian-saleur-355892123/"'), `${file} : lien LinkedIn absent`)
  check(/<img[^>]*src="\/florian-saleur\.webp"[^>]*alt="Florian Saleur"[^>]*>|<img[^>]*alt="Florian Saleur"[^>]*src="\/florian-saleur\.webp"[^>]*>/.test(html), `${file} : portrait absent ou sans texte alternatif`)
  check(/<img[^>]*width="96"[^>]*height="96"/.test(html), `${file} : portrait sans dimensions fixes (décalage de mise en page)`)
  check(html.includes(`lang="${lang}"`), `${file} : lang="${lang}" absent`)
  check(!html.includes('UA-'), `${file} : identifiant Google Analytics présent`)
  check(!html.includes('googletagmanager'), `${file} : googletagmanager présent`)
}

// --- Task 3 : structure des pages d'accueil, métadonnées, contact
const SITE = 'https://daedalusdev.github.io'
const URLS = { fr: `${SITE}/`, en: `${SITE}/en/` }
for (const [lang, file] of Object.entries(PAGES)) {
  const html = read(file)
  check((html.match(/<h1[\s>]/g) ?? []).length === 1, `${file} : il faut exactement un <h1>`)
  check(html.includes('href="mailto:dev.daedalus@gmail.com"'), `${file} : lien mailto absent du HTML statique`)
  check(html.includes(`<link rel="canonical" href="${URLS[lang]}"`), `${file} : canonical absent ou incorrect`)
  for (const [l, url] of Object.entries(URLS)) {
    check(html.includes(`hreflang="${l}" href="${url}"`), `${file} : hreflang ${l} absent`)
  }
  check(html.includes('hreflang="x-default"'), `${file} : hreflang x-default absent`)
  check(/<meta name="description" content="[^"]{20,}"/.test(html), `${file} : meta description absente ou vide`)
  check(/<article/.test(html), `${file} : aucune étude de cas rendue`)
}
check(
  (read(PAGES.fr).match(/<article/g) ?? []).length === (read(PAGES.en).match(/<article/g) ?? []).length,
  'FR et EN : nombre d\'études de cas différent',
)

// --- Task 3b : pages légales des applications (URLs et texte conservés à l'identique)
const visibleText = (html) => html
  .replace(/<(script|style)[\s\S]*?<\/\1>/g, ' ').replace(/<[^>]+>/g, ' ')
  .replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
  .replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(+n))
  .replace(/\s+/g, ' ').trim()
const LEGAL_APPS = { lotomatic: 'lotomatic.svg', 'champi-farm': 'champi-farm.png', 'geo-running': 'geo-running.svg' }
const LEGAL_REF = new URL('./legal-reference/', import.meta.url).pathname
const LEGAL_FILES = []
for (const [app, image] of Object.entries(LEGAL_APPS)) {
  check(existsSync(join(DIST, 'assets/img', image)), `assets/img/${image} manquant`)
  for (const lang of Object.keys(PAGES)) {
    const file = lang === 'fr' ? `${app}/index.html` : `en/${app}/index.html`
    LEGAL_FILES.push(file)
    const html = read(file)
    check(html !== '', `${file} manquant (URL légale à conserver)`)
    const main = /<main[\s\S]*?<\/main>/.exec(html)?.[0] ?? ''
    const reference = readFileSync(join(LEGAL_REF, `${app}.${lang}.txt`), 'utf8').trim()
    check(visibleText(main) === reference, `${file} : texte légal différent de la référence`)
    check(html.includes('dev.daedalus@gmail.com'), `${file} : contact légal absent`)
    check(html.includes('policies.google.com/terms'), `${file} : lien policies.google.com/terms absent`)
    check(html.includes('firebase.google.com/policies/analytics'), `${file} : lien Firebase Analytics absent`)
    check(!html.includes('googletagmanager') && !html.includes('jquery'), `${file} : suivi ou jQuery résiduel`)
  }
}

// --- Task 4 : contenu — chaînes interdites (confidentialité) et obligatoires
const allFiles = readdirSync(DIST, { recursive: true }).filter((f) => statSync(join(DIST, f)).isFile())
check(!allFiles.some((f) => f.endsWith('.map')), 'source map (.map) présente dans dist/')
// Mots sensibles : jamais versionnés (dépôt public). Fichier local non suivi, ou variable FORBIDDEN_WORDS (un mot par ligne).
const LOCAL_WORDS = new URL('./forbidden.local.txt', import.meta.url).pathname
const secretWords = (existsSync(LOCAL_WORDS) ? readFileSync(LOCAL_WORDS, 'utf8') : (process.env.FORBIDDEN_WORDS ?? ''))
  .split('\n').map((w) => w.trim().toLowerCase()).filter(Boolean)
if (secretWords.length === 0) console.warn('⚠ liste de mots sensibles absente (scripts/forbidden.local.txt ou FORBIDDEN_WORDS) : seuls les motifs génériques sont contrôlés')
const PATTERNS = [
  [/€|\beuros?\b/i, 'montant en euros'],
  [/\b1[\s.,  ]000\b/, '« 1 000 »'],
  [/\b(?:50|300|1[\s.,  ]?000)\s*(?:clients?|customers?|utilisateurs?)\b/i, 'nombre de clients'],
]
const textFiles = allFiles.filter((f) => /\.(html|xml|txt)$/.test(f) && !LEGAL_FILES.includes(f) && !f.startsWith('subrootine/'))
check(textFiles.length >= 5, `contrôle de confidentialité : seulement ${textFiles.length} fichier(s) analysé(s)`)
for (const f of textFiles) {
  const text = readFileSync(join(DIST, f), 'utf8')
  const lower = text.toLowerCase()
  for (const [pattern, label] of PATTERNS) check(!pattern.test(text), `${f} : motif interdit (${label})`)
  for (const word of secretWords) check(!lower.includes(word), `${f} : mot sensible présent`)
}
const PROJECTS = ['Champi Farm', 'Lotomatik', 'play.google.com/store/apps/details?id=app.web.georunning', 'play.google.com/store/apps/details?id=com.daedalusdev.lotomatik', 'gitlab.com/DaedalusDev/champi-farm', 'gitlab.com/DaedalusDev/lotomatik']
const REQUIRED = {
  fr: ['Le Web Français', 'SubRootine', 'Nîmes', 'CDI', '~15', '10 ans d\'expérience', 'Développeur DevOps', 'Projets personnels', 'Projet personnel · conception et développement', 'Three.js', 'Web Audio', 'href="/champi-farm/"', 'href="/lotomatic/"', ...PROJECTS],
  en: ['Le Web Français', 'SubRootine', 'Nîmes', '~15', '10 years of experience', 'DevOps Developer', 'Personal projects', 'Personal project · design and development', 'Three.js', 'Web Audio', 'href="/en/champi-farm/"', 'href="/en/lotomatic/"', ...PROJECTS],
}
for (const [lang, file] of Object.entries(PAGES)) {
  const html = read(file)
  for (const word of REQUIRED[lang]) check(html.includes(word), `${file} : mention obligatoire « ${word} » absente`)
  for (const cls of ['timeline', 'skills']) check(html.includes(`class="${cls}"`), `${file} : section ${cls} absente`)
  check(!/À rédiger|To be written/.test(html), `${file} : texte provisoire présent`)
}

// --- Task 5 : SubRootine jouable sous /subrootine/ (build statique)
const game = read('subrootine/index.html')
check(game !== '', 'subrootine/index.html manquant')
const abs = [...game.matchAll(/(?:src|href)=["']?(\/[^"'\s>]*)/g)].map((m) => m[1]).filter((u) => !u.startsWith('/subrootine/'))
check(abs.length === 0, `subrootine/index.html : ressources en URL absolue hors /subrootine/ : ${abs.join(', ')}`)
check(!/serviceWorker\.register|register-service-worker/.test(game), 'subrootine/index.html : enregistrement de service worker')
check(!allFiles.some((f) => /(^|\/)sw\.js$|workbox/.test(f)), 'service worker (sw.js / workbox) présent dans dist/')
check(read('index.html').includes('href="/subrootine/"'), 'index.html : lien vers /subrootine/ absent')
check(!secretWords.some((w) => game.toLowerCase().includes(w)), 'subrootine/index.html : mot sensible (ancien nom du jeu ?) dans le titre ou la description')
check(!allFiles.some((f) => /eruda/i.test(f)), 'outils de débogage (eruda) présents dans dist/')

// --- CI : les vérifications doivent tourner avant le déploiement
const workflow = readFileSync(new URL('../.github/workflows/deploy.yml', import.meta.url), 'utf8')
check(/build-cmd:.*npm run check/.test(workflow), 'deploy.yml : `npm run check` non exécuté avant le déploiement')

// --- Task 6 : référencement et fichiers d'appoint
check(existsSync(join(DIST, 'sitemap-index.xml')), 'sitemap-index.xml manquant')
check(/Sitemap: https:\/\/daedalusdev\.github\.io\/sitemap-index\.xml/.test(read('robots.txt')), 'robots.txt : ligne Sitemap absente')
check(existsSync(join(DIST, 'favicon.svg')), 'favicon.svg manquant')

// --- Portrait : fichier présent et léger
const portrait = join(DIST, 'florian-saleur.webp')
check(existsSync(portrait), 'florian-saleur.webp manquant')
check(!existsSync(portrait) || statSync(portrait).size < 30 * 1024, 'florian-saleur.webp : plus de 30 Ko')

// --- Task 2 : parité FR/EN des études de cas (src/content/cases/<slug>.<lang>.md)
const CASES = new URL('../src/content/cases/', import.meta.url).pathname
const caseFiles = existsSync(CASES) ? readdirSync(CASES).filter((f) => f.endsWith('.md')) : []
check(caseFiles.length > 0, 'src/content/cases/ : aucune étude de cas')
const slugs = new Set(caseFiles.map((f) => f.replace(/\.(fr|en)\.md$/, '')))
for (const slug of slugs) {
  for (const lang of Object.keys(PAGES)) {
    const file = `${slug}.${lang}.md`
    check(caseFiles.includes(file), `étude de cas ${file} manquante (parité FR/EN)`)
    if (caseFiles.includes(file)) {
      check(new RegExp(`^lang: ${lang}$`, 'm').test(readFileSync(join(CASES, file), 'utf8')), `${file} : frontmatter lang: ${lang} absent`)
    }
  }
}

if (failures.length) {
  console.error(`✗ ${failures.length} vérification(s) en échec :\n- ${failures.join('\n- ')}`)
  process.exit(1)
}
console.log('✓ dist/ conforme')
