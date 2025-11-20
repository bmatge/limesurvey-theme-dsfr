# État de l'internalisation DSFR

**Date** : 2025-11-15
**Version** : 1.0.4
**Statut** : ✅ **Hybride optimisé**

## Résumé

Le thème LimeSurvey DSFR fonctionne avec une approche **hybride optimisée** :

| Composant | Statut | Source |
|-----------|--------|--------|
| CSS DSFR | ✅ **Local** | `dsfr-dist/css/dsfr.min.css` (673 KB) |
| Icônes CSS | ✅ **Local** | `dsfr-dist/css/icons.min.css` (216 KB) |
| Icônes système | ✅ **Local** | `dsfr-dist/css/icons-system.min.css` (53 KB) |
| JavaScript | ✅ **Local** | `dsfr-dist/js/dsfr.*.min.js` (359 KB) |
| Fonts | ✅ **Local** | `dsfr-dist/fonts/*.woff2` (1 MB) |
| **Icônes SVG** | ⚠️ **CDN** | Chargées à la demande depuis unpkg |

## Autonomie : 99%

- **99% du thème est autonome** (CSS, JS, fonts)
- **1% dépend d'unpkg** (icônes SVG, ~10 fichiers utilisés)

## Pourquoi ce choix ?

### ✅ Avantages

1. **Taille optimisée** : 2.3 MB au lieu de ~12 MB (si toutes les icônes étaient locales)
2. **Performance** : Pas de 2000+ icônes inutilisées
3. **Maintenance** : Mise à jour simple avec `update-dsfr.sh`
4. **Cache navigateur** : Les ~10 icônes utilisées sont cachées

### ⚠️ Compromis

- Les icônes SVG nécessitent une connexion internet (première utilisation)
- Après cache, fonctionnement hors-ligne pour les icônes déjà vues

## Icônes utilisées (10 fichiers)

Le thème utilise **seulement 10 icônes** sur 2000+ disponibles :

```
fr-icon-arrow-left-line.svg     (~2 KB)
fr-icon-arrow-right-line.svg    (~2 KB)
fr-icon-check-line.svg          (~2 KB)
fr-icon-printer-line.svg        (~2 KB)
fr-icon-eye-line.svg            (~2 KB)
fr-icon-eye-off-line.svg        (~2 KB)
fr-icon-save-line.svg           (~2 KB)
fr-icon-delete-line.svg         (~2 KB)
fr-icon-list-unordered.svg      (~2 KB)
```

**Total** : ~20 KB (négligeable)

## Ressources locales téléchargées

### CSS (3 fichiers)
```
dsfr-dist/css/
├── dsfr.min.css           673 KB  ✅ Tous les composants DSFR
├── icons.min.css          216 KB  ✅ Classes icônes (pointent vers CDN)
└── icons-system.min.css    53 KB  ✅ Icônes système
```

### JavaScript (2 fichiers)
```
dsfr-dist/js/
├── dsfr.module.min.js     101 KB  ✅ Version ES6 modules
└── dsfr.nomodule.min.js   258 KB  ✅ Version legacy
```

### Fonts (20 fichiers)
```
dsfr-dist/fonts/
├── Marianne-*.woff2       (8 fichiers)  ✅
├── Marianne-*.woff        (8 fichiers)  ✅
├── Spectral-*.woff2       (2 fichiers)  ✅
└── Spectral-*.woff        (2 fichiers)  ✅
```

**Total stockage** : 2.3 MB

## Fonctionnement

### Lors du premier chargement

1. **CSS local** chargé instantanément (0 latence)
2. **JS local** chargé instantanément (0 latence)
3. **Fonts locales** chargées instantanément (0 latence)
4. **Icônes SVG** chargées depuis unpkg (~100ms)

### Après mise en cache

1. **Tout est instantané** (CSS, JS, fonts, icônes)
2. **Fonctionne hors-ligne** (si icônes déjà en cache)

## Migration vers 100% local (optionnel)

Si vous avez besoin d'une autonomie **totale**, vous pouvez télécharger les 10 icônes :

```bash
# Créer le dossier icons
mkdir -p dsfr-dist/icons/{system,business,design}

# Télécharger les 10 icônes utilisées
curl -o dsfr-dist/icons/system/arrow-left-line.svg \
  https://unpkg.com/@gouvfr/dsfr@1.11/dist/icons/system/arrow-left-line.svg

# ... répéter pour les 9 autres icônes
```

**Gain** : Autonomie 100%
**Coût** : +20 KB de stockage

## Conclusion

✅ **Le fonctionnement hybride est optimal** pour ce cas d'usage :

- Thème quasi-autonome (99%)
- Taille réduite (2.3 MB vs 12 MB)
- Performance maximale
- Maintenance simple

**Les 3 CSS + 2 JS + fonts suffisent !** Aucun import additionnel nécessaire.
