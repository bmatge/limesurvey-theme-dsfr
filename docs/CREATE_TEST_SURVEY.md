# Guide de Création - Enquête de Test DSFR Complète

**Objectif** : Créer une enquête testant TOUS les types de questions × TOUTES les options d'affichage

**Structure** : 1 groupe par type de question, 1 question par variante

---

## 📋 STRUCTURE GLOBALE

**Paramètres de l'enquête** :
- Nom : "Test DSFR - Couverture Complète Types de Questions"
- Thème : **dsfr**
- Format : **Group by Group** (un groupe par page)
- Options activées :
  - ✅ Question index
  - ✅ Progress bar
  - ✅ Previous button
  - ✅ Allow save
  - ✅ Print answers
  - ✅ Show "No answer" option

---

## 🎯 GROUPES ET QUESTIONS

### GROUPE 1 : 5 Point Choice (Type 5)

**Description** : "Type 5 - Échelle de satisfaction 5 points"

#### Q1.1 : 5 Point Choice - Radio (Défaut)
- **Code** : `G1_Q1_RADIO`
- **Type** : 5 Point Choice (5)
- **Question** : "Satisfaction globale (Radio buttons)"
- **Display** : Par défaut (radio vertical)
- **Mandatory** : Non
- **Help** : "✅ DSFR natif - Template : 5pointchoice/answer.twig"

#### Q1.2 : 5 Point Choice - Boutons Riches
- **Code** : `G1_Q2_BUTTONS`
- **Type** : 5 Point Choice (5)
- **Question** : "Satisfaction globale (Boutons riches)"
- **Display** : Button display (via config.xml)
- **Mandatory** : Non
- **Help** : "✅ DSFR natif - Utilise fr-radio-rich avec icônes"

#### Q1.3 : 5 Point Choice - Sans "No answer"
- **Code** : `G1_Q3_NO_NOANSWER`
- **Type** : 5 Point Choice (5)
- **Question** : "Satisfaction globale (Sans option 'Pas de réponse')"
- **Display** : Radio
- **Mandatory** : Oui (obligatoire)
- **Help** : "✅ Test du caractère obligatoire avec astérisque DSFR"

---

### GROUPE 2 : List Radio/Dropdown (Types L et !)

**Description** : "Types L et ! - Listes de choix"

#### Q2.1 : List Radio - Vertical
- **Code** : `G2_Q1_RADIO_VERTICAL`
- **Type** : List (Radio) (L)
- **Question** : "Votre département (Radio vertical)"
- **Answers** :
  - 01 = Ain
  - 75 = Paris
  - 13 = Bouches-du-Rhône
  - 69 = Rhône
  - 33 = Gironde
  - 59 = Nord
  - 31 = Haute-Garonne
  - 44 = Loire-Atlantique
- **Display** : Radio vertical (défaut)
- **Help** : "✅ DSFR natif - Template : listradio/answer.twig"

#### Q2.2 : List Radio - Avec Option "Autre"
- **Code** : `G2_Q2_RADIO_OTHER`
- **Type** : List (Radio) (L)
- **Question** : "Votre département (Radio avec Autre)"
- **Answers** : Identiques à Q2.1
- **Other** : **YES** (activer option "Autre")
- **Help** : "✅ Test option 'Autre' avec champ texte"

#### Q2.3 : List Dropdown
- **Code** : `G2_Q3_DROPDOWN`
- **Type** : List (Dropdown) (!)
- **Question** : "Votre département (Menu déroulant)"
- **Answers** : Identiques à Q2.1
- **Help** : "✅ DSFR natif - Utilise fr-select"

#### Q2.4 : List Dropdown - Mandatory
- **Code** : `G2_Q4_DROPDOWN_MANDATORY`
- **Type** : List (Dropdown) (!)
- **Question** : "Votre département (Obligatoire)"
- **Answers** : Identiques à Q2.1
- **Mandatory** : Oui
- **Help** : "✅ Test dropdown obligatoire"

---

### GROUPE 3 : Yes/No (Type Y)

**Description** : "Type Y - Questions Oui/Non"

#### Q3.1 : Yes/No - Radio Simple
- **Code** : `G3_Q1_RADIO`
- **Type** : Yes/No (Y)
- **Question** : "Acceptez-vous les conditions ? (Radio simple)"
- **Display** : Radio (défaut)
- **Help** : "✅ DSFR natif - Template : yesno/radio/item.twig"

#### Q3.2 : Yes/No - Boutons Riches
- **Code** : `G3_Q2_BUTTONS`
- **Type** : Yes/No (Y)
- **Question** : "Acceptez-vous les conditions ? (Boutons riches)"
- **Display** : Button display (via config.xml)
- **Help** : "✅ DSFR natif - Template : yesno/buttons/item.twig avec fr-radio-rich"

#### Q3.3 : Yes/No - Mandatory
- **Code** : `G3_Q3_MANDATORY`
- **Type** : Yes/No (Y)
- **Question** : "Acceptez-vous les conditions ? (Obligatoire)"
- **Display** : Boutons riches
- **Mandatory** : Oui
- **Help** : "✅ Test Yes/No obligatoire"

---

### GROUPE 4 : Gender (Type G)

**Description** : "Type G - Question de genre"

#### Q4.1 : Gender - Radio Simple
- **Code** : `G4_Q1_RADIO`
- **Type** : Gender (G)
- **Question** : "Quel est votre genre ? (Radio simple)"
- **Display** : Radio (défaut)
- **Help** : "✅ DSFR natif - Template : gender/radio/answer.twig"

#### Q4.2 : Gender - Boutons Riches avec Icônes
- **Code** : `G4_Q2_BUTTONS`
- **Type** : Gender (G)
- **Question** : "Quel est votre genre ? (Boutons avec icônes)"
- **Display** : Button display (via config.xml)
- **Help** : "✅ DSFR natif - Template : gender/buttons/answer.twig avec Remix icons"

---

### GROUPE 5 : Multiple Choice (Type M)

**Description** : "Type M - Choix multiples (checkboxes)"

#### Q5.1 : Multiple Choice - Vertical
- **Code** : `G5_Q1_CHECKBOX`
- **Type** : Multiple Choice (M)
- **Question** : "Quels services publics utilisez-vous ?"
- **Subquestions** :
  - SQ001 = CAF (Caisse d'Allocations Familiales)
  - SQ002 = Pôle Emploi
  - SQ003 = CPAM (Assurance Maladie)
  - SQ004 = Préfecture
  - SQ005 = Mairie
  - SQ006 = Impôts
  - SQ007 = Sécurité Sociale
- **Display** : Checkbox vertical (défaut)
- **Help** : "✅ DSFR natif - Template : multiplechoice/rows/answer_row.twig"

#### Q5.2 : Multiple Choice - Avec Option "Autre"
- **Code** : `G5_Q2_CHECKBOX_OTHER`
- **Type** : Multiple Choice (M)
- **Question** : "Quels services publics utilisez-vous ? (avec Autre)"
- **Subquestions** : Identiques à Q5.1
- **Other** : **YES** (activer option "Autre")
- **Help** : "✅ Test option 'Autre' avec checkbox"

#### Q5.3 : Multiple Choice - Mandatory
- **Code** : `G5_Q3_CHECKBOX_MANDATORY`
- **Type** : Multiple Choice (M)
- **Question** : "Quels services publics utilisez-vous ? (au moins 1 obligatoire)"
- **Subquestions** : Identiques à Q5.1
- **Mandatory** : Oui
- **Validation** : min_answers = 1
- **Help** : "✅ Test validation minimum 1 réponse"

---

### GROUPE 6 : Multiple Choice with Comments (Type P)

**Description** : "Type P - Choix multiples avec commentaires"

#### Q6.1 : Multiple Choice with Comments
- **Code** : `G6_Q1_COMMENTS`
- **Type** : Multiple Choice with Comments (P)
- **Question** : "Services utilisés avec commentaires"
- **Subquestions** :
  - SQ001 = CAF
  - SQ002 = Pôle Emploi
  - SQ003 = CPAM
  - SQ004 = Préfecture
- **Help** : "⚠️ FALLBACK BOOTSTRAP - Template DSFR manquant (priorité HAUTE)"

---

### GROUPE 7 : Short Free Text (Type S)

**Description** : "Type S - Texte court"

#### Q7.1 : Short Text - Simple
- **Code** : `G7_Q1_TEXT`
- **Type** : Short Free Text (S)
- **Question** : "Votre nom complet"
- **Input type** : Text
- **Help** : "✅ DSFR natif - Template : shortfreetext/text/item.twig"

#### Q7.2 : Short Text - Email
- **Code** : `G7_Q2_EMAIL`
- **Type** : Short Free Text (S)
- **Question** : "Votre adresse email"
- **Input type** : Text
- **Validation** : Email validation
- **Attribute** : `text_input_type = email`
- **Help** : "✅ Test validation email avec fr-input"

#### Q7.3 : Short Text - Numbers Only
- **Code** : `G7_Q3_NUMBER`
- **Type** : Short Free Text (S)
- **Question** : "Votre code postal"
- **Input type** : Text
- **Attribute** : `numbers_only = 1`
- **Help** : "✅ Test validation numérique"

#### Q7.4 : Short Text - Max Length
- **Code** : `G7_Q4_MAXLENGTH`
- **Type** : Short Free Text (S)
- **Question** : "Votre ville (max 50 caractères)"
- **Attribute** : `maximum_chars = 50`
- **Help** : "✅ Test limite de caractères"

#### Q7.5 : Short Text - Mandatory
- **Code** : `G7_Q5_MANDATORY`
- **Type** : Short Free Text (S)
- **Question** : "Votre prénom (obligatoire)"
- **Mandatory** : Oui
- **Help** : "✅ Test champ obligatoire avec astérisque"

---

### GROUPE 8 : Long Free Text (Type T)

**Description** : "Type T - Texte long (textarea)"

#### Q8.1 : Long Free Text - 5 lignes
- **Code** : `G8_Q1_LONG`
- **Type** : Long Free Text (T)
- **Question** : "Décrivez votre expérience"
- **Rows** : 5
- **Help** : "🚨 CRITICAL - Template VIDE ! Utilise fallback Bootstrap"

#### Q8.2 : Long Free Text - 10 lignes
- **Code** : `G8_Q2_LONG_BIG`
- **Type** : Long Free Text (T)
- **Question** : "Rapport détaillé"
- **Rows** : 10
- **Help** : "🚨 CRITICAL - À créer en priorité"

---

### GROUPE 9 : Huge Free Text (Type U)

**Description** : "Type U - Texte énorme"

#### Q9.1 : Huge Free Text
- **Code** : `G9_Q1_HUGE`
- **Type** : Huge Free Text (U)
- **Question** : "Rapport complet très détaillé"
- **Help** : "⚠️ FALLBACK BOOTSTRAP - Template DSFR manquant"

---

### GROUPE 10 : Numerical (Type N)

**Description** : "Type N - Valeurs numériques"

#### Q10.1 : Numerical - Simple
- **Code** : `G10_Q1_NUM`
- **Type** : Numerical (N)
- **Question** : "Quel est votre âge ?"
- **Min** : 0
- **Max** : 120
- **Help** : "✅ DSFR natif - Template : numerical/answer.twig"

#### Q10.2 : Numerical - Avec Préfixe
- **Code** : `G10_Q2_NUM_PREFIX`
- **Type** : Numerical (N)
- **Question** : "Quel est votre revenu mensuel ?"
- **Attribute** : `prefix = €`
- **Help** : "✅ Test input avec préfixe"

#### Q10.3 : Numerical - Avec Suffixe
- **Code** : `G10_Q3_NUM_SUFFIX`
- **Type** : Numerical (N)
- **Question** : "Quelle est votre taille ?"
- **Attribute** : `suffix = cm`
- **Help** : "✅ Test input avec suffixe"

#### Q10.4 : Numerical - Préfixe ET Suffixe
- **Code** : `G10_Q4_NUM_BOTH`
- **Type** : Numerical (N)
- **Question** : "Montant de la transaction"
- **Attribute** : `prefix = €`, `suffix = TTC`
- **Help** : "✅ Test input avec préfixe ET suffixe"

#### Q10.5 : Numerical - Mandatory
- **Code** : `G10_Q5_NUM_MANDATORY`
- **Type** : Numerical (N)
- **Question** : "Votre âge (obligatoire)"
- **Mandatory** : Oui
- **Min** : 18
- **Max** : 120
- **Help** : "✅ Test numérique obligatoire avec validation min/max"

---

### GROUPE 11 : Multiple Numeric (Type K)

**Description** : "Type K - Plusieurs valeurs numériques"

#### Q11.1 : Multiple Numeric
- **Code** : `G11_Q1_MULTI_NUM`
- **Type** : Multiple Numeric (K)
- **Question** : "Vos mesures corporelles"
- **Subquestions** :
  - SQ001 = Taille (cm)
  - SQ002 = Poids (kg)
  - SQ003 = Tour de taille (cm)
  - SQ004 = Pointure
- **Help** : "⚠️ FALLBACK BOOTSTRAP - Template DSFR manquant"

---

### GROUPE 12 : Multiple Short Text (Type Q)

**Description** : "Type Q - Plusieurs champs texte courts"

#### Q12.1 : Multiple Short Text - Input
- **Code** : `G12_Q1_MULTI_INPUT`
- **Type** : Multiple Short Text (Q)
- **Question** : "Vos coordonnées (inputs)"
- **Subquestions** :
  - SQ001 = Prénom
  - SQ002 = Nom
  - SQ003 = Email
  - SQ004 = Téléphone
  - SQ005 = Adresse
- **Help** : "✅ DSFR natif - Template : multipleshorttext/rows/answer_row_inputtext.twig"

#### Q12.2 : Multiple Short Text - Textarea
- **Code** : `G12_Q2_MULTI_TEXTAREA`
- **Type** : Multiple Short Text (Q)
- **Question** : "Commentaires multiples (textareas)"
- **Subquestions** :
  - SQ001 = Point positif 1
  - SQ002 = Point positif 2
  - SQ003 = Point négatif 1
  - SQ004 = Suggestion 1
- **Attribute** : Configurer en textarea (dans question attributes)
- **Help** : "✅ DSFR natif - Template : multipleshorttext/rows/answer_row_textarea.twig"

#### Q12.3 : Multiple Short Text - Mandatory
- **Code** : `G12_Q3_MULTI_MANDATORY`
- **Type** : Multiple Short Text (Q)
- **Question** : "Coordonnées obligatoires"
- **Subquestions** :
  - SQ001 = Prénom (obligatoire)
  - SQ002 = Nom (obligatoire)
  - SQ003 = Email (obligatoire)
- **Mandatory** : Oui
- **Help** : "✅ Test champs multiples obligatoires"

---

### GROUPE 13 : Array 5-Point (Type A)

**Description** : "Type A - Tableau échelle 5 points"

#### Q13.1 : Array 5-Point - Standard
- **Code** : `G13_Q1_ARRAY_5PT`
- **Type** : Array (5-Point) (A)
- **Question** : "Évaluez nos services (1 à 5)"
- **Subquestions** :
  - SQ001 = Qualité d'accueil
  - SQ002 = Temps d'attente
  - SQ003 = Clarté des informations
  - SQ004 = Professionnalisme du personnel
  - SQ005 = Résolution du problème
- **Help** : "✅ DSFR natif - Template : arrays/5point/answer.twig avec fr-table"

#### Q13.2 : Array 5-Point - Responsive
- **Code** : `G13_Q2_ARRAY_5PT_RESPONSIVE`
- **Type** : Array (5-Point) (A)
- **Question** : "Évaluez nos services (responsive)"
- **Subquestions** : Identiques à Q13.1
- **Attribute** : `responsive_table = 1`
- **Help** : "✅ Test tableau responsive (scroll horizontal sur mobile)"

---

### GROUPE 14 : Array 10-Point (Type B)

**Description** : "Type B - Tableau échelle 10 points"

#### Q14.1 : Array 10-Point
- **Code** : `G14_Q1_ARRAY_10PT`
- **Type** : Array (10-Point) (B)
- **Question** : "Évaluez nos services (1 à 10)"
- **Subquestions** :
  - SQ001 = Qualité d'accueil
  - SQ002 = Temps d'attente
  - SQ003 = Clarté des informations
- **Help** : "✅ DSFR natif - Template : arrays/10point/answer.twig"

---

### GROUPE 15 : Array Yes/No/Uncertain (Type C)

**Description** : "Type C - Tableau Oui/Non/Incertain"

#### Q15.1 : Array Yes/No/Uncertain
- **Code** : `G15_Q1_ARRAY_YNU`
- **Type** : Array (Yes/No/Uncertain) (C)
- **Question** : "Êtes-vous d'accord avec ces affirmations ?"
- **Subquestions** :
  - SQ001 = Le service est accessible
  - SQ002 = Le personnel est compétent
  - SQ003 = Les délais sont respectés
  - SQ004 = L'information est claire
  - SQ005 = Le service est gratuit
- **Help** : "✅ DSFR natif - Template : arrays/yesnouncertain/answer.twig"

---

### GROUPE 16 : Array Flexible (Type F)

**Description** : "Type F - Tableau avec réponses personnalisées"

#### Q16.1 : Array Flexible - Radio
- **Code** : `G16_Q1_ARRAY_FLEX_RADIO`
- **Type** : Array (Flexible) (F)
- **Question** : "Fréquence d'utilisation (Radio)"
- **Subquestions** :
  - SQ001 = CAF
  - SQ002 = Pôle Emploi
  - SQ003 = CPAM
  - SQ004 = Préfecture
- **Answers** :
  - A1 = Jamais
  - A2 = Rarement
  - A3 = Parfois
  - A4 = Souvent
  - A5 = Toujours
- **Display** : Radio (no dropdown)
- **Help** : "✅ DSFR natif - Template : arrays/array/no_dropdown/answer.twig"

#### Q16.2 : Array Flexible - Dropdown
- **Code** : `G16_Q2_ARRAY_FLEX_DROPDOWN`
- **Type** : Array (Flexible) (F)
- **Question** : "Fréquence d'utilisation (Dropdown)"
- **Subquestions** : Identiques à Q16.1
- **Answers** : Identiques à Q16.1
- **Display** : Dropdown
- **Attribute** : `dropdown_size = 1` ou configuration dropdown
- **Help** : "⚠️ Vérifier si fallback Bootstrap pour variant dropdown"

---

### GROUPE 17 : Array Texts (Type ;)

**Description** : "Type ; - Tableau avec champs texte"

#### Q17.1 : Array Texts
- **Code** : `G17_Q1_ARRAY_TEXTS`
- **Type** : Array (Texts) (;)
- **Question** : "Commentaires par service"
- **Subquestions** :
  - SQ001 = CAF
  - SQ002 = Pôle Emploi
  - SQ003 = CPAM
- **Help** : "⚠️ FALLBACK BOOTSTRAP - Template DSFR manquant (priorité MOYENNE)"

---

### GROUPE 18 : Array Column (Type H)

**Description** : "Type H - Tableau par colonnes"

#### Q18.1 : Array Column
- **Code** : `G18_Q1_ARRAY_COLUMN`
- **Type** : Array (Column) (H)
- **Question** : "Satisfaction par critère (colonnes)"
- **Subquestions** :
  - SQ001 = Accueil
  - SQ002 = Attente
  - SQ003 = Information
- **Answers** :
  - A1 = Très insatisfait
  - A2 = Insatisfait
  - A3 = Neutre
  - A4 = Satisfait
  - A5 = Très satisfait
- **Help** : "⚠️ FALLBACK BOOTSTRAP - Template DSFR manquant"

---

### GROUPE 19 : Array Dual Scale (Type 1)

**Description** : "Type 1 - Tableau double échelle"

#### Q19.1 : Array Dual Scale
- **Code** : `G19_Q1_ARRAY_DUAL`
- **Type** : Array (Dual Scale) (1)
- **Question** : "Importance vs Satisfaction"
- **Subquestions** :
  - SQ001 = Qualité d'accueil
  - SQ002 = Temps d'attente
  - SQ003 = Clarté information
- **Scale 1** : Importance (1-5)
- **Scale 2** : Satisfaction (1-5)
- **Help** : "⚠️ FALLBACK BOOTSTRAP - Template DSFR manquant (complexe)"

---

### GROUPE 20 : Array Increase/Same/Decrease (Type E)

**Description** : "Type E - Tableau Augmenter/Identique/Diminuer"

#### Q20.1 : Array Increase/Same/Decrease
- **Code** : `G20_Q1_ARRAY_ISD`
- **Type** : Array (Increase/Same/Decrease) (E)
- **Question** : "Évolution souhaitée des services"
- **Subquestions** :
  - SQ001 = Budget CAF
  - SQ002 = Personnel Pôle Emploi
  - SQ003 = Délais CPAM
- **Help** : "⚠️ FALLBACK BOOTSTRAP - Template DSFR manquant"

---

### GROUPE 21 : Array Multi-flexi (Type :)

**Description** : "Type : - Tableau multi-flexible"

#### Q21.1 : Array Multi-flexi
- **Code** : `G21_Q1_ARRAY_MULTIFLEXI`
- **Type** : Array (Multi-flexi) (:)
- **Question** : "Évaluation multi-axes"
- **Subquestions** (X-axis) :
  - SQ001 = Service A
  - SQ002 = Service B
  - SQ003 = Service C
- **Y-axis** :
  - Y1 = Qualité
  - Y2 = Rapidité
  - Y3 = Efficacité
- **Answers** :
  - A1 = Faible
  - A2 = Moyen
  - A3 = Bon
  - A4 = Excellent
- **Help** : "⚠️ FALLBACK BOOTSTRAP - Template DSFR manquant (très complexe)"

---

### GROUPE 22 : Date/Time (Type D)

**Description** : "Type D - Date et heure"

#### Q22.1 : Date Only
- **Code** : `G22_Q1_DATE`
- **Type** : Date/Time (D)
- **Question** : "Votre date de naissance"
- **Format** : Date only (DD/MM/YYYY)
- **Attribute** : `date_format = 5` (French format)
- **Help** : "⚠️ FALLBACK BOOTSTRAP - Template DSFR manquant (priorité HAUTE)"

#### Q22.2 : Date + Time
- **Code** : `G22_Q2_DATETIME`
- **Type** : Date/Time (D)
- **Question** : "Date et heure de rendez-vous"
- **Format** : Date + Time
- **Attribute** : `dropdown_dates = 0` (date picker)
- **Help** : "⚠️ Test date picker avec input type=datetime-local"

#### Q22.3 : Date - Dropdown
- **Code** : `G22_Q3_DATE_DROPDOWN`
- **Type** : Date/Time (D)
- **Question** : "Date de naissance (dropdowns)"
- **Attribute** : `dropdown_dates = 1` (use dropdowns)
- **Help** : "⚠️ Test avec 3 selects (jour/mois/année)"

---

### GROUPE 23 : File Upload (Type |)

**Description** : "Type | - Téléchargement de fichiers"

#### Q23.1 : File Upload - Single
- **Code** : `G23_Q1_UPLOAD`
- **Type** : File Upload (|)
- **Question** : "Téléchargez votre justificatif"
- **Attribute** :
  - `max_num_of_files = 1`
  - `max_filesize = 5000` (5MB)
  - `allowed_filetypes = pdf,jpg,png`
- **Help** : "⚠️ FALLBACK BOOTSTRAP - Template DSFR manquant (priorité MOYENNE)"

#### Q23.2 : File Upload - Multiple
- **Code** : `G23_Q2_UPLOAD_MULTI`
- **Type** : File Upload (|)
- **Question** : "Téléchargez vos documents (max 3)"
- **Attribute** :
  - `max_num_of_files = 3`
  - `max_filesize = 10000` (10MB)
  - `allowed_filetypes = pdf,doc,docx,jpg,png`
- **Help** : "⚠️ Test upload multiple fichiers"

---

### GROUPE 24 : Ranking (Type R)

**Description** : "Type R - Classement par ordre de préférence"

#### Q24.1 : Ranking
- **Code** : `G24_Q1_RANKING`
- **Type** : Ranking (R)
- **Question** : "Classez ces canaux de contact par ordre de préférence"
- **Answers** :
  - A1 = Service en ligne
  - A2 = Guichet physique
  - A3 = Téléphone
  - A4 = Email
  - A5 = Courrier
- **Help** : "⚠️ FALLBACK BOOTSTRAP - Template DSFR manquant (priorité MOYENNE)"

---

### GROUPE 25 : List with Comment (Type O)

**Description** : "Type O - Liste avec zone de commentaire"

#### Q25.1 : List with Comment
- **Code** : `G25_Q1_LIST_COMMENT`
- **Type** : List with Comment (O)
- **Question** : "Votre service préféré (avec commentaire)"
- **Answers** :
  - A1 = CAF
  - A2 = Pôle Emploi
  - A3 = CPAM
  - A4 = Préfecture
  - A5 = Mairie
- **Help** : "⚠️ FALLBACK BOOTSTRAP - Template DSFR manquant (priorité HAUTE)"

---

### GROUPE 26 : Boilerplate (Type X)

**Description** : "Type X - Affichage de texte sans question"

#### Q26.1 : Boilerplate
- **Code** : `G26_Q1_BOILERPLATE`
- **Type** : Boilerplate (X)
- **Question** :
```html
<div class="fr-callout">
  <h3 class="fr-callout__title">Information importante</h3>
  <p class="fr-callout__text">
    Ceci est un texte Boilerplate. Il affiche du contenu sans poser de question.
    Utilisé pour des instructions, explications, ou séparateurs visuels.
  </p>
  <p>⚠️ Type X - Utilise fallback Bootstrap</p>
</div>
```
- **Help** : "⚠️ FALLBACK BOOTSTRAP - Mais impact faible (juste affichage)"

---

### GROUPE 27 : Equation (Type *)

**Description** : "Type * - Calculs automatiques"

#### Q27.1 : Equation - Simple
- **Code** : `G27_Q1_EQUATION`
- **Type** : Equation (*)
- **Question** : "Calcul : Âge dans 10 ans"
- **Equation** : `{G10_Q1_NUM} + 10`
- **Help** : "⚠️ FALLBACK BOOTSTRAP - Invisible à l'utilisateur (calcul backend)"

#### Q27.2 : Equation - Visible
- **Code** : `G27_Q2_EQUATION_SHOWN`
- **Type** : Equation (*)
- **Question** : "Résultat du calcul (affiché)"
- **Equation** : `{G10_Q1_NUM} * 2`
- **Attribute** : `equals_num_value_static = 1` (pour afficher)
- **Help** : "⚠️ Test affichage du résultat"

---

### GROUPE 28 : Language Switch (Type I)

**Description** : "Type I - Sélecteur de langue"

#### Q28.1 : Language Switch
- **Code** : `G28_Q1_LANGUAGE`
- **Type** : Language Switch (I)
- **Question** : "Choisissez votre langue préférée pour cette enquête"
- **Help** : "⚠️ FALLBACK BOOTSTRAP - Template DSFR manquant (priorité BASSE - déjà dans header)"
- **Note** : Nécessite enquête multi-langue configurée

---

## 🎨 CONFIGURATION DU THÈME

### Options Thème DSFR à Configurer

Dans **Paramètres du thème** (Theme options) :

```
show_marianne = on
container = off (utiliser container-fluid)
showclearall = on
```

### Options Enquête Générales

Dans **Paramètres généraux** :

```
✅ Format = Group by Group (G)
✅ Show question index = Yes
✅ Show progress bar = Yes
✅ Show group name/description = Both
✅ Participants may print answers = Yes
✅ Allow save and resume = Yes
✅ Allow forward navigation = Yes
✅ Show "No answer" = Yes
✅ Show question number/code = Both
```

---

## 📊 MATRICE DE TEST

### À Vérifier pour Chaque Question

| Critère | Vérification |
|---------|--------------|
| **✅ Affichage DSFR** | Classes fr-* présentes, pas de Bootstrap |
| **✅ Responsive** | Mobile/Tablet/Desktop correct |
| **✅ Mandatory** | Astérisque rouge visible, validation fonctionne |
| **✅ Help text** | Affiché correctement sous le label |
| **✅ Error state** | Message fr-alert--error si erreur |
| **✅ Focus state** | Border bleue DSFR au focus |
| **✅ Keyboard nav** | Tab/Shift+Tab fonctionne |
| **✅ Screen reader** | NVDA/JAWS lit correctement |
| **✅ Print** | PDF génération correcte |

---

## 🚀 INSTRUCTIONS D'IMPORT

### Méthode 1 : Import LSS (Si disponible)

1. Aller dans LimeSurvey Admin
2. **Créer/Importer** > **Importer une enquête**
3. Sélectionner le fichier `test_dsfr_all_question_types.lss`
4. Import avec options :
   - ✅ Import question attributes
   - ✅ Import answers
   - ✅ Import subquestions
5. Activer le thème **dsfr**
6. Tester !

### Méthode 2 : Création Manuelle (Recommandé)

**Plus simple et plus flexible** :

1. **Créer nouvelle enquête**
   - Titre : "Test DSFR - Coverage Complète"
   - Langue : Français
   - Format : Group by Group

2. **Pour chaque groupe ci-dessus** :
   - Créer le groupe
   - Ajouter la/les question(s)
   - Configurer les options spécifiques
   - Ajouter subquestions si nécessaire
   - Ajouter réponses si nécessaire

3. **Activer le thème DSFR**
   - Paramètres > Thème > Sélectionner "dsfr"

4. **Configurer options thème**
   - Paramètres thème > show_marianne = on

5. **Tester groupe par groupe**

---

## 📝 NOTATION DES RÉSULTATS

Pour chaque groupe/question, noter :

```
| Groupe | Question | Type | DSFR ✅ | Bootstrap ⚠️ | Bugs 🐛 | Notes |
|--------|----------|------|---------|---------------|---------|-------|
| G1     | Q1.1     | 5    | ✅      |               |         | Parfait |
| G1     | Q1.2     | 5    | ✅      |               | 🐛      | Focus incorrect |
| G2     | Q2.1     | L    | ✅      |               |         | OK |
| ...    | ...      | ...  | ...     | ...           | ...     | ... |
```

---

## 🎯 OBJECTIF FINAL

À la fin de ce test, vous aurez :

✅ **Identifié** tous les types fonctionnels en DSFR natif
✅ **Repéré** tous les types avec fallback Bootstrap
✅ **Listé** tous les bugs/problèmes visuels
✅ **Priorisé** les templates à créer
✅ **Validé** l'accessibilité RGAA pour chaque type
✅ **Testé** l'impression PDF complète

**Durée estimée du test** : 2-3 heures pour tester minutieusement

---

**Voulez-vous que je crée aussi les templates manquants prioritaires (Long Free Text, List with Comment, etc.) ?**
