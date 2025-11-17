# Conversion des modales Bootstrap en alertes DSFR

## Contexte

Les modales Bootstrap utilisées par LimeSurvey pour les messages de validation posaient des problèmes :
- Difficiles à fermer
- Incompatibles avec le design DSFR
- Problèmes de superposition et de backdrop

## Solution implémentée

Conversion automatique des modales Bootstrap en alertes DSFR affichées en haut de page.

## Architecture

### 1. Détection des modales

Le système utilise un `MutationObserver` pour détecter quand Bootstrap ajoute les classes `show` ou `in` sur une modale :

```javascript
// Observer les changements de classe sur les modales
const classObserver = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
            const modal = mutation.target;

            // Vérifier si c'est une modale Bootstrap qui devient visible
            if (modal.classList.contains('modal') &&
                (modal.classList.contains('show') || modal.classList.contains('in'))) {

                console.log('DSFR: Modale Bootstrap en cours d\'affichage détectée');
                interceptModalShow(modal);
            }
        }
    });
});
```

**Pourquoi cette approche ?**

Les modales Bootstrap existent déjà dans le DOM (vides), mais sont masquées par défaut. Elles deviennent visibles uniquement quand LimeSurvey ajoute dynamiquement les classes `show` ou `in`. On intercepte cet événement plutôt que d'observer les changements de contenu.

### 2. Deux types de messages

Le système détecte automatiquement deux types de messages de validation :

#### Type 1 : Erreur simple

- **Exemple** : "Veuillez remplir tous les champs obligatoires"
- **Détection** : Modale sans liens d'action dans le footer
- **Rendu** : Alerte DSFR rouge avec bouton "Fermer"

```html
<div class="fr-alert fr-alert--error dsfr-validation-alert" role="alert">
    <div class="fr-container">
        <h3 class="fr-alert__title">Erreur de validation</h3>
        <p>Veuillez remplir tous les champs obligatoires</p>
        <button class="fr-btn--close fr-btn fr-mt-2w">Fermer</button>
    </div>
</div>
```

#### Type 2 : Validation douce (soft mandatory)

- **Exemple** : "Cette question est obligatoire mais vous pouvez continuer sans répondre"
- **Détection** : Modale avec liens `<a>` dans `.modal-footer`
- **Rendu** : Alerte DSFR rouge avec boutons d'action

```html
<div class="fr-alert fr-alert--error dsfr-validation-alert" role="alert">
    <div class="fr-container">
        <h3 class="fr-alert__title">Question obligatoire</h3>
        <p>Cette question est obligatoire</p>
        <div class="fr-btns-group fr-btns-group--inline-sm fr-mt-2w">
            <button type="button" class="fr-btn">Continuer sans répondre</button>
            <button type="button" class="fr-btn fr-btn--secondary">Répondre à la question</button>
        </div>
    </div>
</div>
```

### 3. Conversion modale → alerte

```javascript
function interceptModalShow(modal) {
    const modalBody = modal.querySelector('.modal-body');
    const content = modalBody.textContent.trim();
    const titleElement = modal.querySelector('.modal-title');
    const title = titleElement ? titleElement.textContent.trim() : '';

    // Détecter le type selon la présence de liens dans le footer
    const modalFooter = modal.querySelector('.modal-footer');
    const footerLinks = modalFooter ? modalFooter.querySelectorAll('a') : [];

    if (footerLinks.length > 0) {
        // Validation douce : récupérer les actions
        const actions = [];
        footerLinks.forEach(function(link) {
            actions.push({
                text: link.textContent.trim(),
                id: link.id,
                onclick: link.onclick,
                dataAttributes: { dismiss: link.getAttribute('data-bs-dismiss') }
            });
        });

        showDsfrAlert(title, content, actions);
    } else {
        // Erreur simple
        showDsfrAlert(title, content);
    }

    // Masquer la modale Bootstrap
    cleanupModal(modal);
}
```

### 4. Fonction `showDsfrAlert()`

Signature :
```javascript
function showDsfrAlert(title, message, actions)
```

**Paramètres** :
- `title` (string) : Titre de l'alerte
- `message` (string) : Contenu du message
- `actions` (Array, optionnel) : Tableau d'objets décrivant les boutons d'action
  - Chaque action : `{ text, id, href, onclick, dataAttributes }`

**Fonctionnalités** :
- Supprime les anciennes alertes avant d'afficher la nouvelle
- Insère l'alerte en haut du conteneur principal
- Fait défiler la page jusqu'à l'alerte
- Auto-fermeture après 10s (erreur simple) ou 15s (validation douce)
- Préserve les gestionnaires d'événements `onclick` originaux
- Protection XSS avec `escapeHtml()`

## Styles CSS

### Animations

```css
/* Alerte de validation convertie depuis modale Bootstrap */
.dsfr-validation-alert {
    margin-bottom: 2rem;
    animation: slideDown 0.3s ease-out;
}

@keyframes slideDown {
    from {
        opacity: 0;
        transform: translateY(-20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Animation de fade-out */
.fr-alert--fade-out {
    animation: fadeOut 0.5s ease-out forwards;
}
```

### Groupe de boutons

```css
.fr-alert .fr-btns-group {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-top: 1rem;
}

/* Responsive : boutons en colonne sur mobile */
@media (max-width: 576px) {
    .fr-alert .fr-btns-group {
        flex-direction: column;
    }

    .fr-alert .fr-btns-group button {
        width: 100%;
    }
}
```

### Masquage des modales Bootstrap

```css
/* Masquer la modale Bootstrap par défaut */
.modal {
    display: none !important;
}

/* Supprimer le backdrop Bootstrap */
.modal-backdrop {
    display: none !important;
}
```

## Nettoyage des modales

Fonction `cleanupModal()` appelée systématiquement pour :

1. Retirer toutes les classes Bootstrap (`show`, `in`, `fade`, `modal`)
2. Masquer la modale (`display: none`, `aria-hidden="true"`)
3. Supprimer le backdrop (`.modal-backdrop`)
4. Retirer la classe `modal-open` du body

```javascript
function cleanupModal(modal) {
    if (!modal) return;

    // Retirer TOUTES les classes Bootstrap
    modal.classList.remove('show', 'in', 'fade', 'modal');
    modal.setAttribute('aria-hidden', 'true');
    modal.style.display = 'none';

    // Supprimer le backdrop
    const backdrop = document.querySelector('.modal-backdrop');
    if (backdrop) {
        backdrop.remove();
    }

    // Retirer modal-open du body
    document.body.classList.remove('modal-open');
}
```

## Fichiers modifiés

### JavaScript
- **themes/survey/dsfr/scripts/theme.js**
  - `initBootstrapModalFallback()` (lignes 300-471)
  - `showDsfrAlert(title, message, actions)` (lignes 473-594)
  - `escapeHtml(text)` (lignes 596-600)

### CSS
- **themes/survey/dsfr/css/custom.css**
  - Alertes DSFR (lignes 390-452)
  - Animations `slideDown` et `fadeOut`
  - Groupe de boutons responsive
  - Masquage des modales Bootstrap

## Tests recommandés

1. **Erreur simple** : Soumettre un formulaire avec des champs obligatoires vides
   - Vérifier que l'alerte s'affiche en haut de page
   - Vérifier que le bouton "Fermer" fonctionne
   - Vérifier l'auto-fermeture après 10s

2. **Validation douce** : Configurer une question en "soft mandatory"
   - Vérifier que l'alerte affiche les deux boutons d'action
   - Vérifier que "Continuer sans répondre" permet de passer à la question suivante
   - Vérifier que "Répondre à la question" ferme l'alerte et scroll vers la question

3. **Responsive** : Tester sur mobile
   - Vérifier que les boutons s'affichent en colonne sur petit écran
   - Vérifier le scroll vers l'alerte

4. **Modales multiples** : Déclencher plusieurs erreurs consécutives
   - Vérifier que seule la dernière alerte est affichée
   - Vérifier qu'aucun backdrop Bootstrap n'apparaît

## Avantages

✅ **UX améliorée** : Message visible en haut de page, pas de modale bloquante
✅ **Design DSFR** : Utilise les composants natifs DSFR (`fr-alert`, `fr-btn`)
✅ **Accessibilité** : `role="alert"`, boutons clairement identifiés
✅ **Responsive** : Boutons adaptés mobile/desktop
✅ **Animations fluides** : Slide down et fade out
✅ **Pas de conflit** : Modales Bootstrap complètement masquées et nettoyées

## Limitations

- Le système repose sur la structure HTML des modales Bootstrap générées par LimeSurvey
- Si LimeSurvey change la structure des modales, il faudra adapter le code de détection
- Les gestionnaires `onclick` originaux doivent être des fonctions JavaScript valides

## Compatibilité

- ✅ LimeSurvey 6.x
- ✅ DSFR 1.11+
- ✅ Navigateurs modernes (Chrome, Firefox, Safari, Edge)
- ✅ Mobile et desktop
- ✅ Mode clair et mode sombre DSFR

---

**Date de création** : 2024-11-16
**Auteur** : Bertrand Matge
**Version** : 1.0
