# Audit du thème sombre - DSFR LimeSurvey

**Date**: 2025-11-16
**Issue GitHub**: #3
**Status**: 🔴 **186 couleurs codées en dur détectées**

## Résumé exécutif

Le thème DSFR actuel n'est **pas compatible** avec le mode sombre. Une analyse automatique révèle **186 occurrences** de couleurs codées en dur dans `css/theme.css`, rendant le thème illisible sur les systèmes configurés en mode sombre.

## Problèmes identifiés

### 1. Variables CSS personnalisées non compatibles mode sombre

**Fichier**: `css/theme.css` lignes 35-50

```css
:root {
    /* Couleurs DSFR */
    --blue-france: #000091;
    --red-marianne: #E1000F;
    --grey-main: #3A3A3A;
    --grey-light: #F6F6F6;      /* ❌ Problème: gris clair en mode sombre */
    --grey-medium: #DDDDDD;     /* ❌ Problème: gris clair en mode sombre */

    /* Espacements */
    --sp-1: 0.25rem;
    /* ... */
}
```

**Impact**: Ces variables sont utilisées partout et ne s'adaptent pas au mode sombre.

**Solution**: Utiliser les variables CSS DSFR officielles qui supportent le mode sombre.

### 2. Backgrounds blancs codés en dur

#### Lignes 63, 138, 146, 153-162, 175, 342, 988, 1144

```css
.bg-light {
    background-color: #FFFFFF !important;  /* ❌ */
}

html {
    background-color: #FFFFFF;  /* ❌ */
}

body {
    background-color: #FFFFFF !important;  /* ❌ */
}

body > article {
    background-color: #FFFFFF !important;  /* ❌ */
}

#outerframeContainer,
.outerframe,
.ls-survey-container,
.survey-question-container {
    background-color: #FFFFFF !important;  /* ❌ */
}

#survey-nav.navbar {
    background-color: #FFFFFF !important;  /* ❌ */
}

.question-container,
.ls-question,
.question-wrapper {
    background-color: #FFFFFF;  /* ❌ */
}
```

**Impact**: Fond blanc aveuglant en mode sombre, texte noir illisible.

**Solution**: Remplacer par `var(--background-default-grey)` ou `var(--background-raised-grey)` du DSFR.

### 3. Backgrounds gris codés en dur

#### Lignes 105, 121, 268, 441, 482, 536, 568

```css
.form-control {
    background-color: #EEEEEE !important;  /* ❌ */
}

input[type="text"],
textarea {
    background-color: #EEEEEE;  /* ❌ */
}

input:focus,
textarea:focus {
    background-color: #EEEEEE !important;  /* ❌ */
}

select {
    background-color: #EEEEEE;  /* ❌ */
}
```

**Impact**: Champs de formulaire illisibles en mode sombre.

**Solution**: Utiliser `var(--background-contrast-grey)` du DSFR.

### 4. Couleurs de texte codées en dur

#### Lignes 145, 229, 253, 354, 449, 550

```css
body {
    color: #161616;  /* ❌ */
}

#survey-nav .navbar-nav .nav-link {
    color: #161616 !important;  /* ❌ */
}

.question-text {
    color: #161616;  /* ❌ */
}

input, textarea, select {
    color: #161616;  /* ❌ */
}
```

**Impact**: Texte noir invisible sur fond sombre.

**Solution**: Utiliser `var(--text-default-grey)` du DSFR.

### 5. Bordures codées en dur

#### Lignes 176, 245, 290, 446, 547, 1294, 1301, etc.

```css
#survey-nav.navbar {
    border-bottom: 1px solid #DDDDDD !important;  /* ❌ */
}

.dropdown-menu {
    border: 1px solid #DDDDDD;  /* ❌ */
}

.progress {
    background-color: #E3E3E3;  /* ❌ */
}

input, textarea {
    box-shadow: inset 0 -2px 0 0 #3A3A3A;  /* ❌ */
}

table {
    border: 1px solid var(--border-default-grey, #ddd);  /* ⚠️ Fallback problématique */
}
```

**Impact**: Bordures invisibles ou trop contrastées en mode sombre.

**Solution**: Utiliser `var(--border-default-grey)` sans fallback hex.

### 6. Alertes et messages

#### Lignes 906-931

```css
.alert-info {
    background-color: #E8EDFF;  /* ❌ */
    border-left-color: #0063CB;  /* ❌ */
    color: #0063CB;  /* ❌ */
}

.alert-success {
    background-color: #B8FEC9;  /* ❌ */
    border-left-color: #18753C;  /* ❌ */
    color: #18753C;  /* ❌ */
}

.alert-warning {
    background-color: #FFE9E6;  /* ❌ */
    border-left-color: #B34000;  /* ❌ */
    color: #B34000;  /* ❌ */
}

.alert-error {
    background-color: #FFE9E9;  /* ❌ */
    border-left-color: #CE0500;  /* ❌ */
    color: #CE0500;  /* ❌ */
}
```

**Impact**: Messages illisibles en mode sombre.

**Solution**: Utiliser les variables DSFR pour les alertes.

### 7. Tableaux

#### Lignes 1137-1144, 1309-1310, 1340, 1356-1358, 1363

```css
.fr-table--bordered table tbody tr.ls-odd td {
    background-color: var(--background-alt-grey, #f6f6f6) !important;  /* ⚠️ */
}

.fr-table--bordered table tbody tr.ls-even td {
    background-color: #ffffff !important;  /* ❌ */
}

table thead th {
    background-color: var(--background-contrast-grey, #f6f6f6);  /* ⚠️ */
}

table tbody tr {
    background-color: #ffffff;  /* ❌ */
}

table tbody tr:hover {
    background-color: var(--background-contrast-blue-france, #e3e3fd);  /* ⚠️ */
}
```

**Impact**: Tableaux illisibles avec alternance invisible en mode sombre.

**Solution**: Utiliser uniquement les variables DSFR sans fallback.

### 8. Footer

#### Lignes 979, 988

```css
.survey-footer {
    background-color: #F6F6F6;  /* ❌ */
    border-top: 1px solid #DDDDDD;  /* ❌ */
}

footer.fr-footer,
.fr-footer {
    background-color: #FFFFFF !important;  /* ❌ */
}
```

**Impact**: Footer illisible en mode sombre.

**Solution**: Variables DSFR pour backgrounds et bordures.

## Variables DSFR officielles à utiliser

Le DSFR fournit des variables CSS qui s'adaptent automatiquement au mode sombre :

### Backgrounds
- `--background-default-grey` - Fond par défaut (blanc → noir)
- `--background-alt-grey` - Fond alternatif (gris clair → gris foncé)
- `--background-contrast-grey` - Fond contrasté
- `--background-raised-grey` - Fond élevé (cartes)
- `--background-contrast-blue-france` - Fond bleu clair

### Texte
- `--text-default-grey` - Texte par défaut (noir → blanc)
- `--text-label-grey` - Labels
- `--text-mention-grey` - Mentions secondaires
- `--text-title-grey` - Titres

### Bordures
- `--border-default-grey` - Bordure par défaut
- `--border-plain-grey` - Bordure pleine

### Actions (boutons)
- `--background-action-high-blue-france` - Fond bouton primaire
- `--text-action-high-blue-france` - Texte bouton primaire

## Plan de correction

### Phase 1: Refactorisation variables (Priorité 🔴 Haute)

1. Supprimer les variables personnalisées dans `:root`
2. Remplacer toutes les occurrences de `#FFFFFF` par `var(--background-default-grey)`
3. Remplacer toutes les occurrences de `#F6F6F6`, `#EEEEEE` par `var(--background-alt-grey)`
4. Remplacer toutes les occurrences de `#161616`, `#3A3A3A` (texte) par `var(--text-default-grey)`
5. Remplacer toutes les occurrences de `#DDDDDD`, `#E3E3E3` (bordures) par `var(--border-default-grey)`

### Phase 2: Composants spécifiques (Priorité 🟠 Moyenne)

1. Refactoriser les alertes (`.alert-*`)
2. Refactoriser les tableaux (`.fr-table`)
3. Refactoriser les messages de validation
4. Refactoriser le footer

### Phase 3: Sélecteur de thème (Priorité 🟢 Basse)

1. Implémenter le bouton de basculement clair/sombre DSFR
2. Ajouter la détection de préférence système (`prefers-color-scheme`)
3. Implémenter la persistance localStorage
4. Tester sur tous les types de questions

## Statistiques

- **Total de couleurs codées en dur**: 186
- **Fichiers affectés**: 2 (`css/theme.css`, `css/custom.css`)
- **Temps estimé de correction**: 4-6 heures
- **Impact utilisateur**: 🔴 **Critique** - Thème inutilisable en mode sombre

## Ressources

- [DSFR - Design Tokens](https://www.systeme-de-design.gouv.fr/fondamentaux-techniques/design-tokens)
- [DSFR - Couleurs](https://www.systeme-de-design.gouv.fr/composants-et-modeles/fondamentaux-techniques/couleurs)
- [DSFR - Thèmes](https://www.systeme-de-design.gouv.fr/composants-et-modeles/fondamentaux-techniques/themes)
