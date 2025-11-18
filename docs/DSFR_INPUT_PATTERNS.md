# Patterns d'Inputs DSFR

Ce document récapitule les patterns d'inputs DSFR utilisés dans le thème LimeSurvey DSFR. Tous les inputs du thème sont standardisés selon le Design System de l'État Français.

## État de la standardisation

✅ **100% des inputs utilisent les classes DSFR**
- 84 occurrences de `fr-input`
- 85 occurrences de groupes d'inputs DSFR
- 20 implémentations de gestion d'erreur DSFR

---

## Types d'inputs standardisés

### 1. Input texte simple

**Classes utilisées** : `fr-input`

```twig
<input
    type="text"
    class="fr-input"
    id="input-id"
    name="input-name"
    value="{{ value }}"
/>
```

**Fichiers exemples** :
- `views/survey/questions/answer/shortfreetext/text/item.twig`
- `views/survey/questions/answer/multipleshorttext/rows/answer_row_inputtext.twig`

---

### 2. Input avec groupe (label + input)

**Classes utilisées** : `fr-input-group`, `fr-label`, `fr-input`

```twig
<div class="fr-input-group">
    <label class="fr-label" for="input-id">
        Label du champ
    </label>
    <input
        type="text"
        class="fr-input"
        id="input-id"
        name="input-name"
    />
</div>
```

**Usage** : Formulaires standards (save, load, register)

---

### 3. Input avec état d'erreur

**Classes utilisées** : `fr-input-group--error`, `fr-input--error`, `fr-error-text`

```twig
<div class="fr-input-group {% if error %}fr-input-group--error{% endif %}">
    <label class="fr-label" for="input-id">
        Label du champ
    </label>
    <input
        type="text"
        class="fr-input {% if error %}fr-input--error{% endif %}"
        id="input-id"
        name="input-name"
        {% if error %}aria-describedby="input-id-error"{% endif %}
    />
    {% if error %}
        <p id="input-id-error" class="fr-error-text">
            {{ error_message }}
        </p>
    {% endif %}
</div>
```

**Gestion dans CSS** : `custom.css` lignes 547-584

---

### 4. Textarea

**Classes utilisées** : `fr-input` (multi-lignes)

```twig
<textarea
    class="fr-input"
    id="textarea-id"
    name="textarea-name"
    rows="5"
>{{ value }}</textarea>
```

**Fichiers exemples** :
- `views/survey/questions/answer/longfreetext/answer.twig`
- `views/survey/questions/answer/hugefreetext/answer.twig`
- `views/survey/questions/answer/multipleshorttext/rows/answer_row_textarea.twig`

---

### 5. Input numérique

**Classes utilisées** : `fr-input`, `numeric`

```twig
<input
    type="number"
    class="fr-input numeric"
    id="numeric-id"
    name="numeric-name"
    min="{{ min }}"
    max="{{ max }}"
    step="{{ step }}"
/>
```

**Fichiers exemples** :
- `views/survey/questions/answer/numerical/answer.twig`
- `views/survey/questions/answer/multiplenumeric/rows/input/answer_row.twig`

---

### 6. Select / Dropdown

**Classes utilisées** : `fr-select`

```twig
<select class="fr-select" id="select-id" name="select-name">
    <option value="">-- Choisir --</option>
    {% for option in options %}
        <option value="{{ option.value }}">{{ option.label }}</option>
    {% endfor %}
</select>
```

**Fichiers exemples** :
- `views/subviews/navigation/language_changer.twig`
- `views/survey/questions/answer/date/dropdown/answer.twig`

---

### 7. Checkbox

**Classes utilisées** : `fr-checkbox-group`, `fr-checkbox-input`, `fr-label`

```twig
<div class="fr-checkbox-group">
    <input
        type="checkbox"
        class="fr-checkbox-input"
        id="checkbox-id"
        name="checkbox-name"
        value="1"
    />
    <label class="fr-label" for="checkbox-id">
        Label de la checkbox
    </label>
</div>
```

**Fichiers exemples** :
- `views/subviews/privacy/privacy_modal.twig`
- `views/subviews/privacy/privacy_text.twig`
- `survey/questions/answer/multiplechoice_with_comments/rows/answer_row.twig`

---

### 8. Radio button

**Classes utilisées** : `fr-fieldset`, `fr-radio-group`, `fr-radio-input`, `fr-label`

```twig
<fieldset class="fr-fieldset">
    <legend class="fr-fieldset__legend">Question</legend>
    <div class="fr-fieldset__content">
        <div class="fr-radio-group">
            <input
                type="radio"
                class="fr-radio-input"
                id="radio-1"
                name="radio-name"
                value="1"
            />
            <label class="fr-label" for="radio-1">Option 1</label>
        </div>
        <div class="fr-radio-group">
            <input
                type="radio"
                class="fr-radio-input"
                id="radio-2"
                name="radio-name"
                value="2"
            />
            <label class="fr-label" for="radio-2">Option 2</label>
        </div>
    </div>
</fieldset>
```

**Fichiers exemples** :
- `views/survey/questions/answer/listradio/rows/answer_row.twig`
- `survey/questions/answer/listradio/rows/answer_row.twig`

---

### 9. Input avec commentaire (Multiple choice with comments)

**Classes utilisées** : Combinaison checkbox + input texte

```twig
<div class="fr-grid-row">
    <div class="fr-col-md-6 fr-checkbox-group">
        <input type="checkbox" class="fr-checkbox-input" id="choice-id" />
        <label class="fr-label" for="choice-id">Choix</label>
    </div>
    <div class="fr-col-md-6">
        <input
            type="text"
            class="fr-input"
            placeholder="Commentaire"
            aria-labelledby="label-choice-id"
        />
    </div>
</div>
```

**Fichier** : `survey/questions/answer/multiplechoice_with_comments/rows/answer_row.twig`

---

### 10. Slider (Input range)

**Classes utilisées** : `fr-range-group`, `fr-range`, `fr-range__output`

```twig
<div class="fr-range-group">
    <input
        type="range"
        class="fr-range"
        id="slider-id"
        name="slider-name"
        min="0"
        max="100"
        value="50"
    />
    <output class="fr-range__output" for="slider-id">50</output>
</div>
```

**Fichiers exemples** :
- `views/survey/questions/answer/multiplenumeric/rows/sliders/answer_row.twig`
- `views/survey/questions/answer/multiplenumeric/rows/sliders/vertical_slider.twig`

---

## Gestion des erreurs

### Input en erreur

Tous les inputs supportent les états d'erreur via les classes DSFR :

```twig
{% if alert %}
    <div class="fr-input-group fr-input-group--error">
        <input class="fr-input fr-input--error" />
        <p class="fr-error-text">Message d'erreur</p>
    </div>
{% endif %}
```

**Implémentation CSS** : `custom.css` lignes 521-584

---

## Compatibilité Bootstrap

Le thème conserve une compatibilité CSS pour les classes Bootstrap `form-control` utilisées par le core LimeSurvey :

```css
/* theme.css lignes 342-452 */
input.form-control,
textarea.form-control,
select.form-control {
    /* Styles DSFR appliqués même avec classe Bootstrap */
}
```

Cela permet de :
- ✅ Supporter les templates core LimeSurvey non modifiés
- ✅ Garantir un affichage DSFR cohérent partout
- ✅ Faciliter les mises à jour de LimeSurvey

---

## Accessibilité

Tous les inputs suivent les bonnes pratiques DSFR d'accessibilité :

1. **Labels associés** : Chaque input a un `<label>` avec `for="input-id"`
2. **Messages d'erreur** : Liés avec `aria-describedby`
3. **Rôles ARIA** : `role="group"` pour les groupes de radios/checkboxes
4. **Texte alternatif** : `aria-label` ou `aria-labelledby` quand nécessaire
5. **Focus visible** : Géré par DSFR nativement

---

## Statistiques

- **84 inputs** utilisent `fr-input`
- **85 groupes d'inputs** DSFR (`fr-input-group`, `fr-checkbox-group`, etc.)
- **20 implémentations** de gestion d'erreur DSFR
- **37 fichiers** contiennent des inputs standardisés
- **100% de couverture** DSFR sur tous les types d'inputs

---

## Références

- [Documentation DSFR - Champ de saisie](https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/champ-de-saisie)
- [Documentation DSFR - Case à cocher](https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/case-a-cocher)
- [Documentation DSFR - Bouton radio](https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/bouton-radio)
- Fichier de compatibilité : `css/theme.css` lignes 342-452
- Fichier de gestion d'erreur : `css/custom.css` lignes 521-584
