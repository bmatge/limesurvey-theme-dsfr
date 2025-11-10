# Statut du Thème DSFR pour LimeSurvey

## ✅ Ce qui a été créé

### 1. **Structure complète du thème**
- [config.xml](config.xml) - Configuration avec options DSFR
- [css/theme.css](css/theme.css) - CSS DSFR complet (~850 lignes)
- [css/custom.css](css/custom.css) - Pour vos personnalisations
- [css/print_theme.css](css/print_theme.css) - Styles d'impression
- [scripts/theme.js](scripts/theme.js) - JavaScript DSFR + compatibilité LimeSurvey
- [scripts/custom.js](scripts/custom.js) - Pour vos scripts perso

### 2. **Import DSFR**
- DSFR 1.11 via unpkg CDN (plus fiable que jsdelivr)
- Icônes Remix Icon
- Fonts Marianne
- JavaScript DSFR (module + nomodule)

### 3. **Composants stylisés au DSFR**

#### ✅ Header
- Background blanc avec ombre portée
- Logo et brand bleu France
- Navigation responsive
- Dropdown menus stylisés
- Toggle mobile

#### ✅ Inputs & Formulaires
- Inputs texte avec bordure inférieure DSFR
- Fond gris (#EEEEEE), blanc au focus
- Bordure bleue au focus
- Selects avec flèche personnalisée
- Textareas avec resize vertical
- États disabled corrects

#### ✅ Radio & Checkbox
- Boutons natifs cachés
- Cercles/carrés personnalisés DSFR
- Bordure #3A3A3A
- Point/check bleu France quand sélectionné
- Focus outline visible
- Hover interactif

#### ✅ Boutons
- **Primaire** : fond bleu France, texte blanc
- **Secondaire** : bordure bleue, fond transparent
- **Tertiaire** : lien souligné bleu
- États hover/active/focus/disabled
- Transitions fluides

#### ✅ Messages & Alertes
- Alert Info (bleu)
- Alert Success (vert)
- Alert Warning (orange)
- Alert Error (rouge)
- Bordure gauche colorée
- Icônes (via ::before)

#### ✅ Validation d'erreurs
- Messages en rouge #CE0500
- Icônes d'erreur
- Champs en erreur avec bordure rouge
- Box-shadow rouge au focus

#### ✅ Questions
- Container blanc avec ombre
- Padding 2rem
- Border-radius 0.5rem
- Texte question bold 1.125rem
- Texte d'aide gris italique
- Astérisque obligatoire rouge Marianne

#### ✅ Navigation
- Boutons Précédent/Suivant stylisés
- Flexbox space-between
- Border-top séparateur
- Responsive mobile (colonne)

#### ✅ Barre de progression
- Hauteur 0.5rem
- Fond gris, barre bleue
- Transition smooth
- Texte de progression

#### ✅ Footer
- Fond gris clair
- Bordure supérieure
- Liens stylisés
- Responsive

### 4. **JavaScript & Compatibilité**

#### ✅ Objets LimeSurvey
- `window.ThemeScripts`
- `window.basicThemeScripts.init()`
- `window.basicThemeScripts.initGlobal()`
- Autres méthodes requises

#### ✅ Améliorations
- Amélioration de l'accessibilité
- Validation de formulaires
- Gestion thème clair/sombre (préparé)
- Enhancement des composants Bootstrap

### 5. **Accessibilité (RGAA)**
- Focus visible sur tous les éléments (outline bleu 2px)
- Contraste conforme RGAA
- Labels ARIA
- Skip links
- Navigation clavier
- Screen reader friendly

### 6. **Responsive Design**
- Mobile < 768px
- Tablet
- Desktop max-width 78rem (1248px)
- Boutons pleine largeur mobile
- Navigation adaptative

## 🎨 Approche "DSFR-like"

Puisque LimeSurvey génère son propre HTML avec Bootstrap, nous avons créé un thème "DSFR-like" qui :

1. **Cible les classes existantes** de LimeSurvey/Bootstrap
2. **Override les styles** avec les valeurs DSFR
3. **Utilise les CSS custom properties** pour les couleurs et espacements
4. **Améliore avec JavaScript** quand nécessaire
5. **Reste compatible** avec le système de thèmes LimeSurvey

## 📏 Variables DSFR utilisées

```css
--blue-france: #000091
--red-marianne: #E1000F
--grey-main: #3A3A3A
--grey-light: #F6F6F6
--grey-medium: #DDDDDD
```

## 🚀 Comment tester

1. **Ouvrez votre navigateur** : http://localhost:8080

2. **Connectez-vous** : admin / admin

3. **Activez le thème** sur une enquête :
   - Paramètres enquête > Présentation & navigation
   - Sélectionnez "DSFR"

4. **Prévisualisez** l'enquête

5. **Modifiez en temps réel** :
   - Éditez `css/theme.css`
   - Rechargez la page (Cmd+Shift+R)
   - Les changements apparaissent instantanément !

## 📝 Points d'attention

### ✅ Fonctionne
- Import DSFR via unpkg
- Fonts Marianne
- Tous les composants de base
- JavaScript sans erreurs
- Compatibilité LimeSurvey

### ⚠️ Limitations connues

1. **HTML non modifiable** : On ne peut pas changer la structure HTML générée par LimeSurvey
   - Solution : Override CSS agressif + JavaScript

2. **Bootstrap 5 présent** : LimeSurvey charge Bootstrap
   - Solution : Les styles DSFR sont plus spécifiques et overrident Bootstrap

3. **Certains composants complexes** (matrices, tableaux) peuvent nécessiter des ajustements CSS supplémentaires

## 🔧 Personnalisation

### Modifier les couleurs

Éditez `css/custom.css` :
```css
:root {
    --blue-france: #000091; /* Changez ici */
}
```

### Ajouter des styles

Éditez `css/custom.css` pour ne pas modifier `theme.css`

### Ajouter du JavaScript

Éditez `scripts/custom.js`

## 📚 Documentation

- [README.md](README.md) - Documentation générale
- [TESTING.md](TESTING.md) - Guide de test complet
- [DSFR-QUICKSTART.md](../../DSFR-QUICKSTART.md) - Démarrage rapide

## 🎯 Prochaines étapes suggérées

1. **Tester tous les types de questions** (voir TESTING.md)
2. **Ajuster les composants spécifiques** si nécessaire
3. **Ajouter le logo Marianne** dans `files/`
4. **Créer des templates Twig custom** si besoin de modifier le HTML
5. **Tester l'accessibilité** avec un lecteur d'écran
6. **Valider avec un audit RGAA**

## 🔗 Liens utiles

- [DSFR Documentation](https://www.systeme-de-design.gouv.fr/)
- [DSFR Composants](https://www.systeme-de-design.gouv.fr/composants)
- [LimeSurvey Manual](https://manual.limesurvey.org/)
- [RGAA](https://www.numerique.gouv.fr/publications/rgaa-accessibilite/)

---

**Version** : 1.0.0
**Dernière mise à jour** : 2025-11-06
