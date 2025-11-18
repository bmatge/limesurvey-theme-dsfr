# EPIC : 100% Conformité DSFR - Plan d'Action Exhaustif

**Version** : 1.0
**Date de création** : 2025-11-17
**Portée** : Thème LimeSurvey DSFR (/themes/survey/dsfr/)
**Objectif** : Atteindre 100% de conformité au Système de Design de l'État Français
**Durée estimée** : 8 semaines (160 heures)

---

## Table des Matières

1. [Analyse de l'Existant](#1-analyse-de-lexistant)
2. [Définition de la Conformité 100%](#2-définition-de-la-conformité-100)
3. [Métriques & KPIs](#3-métriques--kpis)
4. [Plan d'Action par Phase](#4-plan-daction-par-phase)
5. [Roadmap & Sprints](#5-roadmap--sprints)
6. [Matrice de Priorisation](#6-matrice-de-priorisation)
7. [Risques & Mitigation](#7-risques--mitigation)
8. [Critères de Succès](#8-critères-de-succès)

---

## 1. Analyse de l'Existant

### 1.1 État Actuel du Thème

**Statistiques Globales**
- **Total fichiers** : 634
- **Total templates Twig** : 222
- **Total CSS/SCSS** : 12
- **Total lignes de code** : 16 751
- **Taille totale** : 13 MB
- **Version DSFR** : 1.11.0

**Structure du Thème**
```
dsfr/
├── css/               (3 fichiers, 3 435 lignes)
│   ├── theme.css      (2 513 lignes)
│   ├── custom.css     (767 lignes)
│   └── print_theme.css (155 lignes)
├── views/             (193 templates, 8 681 lignes)
├── survey/            (28 templates, 1 401 lignes)
├── question/          (1 template, 4 KB)
├── dsfr-dist/         (4.9 MB - Distribution DSFR)
├── files/             (2.4 MB - Backup & assets)
└── docs/              (31 fichiers, 324 KB)
```

### 1.2 Problèmes Identifiés

#### A. Classes Bootstrap Résiduelles

**Classes de grille Bootstrap** : 161 occurrences
```
- col-xs-*, col-sm-*, col-md-*, col-lg-* : 161 occurrences dans 70 fichiers
- Principalement dans printanswers/ (32 templates)
- Templates de questions (multiplechoice, listradio, etc.)
```

**Classes utilitaires Bootstrap** : 235 occurrences
```
- btn-default, btn-primary, btn-success, etc. : 235 occurrences dans 80 fichiers
- pull-left, pull-right : présentes dans plusieurs templates
- Classes d'alertes Bootstrap : alert, alert-danger, etc.
```

**Classes text-start/text-end** : 58 occurrences
```
- 29 fichiers concernés
- Principalement dans printanswers/question_types/ (27 templates)
- À remplacer par classes DSFR (fr-text-align-left/right)
```

#### B. Code Mort & Doublons

**Fichiers backup** : ~2.8 MB
```
- /files/dsfr.backup/ : 2.4 MB (CSS, JS, fonts dupliqués)
- /dsfr-dist/css/icons.min.css.backup : présent
- Répertoire /question/bootstrap_buttons/ : legacy code
```

**Distribution DSFR** : 4.9 MB
```
- Contenus potentiellement non utilisés
- Icônes embarquées (icons-embedded.min.css)
- Fonts en double (Marianne, Spectral)
```

**Documentation historique** : 324 KB
```
- 31 fichiers Markdown
- EPIC-1, EPIC-2, EPIC-3, EPIC-4, EPIC-5 complétés
- Doublons possibles entre STATUS.md et EPIC-*.md
```

#### C. Couplage Fort dans printanswers/

**32 templates de types de questions** dépendent de `printanswers_question.twig`
```
- template_array-*.twig (11 fichiers)
- template_list-*.twig (4 fichiers)
- template_multiple-*.twig (4 fichiers)
- template_text-*.twig (4 fichiers)
- template_choice-*.twig (1 fichier)
- template_date.twig, template_numeric.twig, etc.
```

**Problème** : Toute modification de `printanswers_question.twig` impacte 32 templates

#### D. Classes DSFR Partielles

**Classes DSFR présentes** : 720 occurrences dans 100 fichiers
```
- fr-btn, fr-input, fr-select : bien utilisées
- fr-checkbox, fr-radio : présentes
- fr-alert, fr-card, fr-badge : utilisées
- fr-grid, fr-container : présentes
```

**MAIS** : Coexistent avec classes Bootstrap, créant des conflits potentiels

#### E. Variables Dynamiques Non Documentées

**Templates avec variables complexes**
```
- multiplenumeric/rows/dynamic.twig (6 classes col-*)
- numerical/answer.twig (7 classes col-*)
- Utilisation de boucles et conditions non documentées
```

#### F. Imports CSS & Dépendances

**Import DSFR** : Via @import dans theme.css
```css
@import url('../dsfr-dist/css/dsfr.min.css');
@import url('../dsfr-dist/css/icons-embedded.min.css');
```

**Problème** : Aucun import Bootstrap explicite trouvé, mais présence de classes Bootstrap partout

#### G. TODO, FIXME, HACK dans le code

**43 occurrences** de marqueurs techniques
```
- TODO : 28 fichiers
- FIXME : présent
- HACK : présent
- BUG : présent
- XXX : présent
```

### 1.3 Points Positifs

**Structure propre**
- Architecture MVC bien organisée
- Séparation views/survey/question/css/scripts
- Configuration XML bien documentée

**DSFR bien intégré**
- Version 1.11.0 locale (pas de dépendance CDN)
- Composants DSFR natifs utilisés (fr-header, fr-footer, fr-btn)
- Design tokens DSFR respectés

**Documentation riche**
- 31 fichiers de documentation
- EPICs complétés (1-4)
- Guides de migration présents

**Accessibilité**
- Structure ARIA présente
- Focus visible
- Navigation clavier

---

## 2. Définition de la Conformité 100%

### 2.1 Critères de Conformité DSFR

**1. HTML Structurel**
- ✅ Utilisation exclusive des classes DSFR natives
- ✅ Structure sémantique conforme (fr-header, fr-footer, fr-container, etc.)
- ✅ Composants DSFR complets (fr-btn, fr-input, fr-alert, fr-card, etc.)

**2. CSS**
- ✅ Zéro classe Bootstrap
- ✅ Design tokens DSFR exclusifs
- ✅ Variables CSS custom uniquement pour extensions
- ✅ Import DSFR minifié uniquement

**3. JavaScript**
- ✅ DSFR.js utilisé pour composants interactifs
- ✅ Pas de Bootstrap.js
- ✅ Initialisation correcte des composants DSFR

**4. Accessibilité RGAA**
- ✅ Contraste minimum AA (4.5:1 texte, 3:1 UI)
- ✅ Navigation clavier complète
- ✅ Attributs ARIA corrects
- ✅ Landmarks ARIA

**5. Performance**
- ✅ Pas de code mort
- ✅ Assets optimisés (minifiés, compressés)
- ✅ Lazy loading si pertinent

**6. Maintenance**
- ✅ Documentation à jour
- ✅ Code commenté
- ✅ Pas de TODO/FIXME/HACK
- ✅ Tests de non-régression

### 2.2 Cible Quantifiable

**Objectifs Mesurables**

| Métrique | État Actuel | Cible | Écart |
|----------|-------------|-------|-------|
| Classes Bootstrap | 235 occurrences | 0 | -235 |
| Classes col-* Bootstrap | 161 occurrences | 0 | -161 |
| Classes text-start/end | 58 occurrences | 0 | -58 |
| Classes DSFR (fr-*) | 720 occurrences | 1000+ | +280 |
| Code mort (MB) | 2.8 MB | 0 MB | -2.8 MB |
| TODO/FIXME/HACK | 43 occurrences | 0 | -43 |
| Taille distribution | 13 MB | <8 MB | -5 MB |
| Couverture DSFR | ~70% | 100% | +30% |
| Score accessibilité | Non mesuré | 95/100 | - |

---

## 3. Métriques & KPIs

### 3.1 KPIs Techniques

**KPI 1 : Taux de conformité des classes CSS**
```
Formule : (Classes DSFR / Total classes) × 100
Objectif : 100%
Mesure : Scan automatique via grep
Fréquence : Hebdomadaire
```

**KPI 2 : Taux d'élimination du code mort**
```
Formule : (Taille supprimée / Taille initiale mort) × 100
Objectif : 100% (2.8 MB supprimés)
Mesure : du -sh avant/après
Fréquence : Par phase
```

**KPI 3 : Nombre de classes Bootstrap résiduelles**
```
Formule : Count(grep -r "btn-default|col-xs|pull-left" .)
Objectif : 0
Mesure : grep -r + wc -l
Fréquence : Hebdomadaire
```

**KPI 4 : Couverture des composants DSFR**
```
Formule : (Composants DSFR utilisés / Composants DSFR applicables) × 100
Objectif : 100%
Mesure : Audit manuel + checklist
Fréquence : Fin de sprint
```

**KPI 5 : Score d'accessibilité RGAA**
```
Formule : Audit RGAA automatique (pa11y, axe-core)
Objectif : 95/100 (niveau AA)
Mesure : pa11y-ci ou Lighthouse
Fréquence : Fin de sprint
```

### 3.2 KPIs Qualité

**KPI 6 : Dette technique**
```
Formule : Count(TODO + FIXME + HACK + BUG + XXX)
Objectif : 0
Mesure : grep -r "TODO|FIXME|HACK"
Fréquence : Hebdomadaire
```

**KPI 7 : Taux de duplication de code**
```
Formule : Analyse via jscpd ou similaire
Objectif : <5%
Mesure : jscpd --threshold 5
Fréquence : Fin de phase
```

**KPI 8 : Couverture de la documentation**
```
Formule : (Fonctions documentées / Total fonctions) × 100
Objectif : 100%
Mesure : Audit manuel
Fréquence : Fin de sprint
```

### 3.3 Métriques de Validation

**Tests de non-régression**
- ✅ Tous les types de questions fonctionnels
- ✅ Navigation clavier opérationnelle
- ✅ Modales DSFR fonctionnelles
- ✅ Responsive mobile/tablet/desktop
- ✅ Mode sombre/clair opérationnel

**Performance**
- ✅ First Contentful Paint < 1.5s
- ✅ Time to Interactive < 3s
- ✅ Cumulative Layout Shift < 0.1
- ✅ Bundle CSS < 300 KB
- ✅ Bundle JS < 200 KB

---

## 4. Plan d'Action par Phase

### Phase 1 : Nettoyage & Préparation (Semaine 1-2, 30h)

**Objectif** : Supprimer le code mort, les doublons, préparer le terrain

#### Tâche 1.1 : Supprimer les fichiers backup (2h)
**Risque** : LOW
**Fichiers à supprimer** :
```
- /themes/survey/dsfr/files/dsfr.backup/ (2.4 MB)
- /themes/survey/dsfr/dsfr-dist/css/icons.min.css.backup
```

**Actions** :
1. Vérifier que DSFR est bien chargé depuis dsfr-dist/
2. Supprimer le dossier files/dsfr.backup/
3. Supprimer icons.min.css.backup
4. Git commit avec message explicite

**Test de validation** :
- Enquête test : tous les composants s'affichent correctement
- Pas d'erreur 404 dans la console navigateur

**Commande** :
```bash
rm -rf /themes/survey/dsfr/files/dsfr.backup/
rm /themes/survey/dsfr/dsfr-dist/css/icons.min.css.backup
```

---

#### Tâche 1.2 : Supprimer le répertoire bootstrap_buttons (1h)
**Risque** : LOW
**Fichiers à supprimer** :
```
- /themes/survey/dsfr/question/bootstrap_buttons/
```

**Actions** :
1. Vérifier qu'aucun template ne référence ce dossier
2. Grep "bootstrap_buttons" dans tout le thème
3. Si aucune référence : supprimer le dossier
4. Git commit

**Test de validation** :
```bash
grep -r "bootstrap_buttons" /themes/survey/dsfr/
# Résultat attendu : aucune occurrence (sauf dans ce fichier EPIC)
```

**Commande** :
```bash
rm -rf /themes/survey/dsfr/question/bootstrap_buttons/
```

---

#### Tâche 1.3 : Consolider la documentation (4h)
**Risque** : LOW
**Fichiers concernés** :
```
- docs/EPIC-1-COMPLETED.md
- docs/EPIC-2-COMPLETED.md
- docs/EPIC-3-COMPLETED.md
- docs/EPIC-4-COMPLETED.md
- docs/EPIC-5-IN-PROGRESS.md
- docs/STATUS.md
- docs/KNOWN-ISSUES.md
```

**Actions** :
1. Créer docs/ARCHIVE/ pour les EPICs complétés
2. Déplacer EPIC-1 à EPIC-4 dans ARCHIVE/
3. Mettre à jour STATUS.md avec l'état réel actuel
4. Mettre à jour KNOWN-ISSUES.md
5. Créer docs/CHANGELOG.md consolidé
6. Git commit

**Test de validation** :
- Lecture complète de STATUS.md : reflète l'état actuel
- Pas de doublons entre STATUS.md et KNOWN-ISSUES.md

---

#### Tâche 1.4 : Audit et nettoyage des imports CSS (3h)
**Risque** : MEDIUM
**Fichiers concernés** :
```
- css/theme.css
- css/custom.css
- css/print_theme.css
```

**Actions** :
1. Lister tous les @import dans theme.css
2. Vérifier que Bootstrap n'est pas importé
3. Vérifier que DSFR est bien importé depuis dsfr-dist/
4. Supprimer les imports inutiles
5. Ajouter commentaires explicatifs
6. Git commit

**Test de validation** :
- Aucun import Bootstrap
- DSFR chargé correctement
- Pas d'erreur 404 dans console

---

#### Tâche 1.5 : Inventaire exhaustif des classes Bootstrap (4h)
**Risque** : LOW
**Actions** :
1. Créer script bash pour scanner toutes les classes Bootstrap
2. Générer rapport CSV : fichier, ligne, classe trouvée
3. Prioriser par fréquence d'utilisation
4. Créer backlog des migrations à faire

**Commande** :
```bash
#!/bin/bash
# scan_bootstrap_classes.sh

echo "Fichier,Ligne,Classe" > bootstrap_classes_inventory.csv

# Grille Bootstrap
grep -rn "col-xs-\|col-sm-\|col-md-\|col-lg-\|col-xl-" \
  /themes/survey/dsfr/ --include="*.twig" \
  >> bootstrap_classes_inventory.csv

# Boutons Bootstrap
grep -rn "btn-default\|btn-primary\|btn-success\|btn-danger\|btn-warning\|btn-info" \
  /themes/survey/dsfr/ --include="*.twig" \
  >> bootstrap_classes_inventory.csv

# Utilitaires Bootstrap
grep -rn "pull-left\|pull-right\|text-left\|text-right\|text-center" \
  /themes/survey/dsfr/ --include="*.twig" \
  >> bootstrap_classes_inventory.csv
```

**Livrable** :
- docs/BOOTSTRAP_INVENTORY.csv

---

#### Tâche 1.6 : Créer suite de tests de non-régression (8h)
**Risque** : HIGH
**Actions** :
1. Créer enquête test avec TOUS les types de questions
2. Documenter comportements attendus
3. Créer checklist manuelle de validation
4. Prendre screenshots de référence
5. Créer script d'export/import enquête test

**Types de questions à tester** :
```
- Choix unique (radio)
- Choix multiple (checkbox)
- Texte court
- Texte long
- Numérique
- Date
- Oui/Non
- Genre
- Tableau Array (5-point, 10-point, yes/no)
- Tableau flexible
- Classement
- Upload de fichiers
- Équation
- Liste déroulante
- Liste avec commentaire
```

**Livrable** :
- docs/TEST_SUITE.md
- tests/test_survey_export.lss (fichier d'export LimeSurvey)
- tests/screenshots_reference/ (captures d'écran)

---

#### Tâche 1.7 : Nettoyer les TODO/FIXME/HACK (4h)
**Risque** : MEDIUM
**Actions** :
1. Lister tous les TODO/FIXME/HACK/BUG/XXX
2. Créer issues GitHub pour chaque TODO valide
3. Supprimer les TODO obsolètes
4. Corriger les FIXME critiques
5. Documenter les HACK avec raison
6. Git commit

**Commande** :
```bash
grep -rn "TODO\|FIXME\|HACK\|BUG\|XXX" \
  /themes/survey/dsfr/ \
  --include="*.twig" --include="*.css" --include="*.js" \
  > docs/TODO_AUDIT.txt
```

**Livrable** :
- docs/TODO_AUDIT.txt
- GitHub Issues créées
- Code nettoyé

---

#### Tâche 1.8 : Optimiser la distribution DSFR (4h)
**Risque** : MEDIUM
**Actions** :
1. Analyser le contenu de dsfr-dist/ (4.9 MB)
2. Identifier les fichiers non utilisés
3. Vérifier si icons-embedded.min.css est nécessaire ou si icons.min.css suffit
4. Supprimer les fonts dupliquées
5. Vérifier l'utilisation réelle des icônes
6. Git commit

**Analyse** :
```bash
# Lister les imports DSFR dans theme.css
grep "@import" /themes/survey/dsfr/css/theme.css

# Vérifier l'utilisation des icônes
grep -r "fr-icon-" /themes/survey/dsfr/ --include="*.twig" | wc -l

# Vérifier l'utilisation des fonts
grep -r "Marianne\|Spectral" /themes/survey/dsfr/ --include="*.css"
```

**Livrable** :
- docs/DSFR_DIST_OPTIMIZATION.md (rapport d'analyse)
- Réduction de taille : objectif 4.9 MB → 3 MB

---

### Phase 2 : Migration CSS Bootstrap → DSFR (Semaine 3-4, 40h)

**Objectif** : Remplacer toutes les classes Bootstrap par leurs équivalents DSFR

#### Tâche 2.1 : Créer mapping Bootstrap → DSFR (4h)
**Risque** : LOW
**Actions** :
1. Créer fichier docs/BOOTSTRAP_TO_DSFR_MAPPING.md
2. Documenter chaque classe Bootstrap avec son équivalent DSFR
3. Ajouter exemples de code
4. Valider avec documentation DSFR officielle

**Mapping de Base** :

| Bootstrap | DSFR | Notes |
|-----------|------|-------|
| col-xs-12 | fr-col-12 | Grille responsive |
| col-sm-6 | fr-col-sm-6 | Breakpoint small |
| col-md-4 | fr-col-md-4 | Breakpoint medium |
| col-lg-3 | fr-col-lg-3 | Breakpoint large |
| btn btn-primary | fr-btn | Bouton primaire |
| btn btn-secondary | fr-btn fr-btn--secondary | Bouton secondaire |
| btn btn-success | fr-btn (+ custom success) | Pas d'équivalent direct |
| btn btn-danger | fr-btn (+ custom danger) | Pas d'équivalent direct |
| pull-left | fr-text--left | Alignement texte |
| pull-right | fr-text--right | Alignement texte |
| text-left | fr-text--left | Alignement texte |
| text-right | fr-text--right | Alignement texte |
| text-center | fr-text--center | Alignement texte |
| text-start | fr-text--left | RTL-aware |
| text-end | fr-text--right | RTL-aware |
| alert alert-info | fr-alert fr-alert--info | Alerte info |
| alert alert-success | fr-alert fr-alert--success | Alerte succès |
| alert alert-warning | fr-alert fr-alert--warning | Alerte warning |
| alert alert-danger | fr-alert fr-alert--error | Alerte erreur |
| form-control | fr-input | Input texte |
| form-select | fr-select | Select dropdown |
| form-check-input (radio) | fr-radio-group > input[type=radio] | Radio DSFR |
| form-check-input (checkbox) | fr-checkbox-group > input[type=checkbox] | Checkbox DSFR |
| card | fr-card | Carte |
| modal | fr-modal | Modale |
| badge | fr-badge | Badge |

**Livrable** :
- docs/BOOTSTRAP_TO_DSFR_MAPPING.md

---

#### Tâche 2.2 : Migration des classes text-start/text-end (6h)
**Risque** : LOW
**Fichiers concernés** : 29 fichiers (58 occurrences)

**Actions** :
1. Remplacer `text-start` par `fr-text--left` (ou supprimer si default)
2. Remplacer `text-end` par `fr-text--right`
3. Vérifier le rendu visuel
4. Git commit par lot de 5-10 fichiers

**Priorité** :
- Commencer par printanswers/question_types/ (27 fichiers)
- Puis views/survey/questions/

**Script automatisé** :
```bash
#!/bin/bash
# migrate_text_alignment.sh

find /themes/survey/dsfr/ -name "*.twig" -type f | while read file; do
  # Remplacer text-start par fr-text--left
  sed -i '' 's/text-start/fr-text--left/g' "$file"

  # Remplacer text-end par fr-text--right
  sed -i '' 's/text-end/fr-text--right/g' "$file"

  echo "Processed: $file"
done
```

**Test de validation** :
- Tester toutes les pages de printanswers
- Vérifier l'alignement des textes (gauche/droite)
- Aucun texte mal aligné

**Livrable** :
- 58 occurrences corrigées
- Git commit : "feat: migrate text-start/end to DSFR equivalents"

---

#### Tâche 2.3 : Migration des classes de grille (16h)
**Risque** : MEDIUM
**Fichiers concernés** : 70 fichiers (161 occurrences)

**Actions** :
1. Identifier les patterns de grille Bootstrap
2. Remplacer par grille DSFR équivalente
3. Tester le responsive (mobile/tablet/desktop)
4. Ajuster si nécessaire
5. Git commit par type de template

**Priorité par complexité** :

**PHASE 2.3.1 : Templates simples (4h)**
- printanswers/question_types/template_text-*.twig (4 fichiers)
- printanswers/question_types/template_date.twig
- printanswers/question_types/template_numeric.twig
- printanswers/question_types/template_equation.twig

**PHASE 2.3.2 : Templates moyens (6h)**
- printanswers/question_types/template_choice-*.twig
- printanswers/question_types/template_yes-no.twig
- printanswers/question_types/template_gender.twig
- printanswers/question_types/template_language.twig
- printanswers/question_types/template_list-*.twig (4 fichiers)

**PHASE 2.3.3 : Templates complexes (6h)**
- printanswers/question_types/template_array-*.twig (11 fichiers)
- printanswers/question_types/template_multiple-*.twig (4 fichiers)
- views/survey/questions/answer/multiplenumeric/rows/dynamic.twig
- views/survey/questions/answer/numerical/answer.twig

**Exemple de migration** :

Avant (Bootstrap) :
```twig
<div class="row">
  <div class="col-xs-12 col-sm-6 col-md-4">
    Contenu
  </div>
</div>
```

Après (DSFR) :
```twig
<div class="fr-grid-row">
  <div class="fr-col-12 fr-col-sm-6 fr-col-md-4">
    Contenu
  </div>
</div>
```

**Test de validation** :
- Tester chaque template modifié
- Vérifier responsive mobile/tablet/desktop
- Pas de débordement ou de layout cassé
- Captures d'écran avant/après

**Livrable** :
- 161 occurrences corrigées
- Git commits par batch de templates

---

#### Tâche 2.4 : Migration des boutons Bootstrap (8h)
**Risque** : MEDIUM
**Fichiers concernés** : 80 fichiers (235 occurrences de classes btn-*)

**Actions** :
1. Identifier tous les boutons Bootstrap
2. Remplacer par boutons DSFR (fr-btn)
3. Gérer les variantes (primary, secondary, success, danger, etc.)
4. Tester les états (hover, active, disabled, focus)
5. Git commit par section

**Mapping des boutons** :

| Bootstrap | DSFR | Custom Needed |
|-----------|------|---------------|
| btn btn-primary | fr-btn | Non |
| btn btn-secondary | fr-btn fr-btn--secondary | Non |
| btn btn-success | fr-btn + .btn-success-custom | Oui (CSS custom) |
| btn btn-danger | fr-btn + .btn-danger-custom | Oui (CSS custom) |
| btn btn-warning | fr-btn + .btn-warning-custom | Oui (CSS custom) |
| btn btn-info | fr-btn + .btn-info-custom | Oui (CSS custom) |
| btn btn-link | fr-btn fr-btn--tertiary-no-outline | Non |
| btn btn-sm | fr-btn fr-btn--sm | Non |
| btn btn-lg | fr-btn fr-btn--lg | Non |

**Créer classes CSS custom pour success/danger/warning** (dans custom.css) :
```css
/* Boutons custom non DSFR mais nécessaires pour LimeSurvey */
.fr-btn.btn-success-custom {
  background-color: var(--background-action-high-success);
  color: var(--text-inverted-grey);
}
.fr-btn.btn-success-custom:hover {
  background-color: var(--background-action-high-success-hover);
}

.fr-btn.btn-danger-custom {
  background-color: var(--background-action-high-error);
  color: var(--text-inverted-grey);
}
.fr-btn.btn-danger-custom:hover {
  background-color: var(--background-action-high-error-hover);
}

.fr-btn.btn-warning-custom {
  background-color: var(--background-action-high-warning);
  color: var(--text-default-grey);
}
.fr-btn.btn-warning-custom:hover {
  background-color: var(--background-action-high-warning-hover);
}
```

**Priorité** :
1. Navigation buttons (navigator.twig, question_index_buttons.twig)
2. Form buttons (submit, save, load)
3. Question buttons (answer buttons)
4. Modal buttons

**Test de validation** :
- Tous les boutons s'affichent correctement
- États hover/active/focus fonctionnels
- Pas de régression visuelle
- Accessibilité clavier maintenue

**Livrable** :
- 235 occurrences corrigées
- CSS custom pour success/danger/warning dans custom.css
- Git commits par section

---

#### Tâche 2.5 : Migration des alertes & messages (4h)
**Risque** : LOW
**Fichiers concernés** : Templates avec alert, alert-info, alert-success, etc.

**Actions** :
1. Identifier toutes les alertes Bootstrap
2. Remplacer par fr-alert DSFR
3. Adapter les icônes (fr-icon-*)
4. Tester chaque type d'alerte
5. Git commit

**Mapping des alertes** :

| Bootstrap | DSFR |
|-----------|------|
| alert alert-info | fr-alert fr-alert--info |
| alert alert-success | fr-alert fr-alert--success |
| alert alert-warning | fr-alert fr-alert--warning |
| alert alert-danger | fr-alert fr-alert--error |

**Exemple de migration** :

Avant (Bootstrap) :
```twig
<div class="alert alert-info">
  <strong>Info :</strong> Message d'information
</div>
```

Après (DSFR) :
```twig
<div class="fr-alert fr-alert--info">
  <p class="fr-alert__title">Info</p>
  <p>Message d'information</p>
</div>
```

**Test de validation** :
- Toutes les alertes s'affichent correctement
- Icônes DSFR présentes
- Couleurs conformes DSFR

**Livrable** :
- Toutes les alertes migrées
- Git commit : "feat: migrate alerts to DSFR fr-alert"

---

#### Tâche 2.6 : Migration des modales (2h)
**Risque** : MEDIUM
**Fichiers concernés** :
```
- views/subviews/footer/modals/accessibility.twig
- views/subviews/footer/modals/legal.twig
- views/subviews/footer/modals/privacy.twig
- views/subviews/footer/modals/cookies.twig
- views/subviews/navigation/question_index_modal_dsfr.twig
```

**Actions** :
1. Remplacer data-bs-toggle="modal" par data-fr-opened="false"
2. Adapter la structure HTML pour fr-modal
3. Vérifier le JavaScript DSFR pour modales
4. Tester ouverture/fermeture des modales
5. Git commit

**Structure modale DSFR** :
```twig
<dialog class="fr-modal" id="modal-id" aria-labelledby="modal-title-id">
  <div class="fr-container fr-container--fluid fr-container-md">
    <div class="fr-grid-row fr-grid-row--center">
      <div class="fr-col-12 fr-col-md-8">
        <div class="fr-modal__body">
          <div class="fr-modal__header">
            <button class="fr-btn--close fr-btn" aria-controls="modal-id" title="Fermer">
              Fermer
            </button>
          </div>
          <div class="fr-modal__content">
            <h1 id="modal-title-id" class="fr-modal__title">Titre</h1>
            <p>Contenu</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</dialog>

<button class="fr-btn" data-fr-opened="false" aria-controls="modal-id">
  Ouvrir la modale
</button>
```

**Test de validation** :
- Toutes les modales s'ouvrent et se ferment
- Bouton de fermeture fonctionnel
- Overlay présent
- Navigation clavier (Escape pour fermer)

**Livrable** :
- 5 modales migrées
- Git commit : "feat: migrate modals from Bootstrap to DSFR"

---

### Phase 3 : Refactoring Structurel (Semaine 5-6, 40h)

**Objectif** : Découpler les templates, optimiser la structure, améliorer la maintenabilité

#### Tâche 3.1 : Découpler printanswers_question.twig (12h)
**Risque** : HIGH
**Problème** : 32 templates dépendent de printanswers_question.twig

**Actions** :
1. Analyser les dépendances de printanswers_question.twig
2. Créer composants réutilisables (partials)
3. Extraire la logique commune
4. Refactorer chaque template pour utiliser les partials
5. Tester chaque template individuellement
6. Git commit par batch de templates

**Approche** :

**Créer partials DSFR** :
```
views/subviews/printanswers/partials/
├── _question_header.twig
├── _question_text.twig
├── _question_help.twig
├── _answer_container.twig
├── _answer_label.twig
└── _answer_value.twig
```

**Exemple de partial _question_header.twig** :
```twig
{# Partial pour l'en-tête de question #}
<div class="fr-grid-row fr-grid-row--gutters fr-mb-2w">
  <div class="fr-col-12 fr-col-md-6 fr-text--left">
    <span class="fr-text--bold">{{ question.text }}</span>
    {% if question.mandatory %}
      <span class="fr-text--error" aria-hidden="true">*</span>
    {% endif %}
  </div>
  <div class="fr-col-12 fr-col-md-6 fr-text--right">
    <span class="fr-text--sm fr-text--regular">{{ answer.value|default('-') }}</span>
  </div>
</div>
```

**Refactorer template_array-5-pt.twig** :

Avant :
```twig
{% extends "subviews/printanswers/printanswers_question.twig" %}
{% block answer %}
  <div class="row">
    <div class="col-xs-12 col-sm-6 text-start">...</div>
    <div class="col-xs-12 col-sm-6 text-end">...</div>
  </div>
{% endblock %}
```

Après :
```twig
{% include 'subviews/printanswers/partials/_question_header.twig' %}
<div class="fr-grid-row">
  <div class="fr-col-12">
    {% include 'subviews/printanswers/partials/_answer_container.twig' %}
  </div>
</div>
```

**Test de validation** :
- Page de printanswers s'affiche correctement
- Tous les types de questions visibles
- Pas de régression visuelle
- Performance maintenue

**Livrable** :
- 6 partials créés
- 32 templates refactorés
- Documentation des partials
- Git commits par batch

---

#### Tâche 3.2 : Créer système de grille DSFR unifié (6h)
**Risque** : MEDIUM
**Actions** :
1. Analyser tous les usages de grille dans le thème
2. Créer mixins/helpers DSFR pour grille
3. Standardiser l'utilisation de fr-grid-row et fr-col-*
4. Documenter les patterns de grille DSFR
5. Git commit

**Créer fichier css/dsfr-grid-helpers.css** :
```css
/* Helpers de grille DSFR */
.fr-grid-row--gutters-sm {
  gap: 0.5rem;
}
.fr-grid-row--gutters-md {
  gap: 1rem;
}
.fr-grid-row--gutters-lg {
  gap: 2rem;
}

/* Alignements verticaux */
.fr-grid-row--middle {
  align-items: center;
}
.fr-grid-row--bottom {
  align-items: flex-end;
}

/* Alignements horizontaux */
.fr-grid-row--center {
  justify-content: center;
}
.fr-grid-row--between {
  justify-content: space-between;
}
.fr-grid-row--around {
  justify-content: space-around;
}
```

**Importer dans theme.css** :
```css
@import url('./dsfr-grid-helpers.css');
```

**Documenter patterns** dans docs/DSFR_GRID_PATTERNS.md :
```markdown
# Patterns de Grille DSFR

## Pattern 1 : 2 colonnes égales
<div class="fr-grid-row fr-grid-row--gutters">
  <div class="fr-col-12 fr-col-md-6">Colonne 1</div>
  <div class="fr-col-12 fr-col-md-6">Colonne 2</div>
</div>

## Pattern 2 : 3 colonnes égales
<div class="fr-grid-row fr-grid-row--gutters">
  <div class="fr-col-12 fr-col-md-4">Colonne 1</div>
  <div class="fr-col-12 fr-col-md-4">Colonne 2</div>
  <div class="fr-col-12 fr-col-md-4">Colonne 3</div>
</div>

[etc.]
```

**Test de validation** :
- Tous les layouts de grille fonctionnent
- Responsive correct sur mobile/tablet/desktop
- Gutters appliqués correctement

**Livrable** :
- css/dsfr-grid-helpers.css
- docs/DSFR_GRID_PATTERNS.md
- Git commit : "feat: add DSFR grid helpers and patterns"

---

#### Tâche 3.3 : Standardiser les inputs DSFR (8h)
**Risque** : MEDIUM
**Actions** :
1. Auditer tous les inputs dans le thème
2. Créer composants DSFR réutilisables pour inputs
3. Remplacer form-control par fr-input
4. Ajouter groupes d'inputs DSFR (fr-input-group)
5. Tester validation et états d'erreur
6. Git commit

**Types d'inputs à standardiser** :
- Input text : fr-input
- Textarea : fr-input (multi-lignes)
- Select : fr-select
- Radio : fr-radio-group
- Checkbox : fr-checkbox-group
- Date picker : fr-input (type="date")
- File upload : fr-upload

**Créer partials inputs** :
```
views/subviews/inputs/
├── _input_text.twig
├── _textarea.twig
├── _select.twig
├── _radio_group.twig
├── _checkbox_group.twig
└── _file_upload.twig
```

**Exemple _input_text.twig** :
```twig
{# Partial pour input texte DSFR #}
<div class="fr-input-group {{ error ? 'fr-input-group--error' : '' }}">
  {% if label %}
    <label class="fr-label" for="{{ id }}">
      {{ label }}
      {% if required %}
        <span class="fr-hint-text">Obligatoire</span>
      {% endif %}
    </label>
  {% endif %}
  {% if hint %}
    <span class="fr-hint-text">{{ hint }}</span>
  {% endif %}
  <input
    class="fr-input {{ error ? 'fr-input--error' : '' }}"
    type="{{ type|default('text') }}"
    id="{{ id }}"
    name="{{ name }}"
    value="{{ value|default('') }}"
    {{ required ? 'required' : '' }}
    {{ disabled ? 'disabled' : '' }}
    aria-describedby="{{ error ? id ~ '-error' : '' }}"
  />
  {% if error %}
    <p id="{{ id }}-error" class="fr-error-text">{{ error }}</p>
  {% endif %}
</div>
```

**Test de validation** :
- Tous les inputs s'affichent correctement
- États d'erreur fonctionnels
- Labels et hints présents
- Accessibilité clavier maintenue
- Validation fonctionnelle

**Livrable** :
- 7 partials inputs créés
- Templates mis à jour pour utiliser les partials
- Git commit : "feat: standardize inputs with DSFR components"

---

#### Tâche 3.4 : Optimiser les templates de questions (8h)
**Risque** : MEDIUM
**Actions** :
1. Analyser les templates de questions (views/survey/questions/answer/)
2. Identifier les duplications de code
3. Créer composants réutilisables
4. Refactorer les templates complexes
5. Tester tous les types de questions
6. Git commit

**Templates prioritaires** :
```
- views/survey/questions/answer/arrays/ (10+ templates)
- views/survey/questions/answer/multiplenumeric/rows/ (8 templates)
- views/survey/questions/answer/multipleshorttext/rows/ (2 templates)
```

**Exemple de refactoring : arrays/array/dropdown/rows/answer_row.twig**

Avant :
```twig
<td class="col-xs-12 col-sm-6">
  <select class="form-control">...</select>
</td>
```

Après :
```twig
<td class="fr-col-12 fr-col-sm-6">
  {% include 'subviews/inputs/_select.twig' with {
    id: 'answer-' ~ row.code,
    name: 'answer[' ~ row.code ~ ']',
    options: row.options,
    value: row.answer
  } %}
</td>
```

**Test de validation** :
- Tous les types de questions fonctionnent
- Pas de régression visuelle ou fonctionnelle
- Performance maintenue

**Livrable** :
- Templates refactorés
- Git commits par type de question

---

#### Tâche 3.5 : Créer système de variables DSFR (4h)
**Risque** : LOW
**Actions** :
1. Documenter toutes les variables dynamiques utilisées
2. Créer fichier docs/TWIG_VARIABLES.md
3. Ajouter commentaires dans templates pour variables complexes
4. Git commit

**Documenter dans docs/TWIG_VARIABLES.md** :
```markdown
# Variables Twig - Thème DSFR

## Variables globales (aSurveyInfo)
- `aSurveyInfo.name` : Nom de l'enquête
- `aSurveyInfo.description` : Description
- `aSurveyInfo.format` : Format (G=group, Q=question, A=all)
- `aSurveyInfo.progress.value` : Pourcentage de progression (0-100)
- `aSurveyInfo.totalsteps` : Nombre total d'étapes
- `aSurveyInfo.step` : Étape actuelle
- `aSurveyInfo.groupname` : Nom du groupe actuel
- `aSurveyInfo.questionindex` : Index de la question
- `aSurveyInfo.totalquestions` : Nombre total de questions

## Variables de question (aQuestion)
- `aQuestion.code` : Code de la question
- `aQuestion.text` : Texte de la question
- `aQuestion.help` : Texte d'aide
- `aQuestion.mandatory` : Booléen obligatoire
- `aQuestion.type` : Type de question (L, M, T, etc.)
- `aQuestion.answers` : Tableau des réponses possibles

## Variables de réponse (answer)
- `answer.code` : Code de la réponse
- `answer.text` : Texte de la réponse
- `answer.value` : Valeur de la réponse
- `answer.selected` : Booléen sélectionné

[etc.]
```

**Test de validation** :
- Documentation complète et compréhensible

**Livrable** :
- docs/TWIG_VARIABLES.md
- Git commit : "docs: document Twig variables"

---

#### Tâche 3.6 : Améliorer la structure CSS (2h)
**Risque** : LOW
**Actions** :
1. Réorganiser theme.css par sections logiques
2. Ajouter table des matières en commentaire
3. Supprimer CSS inutilisé
4. Git commit

**Structure améliorée de theme.css** :
```css
/**
 * Thème DSFR pour LimeSurvey
 *
 * TABLE DES MATIÈRES
 *
 * 1. IMPORTS
 * 2. VARIABLES DSFR
 * 3. NEUTRALISATION BOOTSTRAP
 * 4. LAYOUT GLOBAL
 * 5. HEADER & NAVIGATION
 * 6. FORMULAIRES & INPUTS
 * 7. BOUTONS
 * 8. QUESTIONS
 * 9. MESSAGES & ALERTES
 * 10. MODALES
 * 11. FOOTER
 * 12. RESPONSIVE
 * 13. PRINT
 * 14. UTILITIES
 */

/* 1. IMPORTS */
@import url('../dsfr-dist/css/dsfr.min.css');
@import url('../dsfr-dist/css/icons-embedded.min.css');
@import url('./dsfr-grid-helpers.css');

/* 2. VARIABLES DSFR */
:root {
  /* Espacements */
  --sp-1: 0.25rem;
  [...]
}

/* 3. NEUTRALISATION BOOTSTRAP */
[...]
```

**Test de validation** :
- CSS bien organisé
- Pas de CSS cassé
- Pas de régression visuelle

**Livrable** :
- theme.css réorganisé
- Git commit : "refactor: reorganize theme.css structure"

---

### Phase 4 : Documentation & Tests (Semaine 7, 30h)

**Objectif** : Documenter le thème, créer tests exhaustifs, valider l'accessibilité

#### Tâche 4.1 : Documentation technique complète (10h)
**Risque** : LOW
**Actions** :
1. Mettre à jour README.md principal
2. Créer docs/ARCHITECTURE.md
3. Créer docs/COMPONENTS.md
4. Créer docs/ACCESSIBILITY.md
5. Créer docs/MAINTENANCE.md
6. Git commit

**Contenu docs/ARCHITECTURE.md** :
```markdown
# Architecture du Thème DSFR

## Structure des dossiers
[...]

## Hiérarchie des templates
[...]

## Système de grille DSFR
[...]

## Composants réutilisables
[...]

## Gestion des assets
[...]
```

**Contenu docs/COMPONENTS.md** :
```markdown
# Composants DSFR Utilisés

## Composants natifs DSFR
- fr-header : En-tête
- fr-footer : Pied de page
- fr-btn : Boutons
- fr-input : Inputs
- fr-select : Selects
- fr-radio-group : Radios
- fr-checkbox-group : Checkboxes
- fr-alert : Alertes
- fr-modal : Modales
- fr-card : Cartes
- fr-stepper : Indicateur de progression

## Composants custom
- btn-success-custom : Bouton succès
- btn-danger-custom : Bouton danger
- btn-warning-custom : Bouton warning

[...]
```

**Contenu docs/ACCESSIBILITY.md** :
```markdown
# Accessibilité RGAA

## Critères RGAA respectés
[...]

## Tests d'accessibilité
[...]

## Navigation clavier
[...]

## Lecteurs d'écran
[...]
```

**Livrable** :
- 5 documents de documentation
- Git commit : "docs: add comprehensive documentation"

---

#### Tâche 4.2 : Créer tests automatisés (8h)
**Risque** : MEDIUM
**Actions** :
1. Installer outils de test (pa11y, axe-core)
2. Créer scripts de test d'accessibilité
3. Créer tests de non-régression visuelle
4. Documenter processus de test
5. Git commit

**Installer pa11y** :
```bash
npm install -g pa11y pa11y-ci
```

**Créer tests/pa11y-config.json** :
```json
{
  "defaults": {
    "standard": "WCAG2AA",
    "runners": ["axe", "htmlcs"],
    "chromeLaunchConfig": {
      "args": ["--no-sandbox"]
    }
  },
  "urls": [
    "http://localhost:8080/index.php/123456?newtest=Y",
    "http://localhost:8080/index.php/123456?lang=fr"
  ]
}
```

**Créer script tests/run-accessibility-tests.sh** :
```bash
#!/bin/bash
# Script de test d'accessibilité

echo "🧪 Tests d'accessibilité RGAA/WCAG..."

# Test avec pa11y
pa11y-ci --config tests/pa11y-config.json

# Générer rapport
pa11y-ci --config tests/pa11y-config.json --reporter html > tests/reports/accessibility-report.html

echo "✅ Tests terminés. Voir tests/reports/accessibility-report.html"
```

**Test de validation** :
- Tests s'exécutent sans erreur
- Rapport généré

**Livrable** :
- tests/pa11y-config.json
- tests/run-accessibility-tests.sh
- tests/reports/ (répertoire)
- Git commit : "test: add accessibility tests"

---

#### Tâche 4.3 : Tests de non-régression exhaustifs (8h)
**Risque** : MEDIUM
**Actions** :
1. Tester tous les types de questions (voir liste)
2. Tester tous les workflows (save, load, clearall, etc.)
3. Tester responsive (mobile, tablet, desktop)
4. Tester modales DSFR
5. Tester navigation clavier
6. Documenter résultats
7. Git commit

**Checklist de test** (docs/TEST_CHECKLIST.md) :

```markdown
# Checklist de Test - Thème DSFR

## Types de questions
- [ ] Choix unique (radio) - Type L
- [ ] Choix multiple (checkbox) - Type M
- [ ] Texte court - Type S
- [ ] Texte long - Type T
- [ ] Texte énorme - Type U
- [ ] Numérique - Type N
- [ ] Date - Type D
- [ ] Oui/Non - Type Y
- [ ] Genre - Type G
- [ ] Tableau Array 5-point - Type A
- [ ] Tableau Array 10-point - Type B
- [ ] Tableau Array Yes/No - Type C
- [ ] Tableau flexible - Type F
- [ ] Tableau dual scale - Type 1
- [ ] Classement - Type R
- [ ] Upload de fichiers - Type |
- [ ] Équation - Type *
- [ ] Liste déroulante - Type !
- [ ] Liste avec commentaire - Type O
- [ ] Multiple short text - Type Q
- [ ] Multiple numeric - Type K

## Workflows
- [ ] Page d'accueil enquête
- [ ] Navigation suivant/précédent
- [ ] Save & Continue Later
- [ ] Load unfinished survey
- [ ] Clear all responses
- [ ] Submit survey
- [ ] Page de remerciement
- [ ] Print answers
- [ ] Public statistics
- [ ] Index des questions (modale)

## Responsive
- [ ] Mobile (< 768px)
- [ ] Tablet (768px - 1024px)
- [ ] Desktop (> 1024px)

## Modales DSFR
- [ ] Modale Accessibilité
- [ ] Modale Mentions légales
- [ ] Modale Confidentialité
- [ ] Modale Cookies
- [ ] Modale Index des questions

## Navigation clavier
- [ ] Tab pour naviguer entre champs
- [ ] Shift+Tab pour revenir
- [ ] Enter pour soumettre
- [ ] Escape pour fermer modales
- [ ] Flèches pour radios/checkboxes

## États
- [ ] États focus visibles
- [ ] États hover fonctionnels
- [ ] États disabled corrects
- [ ] Messages d'erreur affichés

## Accessibilité
- [ ] Contraste minimum respecté (4.5:1)
- [ ] Labels présents sur tous les inputs
- [ ] Attributs ARIA corrects
- [ ] Landmarks ARIA présents
- [ ] Pas d'erreur pa11y

## Performance
- [ ] First Contentful Paint < 1.5s
- [ ] Time to Interactive < 3s
- [ ] Pas d'erreur console
- [ ] Pas d'avertissement console
```

**Livrable** :
- docs/TEST_CHECKLIST.md
- docs/TEST_RESULTS.md (résultats des tests)
- Git commit : "test: complete non-regression testing"

---

#### Tâche 4.4 : Validation RGAA avec audit (4h)
**Risque** : LOW
**Actions** :
1. Exécuter pa11y sur toutes les pages
2. Analyser les erreurs
3. Corriger les erreurs critiques
4. Documenter les limitations
5. Git commit

**Exécuter audit** :
```bash
bash tests/run-accessibility-tests.sh
```

**Analyser et corriger** :
- Lire tests/reports/accessibility-report.html
- Identifier les erreurs WCAG2AA
- Corriger les erreurs (contraste, labels manquants, etc.)
- Relancer les tests jusqu'à 0 erreur

**Livrable** :
- tests/reports/accessibility-report.html
- Erreurs corrigées
- Git commit : "fix: resolve accessibility issues"

---

### Phase 5 : Validation Finale & Optimisation (Semaine 8, 20h)

**Objectif** : Valider 100% conformité, optimiser performance, finaliser

#### Tâche 5.1 : Audit final des classes CSS (4h)
**Risque** : LOW
**Actions** :
1. Scanner toutes les classes CSS dans les templates
2. Vérifier qu'aucune classe Bootstrap ne reste
3. Vérifier que toutes les classes DSFR sont valides
4. Générer rapport final
5. Git commit

**Script d'audit final** :
```bash
#!/bin/bash
# final_css_audit.sh

echo "🔍 Audit final des classes CSS..."

# Chercher classes Bootstrap
echo "\n=== Classes Bootstrap résiduelles ==="
grep -rn "col-xs-\|col-sm-\|col-md-\|col-lg-\|btn-default\|btn-primary\|pull-left\|pull-right\|text-left\|text-right" \
  /themes/survey/dsfr/ --include="*.twig" | wc -l

# Chercher classes DSFR
echo "\n=== Classes DSFR utilisées ==="
grep -rn "fr-" /themes/survey/dsfr/ --include="*.twig" | wc -l

# Générer rapport
echo "\n📊 Génération du rapport..."
{
  echo "# Audit Final CSS - $(date)"
  echo ""
  echo "## Classes Bootstrap"
  grep -rn "col-xs-\|col-sm-\|col-md-\|col-lg-\|btn-default\|btn-primary\|pull-left\|pull-right" \
    /themes/survey/dsfr/ --include="*.twig"
  echo ""
  echo "## Classes DSFR"
  grep -r "fr-" /themes/survey/dsfr/ --include="*.twig" | cut -d: -f1 | sort | uniq -c | sort -rn
} > docs/FINAL_CSS_AUDIT.md

echo "✅ Rapport généré : docs/FINAL_CSS_AUDIT.md"
```

**Critère de succès** :
- 0 classe Bootstrap
- 1000+ classes DSFR
- Toutes les classes DSFR valides (vérifiées dans doc DSFR)

**Livrable** :
- docs/FINAL_CSS_AUDIT.md
- Git commit : "audit: final CSS audit"

---

#### Tâche 5.2 : Optimisation des assets (6h)
**Risque** : MEDIUM
**Actions** :
1. Minifier custom.css
2. Minifier custom.js (si applicable)
3. Optimiser images/logos
4. Supprimer assets non utilisés dans dsfr-dist/
5. Mesurer performance avant/après
6. Git commit

**Minifier CSS** :
```bash
# Installer cssnano
npm install -g cssnano-cli

# Minifier custom.css
cssnano css/custom.css css/custom.min.css

# Mettre à jour config.xml pour charger custom.min.css
```

**Optimiser images** :
```bash
# Installer imagemin
npm install -g imagemin-cli

# Optimiser images dans files/
imagemin files/*.png --out-dir=files/optimized/
```

**Mesurer performance** :
```bash
# Installer Lighthouse CI
npm install -g @lhci/cli

# Audit performance
lhci autorun --collect.url=http://localhost:8080/index.php/123456
```

**Test de validation** :
- Performance améliorée (FCP, TTI, CLS)
- Taille des assets réduite
- Pas de régression visuelle

**Livrable** :
- Assets minifiés et optimisés
- Rapport de performance
- Git commit : "perf: optimize assets"

---

#### Tâche 5.3 : Nettoyage final du code (4h)
**Risque** : LOW
**Actions** :
1. Supprimer tous les commentaires TODO/FIXME/HACK restants
2. Formater le code (indentation, espaces)
3. Vérifier la cohérence des noms de fichiers
4. Supprimer fichiers inutilisés
5. Git commit

**Formater le code** :
```bash
# Formater tous les fichiers Twig (si outil disponible)
# Sinon : revue manuelle

# Vérifier indentation CSS
# Utiliser Prettier ou similaire
```

**Supprimer fichiers inutilisés** :
```bash
# Identifier fichiers jamais inclus/importés
grep -r "include\|extends\|import" /themes/survey/dsfr/ --include="*.twig" --include="*.css" | \
  cut -d: -f2 | sort | uniq > used_files.txt

# Comparer avec liste totale des fichiers
find /themes/survey/dsfr/ -name "*.twig" -o -name "*.css" | sort > all_files.txt

# Différence = fichiers inutilisés
comm -23 all_files.txt used_files.txt
```

**Livrable** :
- Code nettoyé
- Fichiers inutilisés supprimés
- Git commit : "chore: final code cleanup"

---

#### Tâche 5.4 : Rédiger guide de migration (3h)
**Risque** : LOW
**Actions** :
1. Créer docs/MIGRATION_GUIDE.md
2. Documenter migration depuis thème vanilla
3. Documenter personnalisation du thème
4. Ajouter FAQ
5. Git commit

**Contenu docs/MIGRATION_GUIDE.md** :
```markdown
# Guide de Migration vers Thème DSFR

## Migration depuis thème Vanilla
[...]

## Personnalisation du thème
[...]

## FAQ
[...]

## Dépannage
[...]
```

**Livrable** :
- docs/MIGRATION_GUIDE.md
- Git commit : "docs: add migration guide"

---

#### Tâche 5.5 : Créer CHANGELOG complet (2h)
**Risque** : LOW
**Actions** :
1. Créer CHANGELOG.md à la racine du thème
2. Lister toutes les modifications par version
3. Suivre format Keep a Changelog
4. Git commit

**Contenu CHANGELOG.md** :
```markdown
# Changelog

Tous les changements notables de ce projet seront documentés dans ce fichier.

Le format est basé sur [Keep a Changelog](https://keepachangelog.com/fr/1.0.0/),
et ce projet adhère au [Semantic Versioning](https://semver.org/lang/fr/).

## [2.0.0] - 2025-11-XX - 100% Conformité DSFR

### Added
- 1000+ classes DSFR natives
- Composants réutilisables (partials)
- Tests d'accessibilité automatisés
- Documentation complète (architecture, composants, accessibilité)
- Guide de migration

### Changed
- Migration complète Bootstrap → DSFR
- Refactoring structurel des templates
- Optimisation des assets (minification, compression)
- Amélioration de la performance

### Removed
- Toutes les classes Bootstrap (235 occurrences)
- Code mort (2.8 MB supprimés)
- Fichiers backup redondants
- TODO/FIXME/HACK du code

### Fixed
- 43 issues d'accessibilité corrigées
- Problèmes de responsive mobile
- États focus/hover/disabled
- Contraste des couleurs

## [1.0.4] - 2025-11-07

[...]
```

**Livrable** :
- CHANGELOG.md
- Git commit : "docs: add comprehensive CHANGELOG"

---

#### Tâche 5.6 : Validation finale 100% (1h)
**Risque** : LOW
**Actions** :
1. Vérifier tous les KPIs
2. Exécuter tous les tests
3. Valider tous les critères de succès
4. Générer rapport final
5. Git commit

**Checklist de validation** :

```markdown
# Validation Finale - 100% Conformité DSFR

## KPIs Techniques
- [x] Classes Bootstrap : 0 occurrences ✅
- [x] Classes DSFR : 1000+ occurrences ✅
- [x] Code mort : 0 MB ✅
- [x] TODO/FIXME : 0 occurrences ✅
- [x] Taille distribution : < 8 MB ✅
- [x] Couverture DSFR : 100% ✅

## KPIs Qualité
- [x] Score accessibilité : 95/100 ✅
- [x] Performance FCP : < 1.5s ✅
- [x] Performance TTI : < 3s ✅
- [x] Bundle CSS : < 300 KB ✅
- [x] Bundle JS : < 200 KB ✅

## Tests
- [x] Tous les types de questions : OK ✅
- [x] Navigation clavier : OK ✅
- [x] Modales DSFR : OK ✅
- [x] Responsive : OK ✅
- [x] Accessibilité pa11y : 0 erreur ✅

## Documentation
- [x] README.md : Complet ✅
- [x] ARCHITECTURE.md : Complet ✅
- [x] COMPONENTS.md : Complet ✅
- [x] ACCESSIBILITY.md : Complet ✅
- [x] MIGRATION_GUIDE.md : Complet ✅
- [x] CHANGELOG.md : Complet ✅

## Conformité DSFR
- [x] HTML structurel : Conforme ✅
- [x] CSS : 100% DSFR ✅
- [x] JavaScript : DSFR.js uniquement ✅
- [x] Design tokens : Respectés ✅
- [x] Composants : Natifs DSFR ✅

**RÉSULTAT : 100% CONFORMITÉ DSFR ATTEINTE ✅**
```

**Livrable** :
- docs/VALIDATION_FINALE.md
- Git commit : "docs: final validation report"

---

## 5. Roadmap & Sprints

### Vue d'ensemble

```
Semaine 1-2 : Phase 1 - Nettoyage & Préparation
Semaine 3-4 : Phase 2 - Migration CSS Bootstrap → DSFR
Semaine 5-6 : Phase 3 - Refactoring Structurel
Semaine 7   : Phase 4 - Documentation & Tests
Semaine 8   : Phase 5 - Validation Finale & Optimisation
```

### Sprint 1 : Semaine 1-2 (30h)

**Objectif** : Nettoyer le code, préparer le terrain

**Semaine 1** (15h)
- Lundi : Tâche 1.1 (2h) + Tâche 1.2 (1h) + Tâche 1.3 (4h)
- Mardi : Tâche 1.4 (3h) + Tâche 1.5 (4h)
- Mercredi : Tâche 1.6 début (8h)

**Semaine 2** (15h)
- Jeudi : Tâche 1.6 fin (0h) + Tâche 1.7 (4h) + Tâche 1.8 (4h)
- Vendredi : Tests & validation Sprint 1 (7h)

**Livrables Sprint 1** :
- ✅ Code mort supprimé (2.8 MB)
- ✅ Documentation consolidée
- ✅ Inventaire Bootstrap complet
- ✅ Suite de tests créée
- ✅ TODO/FIXME nettoyés

**Critère de succès Sprint 1** :
- Taille du thème réduite de 13 MB à 10 MB
- Documentation à jour
- Suite de tests fonctionnelle

---

### Sprint 2 : Semaine 3-4 (40h)

**Objectif** : Migrer toutes les classes Bootstrap vers DSFR

**Semaine 3** (20h)
- Lundi : Tâche 2.1 (4h) + Tâche 2.2 (6h)
- Mardi : Tâche 2.3 Phase 1 (4h) + Tâche 2.3 Phase 2 (6h)
- Mercredi : Tâche 2.3 Phase 3 (6h) + Tests (4h)

**Semaine 4** (20h)
- Jeudi : Tâche 2.4 (8h) + Tâche 2.5 (4h)
- Vendredi : Tâche 2.6 (2h) + Tests & validation Sprint 2 (6h)

**Livrables Sprint 2** :
- ✅ 0 classe Bootstrap restante
- ✅ 1000+ classes DSFR
- ✅ Mapping Bootstrap → DSFR documenté
- ✅ Modales DSFR fonctionnelles

**Critère de succès Sprint 2** :
- grep "btn-default|col-xs|pull-left" retourne 0 résultat
- Tous les tests de non-régression passent
- Aucune régression visuelle

---

### Sprint 3 : Semaine 5-6 (40h)

**Objectif** : Refactorer la structure, découpler les templates

**Semaine 5** (20h)
- Lundi : Tâche 3.1 Phase 1 (6h)
- Mardi : Tâche 3.1 Phase 2 (6h)
- Mercredi : Tâche 3.2 (6h) + Tâche 3.3 début (2h)

**Semaine 6** (20h)
- Jeudi : Tâche 3.3 fin (6h) + Tâche 3.4 (8h)
- Vendredi : Tâche 3.5 (4h) + Tâche 3.6 (2h) + Tests Sprint 3 (0h)

**Livrables Sprint 3** :
- ✅ 32 templates printanswers découplés
- ✅ Partials DSFR créés
- ✅ Inputs standardisés DSFR
- ✅ Variables Twig documentées

**Critère de succès Sprint 3** :
- Pas de couplage fort entre templates
- Code maintenable et réutilisable
- Documentation des variables complète

---

### Sprint 4 : Semaine 7 (30h)

**Objectif** : Documenter, tester, valider accessibilité

**Lundi** : Tâche 4.1 (10h)
**Mardi** : Tâche 4.2 (8h)
**Mercredi** : Tâche 4.3 (8h)
**Jeudi** : Tâche 4.4 (4h)

**Livrables Sprint 4** :
- ✅ Documentation complète (architecture, composants, accessibilité)
- ✅ Tests automatisés (pa11y)
- ✅ Checklist de test complétée
- ✅ Score accessibilité 95/100

**Critère de succès Sprint 4** :
- Documentation exhaustive
- 0 erreur d'accessibilité
- Tous les tests passent

---

### Sprint 5 : Semaine 8 (20h)

**Objectif** : Validation finale, optimisation, release

**Lundi** : Tâche 5.1 (4h) + Tâche 5.2 (6h)
**Mardi** : Tâche 5.3 (4h) + Tâche 5.4 (3h)
**Mercredi** : Tâche 5.5 (2h) + Tâche 5.6 (1h)

**Livrables Sprint 5** :
- ✅ Audit final CSS : 0 Bootstrap, 1000+ DSFR
- ✅ Assets optimisés (minifiés)
- ✅ Code nettoyé
- ✅ CHANGELOG complet
- ✅ Validation 100% conformité DSFR

**Critère de succès Sprint 5** :
- Tous les KPIs atteints
- Validation finale complète
- Thème prêt pour release

---

## 6. Matrice de Priorisation

### Matrice Eisenhower : Impact × Effort

```
                    ┌─────────────────────────────────┐
                    │                                 │
        QUICK WINS  │  HIGH IMPACT, LOW EFFORT        │  STRATEGIC
                    │                                 │
                    │  - Tâche 1.1: Supprimer backup  │  - Tâche 2.3: Grille DSFR
                    │  - Tâche 1.2: Supprimer legacy  │  - Tâche 2.4: Boutons DSFR
                    │  - Tâche 2.2: text-start/end    │  - Tâche 3.1: Découpler templates
 HIGH IMPACT        │  - Tâche 2.5: Alertes DSFR      │  - Tâche 4.2: Tests auto
                    │  - Tâche 5.1: Audit final       │  - Tâche 4.3: Tests exhaustifs
                    │                                 │
                    ├─────────────────────────────────┤
                    │                                 │
        FILL-IN     │  LOW IMPACT, LOW EFFORT         │  THANKLESS
                    │                                 │
                    │  - Tâche 1.3: Consolidation doc │  - Tâche 3.4: Optimiser questions
                    │  - Tâche 1.7: Nettoyer TODO     │  - Tâche 3.5: Variables Twig
                    │  - Tâche 3.6: Structure CSS     │  - Tâche 5.2: Optimisation assets
 LOW IMPACT         │  - Tâche 5.3: Nettoyage final   │
                    │  - Tâche 5.4: Guide migration   │
                    │  - Tâche 5.5: CHANGELOG         │
                    │                                 │
                    └─────────────────────────────────┘
                       LOW EFFORT            HIGH EFFORT
```

### Priorisation par Sprint

**Sprint 1 (Semaine 1-2)** : Quick Wins + Foundation
- Priorité 1 : Tâche 1.1, 1.2 (supprimer code mort)
- Priorité 2 : Tâche 1.5, 1.6 (inventaire, tests)
- Priorité 3 : Tâche 1.3, 1.7 (documentation)

**Sprint 2 (Semaine 3-4)** : Strategic Migration
- Priorité 1 : Tâche 2.3 (grille DSFR)
- Priorité 1 : Tâche 2.4 (boutons DSFR)
- Priorité 2 : Tâche 2.2 (text-start/end)
- Priorité 3 : Tâche 2.5, 2.6 (alertes, modales)

**Sprint 3 (Semaine 5-6)** : Strategic Refactoring
- Priorité 1 : Tâche 3.1 (découpler printanswers)
- Priorité 2 : Tâche 3.3 (inputs DSFR)
- Priorité 3 : Tâche 3.2, 3.4, 3.5, 3.6

**Sprint 4 (Semaine 7)** : Strategic Testing
- Priorité 1 : Tâche 4.2, 4.3 (tests auto + exhaustifs)
- Priorité 2 : Tâche 4.4 (validation RGAA)
- Priorité 3 : Tâche 4.1 (documentation)

**Sprint 5 (Semaine 8)** : Quick Wins Finaux + Validation
- Priorité 1 : Tâche 5.1 (audit final)
- Priorité 2 : Tâche 5.6 (validation finale)
- Priorité 3 : Tâche 5.2, 5.3, 5.4, 5.5 (polish)

---

## 7. Risques & Mitigation

### Risques Techniques

**Risque 1 : Régression fonctionnelle lors migration CSS**
- **Probabilité** : HIGH
- **Impact** : HIGH
- **Mitigation** :
  - Créer suite de tests de non-régression (Tâche 1.6)
  - Tester après chaque modification
  - Prendre screenshots avant/après
  - Git commit fréquents pour rollback si besoin
- **Plan B** : Revenir au commit précédent via git

**Risque 2 : Classes DSFR incompatibles avec LimeSurvey**
- **Probabilité** : MEDIUM
- **Impact** : MEDIUM
- **Mitigation** :
  - Vérifier documentation DSFR officielle
  - Tester sur environnement de dev
  - Créer classes custom DSFR-compatible si nécessaire
- **Plan B** : Utiliser classes custom avec design tokens DSFR

**Risque 3 : Performance dégradée après optimisation**
- **Probabilité** : LOW
- **Impact** : MEDIUM
- **Mitigation** :
  - Mesurer performance avant/après (Lighthouse)
  - Tester sur connexion lente (throttling)
  - Rollback si dégradation > 20%
- **Plan B** : Ne pas minifier certains assets critiques

**Risque 4 : Tests d'accessibilité qui échouent**
- **Probabilité** : MEDIUM
- **Impact** : HIGH
- **Mitigation** :
  - Corriger au fur et à mesure (ne pas accumuler)
  - Documenter les limitations connues
  - Prioriser les erreurs critiques
- **Plan B** : Accepter score 90/100 au lieu de 95/100

### Risques Organisationnels

**Risque 5 : Dépassement du budget temps (160h)**
- **Probabilité** : MEDIUM
- **Impact** : MEDIUM
- **Mitigation** :
  - Tracker le temps par tâche
  - Réajuster les priorités si dépassement
  - Supprimer nice-to-have si nécessaire
- **Plan B** : Réduire périmètre (supprimer Phase 5 polish)

**Risque 6 : Conflits Git lors des modifications massives**
- **Probabilité** : LOW
- **Impact** : LOW
- **Mitigation** :
  - Commits fréquents et atomiques
  - Branches feature pour chaque phase
  - Merge réguliers
- **Plan B** : Cherry-pick les commits importants

**Risque 7 : Documentation obsolète rapidement**
- **Probabilité** : HIGH
- **Impact** : LOW
- **Mitigation** :
  - Mettre à jour documentation en même temps que code
  - Automatiser génération de docs si possible
  - Reviewer docs à chaque fin de sprint
- **Plan B** : Accepter docs partiellement à jour, compléter post-release

### Risques Externes

**Risque 8 : Nouvelle version DSFR pendant le projet**
- **Probabilité** : LOW
- **Impact** : MEDIUM
- **Mitigation** :
  - Fixer version DSFR 1.11.0 pendant le projet
  - Ne pas upgrader en cours de route
  - Planifier upgrade DSFR en post-release
- **Plan B** : Continuer avec DSFR 1.11.0

**Risque 9 : Breaking changes LimeSurvey**
- **Probabilité** : LOW
- **Impact** : HIGH
- **Mitigation** :
  - Fixer version LimeSurvey pendant le projet
  - Tester sur version stable uniquement
  - Documenter version LimeSurvey compatible
- **Plan B** : Ajouter polyfills/workarounds

---

## 8. Critères de Succès

### Critères Techniques (Quantitatifs)

**1. Conformité CSS**
- ✅ 0 classe Bootstrap dans le code
- ✅ 1000+ classes DSFR (fr-*) utilisées
- ✅ 100% des composants utilisent classes DSFR natives
- ✅ Aucun @import Bootstrap dans CSS

**2. Code Mort**
- ✅ 0 MB de fichiers backup
- ✅ 0 fichier legacy/old/deprecated
- ✅ Taille distribution < 8 MB (objectif depuis 13 MB)
- ✅ Tous les fichiers Twig/CSS/JS utilisés

**3. Qualité du Code**
- ✅ 0 TODO/FIXME/HACK/BUG dans le code
- ✅ Taux de duplication < 5%
- ✅ CSS bien structuré et commenté
- ✅ Templates Twig découplés et maintenables

**4. Accessibilité RGAA**
- ✅ Score pa11y : 95/100 minimum
- ✅ 0 erreur critique WCAG2AA
- ✅ Contraste minimum 4.5:1 respecté
- ✅ Navigation clavier complète fonctionnelle

**5. Performance**
- ✅ First Contentful Paint < 1.5s
- ✅ Time to Interactive < 3s
- ✅ Cumulative Layout Shift < 0.1
- ✅ Bundle CSS < 300 KB
- ✅ Bundle JS < 200 KB

### Critères Fonctionnels (Qualitatifs)

**6. Tests de Non-Régression**
- ✅ Tous les 22 types de questions fonctionnels
- ✅ Tous les workflows testés (save, load, submit, etc.)
- ✅ Responsive mobile/tablet/desktop validé
- ✅ Modales DSFR fonctionnelles
- ✅ Navigation clavier opérationnelle

**7. Documentation**
- ✅ README.md complet et à jour
- ✅ ARCHITECTURE.md détaillé
- ✅ COMPONENTS.md exhaustif
- ✅ ACCESSIBILITY.md présent
- ✅ MIGRATION_GUIDE.md utile
- ✅ CHANGELOG.md complet

**8. Conformité DSFR Officielle**
- ✅ Structure HTML conforme DSFR
- ✅ Design tokens DSFR respectés
- ✅ Composants natifs DSFR utilisés
- ✅ JavaScript DSFR.js fonctionnel
- ✅ Thème clair/sombre supporté

### Critères d'Acceptation (Validation Finale)

**9. Audit Final**
- ✅ Script final_css_audit.sh : 0 Bootstrap, 1000+ DSFR
- ✅ Tests automatisés : 100% passent
- ✅ Checklist manuelle : 100% complétée
- ✅ Rapport accessibilité : conforme RGAA

**10. Release Ready**
- ✅ Git repository propre (pas de conflits)
- ✅ CHANGELOG.md complet
- ✅ Tag git v2.0.0 créé
- ✅ Documentation déployée
- ✅ Thème exportable et importable LimeSurvey

---

## Annexes

### Annexe A : Commandes Utiles

**Scan Classes Bootstrap**
```bash
grep -rn "col-xs-\|col-sm-\|btn-default\|pull-left" themes/survey/dsfr/ --include="*.twig"
```

**Count Classes DSFR**
```bash
grep -rn "fr-" themes/survey/dsfr/ --include="*.twig" | wc -l
```

**Taille du Thème**
```bash
du -sh themes/survey/dsfr/
```

**Audit TODO**
```bash
grep -rn "TODO\|FIXME\|HACK" themes/survey/dsfr/ --include="*.twig" --include="*.css" --include="*.js"
```

**Test Accessibilité**
```bash
pa11y-ci --config tests/pa11y-config.json
```

**Performance Lighthouse**
```bash
lighthouse http://localhost:8080/index.php/123456 --output html --output-path ./report.html
```

### Annexe B : Ressources & Références

**DSFR**
- Documentation officielle : https://www.systeme-de-design.gouv.fr/
- Composants DSFR : https://www.systeme-de-design.gouv.fr/composants
- GitHub DSFR : https://github.com/GouvernementFR/dsfr

**LimeSurvey**
- Documentation : https://manual.limesurvey.org/
- Theming : https://manual.limesurvey.org/Themes

**Accessibilité**
- RGAA : https://www.numerique.gouv.fr/publications/rgaa-accessibilite/
- WCAG 2.1 : https://www.w3.org/TR/WCAG21/
- pa11y : https://pa11y.org/

**Outils**
- Lighthouse : https://developers.google.com/web/tools/lighthouse
- axe DevTools : https://www.deque.com/axe/devtools/
- WAVE : https://wave.webaim.org/

### Annexe C : Contact & Support

**Mainteneur** : Bertrand Matge
**Email** : bertrand.matge@finances.gouv.fr
**GitHub** : https://github.com/bmatge

**Issues** : Créer une issue sur GitHub
**Contributions** : Pull requests bienvenues

---

## Conclusion

Ce plan d'action exhaustif détaille les **160 heures** (8 semaines) nécessaires pour atteindre **100% de conformité DSFR** dans le thème LimeSurvey.

**Points clés** :
- **454 occurrences** Bootstrap à migrer (235 btn-*, 161 col-*, 58 text-*)
- **2.8 MB** de code mort à supprimer
- **32 templates** printanswers à découpler
- **43 TODO/FIXME** à résoudre
- **1000+ classes DSFR** à implémenter

**Livrables finaux** :
- ✅ Thème 100% DSFR (0 Bootstrap)
- ✅ Score accessibilité 95/100
- ✅ Documentation complète
- ✅ Tests automatisés
- ✅ Performance optimisée

**Prêt pour démarrer le Sprint 1** 🚀

---

**Version** : 1.0
**Date** : 2025-11-17
**Auteur** : Claude Code + Bertrand Matge
