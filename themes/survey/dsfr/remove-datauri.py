#!/usr/bin/env python3
"""
Script pour supprimer les data URIs SVG de dsfr.min.css
Résout les violations CSP img-src sans modifier la configuration serveur
"""

import re
from pathlib import Path

# Chemins
THEME_DIR = Path(__file__).parent
INPUT_CSS = THEME_DIR / "dsfr-dist/css/dsfr.min.css"
OUTPUT_CSS = THEME_DIR / "dsfr-dist/css/dsfr-no-datauri.min.css"

print("🔧 Suppression des data URIs de dsfr.min.css...")

# Lire le fichier
with open(INPUT_CSS, 'r', encoding='utf-8') as f:
    css_content = f.read()

original_size = len(css_content)

# Pattern pour matcher les data URIs SVG
# Cherche: url(data:image/svg+xml;...)  ou  url("data:image/svg+xml;...")
pattern = r'url\(["\']?data:image/svg\+xml[^)]*\)["\']?'

# Compter les occurrences
matches = re.findall(pattern, css_content)
count = len(matches)

print(f"   Trouvé {count} data URIs SVG")

# Supprimer les data URIs
css_content = re.sub(pattern, 'none', css_content)

# Écrire le nouveau fichier
with open(OUTPUT_CSS, 'w', encoding='utf-8') as f:
    f.write(css_content)

new_size = len(css_content)
diff = original_size - new_size

print(f"✅ Fichier créé : dsfr-dist/css/dsfr-no-datauri.min.css")
print(f"   Taille originale : {original_size // 1024} KB")
print(f"   Nouvelle taille  : {new_size // 1024} KB")
print(f"   Économie         : {diff // 1024} KB ({count} data URIs supprimés)")
print("")
print("📝 Modifiez css/theme.css pour utiliser dsfr-no-datauri.min.css")
