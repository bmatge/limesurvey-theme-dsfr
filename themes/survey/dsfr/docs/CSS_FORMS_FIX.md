# Correction des styles de formulaire DSFR

## Problème identifié

Les champs de formulaire (input text et textarea) ne respectaient pas les spécifications DSFR :

### Input text
- ❌ Bordure grise tout autour (au lieu de uniquement en bas)
- ❌ Pas de fond gris
- ❌ Visualisation du focus non conforme

### Textarea
- ❌ Fond gris disparaissait au focus
- ❌ Prise de focus totalement invisible

## Cause du problème

Conflit entre :
1. **Bootstrap** (hérité du thème vanilla parent) qui ajoute des bordures et styles avec la classe `.form-control`
2. **Anciennes règles CSS** dans `custom.css` (lignes 251-263) qui n'étaient pas complètes

## Solution appliquée

### 1. Neutralisation Bootstrap ([theme.css](css/theme.css) lignes 95-130)

Ajout de règles pour neutraliser complètement `.form-control` :
- `border: none !important` - Suppression de toutes les bordures Bootstrap
- `background-color: #EEEEEE !important` - Fond gris DSFR
- `box-shadow: inset 0 -2px 0 0 #3A3A3A !important` - Bordure gris foncé/noir uniquement en bas

### 2. Styles DSFR conformes ([theme.css](css/theme.css) lignes 342-452)

#### État normal
```css
input[type="text"], textarea {
    background-color: #EEEEEE;           /* Fond gris DSFR */
    border: none;                         /* Pas de bordure */
    border-radius: 0.25rem 0.25rem 0 0;  /* Coins arrondis en haut */
    box-shadow: inset 0 -2px 0 0 #3A3A3A; /* Bordure gris foncé/noir en bas */
}
```

#### État focus (CRITIQUE)
```css
input:focus, textarea:focus {
    background-color: #EEEEEE !important;  /* Le fond gris RESTE */
    box-shadow: inset 0 -2px 0 0 #3A3A3A; /* La bordure reste grise/noire */
    outline: 2px solid #0a76f6; /* C'est l'OUTLINE qui devient bleu */
    outline-offset: 2px;
}
```

### 3. Suppression des règles conflictuelles ([custom.css](css/custom.css) lignes 247-255)

Les anciennes règles ont été supprimées et remplacées par un commentaire indiquant que les styles sont maintenant dans `theme.css`.

## Spécifications DSFR respectées

Conformément à DSFR v1.11 (`dsfr-dist/css/dsfr.min.css`) :

- ✅ `background-color: var(--background-contrast-grey)` (#EEEEEE)
- ✅ `box-shadow: inset 0 -2px 0 0 var(--border-plain-grey)` (bordure grise/noire en bas uniquement)
- ✅ `border-radius: 0.25rem 0.25rem 0 0` (coins arrondis en haut)
- ✅ Fond gris conservé au focus
- ✅ Bordure en bas reste grise/noire au focus (ne devient PAS bleue)
- ✅ Outline bleu pour accessibilité (2px solid `#0a76f6`, offset 2px)

## Fichiers modifiés

1. **[css/theme.css](css/theme.css)** :
   - Lignes 95-130 : Neutralisation Bootstrap
   - Lignes 342-452 : Styles DSFR complets pour inputs/textarea

2. **[css/custom.css](css/custom.css)** :
   - Lignes 247-255 : Suppression des anciennes règles conflictuelles

## Tests à effectuer

Pour vérifier que la correction fonctionne :

1. Ouvrir une enquête avec des champs texte
2. Vérifier l'état normal :
   - Fond gris (#EEEEEE)
   - Bordure uniquement en bas (gris foncé/noir #3A3A3A)
   - Coins arrondis en haut
3. Cliquer dans un champ (focus) :
   - Le fond gris doit RESTER
   - La bordure en bas reste grise/noire (ne devient PAS bleue)
   - Outline bleu visible autour du champ (c'est ÇA l'indicateur de focus)

## Références

- [DSFR - Composant Champ de saisie](https://www.systeme-de-design.gouv.fr/composants-et-modeles/composants/champ-de-saisie/)
- Fichier DSFR : `dsfr-dist/css/dsfr.min.css`
- Variables CSS DSFR : `--background-contrast-grey`, `--blue-france`, `--border-plain-grey`
