# Instructions de vidage du cache LimeSurvey

## Problème rencontré

Les erreurs console montrent que LimeSurvey utilise encore les anciens chemins (`files/dsfr/`) alors que le thème a été mis à jour pour utiliser `dsfr-dist/`.

**Erreurs typiques:**
```
GET http://localhost:8080/tmp/assets/f38bd03a/files/dsfr/css/fonts/Marianne-Regular.woff2 [404]
GET http://localhost:8080/index.php/files/dsfr/dsfr.module.min.js [MIME type error]
```

## Solution: Vider le cache

### Méthode 1: Interface Admin LimeSurvey (Recommandée)

1. Connectez-vous à l'administration LimeSurvey
2. Allez dans **Configuration** → **Settings** → **Global settings**
3. Cherchez l'option "Clear cache" ou "Vider le cache"
4. Cliquez sur le bouton

### Méthode 2: Ligne de commande

```bash
# Supprimer le cache des assets
rm -rf /tmp/assets/*

# OU si LimeSurvey est ailleurs
rm -rf /chemin/vers/limesurvey/tmp/assets/*
```

### Méthode 3: Navigateur

1. Ouvrez DevTools (F12)
2. Onglet **Network**
3. Cochez **Disable cache**
4. Faites un hard refresh: **Ctrl+Shift+R** (Windows/Linux) ou **Cmd+Shift+R** (Mac)

## Vérification après vidage

Après avoir vidé le cache, rafraîchissez la page et vérifiez dans la console (F12):

✅ **Attendu (bon):**
```
GET http://localhost:8080/tmp/assets/XXXXX/dsfr-dist/css/dsfr.min.css [200]
GET http://localhost:8080/tmp/assets/XXXXX/dsfr-dist/css/fonts/Marianne-Regular.woff2 [200]
GET http://localhost:8080/upload/themes/survey/dsfr/dsfr-dist/js/dsfr.module.min.js [200]
```

❌ **À éviter (ancien cache):**
```
GET http://localhost:8080/tmp/assets/XXXXX/files/dsfr/css/... [404]
GET http://localhost:8080/index.php/files/dsfr/... [404/MIME error]
```

## Chemins actuels du thème

Le thème utilise maintenant:

- **CSS**: `../dsfr-dist/css/dsfr.min.css`
- **JavaScript**: `themePath + '/dsfr-dist/js/dsfr.module.min.js'`
- **Fonts**: Chargées via chemins relatifs depuis CSS: `url(fonts/Marianne-*.woff2)`

Ces chemins sont corrects et fonctionnent avec le système d'assets de LimeSurvey.

## Structure des fichiers

```
themes/survey/dsfr/
├── dsfr-dist/              ← Ressources DSFR (utilisé maintenant)
│   ├── css/
│   │   ├── dsfr.min.css
│   │   ├── icons.min.css
│   │   ├── icons-system.min.css
│   │   └── fonts/         ← 20 fichiers fonts
│   └── js/
│       ├── dsfr.module.min.js
│       └── dsfr.nomodule.min.js
├── files/
│   └── dsfr.backup/       ← Ancien (sauvegardé, ne sera plus utilisé)
├── css/
│   └── theme.css          ← Mis à jour: @import '../dsfr-dist/...'
└── scripts/
    └── theme.js           ← Mis à jour: dsfrPath + '/dsfr-dist/js/'
```

## Si le problème persiste

Si après avoir vidé le cache les erreurs persistent:

1. Vérifiez que les fichiers existent:
   ```bash
   ls -la themes/survey/dsfr/dsfr-dist/css/
   ls -la themes/survey/dsfr/dsfr-dist/css/fonts/
   ls -la themes/survey/dsfr/dsfr-dist/js/
   ```

2. Vérifiez les permissions:
   ```bash
   chmod -R 755 themes/survey/dsfr/dsfr-dist/
   ```

3. Redémarrez PHP-FPM ou votre serveur web si nécessaire

## Contact

Si le problème persiste après ces étapes, partagez:
- Les nouvelles erreurs console (F12)
- Le résultat de `ls -la themes/survey/dsfr/dsfr-dist/`
- La sortie de `cat themes/survey/dsfr/css/theme.css | head -35`
