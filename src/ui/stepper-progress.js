/**
 * Génère la barre de progression segmentée du stepper DSFR.
 *
 * Pourquoi : le SCSS officiel DSFR génère le `background-image` du stepper
 * via une double boucle `@for $steps from 1 through 8` × `@for $current
 * from 1 through $steps`. Au-delà de 8 étapes, aucun sélecteur ne match
 * et la barre reste invisible — alors que le HTML est valide.
 *
 * En plus, ce CSS DSFR pose `background-size: $current / $steps * 100%`
 * (cf. `_stepper.scss` officiel) — ce qui *compresse* notre gradient sur
 * `current/total %` de la largeur du conteneur. Visuellement, à 1/8 on
 * voit la barre limitée à 12.5% au lieu de l'étendue complète.
 *
 * Notre approche : lire `data-fr-steps` / `data-fr-current-step`, générer
 * un `linear-gradient` multi-stops qui dessine N segments (active /
 * disabled) séparés par des bandes transparentes, l'appliquer en
 * inline-style, ET forcer `background-size: 100% 100%` pour neutraliser
 * la compression DSFR. Notre gradient encode déjà la progression via les
 * couleurs (active vs disabled), donc on veut la pleine largeur.
 */

const GAP_PX = 4; // espace transparent entre deux segments (px)
const COLOR_ACTIVE = 'var(--background-active-blue-france, #000091)';
const COLOR_DISABLED = 'var(--background-disabled-grey, #e5e5e5)';

export function buildSegmentedGradient(total, current) {
    const clampedCurrent = Math.min(Math.max(0, current), total);
    const stops = [];
    for (let i = 0; i < total; i++) {
        const startPct = (i / total) * 100;
        const endPct = ((i + 1) / total) * 100;
        const color = i < clampedCurrent ? COLOR_ACTIVE : COLOR_DISABLED;
        stops.push(`${color} ${startPct}%`);
        stops.push(`${color} calc(${endPct}% - ${GAP_PX}px)`);
        if (i < total - 1) {
            stops.push(`transparent calc(${endPct}% - ${GAP_PX}px)`);
            stops.push(`transparent ${endPct}%`);
        }
    }
    return `linear-gradient(to right, ${stops.join(', ')})`;
}

export function initStepperProgress(root = document) {
    const steppers = root.querySelectorAll('.fr-stepper__steps[data-fr-steps][data-fr-current-step]');
    steppers.forEach((el) => {
        const total = parseInt(el.getAttribute('data-fr-steps'), 10);
        const current = parseInt(el.getAttribute('data-fr-current-step'), 10);
        if (!Number.isFinite(total) || total <= 0) return;
        if (!Number.isFinite(current) || current < 0) return;
        el.style.backgroundImage = buildSegmentedGradient(total, current);
        // Neutralise le `background-size: $current/$steps * 100%` du CSS DSFR
        // qui sinon écraserait notre gradient sur une fraction de la largeur.
        el.style.backgroundSize = '100% 100%';
    });
}
