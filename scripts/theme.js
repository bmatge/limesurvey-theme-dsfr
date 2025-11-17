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

        // Fix pour les modales Bootstrap
        initBootstrapModalFallback();

        // Système de validation DSFR
        // DÉSACTIVÉ temporairement pour tester
        // initDsfrValidation();

        // Initialiser les questions de classement (ranking)
        initRankingQuestions();
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
     * Gestion du thème clair/sombre DSFR
     */
    function initThemeToggle() {
        const THEME_KEY = 'dsfr-theme';
        const THEME_LIGHT = 'light';
        const THEME_DARK = 'dark';

        /**
         * Récupérer le thème actuel
         * Priorité: localStorage > préférence système > défaut (clair)
         */
        function getCurrentTheme() {
            // 1. Vérifier localStorage
            const savedTheme = localStorage.getItem(THEME_KEY);
            if (savedTheme === THEME_LIGHT || savedTheme === THEME_DARK) {
                return savedTheme;
            }

            // 2. Vérifier préférence système
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                return THEME_DARK;
            }

            // 3. Défaut: clair
            return THEME_LIGHT;
        }

        /**
         * Appliquer le thème au DOM
         */
        function applyTheme(theme) {
            const htmlElement = document.documentElement;

            if (theme === THEME_DARK) {
                htmlElement.setAttribute('data-fr-scheme', 'dark');
                htmlElement.classList.add('fr-scheme-dark');
                htmlElement.classList.remove('fr-scheme-light');
            } else {
                htmlElement.setAttribute('data-fr-scheme', 'light');
                htmlElement.classList.add('fr-scheme-light');
                htmlElement.classList.remove('fr-scheme-dark');
            }

            // Sauvegarder dans localStorage
            localStorage.setItem(THEME_KEY, theme);

            console.log('DSFR: Thème appliqué:', theme);
        }

        /**
         * Basculer entre clair et sombre
         */
        function toggleTheme() {
            const currentTheme = getCurrentTheme();
            const newTheme = currentTheme === THEME_LIGHT ? THEME_DARK : THEME_LIGHT;
            applyTheme(newTheme);
        }

        // Appliquer le thème au chargement
        const initialTheme = getCurrentTheme();
        applyTheme(initialTheme);

        // Attacher les événements aux boutons (desktop et mobile)
        const toggleButtons = document.querySelectorAll('#fr-theme-toggle, #fr-theme-toggle-mobile');
        toggleButtons.forEach(function(button) {
            if (button) {
                button.addEventListener('click', function(e) {
                    e.preventDefault();
                    toggleTheme();
                });
            }
        });

        // Écouter les changements de préférence système
        // (uniquement si l'utilisateur n'a pas défini de préférence manuelle)
        if (window.matchMedia) {
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
                // Ne changer que si l'utilisateur n'a pas de préférence sauvegardée
                if (!localStorage.getItem(THEME_KEY)) {
                    const newTheme = e.matches ? THEME_DARK : THEME_LIGHT;
                    applyTheme(newTheme);
                }
            });
        }

        console.log('DSFR: Theme toggle initialisé, thème actuel:', initialTheme);
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
     * Convertir les modales Bootstrap en alertes DSFR
     */
    function initBootstrapModalFallback() {
        console.log('DSFR: Initialisation de la conversion modale → alerte DSFR');

        /**
         * Vérifier si le contenu de la modale est valide
         */
        function isValidContent(content) {
            if (!content || content.length < 3) return false;
            // Exclure les contenus vides ou avec uniquement des espaces
            return content.trim().length > 0;
        }

        /**
         * Intercepter l'affichage de la modale Bootstrap
         */
        function interceptModalShow(modal) {
            // Vérifier si la modale a du contenu
            const modalBody = modal.querySelector('.modal-body');
            if (!modalBody) {
                console.log('DSFR: Modale sans body détectée');
                cleanupModal(modal);
                return;
            }

            const content = modalBody.textContent.trim();
            if (!isValidContent(content)) {
                console.log('DSFR: Modale vide ou sans contenu valide');
                cleanupModal(modal);
                return;
            }

            console.log('DSFR: Modale Bootstrap interceptée avec contenu:', content.substring(0, 100));

            // Récupérer le titre
            const titleElement = modal.querySelector('.modal-title, .modal-header h4, .modal-header h5');
            const title = titleElement ? titleElement.textContent.trim() : '';

            // Détecter le type de modale : validation douce (soft mandatory) ou erreur simple
            const modalFooter = modal.querySelector('.modal-footer');
            const footerLinks = modalFooter ? modalFooter.querySelectorAll('a') : [];

            // Soft mandatory : la modale a des liens d'action dans le footer
            const hasSoftMandatory = footerLinks.length > 0;

            if (hasSoftMandatory) {
                // Modale avec choix (ex: "Continuer sans répondre" ou "Fermer")
                console.log('DSFR: Modale de validation douce détectée');

                const actions = [];
                footerLinks.forEach(function(link) {
                    actions.push({
                        text: link.textContent.trim(),
                        id: link.id || '',
                        href: link.getAttribute('href') || '#',
                        onclick: link.onclick,
                        dataAttributes: {
                            dismiss: link.getAttribute('data-bs-dismiss') || link.getAttribute('data-dismiss')
                        }
                    });
                });

                showDsfrAlert(title, content, actions);
            } else {
                // Modale d'erreur simple
                console.log('DSFR: Modale d\'erreur simple détectée');
                showDsfrAlert(title, content);
            }

            // Toujours masquer la modale Bootstrap
            cleanupModal(modal);
        }

        /**
         * Observer les changements de classe sur les modales
         * Pour détecter quand Bootstrap ajoute 'show' ou 'in'
         */
        const classObserver = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                    const modal = mutation.target;

                    // Vérifier si c'est une modale Bootstrap qui devient visible
                    if (modal.classList.contains('modal') &&
                        (modal.classList.contains('show') || modal.classList.contains('in'))) {

                        console.log('DSFR: Modale Bootstrap en cours d\'affichage détectée');
                        interceptModalShow(modal);
                    }
                }
            });
        });

        /**
         * Nettoyer complètement une modale
         */
        function cleanupModal(modal) {
            if (!modal) return;

            // Retirer TOUTES les classes Bootstrap
            modal.classList.remove('show', 'in', 'fade', 'modal');
            modal.setAttribute('aria-hidden', 'true');
            modal.style.display = 'none';

            // Supprimer le backdrop
            const backdrop = document.querySelector('.modal-backdrop');
            if (backdrop) {
                backdrop.remove();
            }

            // Retirer modal-open du body
            document.body.classList.remove('modal-open');

            console.log('DSFR: Modale nettoyée', modal.id);
        }

        // Observer toutes les modales existantes
        const observeModals = function() {
            document.querySelectorAll('.modal').forEach(function(modal) {
                // Nettoyer immédiatement toutes les modales au chargement
                cleanupModal(modal);

                // Observer les changements de classe pour détecter quand Bootstrap les affiche
                if (!modal.hasAttribute('data-dsfr-observed')) {
                    modal.setAttribute('data-dsfr-observed', 'true');
                    classObserver.observe(modal, {
                        attributes: true,
                        attributeFilter: ['class']
                    });
                    console.log('DSFR: Observation de la modale', modal.id || 'sans-id');
                }
            });

            // Nettoyer le backdrop et modal-open si présents
            const backdrop = document.querySelector('.modal-backdrop');
            if (backdrop) {
                backdrop.remove();
            }
            document.body.classList.remove('modal-open');
        };

        // Observer les modales existantes
        observeModals();

        // Observer l'ajout de nouvelles modales dans le DOM
        const bodyObserver = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                mutation.addedNodes.forEach(function(node) {
                    if (node.nodeType === 1 && node.classList && node.classList.contains('modal')) {
                        console.log('DSFR: Nouvelle modale ajoutée au DOM');
                        cleanupModal(node);

                        if (!node.hasAttribute('data-dsfr-observed')) {
                            node.setAttribute('data-dsfr-observed', 'true');
                            classObserver.observe(node, {
                                attributes: true,
                                attributeFilter: ['class']
                            });
                        }
                    }
                });
            });
        });

        bodyObserver.observe(document.body, {
            childList: true,
            subtree: true
        });

        // Nettoyer au chargement ET après de courts délais
        setTimeout(observeModals, 100);
        setTimeout(observeModals, 500);
    }

    /**
     * Afficher une alerte DSFR en haut de page
     *
     * @param {string} title - Titre de l'alerte
     * @param {string} message - Message de l'alerte
     * @param {Array} actions - Tableau d'objets décrivant les boutons d'action (optionnel)
     *                          Chaque action : { text, id, href, onclick, dataAttributes }
     */
    function showDsfrAlert(title, message, actions) {
        // Trouver le conteneur principal (après le header)
        const container = document.querySelector('#outerframeContainer, main, .container-fluid');
        if (!container) {
            console.warn('DSFR: Impossible de trouver le conteneur pour l\'alerte');
            return;
        }

        // Supprimer les anciennes alertes DSFR de validation
        const oldAlerts = document.querySelectorAll('.dsfr-validation-alert');
        oldAlerts.forEach(function(alert) {
            alert.remove();
        });

        // Créer l'alerte DSFR
        const alert = document.createElement('div');
        alert.className = 'fr-alert fr-alert--error dsfr-validation-alert';
        alert.setAttribute('role', 'alert');

        // Structure de l'alerte DSFR
        let alertHtml = '<div class="fr-container">';

        if (title) {
            alertHtml += '<h3 class="fr-alert__title">' + escapeHtml(title) + '</h3>';
        }

        alertHtml += '<p>' + escapeHtml(message) + '</p>';

        // Boutons d'action (si fournis)
        if (actions && actions.length > 0) {
            alertHtml += '<div class="fr-btns-group fr-btns-group--inline-sm fr-mt-2w">';

            actions.forEach(function(action, index) {
                // Premier bouton = primaire, les autres = secondaires
                const btnClass = index === 0 ? 'fr-btn' : 'fr-btn fr-btn--secondary';
                const actionId = action.id ? 'id="dsfr-action-' + action.id + '"' : '';

                alertHtml += '<button type="button" class="' + btnClass + '" ' + actionId + ' data-action-index="' + index + '">';
                alertHtml += escapeHtml(action.text);
                alertHtml += '</button>';
            });

            alertHtml += '</div>';
        }

        // Bouton de fermeture (uniquement si pas de boutons d'action)
        if (!actions || actions.length === 0) {
            alertHtml += '<button class="fr-btn--close fr-btn fr-mt-2w" title="Masquer le message" aria-label="Masquer le message">Fermer</button>';
        }

        alertHtml += '</div>';

        alert.innerHTML = alertHtml;

        // Insérer en haut du conteneur
        container.insertBefore(alert, container.firstChild);

        // Ajouter les événements sur les boutons d'action
        if (actions && actions.length > 0) {
            actions.forEach(function(action, index) {
                const btn = alert.querySelector('[data-action-index="' + index + '"]');
                if (btn) {
                    btn.addEventListener('click', function() {
                        console.log('DSFR: Action cliquée', action.text);

                        // Exécuter l'onclick original si présent
                        if (action.onclick && typeof action.onclick === 'function') {
                            action.onclick.call(btn);
                        }

                        // Fermer l'alerte après l'action
                        alert.remove();

                        // Si l'action demande de fermer la modale (dismiss)
                        if (action.dataAttributes && action.dataAttributes.dismiss) {
                            const modal = document.querySelector('.modal');
                            if (modal) {
                                modal.classList.remove('show', 'in');
                                modal.style.display = 'none';
                                document.body.classList.remove('modal-open');

                                const backdrop = document.querySelector('.modal-backdrop');
                                if (backdrop) backdrop.remove();
                            }
                        }
                    });
                }
            });
        } else {
            // Ajouter l'événement de fermeture sur le bouton Fermer
            const closeBtn = alert.querySelector('.fr-btn--close');
            if (closeBtn) {
                closeBtn.addEventListener('click', function() {
                    alert.remove();
                });
            }
        }

        // Faire défiler jusqu'à l'alerte
        alert.scrollIntoView({ behavior: 'smooth', block: 'start' });

        // Auto-masquage après 15 secondes (plus long si actions)
        const autoCloseDelay = actions && actions.length > 0 ? 15000 : 10000;
        setTimeout(function() {
            if (alert.parentNode) {
                alert.classList.add('fr-alert--fade-out');
                setTimeout(function() {
                    alert.remove();
                }, 500);
            }
        }, autoCloseDelay);

        console.log('DSFR: Alerte affichée', { title, message, hasActions: !!(actions && actions.length > 0) });
    }

    /**
     * Échapper les caractères HTML pour éviter XSS
     */
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
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

    /**
     * Système de validation DSFR complet
     *
     * Remplace le système de validation Bootstrap/EM par un système DSFR
     * avec messages inline et alerte globale
     */
    function initDsfrValidation() {
        console.log('DSFR: Initialisation du système de validation');

        // Intercepter la soumission de tous les formulaires
        const forms = document.querySelectorAll('form#limesurvey, form[name="limesurvey"]');

        forms.forEach(function(form) {
            // Empêcher la soumission native
            form.addEventListener('submit', function(e) {
                console.log('DSFR: Tentative de soumission du formulaire');

                // Nettoyer les erreurs précédentes
                clearAllErrors();

                // Valider le formulaire
                const errors = validateForm(form);

                if (errors.length > 0) {
                    // Empêcher la soumission
                    e.preventDefault();
                    e.stopPropagation();
                    e.stopImmediatePropagation();

                    console.log('DSFR: Validation échouée, ' + errors.length + ' erreur(s)');

                    // Afficher les erreurs
                    displayErrors(errors);

                    return false;
                }

                console.log('DSFR: Validation réussie');
                return true;
            }, true); // useCapture = true pour intercepter avant EM
        });

        /**
         * Valider le formulaire et retourner les erreurs
         */
        function validateForm(form) {
            const errors = [];

            // 1. Trouver toutes les questions obligatoires
            const questionContainers = form.querySelectorAll('.question-container');

            questionContainers.forEach(function(container) {
                // Ignorer les questions cachées par les conditions
                // LimeSurvey cache les questions avec display: none ou classe ls-hidden
                const isHidden = container.style.display === 'none' ||
                               container.classList.contains('ls-hidden') ||
                               container.classList.contains('ls-irrelevant') ||
                               !container.offsetParent; // offsetParent est null si l'élément est caché

                if (isHidden) {
                    console.log('DSFR: Question cachée ignorée dans la validation');
                    return;
                }

                // Vérifier si la question est marquée comme obligatoire
                const isMandatory = container.querySelector('.asterisk, .mandatory') ||
                                   container.classList.contains('mandatory');

                if (!isMandatory) return;

                // Récupérer le texte de la question
                const questionText = container.querySelector('.question-text, .questiontext, h3');
                const questionLabel = questionText ? questionText.textContent.trim().substring(0, 100) : 'Question';

                // Vérifier selon le type de question
                const hasError = checkQuestionValidity(container);

                if (hasError) {
                    errors.push({
                        container: container,
                        label: questionLabel,
                        message: 'Cette question est obligatoire'
                    });
                }
            });

            return errors;
        }

        /**
         * Vérifier si une question est valide
         */
        function checkQuestionValidity(container) {
            // 1. Questions avec inputs texte
            const textInputs = container.querySelectorAll('input[type="text"]:not([id*="other"]), input[type="number"], textarea');
            if (textInputs.length > 0) {
                let allEmpty = true;
                textInputs.forEach(function(input) {
                    if (input.value && input.value.trim() !== '') {
                        allEmpty = false;
                    }
                });
                if (allEmpty) return true;
            }

            // 2. Questions radio (choix unique)
            const radios = container.querySelectorAll('input[type="radio"]');
            if (radios.length > 0) {
                let isChecked = false;
                radios.forEach(function(radio) {
                    if (radio.checked) isChecked = true;
                });
                if (!isChecked) return true;
            }

            // 3. Questions checkbox (choix multiple - au moins une option)
            const checkboxes = container.querySelectorAll('input[type="checkbox"]:not([id*="other"])');
            if (checkboxes.length > 0) {
                let isChecked = false;
                checkboxes.forEach(function(checkbox) {
                    if (checkbox.checked) isChecked = true;
                });
                if (!isChecked) return true;
            }

            // 4. Select dropdown
            const selects = container.querySelectorAll('select');
            if (selects.length > 0) {
                let allEmpty = true;
                selects.forEach(function(select) {
                    if (select.value && select.value !== '' && select.value !== '-oth-') {
                        allEmpty = false;
                    }
                });
                if (allEmpty) return true;
            }

            return false; // Pas d'erreur
        }

        /**
         * Afficher les erreurs
         */
        function displayErrors(errors) {
            console.log('DSFR: Affichage de ' + errors.length + ' erreur(s)');

            // 1. Marquer visuellement les questions en erreur
            errors.forEach(function(error) {
                // Ajouter classe d'erreur au container
                error.container.classList.add('has-error', 'fr-input-group--error');

                // Ajouter message d'erreur inline
                addInlineErrorMessage(error.container, error.message);

                // Marquer les inputs en erreur
                const inputs = error.container.querySelectorAll('input, textarea, select');
                inputs.forEach(function(input) {
                    input.classList.add('error', 'fr-input--error');
                });

                // Attacher les event listeners pour retirer l'erreur lors de l'interaction
                attachErrorRemovalListeners(error.container);
            });

            // 2. Afficher alerte globale en haut
            const errorSummary = errors.map(function(e, i) {
                return (i + 1) + '. ' + e.label;
            }).join('\n');

            showDsfrAlert(
                'Formulaire incomplet',
                errors.length + ' question(s) obligatoire(s) non remplie(s) :\n\n' + errorSummary,
                null
            );

            // 3. Scroll vers la première erreur
            if (errors.length > 0) {
                errors[0].container.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
            }
        }

        /**
         * Attacher des event listeners pour retirer l'erreur dès que l'utilisateur interagit
         */
        function attachErrorRemovalListeners(container) {
            // Éviter de dupliquer les listeners
            if (container.dataset.errorListenersAttached) {
                return;
            }
            container.dataset.errorListenersAttached = 'true';

            // Fonction pour retirer l'erreur
            function removeError() {
                container.classList.remove('has-error', 'fr-input-group--error');

                // Retirer les classes d'erreur des inputs
                const inputs = container.querySelectorAll('input, textarea, select');
                inputs.forEach(function(input) {
                    input.classList.remove('error', 'fr-input--error');
                });

                // Retirer le message d'erreur inline
                const errorMsg = container.querySelector('.fr-error-text');
                if (errorMsg) {
                    errorMsg.remove();
                }
            }

            // Attacher les listeners sur tous les champs de la question
            const textInputs = container.querySelectorAll('input[type="text"], input[type="number"], textarea');
            textInputs.forEach(function(input) {
                input.addEventListener('input', removeError, { once: true });
            });

            const radios = container.querySelectorAll('input[type="radio"]');
            radios.forEach(function(radio) {
                radio.addEventListener('change', removeError, { once: true });
            });

            const checkboxes = container.querySelectorAll('input[type="checkbox"]');
            checkboxes.forEach(function(checkbox) {
                checkbox.addEventListener('change', removeError, { once: true });
            });

            const selects = container.querySelectorAll('select');
            selects.forEach(function(select) {
                select.addEventListener('change', removeError, { once: true });
            });
        }

        /**
         * Ajouter un message d'erreur inline sous la question
         */
        function addInlineErrorMessage(container, message) {
            // Vérifier si un message existe déjà
            let errorMsg = container.querySelector('.fr-error-text');
            if (errorMsg) {
                errorMsg.textContent = message;
                return;
            }

            // Créer le message
            errorMsg = document.createElement('p');
            errorMsg.className = 'fr-error-text';
            errorMsg.textContent = message;
            errorMsg.setAttribute('role', 'alert');

            // Insérer après la question
            const answerContainer = container.querySelector('.answer, .answers');
            if (answerContainer) {
                answerContainer.parentNode.insertBefore(errorMsg, answerContainer.nextSibling);
            } else {
                container.appendChild(errorMsg);
            }
        }

        /**
         * Nettoyer toutes les erreurs
         */
        function clearAllErrors() {
            // Retirer les classes d'erreur
            document.querySelectorAll('.has-error, .fr-input-group--error').forEach(function(el) {
                el.classList.remove('has-error', 'fr-input-group--error');
            });

            // Retirer les messages d'erreur
            document.querySelectorAll('.fr-error-text').forEach(function(msg) {
                msg.remove();
            });

            // Retirer les classes des inputs
            document.querySelectorAll('input.error, textarea.error, select.error, .fr-input--error, .fr-select--error').forEach(function(input) {
                input.classList.remove('error', 'fr-input--error', 'fr-select--error');
            });

            // Supprimer l'alerte globale
            const alerts = document.querySelectorAll('.dsfr-validation-alert');
            alerts.forEach(function(alert) {
                alert.remove();
            });
        }

        console.log('DSFR: Système de validation initialisé');
    }

    /**
     * Initialisation manuelle des questions de classement (ranking)
     *
     * Charge les scripts nécessaires et initialise RankingQuestion
     * car registerPackage() ne fonctionne pas dans notre thème
     */
    function initRankingQuestions() {
        // Vérifier s'il y a des questions de classement sur la page
        const rankingQuestions = document.querySelectorAll('.ranking-question-dsfr, [id^="sortable-choice-"]');

        if (rankingQuestions.length === 0) {
            console.log('DSFR: Aucune question de classement détectée');
            return;
        }

        console.log('DSFR: ' + rankingQuestions.length + ' question(s) de classement détectée(s)');

        // Charger SortableJS si pas déjà chargé
        if (typeof Sortable === 'undefined') {
            console.log('DSFR: Chargement de SortableJS...');
            const sortableScript = document.createElement('script');
            sortableScript.src = '/assets/packages/sortablejs/sortable.min.js';
            sortableScript.onload = function() {
                console.log('DSFR: SortableJS chargé');
                loadRankingScript();
            };
            sortableScript.onerror = function() {
                console.error('DSFR: Erreur de chargement de SortableJS');
            };
            document.head.appendChild(sortableScript);
        } else {
            console.log('DSFR: SortableJS déjà chargé');
            loadRankingScript();
        }

        function loadRankingScript() {
            // Charger RankingQuestion si pas déjà chargé
            if (typeof RankingQuestion === 'undefined') {
                console.log('DSFR: Chargement de ranking.js...');
                const rankingScript = document.createElement('script');
                rankingScript.src = '/assets/packages/questions/ranking/scripts/ranking.js';
                rankingScript.onload = function() {
                    console.log('DSFR: ranking.js chargé');
                    initializeRankingInstances();
                };
                rankingScript.onerror = function() {
                    console.error('DSFR: Erreur de chargement de ranking.js');
                };
                document.head.appendChild(rankingScript);
            } else {
                console.log('DSFR: RankingQuestion déjà chargé');
                initializeRankingInstances();
            }
        }

        function initializeRankingInstances() {
            console.log('DSFR: Initialisation des instances RankingQuestion...');

            // Définir la traduction
            if (typeof LSvar === 'undefined') {
                window.LSvar = {};
            }
            if (typeof LSvar.lang === 'undefined') {
                LSvar.lang = {};
            }
            LSvar.lang.rankhelp = "Double-cliquez ou glissez-déposez les éléments de la liste de gauche pour les déplacer vers la droite - votre élément le mieux classé doit être en haut à droite, jusqu'à votre élément le moins bien classé.";

            // Trouver toutes les questions de classement et les initialiser
            document.querySelectorAll('.ranking-question-dsfr').forEach(function(container) {
                // Récupérer les options depuis les data attributes
                const qId = container.dataset.rankingQid;
                const rankingName = container.dataset.rankingName;
                const maxAnswers = container.dataset.maxAnswers || "";
                const minAnswers = container.dataset.minAnswers || "";
                const showpopups = container.dataset.showpopups || "1";
                const samechoiceheight = container.dataset.samechoiceheight || "1";
                const samelistheight = container.dataset.samelistheight || "1";

                console.log('DSFR: Initialisation de la question ranking ' + qId + ' avec rankingName=' + rankingName);

                // Créer les options pour RankingQuestion
                const options = {
                    max_answers: maxAnswers,
                    min_answers: minAnswers,
                    showpopups: showpopups,
                    samechoiceheight: samechoiceheight,
                    samelistheight: samelistheight,
                    rankingName: rankingName,
                    questionId: qId
                };

                try {
                    const rankingInstance = new RankingQuestion(options);
                    rankingInstance.init();
                    console.log('DSFR: Question ranking ' + qId + ' initialisée avec succès');
                } catch(e) {
                    console.error('DSFR: Erreur lors de l\'initialisation du ranking ' + qId + ':', e);
                }
            });
        }
    }

    // ============================================
    // GESTION DES ERREURS DE VALIDATION
    // ============================================

    /**
     * Retire les classes d'erreur quand l'utilisateur commence à saisir
     * Utilise la délégation d'événements pour fonctionner avec les éléments dynamiques
     */
    $(document).on('input change keyup', '.question-container.input-error input, .question-container.input-error textarea, .question-container.input-error select', function() {
        const $input = $(this);
        const $question = $input.closest('.question-container');

        if ($question.length) {
            // Retirer les classes d'erreur du container de question
            $question.removeClass('input-error fr-input-group--error');

            // Retirer les classes d'erreur du groupe d'input parent
            $input.closest('.fr-input-group').removeClass('fr-input-group--error');

            // Cacher le message d'erreur initial
            $question.find('.ls-question-mandatory-initial').fadeOut(300);

            console.log('DSFR: Erreur de validation retirée pour la question');
        }
    });

})();
