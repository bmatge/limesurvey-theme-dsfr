# Formulaire de Test - Tous les Types de Questions LimeSurvey × DSFR

**Date de création** : 2025-11-07
**Objectif** : Tester tous les types de questions LimeSurvey avec toutes leurs options de présentation dans le thème DSFR

---

## 📋 STRUCTURE DU QUESTIONNAIRE DE TEST

### GROUPE 1 : Questions à Choix Unique

#### Q1.1 : 5 Point Choice (Type: 5)
- **Code** : `Q1_5POINT_RADIO`
- **Question** : "Évaluez votre satisfaction (5 points - Radio)"
- **Type** : 5 Point Choice
- **Display** : Radio buttons
- **Options** :
  - 1 = Très insatisfait
  - 2 = Insatisfait
  - 3 = Neutre
  - 4 = Satisfait
  - 5 = Très satisfait
- **Paramètres** : Show "No answer" option = Yes

#### Q1.2 : 5 Point Choice (Dropdown variant)
- **Code** : `Q1_5POINT_SELECT`
- **Question** : "Évaluez votre satisfaction (5 points - Dropdown)"
- **Type** : 5 Point Choice
- **Display** : Dropdown/Select
- **Options** : Identiques à Q1.1
- **Paramètres** : Show "No answer" option = Yes

#### Q1.3 : List (Radio) - Type L
- **Code** : `Q1_LIST_RADIO`
- **Question** : "Quel est votre département ? (Radio)"
- **Type** : List (Radio)
- **Options** :
  - 01 = Ain
  - 75 = Paris
  - 13 = Bouches-du-Rhône
  - 69 = Rhône
  - 33 = Gironde
- **Paramètres** : Show "No answer" = Yes, Other option = No

#### Q1.4 : List (Radio) with Other
- **Code** : `Q1_LIST_RADIO_OTHER`
- **Question** : "Quel est votre département ? (avec Autre)"
- **Type** : List (Radio)
- **Options** : Identiques à Q1.3
- **Paramètres** : Show "No answer" = Yes, **Other option = Yes**

#### Q1.5 : List (Dropdown) - Type !
- **Code** : `Q1_LIST_DROPDOWN`
- **Question** : "Quel est votre département ? (Dropdown)"
- **Type** : List (Dropdown)
- **Options** : Identiques à Q1.3
- **Paramètres** : Show "No answer" = Yes

#### Q1.6 : Yes/No (Radio) - Type Y
- **Code** : `Q1_YESNO_RADIO`
- **Question** : "Acceptez-vous les conditions ? (Radio)"
- **Type** : Yes/No
- **Display** : Radio buttons
- **Paramètres** : Show "No answer" = Yes

#### Q1.7 : Yes/No (Buttons)
- **Code** : `Q1_YESNO_BUTTONS`
- **Question** : "Acceptez-vous les conditions ? (Buttons)"
- **Type** : Yes/No
- **Display** : Button display
- **Paramètres** : Show "No answer" = Yes

#### Q1.8 : Gender (Radio) - Type G
- **Code** : `Q1_GENDER_RADIO`
- **Question** : "Quel est votre genre ? (Radio)"
- **Type** : Gender
- **Display** : Radio buttons
- **Paramètres** : Show "No answer" = Yes

#### Q1.9 : Gender (Buttons)
- **Code** : `Q1_GENDER_BUTTONS`
- **Question** : "Quel est votre genre ? (Buttons)"
- **Type** : Gender
- **Display** : Button display
- **Paramètres** : Show "No answer" = Yes

---

### GROUPE 2 : Questions à Choix Multiple

#### Q2.1 : Multiple Choice (Checkbox) - Type M
- **Code** : `Q2_MULTIPLE_CHECKBOX`
- **Question** : "Quels services publics utilisez-vous ? (Checkboxes)"
- **Type** : Multiple Choice
- **Display** : Checkbox list
- **Subquestions** :
  - SQ001 = CAF
  - SQ002 = Pôle Emploi
  - SQ003 = CPAM
  - SQ004 = Préfecture
  - SQ005 = Mairie
- **Paramètres** : Other option = No

#### Q2.2 : Multiple Choice with Other
- **Code** : `Q2_MULTIPLE_OTHER`
- **Question** : "Quels services publics utilisez-vous ? (avec Autre)"
- **Type** : Multiple Choice
- **Display** : Checkbox list
- **Subquestions** : Identiques à Q2.1
- **Paramètres** : **Other option = Yes**

#### Q2.3 : Multiple Choice with Comments - Type P
- **Code** : `Q2_MULTIPLE_COMMENTS`
- **Question** : "Services publics avec commentaires"
- **Type** : Multiple Choice with Comments
- **Subquestions** : Identiques à Q2.1
- **Paramètres** : Each checkbox has a comment field

---

### GROUPE 3 : Questions Texte

#### Q3.1 : Short Free Text - Type S
- **Code** : `Q3_SHORT_TEXT`
- **Question** : "Votre nom complet"
- **Type** : Short Free Text
- **Input Type** : Text
- **Paramètres** : Max characters = 100

#### Q3.2 : Short Free Text (Email validation)
- **Code** : `Q3_SHORT_EMAIL`
- **Question** : "Votre adresse email"
- **Type** : Short Free Text
- **Input Type** : Email validation
- **Paramètres** : Validation = Email

#### Q3.3 : Short Free Text (Number)
- **Code** : `Q3_SHORT_NUMBER`
- **Question** : "Votre code postal"
- **Type** : Short Free Text
- **Input Type** : Numbers only
- **Paramètres** : Numbers only = Yes

#### Q3.4 : Long Free Text - Type T
- **Code** : `Q3_LONG_TEXT`
- **Question** : "Décrivez votre expérience (zone de texte)"
- **Type** : Long Free Text
- **Paramètres** : Rows = 5

#### Q3.5 : Huge Free Text - Type U
- **Code** : `Q3_HUGE_TEXT`
- **Question** : "Rapport détaillé (grande zone de texte)"
- **Type** : Huge Free Text
- **Paramètres** : Rows = 10, Text editor = No

---

### GROUPE 4 : Questions Numériques

#### Q4.1 : Numerical Input - Type N
- **Code** : `Q4_NUMERICAL`
- **Question** : "Quel est votre âge ?"
- **Type** : Numerical Input
- **Paramètres** :
  - Min value = 0
  - Max value = 120

#### Q4.2 : Numerical with Prefix/Suffix
- **Code** : `Q4_NUMERICAL_CURRENCY`
- **Question** : "Quel est votre revenu mensuel ?"
- **Type** : Numerical Input
- **Paramètres** :
  - Prefix = "€"
  - Suffix = "par mois"

#### Q4.3 : Multiple Numeric - Type K
- **Code** : `Q4_MULTIPLE_NUMERIC`
- **Question** : "Vos mesures corporelles"
- **Type** : Multiple Numeric
- **Subquestions** :
  - SQ001 = Taille (cm)
  - SQ002 = Poids (kg)
  - SQ003 = Tour de taille (cm)

---

### GROUPE 5 : Questions Texte Multiple

#### Q5.1 : Multiple Short Text - Type Q
- **Code** : `Q5_MULTIPLE_SHORT`
- **Question** : "Vos coordonnées complètes"
- **Type** : Multiple Short Text
- **Subquestions** :
  - SQ001 = Prénom
  - SQ002 = Nom
  - SQ003 = Adresse
  - SQ004 = Ville
  - SQ005 = Code postal

#### Q5.2 : Multiple Short Text with Validation
- **Code** : `Q5_MULTIPLE_SHORT_VALIDATION`
- **Question** : "Contacts avec validation"
- **Type** : Multiple Short Text
- **Subquestions** :
  - SQ001 = Email (validation email)
  - SQ002 = Téléphone (validation regex)
  - SQ003 = Site web (validation URL)

---

### GROUPE 6 : Questions Array (Tableaux)

#### Q6.1 : Array (5-Point) - Type A
- **Code** : `Q6_ARRAY_5POINT`
- **Question** : "Évaluez nos services (échelle 5 points)"
- **Type** : Array (5-Point)
- **Subquestions** :
  - SQ001 = Qualité d'accueil
  - SQ002 = Temps d'attente
  - SQ003 = Clarté des informations
  - SQ004 = Professionnalisme
  - SQ005 = Résolution du problème
- **Answers** : 1 à 5 (auto-généré)

#### Q6.2 : Array (10-Point) - Type B
- **Code** : `Q6_ARRAY_10POINT`
- **Question** : "Évaluez nos services (échelle 10 points)"
- **Type** : Array (10-Point)
- **Subquestions** : Identiques à Q6.1
- **Answers** : 1 à 10 (auto-généré)

#### Q6.3 : Array (Yes/No/Uncertain) - Type C
- **Code** : `Q6_ARRAY_YESNOUNCERTAIN`
- **Question** : "Affirmations sur le service public"
- **Type** : Array (Yes/No/Uncertain)
- **Subquestions** :
  - SQ001 = Le service est accessible
  - SQ002 = Le personnel est compétent
  - SQ003 = Les délais sont respectés
  - SQ004 = L'information est claire
- **Answers** : Yes / No / Uncertain

#### Q6.4 : Array (Flexible) - Type F
- **Code** : `Q6_ARRAY_FLEXIBLE`
- **Question** : "Fréquence d'utilisation des services"
- **Type** : Array (Flexible/No Dropdown)
- **Subquestions** : Identiques à Q6.1
- **Answers** :
  - A1 = Jamais
  - A2 = Rarement
  - A3 = Parfois
  - A4 = Souvent
  - A5 = Toujours

#### Q6.5 : Array (Flexible Dropdown) - Type F avec dropdown
- **Code** : `Q6_ARRAY_FLEXIBLE_DROPDOWN`
- **Question** : "Fréquence d'utilisation (Dropdown)"
- **Type** : Array (Flexible)
- **Display** : Dropdown variant
- **Subquestions** : Identiques à Q6.1
- **Answers** : Identiques à Q6.4

#### Q6.6 : Array (Texts) - Type ;
- **Code** : `Q6_ARRAY_TEXTS`
- **Question** : "Commentaires par service"
- **Type** : Array (Texts)
- **Subquestions** : Identiques à Q6.1

#### Q6.7 : Array (Column) - Type H
- **Code** : `Q6_ARRAY_COLUMN`
- **Question** : "Satisfaction par critère (colonnes)"
- **Type** : Array (Column)
- **Subquestions** : Identiques à Q6.1
- **Answers** : Identiques à Q6.4

#### Q6.8 : Array (Dual Scale) - Type 1
- **Code** : `Q6_ARRAY_DUAL`
- **Question** : "Importance vs Satisfaction"
- **Type** : Array (Dual Scale)
- **Subquestions** : Identiques à Q6.1
- **Scale 1** : Importance (1-5)
- **Scale 2** : Satisfaction (1-5)

#### Q6.9 : Array (Increase/Same/Decrease) - Type E
- **Code** : `Q6_ARRAY_ISD`
- **Question** : "Évolution souhaitée des services"
- **Type** : Array (Increase/Same/Decrease)
- **Subquestions** : Identiques à Q6.1

#### Q6.10 : Array (Multi-flexi) - Type :
- **Code** : `Q6_ARRAY_MULTIFLEXI`
- **Question** : "Évaluation multi-axes"
- **Type** : Array (Multi-flexi)
- **Subquestions** : Identiques à Q6.1
- **Y-Axis** :
  - Y1 = Qualité
  - Y2 = Rapidité
  - Y3 = Efficacité

---

### GROUPE 7 : Questions Spéciales

#### Q7.1 : Date/Time - Type D
- **Code** : `Q7_DATE`
- **Question** : "Date de naissance"
- **Type** : Date/Time
- **Format** : Date only (DD/MM/YYYY)
- **Paramètres** : Date format = French

#### Q7.2 : Date/Time with Time
- **Code** : `Q7_DATETIME`
- **Question** : "Date et heure de rendez-vous"
- **Type** : Date/Time
- **Format** : Date + Time (DD/MM/YYYY HH:MM)

#### Q7.3 : File Upload - Type |
- **Code** : `Q7_UPLOAD`
- **Question** : "Téléchargez votre justificatif"
- **Type** : File Upload
- **Paramètres** :
  - Max files = 3
  - Max size = 5MB
  - Allowed types = PDF, JPG, PNG

#### Q7.4 : Language Switch - Type I
- **Code** : `Q7_LANGUAGE`
- **Question** : "Choisissez votre langue de préférence"
- **Type** : Language Switch
- **Note** : Affiche les langues disponibles dans l'enquête

#### Q7.5 : Ranking - Type R
- **Code** : `Q7_RANKING`
- **Question** : "Classez ces services par ordre de préférence"
- **Type** : Ranking
- **Options** :
  - A1 = Service en ligne
  - A2 = Guichet physique
  - A3 = Téléphone
  - A4 = Courrier
  - A5 = Email

#### Q7.6 : Equation - Type *
- **Code** : `Q7_EQUATION`
- **Question** : "Calcul automatique : Âge + 10"
- **Type** : Equation
- **Formula** : `{Q4_NUMERICAL} + 10`
- **Note** : Invisible à l'utilisateur, sert au calcul

#### Q7.7 : Boilerplate/Text Display - Type X
- **Code** : `Q7_BOILERPLATE`
- **Question** : N/A (pas de question)
- **Type** : Boilerplate Question
- **Content** :
  ```
  Ceci est un texte d'information.
  Il permet d'afficher du contenu sans poser de question.
  Utilisé pour des instructions ou des explications.
  ```

---

### GROUPE 8 : Questions avec Commentaires

#### Q8.1 : List with Comment - Type O
- **Code** : `Q8_LIST_COMMENT`
- **Question** : "Service préféré (avec commentaire)"
- **Type** : List (Radio) with Comment
- **Options** : Identiques à Q1.3
- **Paramètres** : Comment enabled = Yes

#### Q8.2 : Multiple Choice with Comments - Type P
- **Code** : `Q8_MULTIPLE_COMMENTS`
- **Question** : "Services utilisés (avec commentaires)"
- **Type** : Multiple Choice with Comments
- **Subquestions** : Identiques à Q2.1
- **Paramètres** : Each choice has comment field

---

### GROUPE 9 : Questions Avancées

#### Q9.1 : Multiple Short Text (Input + Textarea mix)
- **Code** : `Q9_MULTIPLE_MIXED`
- **Question** : "Informations détaillées"
- **Type** : Multiple Short Text
- **Subquestions** :
  - SQ001 = Titre (input text)
  - SQ002 = Description (textarea)
  - SQ003 = Remarques (textarea)

#### Q9.2 : Array (Multi-flexi Text) - Type ;
- **Code** : `Q9_ARRAY_FLEXI_TEXT`
- **Question** : "Commentaires par service et critère"
- **Type** : Array (Multi-flexi Text)
- **Subquestions** :
  - SQ001 = Service A
  - SQ002 = Service B
  - SQ003 = Service C
- **Y-Axis** :
  - Y1 = Points positifs
  - Y2 = Points négatifs
  - Y3 = Suggestions

---

### GROUPE 10 : Options de Présentation Avancées

#### Q10.1 : List (Radio) - Horizontal Layout
- **Code** : `Q10_LIST_HORIZONTAL`
- **Question** : "Satisfaction (horizontal)"
- **Type** : List (Radio)
- **Display** : Horizontal layout
- **Options** : 5 niveaux de satisfaction
- **Paramètres** : Display = Horizontal

#### Q10.2 : List (Radio) - Dropdown on Mobile
- **Code** : `Q10_LIST_RESPONSIVE`
- **Question** : "Satisfaction (responsive)"
- **Type** : List (Radio)
- **Display** : Radio on desktop, Dropdown on mobile
- **Options** : 5 niveaux
- **Paramètres** : Responsive display = Yes

#### Q10.3 : Array with Random Order
- **Code** : `Q10_ARRAY_RANDOM`
- **Question** : "Services (ordre aléatoire)"
- **Type** : Array (5-Point)
- **Subquestions** : Identiques à Q6.1
- **Paramètres** : **Random order = Yes**

#### Q10.4 : Array with Answer Width Control
- **Code** : `Q10_ARRAY_WIDTH`
- **Question** : "Services (largeur contrôlée)"
- **Type** : Array (Flexible)
- **Subquestions** : Identiques à Q6.1
- **Answers** : Identiques à Q6.4
- **Paramètres** : Answer width = 33% (custom CSS)

---

### GROUPE 11 : Conditions et Logique

#### Q11.1 : Mandatory Question
- **Code** : `Q11_MANDATORY`
- **Question** : "Cette question est obligatoire"
- **Type** : Short Free Text
- **Paramètres** : **Mandatory = Yes**

#### Q11.2 : Conditional Question
- **Code** : `Q11_CONDITIONAL`
- **Question** : "Visible seulement si Q1_YESNO_RADIO = 'Yes'"
- **Type** : Short Free Text
- **Paramètres** : **Relevance equation** = `{Q1_YESNO_RADIO == 'Y'}`

#### Q11.3 : Question with Validation
- **Code** : `Q11_VALIDATION`
- **Question** : "Email avec validation stricte"
- **Type** : Short Free Text
- **Paramètres** :
  - Validation = Regular expression
  - Pattern = Email validation
  - **Validation message** = "Format email invalide"

#### Q11.4 : Question with Help Text
- **Code** : `Q11_HELP`
- **Question** : "Question avec texte d'aide"
- **Type** : Short Free Text
- **Help Text** : "Texte d'aide pour guider l'utilisateur. Peut contenir des instructions détaillées."

---

### GROUPE 12 : Affichage et Navigation

#### Format de Page : All in One
- **Code** : Format = A
- **Test** : Toutes les questions sur une seule page

#### Format de Page : Group by Group
- **Code** : Format = G
- **Test** : Un groupe par page

#### Format de Page : Question by Question
- **Code** : Format = S
- **Test** : Une question par page

#### Options de Navigation :
- ✅ **Question Index** activé
- ✅ **Progress Bar** activée
- ✅ **Keyboard Navigation** activée
- ✅ **Previous Button** activé

---

## 🎯 MATRICE DE TESTS

### Tests à Effectuer pour Chaque Type de Question

| Test | Description | Statut |
|------|-------------|--------|
| **Affichage** | Rendu visuel conforme DSFR | ⬜ |
| **Responsive** | Mobile/Tablet/Desktop | ⬜ |
| **Validation** | Messages d'erreur DSFR | ⬜ |
| **Mandatory** | Indicateur obligatoire (astérisque) | ⬜ |
| **Help Text** | Affichage aide contextuelle | ⬜ |
| **No Answer** | Option "Pas de réponse" | ⬜ |
| **Other Option** | Champ "Autre" fonctionnel | ⬜ |
| **Accessibility** | Navigation clavier | ⬜ |
| **Screen Reader** | Lecture NVDA/JAWS | ⬜ |
| **Print** | PDF génération correcte | ⬜ |
| **Save/Load** | Sauvegarde réponses | ⬜ |
| **Relevance** | Affichage conditionnel | ⬜ |

---

## 📝 INSTRUCTIONS POUR CRÉER LE QUESTIONNAIRE DE TEST

### Méthode 1 : Import via fichier LSS

Créer un fichier `test_dsfr_complete.lss` (structure XML LimeSurvey) avec toutes les questions ci-dessus.

### Méthode 2 : API LimeSurvey

Utiliser l'API RemoteControl pour créer programmatiquement toutes les questions.

### Méthode 3 : Interface Admin (Manuel)

1. Créer une nouvelle enquête "Test DSFR - Types de Questions"
2. Créer 12 groupes comme défini ci-dessus
3. Ajouter chaque question manuellement
4. Configurer les paramètres spécifiques

---

## 🔍 VÉRIFICATIONS SPÉCIFIQUES PAR COMPOSANT

### Input Types à Tester

- [ ] `<input type="text">` - Short text
- [ ] `<input type="email">` - Email validation
- [ ] `<input type="number">` - Numeric input
- [ ] `<input type="tel">` - Telephone
- [ ] `<input type="url">` - URL validation
- [ ] `<input type="date">` - Date picker
- [ ] `<input type="time">` - Time picker
- [ ] `<input type="radio">` - Radio buttons
- [ ] `<input type="checkbox">` - Checkboxes
- [ ] `<textarea>` - Text area
- [ ] `<select>` - Dropdown

### DSFR Components à Valider

- [ ] `fr-input` - Text inputs
- [ ] `fr-select` - Dropdowns
- [ ] `fr-radio-group` - Radio buttons
- [ ] `fr-checkbox-group` - Checkboxes
- [ ] `fr-fieldset` - Question containers
- [ ] `fr-label` - Labels
- [ ] `fr-input-group` - Input with prefix/suffix
- [ ] `fr-table` - Array questions
- [ ] `fr-alert` - Error messages
- [ ] `fr-hint-text` - Help text

### States à Tester

- [ ] **Default** - État initial
- [ ] **Focus** - Champ actif
- [ ] **Error** - Validation échouée
- [ ] **Disabled** - Champ désactivé
- [ ] **Readonly** - Lecture seule
- [ ] **Valid** - Validation réussie

---

## 🚨 GAPS IDENTIFIÉS (Coverage 46%)

### Question Types NON Couverts (15 types)

| Type | Code | Priorité | Impact |
|------|------|----------|--------|
| List with Comment | O | 🔴 Haute | Très utilisé |
| Multiple Choice with Comments | P | 🔴 Haute | Très utilisé |
| Date/Time | D | 🔴 Haute | Essentiel |
| File Upload | \| | 🟠 Moyenne | Important |
| Long Free Text | T | 🔴 Haute | Vide ! |
| Huge Free Text | U | 🟡 Basse | Rare |
| Multiple Numeric | K | 🟡 Basse | Spécialisé |
| Ranking | R | 🟠 Moyenne | Interactif |
| Array Texts | ; | 🟠 Moyenne | Commentaires |
| Array Column | H | 🟡 Basse | Spécialisé |
| Array Dual Scale | 1 | 🟡 Basse | Spécialisé |
| Array Multi-flexi | : | 🟡 Basse | Avancé |
| Array Increase/Same/Decrease | E | 🟡 Basse | Spécialisé |
| Boilerplate | X | 🟢 Très basse | Affichage |
| Equation | * | 🟢 Très basse | Calcul |

---

## 💡 RECOMMANDATIONS

### Actions Immédiates (Haute Priorité)

1. **Créer template Long Free Text** (Type T)
   - Directory vide : `themes/survey/dsfr/views/survey/questions/answer/longfreetext/`
   - Template nécessaire : `answer.twig`
   - Basé sur : Short Free Text avec textarea plus large

2. **Créer List with Comment** (Type O)
   - Template : `listradio_with_comment/answer.twig`
   - Basé sur : List Radio + textarea commentaire

3. **Créer Multiple Choice with Comments** (Type P)
   - Template : `multiplechoice_with_comments/answer.twig`
   - Basé sur : Multiple Choice + textarea par option

4. **Créer Date/Time** (Type D)
   - Template : `date/answer.twig`
   - Utiliser : `<input type="date" class="fr-input">`

### Actions Moyennes (Coverage Standard)

5. File Upload (Type |)
6. Ranking (Type R)
7. Array Texts (Type ;)

### Documentation

8. Créer matrice de compatibilité DSFR par type de question
9. Ajouter warnings dans le guide utilisateur
10. Documenter les fallback Bootstrap pour types non couverts

---

## 📊 STATUT ACTUEL

**Couverture** : 13/28 types (46%)
**DSFR Compliant** : 10/13 types (77% des types couverts)
**Bootstrap Residue** : 3 types (gender radio, yesno radio, multipleshorttext)

**Production Ready** : ✅ Oui, pour enquêtes standard
**Full Coverage** : ⚠️ Non, 54% des types utilisent fallback Bootstrap

---

## 🎬 COMMENT UTILISER CE DOCUMENT

1. Créer l'enquête de test dans LimeSurvey Admin
2. Ajouter chaque groupe et question comme décrit
3. Activer le thème DSFR
4. Tester chaque question dans les 3 formats (All-in-one, Group, Question)
5. Tester responsive (mobile, tablet, desktop)
6. Tester impression/PDF
7. Tester avec NVDA/JAWS pour accessibilité
8. Documenter les bugs/problèmes rencontrés
9. Prioriser les templates manquants à créer

---

**Voulez-vous que je génère le fichier LSS (structure XML) pour importer directement cette enquête de test ?**
