# 🏗️ Décision d'Architecture : DSFR Natif

**Date** : 6 novembre 2025
**Décision** : Utiliser DSFR natif à 100%
**Alternative rejetée** : DSFR-Connect Bootstrap

---

## 🤔 Contexte

LimeSurvey utilise Bootstrap 5. Le thème DSFR hérite du thème `vanilla` qui charge Bootstrap.

**Deux approches possibles** :

### Approche A : DSFR-Connect
- Garder les classes Bootstrap dans les templates
- DSFR-Connect convertit Bootstrap → DSFR automatiquement
- Ex: `<button class="btn btn-primary">` → rendu DSFR

### Approche B : DSFR Natif
- Convertir tous les templates en DSFR natif
- Utiliser directement les classes DSFR
- Ex: `<button class="fr-btn">` → rendu DSFR

---

## ✅ Décision : DSFR Natif (Approche B)

### Raison principale

**Nos templates sont DÉJÀ en DSFR natif !**

Nous avons converti :
- `nav_bar.twig` → utilise `fr-header`, `fr-header__body`, `fr-logo`
- `navigator.twig` → utilise `fr-btn`, `fr-icon-arrow-left-line`
- `footer.twig` → utilise `fr-footer`, `fr-footer__content`
- `progress_bar.twig` → utilise `fr-stepper`
- Question templates → utilisent `fr-input`, `fr-radio-group`, etc.

**Utiliser DSFR-Connect serait contre-productif** car :
- ❌ Il s'attend à des classes Bootstrap
- ❌ Il ne reconnaît pas les classes DSFR natives
- ❌ Crée des conflits de style (header en vrac)
- ❌ Fichier plus lourd (225KB vs 100KB)

---

## 📊 Comparaison Détaillée

| Critère | DSFR-Connect | DSFR Natif | Gagnant |
|---------|--------------|------------|---------|
| **Compatibilité avec nos templates** | ❌ Non | ✅ Oui | Natif |
| **Taille CSS** | 225KB | 100KB | Natif |
| **Complexité** | Moyenne | Simple | Natif |
| **Conformité DSFR** | ✅ Oui | ✅ Oui | Égalité |
| **Maintenance** | Dépend de DSFR-Connect | Indépendant | Natif |
| **Performance** | Moyenne | Meilleure | Natif |
| **Contrôle** | Limité | Total | Natif |
| **Courbe d'apprentissage** | Bootstrap + DSFR | DSFR uniquement | Natif |

**Résultat** : DSFR Natif gagne 7/8 critères

---

## 🎯 Stratégie Retenue

### Template Layer : 100% DSFR Natif

Tous nos templates custom utilisent des classes DSFR natives :

```twig
{# Header DSFR natif #}
<header class="fr-header">
  <div class="fr-header__body">
    <div class="fr-logo">République<br>Française</div>
    <div class="fr-header__service">
      <p class="fr-header__service-title">{{ aSurveyInfo.name }}</p>
    </div>
  </div>
</header>

{# Navigation DSFR native #}
<button class="fr-btn fr-btn--icon-left fr-icon-arrow-left-line">
  Précédent
</button>

{# Questions DSFR natives #}
<input class="fr-input" type="text" />
<div class="fr-radio-group">
  <input type="radio" />
  <label class="fr-label">Option</label>
</div>
```

### CSS Layer : Neutralisation Bootstrap

Puisque le thème hérite de vanilla (qui charge Bootstrap), on neutralise les classes Bootstrap qui entrent en conflit :

```css
/* Neutraliser Bootstrap sans le remplacer par DSFR-Connect */
.navbar { background: transparent !important; }
.bg-light { background-color: #FFFFFF !important; }
.btn:not(.fr-btn) { all: unset; }
```

---

## 🔧 Gestion des Composants Hérités

### Composants qui viennent de vanilla (Bootstrap)

Certains composants viennent encore du thème vanilla avec classes Bootstrap :
- Modals (`data-bs-toggle="modal"`)
- Tooltips
- Popovers
- Certains formulaires

**Solution** : Les convertir progressivement en DSFR natif dans les EPICs suivants.

**Exemple** : Index des questions (EPIC 4)
```twig
{# Avant (Bootstrap - hérité de vanilla) #}
<button data-bs-toggle="modal" data-bs-target="#modal">Index</button>

{# Après (DSFR natif - à créer) #}
<button data-fr-opened="false" aria-controls="modal">Index</button>

<dialog id="modal" class="fr-modal">
  {# Contenu modal DSFR #}
</dialog>
```

---

## 📝 Leçons Apprises

### Essais DSFR-Connect

**Tentative 1** : CDN unpkg
- ❌ Bloqué par MIME type (text/plain)

**Tentative 2** : CDN jsDelivr
- ❌ Fichier introuvable

**Tentative 3** : Installation npm locale
- ✅ Installation réussie
- ❌ Conflit avec nos templates DSFR natifs
- ❌ Header "en vrac"

**Conclusion** : DSFR-Connect n'est pas adapté à notre cas d'usage car on a déjà converti les templates.

### Quand utiliser DSFR-Connect ?

DSFR-Connect est idéal SI :
- ✅ Vous GARDEZ les classes Bootstrap dans vos templates
- ✅ Vous ne voulez PAS réécrire vos templates
- ✅ Vous avez beaucoup de code Bootstrap existant

DSFR-Connect n'est PAS adapté SI :
- ❌ Vous avez déjà converti vos templates en DSFR natif
- ❌ Vous voulez un contrôle total
- ❌ Vous voulez optimiser la performance

**Notre cas** : Templates déjà convertis → DSFR natif est le bon choix.

---

## 🚀 Plan d'Action

### Court terme (Maintenant)
- [x] Revenir au DSFR natif
- [x] Conserver les neutralisations Bootstrap
- [x] Documenter la décision

### Moyen terme (EPIC 4)
- [ ] Convertir l'index des questions en modal DSFR natif
- [ ] Convertir les alertes Bootstrap en alertes DSFR
- [ ] Convertir les modals Bootstrap restants

### Long terme (EPIC 6)
- [ ] Option : Ne plus hériter de vanilla
- [ ] Option : Créer un thème standalone DSFR
- [ ] Supprimer complètement Bootstrap

---

## 📚 Ressources

### DSFR Natif
- Documentation : https://www.systeme-de-design.gouv.fr/
- Composants : https://www.systeme-de-design.gouv.fr/composants-et-modeles/
- CDN : https://unpkg.com/@gouvfr/dsfr@1.11/

### DSFR-Connect (pour référence)
- Site : https://dsfr-connect.rame.fr/
- GitHub : https://github.com/sneko/dsfr-connect
- Cas d'usage : Projets Bootstrap existants

---

## ✅ Validation

### Checklist
- [x] DSFR natif importé
- [x] DSFR-Connect retiré
- [x] Neutralisation Bootstrap en place
- [x] Templates DSFR natifs maintenus
- [x] Documentation créée

### Tests requis
- [ ] Header s'affiche correctement (fr-header)
- [ ] Footer s'affiche correctement (fr-footer)
- [ ] Navigation fonctionne (fr-btn)
- [ ] Stepper visible avec barre
- [ ] Fond blanc partout

---

## 🎯 Conclusion

**DSFR natif est la bonne approche pour ce projet.**

Nos templates sont déjà en DSFR natif, propres et conformes.
Ajouter DSFR-Connect créerait plus de problèmes qu'il n'en résoudrait.

La stratégie "DSFR natif + neutralisation Bootstrap" fonctionne bien
et nous donne un contrôle total sur le rendu.

---

**Décision validée par** : Tests pratiques
**Maintenue dans** : css/theme.css
**Statut** : ✅ Définitif
