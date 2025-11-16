# DSFR - Ressources locales pour LimeSurvey

Ce dossier contient les ressources DSFR nécessaires au thème LimeSurvey.

## Structure

```
files/dsfr/
├── css/
│   ├── dsfr.min.css           # CSS principal DSFR (tous les composants)
│   ├── icons.min.css          # Classes icônes (références CDN pour SVG)
│   └── icons-system.min.css   # Icônes système
├── fonts/
│   ├── Marianne-*.woff2       # Fonts Marianne (8 fichiers)
│   ├── Marianne-*.woff        # Fonts Marianne fallback
│   ├── Spectral-*.woff2       # Fonts Spectral (2 fichiers)
│   └── Spectral-*.woff        # Fonts Spectral fallback
├── dsfr.module.min.js         # JavaScript DSFR (ES modules)
└── dsfr.nomodule.min.js       # JavaScript DSFR (legacy browsers)
```

## Pourquoi dans `files/` ?

Le dossier `files/` est accessible **publiquement** par LimeSurvey sans passer par le système d'assets (`/tmp/assets/`). Cela permet :

1. ✅ Les fonts sont accessibles avec des chemins relatifs depuis les CSS
2. ✅ Les JavaScript modules fonctionnent (bon type MIME)
3. ✅ Pas de problème de permissions
4. ✅ Chemins stables et prévisibles

## Mise à jour

Pour mettre à jour DSFR :

```bash
cd /chemin/vers/themes/survey/dsfr

# Télécharger les nouvelles ressources
./update-dsfr.sh 1.12  # Par exemple pour la version 1.12

# Copier dans files/dsfr/
cp -r dsfr-dist/css files/dsfr/
cp -r dsfr-dist/js/*.js files/dsfr/
cp -r dsfr-dist/css/fonts files/dsfr/
```

## Version actuelle

**DSFR v1.11.2**

## Notes techniques

- Les CSS sont chargés via `@import` dans `css/theme.css`
- Les JS sont chargés dynamiquement dans `scripts/theme.js`
- Les fonts utilisent des chemins relatifs `url(fonts/...)` depuis `dsfr.min.css`
- Les icônes SVG sont chargées à la demande depuis unpkg (hybride)
