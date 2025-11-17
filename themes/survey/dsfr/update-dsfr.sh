#!/bin/bash
# Script de mise à jour des ressources DSFR
# Usage: ./update-dsfr.sh [VERSION]
# Exemple: ./update-dsfr.sh 1.12

set -e  # Arrêter en cas d'erreur

# Configuration
VERSION="${1:-1.11}"  # Version par défaut : 1.11
BASE_URL="https://unpkg.com/@gouvfr/dsfr@${VERSION}/dist"
DIST_DIR="./dsfr-dist"

# Couleurs pour les messages
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}═══════════════════════════════════════════════${NC}"
echo -e "${BLUE}  Mise à jour DSFR vers la version ${VERSION}${NC}"
echo -e "${BLUE}═══════════════════════════════════════════════${NC}"
echo ""

# Vérifier que curl est installé
if ! command -v curl &> /dev/null; then
    echo -e "${RED}❌ Erreur: curl n'est pas installé${NC}"
    exit 1
fi

# Créer les dossiers si nécessaire
mkdir -p "${DIST_DIR}"/{css,js,fonts,icons}

# ============================================
# CSS
# ============================================
echo -e "${BLUE}📦 Téléchargement des CSS...${NC}"

curl -sL "${BASE_URL}/dsfr.min.css" -o "${DIST_DIR}/css/dsfr.min.css"
echo "  ✓ dsfr.min.css"

curl -sL "${BASE_URL}/utility/icons/icons.min.css" -o "${DIST_DIR}/css/icons.min.css"
echo "  ✓ icons.min.css"

curl -sL "${BASE_URL}/utility/icons/icons-system/icons-system.min.css" -o "${DIST_DIR}/css/icons-system.min.css"
echo "  ✓ icons-system.min.css"

# ============================================
# JavaScript
# ============================================
echo -e "${BLUE}📦 Téléchargement des JavaScript...${NC}"

curl -sL "${BASE_URL}/dsfr.module.min.js" -o "${DIST_DIR}/js/dsfr.module.min.js"
echo "  ✓ dsfr.module.min.js"

curl -sL "${BASE_URL}/dsfr.nomodule.min.js" -o "${DIST_DIR}/js/dsfr.nomodule.min.js"
echo "  ✓ dsfr.nomodule.min.js"

# ============================================
# Fonts Marianne
# ============================================
echo -e "${BLUE}📦 Téléchargement des fonts Marianne...${NC}"

for variant in Light Regular Medium Bold; do
  for style in "" "_Italic"; do
    filename="Marianne-${variant}${style}"

    # WOFF2
    curl -sL "${BASE_URL}/fonts/${filename}.woff2" -o "${DIST_DIR}/fonts/${filename}.woff2"
    echo "  ✓ ${filename}.woff2"

    # WOFF
    curl -sL "${BASE_URL}/fonts/${filename}.woff" -o "${DIST_DIR}/fonts/${filename}.woff"
    echo "  ✓ ${filename}.woff"
  done
done

# ============================================
# Fonts Spectral
# ============================================
echo -e "${BLUE}📦 Téléchargement des fonts Spectral...${NC}"

for variant in Regular ExtraBold; do
  filename="Spectral-${variant}"

  # WOFF2
  curl -sL "${BASE_URL}/fonts/${filename}.woff2" -o "${DIST_DIR}/fonts/${filename}.woff2"
  echo "  ✓ ${filename}.woff2"

  # WOFF
  curl -sL "${BASE_URL}/fonts/${filename}.woff" -o "${DIST_DIR}/fonts/${filename}.woff"
  echo "  ✓ ${filename}.woff"
done

# ============================================
# Vérification
# ============================================
echo ""
echo -e "${BLUE}📊 Vérification des fichiers téléchargés...${NC}"

# Compter les fichiers
css_count=$(ls -1 "${DIST_DIR}/css"/*.css 2>/dev/null | wc -l)
js_count=$(ls -1 "${DIST_DIR}/js"/*.js 2>/dev/null | wc -l)
fonts_count=$(ls -1 "${DIST_DIR}/fonts"/*.woff* 2>/dev/null | wc -l)

echo "  CSS:   ${css_count} fichiers"
echo "  JS:    ${js_count} fichiers"
echo "  Fonts: ${fonts_count} fichiers"

# Vérifier les fichiers critiques
critical_files=(
  "${DIST_DIR}/css/dsfr.min.css"
  "${DIST_DIR}/css/icons.min.css"
  "${DIST_DIR}/js/dsfr.module.min.js"
  "${DIST_DIR}/js/dsfr.nomodule.min.js"
)

all_ok=true
for file in "${critical_files[@]}"; do
  if [ ! -f "$file" ]; then
    echo -e "${RED}  ✗ Manquant: $file${NC}"
    all_ok=false
  fi
done

# ============================================
# Copie vers files/dsfr (pour LimeSurvey)
# ============================================
if [ "$all_ok" = true ]; then
  echo -e "${BLUE}📋 Copie vers files/dsfr/ pour LimeSurvey...${NC}"

  # Créer la structure files/dsfr
  mkdir -p ./files/dsfr/{css,fonts}

  # Copier les CSS
  cp "${DIST_DIR}"/css/*.css ./files/dsfr/css/
  echo "  ✓ CSS copiés"

  # Copier les JS
  cp "${DIST_DIR}"/js/*.js ./files/dsfr/
  echo "  ✓ JavaScript copiés"

  # Copier les fonts
  cp -r "${DIST_DIR}"/css/fonts/* ./files/dsfr/fonts/
  echo "  ✓ Fonts copiées"
fi

# ============================================
# Résumé
# ============================================
echo ""
if [ "$all_ok" = true ]; then
  echo -e "${GREEN}═══════════════════════════════════════════════${NC}"
  echo -e "${GREEN}✅ Mise à jour terminée avec succès !${NC}"
  echo -e "${GREEN}═══════════════════════════════════════════════${NC}"
  echo ""
  echo "Version DSFR  : ${VERSION}"
  echo "Dossier source: ${DIST_DIR}/"
  echo "Dossier public: files/dsfr/"
  echo ""
  echo -e "${BLUE}Prochaines étapes :${NC}"
  echo "  1. Tester le thème LimeSurvey"
  echo "  2. Vérifier que les styles s'appliquent correctement"
  echo "  3. Vérifier que les fonts se chargent"
  echo "  4. Tester en mode hors-ligne"
  echo ""
else
  echo -e "${RED}═══════════════════════════════════════════════${NC}"
  echo -e "${RED}❌ Erreur: certains fichiers sont manquants${NC}"
  echo -e "${RED}═══════════════════════════════════════════════${NC}"
  exit 1
fi
