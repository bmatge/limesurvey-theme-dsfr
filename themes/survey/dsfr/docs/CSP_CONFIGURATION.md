# Configuration CSP pour le thème DSFR

## Problème

Le thème DSFR utilise le système de design officiel de l'État français qui contient des images SVG embarquées en data URIs dans le fichier `dsfr.min.css`.

Si LimeSurvey a une politique de sécurité de contenu (CSP) stricte, vous verrez ces erreurs dans la console :

```
Content-Security-Policy : Les paramètres de la page ont empêché le chargement d'une ressource (img-src)
à l'adresse data:image/svg+xml;charset=utf8...
```

## Solution

### Option 1 : Modifier le CSP de LimeSurvey (recommandé)

Ajoutez `data:` à la directive `img-src` de votre CSP :

```
Content-Security-Policy: ... img-src 'self' data: ...
```

**Localisation du fichier** :
- Dans `application/config/config.php`, cherchez les paramètres CSP
- Ou dans le fichier `.htaccess` si le CSP est défini là

**Exemple de configuration sécurisée** :
```php
'securityHeaders' => [
    'Content-Security-Policy' => "default-src 'self' 'unsafe-inline' 'unsafe-eval'; img-src 'self' data: https:; font-src 'self' data:;"
]
```

### Option 2 : Désactiver temporairement le CSP

⚠️ **Non recommandé en production** - À utiliser uniquement pour les tests

Dans `application/config/config.php` :
```php
'securityHeaders' => []
```

## Images concernées

Les data URIs dans `dsfr.min.css` sont utilisées pour :
- Logo "Marianne" de la République Française
- Logo "République Française"
- Quelques icônes système

Les icônes principales du thème (flèches, boutons, etc.) utilisent des fichiers SVG externes dans `dsfr-dist/css/icons/` et ne sont **pas affectées** par cette restriction CSP.

## Impact si non corrigé

- ❌ Logo Marianne non affiché
- ✅ Toutes les icônes fonctionnelles affichées (flèches, menus, etc.)
- ✅ Reste du thème 100% fonctionnel

## Référence

- Directive CSP `img-src` : https://developer.mozilla.org/fr/docs/Web/HTTP/Headers/Content-Security-Policy/img-src
- DSFR : https://www.systeme-de-design.gouv.fr/
