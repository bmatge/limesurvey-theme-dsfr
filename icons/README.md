# Icônes DSFR

Ce dossier contient les icônes SVG du Système de Design de l'État Français (DSFR) utilisées par le thème.

## Structure

Les icônes sont dupliquées à deux emplacements pour compatibilité avec LimeSurvey :

```
themes/survey/dsfr/
├── icons/                           # Icônes accessibles depuis la racine du thème
│   ├── system/
│   └── editor/
└── dsfr-dist/
    ├── icons/                       # Icônes dans le package DSFR
    │   ├── system/
    │   └── editor/
    └── css/
        └── icons/                   # Icônes relatives au CSS DSFR
            ├── system/
            │   ├── arrow-left-line.svg
            │   ├── arrow-right-line.svg
            │   ├── close-line.svg
            │   ├── external-link-line.svg
            │   ├── fr--warning-fill.svg
            │   └── menu-fill.svg
            └── editor/
                └── list-unordered.svg
```

**Note** : Le dossier `dsfr-dist/css/icons/` est celui utilisé par le CSS DSFR (chemins relatifs depuis `dsfr.min.css`).

## Origine

Ces icônes proviennent du package officiel DSFR v1.11 :
- Source : `@gouvfr/dsfr@1.11/dist/icons/`
- CDN : https://unpkg.com/@gouvfr/dsfr@1.11/dist/icons/

## Mise à jour

Pour mettre à jour ou ajouter des icônes :

```bash
cd themes/survey/dsfr

# Télécharger une nouvelle icône système
curl -sL "https://unpkg.com/@gouvfr/dsfr@1.11/dist/icons/system/nom-icone.svg" \
  -o icons/system/nom-icone.svg

# Copier aux 3 emplacements pour compatibilité
cp icons/system/nom-icone.svg dsfr-dist/icons/system/
cp icons/system/nom-icone.svg dsfr-dist/css/icons/system/
```

Ou utiliser le script `update-dsfr.sh` qui gère automatiquement la synchronisation.

## Utilisation dans le CSS

Les icônes sont référencées dans le CSS DSFR via des chemins relatifs :

```css
background-image: url("../icons/system/arrow-right-line.svg");
```

## Liste complète des icônes disponibles

Pour voir toutes les icônes DSFR disponibles :
- Documentation : https://www.systeme-de-design.gouv.fr/elements-d-interface/fondamentaux-de-l-identite-de-l-etat/iconographie
- Package : https://www.npmjs.com/package/@gouvfr/dsfr

## Icônes actuellement utilisées

| Icône | Usage | Où |
|-------|-------|-----|
| `arrow-left-line.svg` | Bouton "Précédent" | Navigation |
| `arrow-right-line.svg` | Bouton "Suivant" | Navigation |
| `close-line.svg` | Fermer modal/message | UI |
| `menu-fill.svg` | Menu hamburger mobile | Header |
| `external-link-line.svg` | Lien externe | Liens |
| `fr--warning-fill.svg` | Avertissement | Messages |
| `list-unordered.svg` | Liste à puces | Éditeur |

## Note importante

Ces icônes sont hébergées **localement** pour garantir :
- ✅ Autonomie du thème (pas de dépendance CDN)
- ✅ Performance (pas de requêtes externes)
- ✅ Conformité RGPD (pas de fuite de données vers des tiers)
- ✅ Fonctionnement hors ligne

**Ne pas supprimer ce dossier !**
