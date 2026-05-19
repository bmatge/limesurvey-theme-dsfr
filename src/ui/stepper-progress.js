/**
 * Génère la barre de progression segmentée du stepper DSFR.
 *
 * Pourquoi : le SCSS officiel DSFR génère le `background-image` du stepper
 * via une double boucle `@for $steps from 1 through 8` × `@for $current
 * from 1 through $steps`. Au-delà de 8 étapes, aucun sélecteur ne match
 * et la barre reste invisible — alors que le HTML est valide.
 *
 * Notre approche : lire `data-fr-steps` / `data-fr-current-step`, générer
 * un `linear-gradient` multi-stops qui dessine N segments (active /
 * disabled) séparés par des bandes transparentes, puis l'appliquer en
 * inline-style. Reproduit fidèlement le rendu DSFR natif et marche pour
 * N étapes quelconque.
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
    });
}
