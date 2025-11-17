#!/bin/bash
# Script pour supprimer les data URIs SVG de dsfr.min.css
# Ceci résout les violations CSP img-src sans modifier la configuration serveur

THEME_DIR="$(dirname "$0")"
INPUT_CSS="$THEME_DIR/dsfr-dist/css/dsfr.min.css"
OUTPUT_CSS="$THEME_DIR/dsfr-dist/css/dsfr-no-datauri.min.css"

echo "🔧 Suppression des data URIs de dsfr.min.css..."

# Copier le fichier
cp "$INPUT_CSS" "$OUTPUT_CSS"

# Supprimer toutes les déclarations contenant data:image/svg+xml
# On garde les accolades et propriétés CSS vides pour éviter de casser la structure
sed -i '' 's/background-image:url(data:image\/svg[^)]*));//g' "$OUTPUT_CSS"
sed -i '' 's/background:url(data:image\/svg[^)]*));//g' "$OUTPUT_CSS"
sed -i '' 's/content:url(data:image\/svg[^)]*));//g' "$OUTPUT_CSS"

# Calculer les tailles
ORIGINAL_SIZE=$(stat -f%z "$INPUT_CSS")
OUTPUT_SIZE=$(stat -f%z "$OUTPUT_CSS")
DIFF=$((ORIGINAL_SIZE - OUTPUT_SIZE))

echo "✅ Fichier créé : dsfr-dist/css/dsfr-no-datauri.min.css"
echo "   Taille originale : $((ORIGINAL_SIZE / 1024)) KB"
echo "   Nouvelle taille  : $((OUTPUT_SIZE / 1024)) KB"
echo "   Économie         : $((DIFF / 1024)) KB"
echo ""
echo "📝 Modifiez css/theme.css pour utiliser dsfr-no-datauri.min.css"
