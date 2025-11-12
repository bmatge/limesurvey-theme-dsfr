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
- **Variante du thème** : Clair ou sombre
- **Afficher Marianne** : Logo officiel République Française
- **Liens de pied de page** : Activer/désactiver

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

Pour l'utiliser :
1. Importez ce fichier dans LimeSurvey (**Enquêtes** → **Créer, importer ou copier une enquête**)
2. Activez le thème DSFR pour cette enquête
3. Testez tous les types de questions

Instructions détaillées : [CREATE_TEST_SURVEY.md](CREATE_TEST_SURVEY.md)

## Documentation

La documentation complète est disponible dans le dossier [docs/](docs/) :

- [Architecture et décisions techniques](docs/ARCHITECTURE-DECISION.md)
- [Statut du projet](docs/STATUS.md)
- [Guide de test](docs/TESTING.md)
- [Migration Bootstrap vers DSFR](MIGRATION_BOOTSTRAP_TO_DSFR.md)
- [Problèmes connus](docs/KNOWN-ISSUES.md)

## Structure du projet

```
dsfr/
├── config.xml              # Configuration du thème
├── css/                    # Styles CSS
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

## Développement

### Prérequis développement

- Node.js et npm (pour les outils de développement)
- Connaissance du système DSFR
- Connaissance de Twig (moteur de templates LimeSurvey)

### Configuration de l'environnement

```bash
# Installer les dépendances (si nécessaire)
npm install

# Le thème utilise :
# - Prettier pour le formatage
# - Stylelint pour la validation CSS
# - EditorConfig pour la cohérence de style
```

### Contribuer

Les contributions sont les bienvenues ! Merci de :

1. Fork le projet
2. Créer une branche pour votre fonctionnalité (`git checkout -b feature/AmazingFeature`)
3. Committer vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Pusher vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## Migration depuis Bootstrap

Si vous avez un thème Bootstrap existant, consultez [MIGRATION_BOOTSTRAP_TO_DSFR.md](MIGRATION_BOOTSTRAP_TO_DSFR.md) pour les instructions de migration.

## Licence

GNU General Public License version 2 or later

## Auteur

**Bertrand Matge**
- GitHub: [@bmatge](https://github.com/bmatge)

## Ressources

- [Documentation DSFR](https://www.systeme-de-design.gouv.fr/)
- [LimeSurvey Manual](https://manual.limesurvey.org/)
- [Guide des thèmes LimeSurvey](https://manual.limesurvey.org/Themes)

## Changelog

### Version 1.0.1 (2025-11-07)
- Migration complète Bootstrap → DSFR
- Support de tous les types de questions
- Styles d'impression optimisés
- Documentation complète
- Fichier de test avec tous les types de questions

---

**Note** : Ce thème est indépendant et n'est pas officiellement affilié au DSFR ou à l'État français. Il respecte les standards du DSFR pour faciliter la création d'enquêtes conformes aux normes gouvernementales françaises.
