# 🐛 Issues Connues - Thème DSFR

**Version** : 0.4 (36% complété)
**Dernière mise à jour** : 6 novembre 2025

---

## ✅ Issues Résolues

### 1. Fond de page gris
**Statut** : ✅ RÉSOLU
**Problème** : Le fond de la page était gris (hérité de Bootstrap)
**Solution** : Ajout de `background-color: #FFFFFF !important;` sur `body`, `html` et `article`
**Fichier** : [css/theme.css](css/theme.css)

### 2. Conflits CSS Bootstrap/DSFR
**Statut** : ✅ RÉSOLU (partiellement)
**Problème** : Classes Bootstrap entraient en conflit avec DSFR
**Solution** : Section "NEUTRALISATION BOOTSTRAP" ajoutée dans theme.css
- Neutralisation de `.bg-light`, `.navbar`, `.container`, `.btn`
- Reset des styles Bootstrap qui interfèrent
**Fichier** : [css/theme.css](css/theme.css)

### 3. Stepper avec progression continue
**Statut** : ✅ AMÉLIORÉ
**Problème** : Le stepper DSFR attend des étapes discrètes, pas un pourcentage continu
**Solution** : Utilise maintenant le nombre de groupes de questions comme étapes
- `totalGroups` = nombre de groupes de questions
- `currentGroup` = groupe actuel
- Affiche toujours le pourcentage pour info
**Fichier** : [views/subviews/header/progress_bar.twig](views/subviews/header/progress_bar.twig)

---

## ⚠️ Issues Connues

### 1. Scroll vers le haut lors du clic sur radio/checkbox dans tableaux Array
**Statut** : ⚠️ LIMITATION LIMESURVEY - Non résolvable facilement
**Priorité** : P3 - Impact UX mineur
**Problème** : Lors du clic sur un radio/checkbox dans un tableau Array, la page scroll automatiquement vers le haut
**Cause racine** : Comportement natif de LimeSurvey lié aux IDs `javatbd*` utilisés comme ancres + fonction `checkconditions()`
**Impact** : UX légèrement dégradée dans les tableaux Array - utilisateur doit rescroller manuellement
**Tentatives de fix** :
- ✅ Override `scrollTo()`, `scrollBy()`, `scrollIntoView()` - Inefficace
- ✅ Override `focus()` avec `preventScroll: true` - Inefficace
- ✅ Blocage événements `ClassChangeError`/`ClassChangeGood` - Inefficace
- ✅ `scroll-behavior: auto` - Inefficace
- ✅ Restaurations multiples position (0ms, 10ms, 50ms, 100ms) - Inefficace

**Conclusion** : Le scroll semble être un comportement profondément ancré dans le core LimeSurvey, probablement lié au système d'ancres ou à un mécanisme bas-niveau du navigateur.

**Workaround** : Aucun actuellement - les utilisateurs doivent rescroller manuellement
**Fix potentiel V2** : Modifier le core LimeSurvey pour ne plus utiliser d'ancres, ou patcher la fonction `checkconditions()`
**Acceptabilité** : Acceptable pour V1 - défaut mineur, ne bloque pas l'utilisation

---

## ⚠️ Autres Issues Connues

### 4. Index des questions (Modal) non fonctionnel
**Statut** : ⚠️ CONNU - À faire dans EPIC 4
**Priorité** : P1 - Important
**Problème** : Le bouton "Index des questions" utilise Bootstrap modal (`data-bs-toggle="modal"`)
**Impact** : Le modal ne s'ouvre pas (Bootstrap JS non chargé, DSFR JS utilisé)
**Solution prévue** :
1. Créer un modal DSFR pour l'index des questions
2. Remplacer `data-bs-toggle` par `data-fr-opened`
3. Adapter le template `question_index_menu.twig`

**Fichiers à modifier** :
- `views/subviews/navigation/question_index_menu.twig`
- `views/subviews/navigation/question_index_buttons.twig`

**EPIC concerné** : EPIC 4 - Messages & Workflow

**Workaround temporaire** : Désactiver l'index des questions dans les paramètres d'enquête

---

### 5. Certains composants Bootstrap encore chargés
**Statut** : ⚠️ CONNU
**Priorité** : P2 - Nice to have
**Problème** : Le thème hérite de `vanilla` qui charge Bootstrap
**Impact** : Fichiers CSS/JS Bootstrap chargés inutilement (performance)
**Solution prévue** :
1. Option A : Ne plus hériter de vanilla dans config.xml
2. Option B : Override complet des assets dans config.xml
3. Option C : Charger uniquement les composants Bootstrap nécessaires

**Fichier concerné** : [config.xml](config.xml)

**EPIC concerné** : EPIC 6 - Polish & Optimisation

---

### 6. Menu mobile (fr-modal) pourrait ne pas fonctionner
**Statut** : ⚠️ À TESTER
**Priorité** : P1 - Important
**Problème** : Le menu modal mobile utilise `data-fr-opened` du DSFR
**Impact** : Le menu pourrait ne pas s'ouvrir si le JS DSFR n'est pas correctement initialisé
**Test requis** : Tester sur mobile/responsive

**Solution si problème** :
- Vérifier que le DSFR JS est bien chargé et initialisé
- Ajouter un script d'initialisation spécifique pour les modals

**Fichier concerné** : [views/subviews/header/nav_bar.twig](views/subviews/header/nav_bar.twig)

---

### 7. Variables LimeSurvey manquantes pour le stepper
**Statut** : ⚠️ À VÉRIFIER
**Priorité** : P2
**Problème** : Les variables `aSurveyInfo.aGroups`, `aSurveyInfo.step` peuvent ne pas exister
**Impact** : Le stepper peut afficher des valeurs incorrectes
**Solution** : Fallback sur `aSurveyInfo.totalsteps` et calcul approximatif

**Fichier concerné** : [views/subviews/header/progress_bar.twig](views/subviews/header/progress_bar.twig)

**Note** : Nécessite tests avec différents formats d'enquête (group by group, question by question, all in one)

---

## 🔧 Améliorations Futures

### Performance
- [ ] Minimiser/bundler les assets CSS/JS
- [ ] Lazy load du DSFR JS
- [ ] Héberger DSFR localement (npm) au lieu de CDN
- [ ] Supprimer complètement Bootstrap

### Accessibilité
- [ ] Audit RGAA complet
- [ ] Tester avec lecteur d'écran
- [ ] Vérifier contraste des couleurs
- [ ] Améliorer les messages d'erreur

### UX
- [ ] Ajouter des animations DSFR
- [ ] Améliorer le feedback visuel
- [ ] Loading states pour les boutons
- [ ] Toast notifications DSFR

### Compatibilité
- [ ] Tester tous les formats d'enquête (group/question/all-in-one)
- [ ] Tester toutes les langues
- [ ] Tester sur différents navigateurs
- [ ] Tester accessibilité clavier complète

---

## 📝 Notes de Développement

### Pour debugger les variables LimeSurvey
Ajouter dans `layout_global.twig` avant `</body>` :
```twig
{% if aSurveyInfo.debug %}
    {{ dump(aSurveyInfo) }}
{% endif %}
```

Activer le debug dans `application/config/config.php` :
```php
$config['debugsql'] = 1;
```

### Variables utiles pour le stepper
- `aSurveyInfo.progress.value` - Pourcentage de complétion
- `aSurveyInfo.groupname` - Nom du groupe actuel
- `aSurveyInfo.totalsteps` - Nombre total d'étapes
- `aSurveyInfo.step` - Étape actuelle
- `aSurveyInfo.aGroups` - Liste des groupes (si disponible)
- `aSurveyInfo.format` - Format d'enquête (G=group, Q=question, A=all-in-one)

---

## 🎯 Roadmap de Résolution

### Court terme (cette semaine)
1. ✅ Fond de page blanc
2. ✅ Conflits CSS Bootstrap neutralisés
3. ✅ Stepper amélioré avec groupes

### Moyen terme (EPIC 4)
4. ⚪ Index des questions avec modal DSFR
5. ⚪ Save/Load avec modals DSFR
6. ⚪ Alertes et messages DSFR

### Long terme (EPIC 6)
7. ⚪ Supprimer complètement Bootstrap
8. ⚪ Optimisation performance
9. ⚪ Certification RGAA

---

## 🧪 Tests Requis

### Tests prioritaires
- [ ] Tester le stepper avec enquête multi-groupes
- [ ] Tester le stepper avec enquête question-by-question
- [ ] Tester le menu mobile sur smartphone
- [ ] Vérifier le fond blanc sur toutes les pages
- [ ] Tester avec mode sombre (data-fr-theme="dark")

### Tests accessibilité
- [ ] Navigation clavier
- [ ] Lecteur d'écran
- [ ] Contraste des couleurs
- [ ] Focus visible

---

## 📧 Rapport de Bug

Pour signaler un bug :
1. Vérifier qu'il n'est pas déjà listé ci-dessus
2. Créer une issue sur GitHub
3. Inclure : navigateur, version LimeSurvey, étapes de reproduction
4. Joindre captures d'écran si possible

---

**Maintenu par** : Claude Code + Bertrand
**Contact** : GitHub Issues
