# Tableaux Responsive DSFR - Documentation

Ce document explique le système de tableaux responsive 100% conforme DSFR implémenté dans le thème LimeSurvey DSFR.

## Table des matières

1. [Vue d'ensemble](#vue-densemble)
2. [Structure HTML](#structure-html)
3. [Comportement responsive](#comportement-responsive)
4. [Labels de colonnes sur mobile](#labels-de-colonnes-sur-mobile)
5. [Classes DSFR utilisées](#classes-dsfr-utilisées)
6. [Exemples](#exemples)
7. [Migration depuis Bootstrap](#migration-depuis-bootstrap)

---

## Vue d'ensemble

Le système de tableaux responsive transforme automatiquement les tableaux en **cartes empilées** sur mobile (< 768px), tout en préservant les **labels de colonnes** grâce à la classe `.ls-label-xs-visibility`.

Le système fonctionne avec **tous les types de tableaux** :
- ✅ Tableaux DSFR (`fr-table`, `fr-table--bordered`)
- ✅ Tableaux Bootstrap (`table`, `radio-array`, `questions-list`)
- ✅ Tous les types de questions array LimeSurvey

### Avantages

- ✅ 100% conforme DSFR
- ✅ Accessible (RGAA)
- ✅ Labels de colonnes visibles sur mobile
- ✅ Transformation automatique desktop → mobile
- ✅ Pas de JavaScript requis (pure CSS)
- ✅ Compatible Bootstrap ET DSFR

---

## Structure HTML

### Tableau standard (questions array)

```html
<div class="ls-table-wrapper fr-table--responsive" role="group" aria-labelledby="ls-question-text-ID">
    <table class="fr-table fr-table--bordered" aria-labelledby="ls-question-text-ID">
        <thead>
            <tr class="ls-heading">
                <th>En-tête colonne 1</th>
                <th>En-tête colonne 2</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <th>Label de ligne</th>
                <td>
                    <input type="radio" id="radio-1" name="choice" value="1">
                    <label for="radio-1" class="ls-label-xs-visibility" aria-hidden="true">
                        En-tête colonne 2
                    </label>
                </td>
            </tr>
        </tbody>
    </table>
</div>
```

### Tableau printanswers

```html
<div class="fr-table--responsive">
    <table class="fr-table fr-table--bordered">
        <thead>
            <tr>
                <th>Question</th>
                <th>Réponse</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Question 1</td>
                <td>Réponse 1</td>
            </tr>
        </tbody>
    </table>
</div>
```

### Tableau Bootstrap (legacy - linéarisé automatiquement)

```html
<table class="table table-bordered table-hover radio-array">
    <thead>
        <tr>
            <th>En-tête 1</th>
            <th>En-tête 2</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <th>Label de ligne</th>
            <td>
                <input type="radio" id="radio-1" name="choice" value="1">
                <label for="radio-1" class="ls-label-xs-visibility">
                    En-tête 2
                </label>
            </td>
        </tr>
    </tbody>
</table>
```

**Note** : Les tableaux Bootstrap sont automatiquement linéarisés sur mobile grâce aux sélecteurs CSS étendus. Pas besoin de wrapper `.fr-table--responsive` pour les tableaux générés par LimeSurvey.

---

## Comportement responsive

### Desktop (≥ 768px)

- Tableau affiché normalement en grille
- Labels `.ls-label-xs-visibility` cachés (position: absolute; left: -10000px)
- Colonnes visibles selon la structure `<thead>`

### Mobile (< 768px)

- Tableau transformé en **cartes empilées**
- `<thead>` complètement caché
- Chaque `<tr>` devient une carte avec :
  - Bordure grise
  - Background gris clair
  - Padding 1rem
  - Border-radius 0.25rem
  - Margin-bottom 1.5rem
- Labels `.ls-label-xs-visibility` **affichés** au-dessus de chaque input/radio
- Cellules empilées verticalement

---

## Labels de colonnes sur mobile

### Principe

La classe `.ls-label-xs-visibility` permet d'afficher les intitulés des colonnes sur mobile quand le tableau se linéarise.

### CSS Desktop (≥ 768px)

```css
@media (min-width: 768px) {
    table .ls-label-xs-visibility {
        position: absolute;
        left: -10000px;
        width: 1px;
        height: 1px;
        overflow: hidden;
    }
}
```

### CSS Mobile (< 768px)

```css
@media (max-width: 767px) {
    .ls-label-xs-visibility {
        display: inline-block !important;
        position: static !important;
        width: auto !important;
        height: auto !important;
        overflow: visible !important;
        /* Style DSFR */
        font-size: 0.875rem !important;
        line-height: 1.5rem !important;
        font-weight: 700 !important;
        color: var(--text-label-grey, #161616) !important;
        vertical-align: top !important;
        /* Alignement avec input */
        margin-left: 0.5rem !important;
        margin-bottom: 0.5rem !important;
        margin-top: 0 !important;
        /* Wrapping du texte long */
        max-width: calc(100% - 2.5rem) !important;
    }

    /* Radio/checkbox alignés avec leur label */
    .fr-table table tbody tr td input[type="radio"],
    .fr-table table tbody tr td input[type="checkbox"],
    table.radio-array tbody tr td input[type="radio"],
    table.questions-list tbody tr td input[type="radio"],
    table.table tbody tr td input[type="radio"] {
        display: inline-block !important;
        vertical-align: top !important;
        margin-right: 0 !important;
        margin-top: 0.125rem !important;
    }
}
```

**Note** : Les sélecteurs sont étendus pour cibler à la fois les tableaux DSFR (`.fr-table`) et les tableaux Bootstrap (`.table`, `.radio-array`, `.questions-list`). Cela permet une **linéarisation universelle** de tous les tableaux sur mobile.

### Exemple d'utilisation

```html
<td class="answer_cell_A1">
    <input type="radio" name="Q1" value="A1" id="answer-Q1-A1">
    <label for="answer-Q1-A1" class="ls-label-xs-visibility" aria-hidden="true">
        Option de réponse A1
    </label>
</td>
```

**Résultat sur mobile** :
```
┌─────────────────────────┐
│ [Label de ligne]        │
│                         │
│ ○ Option de réponse A1  │ ← Radio + Label sur même ligne
│ ○ Option de réponse A2  │
│ ○ Option longue qui     │
│   wrappe sur plusieurs  │
│   lignes si nécessaire  │
└─────────────────────────┘
```

---

## Classes DSFR utilisées

### Conteneur

- `.fr-table--responsive` : Wrapper responsive du tableau

### Table

- `.fr-table` : Classe de base DSFR pour tableaux
- `.fr-table--bordered` : Tableaux avec bordures

### Éléments sémantiques

- `<thead>` : En-têtes de colonnes (caché sur mobile)
- `<tbody>` : Corps du tableau
- `<th>` : En-têtes de lignes (mis en évidence)
- `<td>` : Cellules de données

### Classes LimeSurvey

- `.ls-heading` : Ligne d'en-tête
- `.ls-odd` / `.ls-even` : Alternance de couleur (rayures)
- `.ls-label-xs-visibility` : Labels de colonnes pour mobile
- `.answer_cell_*` : Cellules de réponse

### Classes Bootstrap (supportées)

- `.table` : Classe de base Bootstrap (linéarisée sur mobile)
- `.table-bordered` : Bordures Bootstrap
- `.table-hover` : Effet hover Bootstrap
- `.radio-array` : Tableaux de radios LimeSurvey
- `.questions-list` : Listes de questions LimeSurvey
- `.table-5-point-array`, `.table-10-point-array` : Tableaux de points

---

## Exemples

### Exemple 1 : Tableau simple (5 points)

**Desktop** :
```
┌──────────────┬─────┬─────┬─────┬─────┬─────┐
│              │  1  │  2  │  3  │  4  │  5  │
├──────────────┼─────┼─────┼─────┼─────┼─────┤
│ Sous-Q 1     │  ○  │  ○  │  ○  │  ○  │  ○  │
│ Sous-Q 2     │  ○  │  ○  │  ○  │  ○  │  ○  │
└──────────────┴─────┴─────┴─────┴─────┴─────┘
```

**Mobile** :
```
┌─────────────────────────┐
│ Sous-Q 1                │
│                         │
│ ○ 1                     │
│ ○ 2                     │
│ ○ 3                     │
│ ○ 4                     │
│ ○ 5                     │
└─────────────────────────┘
┌─────────────────────────┐
│ Sous-Q 2                │
│ ○ 1                     │
│ ○ 2                     │
│ ...                     │
└─────────────────────────┘
```

### Exemple 2 : Tableau textes

**Desktop** :
```
┌──────────────┬─────────────┬─────────────┐
│              │  Colonne 1  │  Colonne 2  │
├──────────────┼─────────────┼─────────────┤
│ Ligne 1      │ [________]  │ [________]  │
│ Ligne 2      │ [________]  │ [________]  │
└──────────────┴─────────────┴─────────────┘
```

**Mobile** :
```
┌─────────────────────────┐
│ Ligne 1                 │
│                         │
│ Colonne 1               │
│ [__________________]    │
│                         │
│ Colonne 2               │
│ [__________________]    │
└─────────────────────────┘
```

### Exemple 3 : Tableau double échelle

**Desktop** :
```
┌──────────────┬────────────┬────────────┐
│              │ Échelle 1  │ Échelle 2  │
├──────────────┼────────────┼────────────┤
│ Question 1   │ Réponse 1  │ Réponse 2  │
└──────────────┴────────────┴────────────┘
```

**Mobile** : Même principe de linéarisation en cartes.

---

## Migration depuis Bootstrap

### Classes à remplacer

| Bootstrap                          | DSFR                           |
|------------------------------------|--------------------------------|
| `table`                            | `fr-table`                     |
| `table-bordered`                   | `fr-table--bordered`           |
| `table-striped`                    | (géré par `.ls-odd/.ls-even`)  |
| `table-condensed`                  | (pas d'équivalent, spacing par défaut OK) |
| `table-responsive`                 | `.fr-table--responsive`        |
| `text-center`                      | Style inline ou `.text-center` (alias ajouté) |

### Étapes de migration

1. **Remplacer les classes de table** :
   ```html
   <!-- Avant -->
   <table class="table table-condensed table-striped">

   <!-- Après -->
   <table class="fr-table fr-table--bordered">
   ```

2. **Ajouter le wrapper responsive** :
   ```html
   <div class="fr-table--responsive">
       <table class="fr-table fr-table--bordered">
           ...
       </table>
   </div>
   ```

3. **Structurer avec thead/tbody** :
   ```html
   <table class="fr-table fr-table--bordered">
       <thead>
           <tr>
               <th>En-tête 1</th>
               <th>En-tête 2</th>
           </tr>
       </thead>
       <tbody>
           <tr>
               <td>Cellule 1</td>
               <td>Cellule 2</td>
           </tr>
       </tbody>
   </table>
   ```

4. **Remplacer text-center** :
   ```html
   <!-- Avant -->
   <th class="text-center">En-tête</th>

   <!-- Après (style inline ou classe) -->
   <th style="text-align: center;">En-tête</th>
   <!-- ou -->
   <th class="text-center">En-tête</th>
   ```

5. **Utiliser <strong> au lieu de <b>** :
   ```html
   <!-- Avant -->
   <th><b>En-tête</b></th>

   <!-- Après -->
   <th><strong>En-tête</strong></th>
   ```

---

## Fichiers modifiés

### CSS

- [themes/survey/dsfr/css/theme.css](../css/theme.css) - Lignes 1299-1410
  - Styles responsive des tableaux
  - Gestion `.ls-label-xs-visibility`
  - Linéarisation mobile

- [themes/survey/dsfr/css/custom.css](../css/custom.css) - Lignes 130-140
  - Masquage desktop des labels
  - Alias `.text-center`

### Templates migrés

#### Printanswers (3 fichiers)

- [template_array-multi-flexi.twig](../views/subviews/printanswers/question_types/template_array-multi-flexi.twig)
- [template_array-multi-flexi-text.twig](../views/subviews/printanswers/question_types/template_array-multi-flexi-text.twig)
- [template_array-flexible-dual-scale.twig](../views/subviews/printanswers/question_types/template_array-flexible-dual-scale.twig)

#### Templates array (déjà DSFR)

- [arrays/array/no_dropdown/answer.twig](../views/survey/questions/answer/arrays/array/no_dropdown/answer.twig)
- [arrays/texts/answer.twig](../views/survey/questions/answer/arrays/texts/answer.twig)
- [arrays/multiflexi/answer.twig](../views/survey/questions/answer/arrays/multiflexi/answer.twig)
- Et tous les autres templates array

---

## Bonnes pratiques

1. **Toujours utiliser le wrapper** `.fr-table--responsive`
2. **Structurer correctement** avec `<thead>` et `<tbody>`
3. **Ajouter les labels mobiles** `.ls-label-xs-visibility` dans chaque cellule interactive
4. **Utiliser les classes DSFR natives** au lieu de Bootstrap
5. **Tester le responsive** sur mobile (< 768px)
6. **Vérifier l'accessibilité** avec `aria-labelledby` et `role="group"`

---

## Références

- [Documentation DSFR - Tableaux](https://www.systeme-de-design.gouv.fr/composants-et-modeles/composants/tableau)
- [DSFR Grid Patterns](./DSFR_GRID_PATTERNS.md)
- [EPIC 100% DSFR Compliance](./EPIC-100-PERCENT-DSFR-COMPLIANCE.md)

---

**Version** : 1.0.0
**Date** : 2025-11-18
**Auteur** : Claude Code
