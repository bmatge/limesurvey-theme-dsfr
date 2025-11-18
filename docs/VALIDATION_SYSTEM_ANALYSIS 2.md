# Analyse du système de validation LimeSurvey

## Problème actuel

Lorsque l'utilisateur soumet le formulaire sans répondre aux questions obligatoires :
- ❌ Aucune alerte DSFR ne s'affiche
- ❌ Aucun message d'erreur inline visible
- ❌ Les questions en erreur ne sont pas mises en évidence
- ❓ La modale Bootstrap se déclenche-t-elle vraiment ?

## Architecture de validation LimeSurvey

### 1. Expression Manager (EM)

LimeSurvey utilise **Expression Manager** pour la validation côté client.

**Fichier source** : `assets/packages/expressionscript/em_javascript.js`

**Principe** :
1. Quand l'utilisateur clique sur "Suivant", EM valide les champs
2. Si erreur → Génère des messages dans `.question-valid-container`
3. Si erreur → Peut afficher une modale Bootstrap (optionnel)

### 2. Classes CSS des erreurs

LimeSurvey ajoute dynamiquement ces classes aux messages d'erreur :

```css
.ls-em-error        /* Message d'erreur (rouge) */
.em_validation_q    /* Message de validation générique */
.ls-em-tip          /* Conseil/aide (bleu) */
.ls-em-success      /* Message de succès (vert) */
```

**Template source** : `views/subviews/survey/question_subviews/valid_message_and_help.twig`

```twig
<div class="question-valid-container">
    {{ aQuestion.valid_message }}      <!-- Ex: "Seuls des nombres sont acceptés" -->
    {{ aQuestion.man_message }}        <!-- Ex: "Cette question est obligatoire" -->
    {{ aQuestion.file_valid_message }} <!-- Pour upload de fichiers -->
</div>
```

### 3. Flux de validation

```
[Clic "Suivant"]
    ↓
[EM valide les champs]
    ↓
[Erreur détectée ?]
    ├─ OUI → Injecte message dans .question-valid-container
    │         Ajoute classe .ls-em-error
    │         Peut afficher modale Bootstrap
    │         Empêche soumission
    │
    └─ NON → Soumet le formulaire
```

### 4. Configuration des modales

**Paramètre LimeSurvey** : `showpopups`
- `1` : Afficher popup/modale
- `0` : Afficher sur la page
- `-1` : Ne rien afficher

**Dans le thème DSFR** : `config.xml`
```xml
<showpopups type="buttons">1|0|-1</showpopups>
```

## Diagnostic du problème

### Hypothèse 1 : La modale ne se déclenche pas

**Test** : Vérifier dans la console si ces logs apparaissent lors de la soumission :
```
DSFR: Modale Bootstrap en cours d'affichage détectée
```

**Si NON** → La modale Bootstrap n'est pas déclenchée par EM

**Causes possibles** :
- `showpopups` configuré sur `0` ou `-1`
- EM désactivé ou mal configuré
- Conflit JavaScript

### Hypothèse 2 : Les messages inline sont masqués

**Test** : Inspecter le DOM après soumission invalide
```javascript
document.querySelectorAll('.question-valid-container')
```

**Vérifier** :
- Les divs `.question-valid-container` existent ?
- Elles contiennent du texte ?
- Elles ont la classe `.ls-em-error` ?
- Sont-elles visibles (pas `display: none`) ?

### Hypothèse 3 : CSS masque les erreurs

**Vérifier dans `custom.css`** :
```css
.question-valid-container {
    display: none; /* ❌ Si présent, les messages sont masqués */
}
```

## Solutions proposées

### Solution 1 : Validation DSFR complète (recommandée)

**Objectif** : Remplacer complètement le système de validation par un système DSFR natif

**Avantages** :
- ✅ Conformité DSFR totale
- ✅ Messages inline + alerte globale
- ✅ Questions en erreur mises en évidence
- ✅ Meilleure UX

**Composants DSFR à utiliser** :

1. **Messages d'erreur inline** : `fr-error-text`
```html
<div class="fr-input-group fr-input-group--error">
    <label class="fr-label" for="question-1">Question obligatoire</label>
    <input class="fr-input fr-input--error" type="text" id="question-1">
    <p class="fr-error-text">
        Cette question est obligatoire
    </p>
</div>
```

2. **Alerte globale** : `fr-alert fr-alert--error` (déjà implémenté)

3. **Scroll automatique** vers la première erreur

**Implémentation** :

```javascript
// Dans theme.js
function validateFormDSFR(form) {
    // 1. Récupérer tous les champs obligatoires
    const requiredFields = form.querySelectorAll('[required], .mandatory');

    let firstError = null;
    let errorMessages = [];

    // 2. Valider chaque champ
    requiredFields.forEach(function(field) {
        if (!field.value || field.value.trim() === '') {
            // Marquer comme erreur
            const inputGroup = field.closest('.fr-input-group, .question-container');
            if (inputGroup) {
                inputGroup.classList.add('fr-input-group--error');
                field.classList.add('fr-input--error');

                // Ajouter message d'erreur
                let errorMsg = inputGroup.querySelector('.fr-error-text');
                if (!errorMsg) {
                    errorMsg = document.createElement('p');
                    errorMsg.className = 'fr-error-text';
                    errorMsg.textContent = 'Cette question est obligatoire';
                    field.parentNode.appendChild(errorMsg);
                }

                errorMessages.push({
                    field: field,
                    message: 'Question ' + field.getAttribute('name') + ' : obligatoire'
                });

                if (!firstError) firstError = inputGroup;
            }
        }
    });

    // 3. Si erreurs, afficher alerte globale
    if (errorMessages.length > 0) {
        const summary = errorMessages.map(e => e.message).join('\n');
        showDsfrAlert(
            'Formulaire incomplet',
            errorMessages.length + ' question(s) obligatoire(s) non remplie(s)',
            null
        );

        // 4. Scroll vers la première erreur
        if (firstError) {
            firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }

        return false; // Empêcher soumission
    }

    return true; // Autoriser soumission
}
```

### Solution 2 : Améliorer le système existant

**Objectif** : Garder EM mais styliser en DSFR

**Fichier** : `custom.css`

```css
/* Mettre en évidence les questions en erreur */
.question-container.has-error {
    border-left: 4px solid var(--error-425);
    background-color: var(--background-contrast-error);
}

/* Messages d'erreur inline DSFR */
.question-valid-container .ls-em-error {
    display: block;
    color: var(--error-425);
    font-size: 0.875rem;
    margin-top: 0.25rem;
    padding: 0.5rem 1rem;
    background-color: var(--background-contrast-error);
    border-left: 4px solid var(--error-425);
}

/* Input en erreur */
input.error,
textarea.error,
select.error {
    border-color: var(--error-425) !important;
    background-color: var(--background-contrast-error);
}
```

**JavaScript** : Détecter quand EM ajoute les erreurs

```javascript
// Observer les changements dans .question-valid-container
const validationObserver = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        const container = mutation.target;

        // Si erreur ajoutée
        if (container.querySelector('.ls-em-error')) {
            // Mettre en évidence la question
            const questionContainer = container.closest('.question-container');
            if (questionContainer) {
                questionContainer.classList.add('has-error');
                questionContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    });
});

// Observer tous les conteneurs de validation
document.querySelectorAll('.question-valid-container').forEach(function(container) {
    validationObserver.observe(container, {
        childList: true,
        subtree: true
    });
});
```

## Tests à effectuer

### Test 1 : Vérifier si EM fonctionne

1. Ouvrir la console
2. Soumettre formulaire avec champ obligatoire vide
3. Chercher dans la console :
   ```
   ExpressionManager
   EM_javascript
   LEMval
   ```

### Test 2 : Vérifier les messages inline

```javascript
// Dans la console après soumission invalide
document.querySelectorAll('.question-valid-container').forEach(c => {
    console.log('Container:', c);
    console.log('Contenu:', c.innerHTML);
    console.log('Visible:', window.getComputedStyle(c).display);
});
```

### Test 3 : Forcer l'affichage d'un message d'erreur

```javascript
// Test manuel dans la console
const container = document.querySelector('.question-valid-container');
if (container) {
    container.innerHTML = '<span class="ls-em-error">TEST: Cette question est obligatoire</span>';
}
```

## Recommandation

**Option recommandée** : Solution 1 (Validation DSFR complète)

**Pourquoi ?**
- Contrôle total sur l'UX
- Conformité DSFR garantie
- Pas de dépendance à EM qui peut changer
- Messages inline + alerte globale
- Scroll automatique vers les erreurs

**Prochaines étapes** :

1. **Diagnostiquer** : Exécuter les tests ci-dessus
2. **Implémenter** : Système de validation DSFR complet
3. **Tester** : Tous les types de questions
4. **Documenter** : Guide utilisateur

---

**Date** : 2024-11-16
**Auteur** : Bertrand Matge
**Version** : 1.0
