#!/usr/bin/env python3
"""
Script pour convertir tous les SVG du DSFR en data URI base64
et les embarquer directement dans icons.min.css

Usage: python3 embed-svg-icons.py
"""

import os
import base64
import re
from pathlib import Path

# Chemins
THEME_DIR = Path(__file__).parent
ICONS_CSS = THEME_DIR / "dsfr-dist/css/icons.min.css"
ICONS_DIR = THEME_DIR / "dsfr-dist/css/icons"
OUTPUT_CSS = THEME_DIR / "dsfr-dist/css/icons-embedded.min.css"

def svg_to_data_uri(svg_path):
    """Convertit un fichier SVG en data URI base64"""
    with open(svg_path, 'rb') as f:
        svg_content = f.read()

    # Encoder en base64
    b64 = base64.b64encode(svg_content).decode('utf-8')

    # Retourner le data URI
    return f"data:image/svg+xml;base64,{b64}"

def process_icons_css():
    """Traite le fichier icons.min.css et remplace les URLs par des data URIs"""

    if not ICONS_CSS.exists():
        print(f"❌ Fichier {ICONS_CSS} non trouvé")
        return False

    print(f"📖 Lecture de {ICONS_CSS.name}...")
    with open(ICONS_CSS, 'r', encoding='utf-8') as f:
        css_content = f.read()

    # Trouver toutes les références à des fichiers SVG
    # Pattern: url(../../icons/category/icon-name.svg)
    pattern = r'url\((\.\.\/\.\.\/icons\/[^)]+\.svg)\)'
    matches = re.findall(pattern, css_content)

    if not matches:
        print("⚠️  Aucune référence SVG trouvée dans le CSS")
        return False

    print(f"✓ Trouvé {len(matches)} références SVG uniques")

    # Compter les remplacements
    replaced_count = 0
    failed_count = 0

    # Remplacer chaque référence SVG par son data URI
    for svg_relative_path in set(matches):  # set() pour éviter les doublons
        # Construire le chemin absolu du SVG
        # ../../icons/category/icon.svg -> dsfr-dist/css/icons/category/icon.svg
        svg_path = ICONS_CSS.parent / svg_relative_path.replace('../..', '.')

        if not svg_path.exists():
            print(f"⚠️  Fichier non trouvé: {svg_relative_path}")
            failed_count += 1
            continue

        # Convertir en data URI
        data_uri = svg_to_data_uri(svg_path)

        # Remplacer dans le CSS
        old_pattern = f"url({svg_relative_path})"
        new_pattern = f"url('{data_uri}')"
        css_content = css_content.replace(old_pattern, new_pattern)

        replaced_count += 1

        if replaced_count % 100 == 0:
            print(f"  ⏳ {replaced_count} icônes traitées...")

    # Écrire le nouveau fichier CSS
    print(f"💾 Écriture de {OUTPUT_CSS.name}...")
    with open(OUTPUT_CSS, 'w', encoding='utf-8') as f:
        f.write(css_content)

    print(f"\n✅ Terminé !")
    print(f"   • {replaced_count} icônes embarquées avec succès")
    print(f"   • {failed_count} icônes non trouvées")
    print(f"   • Fichier créé : {OUTPUT_CSS.relative_to(THEME_DIR)}")

    # Afficher les tailles
    original_size = ICONS_CSS.stat().st_size / 1024
    embedded_size = OUTPUT_CSS.stat().st_size / 1024

    print(f"\n📊 Tailles :")
    print(f"   • Original : {original_size:.1f} KB")
    print(f"   • Embarqué : {embedded_size:.1f} KB (+{embedded_size - original_size:.1f} KB)")

    return True

if __name__ == "__main__":
    print("🚀 Conversion des icônes DSFR en data URI...\n")

    if not ICONS_DIR.exists():
        print(f"❌ Répertoire {ICONS_DIR} non trouvé")
        print("   Assurez-vous d'avoir exécuté ./update-dsfr.sh d'abord")
        exit(1)

    success = process_icons_css()

    if success:
        print("\n📝 Prochaine étape :")
        print("   Modifiez css/theme.css pour charger icons-embedded.min.css")
        print("   au lieu de icons.min.css")
    else:
        exit(1)
