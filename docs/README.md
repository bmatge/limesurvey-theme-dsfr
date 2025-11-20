# DSFR - Ressources locales

Ce dossier contient toutes les ressources DSFR (Système de Design de l'État Français) hébergées localement pour garantir l'autonomie complète du thème LimeSurvey.

## Structure

```
dsfr-dist/
├── css/
│   ├── dsfr.min.css          # CSS principal DSFR
│   ├── icons.min.css         # Icônes Remix Icon
│   └── icons-system.min.css  # Icônes système
├── js/
│   ├── dsfr.module.min.js    # JavaScript DSFR (ES modules)
│   └── dsfr.nomodule.min.js  # JavaScript DSFR (legacy browsers)
├── fonts/
│   ├── Marianne-*.woff2      # Fonts Marianne (format woff2)
│   ├── Marianne-*.woff       # Fonts Marianne (format woff)
│   ├── Spectral-*.woff2      # Fonts Spectral (format woff2)
│   └── Spectral-*.woff       # Fonts Spectral (format woff)
└── icons/
    └── (SVG icons - référencés par icons.min.css)
```

## Version actuelle

**DSFR v1.11.2**

## Pourquoi des ressources locales ?

1. **Autonomie** : Le thème fonctionne sans connexion internet
2. **Performance** : Pas de dépendance aux CDN externes
3. **Sécurité** : Contrôle total sur les ressources chargées
4. **Conformité** : Respect des exigences de souveraineté numérique
5. **Stabilité** : Protection contre les changements ou indisponibilités des CDN

## Comment mettre à jour DSFR

### Méthode 1 : Script automatique (recommandé)

Créez un script `update-dsfr.sh` à la racine du thème :

```bash
#!/bin/bash
# Script de mise à jour des ressources DSFR

VERSION="1.11"  # Modifiez cette version selon vos besoins
BASE_URL="https://unpkg.com/@gouvfr/dsfr@${VERSION}/dist"
DIST_DIR="./dsfr-dist"

echo "Mise à jour DSFR vers la version ${VERSION}..."

# CSS
echo "Téléchargement des CSS..."
curl -sL "${BASE_URL}/dsfr.min.css" -o "${DIST_DIR}/css/dsfr.min.css"
curl -sL "${BASE_URL}/utility/icons/icons.min.css" -o "${DIST_DIR}/css/icons.min.css"
curl -sL "${BASE_URL}/utility/icons/icons-system/icons-system.min.css" -o "${DIST_DIR}/css/icons-system.min.css"

# JavaScript
echo "Téléchargement des JS..."
curl -sL "${BASE_URL}/dsfr.module.min.js" -o "${DIST_DIR}/js/dsfr.module.min.js"
curl -sL "${BASE_URL}/dsfr.nomodule.min.js" -o "${DIST_DIR}/js/dsfr.nomodule.min.js"

# Fonts Marianne
echo "Téléchargement des fonts Marianne..."
for variant in Light Regular Medium Bold; do
  for style in "" "_Italic"; do
    curl -sL "${BASE_URL}/fonts/Marianne-${variant}${style}.woff2" -o "${DIST_DIR}/fonts/Marianne-${variant}${style}.woff2"
    curl -sL "${BASE_URL}/fonts/Marianne-${variant}${style}.woff" -o "${DIST_DIR}/fonts/Marianne-${variant}${style}.woff"
  done
done

# Fonts Spectral
echo "Téléchargement des fonts Spectral..."
for variant in Regular ExtraBold; do
  curl -sL "${BASE_URL}/fonts/Spectral-${variant}.woff2" -o "${DIST_DIR}/fonts/Spectral-${variant}.woff2"
  curl -sL "${BASE_URL}/fonts/Spectral-${variant}.woff" -o "${DIST_DIR}/fonts/Spectral-${variant}.woff"
done

echo "✅ Mise à jour terminée !"
echo "N'oubliez pas de tester le thème après la mise à jour."
```

Rendez le script exécutable et lancez-le :

```bash
chmod +x update-dsfr.sh
./update-dsfr.sh
```

### Méthode 2 : Mise à jour manuelle

1. **CSS** :
   ```bash
   cd dsfr-dist/css
   curl -O https://unpkg.com/@gouvfr/dsfr@1.11/dist/dsfr.min.css
   curl -O https://unpkg.com/@gouvfr/dsfr@1.11/dist/utility/icons/icons.min.css
   ```

2. **JavaScript** :
   ```bash
   cd dsfr-dist/js
   curl -O https://unpkg.com/@gouvfr/dsfr@1.11/dist/dsfr.module.min.js
   curl -O https://unpkg.com/@gouvfr/dsfr@1.11/dist/dsfr.nomodule.min.js
   ```

3. **Fonts** :
   ```bash
   cd dsfr-dist/fonts
   # Télécharger chaque font individuellement depuis :
   # https://unpkg.com/@gouvfr/dsfr@1.11/dist/fonts/
   ```

### Méthode 3 : Via npm (si disponible)

Si vous avez npm installé sur votre serveur :

```bash
# Installer DSFR via npm
npm install @gouvfr/dsfr@1.11

# Copier les fichiers nécessaires
cp node_modules/@gouvfr/dsfr/dist/dsfr.min.css dsfr-dist/css/
cp node_modules/@gouvfr/dsfr/dist/utility/icons/icons.min.css dsfr-dist/css/
cp node_modules/@gouvfr/dsfr/dist/dsfr.module.min.js dsfr-dist/js/
cp node_modules/@gouvfr/dsfr/dist/dsfr.nomodule.min.js dsfr-dist/js/
cp -r node_modules/@gouvfr/dsfr/dist/fonts/* dsfr-dist/fonts/

# Nettoyer
rm -rf node_modules package-lock.json
```

## Vérification après mise à jour

1. **Vérifier les chemins** :
   - Les CSS doivent correctement référencer les fonts avec `url(../fonts/...)`
   - Les icônes doivent être accessibles

2. **Tester le thème** :
   - Charger une enquête LimeSurvey
   - Vérifier que les styles DSFR s'appliquent correctement
   - Vérifier que les icônes s'affichent
   - Tester les composants interactifs (modales, accordéons, etc.)

3. **Test hors-ligne** :
   - Désactiver votre connexion internet
   - Recharger une page d'enquête
   - Vérifier que tout fonctionne parfaitement

## Compatibilité des versions

| DSFR Version | LimeSurvey | Date de test |
|--------------|------------|--------------|
| 1.11.2       | 6.0+       | 2025-11-15   |

## Sources officielles

- **DSFR** : https://www.systeme-de-design.gouv.fr/
- **Documentation** : https://www.systeme-de-design.gouv.fr/composants-et-modeles/
- **GitHub** : https://github.com/GouvernementFR/dsfr
- **NPM** : https://www.npmjs.com/package/@gouvfr/dsfr
- **CDN unpkg** : https://unpkg.com/@gouvfr/dsfr@1.11/

## Support

Pour toute question ou problème :
- GitHub Issues : https://github.com/bmatge/limesurvey-theme-dsfr/issues
- Documentation LimeSurvey DSFR : Voir README.md à la racine du thème

## Licence

Les ressources DSFR sont sous licence MIT.
Voir : https://github.com/GouvernementFR/dsfr/blob/main/LICENSE.md
