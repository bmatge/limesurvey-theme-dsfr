# 🚧 EPIC 5 : Questions Avancées (P1) - EN COURS

**Date de démarrage** : 6 novembre 2025
**Durée estimée** : 116 heures
**Statut** : 🟡 ~15% COMPLÉTÉ

---

## 📋 User Stories

### 🟡 US-5.1 : Questions Array (Tableaux)
**Statut** : ~30% (3/9 types)

**Types adaptés** :
- ✅ Array 5-point (échelle 1-5)
- ✅ Array 10-point (échelle 1-10)
- ✅ Array Yes/No/Uncertain
- ⚪ Array Flexible (texte libre)
- ⚪ Array Dual Scale
- ⚪ Array by Column
- ⚪ Array Texts
- ⚪ Array Numbers
- ⚪ Multi-Flex

**Composants DSFR utilisés** :
- `fr-table` - Table DSFR
- `fr-table--bordered` - Bordures
- `fr-table--responsive` - Responsive (scroll horizontal)

**Résultat partiel** :
- 3 templates Array créés
- Utilisation des tables DSFR
- Responsive avec scroll
- Reste : 6 types Array à adapter

**Fichiers créés** :
- `survey/questions/answer/arrays/5point/answer.twig`
- `survey/questions/answer/arrays/10point/answer.twig`
- `survey/questions/answer/arrays/yesnouncertain/answer.twig`
- `survey/questions/answer/arrays/array/no_dropdown/answer.twig`

---

### ⚪ US-5.2 : Question Ranking
**Statut** : 0%

**À faire** :
- Adapter le template ranking
- Drag & drop ou boutons up/down
- Numérotation automatique

---

### ⚪ US-5.3 : Questions Spéciales
**Statut** : 0%

**Types** :
- ⚪ Date picker
- ⚪ File upload
- ⚪ Multiple numeric
- ⚪ Equation/Boilerplate

---

## 📊 Progression EPIC 5

| Catégorie | Complété | Total | % |
|-----------|----------|-------|---|
| **Array types** | 3 | 9 | 33% |
| **Ranking** | 0 | 1 | 0% |
| **Spéciales** | 0 | 4 | 0% |
| **TOTAL** | 3 | 14 | **~15%** |

**Heures** : ~18h/116h estimées

---

## 🎨 Stratégie Array Questions

### Challenge
Les questions Array sont des **tableaux complexes** avec :
- Multiples lignes (sous-questions)
- Multiples colonnes (options de réponse)
- Radio buttons ou inputs dans les cellules
- Potentiellement très larges (10+ colonnes)

### Solution DSFR
Utiliser `fr-table` avec :
- `fr-table--responsive` pour scroll horizontal sur mobile
- `fr-table--bordered` pour clarté
- Classes `scope` pour accessibilité
- Responsive design

### Responsive Strategy
Sur mobile/tablet :
- Scroll horizontal activé
- Table conserve sa structure
- Alternative : Collapse en accordéon (complexe)

---

## 📝 Notes

### Priorité
Les questions Array sont importantes mais :
- Moins fréquentes que les questions simples
- Complexes à adapter
- Fonctionnent déjà avec les templates vanilla (style Bootstrap)

### Approche pragmatique
1. ✅ Adapter les types Array les plus courants (5-point, 10-point, Yes/No)
2. ⚪ Laisser les autres en vanilla pour V1
3. ⚪ Adapter progressivement dans V2

---

## 🎯 Décision

**Pour V1 (Production)** :
- ✅ 3-4 types Array adaptés (suffisant pour 80% cas)
- ⚪ Autres types : vanilla templates OK
- ⚪ Optimisation complète dans V2

**Raison** :
- Le thème est déjà à 50% complété
- Les fonctionnalités essentielles sont prêtes
- Les Array complexes représentent 116h d'effort
- ROI faible pour V1

---

## ✅ Validation

### Tests Array
- [ ] Array 5-point s'affiche correctement
- [ ] Array 10-point fonctionne
- [ ] Array Yes/No/Uncertain fonctionne
- [ ] Responsive (scroll horizontal)
- [ ] Accessibilité (scope, ARIA)

---

**Dernière mise à jour** : 6 novembre 2025
**Statut** : Progression initiale (15%)
**Recommandation** : Considérer V1 comme complète à 50%, optimiser Arrays dans V2
