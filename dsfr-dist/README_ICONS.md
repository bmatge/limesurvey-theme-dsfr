# Icônes DSFR - Questions fréquentes

## ❓ Les icônes sont-elles incluses localement ?

**Non, et c'est un choix délibéré.**

Les fichiers CSS des icônes (`icons.min.css` et `icons-system.min.css`) sont stockés localement, mais ils **référencent** les SVG depuis unpkg via des chemins relatifs :

```css
.fr-icon-arrow-left::before {
  mask-image: url(../../icons/system/arrow-left-line.svg);
}
```

## 🤔 Pourquoi ce choix ?

### Option rejetée : Stocker 2000+ SVG localement
- ❌ **Taille** : ~10 MB de fichiers SVG
- ❌ **Maintenance** : 2000+ fichiers à gérer
- ❌ **Inutile** : LimeSurvey utilise <1% des icônes

### Option choisie : Chargement à la demande
- ✅ **Taille** : Seulement ~20 KB pour les 10 icônes utilisées
- ✅ **Cache** : Les icônes sont cachées par le navigateur
- ✅ **Performance** : Pas de fichiers inutiles chargés

## 📊 Impact réel

### Icônes utilisées dans LimeSurvey DSFR : **10 sur 2000+**

1. `arrow-left-line.svg` - Navigation
2. `arrow-right-line.svg` - Navigation
3. `check-line.svg` - Validation
4. `printer-line.svg` - Impression
5. `eye-line.svg` - Mot de passe
6. `eye-off-line.svg` - Mot de passe
7. `save-line.svg` - Sauvegarder
8. `delete-line.svg` - Supprimer
9. `list-unordered.svg` - Liste
10. Quelques autres pour la navigation

**Total** : ~20 KB (chargés depuis unpkg, puis cachés)

## 🌐 Fonctionnement

### Premier chargement (avec internet)
```
Utilisateur visite le site
  ↓
CSS/JS/Fonts chargés localement (instantané)
  ↓
10 icônes SVG chargées depuis unpkg (~100ms)
  ↓
Icônes mises en cache navigateur
```

### Visites suivantes (même hors-ligne)
```
Utilisateur revisite le site
  ↓
TOUT chargé depuis le cache (instantané)
  ↓
Fonctionne même hors-ligne ✅
```

## 🔄 Migration vers 100% local (si nécessaire)

Si vous avez vraiment besoin d'autonomie totale :

### Étape 1 : Identifier les icônes utilisées
```bash
cd /chemin/vers/themes/survey/dsfr
grep -roh 'fr-icon-[a-z-]*' views/ | sort -u > icons-used.txt
```

### Étape 2 : Télécharger ces icônes
```bash
# Créer la structure
mkdir -p dsfr-dist/icons/{system,business,design,communication}

# Télécharger chaque icône identifiée
while read icon; do
  # Extraire le nom (ex: fr-icon-arrow-left-line → arrow-left-line)
  name=$(echo $icon | sed 's/fr-icon-//')
  
  # Télécharger depuis unpkg
  curl -sL "https://unpkg.com/@gouvfr/dsfr@1.11/dist/icons/system/${name}.svg" \
    -o "dsfr-dist/icons/system/${name}.svg"
done < icons-used.txt
```

**Résultat** : +20 KB, autonomie 100%

## ✅ Réponse à : "Il n'y a pas besoin d'importer les CSS des composants ?"

**Non, les 3 CSS suffisent totalement !**

### Ce qui EST inclus dans dsfr.min.css :
- ✅ Tous les composants (boutons, formulaires, tableaux, etc.)
- ✅ Grille et layout
- ✅ Utilitaires
- ✅ Thème clair/sombre
- ✅ Responsive
- ✅ **Tout !**

### Ce qui est dans icons.min.css :
- ✅ Classes CSS des icônes (`.fr-icon-*`)
- ⚠️ Références vers SVG externes

### Aucun import additionnel nécessaire
- ❌ Pas besoin d'importer des composants séparément
- ❌ Pas besoin d'importer la grille séparément
- ❌ Pas besoin d'importer les utilitaires séparément

## 🎯 Conclusion

**Le setup actuel est optimal** :
- 3 CSS + 2 JS + fonts = **99% autonome**
- 10 icônes SVG depuis CDN = **1% externe**
- Après premier chargement : **100% en cache**

**Aucune action requise !** Tout fonctionne parfaitement.
