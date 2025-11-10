# Guide de Test - Thème DSFR pour LimeSurvey

## 🎯 Objectif

Tester le thème DSFR avec DSFR-Connect Bootstrap sur différents types de questions LimeSurvey.

## ✅ Checklist de Test

### 1. Activation du thème

- [ ] Le thème "DSFR" apparaît dans la liste des thèmes
- [ ] Le thème peut être activé sur une enquête
- [ ] Pas d'erreurs JavaScript dans la console
- [ ] Les CSS DSFR-Connect se chargent correctement

### 2. Header / Navigation

- [ ] Le header utilise le style DSFR (bleu France #000091)
- [ ] Le logo s'affiche correctement
- [ ] Le menu de navigation est fonctionnel (mobile/desktop)
- [ ] Les liens de navigation ont le bon style au survol
- [ ] Le header est fixe en haut de page

### 3. Typography & Fonts

- [ ] La police Marianne est chargée et utilisée
- [ ] Les titres utilisent la bonne hiérarchie (h1, h2, h3)
- [ ] Les tailles de police sont cohérentes avec DSFR
- [ ] Le contraste des textes est conforme RGAA

### 4. Composants de Formulaire

#### Inputs texte
- [ ] Les champs texte ont le style DSFR (bordure inférieure épaisse)
- [ ] Le fond gris clair (#EEEEEE) est présent
- [ ] Au focus, le fond devient blanc
- [ ] La bordure bleue apparaît au focus
- [ ] Les champs disabled ont le bon style

#### Textarea
- [ ] Style identique aux inputs texte
- [ ] Redimensionnement vertical uniquement
- [ ] Min-height de 5rem

#### Select / Dropdown
- [ ] Flèche personnalisée DSFR
- [ ] Style cohérent avec les inputs
- [ ] Options lisibles et accessibles

#### Radio Buttons
- [ ] Les boutons radio natifs sont cachés
- [ ] Cercles personnalisés avec bordure #3A3A3A
- [ ] Point intérieur bleu France quand sélectionné
- [ ] Focus visible avec outline bleu
- [ ] Hover change la bordure en bleu

#### Checkboxes
- [ ] Les checkbox natifs sont cachés
- [ ] Carrés personnalisés avec bordure #3A3A3A
- [ ] Check intérieur bleu France quand sélectionné
- [ ] Focus et hover fonctionnent correctement

### 5. Boutons

#### Bouton Primaire (Suivant, Soumettre)
- [ ] Fond bleu France (#000091)
- [ ] Texte blanc
- [ ] Padding de 0.5rem 1rem
- [ ] Border-radius de 0.25rem
- [ ] Hover passe à #1212FF
- [ ] Focus outline bleu visible
- [ ] Disabled grisé (#E5E5E5)

#### Bouton Secondaire (Précédent)
- [ ] Fond transparent
- [ ] Bordure bleu France
- [ ] Texte bleu France
- [ ] Hover fond bleu clair (#F5F5FE)

#### Bouton Tertiaire (Liens)
- [ ] Pas de bordure
- [ ] Texte bleu France souligné
- [ ] Hover fond bleu clair

### 6. Messages & Alertes

#### Alert Info
- [ ] Fond #E8EDFF
- [ ] Bordure gauche bleue #0063CB
- [ ] Texte bleu
- [ ] Icône présente

#### Alert Success
- [ ] Fond #B8FEC9
- [ ] Bordure gauche verte #18753C
- [ ] Texte vert

#### Alert Warning
- [ ] Fond #FFE9E6
- [ ] Bordure gauche orange #B34000
- [ ] Texte orange

#### Alert Error
- [ ] Fond #FFE9E9
- [ ] Bordure gauche rouge #CE0500
- [ ] Texte rouge

### 7. Validation d'Erreurs

- [ ] Messages d'erreur en rouge (#CE0500)
- [ ] Icône d'erreur présente
- [ ] Champs en erreur ont une bordure rouge
- [ ] Focus sur champ en erreur garde la bordure rouge

### 8. Barre de Progression

- [ ] Hauteur de 0.5rem
- [ ] Fond gris clair (#E3E3E3)
- [ ] Barre bleue France
- [ ] Transition smooth lors de la progression
- [ ] Texte de progression visible

### 9. Questions

#### Container de Question
- [ ] Fond blanc
- [ ] Padding de 2rem
- [ ] Border-radius de 0.5rem
- [ ] Box-shadow subtile
- [ ] Margin-bottom entre questions

#### Texte de Question
- [ ] Font-size 1.125rem
- [ ] Font-weight 700
- [ ] Couleur #161616
- [ ] Margin-bottom 1rem

#### Texte d'Aide
- [ ] Font-size 0.875rem
- [ ] Couleur gris (#666)
- [ ] Style italique
- [ ] Margin-top 0.5rem

#### Champ Obligatoire
- [ ] Astérisque rouge Marianne (#E1000F)
- [ ] Font-weight 700

### 10. Footer

- [ ] Fond #F6F6F6
- [ ] Bordure supérieure #DDDDDD
- [ ] Padding de 2rem
- [ ] Liens footer stylisés
- [ ] Hover sur liens en bleu France

### 11. Navigation (Précédent/Suivant)

- [ ] Flexbox space-between
- [ ] Gap de 1rem
- [ ] Border-top gris
- [ ] Padding-top de 2rem
- [ ] Mobile : boutons en colonne, pleine largeur

### 12. Responsive

#### Mobile (< 768px)
- [ ] Font-size réduit à 0.875rem
- [ ] Padding réduit
- [ ] Questions padding 1rem au lieu de 2rem
- [ ] Navigation en colonne
- [ ] Boutons pleine largeur
- [ ] Footer en colonne

#### Tablet
- [ ] Mise en page intermédiaire fonctionnelle

#### Desktop
- [ ] Max-width 78rem (1248px)
- [ ] Centré
- [ ] Tous les espacements corrects

### 13. Accessibilité (RGAA)

- [ ] Tous les éléments interactifs ont un focus visible
- [ ] Outline bleu de 2px sur focus
- [ ] Offset de 2px pour visibilité
- [ ] Contraste texte/fond suffisant (4.5:1 minimum)
- [ ] Labels associés aux inputs
- [ ] Skip links fonctionnels
- [ ] Navigation au clavier possible
- [ ] Lecteur d'écran compatible

### 14. Types de Questions Spécifiques

#### Question Texte Court
- [ ] Style DSFR appliqué
- [ ] Width 100%

#### Question Texte Long
- [ ] Textarea avec style DSFR
- [ ] Resize vertical uniquement

#### Question Choix Multiple (Radio)
- [ ] Radio buttons personnalisés
- [ ] Alignement vertical correct
- [ ] Espacement entre options

#### Question Choix Multiple (Checkbox)
- [ ] Checkboxes personnalisées
- [ ] Alignement vertical correct

#### Question Liste Déroulante
- [ ] Select avec style DSFR
- [ ] Flèche personnalisée
- [ ] Options lisibles

#### Question Matrice
- [ ] Tableau stylisé
- [ ] Headers clairs
- [ ] Radios/checkboxes dans cellules

#### Question Numérique
- [ ] Input type number
- [ ] Contrôles +/- stylisés

#### Question Date
- [ ] Datepicker avec style DSFR
- [ ] Format FR (JJ/MM/AAAA)

#### Question Upload Fichier
- [ ] Bouton upload stylisé
- [ ] Indication fichier sélectionné

### 15. Performance

- [ ] CSS DSFR-Connect se charge rapidement (CDN)
- [ ] Pas de FOUC (Flash of Unstyled Content)
- [ ] JavaScript ne bloque pas le rendu
- [ ] Pas de console errors

### 16. Compatibilité Navigateurs

- [ ] Chrome/Edge (dernière version)
- [ ] Firefox (dernière version)
- [ ] Safari (dernière version)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

## 🐛 Problèmes Connus

Listez ici les problèmes identifiés durant les tests :

1. ...
2. ...

## 📝 Notes

- DSFR-Connect Bootstrap est utilisé pour compatibilité avec Bootstrap 5
- Les classes Bootstrap natives sont conservées et enrichies avec DSFR
- Le JavaScript gère les incompatibilités entre LimeSurvey et DSFR

## 🔧 Commandes Utiles

```bash
# Voir les logs en temps réel
docker-compose logs -f limesurvey

# Redémarrer pour appliquer les changements de config.xml
docker-compose restart limesurvey

# Vider le cache du navigateur
Cmd+Shift+R (Mac) ou Ctrl+Shift+R (Windows/Linux)
```

## ✨ Pour Aller Plus Loin

- Tester avec un vrai screen reader (NVDA, JAWS, VoiceOver)
- Tester les contrastes avec un outil comme Contrast Checker
- Valider le HTML avec le validateur W3C
- Tester la performance avec Lighthouse
- Vérifier la conformité RGAA avec un audit complet
