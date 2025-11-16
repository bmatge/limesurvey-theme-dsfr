# Guide de publication du thème DSFR sur GitHub

Ce document explique comment publier le thème DSFR dans un repository GitHub dédié.

## Étapes de publication

### 1. Préparer le dossier pour la publication

Avant de publier, supprimez les fichiers qui ne doivent pas être versionnés :

```bash
cd themes/survey/dsfr
rm .DS_Store
rm lime-dsfr-v1.0.1.zip
find . -name ".DS_Store" -delete
```

### 2. Créer le nouveau repository sur GitHub

1. Allez sur https://github.com/new
2. Nommez le repo : `limesurvey-theme-dsfr`
3. Description suggérée : `Thème LimeSurvey conforme au Système de Design de l'État Français (DSFR)`
4. Public ou Privé selon votre choix
5. **NE PAS** initialiser avec README, .gitignore ou licence (ils existent déjà)

### 3. Publier le contenu

Deux méthodes possibles :

#### Méthode A : Copier le dossier (recommandé)

```bash
# Créer un nouveau dossier temporaire
cd ~/Documents/GitHub
mkdir limesurvey-theme-dsfr
cd limesurvey-theme-dsfr

# Initialiser git
git init

# Copier le contenu du thème (sans les fichiers à exclure)
rsync -av --exclude='.DS_Store' --exclude='*.zip' \
  ~/Documents/GitHub/limesurvey-dsfr/LimeSurvey-DSFR/themes/survey/dsfr/ .

# Ajouter tous les fichiers
git add .

# Premier commit
git commit -m "Initial commit: Thème DSFR pour LimeSurvey v1.0.1

- Support complet du DSFR
- 27/28 types de questions compatibles (96%)
- Documentation complète
- Fichier de test inclus"

# Lier au repo distant
git remote add origin https://github.com/bmatge/limesurvey-theme-dsfr.git

# Pousser
git branch -M main
git push -u origin main
```

#### Méthode B : Git Subtree (avancé)

Si vous voulez garder un lien avec le repo principal :

```bash
cd ~/Documents/GitHub/limesurvey-dsfr/LimeSurvey-DSFR

# Créer le repo distant d'abord sur GitHub
# Puis ajouter comme remote
git remote add theme-dsfr https://github.com/bmatge/limesurvey-theme-dsfr.git

# Pousser uniquement le sous-dossier
git subtree push --prefix=themes/survey/dsfr theme-dsfr main
```

### 4. Compléter le repository sur GitHub

Une fois publié, ajoutez sur l'interface GitHub :

1. **Topics/Tags** : `limesurvey`, `dsfr`, `theme`, `survey`, `french`, `accessibility`, `rgaa`
2. **Website** : https://www.systeme-de-design.gouv.fr/
3. **Description courte** visible
4. **Social preview** : créer une image avec logo DSFR + LimeSurvey

### 5. Créer une release

1. Allez dans **Releases** → **Create a new release**
2. Tag : `v1.0.1`
3. Title : `Version 1.0.1 - Release initiale`
4. Description :

```markdown
## Première version publique du thème DSFR pour LimeSurvey

### Fonctionnalités

- ✅ Conformité DSFR complète
- ✅ Support de 27/28 types de questions LimeSurvey (96%)
- ✅ Mode clair/sombre
- ✅ Responsive design
- ✅ Accessibilité RGAA optimisée
- ✅ Styles d'impression

### Installation

Voir le [README](https://github.com/bmatge/limesurvey-theme-dsfr#installation) pour les instructions détaillées.

### Documentation

- Guide d'installation complet
- Fichier de test avec tous les types de questions
- Documentation technique dans `/docs`

### Compatibilité

- LimeSurvey 6.0+
```

5. Optionnel : joindre un fichier ZIP du thème pour téléchargement direct

### 6. Fichiers à vérifier avant publication

Assurez-vous que ces fichiers sont présents et à jour :

- [x] `README.md` - Documentation principale
- [x] `.gitignore` - Fichiers à exclure
- [x] `config.xml` - Configuration du thème avec les bonnes infos
- [x] `QUESTION_TYPES_COMPATIBILITY.md` - Liste des types supportés
- [x] `test_dsfr_all_question_types.lss` - Fichier de test
- [x] `docs/` - Documentation complète
- [x] Tous les templates `.twig`
- [x] Tous les fichiers CSS et JS

### 7. Maintenance future

Pour synchroniser les modifications futures :

```bash
# Depuis le repo principal
cd ~/Documents/GitHub/limesurvey-dsfr/LimeSurvey-DSFR/themes/survey/dsfr

# Faire vos modifications...

# Puis copier vers le repo du thème
rsync -av --exclude='.DS_Store' --exclude='*.zip' --exclude='.git' \
  . ~/Documents/GitHub/limesurvey-theme-dsfr/

# Commiter dans le repo du thème
cd ~/Documents/GitHub/limesurvey-theme-dsfr
git add .
git commit -m "Update: description des changements"
git push
```

## Checklist avant publication

- [ ] Supprimer `.DS_Store` et fichiers `.zip`
- [ ] Vérifier que `config.xml` contient les bonnes infos (email, URL)
- [ ] Tester le thème sur une installation LimeSurvey propre
- [ ] Relire le README pour cohérence
- [ ] Vérifier que tous les liens fonctionnent
- [ ] Nettoyer les fichiers de documentation sensibles si nécessaire
- [ ] S'assurer que `.gitignore` exclut les bons fichiers

## Communication

Après publication, vous pouvez :

1. Annoncer sur le forum LimeSurvey
2. Partager sur les réseaux professionnels
3. Contacter l'équipe DSFR pour visibilité
4. Ajouter dans les ressources LimeSurvey francophones

## Licence

Le thème est sous GNU GPL v2+, compatible avec LimeSurvey.
