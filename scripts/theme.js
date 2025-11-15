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
    // CHARGEMENT DU DSFR - RESSOURCES LOCALES
    // ============================================

    // Charger le JS DSFR depuis les ressources locales
    // Les fichiers sont dans le dossier dsfr-dist/js/
    // Trouver l'URL du thème en analysant le script actuel
    function getThemeUrl() {
        // Chercher le script theme.js actuel pour déduire le chemin
        const scripts = Array.from(document.scripts);
        for (const script of scripts) {
            if (script.src && script.src.includes('/theme.js')) {
                // Ex: http://localhost:8080/tmp/assets/24f866ec/scripts/theme.js
                // -> http://localhost:8080/tmp/assets/24f866ec
                const match = script.src.match(/(.*\/tmp\/assets\/[^/]+)/);
                if (match) {
                    return match[1];
                }
            }
        }

        // Fallback: chercher dans les CSS
        const styleSheets = Array.from(document.styleSheets);
        for (const sheet of styleSheets) {
            if (sheet.href && sheet.href.includes('/theme.css')) {
                // Ex: http://localhost:8080/tmp/assets/24f866ec/css/theme.css
                // -> http://localhost:8080/tmp/assets/24f866ec
                const match = sheet.href.match(/(.*\/tmp\/assets\/[^/]+)/);
                if (match) {
                    return match[1];
                }
            }
        }

        // Fallback ultime
        return '';
    }

    const themeUrl = getThemeUrl();
    const dsfrPath = themeUrl + '/dsfr-dist/js/';

    const dsfrScript = document.createElement('script');
    dsfrScript.src = dsfrPath + 'dsfr.module.min.js';
    dsfrScript.type = 'module';
    document.head.appendChild(dsfrScript);

    // Version nomodule pour anciens navigateurs
    const dsfrScriptLegacy = document.createElement('script');
    dsfrScriptLegacy.src = dsfrPath + 'dsfr.nomodule.min.js';
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

    /**
     * Changement de langue
     * Fonction globale pour gérer le changement de langue
     */
    window.activateLanguageChanger = function() {
        const selects = document.querySelectorAll('select[name="lang"]');
        selects.forEach(function(select) {
            if (select.value) {
                const targetUrl = select.getAttribute('data-targeturl');
                if (targetUrl) {
                    // Construire l'URL avec le paramètre lang
                    const separator = targetUrl.indexOf('?') > -1 ? '&' : '?';
                    window.location.href = targetUrl + separator + 'lang=' + select.value;
                }
            }
        });
    };

    // Initialisation après le chargement du DOM
    document.addEventListener('DOMContentLoaded', function() {
        console.log('Thème DSFR initialisé');

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

    /**
     * Validation des champs numériques (data-number)
     * Ajoute la classe error si la saisie n'est pas numérique
     */
    document.addEventListener('DOMContentLoaded', function() {
        console.log('DSFR: Initialisation de la validation numérique');

        // Trouver tous les inputs avec data-number
        const numberInputs = document.querySelectorAll('input[data-number="1"]');
        console.log('DSFR: Nombre d\'inputs numériques trouvés:', numberInputs.length);

        numberInputs.forEach(function(input) {
            console.log('DSFR: Initialisation de la validation pour', input.id);

            // Valider à chaque frappe
            input.addEventListener('input', function() {
                console.log('DSFR: Input event pour', this.id, 'valeur:', this.value);
                validateNumberInput(this);
            });

            // Valider au blur
            input.addEventListener('blur', function() {
                console.log('DSFR: Blur event pour', this.id);
                validateNumberInput(this);
            });

            // Valider à chaque changement (keyup)
            input.addEventListener('keyup', function() {
                console.log('DSFR: Keyup event pour', this.id);
                validateNumberInput(this);
            });

            // Valider au chargement si déjà rempli
            if (input.value) {
                validateNumberInput(input);
            }
        });

        function validateNumberInput(input) {
            const value = input.value.trim();
            console.log('DSFR: Validation de', input.id, 'valeur:', value);

            // Nettoyer les anciens messages d'erreur
            removeErrorMessage(input);

            // Si vide, pas d'erreur
            if (value === '') {
                input.classList.remove('error');
                console.log('DSFR: Valeur vide, pas d\'erreur');
                return;
            }

            // Vérifier si c'est un nombre (accepte aussi virgule)
            const isNumber = /^-?\d*[.,]?\d*$/.test(value);
            console.log('DSFR: Est un nombre?', isNumber, 'pour la valeur:', value);

            if (!isNumber) {
                // Ajouter la classe error
                input.classList.add('error');
                console.log('DSFR: Classe error ajoutée à', input.id);

                // Créer le message d'erreur
                const parentLi = input.closest('li.question-item');
                const gridRow = input.closest('.fr-grid-row');

                if (gridRow && parentLi) {
                    const errorMsg = document.createElement('div');
                    errorMsg.className = 'ls-em-error dsfr-validation-error';
                    errorMsg.textContent = 'Seuls des nombres peuvent être entrés dans ce champ.';
                    errorMsg.style.marginTop = '0.25rem';

                    // Insérer après la grid-row
                    gridRow.parentElement.appendChild(errorMsg);
                    console.log('DSFR: Message d\'erreur créé pour', input.id);
                }
            } else {
                // Retirer la classe error
                input.classList.remove('error');
                console.log('DSFR: Erreur retirée pour', input.id);
            }
        }

        function removeErrorMessage(input) {
            const parentLi = input.closest('li.question-item');
            if (parentLi) {
                const errorMsgs = parentLi.querySelectorAll('.dsfr-validation-error');
                errorMsgs.forEach(function(msg) {
                    msg.remove();
                });
            }
        }
    });

})();
