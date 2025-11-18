# Patterns de Grille DSFR

Ce document présente les patterns de grille DSFR recommandés pour le thème LimeSurvey DSFR. Ces patterns garantissent une conformité totale avec le Design System de l'État Français et un comportement responsive optimal.

## Table des matières

1. [Système de grille de base](#système-de-grille-de-base)
2. [Patterns courants](#patterns-courants)
3. [Helpers disponibles](#helpers-disponibles)
4. [Exemples d'utilisation](#exemples-dutilisation)

---

## Système de grille de base

Le système de grille DSFR utilise un système à **12 colonnes** avec des breakpoints responsive :

- `fr-col-{n}` : Mobile (toutes les tailles)
- `fr-col-sm-{n}` : Tablette portrait (≥576px)
- `fr-col-md-{n}` : Tablette paysage (≥768px)
- `fr-col-lg-{n}` : Desktop (≥992px)
- `fr-col-xl-{n}` : Large desktop (≥1248px)

---

## Patterns courants

### Pattern 1 : 2 colonnes égales

```twig
<div class="fr-grid-row fr-grid-row--gutters">
    <div class="fr-col-12 fr-col-md-6">
        Colonne 1
    </div>
    <div class="fr-col-12 fr-col-md-6">
        Colonne 2
    </div>
</div>
```

**Usage** : Formulaires, comparaisons, layouts symétriques

---

### Pattern 2 : 3 colonnes égales

```twig
<div class="fr-grid-row fr-grid-row--gutters">
    <div class="fr-col-12 fr-col-md-4">
        Colonne 1
    </div>
    <div class="fr-col-12 fr-col-md-4">
        Colonne 2
    </div>
    <div class="fr-col-12 fr-col-md-4">
        Colonne 3
    </div>
</div>
```

**Usage** : Grilles de cartes, dashboards

---

### Pattern 3 : 2/3 - 1/3 (Sidebar)

```twig
<div class="fr-grid-row fr-grid-row--gutters">
    <div class="fr-col-12 fr-col-md-8">
        Contenu principal (8/12 = 2/3)
    </div>
    <div class="fr-col-12 fr-col-md-4">
        Sidebar (4/12 = 1/3)
    </div>
</div>
```

**Usage** : Pages avec sidebar, help text à côté de formulaires

---

### Pattern 4 : Centrage horizontal

```twig
<div class="fr-grid-row fr-grid-row--center">
    <div class="fr-col-12 fr-col-md-8 fr-col-lg-6">
        Contenu centré
    </div>
</div>
```

**Usage** : Formulaires centrés, contenu éditorial

---

### Pattern 5 : Alignement vertical au centre

```twig
<div class="fr-grid-row fr-grid-row--gutters fr-grid-row--middle">
    <div class="fr-col-auto">
        <i class="fr-icon-information-line" aria-hidden="true"></i>
    </div>
    <div class="fr-col">
        Texte aligné verticalement avec l'icône
    </div>
</div>
```

**Usage** : Icônes + texte, boutons + labels

---

### Pattern 6 : Espacement entre éléments

```twig
<div class="fr-grid-row fr-grid-row--gutters fr-grid-row--between">
    <div class="fr-col-auto">
        Label
    </div>
    <div class="fr-col-auto">
        Valeur
    </div>
</div>
```

**Usage** : Key-value pairs, navigation

---

### Pattern 7 : Grille responsive 4 colonnes

```twig
<div class="fr-grid-row fr-grid-row--gutters">
    {% for item in items %}
        <div class="fr-col-12 fr-col-sm-6 fr-col-md-4 fr-col-lg-3">
            {{ item }}
        </div>
    {% endfor %}
</div>
```

**Usage** : Galeries, listes de produits/services

**Responsive** :
- Mobile : 1 colonne (fr-col-12)
- Tablette portrait : 2 colonnes (fr-col-sm-6)
- Tablette paysage : 3 colonnes (fr-col-md-4)
- Desktop : 4 colonnes (fr-col-lg-3)

---

### Pattern 8 : PrintAnswers (utilisé dans le thème)

```twig
<div class="fr-grid-row question-container-printanswers" style="page-break-inside:avoid;">
    <div class="fr-col-md-4">
        <b>Question (ID)</b><br/>
        <small>Type: (type/class)</small>
    </div>
    <div class="fr-col-lg-8">
        Réponse
    </div>
</div>
```

**Usage** : Templates printanswers, affichage de questions/réponses

---

### Pattern 9 : Formulaire avec labels à gauche

```twig
<div class="fr-grid-row fr-grid-row--gutters fr-grid-row--middle">
    <div class="fr-col-12 fr-col-md-4 fr-text-right">
        <label for="input-id" class="fr-label">Label :</label>
    </div>
    <div class="fr-col-12 fr-col-md-8">
        <input type="text" id="input-id" class="fr-input" />
    </div>
</div>
```

**Usage** : Formulaires horizontaux

---

## Helpers disponibles

Voir le fichier `css/dsfr-grid-helpers.css` pour la liste complète. Principaux helpers :

### Gutters
- `.fr-grid-row--gutters-sm` : Espacement réduit (0.5rem)
- `.fr-grid-row--gutters-md` : Espacement moyen (1rem, par défaut)
- `.fr-grid-row--gutters-lg` : Grand espacement (2rem)
- `.fr-grid-row--gutters-xl` : Très grand espacement (3rem)

### Alignement vertical
- `.fr-grid-row--top` : Aligner en haut
- `.fr-grid-row--middle` : Aligner au centre
- `.fr-grid-row--bottom` : Aligner en bas
- `.fr-grid-row--stretch` : Étendre sur toute la hauteur

### Alignement horizontal
- `.fr-grid-row--left` : Aligner à gauche
- `.fr-grid-row--center` : Centrer
- `.fr-grid-row--right` : Aligner à droite
- `.fr-grid-row--between` : Espacement entre les éléments
- `.fr-grid-row--around` : Espacement autour des éléments
- `.fr-grid-row--evenly` : Espacement égal partout

### Colonnes spéciales
- `.fr-col-auto` : Largeur automatique selon le contenu
- `.fr-col-flex` : Colonne flexible qui prend l'espace disponible

### Offset
- `.fr-col-offset-{n}` : Décalage de n colonnes
- `.fr-col-md-offset-{n}` : Décalage responsive (md)
- `.fr-col-lg-offset-{n}` : Décalage responsive (lg)

---

## Exemples d'utilisation

### Exemple 1 : Question avec choix multiples

```twig
<div class="fr-grid-row fr-grid-row--gutters">
    <div class="fr-col-12">
        <fieldset class="fr-fieldset">
            <legend class="fr-fieldset__legend">
                Question title
            </legend>
            <div class="fr-fieldset__content">
                <div class="fr-checkbox-group">
                    <input type="checkbox" id="choice-1" name="choices[]" value="1">
                    <label class="fr-label" for="choice-1">Choice 1</label>
                </div>
                <div class="fr-checkbox-group">
                    <input type="checkbox" id="choice-2" name="choices[]" value="2">
                    <label class="fr-label" for="choice-2">Choice 2</label>
                </div>
            </div>
        </fieldset>
    </div>
</div>
```

### Exemple 2 : Layout avec navigation et contenu

```twig
<div class="fr-grid-row fr-grid-row--gutters-lg">
    <nav class="fr-col-12 fr-col-md-3">
        <!-- Navigation sidebar -->
    </nav>
    <main class="fr-col-12 fr-col-md-9">
        <!-- Main content -->
    </main>
</div>
```

### Exemple 3 : Cards responsive

```twig
<div class="fr-grid-row fr-grid-row--gutters">
    {% for card in cards %}
        <div class="fr-col-12 fr-col-md-6 fr-col-lg-4">
            <div class="fr-card">
                <div class="fr-card__body">
                    <h3 class="fr-card__title">{{ card.title }}</h3>
                    <p class="fr-card__desc">{{ card.description }}</p>
                </div>
            </div>
        </div>
    {% endfor %}
</div>
```

---

## Bonnes pratiques

1. **Toujours utiliser `fr-grid-row--gutters`** pour avoir un espacement entre les colonnes
2. **Mobile-first** : Commencer par `fr-col-12` puis ajouter les breakpoints
3. **Utiliser les helpers** au lieu de CSS custom
4. **Tester le responsive** sur mobile, tablette et desktop
5. **Éviter les grilles imbriquées** quand possible (préférer flexbox/grid CSS pour les cas complexes)

---

## Références

- [Documentation officielle DSFR - Grille](https://www.systeme-de-design.gouv.fr/elements-d-interface/fondamentaux-techniques/grille-et-points-de-rupture)
- Fichier des helpers : `css/dsfr-grid-helpers.css`
- Exemples dans le thème : `views/subviews/printanswers/question_types/`
