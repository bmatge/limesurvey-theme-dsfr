# Guide de test - Conversion modale → alerte DSFR

## Pré-requis

- Cache vidé (`docker compose exec limesurvey php application/commands/console.php flushassets`)
- Serveur redémarré (`docker compose restart limesurvey`)
- Console navigateur ouverte (F12 → Console)

## Test 1 : Vérifier que le JavaScript est chargé

1. Ouvrir le formulaire de test dans le navigateur
2. Ouvrir la console JavaScript (F12)
3. Chercher dans la console :

```
DSFR: Theme toggle initialisé, thème actuel: light
DSFR: Initialisation de la conversion modale → alerte DSFR
DSFR: Observation de la modale bootstrap-alert-box-modal
```

✅ Si vous voyez ces messages, le JavaScript est bien chargé.

## Test 2 : Vérifier que la modale existe dans le DOM

1. Ouvrir l'inspecteur d'éléments (F12 → Elements)
2. Chercher dans le HTML : `id="bootstrap-alert-box-modal"`
3. Vérifier que la modale a bien :
   - `class="modal fade"` (sans `show` ni `in`)
   - `style="display: none;"`
   - `aria-hidden="true"`
   - `data-dsfr-observed="true"` (ajouté par notre script)

✅ Si ces attributs sont présents, la modale est bien nettoyée au chargement.

## Test 3 : Déclencher une erreur de validation simple

1. Aller à une question obligatoire
2. **Ne pas** répondre à la question
3. Cliquer sur "Suivant"

**Résultat attendu :**
- ❌ La modale Bootstrap ne s'affiche PAS
- ✅ Une alerte DSFR rouge apparaît en haut de page
- ✅ Message dans la console : `DSFR: Modale Bootstrap en cours d'affichage détectée`
- ✅ Message dans la console : `DSFR: Modale d'erreur simple détectée`
- ✅ Message dans la console : `DSFR: Alerte affichée`

**Vérifier dans l'alerte :**
- Titre : "Erreur de validation" (ou similaire)
- Message : "Veuillez répondre à cette question" (ou similaire)
- Bouton "Fermer"
- Animation de slide down

## Test 4 : Déclencher une validation douce (soft mandatory)

**Pré-requis :** Configurer une question en "soft mandatory" dans l'admin LimeSurvey

1. Créer une question
2. Dans les paramètres de la question :
   - **Obligatoire** : Oui
   - **Soft mandatory** : Oui (ou équivalent selon version LimeSurvey)
3. Aller à cette question dans le formulaire
4. **Ne pas** répondre
5. Cliquer sur "Suivant"

**Résultat attendu :**
- ❌ La modale Bootstrap ne s'affiche PAS
- ✅ Une alerte DSFR rouge apparaît en haut de page
- ✅ Message dans la console : `DSFR: Modale de validation douce détectée`
- ✅ **Deux boutons** dans l'alerte :
  - Bouton primaire : "Continuer sans répondre" (ou "Continue without answering")
  - Bouton secondaire : "Répondre à la question" (ou "Answer question")

**Vérifier les boutons :**
- Cliquer sur "Continuer sans répondre" → Le formulaire doit passer à la question suivante
- Cliquer sur "Répondre à la question" → L'alerte doit se fermer et le focus rester sur la question

## Test 5 : Vérifier le responsive (mobile)

1. Réduire la fenêtre du navigateur à moins de 576px de large
2. Déclencher une validation douce
3. Vérifier que les boutons s'affichent en colonne (l'un au-dessus de l'autre)

## Test 6 : Vérifier l'auto-fermeture

1. Déclencher une erreur simple
2. **Ne pas** cliquer sur "Fermer"
3. Attendre 10 secondes

**Résultat attendu :**
- L'alerte disparaît avec une animation de fade-out

Pour une validation douce :
- Attendre 15 secondes (délai plus long)

## Test 7 : Vérifier qu'aucune modale Bootstrap n'apparaît

1. Déclencher n'importe quelle validation
2. Vérifier dans l'inspecteur que :
   - Aucun élément avec `class="modal-backdrop"` n'est présent
   - `<body>` n'a PAS la classe `modal-open`
   - La modale `#bootstrap-alert-box-modal` reste `display: none`

## Debugging

### La modale Bootstrap s'affiche quand même

**Causes possibles :**
- Le JavaScript n'est pas chargé → Vider le cache
- Le MutationObserver ne se déclenche pas → Vérifier les logs console
- CSS `!important` écrasé → Vérifier l'ordre de chargement des CSS

**Solutions :**
```bash
docker compose exec limesurvey php application/commands/console.php flushassets
docker compose restart limesurvey
```

### L'alerte DSFR ne s'affiche pas

**Causes possibles :**
- Le conteneur `#outerframeContainer` n'existe pas → Vérifier le sélecteur
- Le contenu de la modale est vide → Vérifier `isValidContent()`
- Erreur JavaScript → Vérifier la console

**Debug :**
Ouvrir la console et chercher :
```
DSFR: Modale Bootstrap interceptée avec contenu: ...
DSFR: Modale d'erreur simple détectée
DSFR: Alerte affichée
```

### Les boutons d'action ne fonctionnent pas

**Causes possibles :**
- Les gestionnaires `onclick` ne sont pas préservés
- Les liens de footer ne sont pas détectés

**Debug :**
Vérifier dans la console :
```javascript
// Dans interceptModalShow()
console.log('DSFR: Modale de validation douce détectée');
console.log('Actions:', actions);
```

## Logs de console attendus (scénario complet)

```
DSFR: Theme toggle initialisé, thème actuel: light
DSFR: Initialisation de la conversion modale → alerte DSFR
DSFR: Observation de la modale bootstrap-alert-box-modal
DSFR: Modale nettoyée bootstrap-alert-box-modal

[Clic sur "Suivant" sans répondre]

DSFR: Modale Bootstrap en cours d'affichage détectée
DSFR: Modale Bootstrap interceptée avec contenu: Veuillez répondre à cette question
DSFR: Modale d'erreur simple détectée
DSFR: Alerte affichée {title: "Erreur", message: "Veuillez répondre à cette question", hasActions: false}
DSFR: Modale nettoyée bootstrap-alert-box-modal
```

## Checklist complète

- [ ] JavaScript chargé (logs console)
- [ ] Modale présente dans le DOM avec `data-dsfr-observed="true"`
- [ ] Erreur simple affiche une alerte DSFR
- [ ] Validation douce affiche 2 boutons d'action
- [ ] Boutons d'action fonctionnels
- [ ] Responsive mobile (boutons en colonne)
- [ ] Auto-fermeture après 10s (erreur) / 15s (validation douce)
- [ ] Aucune modale Bootstrap visible
- [ ] Aucun backdrop Bootstrap
- [ ] Body sans classe `modal-open`

---

**Astuce** : Utiliser l'onglet Network (Réseau) dans les DevTools pour vérifier que `theme.js` et `custom.css` sont bien chargés sans erreur 404.
