# Vérification de l'installation DSFR

Date: 2025-11-15
Version: 1.0.4

## Structure files/dsfr/ ✅

```
files/dsfr/
├── css/
│   ├── dsfr.min.css           (673 KB) ✅
│   ├── icons.min.css          (216 KB) ✅
│   └── icons-system.min.css    (53 KB) ✅
├── fonts/
│   ├── Marianne-*.woff2       (8 fichiers) ✅
│   ├── Marianne-*.woff        (8 fichiers) ✅
│   ├── Spectral-*.woff2       (2 fichiers) ✅
│   └── Spectral-*.woff        (2 fichiers) ✅
├── dsfr.module.min.js         (101 KB) ✅
├── dsfr.nomodule.min.js       (258 KB) ✅
└── README.md                  ✅
```

## Références dans le thème

### css/theme.css
```css
@import url('../files/dsfr/css/dsfr.min.css');
@import url('../files/dsfr/css/icons.min.css');
```

### scripts/theme.js
```javascript
const dsfrPath = themePath ? themePath + '/files/dsfr/' : './files/dsfr/';
dsfrScript.src = dsfrPath + 'dsfr.module.min.js';
dsfrScriptLegacy.src = dsfrPath + 'dsfr.nomodule.min.js';
```

## Chemins des fonts (dans dsfr.min.css)

Les fonts sont référencées avec des chemins relatifs depuis `dsfr.min.css`:
```css
url(../fonts/Marianne-Regular.woff2)
```

Résolution du chemin:
- CSS à: `files/dsfr/css/dsfr.min.css`
- `../fonts/` → `files/dsfr/fonts/`
- ✅ Chemin correct!

## Pourquoi files/dsfr/ ?

1. **LimeSurvey asset system**: Le dossier `/tmp/assets/` casse les chemins relatifs
2. **files/ est public**: Accessible directement sans passer par le système d'assets
3. **Fonts fonctionnent**: Les chemins relatifs depuis CSS vers fonts/ sont préservés
4. **JS modules**: Pas de problème de MIME type

## Fonctionnement hybride

- ✅ CSS local (99% autonome)
- ✅ JavaScript local
- ✅ Fonts locales
- ⚠️ Icônes SVG (chargées depuis unpkg CDN)

## Tests à effectuer

1. ✅ Fonts chargées (vérifier dans DevTools Network)
2. ✅ CSS appliqué (vérifier styles DSFR)
3. ✅ JavaScript chargé (vérifier console)
4. ⚠️ Icônes (peuvent afficher 404, c'est normal - CDN)

## Mise à jour

Pour mettre à jour DSFR:
```bash
./update-dsfr.sh 1.12
```

Le script copie automatiquement vers files/dsfr/.
