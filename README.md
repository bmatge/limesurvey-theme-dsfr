# Thème DSFR pour LimeSurvey

[![DSFR](https://img.shields.io/badge/DSFR-v1.11-blue)](https://www.systeme-de-design.gouv.fr/)
[![Conformité](https://img.shields.io/badge/Conformit%C3%A9%20DSFR-100%25-success)](docs/VERIFICATION_CONFORMITE_DSFR.md)
[![LimeSurvey](https://img.shields.io/badge/LimeSurvey-6.0+-green)](https://www.limesurvey.org/)

Thème LimeSurvey **100% conforme** au [Système de Design de l'État Français (DSFR)](https://www.systeme-de-design.gouv.fr/).

## ✨ Caractéristiques

- ✅ **100% conforme DSFR** - Aucune classe Bootstrap, uniquement DSFR
- ♿ **Accessibilité RGAA** optimisée avec composants DSFR natifs
- 🎨 **Mode clair/sombre** natif DSFR
- 📱 **Responsive** mobile-first (mobile, tablette, desktop)
- 🖨️ **Impression optimisée** avec styles dédiés
- 🔌 **Autonome** - Toutes les ressources DSFR locales (pas de CDN)
- 📚 **36 types de questions** supportés et testés

## 📦 Installation

### Prérequis
- LimeSurvey 6.0 ou supérieur
- Navigateur moderne (Chrome, Firefox, Edge, Safari)

### Étapes d'installation

1. **Copier le thème** dans votre installation LimeSurvey :
   ```bash
   cp -r dsfr /chemin/vers/limesurvey/themes/survey/
   ```

2. **Connectez-vous** à l'interface d'administration LimeSurvey

3. **Réinitialisez le thème** (important pour appliquer la configuration) :
   - Allez dans **Configuration** → **Thèmes**
   - Trouvez le thème "DSFR"
   - Cliquez sur l'icône **Réinitialiser** (↻)

4. **Activez le thème** pour votre enquête :
   - Paramètres de l'enquête → Onglet **Texte & Présentation**
   - Sélectionnez "DSFR" dans la liste des thèmes

5. **Videz les caches** :
   - Cache LimeSurvey (automatique après réinitialisation)
   - Cache navigateur (`Ctrl+Shift+R` ou `Cmd+Shift+R`)

## 🎛️ Configuration

Options configurables depuis l'interface admin LimeSurvey :

### Options générales
- Conteneur de l'enquête (on/off)
- Position de l'aide aux questions (haut/bas)
- Bouton "Tout effacer" (on/off)
- Logo personnalisé

### Options DSFR
- Variante du thème (clair/sombre par défaut)
- Afficher Marianne (logo République Française)
- Liens de pied de page

## 🏗️ Structure du Projet

```
dsfr/
├── config.xml                 # Configuration thème (packages, options, <remove> Bootstrap)
│
├── dsfr-dist/                 # Ressources DSFR v1.11 (locales, autonomes)
│   ├── css/
│   │   ├── dsfr.min.css      # Framework CSS DSFR
│   │   └── icons-embedded.min.css  # Icônes DSFR (base64)
│   ├── js/
│   │   ├── dsfr.module.min.js
│   │   └── dsfr.nomodule.min.js
│   └── fonts/                 # Marianne, Spectral
│
├── css/
│   ├── theme.css              # Styles DSFR principaux + compatibilité Bootstrap
│   ├── custom.css             # Personnalisations LimeSurvey
│   ├── dsfr-grid-helpers.css  # Helpers grille DSFR (20 utilitaires)
│   └── print_theme.css        # Styles impression
│
├── scripts/
│   ├── theme.js               # Initialisation DSFR, dark mode, modales
│   └── custom.js              # Scripts personnalisés
│
├── views/                     # Templates Twig
│   ├── layout_global.twig     # Layout principal
│   ├── layout_printanswers.twig
│   ├── subviews/
│   │   ├── header/            # Navigation, stepper
│   │   ├── footer/            # Footer, modales DSFR
│   │   ├── content/           # Contenu principal
│   │   ├── navigation/        # Boutons navigation
│   │   ├── messages/          # Alertes DSFR
│   │   ├── privacy/           # RGPD, cookies
│   │   └── printanswers/
│   │       ├── partials/
│   │       │   └── _question_header.twig  # Partial réutilisable
│   │       └── question_types/  # 32 templates printanswers DSFR
│   └── survey/
│       └── questions/
│           └── answer/        # Templates questions par type (36 types)
│               ├── multiplechoice/      # ✨ Nouveau (100% DSFR)
│               ├── multiplechoice_with_comments/
│               ├── listradio/
│               ├── arrays/
│               └── ...
│
├── files/                     # Assets (logos, images)
│   └── logo.png
│
└── docs/                      # Documentation complète
    ├── VERIFICATION_CONFORMITE_DSFR.md  # ✨ Rapport de conformité 100%
    ├── EPIC-100-PERCENT-DSFR-COMPLIANCE.md
    ├── RAPPORT-ANALYSE-COMPLETE-THEME-DSFR.md
    ├── DSFR_GRID_PATTERNS.md            # 9 patterns de grille
    ├── DSFR_INPUT_PATTERNS.md           # 10 patterns d'inputs
    └── archive/                          # Documentation historique
```

## 🔧 Éléments de Construction Essentiels

### 1. Configuration (config.xml)

Le fichier `config.xml` définit :
- **Remplacement CSS/JS** (`<replace>`) : theme.css, custom.css, scripts
- **Suppression Bootstrap** (`<remove>`) : Désactive template-core.css et awesome-bootstrap-checkbox
- **Packages** : pjax, moment
- **Options** : Variables configurables dans l'admin

### 2. Système CSS

**Ordre de chargement** :
1. `dsfr.min.css` (DSFR natif v1.11)
2. `icons-embedded.min.css` (icônes DSFR base64)
3. `dsfr-grid-helpers.css` (helpers custom)
4. `theme.css` (styles principaux + compatibilité Bootstrap)
5. `custom.css` (personnalisations)

**theme.css** contient :
- Imports DSFR (`@import url('../dsfr-dist/...')`)
- Styles compatibilité Bootstrap (pour le core LimeSurvey)
- Neutralisation awesome-bootstrap-checkbox (`label:not(.fr-label)::before/after`)
- Styles questions, validation, alertes

**custom.css** contient :
- Fixes layout spécifiques LimeSurvey
- Utilitaires manquants (d-flex, align-items-center)
- Styles ranking, sliders
- Responsive adjustments

### 3. Templates Twig

**Architecture** : Composition > Héritage
- Layouts de base : `layout_global.twig`, `layout_printanswers.twig`
- Subviews réutilisables : header, footer, navigation, messages
- Templates questions : Un par type de question (36 types)
- **Pattern** : `{% include %}` plutôt que `{% extends %}`

**Classes DSFR utilisées** :
- Grille : `fr-grid-row`, `fr-col-*`, `fr-col-md-*`, `fr-col-lg-*`
- Boutons : `fr-btn`, `fr-btn--secondary`, `fr-btn--lg`, `fr-btn--sm`
- Inputs : `fr-input`, `fr-input-group`, `fr-label`
- Checkboxes/Radios : `fr-checkbox-group`, `fr-checkbox-input`, `fr-radio-group`
- Alertes : `fr-alert`, `fr-alert--error`, `fr-alert--info`
- Navigation : `fr-stepper`, `fr-header`, `fr-footer`

### 4. JavaScript (theme.js)

**Fonctionnalités** :
- Initialisation DSFR (`window.dsfr.start()`)
- Dark mode toggle avec localStorage
- Conversion modales Bootstrap → Alertes DSFR
- Enhancement composants (boutons, inputs, questions)
- Gestion événements LimeSurvey

### 5. Système de Grille DSFR

**Breakpoints** :
- Mobile : < 576px
- Tablette : 576px - 768px
- Desktop : > 768px

**Helpers** (`dsfr-grid-helpers.css`) :
- Gutters : `fr-grid-row--gutters-sm/md/lg/xl`
- Alignements verticaux : `--middle`, `--bottom`, `--top`, `--stretch`
- Alignements horizontaux : `--left`, `--center`, `--right`, `--between`
- Offset responsive : `fr-col-offset-*`, `fr-col-offset-*--md/lg`

## 📚 Documentation

| Fichier | Description |
|---------|-------------|
| [VERIFICATION_CONFORMITE_DSFR.md](docs/VERIFICATION_CONFORMITE_DSFR.md) | ✨ Rapport conformité 100% DSFR |
| [EPIC-100-PERCENT-DSFR-COMPLIANCE.md](docs/EPIC-100-PERCENT-DSFR-COMPLIANCE.md) | Plan d'action 160h (2 287 lignes) |
| [RAPPORT-ANALYSE-COMPLETE-THEME-DSFR.md](docs/RAPPORT-ANALYSE-COMPLETE-THEME-DSFR.md) | Analyse exhaustive (1 336 lignes) |
| [DSFR_GRID_PATTERNS.md](docs/DSFR_GRID_PATTERNS.md) | 9 patterns de grille avec exemples |
| [DSFR_INPUT_PATTERNS.md](docs/DSFR_INPUT_PATTERNS.md) | 10 patterns d'inputs avec exemples |
| [dsfr-dist/README.md](dsfr-dist/README.md) | Mise à jour ressources DSFR |

## 🧪 Tests

Un questionnaire de test complet avec tous les types de questions est disponible :
- **Fichier** : `test_dsfr_all_question_types.lss`
- **Types testés** : 36 types de questions
- **Couverture** : 100% des composants DSFR

## 🆕 Changelog

### Version 1.0.4 (2025-01-17) - Conformité 100% DSFR

**🎯 Objectif atteint : 100% conforme DSFR**

**✨ Nouveautés**
- Templates multiplechoice DSFR natifs (type M)
- Système de grille unifié (dsfr-grid-helpers.css)
- Documentation complète (5 guides)
- Suppression Bootstrap via config.xml

**🔧 Corrections**
- Checkboxes : DSFR natif (plus de hack visibility)
- 32 templates printanswers découplés
- Classes Bootstrap résiduelles supprimées (68 occurrences)
- Code mort supprimé (2.5 MB)

**📊 Statistiques**
- 93 fichiers modifiés
- +5 147 lignes (docs + code + helpers)
- -1 433 lignes (code mort + simplification)
- 12 commits structurés

Voir [VERIFICATION_CONFORMITE_DSFR.md](docs/VERIFICATION_CONFORMITE_DSFR.md) pour le détail complet.

## 📝 Licence

[Licence Ouverte v2.0 (Etalab)](https://www.etalab.gouv.fr/licence-ouverte-open-licence/)

Ce projet utilise le Design System de l'État Français (DSFR) développé par le Service d'Information du Gouvernement (SIG).

## 👤 Auteur

**Bertrand Matge**
- Email: bertrand.matge@finances.gouv.fr
- GitHub: [@bmatge](https://github.com/bmatge)

## 🔗 Ressources

- [Système de Design de l'État (DSFR)](https://www.systeme-de-design.gouv.fr/)
- [LimeSurvey Manual](https://manual.limesurvey.org/)
- [Guide des thèmes LimeSurvey](https://manual.limesurvey.org/Themes)
- [RGAA - Référentiel Général d'Amélioration de l'Accessibilité](https://accessibilite.numerique.gouv.fr/)
