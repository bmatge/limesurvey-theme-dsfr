# Thème DSFR pour LimeSurvey

Thème LimeSurvey conforme au [Système de Design de l'État Français (DSFR)](https://www.systeme-de-design.gouv.fr/).

## Description

Ce thème permet de créer des enquêtes LimeSurvey respectant les standards du DSFR, incluant :

- Design conforme aux normes de l'État français
- Accessibilité RGAA optimisée
- Mode clair/sombre
- Affichage responsive (mobile, tablette, desktop)
- Support complet des types de questions LimeSurvey
- Styles d'impression optimisés

## Pré-requis

- LimeSurvey 6.0 ou supérieur
- Navigateur moderne supportant le DSFR

## Installation

### Méthode 1 : Installation manuelle

1. Téléchargez ce repository (via Git ou ZIP)
2. Copiez le dossier complet dans le répertoire des thèmes de votre installation LimeSurvey :
   ```
   /chemin/vers/limesurvey/themes/survey/dsfr/
   ```
3. Connectez-vous à l'interface d'administration LimeSurvey
4. Allez dans **Configuration** → **Thèmes**
5. Le thème "DSFR" devrait apparaître dans la liste
6. Activez-le pour votre enquête

### Méthode 2 : Installation via Git

```bash
cd /chemin/vers/limesurvey/themes/survey/
git clone https://github.com/bmatge/limesurvey-theme-dsfr.git dsfr
```

## Configuration

Le thème propose plusieurs options configurables depuis l'interface d'administration LimeSurvey :

### Options générales
- **Conteneur de l'enquête** : Activer/désactiver le conteneur
- **Affichage des popups** : Popup, sur la page, ou désactivé
- **Bouton "Tout effacer"** : Afficher ou masquer
- **Position de l'aide** : Haut ou bas
- **Logo de marque** : Afficher et personnaliser le logo

### Options DSFR
- **Afficher Marianne** : Logo officiel République Française
- **Liens de pied de page** : Activer/désactiver

## Mode clair/sombre

Le thème DSFR supporte nativement le mode clair et le mode sombre, conforme aux spécifications du DSFR.

### Sélecteur de thème

Un bouton de basculement clair/sombre est disponible dans l'en-tête de chaque enquête :
- 🖥️ **Desktop** : Icône dans les liens rapides à côté du sélecteur de langue
- 📱 **Mobile** : Bouton dans le menu hamburger


## Types de questions supportés

Le thème supporte tous les types de questions LimeSurvey. Voir [QUESTION_TYPES_COMPATIBILITY.md](QUESTION_TYPES_COMPATIBILITY.md) pour la liste complète et les détails d'implémentation.

Types testés et validés :
- Questions à choix unique et multiple
- Questions matricielles
- Questions textuelles (courtes et longues)
- Questions numériques
- Questions oui/non
- Échelles de Likert
- Et bien d'autres...

## Fichier de test

Un fichier de test complet est fourni : [test_dsfr_all_question_types.lss](test_dsfr_all_question_types.lss)

## Ressources DSFR locales (autonomie complète)

Toutes les ressources DSFR (CSS, JavaScript, fonts, icônes) sont hébergées localement dans le dossier `dsfr-dist/`. 

Documentation complète : [dsfr-dist/README.md](dsfr-dist/README.md)

## Structure du projet

```
dsfr/
├── config.xml              # Configuration du thème
├── dsfr-dist/             # 🆕 Ressources DSFR locales (autonomie complète)
│   ├── css/               # CSS DSFR (dsfr.min.css, icons.min.css)
│   ├── js/                # JavaScript DSFR (module et nomodule)
│   ├── fonts/             # Fonts Marianne et Spectral
│   └── README.md          # Documentation de mise à jour
├── css/                    # Styles CSS du thème
│   ├── theme.css          # Styles principaux DSFR
│   ├── custom.css         # Personnalisations
│   └── print_theme.css    # Styles d'impression
├── scripts/               # JavaScript
│   ├── theme.js           # Scripts principaux
│   └── custom.js          # Scripts personnalisés
├── views/                 # Templates Twig
│   ├── layout_*.twig      # Layouts principaux
│   └── subviews/          # Composants réutilisables
├── survey/                # Templates de questions
│   └── questions/
│       └── answer/        # Réponses par type de question
├── files/                 # Assets (logos, images)
└── docs/                  # Documentation
```


## Licence

Etalab 2.0

## Auteur

**Bertrand Matge**
- GitHub: [@bmatge](https://github.com/bmatge)

## Ressources

- [Documentation DSFR](https://www.systeme-de-design.gouv.fr/)
- [LimeSurvey Manual](https://manual.limesurvey.org/)
- [Guide des thèmes LimeSurvey](https://manual.limesurvey.org/Themes)
