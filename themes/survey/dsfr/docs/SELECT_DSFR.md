# Listes déroulantes (Select) conformes au DSFR

## Problème identifié

Les questions de type "Liste (Menu déroulant)" n'étaient pas conformes au DSFR :
- ❌ Apparence native du navigateur
- ❌ Pas de fond gris DSFR
- ❌ Pas d'icône chevron DSFR
- ❌ Styles Bootstrap en conflit

## Types de questions concernées

### Question 19 : Liste (Menu déroulant)
- **Type LimeSurvey** : `!` (List - Dropdown)
- **Usage** : Liste déroulante standard

### Changement de langue (Sélecteur de langue)
- **Type LimeSurvey** : Question système de changement de langue
- **Usage** : Permet de changer la langue du questionnaire
- **Recommandation** : À poser au début du questionnaire

## Solution appliquée

### 1. Templates Twig créés

#### Template principal
**Fichier** : [views/survey/questions/answer/list_dropdown/answer.twig](views/survey/questions/answer/list_dropdown/answer.twig)

Structure DSFR :
```twig
<div class="fr-select-group">
    <select class="fr-select" name="{{ name }}" id="answer{{ name }}">
        {{ sOptions|raw }}
    </select>
</div>
```

#### Templates de lignes

1. **[rows/option.twig](views/survey/questions/answer/list_dropdown/rows/option.twig)** : Génère une `<option>`
2. **[rows/optgroup.twig](views/survey/questions/answer/list_dropdown/rows/optgroup.twig)** : Génère un `<optgroup>` pour les catégories
3. **[rows/othertext.twig](views/survey/questions/answer/list_dropdown/rows/othertext.twig)** : Champ texte "Autre" avec classes DSFR

### 2. Styles CSS DSFR

**Fichier** : [css/theme.css](css/theme.css) lignes 490-568

#### État normal
```css
select, .fr-select {
    /* Apparence native désactivée */
    appearance: none;

    /* Fond gris DSFR */
    background-color: #EEEEEE;

    /* Icône chevron DSFR */
    background-image: url("data:image/svg+xml...");
    background-position: calc(100% - 1rem) 50%;

    /* Bordure en bas uniquement */
    border: none;
    border-radius: 0.25rem 0.25rem 0 0;
    box-shadow: inset 0 -2px 0 0 #3A3A3A;

    /* Padding avec espace pour l'icône */
    padding: 0.5rem 2.5rem 0.5rem 1rem;
}
```

#### État focus
```css
select:focus, .fr-select:focus {
    background-color: #EEEEEE !important;  /* Reste gris */
    box-shadow: inset 0 -2px 0 0 #3A3A3A;  /* Bordure reste noire */
    outline: 2px solid #0a76f6;  /* Outline bleu */
    outline-offset: 2px;
}
```

## Spécifications DSFR respectées

Conformément à [DSFR - Liste déroulante](https://www.systeme-de-design.gouv.fr/composants-et-modeles/composants/liste-deroulante) :

- ✅ Fond gris (`#EEEEEE`)
- ✅ Bordure grise/noire en bas uniquement
- ✅ Icône chevron DSFR (flèche vers le bas)
- ✅ Coins arrondis en haut uniquement
- ✅ Apparence native désactivée (`appearance: none`)
- ✅ Outline bleu au focus (`#0a76f6`)
- ✅ Padding adapté pour l'icône (2.5rem à droite)
- ✅ Classe `.fr-select-group` pour le conteneur
- ✅ Classe `.fr-select` pour le `<select>`

## Cas d'usage spécifiques

### Sélecteur de langue

Pour une question de changement de langue, utiliser le type "Liste (Menu déroulant)" standard. Le template appliquera automatiquement les styles DSFR.

**Recommandation** : Poser cette question au début du questionnaire pour permettre aux répondants de choisir leur langue préférée.

### Liste avec catégories (optgroup)

Le template supporte les `<optgroup>` pour organiser les options par catégories.

**Fichier** : [rows/optgroup.twig](views/survey/questions/answer/list_dropdown/rows/optgroup.twig)

```html
<optgroup class="dropdowncategory" label="Catégorie 1">
    <option value="1">Option 1</option>
    <option value="2">Option 2</option>
</optgroup>
```

### Liste avec option "Autre"

Le template supporte l'option "Autre" qui affiche un champ texte DSFR lorsque sélectionné.

**Fichier** : [rows/othertext.twig](views/survey/questions/answer/list_dropdown/rows/othertext.twig)

Le champ utilise `.fr-input-group` et `.fr-input` pour la conformité DSFR.

## Fichiers créés

1. **Templates Twig** :
   - `views/survey/questions/answer/list_dropdown/answer.twig`
   - `views/survey/questions/answer/list_dropdown/rows/option.twig`
   - `views/survey/questions/answer/list_dropdown/rows/optgroup.twig`
   - `views/survey/questions/answer/list_dropdown/rows/othertext.twig`

2. **Styles CSS** :
   - `css/theme.css` (lignes 490-568) : Styles pour `.fr-select`

## Tests à effectuer

1. **Liste simple** :
   - Créer une question de type "Liste (Menu déroulant)"
   - Vérifier l'apparence : fond gris, icône chevron, bordure en bas
   - Cliquer sur le select : vérifier l'outline bleu

2. **Liste avec catégories** :
   - Créer une question avec séparateurs de catégories
   - Vérifier que les `<optgroup>` sont bien rendus

3. **Liste avec "Autre"** :
   - Activer l'option "Autre"
   - Sélectionner "Autre" : vérifier que le champ texte DSFR s'affiche
   - Désélectionner "Autre" : vérifier que le champ se cache

4. **Changement de langue** :
   - Créer une question de changement de langue
   - Vérifier l'apparence DSFR
   - Tester le changement de langue

## Références

- [DSFR - Liste déroulante](https://www.systeme-de-design.gouv.fr/composants-et-modeles/composants/liste-deroulante)
- [DSFR - Sélecteur de langue](https://www.systeme-de-design.gouv.fr/composants-et-modeles/composants/selecteur-de-langues)
- Fichier DSFR : `dsfr-dist/css/dsfr.min.css`
- Variables CSS DSFR : `--background-contrast-grey`, `--blue-france`, `--border-plain-grey`
