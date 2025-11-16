# Groupes de champs avec messages DSFR (fr-input-group)

## Problème identifié

Les questions avec champs de saisie (Short Text, Long Text, etc.) n'utilisaient pas la structure DSFR complète :
- ❌ Pas de `.fr-input-group` avec modificateurs `--error` / `--valid`
- ❌ Texte d'aide non intégré dans `.fr-hint-text` du label
- ❌ Messages de validation (info/erreur) non conformes à `.fr-messages-group`
- ❌ États error/valid non gérés dynamiquement

## Structure DSFR complète

Selon [DSFR - Champ de saisie](https://www.systeme-de-design.gouv.fr/composants-et-modeles/composants/champ-de-saisie) :

```html
<div class="fr-input-group fr-input-group--error">
  <label class="fr-label" for="input-0">
    Libellé du champ
    <span class="fr-hint-text">Texte d'aide</span>
  </label>
  <input class="fr-input" id="input-0" type="text" aria-describedby="input-0-messages">
  <div class="fr-messages-group" id="input-0-messages" aria-live="polite">
    <p class="fr-message fr-message--error">Message d'erreur</p>
  </div>
</div>
```

## Solution appliquée

### 1. Template Twig pour Short Free Text

**Fichier** : [views/survey/questions/answer/shortfreetext/text/item.twig](views/survey/questions/answer/shortfreetext/text/item.twig)

Structure créée :
```twig
<div class="fr-input-group" data-question-id="{{ basename }}">
    <input class="fr-input" ... aria-describedby="messages-{{ name }}">
    <div class="fr-messages-group" id="messages-{{ name }}" aria-live="polite">
        {# Peuplé dynamiquement par JavaScript #}
    </div>
</div>
```

### 2. JavaScript pour intégration dynamique

**Fichier** : [scripts/theme.js](scripts/theme.js) lignes 186-280

#### Fonction `integrateDSFRMessages()`

Cette fonction :
1. **Trouve tous les `.fr-input-group[data-question-id]`**
2. **Déplace les messages de validation** depuis `.question-valid-container` vers `.fr-messages-group` :
   - Messages info (`.ls-em-tip`, `.em_numbers_only`) → `.fr-message--info`
   - Messages erreur (`.ls-em-error`, `.em_num_answers`) → `.fr-message--error`
3. **Ajoute les modificateurs** sur `.fr-input-group` :
   - `--error` si message d'erreur présent
   - `--valid` si champ valide et rempli
4. **Cache les containers originaux** (`.question-valid-container`, `.question-help-container`)

#### Fonction `observeValidationChanges()`

- **MutationObserver** pour détecter les changements dynamiques (Expression Manager)
- Met à jour les classes `--error` / `--valid` en temps réel
- Déplace les nouveaux messages ajoutés par EM

### 3. Styles CSS DSFR

**Fichier** : [css/theme.css](css/theme.css) lignes 570-663

#### Messages

```css
.fr-messages-group {
    margin-top: 0.25rem;
    display: block;
}

.fr-message {
    font-size: 0.75rem;
    line-height: 1.25rem;
    display: flex;
    align-items: flex-start;
    gap: 0.5rem;
}

/* Avec icône avant */
.fr-message--info::before { /* Icône info bleue */ }
.fr-message--valid::before { /* Icône check verte */ }
.fr-message--error::before { /* Icône erreur rouge */ }
```

#### États error/valid

```css
.fr-input-group--error .fr-input {
    box-shadow: inset 0 -2px 0 0 #CE0500; /* Bordure rouge */
}

.fr-input-group--valid .fr-input {
    box-shadow: inset 0 -2px 0 0 #18753C; /* Bordure verte */
}
```

#### Hint text

```css
.fr-label .fr-hint-text {
    display: block;
    font-size: 0.75rem;
    color: #666666;
    margin-top: 0.25rem;
}
```

## Spécifications DSFR respectées

- ✅ Structure `.fr-input-group` avec modificateurs `--error` / `--valid`
- ✅ `.fr-messages-group` avec `aria-live="polite"` pour accessibilité
- ✅ `.fr-message` avec classes `--info`, `--error`, `--valid`
- ✅ Icônes SVG conformes au DSFR
- ✅ Couleurs DSFR :
  - Info : `#0063CB` (bleu)
  - Succès : `#18753C` (vert)
  - Erreur : `#CE0500` (rouge)
- ✅ Bordure change de couleur selon l'état (rouge/vert)
- ✅ `.fr-hint-text` dans le label

## Types de questions supportés

### Actuellement implémenté
- ✅ Short Free Text (Type S) - Input text simple

### À implémenter (même structure)
- ⏳ Long Free Text (Type T) - Textarea
- ⏳ Huge Free Text (Type U) - Grand textarea
- ⏳ Multiple Short Text (Type Q) - Plusieurs inputs
- ⏳ Numerical (Type N) - Input numérique
- ⏳ Date (Type D) - Input date

## Exemple de rendu

### État normal
```html
<div class="fr-input-group">
  <input class="fr-input" ...>
  <div class="fr-messages-group">
    <p class="fr-message fr-message--info">
      Seuls des nombres peuvent être entrés dans ce champ.
    </p>
  </div>
</div>
```

### État erreur (champ obligatoire vide)
```html
<div class="fr-input-group fr-input-group--error">
  <input class="fr-input" ...>
  <div class="fr-messages-group">
    <p class="fr-message fr-message--error">
      Cette question est obligatoire
    </p>
  </div>
</div>
```

### État valide
```html
<div class="fr-input-group fr-input-group--valid">
  <input class="fr-input" value="42" ...>
  <div class="fr-messages-group">
    <!-- Pas de message ou message de succès -->
  </div>
</div>
```

## Interaction avec Expression Manager

Le JavaScript utilise un `MutationObserver` pour détecter :
- Ajout/suppression de messages d'erreur par EM
- Changements de classes (`.ls-em-error`, etc.)
- Mise à jour dynamique de la validation

Cela garantit que les modificateurs `--error` / `--valid` restent synchronisés avec l'état de validation de LimeSurvey.

## Tests à effectuer

1. **Question simple avec validation** :
   - Créer une question "Short Free Text" obligatoire
   - Laisser vide → vérifier message d'erreur rouge et bordure rouge
   - Remplir → vérifier disparition de l'erreur et bordure verte

2. **Question avec "Numbers only"** :
   - Activer "Numbers only"
   - Vérifier message info bleu "Seuls des nombres..."
   - Taper des lettres → vérifier message d'erreur
   - Taper des nombres → vérifier validation

3. **Expression Manager** :
   - Créer une question avec validation EM (ex: `this > 10`)
   - Vérifier que les messages EM apparaissent dans `.fr-messages-group`
   - Vérifier que l'état error/valid se met à jour en temps réel

## Fichiers créés/modifiés

1. **Template** :
   - `views/survey/questions/answer/shortfreetext/text/item.twig` (créé)

2. **JavaScript** :
   - `scripts/theme.js` :
     - `integrateDSFRMessages()` (ajouté)
     - `observeValidationChanges()` (ajouté)

3. **CSS** :
   - `css/theme.css` (lignes 570-663) :
     - `.fr-messages-group`
     - `.fr-message` et variantes
     - `.fr-input-group--error` / `--valid`
     - `.fr-hint-text`

## Références

- [DSFR - Champ de saisie](https://www.systeme-de-design.gouv.fr/composants-et-modeles/composants/champ-de-saisie)
- [DSFR - Messages de formulaire](https://www.systeme-de-design.gouv.fr/composants-et-modeles/composants/groupe-de-champs)
- Fichier DSFR : `dsfr-dist/css/dsfr.min.css`
