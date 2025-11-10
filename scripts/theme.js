/**
 * JavaScript pour le thème DSFR
 * Système de Design de l'État Français
 */

(function() {
    'use strict';

    // ============================================
    // SUPPRESSION DES ERREURS BOOTSTRAP
    // ============================================

    // Capturer et ignorer les erreurs Bootstrap qui ne nous concernent pas
    window.addEventListener('error', function(e) {
        // Ignorer les erreurs Bootstrap liées aux modals/tooltips
        if (e.message && e.message.includes('bootstrap')) {
            e.preventDefault();
            return false;
        }
    }, true);

    // ============================================
    // CHARGEMENT DU DSFR
    // ============================================

    // Charger le JS DSFR depuis unpkg (plus fiable)
    const dsfrScript = document.createElement('script');
    dsfrScript.src = 'https://unpkg.com/@gouvfr/dsfr@1.11/dist/dsfr.module.min.js';
    dsfrScript.type = 'module';
    document.head.appendChild(dsfrScript);

    // Version nomodule pour anciens navigateurs
    const dsfrScriptLegacy = document.createElement('script');
    dsfrScriptLegacy.src = 'https://unpkg.com/@gouvfr/dsfr@1.11/dist/dsfr.nomodule.min.js';
    dsfrScriptLegacy.setAttribute('nomodule', '');
    document.head.appendChild(dsfrScriptLegacy);

    // ============================================
    // OBJETS REQUIS PAR LIMESURVEY
    // ============================================

    // Créer les objets que LimeSurvey attend
    window.ThemeScripts = window.ThemeScripts || {};
    window.basicThemeScripts = window.basicThemeScripts || {};

    // Initialiser basicThemeScripts avec TOUTES les méthodes requises
    window.basicThemeScripts.init = function() {
        console.log('BasicThemeScripts initialized');
    };

    // Méthode initGlobal requise par LimeSurvey
    window.basicThemeScripts.initGlobal = function() {
        console.log('BasicThemeScripts initGlobal called');
    };

    // Autres méthodes potentiellement requises
    window.basicThemeScripts.initTopMenuLanguageChanger = function() {};
    window.basicThemeScripts.initQuestionIndex = function() {};
    window.basicThemeScripts.initNavigator = function() {};

    // Initialisation après le chargement du DOM
    document.addEventListener('DOMContentLoaded', function() {
        console.log('Thème DSFR-Connect initialisé');

        // Initialiser les scripts de base
        if (window.basicThemeScripts && window.basicThemeScripts.init) {
            window.basicThemeScripts.init();
        }

        // Amélioration de l'accessibilité
        initAccessibility();

        // Gestion du thème clair/sombre (si configuré)
        initThemeToggle();

        // Améliorer les composants Bootstrap avec DSFR
        enhanceBootstrapComponents();
    });

    /**
     * Amélioration de l'accessibilité
     */
    function initAccessibility() {
        // Ajouter des labels ARIA si manquants
        const inputs = document.querySelectorAll('input:not([aria-label]):not([aria-labelledby])');
        inputs.forEach(function(input) {
            const label = input.closest('label') || document.querySelector('label[for="' + input.id + '"]');
            if (label && !input.getAttribute('aria-label')) {
                input.setAttribute('aria-label', label.textContent.trim());
            }
        });

        // Améliorer les boutons de navigation
        const navButtons = document.querySelectorAll('.survey-navigation button');
        navButtons.forEach(function(button) {
            if (!button.getAttribute('aria-label')) {
                button.setAttribute('aria-label', button.textContent.trim());
            }
        });
    }

    /**
     * Gestion du thème clair/sombre
     */
    function initThemeToggle() {
        // Cette fonction peut être étendue pour gérer le changement de thème
        // si l'option est configurée dans config.xml

        // Vérifier la préférence système
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            // L'utilisateur préfère le mode sombre
            // On peut ajouter une classe au body si besoin
            // document.body.classList.add('fr-scheme-dark');
        }

        // Écouter les changements de préférence
        if (window.matchMedia) {
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
                if (e.matches) {
                    // Passage au mode sombre
                    console.log('Basculement vers le mode sombre');
                } else {
                    // Passage au mode clair
                    console.log('Basculement vers le mode clair');
                }
            });
        }
    }

    /**
     * Améliorer les composants Bootstrap avec le style DSFR
     */
    function enhanceBootstrapComponents() {
        // Ajouter les classes DSFR aux boutons Bootstrap
        document.querySelectorAll('.btn-primary').forEach(function(btn) {
            if (!btn.classList.contains('dsfr-enhanced')) {
                btn.classList.add('dsfr-enhanced');
            }
        });

        // Ajouter les classes DSFR aux inputs
        document.querySelectorAll('.form-control').forEach(function(input) {
            if (!input.classList.contains('dsfr-input')) {
                input.classList.add('dsfr-input');
            }
        });

        // Améliorer les radio/checkbox
        document.querySelectorAll('input[type="radio"], input[type="checkbox"]').forEach(function(input) {
            const parent = input.closest('.radio-item, .checkbox-item, .answer-item');
            if (parent && !parent.classList.contains('dsfr-enhanced')) {
                parent.classList.add('dsfr-enhanced');
            }
        });

        // Ajouter des wrappers DSFR si nécessaire
        enhanceLimeSurveyQuestions();
    }

    /**
     * Améliorer l'affichage des questions LimeSurvey
     */
    function enhanceLimeSurveyQuestions() {
        // Ajouter des classes DSFR aux éléments de questions
        document.querySelectorAll('.question-container, .ls-question').forEach(function(question) {
            if (!question.classList.contains('dsfr-question')) {
                question.classList.add('dsfr-question');
            }
        });

        // Améliorer les listes de choix
        document.querySelectorAll('.answer-list, .answers-list').forEach(function(list) {
            if (!list.classList.contains('dsfr-answers')) {
                list.classList.add('dsfr-answers');
            }
        });
    }

    /**
     * Validation améliorée des formulaires
     */
    function enhanceFormValidation() {
        const forms = document.querySelectorAll('form');
        forms.forEach(function(form) {
            form.addEventListener('submit', function(e) {
                // Validation personnalisée si nécessaire
                const requiredFields = form.querySelectorAll('[required]');
                let isValid = true;

                requiredFields.forEach(function(field) {
                    if (!field.value.trim()) {
                        isValid = false;
                        field.classList.add('error');

                        // Ajouter un message d'erreur si absent
                        if (!field.nextElementSibling || !field.nextElementSibling.classList.contains('error-message')) {
                            const errorMsg = document.createElement('p');
                            errorMsg.className = 'error-message';
                            errorMsg.textContent = 'Ce champ est obligatoire';
                            field.parentNode.insertBefore(errorMsg, field.nextSibling);
                        }
                    } else {
                        field.classList.remove('error');
                        const errorMsg = field.nextElementSibling;
                        if (errorMsg && errorMsg.classList.contains('error-message')) {
                            errorMsg.remove();
                        }
                    }
                });

                if (!isValid) {
                    e.preventDefault();
                    // Faire défiler jusqu'au premier champ en erreur
                    const firstError = form.querySelector('.error');
                    if (firstError) {
                        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        firstError.focus();
                    }
                }
            });
        });
    }

    // Appeler l'amélioration de la validation
    document.addEventListener('DOMContentLoaded', enhanceFormValidation);

    /**
     * SOLUTION SIMPLE: Nettoyer les classes problématiques
     */
    document.addEventListener('DOMContentLoaded', function() {
        // Supprimer answer-item, radio-item, checkbox-item dans les tableaux
        document.querySelectorAll('table td.answer-item, table td.radio-item, table td.checkbox-item').forEach(function(td) {
            td.classList.remove('answer-item', 'radio-item', 'checkbox-item', 'dsfr-enhanced');
            td.style.display = 'table-cell';
        });

        console.log('DSFR: Table classes cleaned');
    });

    /**
     * Questions conditionnelles: s'assurer que checkconditions est appelé
     */
    document.addEventListener('DOMContentLoaded', function() {
        document.addEventListener('change', function(e) {
            if ((e.target.type === 'radio' || e.target.type === 'checkbox') &&
                typeof window.checkconditions === 'function') {
                window.checkconditions(e.target.value, e.target.name, e.target.type);
            }
        }, true);
    });

})();
