/**
 * Calcule la progression du stepper DSFR via une custom property CSS.
 *
 * Pourquoi : le SCSS officiel DSFR génère le `background-image` du stepper
 * via une double boucle `@for $steps from 1 through 8` × `@for $current from
 * 1 through $steps`. Au-delà de 8 étapes, aucun sélecteur ne match et la
 * barre de progression reste invisible — alors que le HTML est valide.
 *
 * Notre approche, indépendante du nombre d'étapes : on lit `data-fr-steps`
 * et `data-fr-current-step` posés par le template Twig, on calcule le
 * pourcentage, et on l'écrit dans la custom property `--fr-progress`. Le
 * CSS de [custom.css](../../css/custom.css) référence cette variable dans
 * la `width` du `::after` du `.fr-stepper__steps`.
 *
 * Résultat : marche pour N étapes quelconque (1 à 100+) avec une seule
 * règle CSS au lieu de N×N règles spécifiques.
 */

export function initStepperProgress(root = document) {
    const steppers = root.querySelectorAll('.fr-stepper__steps[data-fr-steps][data-fr-current-step]');
    steppers.forEach((el) => {
        const total = parseInt(el.getAttribute('data-fr-steps'), 10);
        const current = parseInt(el.getAttribute('data-fr-current-step'), 10);
        if (!Number.isFinite(total) || total <= 0) return;
        if (!Number.isFinite(current) || current < 0) return;
        const pct = Math.min(100, Math.max(0, (current / total) * 100));
        el.style.setProperty('--fr-progress', `${pct}%`);
    });
}
