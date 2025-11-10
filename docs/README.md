# Thème DSFR pour LimeSurvey

Thème conforme au **Système de Design de l'État Français (DSFR)** pour les enquêtes LimeSurvey.

## 🎨 À propos

Ce thème applique les standards du [Système de Design de l'État Français](https://www.systeme-de-design.gouv.fr/) aux enquêtes LimeSurvey, garantissant :

- ✅ Conformité aux normes de l'État Français
- ✅ Accessibilité RGAA
- ✅ Responsive design
- ✅ Thème clair/sombre
- ✅ Compatibilité avec tous les types de questions LimeSurvey

## 📦 Installation

### Avec Docker (recommandé pour le développement)

1. **Cloner le dépôt** (si ce n'est pas déjà fait)
```bash
git clone [url-du-repo]
cd LimeSurvey-DSFR
```

2. **Démarrer Docker**
```bash
docker-compose up -d
```

3. **Accéder à LimeSurvey**
   - URL : http://localhost:8080
   - Identifiants admin : `admin` / `admin`

4. **Activer le thème**
   - Connectez-vous à l'interface d'administration
   - Allez dans **Configuration** > **Thèmes**
   - Sélectionnez le thème **DSFR** pour vos enquêtes

### Installation manuelle

Si vous avez déjà une instance LimeSurvey :

1. Copiez le dossier `themes/survey/dsfr` vers votre installation LimeSurvey
2. Dans l'admin LimeSurvey : **Configuration** > **Thèmes**
3. Le thème DSFR apparaîtra dans la liste des thèmes disponibles

## 🚀 Développement en temps réel

Grâce au montage de volume Docker, vos modifications sont **instantanément visibles** :

1. **Modifiez les fichiers** dans `themes/survey/dsfr/`
   - CSS : `css/theme.css` ou `css/custom.css`
   - JavaScript : `scripts/theme.js` ou `scripts/custom.js`

2. **Rechargez la page** dans votre navigateur → les changements apparaissent immédiatement

3. **Pour les modifications de config.xml** :
   - Allez dans l'admin LimeSurvey
   - **Configuration** > **Thèmes** > **DSFR** > **Réinitialiser**

## 📁 Structure du thème

```
themes/survey/dsfr/
├── config.xml              # Configuration du thème
├── css/
│   ├── theme.css          # Styles DSFR principaux
│   ├── custom.css         # Vos styles personnalisés
│   └── print_theme.css    # Styles d'impression
├── scripts/
│   ├── theme.js           # JavaScript DSFR
│   └── custom.js          # Vos scripts personnalisés
├── files/                  # Ressources (logos, images)
├── views/                  # Templates Twig (optionnel)
└── README.md              # Ce fichier
```

## ⚙️ Configuration

Le thème propose plusieurs options configurables dans l'interface d'administration :

### Options générales
- **Conteneur de l'enquête** : Activer/désactiver le conteneur
- **Afficher les popups** : Gestion des messages
- **Position de l'aide** : Haut ou bas des questions

### Options DSFR
- **Variante du thème** : Clair ou sombre
- **Afficher Marianne** : Logo de la République Française
- **Liens de pied de page** : Mentions légales, accessibilité, etc.

## 🎨 Personnalisation

### CSS personnalisé

Utilisez `css/custom.css` pour vos styles spécifiques :

```css
/* Exemple : modifier la couleur primaire */
:root {
    --limesurvey-primary: #000091; /* Bleu France */
}

/* Ajouter vos styles personnalisés */
.ma-classe-custom {
    /* ... */
}
```

### JavaScript personnalisé

Utilisez `scripts/custom.js` pour vos scripts :

```javascript
(function() {
    'use strict';

    // Votre code ici

})();
```

## 🔧 Commandes Docker utiles

```bash
# Démarrer les conteneurs
docker-compose up -d

# Voir les logs
docker-compose logs -f limesurvey

# Arrêter les conteneurs
docker-compose down

# Arrêter et supprimer les données
docker-compose down -v

# Redémarrer après des changements
docker-compose restart limesurvey
```

## 📚 Ressources

- [Documentation DSFR](https://www.systeme-de-design.gouv.fr/)
- [Documentation LimeSurvey](https://manual.limesurvey.org/)
- [Guide des thèmes LimeSurvey](https://manual.limesurvey.org/Themes)
- [Composants DSFR](https://www.systeme-de-design.gouv.fr/composants)

## 🐛 Dépannage

### Le thème n'apparaît pas dans la liste

1. Vérifiez que le dossier `themes/survey/dsfr` existe
2. Vérifiez que `config.xml` est valide
3. Videz le cache LimeSurvey : **Configuration** > **Paramètres globaux** > **Vider le cache**

### Les modifications CSS/JS ne s'appliquent pas

1. Rechargez la page avec **Ctrl + Shift + R** (vidage du cache navigateur)
2. Vérifiez les erreurs dans la console du navigateur (F12)
3. Pour `config.xml`, réinitialisez le thème dans l'admin

### Le DSFR ne se charge pas

1. Vérifiez votre connexion internet (le CSS/JS est chargé via CDN)
2. Consultez la console du navigateur pour les erreurs de chargement
3. Pour une installation hors ligne, installez le DSFR via npm

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :

1. Forker le projet
2. Créer une branche (`git checkout -b feature/amelioration`)
3. Commiter vos changements (`git commit -m 'Ajout d'une fonctionnalité'`)
4. Pousser vers la branche (`git push origin feature/amelioration`)
5. Ouvrir une Pull Request

## 📄 Licence

GNU General Public License version 2 or later

## 📧 Contact

Pour toute question ou suggestion, n'hésitez pas à ouvrir une issue sur GitHub.

---

**Note** : Ce thème est en cours de développement. Les retours et contributions sont appréciés !
