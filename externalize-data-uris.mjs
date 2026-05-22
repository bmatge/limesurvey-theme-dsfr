#!/usr/bin/env node
// =============================================================================
// externalize-data-uris.mjs
//
// Extrait les SVG encodés en `data:image/svg+xml,…` des CSS du thème vers des
// fichiers `.svg` servis depuis le même origine, pour rester conforme à une
// CSP `default-src 'self'` stricte (sans `img-src data:`).
//
// Cf. ADR-019. Le script est idempotent : il ne matche que `data:`, donc on
// peut le rejouer autant de fois qu'on veut sans corrompre un CSS déjà patché.
//
// Usage :
//   node modules/theme-dsfr/externalize-data-uris.mjs
//
// À rejouer après chaque bump DSFR (le workflow `update-dsfr.yml` l'appelle).
// =============================================================================

import { readFileSync, writeFileSync, mkdirSync, rmSync, readdirSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// --- Fichiers à patcher (relatifs au submodule) ------------------------------
const CSS_FILES = ['css/dsfr.min.css', 'css/custom.css', 'css/theme.css'];

// Dossier de sortie pour les SVG extraits, et chemin relatif depuis les CSS.
const OUTPUT_DIR  = resolve(__dirname, 'files/icons/inline');
const REL_FROM_CSS = '../files/icons/inline'; // les 3 CSS sont dans css/

// --- Regex --------------------------------------------------------------------
// On gère les trois formes rencontrées : double-quotes, single-quotes, sans
// quotes. Les SVG DSFR utilisent toujours du double-quote côté CSS et les
// caractères réservés URL (<, >) sont encodés en %3C / %3E, donc il n'y a
// jamais de ) ou de " littéral dans le payload — les regex restent saines.
const PATTERNS = [
  /url\(\s*"(data:image\/svg\+xml[^"]*)"\s*\)/g,
  /url\(\s*'(data:image\/svg\+xml[^']*)'\s*\)/g,
  /url\(\s*(data:image\/svg\+xml[^)]*)\s*\)/g,
];

// --- Décodage du payload `data:` ---------------------------------------------
// Forme attendue : `data:image/svg+xml[;charset=utfX],<svg-encodé>`
function decodeDataUri(uri) {
  const comma = uri.indexOf(',');
  if (comma < 0) throw new Error(`URI sans virgule : ${uri.slice(0, 60)}…`);
  const payload = uri.slice(comma + 1);
  // decodeURIComponent gère %XX. Les espaces et apostrophes non encodés passent
  // tels quels — pas de problème, on les réécrit dans le fichier .svg.
  return decodeURIComponent(payload);
}

// --- Run --------------------------------------------------------------------
// On lit d'abord les 3 CSS en mémoire, on détecte tous les `data:`, et on
// décide ensuite si on doit reset le dossier ou non. C'est cette décision-là
// qui rend le script vraiment idempotent : un re-run sur des CSS déjà patchés
// ne doit PAS effacer les SVG déjà extraits.
function run() {
  const files = [];
  let totalDataUris = 0;

  for (const relPath of CSS_FILES) {
    const absPath = resolve(__dirname, relPath);
    let css;
    try {
      css = readFileSync(absPath, 'utf8');
    } catch (err) {
      console.warn(`  ⚠ ${relPath} introuvable, skip — ${err.message}`);
      continue;
    }
    // Compte rapide : nb d'occurrences `data:image/svg+xml` dans ce CSS.
    const count = (css.match(/data:image\/svg\+xml/g) || []).length;
    files.push({ relPath, absPath, css, count });
    totalDataUris += count;
  }

  if (totalDataUris === 0) {
    console.log('  (aucun data: trouvé dans les CSS — rien à faire, dossier préservé)');
    return;
  }

  // Au moins un `data:` à externaliser → on reset le dossier (un bump DSFR
  // peut avoir introduit des icônes neuves et rendu certaines anciennes
  // orphelines).
  rmSync(OUTPUT_DIR, { recursive: true, force: true });
  mkdirSync(OUTPUT_DIR, { recursive: true });

  const written = new Map(); // hash → { count }
  let totalReplacements = 0;

  for (const file of files) {
    let { css } = file;
    let fileCount = 0;

    for (const pattern of PATTERNS) {
      css = css.replace(pattern, (_match, uri) => {
        let svg;
        try {
          svg = decodeDataUri(uri);
        } catch (err) {
          console.warn(`  ⚠ Décodage échoué dans ${file.relPath} — ${err.message}`);
          return _match;
        }

        const hash = createHash('sha256').update(svg).digest('hex').slice(0, 12);
        const filename = `${hash}.svg`;
        const outPath = resolve(OUTPUT_DIR, filename);

        if (!written.has(hash)) {
          writeFileSync(outPath, svg, 'utf8');
          written.set(hash, { count: 0 });
        }
        written.get(hash).count += 1;
        fileCount += 1;
        totalReplacements += 1;

        return `url("${REL_FROM_CSS}/${filename}")`;
      });
    }

    writeFileSync(file.absPath, css, 'utf8');
    console.log(`  ✔ ${file.relPath} : ${fileCount} url() patchées`);
  }

  console.log('');
  console.log(`  ${totalReplacements} occurrences réécrites`);
  console.log(`  ${written.size} SVG uniques écrits dans files/icons/inline/`);
}

run();
