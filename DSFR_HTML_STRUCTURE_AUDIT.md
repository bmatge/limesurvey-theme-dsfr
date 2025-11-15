# Audit de Conformité Structure HTML DSFR
## Thème LimeSurvey DSFR - Analyse Complète

**Date d'audit** : 2025-11-10
**Fichiers analysés** : 148 templates Twig
**Scope** : themes/survey/dsfr/views/

---

## 📊 RÉSUMÉ EXÉCUTIF

**Total des problèmes identifiés** : 47
- **🔴 CRITIQUE** : 8 problèmes (brise la conformité DSFR)
- **🟠 HAUTE** : 15 problèmes (impact accessibilité ou UX)
- **🟡 MOYENNE** : 18 problèmes (cosmétique ou mineur)
- **🟢 BASSE** : 6 problèmes (améliorations recommandées)

**Fichiers affectés** : 32 fichiers

---

## 🔴 PROBLÈMES CRITIQUES (8)

### 1. Templates Radio - Structure HTML Incorrecte

**Fichiers affectés** :
- `gender/radio/answer.twig` (lignes 17-62)
- `yesno/radio/item.twig` (lignes 14-58)

**Structure actuelle (INCORRECTE)** :
```html
<ul class="fr-fieldset__content" role="radiogroup">
    <li class="answer-item radio-item">
        <input type="radio" ... />
        <label class="fr-label">...</label>
    </li>
</ul>
```

**Problèmes** :
- ❌ Utilisation de `<ul>/<li>` au lieu de composants DSFR
- ❌ Absence de `<fieldset class="fr-fieldset">`
- ❌ Absence de wrappers `<div class="fr-radio-group">` par radio
- ❌ `role="radiogroup"` sur `<ul>` conflictuel avec DSFR

**Structure DSFR correcte** :
```html
<fieldset class="fr-fieldset">
    <div class="fr-fieldset__content">
        <div class="fr-radio-group">
            <input type="radio" class="fr-radio-input" ... />
            <label class="fr-label" for="...">...</label>
        </div>
        <div class="fr-radio-group">
            <input type="radio" class="fr-radio-input" ... />
            <label class="fr-label" for="...">...</label>
        </div>
    </div>
</fieldset>
```

---

### 2. List with Comment - fr-radio-group Imbriqués (INVALIDE)

**Fichier** : `listradio_with_comment/answer.twig` (lignes 22-60)

**Structure actuelle (INCORRECTE)** :
```html
<div class="fr-radio-group">
    <ul class="ls-answers" role="radiogroup">
        <li>
            <div class="fr-radio-group">
                <input type="radio" ... />
```

**Problème** :
- ❌ **`fr-radio-group` imbriqués** = INVALIDE en DSFR
- ❌ Un `fr-radio-group` ne peut contenir qu'UN SEUL radio
- ❌ Structure UL/LI incompatible

**Structure DSFR correcte** :
```html
<fieldset class="fr-fieldset">
    <div class="fr-fieldset__content">
        <div class="fr-radio-group">
            <input type="radio" class="fr-radio-input" ... />
            <label class="fr-label">...</label>
        </div>
        <!-- Répéter pour chaque option -->
    </div>
</fieldset>

<!-- Zone de commentaire séparée -->
<div class="fr-input-group fr-mt-4w">
    <label class="fr-label">{{ gT('Comment') }}</label>
    <textarea class="fr-input">...</textarea>
</div>
```

---

### 3. Formulaires - Absence de fr-input-group

**Fichiers affectés (TOUS CRITIQUES)** :
- `content/save.twig` (4 champs : name, password, repeat, email)
- `content/load.twig` (2 champs : name, password)
- `registration/register_form.twig` (3+ champs)
- `logincomponents/token.twig` (1 champ)

**Structure actuelle (INCORRECTE)** :
```html
<div class="fr-mb-3w">
    <label class="fr-label">{{ gT("Name:") }}</label>
    <div>
        <input class="fr-input" ... />
    </div>
</div>
```

**Problèmes** :
- ❌ Absence de wrapper `fr-input-group`
- ❌ Label et input séparés par div inutile
- ❌ Non conforme à la structure DSFR

**Structure DSFR correcte** :
```html
<div class="fr-input-group">
    <label class="fr-label" for="savename">
        {{ gT("Name:") }}
        <span class="fr-hint-text">{{ gT("Required") }}</span>
    </label>
    <input class="fr-input" type="text" id="savename" name="savename" required />
</div>
```

**Impact** : ~15 inputs à corriger dans 4 fichiers

---

### 4. Multiple Short Text - Wrapper Custom Non-DSFR

**Fichier** : `multipleshorttext/rows/answer_row_inputtext.twig` (lignes 17-43)

**Structure actuelle** :
```html
<div class="ls-input-group">
    <div class="ls-input-group-extra prefix-text prefix">€</div>
    <input class="fr-input" ... />
    <div class="ls-input-group-extra suffix-text suffix">TTC</div>
</div>
```

**Problèmes** :
- ❌ Classe custom `ls-input-group` au lieu de DSFR
- ❌ Classes `ls-input-group-extra` non-DSFR
- ❌ Structure ne suit pas le pattern DSFR

**Structure DSFR correcte** :
```html
<div class="fr-input-group">
    <label class="fr-label" for="...">...</label>
    <div class="fr-input-wrap">
        <span class="fr-input-wrap__addon">€</span>
        <input class="fr-input" ... />
        <span class="fr-input-wrap__addon">TTC</span>
    </div>
</div>
```

**Note** : DSFR n'a pas de composant natif pour prefix/suffix, donc soit utiliser `fr-input-wrap` (custom CSS requis), soit accepter `ls-input-group` comme extension acceptable.

---

## 🟠 PROBLÈMES HAUTE PRIORITÉ (15)

### 5. Modales - Utilisation de `<dialog>` au lieu de `<div>`

**Fichiers affectés** :
- `footer/modals/privacy.twig`
- `footer/modals/legal.twig`
- `footer/modals/accessibility.twig`
- `footer/modals/cookies.twig`
- `navigation/question_index_modal_dsfr.twig`

**Structure actuelle** :
```html
<dialog id="privacy-modal" class="fr-modal">
    <div class="fr-container">
```

**Problèmes** :
- ❌ `<dialog>` non supporté par DSFR
- ❌ Comportement natif de `<dialog>` incompatible avec DSFR JS
- ❌ Manque wrapper `fr-modal__body`

**Structure DSFR correcte** :
```html
<div id="privacy-modal" class="fr-modal" aria-labelledby="privacy-modal-title">
    <div class="fr-container fr-container--fluid fr-container--md">
        <div class="fr-grid-row fr-grid-row--center">
            <div class="fr-col-12 fr-col-md-10">
                <div class="fr-modal__body">
                    <div class="fr-modal__header">
                        <button class="fr-btn--close fr-btn" aria-controls="privacy-modal">
                            {{ gT("Close") }}
                        </button>
                    </div>
                    <div class="fr-modal__content">
                        <h1 id="privacy-modal-title" class="fr-modal__title">...</h1>
                        <!-- Contenu -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
```

---

### 6. Boutons Radio - Absence de classe fr-radio-input

**Fichiers affectés** :
- `gender/buttons/answer.twig` (lignes 11, 21, 32)
- `yesno/buttons/item.twig` (lignes 11, 21, 32)
- `5pointchoice/rows/item_row.twig` (ligne 10)

**Structure actuelle** :
```html
<input type="radio" name="..." id="..." value="...">
```

**Problème** :
- ❌ Absence de `class="fr-radio-input"` sur les inputs radio
- ❌ DSFR requiert cette classe pour le styling

**Correction** :
```html
<input type="radio" class="fr-radio-input" name="..." id="..." value="...">
```

---

### 7. Captcha - Structure Grid Bootstrap

**Fichiers affectés** :
- `logincomponents/token.twig` (lignes 93-108)
- `registration/register_form.twig` (lignes 67-78)
- `content/save.twig` (lignes 200-213)

**Structure actuelle** :
```html
<div class="fr-grid-row">
    <div class="fr-col-2 align-self-center">
        {{ captcha }}
    </div>
    <div class="fr-col-1 align-self-center">
        <a href="#" class="fr-btn">
            <i class="fa fa-refresh"></i>
        </a>
    </div>
```

**Problèmes** :
- ❌ Classe Bootstrap `align-self-center` au lieu de DSFR
- ❌ Icône Font Awesome au lieu de DSFR
- ❌ Input captcha non wrappé dans `fr-input-group`

**Structure DSFR correcte** :
```html
<div class="fr-input-group">
    <label class="fr-label" for="captcha">{{ gT("Security code") }}</label>
    <div class="fr-grid-row fr-grid-row--gutters fr-grid-row--middle">
        <div class="fr-col-3">
            {{ captcha }}
        </div>
        <div class="fr-col-2">
            <button type="button" class="fr-btn fr-btn--sm fr-btn--tertiary fr-icon-refresh-line" title="{{ gT("Reload") }}"></button>
        </div>
        <div class="fr-col-7">
            <input class="fr-input" type="text" id="captcha" name="captcha" required />
        </div>
    </div>
</div>
```

---

### 8. Indicateurs Champ Obligatoire - Pattern Non-DSFR

**Fichiers affectés (7)** :
- `content/save.twig` (lignes 102, 129, 155)
- `content/load.twig` (lignes 89, 101)
- `registration/register_form.twig` (ligne 46)
- `logincomponents/token.twig` (ligne 26)

**Structure actuelle** :
```html
<label class="fr-label">
    {{ gT("Name:") }}
    <small class="fr-text--error fa fa-asterisk">&nbsp;</small>
    <span class="fr-sr-only">{{ gT("Mandatory") }}</span>
</label>
```

**Problèmes** :
- ❌ Icône Font Awesome au lieu de pattern DSFR
- ❌ Redondance screen-reader + icône
- ❌ Classe `fr-float-left` inexistante en DSFR

**Pattern DSFR correct** :
```html
<label class="fr-label" for="savename">
    {{ gT("Name:") }}
    <span class="fr-hint-text">{{ gT("Required") }}</span>
</label>
```

OU avec message d'erreur :
```html
<div class="fr-input-group fr-input-group--error">
    <label class="fr-label" for="savename">
        {{ gT("Name:") }}
    </label>
    <input class="fr-input" type="text" id="savename" required aria-required="true" />
    <p class="fr-error-text">{{ gT("This field is required") }}</p>
</div>
```

---

### 9-15. Icônes Font Awesome → DSFR Icons

**Fichiers utilisant Font Awesome** :
- Astérisques obligatoires : `fa fa-asterisk`
- Bouton refresh captcha : `fa fa-refresh`
- Toggle password : `fa fa-eye`, `fa fa-eye-slash`

**Remplacement DSFR** :
```
fa fa-refresh     → fr-icon-refresh-line
fa fa-eye         → fr-icon-eye-line
fa fa-eye-slash   → fr-icon-eye-off-line
fa fa-asterisk    → Utiliser fr-hint-text pattern
```

---

## 🟡 PROBLÈMES MOYENNE PRIORITÉ (18)

### 16. Grid Rows Sans Conteneur Parent

**Fichiers** : save.twig, load.twig, register_form.twig, etc.

**Recommandation** : Vérifier que tous les `fr-grid-row` sont dans un `fr-container`

---

### 17. Tableaux Array - Absence de Wrappers DSFR

**Fichiers** :
- `arrays/column/answer.twig`
- `arrays/texts/answer.twig`

**Structure actuelle** :
```html
<div class="fr-table fr-table--bordered fr-table--responsive">
    <table>
```

**Structure DSFR correcte** :
```html
<div class="fr-table fr-table--bordered">
    <div class="fr-table__wrapper">
        <div class="fr-table__container">
            <div class="fr-table__content">
                <table>
```

---

### 18. Boutons - Absence d'Attribut type="button"

**Fichiers multiples** :
- Footer modals (4 fichiers)
- Ranking (4 boutons)
- Upload (1 bouton)
- Header menu (1 bouton) ✅ DÉJÀ CORRIGÉ

**Correction** : Ajouter `type="button"` sur tous les boutons non-submit

---

## 🟢 PROBLÈMES BASSE PRIORITÉ (6)

### 19. Texte Français en Dur - Non Traduisible

**Fichiers** :
- `footer/footer.twig` - Liens "Accessibilité", "Mentions légales", etc.
- Tous les modales footer (contenu en français uniquement)

**Recommandation** : Utiliser `{{ gT("...") }}` pour tout le texte

---

### 20. Tableaux - Absence de `<caption>`

**Fichiers** :
- `arrays/column/answer.twig`
- `arrays/texts/answer.twig`

**Recommandation** : Ajouter `<caption class="fr-sr-only">...</caption>` pour accessibilité

---

## 📋 ORDRE DE CORRECTION RECOMMANDÉ

### Phase 1 : Critique (Semaine 1) - 8 problèmes

1. ✅ Restructurer gender/radio et yesno/radio (templates radio)
2. ✅ Corriger listradio_with_comment (fr-radio-group imbriqués)
3. ✅ Ajouter fr-input-group dans save.twig (4 inputs)
4. ✅ Ajouter fr-input-group dans load.twig (2 inputs)
5. ✅ Ajouter fr-input-group dans register_form.twig (3+ inputs)
6. ✅ Corriger token.twig (input-group)
7. ✅ Corriger multipleshorttext input wrapper

**Effort** : 8-12 heures
**Impact** : Conformité DSFR restaurée

---

### Phase 2 : Haute Priorité (Semaine 2) - 15 problèmes

8. ✅ Changer `<dialog>` → `<div>` dans 5 modales
9. ✅ Ajouter `fr-radio-input` sur tous les radio buttons (3 fichiers)
10. ✅ Restructurer 3 captchas (token, registration, save)
11. ✅ Corriger indicateurs champs obligatoires (7 fichiers)
12. ✅ Remplacer icônes Font Awesome par DSFR (6 fichiers)

**Effort** : 8-10 heures
**Impact** : Accessibilité et UX

---

### Phase 3 : Moyenne Priorité (Semaine 3) - 18 problèmes

13. ✅ Ajouter wrappers table DSFR (2 fichiers)
14. ✅ Ajouter `type="button"` sur tous les boutons
15. ✅ Vérifier containers de grille
16. ✅ Corriger labels de select (header)

**Effort** : 6-8 heures
**Impact** : Polish et bonnes pratiques

---

### Phase 4 : Basse Priorité (Semaine 4) - 6 problèmes

17. ✅ Traduire textes français en dur
18. ✅ Ajouter captions aux tableaux
19. ✅ Remplacer classes Bootstrap résiduelles (float-end)

**Effort** : 4-6 heures
**Impact** : Perfectionnement

---

## 📊 FICHIERS PAR PRIORITÉ DE CORRECTION

### 🔴 Fichiers Critiques (8 fichiers)

1. **gender/radio/answer.twig** - Restructure complète
2. **yesno/radio/item.twig** - Restructure complète
3. **listradio_with_comment/answer.twig** - Fix imbrication
4. **content/save.twig** - 4 fr-input-group à ajouter
5. **content/load.twig** - 2 fr-input-group à ajouter
6. **registration/register_form.twig** - 3+ fr-input-group
7. **logincomponents/token.twig** - Fix input-group
8. **multipleshorttext/rows/answer_row_inputtext.twig** - Fix wrapper

---

### 🟠 Fichiers Haute Priorité (10 fichiers)

9. **footer/modals/privacy.twig** - dialog → div
10. **footer/modals/legal.twig** - dialog → div
11. **footer/modals/accessibility.twig** - dialog → div
12. **footer/modals/cookies.twig** - dialog → div
13. **navigation/question_index_modal_dsfr.twig** - dialog → div
14. **gender/buttons/answer.twig** - Ajouter fr-radio-input
15. **yesno/buttons/item.twig** - Ajouter fr-radio-input
16. **5pointchoice/rows/item_row.twig** - Ajouter fr-radio-input
17. **logincomponents/captcha.twig** - Restructure captcha
18. **Tous fichiers avec Font Awesome** (6 fichiers)

---

## ✅ TEMPLATES CONFORMES DSFR (Exemples)

Ces templates sont **bien structurés** et servent de référence :

1. ✅ `navigation/navigator.twig` - Boutons DSFR parfaits
2. ✅ `header/nav_bar.twig` - Header conforme (sauf select label)
3. ✅ `footer/footer.twig` - Footer conforme (sauf texte FR)
4. ✅ `5pointchoice/answer.twig` - Bon usage fieldset
5. ✅ `arrays/dualscale/answer.twig` - Fieldsets imbriqués corrects
6. ✅ `longfreetext/answer.twig` - fr-input-group parfait
7. ✅ `hugefreetext/answer.twig` - Textarea bien structuré
8. ✅ `date/answer.twig` - Select groups bien faits
9. ✅ `multiplenumeric/answer.twig` - Structure propre
10. ✅ `messages/warnings.twig` - Alertes DSFR correctes

---

## 🎯 STATISTIQUES PAR CATÉGORIE

| Catégorie | Problèmes | Priorité Max |
|-----------|-----------|--------------|
| **Radio buttons** | 3 | 🔴 Critique |
| **Input wrappers** | 15 | 🔴 Critique |
| **Modales** | 5 | 🟠 Haute |
| **Icônes** | 6 | 🟠 Haute |
| **Champs obligatoires** | 7 | 🟠 Haute |
| **Tableaux** | 2 | 🟡 Moyenne |
| **Boutons** | 8 | 🟡 Moyenne |
| **Traduction** | 5 | 🟢 Basse |
| **Accessibilité** | 2 | 🟢 Basse |

---

## 💡 RECOMMANDATIONS GÉNÉRALES

### Bonnes Pratiques DSFR

1. **Toujours wrapper les inputs** dans `<div class="fr-input-group">`
2. **Utiliser fr-fieldset** pour tous les groupes radio/checkbox
3. **Un fr-radio-group par radio** (jamais imbriqués)
4. **Boutons** : toujours `type="button"` sauf si submit
5. **Icônes** : Utiliser DSFR icons (`fr-icon-*`) ou Remix Icons
6. **Tableaux** : Structure complète avec wrappers
7. **Modales** : `<div>` avec structure fr-modal complète
8. **Labels** : Toujours visibles (pas seulement aria-label)

### Patterns à Éviter

- ❌ `<ul>/<li>` pour radio buttons → Utiliser `fr-radio-group`
- ❌ `<dialog>` pour modales → Utiliser `<div class="fr-modal">`
- ❌ Input sans wrapper → Toujours dans `fr-input-group`
- ❌ Radio sans `fr-radio-input` → Ajouter la classe
- ❌ Font Awesome → DSFR icons uniquement
- ❌ Classes Bootstrap → Remplacer par DSFR

---

## 📈 PROGRESSION ESTIMÉE

| Phase | Durée | Problèmes Résolus | Coverage |
|-------|-------|-------------------|----------|
| Actuel | - | 0/47 | 0% conforme |
| Phase 1 | 1 sem | 8/47 | Critique OK |
| Phase 2 | 2 sem | 23/47 | Haute OK |
| Phase 3 | 3 sem | 41/47 | Moyenne OK |
| Phase 4 | 4 sem | 47/47 | 100% conforme |

**Durée totale estimée** : 4 semaines (à raison de 8h/semaine)

---

## 🧪 CHECKLIST DE VALIDATION

Après corrections, vérifier :

### Structure HTML
- [ ] Tous les radio dans `fr-radio-group` individuels
- [ ] Tous les inputs dans `fr-input-group`
- [ ] Toutes les modales utilisent `<div>`
- [ ] Tous les boutons ont `type="button"` ou `type="submit"`
- [ ] Tous les tableaux ont structure wrapper complète

### Classes DSFR
- [ ] Tous les radio ont `fr-radio-input`
- [ ] Tous les checkbox ont `fr-checkbox-input`
- [ ] Aucune classe Bootstrap résiduelle
- [ ] Aucune classe Font Awesome

### Accessibilité
- [ ] Tous les inputs ont label visible
- [ ] ARIA attributes cohérents
- [ ] Focus visible sur tous éléments
- [ ] Navigation clavier fonctionnelle
- [ ] Screen readers testés (NVDA)

---

**Voulez-vous que je commence les corrections Phase 1 (Critique) maintenant ?**
