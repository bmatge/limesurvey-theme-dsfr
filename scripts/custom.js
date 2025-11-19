/**
 * JavaScript personnalisé pour le thème DSFR
 *
 * Utilisez ce fichier pour vos scripts personnalisés
 * sans modifier theme.js
 */

console.log('DSFR custom.js chargé - version 2024-11-18');

(function() {
    'use strict';

    // === Fix pour les questions Multiple Short Text avec Input On Demand ===

    /**
     * Réinitialise les boutons "Ajouter une ligne" après validation
     */
    function reinitInputOnDemand() {
        const addButtons = document.querySelectorAll('.selector--inputondemand-addlinebutton');

        addButtons.forEach(button => {
            if (button.dataset.initialized) return;
            button.dataset.initialized = 'true';

            const container = button.closest('[id^="selector--inputondemand-"]');
            if (!container) return;

            const itemsList = container.querySelector('.selector--inputondemand-list');
            if (!itemsList) return;

            // Utiliser capture=true pour intercepter avant les autres listeners
            button.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopImmediatePropagation(); // Bloquer les autres listeners (LimeSurvey natif)

                const hiddenItems = itemsList.querySelectorAll('.selector--inputondemand-list-item.d-none');

                if (hiddenItems.length > 0) {
                    const nextItem = hiddenItems[0];
                    nextItem.classList.remove('d-none');

                    const input = nextItem.querySelector('input, textarea');
                    if (input) setTimeout(() => input.focus(), 100);

                    if (hiddenItems.length === 1) button.style.display = 'none';
                }
            }, true); // Capture phase = true pour s'exécuter avant les autres
        });
    }

    /**
     * Affiche les lignes visibles après validation échouée
     */
    function restoreVisibleLines() {
        const containers = document.querySelectorAll('[id^="selector--inputondemand-"]');

        containers.forEach(container => {
            const itemsList = container.querySelector('.selector--inputondemand-list');
            if (!itemsList) return;

            const allItems = itemsList.querySelectorAll('.selector--inputondemand-list-item');
            const hiddenItems = itemsList.querySelectorAll('.selector--inputondemand-list-item.d-none');

            if (hiddenItems.length === allItems.length && allItems.length > 0) {
                allItems[0].classList.remove('d-none');
            }
        });
    }

    /**
     * Gère l'affichage du bouton "Ajouter une ligne"
     */
    function updateAddButtonVisibility() {
        const containers = document.querySelectorAll('[id^="selector--inputondemand-"]');

        containers.forEach(container => {
            const button = container.querySelector('.selector--inputondemand-addlinebutton');
            const itemsList = container.querySelector('.selector--inputondemand-list');

            if (!button || !itemsList) return;

            const hiddenItems = itemsList.querySelectorAll('.selector--inputondemand-list-item.d-none');
            button.style.display = hiddenItems.length > 0 ? '' : 'none';
        });
    }

    /**
     * Initialisation
     */
    function initMultipleShortText() {
        restoreVisibleLines();
        reinitInputOnDemand();
        updateAddButtonVisibility();
    }

    // Initialiser au chargement
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initMultipleShortText);
    } else {
        initMultipleShortText();
    }

    // Réinitialiser après événements AJAX
    document.addEventListener('limesurvey:questionsLoaded', initMultipleShortText);

    // === Fix pour les Bootstrap Buttons Radio (boutons radio stylés) ===

    /**
     * Gère l'état "active" des conteneurs de boutons radio
     */
    function initBootstrapButtonsRadio() {
        // Trouver tous les groupes de boutons radio
        const radioGroups = document.querySelectorAll('.radio-list[data-bs-toggle="buttons"]');

        radioGroups.forEach(function(group) {
            // Trouver tous les inputs radio dans ce groupe
            const radios = group.querySelectorAll('input[type="radio"]');

            radios.forEach(function(radio) {
                // Ajouter un event listener sur chaque radio
                radio.addEventListener('change', function() {
                    if (this.checked) {
                        // Retirer la classe "active" de tous les conteneurs du même groupe
                        const allContainers = group.querySelectorAll('.bootstrap-buttons-div .form-check');
                        allContainers.forEach(function(container) {
                            container.classList.remove('active');
                        });

                        // Ajouter la classe "active" au conteneur du radio sélectionné
                        const currentContainer = this.closest('.form-check');
                        if (currentContainer) {
                            currentContainer.classList.add('active');
                        }
                    }
                });

                // Initialiser l'état au chargement
                if (radio.checked) {
                    const container = radio.closest('.form-check');
                    if (container) {
                        container.classList.add('active');
                    }
                }
            });
        });
    }

    /**
     * Initialise le champ "Autre" des radio buttons au chargement
     * - Affiche le champ si "autre" est sélectionné
     * - Restaure la valeur depuis le champ caché
     */
    function initRadioOtherField() {
        // Trouver tous les boutons radio "autre"
        const otherRadios = document.querySelectorAll('input[type="radio"][value="-oth-"]');

        otherRadios.forEach(function(radio) {
            const name = radio.name;
            const otherDiv = document.getElementById('div' + name + 'other');
            const otherInput = document.getElementById('answer' + name + 'othertext');
            const hiddenInput = document.getElementById('answer' + name + 'othertextaux');

            if (!otherDiv || !otherInput) return;

            // Si "autre" est sélectionné au chargement, afficher le champ et restaurer la valeur
            if (radio.checked) {
                otherDiv.classList.remove('ls-js-hidden');

                // Restaurer la valeur depuis le champ caché si elle existe
                if (hiddenInput && hiddenInput.value) {
                    otherInput.value = hiddenInput.value;
                }
            }
        });
    }

    // Initialiser au chargement
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            initBootstrapButtonsRadio();
            initRadioOtherField();
        });
    } else {
        initBootstrapButtonsRadio();
        initRadioOtherField();
    }

    // Réinitialiser après événements AJAX
    document.addEventListener('limesurvey:questionsLoaded', function() {
        initBootstrapButtonsRadio();
        initRadioOtherField();
    });

    // === Fix pour le rechargement du Captcha ===

    /**
     * Recharge l'image du captcha sans recharger toute la page
     */
    function initCaptchaReload() {
        const reloadButton = document.getElementById('reloadCaptcha');

        if (!reloadButton) {
            return; // Pas de captcha sur cette page
        }

        // Éviter de dupliquer les listeners
        if (reloadButton.dataset.captchaInitialized) {
            return;
        }
        reloadButton.dataset.captchaInitialized = 'true';

        reloadButton.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();


            // Trouver l'image du captcha
            // Elle est soit dans le même container, soit juste avant le bouton
            const captchaContainer = reloadButton.closest('.fr-captcha, .captcha-container, [class*="captcha"]');
            let captchaImage = null;

            if (captchaContainer) {
                captchaImage = captchaContainer.querySelector('img');
            }

            // Fallback: chercher dans tout le formulaire
            if (!captchaImage) {
                const form = reloadButton.closest('form');
                if (form) {
                    captchaImage = form.querySelector('img[src*="captcha"]');
                }
            }

            if (!captchaImage) {
                window.location.reload();
                return;
            }

            // Recharger l'image en changeant le paramètre v
            const currentSrc = captchaImage.src;
            const newSrc = currentSrc.replace(/v=[^&]*/, 'v=' + new Date().getTime());


            // Ajouter un effet visuel pendant le rechargement
            captchaImage.style.opacity = '0.5';

            captchaImage.onload = function() {
                captchaImage.style.opacity = '1';
            };

            captchaImage.onerror = function() {
                captchaImage.style.opacity = '1';
            };

            captchaImage.src = newSrc;
        });

    }

    /**
     * Validation DSFR pour le champ captcha
     * Remplace la validation HTML5 native par une validation DSFR avec message d'erreur
     */
    function initCaptchaValidation() {
        const captchaForm = document.getElementById('form-captcha');
        const captchaInput = document.getElementById('loadsecurity');
        const messagesGroup = document.getElementById('loadsecurity-messages');
        const inputGroup = captchaInput?.closest('.fr-input-group');

        if (!captchaForm || !captchaInput || !messagesGroup) {
            return; // Pas de formulaire captcha sur cette page
        }

        captchaForm.addEventListener('submit', function(e) {
            // Nettoyer les erreurs précédentes
            inputGroup.classList.remove('fr-input-group--error');
            messagesGroup.innerHTML = '';

            // Valider le champ
            if (!captchaInput.value || captchaInput.value.trim() === '') {
                e.preventDefault();
                e.stopPropagation();

                // Ajouter la classe d'erreur
                inputGroup.classList.add('fr-input-group--error');

                // Ajouter le message d'erreur DSFR
                const errorMessage = document.createElement('p');
                errorMessage.className = 'fr-message fr-message--error';
                errorMessage.textContent = 'Veuillez saisir votre réponse';
                messagesGroup.appendChild(errorMessage);

                // Focus sur le champ pour l'accessibilité
                captchaInput.focus();

                return false;
            }
        });
    }

    // Initialiser au chargement
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            initCaptchaReload();
            initCaptchaValidation();
        });
    } else {
        initCaptchaReload();
        initCaptchaValidation();
    }

    // Réinitialiser après événements AJAX
    document.addEventListener('limesurvey:questionsLoaded', function() {
        initCaptchaReload();
        initCaptchaValidation();
    });

    /**
     * Gestion des champs obligatoires :
     * - Ajoute la classe .has-required-field aux labels/legends des champs obligatoires
     * - Ajoute une mention "Les champs marqués d'un * sont obligatoires" en haut de page
     */
    function handleRequiredFields() {
        // 1. Trouver tous les champs obligatoires
        // Méthode A: Attribut required/aria-required (captcha, formulaires)
        const requiredFields = document.querySelectorAll('input[required], textarea[required], select[required], input[aria-required="true"], textarea[aria-required="true"], select[aria-required="true"]');

        // Méthode B: Classe .mandatory sur les questions (pages LimeSurvey)
        const mandatoryQuestions = document.querySelectorAll('.mandatory.question-container, .mandatory[id^="question"]');

        // Méthode C: Badges "Obligatoire"
        const mandatoryBadges = document.querySelectorAll('.fr-badge[aria-label*="Mandatory"], .fr-badge[aria-label*="Obligatoire"]');

        if (requiredFields.length === 0 && mandatoryQuestions.length === 0 && mandatoryBadges.length === 0) {
            return; // Pas de champs obligatoires sur cette page
        }

        // 2. Traiter les champs avec attribut required
        requiredFields.forEach(field => {
            // Chercher le label associé (plusieurs stratégies)
            let label = null;

            // Stratégie 1: Label avec for="id"
            if (field.id) {
                label = document.querySelector(`label[for="${field.id}"]`);
            }

            // Stratégie 2: Label parent direct
            if (!label) {
                label = field.closest('label');
            }

            // Stratégie 3: Label ou legend frère précédent
            if (!label) {
                const inputGroup = field.closest('.fr-input-group, .fr-fieldset__element');
                if (inputGroup) {
                    label = inputGroup.querySelector('.fr-label, .fr-fieldset__legend');
                }
            }

            // Stratégie 4: Chercher dans le parent fieldset
            if (!label) {
                const fieldset = field.closest('fieldset');
                if (fieldset) {
                    label = fieldset.querySelector('.fr-fieldset__legend');
                }
            }

            // Stratégie 5: Span spécifique comme #ls-captcha-text
            if (!label && field.getAttribute('aria-labelledby')) {
                const labelId = field.getAttribute('aria-labelledby');
                label = document.getElementById(labelId);
            }

            // Ajouter la classe si on a trouvé un label
            if (label && !label.classList.contains('has-required-field')) {
                label.classList.add('has-required-field');
            }
        });

        // 3. Traiter les questions avec classe .mandatory
        mandatoryQuestions.forEach(question => {
            // Chercher le label principal de la question
            // Structure LimeSurvey : .question-text > .ls-label-question > p
            let questionLabel = question.querySelector('.ls-label-question');

            // Si pas de classe ls-label-question, chercher .question-text en fallback
            if (!questionLabel) {
                questionLabel = question.querySelector('.question-text');
            }

            // Vérifier si pas déjà traité (classe marqueur)
            if (questionLabel && !questionLabel.classList.contains('asterisk-injected')) {
                // Marquer comme traité (ne PAS utiliser has-required-field pour éviter le CSS ::before)
                questionLabel.classList.add('asterisk-injected');

                // Injecter l'astérisque directement dans le DOM
                // Chercher le premier élément de texte (p, span, div, etc.)
                const textElement = questionLabel.querySelector('p, span, div, h1, h2, h3, h4, h5, h6') || questionLabel;

                // Vérifier qu'on n'a pas déjà ajouté l'astérisque
                if (!textElement.querySelector('.required-asterisk')) {
                    const asterisk = document.createElement('span');
                    asterisk.className = 'required-asterisk';
                    asterisk.style.color = 'var(--text-default-error)';
                    asterisk.style.fontWeight = '700';
                    asterisk.style.marginRight = '0.25rem';
                    asterisk.setAttribute('aria-hidden', 'true');
                    asterisk.textContent = '* ';

                    // Insérer l'astérisque au début du contenu
                    textElement.insertBefore(asterisk, textElement.firstChild);
                }
            }

            // IMPORTANT : Ajouter l'attribut required aux inputs pour l'accessibilité et la validation HTML5
            // LimeSurvey ne le fait pas automatiquement sur les questions obligatoires
            const inputs = question.querySelectorAll('input[type="text"], input[type="number"], input[type="email"], input[type="tel"], textarea, select');
            inputs.forEach(input => {
                // Ne pas ajouter required sur les inputs cachés ou disabled
                if (input.type !== 'hidden' && !input.disabled && !input.hasAttribute('required')) {
                    input.setAttribute('required', '');
                    input.setAttribute('aria-required', 'true');
                }
            });
        });

        // 4. Ajouter la mention en haut de page (une seule fois)
        if (document.getElementById('required-fields-notice')) {
            return; // Déjà ajoutée
        }

        // Trouver le point d'insertion : juste avant les questions

        // Stratégie 1: Page captcha - insérer avant le formulaire (avec fr-container)
        const captchaForm = document.querySelector('.form-captcha');
        if (captchaForm) {
            const notice = document.createElement('div');
            notice.id = 'required-fields-notice';
            notice.className = 'fr-container fr-my-2w';
            notice.innerHTML = '<p class="fr-text--sm" style="color: var(--text-mention-grey);"><span class="fr-icon-error-warning-line" aria-hidden="true" style="margin-right: 0.5rem;"></span>Les champs marqués d\'un <span style="color: var(--text-default-error); font-weight: 700;" aria-hidden="true">*</span> sont obligatoires</p>';

            const formParent = captchaForm.parentElement;
            if (formParent) {
                formParent.insertBefore(notice, captchaForm);
                return;
            }
        }

        // Créer la mention pour les pages de questions (sans fr-container car déjà dans un groupe)
        const notice = document.createElement('div');
        notice.id = 'required-fields-notice';
        notice.className = 'fr-my-3w';
        notice.innerHTML = '<p class="fr-text--sm" style="color: var(--text-mention-grey);"><span class="fr-icon-error-warning-line" aria-hidden="true" style="margin-right: 0.5rem;"></span>Les champs marqués d\'un <span style="color: var(--text-default-error); font-weight: 700;" aria-hidden="true">*</span> sont obligatoires</p>';

        // Stratégie 2: Pages de questions - Insérer juste avant la première question
        // dans le premier groupe (après nom/description du groupe)
        const firstGroup = document.querySelector('[id^="group-"]');
        if (firstGroup) {
            // Chercher la première question à l'intérieur du groupe (id="question6", etc.)
            const firstQuestion = firstGroup.querySelector('[id^="question"]');
            if (firstQuestion) {
                // Insérer juste avant la première question
                firstQuestion.parentElement.insertBefore(notice, firstQuestion);
                return;
            }
        }

        // Stratégie 3: Chercher directement la première question (fallback)
        const firstQuestion = document.querySelector('[id^="question"], .question-container, .ls-question, .question-item');
        if (firstQuestion) {
            firstQuestion.parentElement.insertBefore(notice, firstQuestion);
            return;
        }

        // Stratégie 4: Insérer dans le conteneur principal après les alertes
        const mainContent = document.querySelector('#main-col, .ls-survey-content, .survey-content, .main-content');
        if (mainContent) {
            const lastAlert = mainContent.querySelector('.fr-alert:last-of-type, .error-messages:last-of-type');
            if (lastAlert) {
                lastAlert.insertAdjacentElement('afterend', notice);
            } else {
                mainContent.insertBefore(notice, mainContent.firstChild);
            }
            return;
        }

        // Stratégie 5: Fallback final - insérer dans le premier groupe ou fr-container
        const firstContainer = document.querySelector('[id^="group-"], .fr-container');
        if (firstContainer) {
            firstContainer.insertBefore(notice, firstContainer.firstChild);
        }
    }

    // Initialiser au chargement
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', handleRequiredFields);
    } else {
        handleRequiredFields();
    }

    // Réinitialiser après navigation AJAX
    document.addEventListener('limesurvey:questionsLoaded', handleRequiredFields);

    // === Transformation des erreurs LimeSurvey vers DSFR ===

    /**
     * Transforme les messages d'erreur LimeSurvey en messages DSFR conformes
     * - Détecte les questions avec classe "input-error"
     * - Ajoute fr-input-group--error sur le fr-input-group
     * - Copie le message dans fr-messages-group
     * - Cache le message LimeSurvey original
     */
    function transformErrorsToDsfr() {

        // Trouver toutes les questions en erreur
        const errorQuestions = document.querySelectorAll('.question-container.input-error');

        errorQuestions.forEach(function(question) {
            // Ignorer les questions multiple-short-txt qui sont gérées par handleMultipleShortTextErrors()
            if (question.classList.contains('multiple-short-txt')) {
                return;
            }

            // Trouver le fr-input-group dans cette question
            const inputGroup = question.querySelector('.fr-input-group');

            if (!inputGroup) {
                return;
            }

            // 3. Trouver le fr-messages-group
            const messagesGroup = inputGroup.querySelector('.fr-messages-group');

            if (!messagesGroup) {
                return;
            }

            // IMPORTANT : Vérifier si un message existe déjà pour éviter la duplication
            const existingError = messagesGroup.querySelector('.fr-message--error');
            if (existingError) {
                return; // Déjà traité
            }

            // 1. Ajouter la classe d'erreur DSFR
            inputGroup.classList.add('fr-input-group--error');

            // 2. Trouver le message d'erreur LimeSurvey
            // Ordre de priorité intelligent :
            // - Si champ vide : "obligatoire" prime
            // - Si champ rempli : validation prime
            let lsErrorContainer = null;
            let errorText = '';

            // Vérifier si le champ est vide
            const inputElement = question.querySelector('.fr-input, input, textarea, select');
            const isEmpty = !inputElement || !inputElement.value || inputElement.value.trim() === '';

            const mandatoryError = question.querySelector('.ls-question-mandatory');
            const validationErrors = question.querySelectorAll('.ls-em-tip, .em_num_answers, .ls-em-error');

            if (isEmpty && mandatoryError) {
                // Champ vide + obligatoire → message "obligatoire"
                lsErrorContainer = mandatoryError;
            } else {
                // Champ rempli → chercher les erreurs de validation
                for (let i = 0; i < validationErrors.length; i++) {
                    const error = validationErrors[i];
                    if (error.offsetParent !== null) { // Visible
                        lsErrorContainer = error;
                        break;
                    }
                }
                // Fallback sur mandatory si pas de validation visible
                if (!lsErrorContainer && mandatoryError) {
                    lsErrorContainer = mandatoryError;
                }
            }

            if (!lsErrorContainer) {
                return;
            }

            // Extraire le texte du message (sans les icônes)
            errorText = lsErrorContainer.textContent.trim();
            // Nettoyer les icônes et espaces multiples
            errorText = errorText.replace(/\s+/g, ' ').trim();

            if (!errorText) {
                return;
            }

            // 4. Créer le message d'erreur DSFR
            const errorMessage = document.createElement('p');
            errorMessage.className = 'fr-message fr-message--error';
            errorMessage.id = messagesGroup.id + '-error';
            errorMessage.textContent = errorText;
            errorMessage.setAttribute('role', 'alert');

            // Ajouter le message dans le messages-group
            messagesGroup.appendChild(errorMessage);

            // 5. Cacher le message LimeSurvey original
            const questionValidContainer = question.querySelector('.question-valid-container');
            if (questionValidContainer) {
                questionValidContainer.style.display = 'none';
            }


            // 6. Ajouter les listeners pour retirer l'erreur quand l'utilisateur corrige
            attachErrorRemovalListeners(question, inputGroup, messagesGroup);
        });
    }

    /**
     * Attache des event listeners pour retirer l'erreur DSFR quand l'utilisateur interagit
     */
    function attachErrorRemovalListeners(question, inputGroup, messagesGroup) {
        // Éviter de dupliquer les listeners
        if (question.dataset.dsfrErrorListeners) {
            return;
        }
        question.dataset.dsfrErrorListeners = 'true';

        // Fonction pour valider et mettre à jour l'état du champ
        function validateAndUpdateState(input) {
            const value = input.value ? input.value.trim() : '';
            const isNumberOnly = input.dataset.number === '1';

            // Vérifier si le champ est vide
            if (value === '') {
                // Champ vide → erreur obligatoire
                inputGroup.classList.add('fr-input-group--error');
                inputGroup.classList.remove('fr-input-group--valid');
                question.classList.add('input-error');
                question.classList.remove('input-valid');

                // Ajouter la classe d'erreur à l'input
                input.classList.add('fr-input--error');
                input.classList.remove('fr-input--valid');

                // Retirer le message de succès s'il existe
                const validMessage = messagesGroup.querySelector('.fr-message--valid');
                if (validMessage) {
                    validMessage.remove();
                }

                // Ajouter le message d'erreur si pas présent
                if (!messagesGroup.querySelector('.fr-message--error')) {
                    const newErrorMessage = document.createElement('p');
                    newErrorMessage.className = 'fr-message fr-message--error';
                    newErrorMessage.id = messagesGroup.id + '-error';
                    newErrorMessage.textContent = 'Ce champ est obligatoire';
                    newErrorMessage.setAttribute('role', 'alert');
                    messagesGroup.appendChild(newErrorMessage);
                }
                return;
            }

            // Vérifier la validation numérique si applicable
            if (isNumberOnly) {
                const isValidNumber = /^-?\d+([.,]\d*)?$/.test(value) || /^-?\d*[.,]\d+$/.test(value);

                if (!isValidNumber) {
                    // Format invalide → erreur de validation
                    inputGroup.classList.add('fr-input-group--error');
                    inputGroup.classList.remove('fr-input-group--valid');
                    question.classList.add('input-error');
                    question.classList.remove('input-valid');

                    // Ajouter la classe d'erreur à l'input
                    input.classList.add('fr-input--error');
                    input.classList.remove('fr-input--valid');

                    // Retirer le message de succès
                    const validMessage = messagesGroup.querySelector('.fr-message--valid');
                    if (validMessage) {
                        validMessage.remove();
                    }

                    // Ajouter/mettre à jour le message d'erreur
                    let errorMsg = messagesGroup.querySelector('.fr-message--error');
                    if (!errorMsg) {
                        errorMsg = document.createElement('p');
                        errorMsg.className = 'fr-message fr-message--error';
                        errorMsg.id = messagesGroup.id + '-error';
                        errorMsg.setAttribute('role', 'alert');
                        messagesGroup.appendChild(errorMsg);
                    }
                    errorMsg.textContent = 'Seuls des nombres peuvent être entrés dans ce champ.';

                    setTimeout(updateErrorSummary, 50);
                    return;
                }
            }

            // Champ valide → succès
            inputGroup.classList.remove('fr-input-group--error');
            question.classList.remove('input-error');

            // Retirer la classe d'erreur de l'input
            input.classList.remove('fr-input--error');

            // Retirer le message d'erreur et marquer qu'une erreur a été corrigée
            const errorMsg = messagesGroup.querySelector('.fr-message--error');
            if (errorMsg) {
                errorMsg.remove();
                // Marquer que cette question a eu une erreur (pour afficher le message de succès)
                question.dataset.hadError = 'true';
            }

            // Ajouter les classes et message de succès UNIQUEMENT si la question a eu une erreur auparavant
            if (question.dataset.hadError === 'true') {
                inputGroup.classList.add('fr-input-group--valid');
                question.classList.add('input-valid');
                input.classList.add('fr-input--valid');

                let validMessage = messagesGroup.querySelector('.fr-message--valid');
                if (!validMessage) {
                    validMessage = document.createElement('p');
                    validMessage.className = 'fr-message fr-message--valid';
                    validMessage.id = messagesGroup.id + '-valid';
                    messagesGroup.appendChild(validMessage);
                }
                validMessage.textContent = 'Merci d\'avoir répondu';
            }

            // Mettre à jour le récapitulatif d'erreurs
            setTimeout(updateErrorSummary, 50);
        }

        // Trouver tous les inputs/textareas/selects dans la question
        const inputs = question.querySelectorAll('.fr-input, input[type="text"], input[type="number"], textarea, select');

        inputs.forEach(function(input) {
            // Valider en temps réel à chaque frappe
            input.addEventListener('input', function() {
                validateAndUpdateState(input);
            });
            input.addEventListener('change', function() {
                validateAndUpdateState(input);
            });
        });

        // Pour les radio/checkbox - convertir en succès immédiatement
        const radiosCheckboxes = question.querySelectorAll('input[type="radio"], input[type="checkbox"]');
        radiosCheckboxes.forEach(function(input) {
            input.addEventListener('change', function() {
                // Pour radio/checkbox, retirer les erreurs
                inputGroup.classList.remove('fr-input-group--error');
                question.classList.remove('input-error');

                // Retirer le message d'erreur et marquer qu'une erreur a été corrigée
                const errorMsg = messagesGroup.querySelector('.fr-message--error');
                if (errorMsg) {
                    errorMsg.remove();
                    // Marquer que cette question a eu une erreur
                    question.dataset.hadError = 'true';
                }

                // Ajouter les classes et message de succès UNIQUEMENT si la question a eu une erreur auparavant
                if (question.dataset.hadError === 'true') {
                    inputGroup.classList.add('fr-input-group--valid');
                    question.classList.add('input-valid');

                    let validMessage = messagesGroup.querySelector('.fr-message--valid');
                    if (!validMessage) {
                        validMessage = document.createElement('p');
                        validMessage.className = 'fr-message fr-message--valid';
                        validMessage.id = messagesGroup.id + '-valid';
                        messagesGroup.appendChild(validMessage);
                    }
                    validMessage.textContent = 'Merci d\'avoir répondu';
                }

                setTimeout(updateErrorSummary, 50);
            }, { once: true });
        });
    }

    /**
     * Observer les changements dans le DOM pour détecter les nouvelles erreurs
     * (validation AJAX, validation dynamique, etc.)
     */
    function observeErrorChanges() {
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                // Si un élément a été modifié et a maintenant la classe input-error
                if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                    const target = mutation.target;
                    if (target.classList.contains('question-container') && target.classList.contains('input-error')) {
                        setTimeout(transformErrorsToDsfr, 100); // Petit délai pour laisser LimeSurvey finir
                    }
                }

                // Si des éléments ont été ajoutés (nouveau contenu AJAX)
                if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                    mutation.addedNodes.forEach(function(node) {
                        if (node.nodeType === 1 && node.classList && node.classList.contains('input-error')) {
                            setTimeout(transformErrorsToDsfr, 100);
                        }
                    });
                }
            });
        });

        // Observer le body pour les changements
        observer.observe(document.body, {
            attributes: true,
            attributeFilter: ['class'],
            childList: true,
            subtree: true
        });

    }

    // === Gestion spécifique des questions à choix multiples (multiple-short-txt) ===

    /**
     * Gère les erreurs pour les questions à choix multiples
     * Chaque ligne (item) doit avoir son propre état d'erreur
     */
    function handleMultipleShortTextErrors() {
        const multipleQuestions = document.querySelectorAll('.question-container.multiple-short-txt');

        multipleQuestions.forEach(function(question) {
            // Cacher les messages d'erreur legacy LimeSurvey pour ce type de question
            const legacyMessages = question.querySelectorAll('.ls-question-mandatory-initial, .ls-question-mandatory-array');
            legacyMessages.forEach(function(msg) {
                msg.style.display = 'none';
            });

            const items = question.querySelectorAll('.answer-item');

            items.forEach(function(item) {
                const input = item.querySelector('input, textarea');
                const inputGroup = item.querySelector('.fr-input-group');
                const messagesGroup = item.querySelector('.fr-messages-group');

                if (!input || !inputGroup || !messagesGroup) return;

                // Vérifier si cet item a la classe d'erreur
                const hasError = item.classList.contains('ls-error-mandatory') || item.classList.contains('has-error');

                if (hasError) {
                    // Ajouter la classe d'erreur DSFR
                    inputGroup.classList.add('fr-input-group--error');

                    // Ajouter le message d'erreur dans fr-messages-group si pas déjà présent
                    if (!messagesGroup.querySelector('.fr-message--error')) {
                        const errorMessage = document.createElement('p');
                        errorMessage.className = 'fr-message fr-message--error';
                        errorMessage.id = messagesGroup.id + '-error';
                        errorMessage.textContent = 'Ce champ est obligatoire';
                        errorMessage.setAttribute('role', 'alert');
                        messagesGroup.appendChild(errorMessage);
                    }
                } else {
                    // Retirer la classe d'erreur DSFR
                    inputGroup.classList.remove('fr-input-group--error');

                    // Retirer le message d'erreur
                    const errorMessage = messagesGroup.querySelector('.fr-message--error');
                    if (errorMessage) {
                        errorMessage.remove();
                    }
                }

                // Écouter les changements sur cet input (une seule fois)
                if (!input.dataset.errorListenerAdded) {
                    input.dataset.errorListenerAdded = 'true';

                    input.addEventListener('input', function() {
                        // Vérifier immédiatement si le champ est rempli
                        const isFilled = input.value && input.value.trim() !== '';

                        // Vérifier la validation numérique si applicable
                        const isNumberOnly = input.dataset.number === '1';
                        const hasInvalidNumber = isNumberOnly && isFilled && !/^-?\d*\.?\d+$/.test(input.value);

                        if (hasInvalidNumber) {
                            // Valeur non numérique → erreur de validation
                            inputGroup.classList.add('fr-input-group--error');
                            inputGroup.classList.remove('fr-input-group--valid');
                            item.classList.add('has-error');
                            input.classList.add('error');

                            // Retirer le message de succès s'il existe
                            const validMessage = messagesGroup.querySelector('.fr-message--valid');
                            if (validMessage) {
                                validMessage.remove();
                            }

                            // Ajouter/mettre à jour le message d'erreur
                            let errorMessage = messagesGroup.querySelector('.fr-message--error');
                            if (!errorMessage) {
                                errorMessage = document.createElement('p');
                                errorMessage.className = 'fr-message fr-message--error';
                                errorMessage.id = messagesGroup.id + '-error';
                                errorMessage.setAttribute('role', 'alert');
                                messagesGroup.appendChild(errorMessage);
                            }
                            errorMessage.textContent = 'Seuls des nombres peuvent être entrés dans ce champ.';
                        } else if (isFilled) {
                            // Champ rempli et valide → retirer les erreurs
                            inputGroup.classList.remove('fr-input-group--error');
                            item.classList.remove('ls-error-mandatory', 'has-error');
                            input.classList.remove('error');

                            // Retirer le message d'erreur et marquer qu'une erreur a été corrigée
                            const errorMessage = messagesGroup.querySelector('.fr-message--error');
                            if (errorMessage) {
                                errorMessage.remove();
                                // Marquer que cette question a eu une erreur
                                item.closest('.question-container').dataset.hadError = 'true';
                            }

                            // Ajouter les classes et message de succès UNIQUEMENT si la question a eu une erreur auparavant
                            const questionContainer = item.closest('.question-container');
                            if (questionContainer && questionContainer.dataset.hadError === 'true') {
                                inputGroup.classList.add('fr-input-group--valid');

                                let validMessage = messagesGroup.querySelector('.fr-message--valid');
                                if (!validMessage) {
                                    validMessage = document.createElement('p');
                                    validMessage.className = 'fr-message fr-message--valid';
                                    validMessage.id = messagesGroup.id + '-valid';
                                    messagesGroup.appendChild(validMessage);
                                }
                                validMessage.textContent = 'Merci d\'avoir répondu';
                            }
                        } else {
                            // Champ vide → erreur obligatoire
                            inputGroup.classList.add('fr-input-group--error');
                            inputGroup.classList.remove('fr-input-group--valid');
                            item.classList.add('ls-error-mandatory', 'has-error');

                            // Retirer le message de succès s'il existe
                            const validMessage = messagesGroup.querySelector('.fr-message--valid');
                            if (validMessage) {
                                validMessage.remove();
                            }

                            // Ajouter le message d'erreur si pas présent
                            if (!messagesGroup.querySelector('.fr-message--error')) {
                                const errorMessage = document.createElement('p');
                                errorMessage.className = 'fr-message fr-message--error';
                                errorMessage.id = messagesGroup.id + '-error';
                                errorMessage.textContent = 'Ce champ est obligatoire';
                                errorMessage.setAttribute('role', 'alert');
                                messagesGroup.appendChild(errorMessage);
                            }
                        }

                        // Vérifier si toute la question est valide
                        setTimeout(function() {
                            const allInputs = question.querySelectorAll('.answer-item input, .answer-item textarea');
                            let hasEmptyField = false;

                            allInputs.forEach(function(inp) {
                                if (!inp.value || inp.value.trim() === '') {
                                    hasEmptyField = true;
                                }
                            });

                            if (!hasEmptyField) {
                                // Tous les champs sont remplis → succès
                                question.classList.remove('input-error', 'fr-input-group--error');
                                question.classList.add('input-valid');

                                // Cacher les messages legacy
                                const legacyMsgs = question.querySelectorAll('.ls-question-mandatory-initial, .ls-question-mandatory-array');
                                legacyMsgs.forEach(function(msg) {
                                    msg.style.display = 'none';
                                });

                                // Mettre à jour le récapitulatif d'erreurs
                                if (typeof updateErrorSummary === 'function') {
                                    setTimeout(updateErrorSummary, 50);
                                }
                            } else {
                                // Il reste des champs vides → garder l'erreur
                                question.classList.add('input-error');
                                question.classList.remove('input-valid', 'fr-input-group--valid');

                                // Mettre à jour le récapitulatif d'erreurs
                                if (typeof updateErrorSummary === 'function') {
                                    setTimeout(updateErrorSummary, 50);
                                }
                            }
                        }, 50);
                    });
                }
            });
        });
    }

    // Initialiser la transformation des erreurs au chargement
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            transformErrorsToDsfr();
            handleMultipleShortTextErrors();
            observeErrorChanges();
            // Créer le récapitulatif si des erreurs sont déjà présentes au chargement
            setTimeout(createErrorSummary, 100);
        });
    } else {
        transformErrorsToDsfr();
        handleMultipleShortTextErrors();
        observeErrorChanges();
        // Créer le récapitulatif si des erreurs sont déjà présentes au chargement
        setTimeout(createErrorSummary, 100);
    }

    // Réinitialiser après événements LimeSurvey
    document.addEventListener('limesurvey:questionsLoaded', function() {
        transformErrorsToDsfr();
        handleMultipleShortTextErrors();
        setTimeout(createErrorSummary, 100);
    });

    // Réinitialiser après soumission de formulaire (en cas de validation côté serveur)
    document.addEventListener('DOMContentLoaded', function() {
        const forms = document.querySelectorAll('form#limesurvey, form[name="limesurvey"]');
        forms.forEach(function(form) {
            form.addEventListener('submit', function() {
                // Attendre que LimeSurvey affiche les erreurs
                setTimeout(function() {
                    transformErrorsToDsfr();
                    createErrorSummary();
                }, 500);
            });
        });
    });

    // === Récapitulatif d'erreurs en haut de page ===

    /**
     * Crée un récapitulatif DSFR des erreurs en haut de page
     * avec liens ancrés vers chaque champ en erreur
     */
    function createErrorSummary() {

        // Supprimer l'ancien récapitulatif s'il existe
        const oldSummary = document.getElementById('dsfr-error-summary');
        if (oldSummary) {
            oldSummary.remove();
        }

        // Trouver toutes les questions en erreur
        const errorQuestions = document.querySelectorAll('.question-container.input-error, .question-container.fr-input-group--error');

        if (errorQuestions.length === 0) {
            return;
        }


        // Construire la liste des erreurs
        const errorList = [];
        errorQuestions.forEach(function(question) {
            const questionId = question.id;

            // Trouver le texte de la question
            const questionTextElement = question.querySelector('.ls-label-question, .question-text');
            let questionText = questionTextElement ? questionTextElement.textContent.trim() : 'Question sans titre';

            // Trouver le numéro de question si disponible
            const questionNumberElement = question.querySelector('.question-number');
            let questionNumber = questionNumberElement ? questionNumberElement.textContent.trim() : '';

            // Trouver le message d'erreur DSFR
            const errorMessageElement = question.querySelector('.fr-message--error');
            let errorMessage = errorMessageElement ? errorMessageElement.textContent.trim() : '';

            // Construire le label avec question + erreur (sans numéro)
            let label = questionText;

            // Ajouter le message d'erreur
            if (errorMessage) {
                label += ' : ' + errorMessage;
            }

            // Limiter la longueur du texte pour le récapitulatif
            if (label.length > 150) {
                label = label.substring(0, 147) + '...';
            }

            errorList.push({
                id: questionId,
                label: label
            });
        });

        // Créer l'alerte DSFR
        const summary = document.createElement('div');
        summary.id = 'dsfr-error-summary';
        summary.className = 'fr-alert fr-alert--error fr-mb-4w';
        summary.setAttribute('role', 'alert');
        summary.setAttribute('tabindex', '-1');

        // Construire le HTML
        let html = '<h3 class="fr-alert__title">';
        html += errorList.length === 1 ? 'Une erreur a été détectée' : errorList.length + ' erreurs ont été détectées';
        html += '</h3>';
        html += '<p>Veuillez corriger les erreurs suivantes :</p>';
        html += '<ul class="fr-mb-0">';

        errorList.forEach(function(error) {
            html += '<li class="error-item" data-question-id="' + error.id + '">';
            html += '<a href="#' + error.id + '" class="fr-link fr-icon-error-warning-line fr-link--icon-left">' + error.label + '</a>';
            html += '</li>';
        });

        html += '</ul>';

        summary.innerHTML = html;

        // Ajouter des listeners sur les liens pour scroller proprement
        summary.querySelectorAll('a[href^="#"]').forEach(function(link) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);

                if (targetElement) {
                    // Scroller vers la question
                    targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });

                    // Focus le premier input de la question
                    setTimeout(function() {
                        const firstInput = targetElement.querySelector('.fr-input, input, textarea, select');
                        if (firstInput) {
                            firstInput.focus();
                        }
                    }, 300);
                }
            });
        });

        // Insérer le récapitulatif en haut de la page de questions
        // Trouver le conteneur approprié
        const questionContainer = document.querySelector('.questions-container, .survey-question-container, #question-container, .question-container');
        const firstQuestion = document.querySelector('.question-container');

        if (questionContainer && questionContainer.parentNode) {
            // Insérer avant le conteneur de questions
            questionContainer.parentNode.insertBefore(summary, questionContainer);
        } else if (firstQuestion && firstQuestion.parentNode) {
            // Insérer avant la première question
            firstQuestion.parentNode.insertBefore(summary, firstQuestion);
        } else {
            // Fallback : insérer au début du formulaire
            const form = document.querySelector('form#limesurvey, form[name="limesurvey"]');
            if (form) {
                form.insertBefore(summary, form.firstChild);
            }
        }

        // Scroller vers le récapitulatif et le focuser pour l'accessibilité
        setTimeout(function() {
            summary.scrollIntoView({ behavior: 'smooth', block: 'start' });
            summary.focus();
        }, 100);
    }

    /**
     * Met à jour le récapitulatif d'erreurs de manière progressive
     * - Marque les erreurs corrigées en vert
     * - Passe de error → warning → success selon l'état
     */
    function updateErrorSummary() {
        const summary = document.getElementById('dsfr-error-summary');
        if (!summary) {
            return; // Pas de récapitulatif à mettre à jour
        }


        // Récupérer toutes les lignes d'erreur dans le récapitulatif
        const errorItems = summary.querySelectorAll('.error-item');

        let totalErrors = errorItems.length;
        let correctedCount = 0;

        // Pour chaque ligne, vérifier si la question est encore en erreur
        errorItems.forEach(function(item) {
            const questionId = item.getAttribute('data-question-id');
            const question = document.getElementById(questionId);

            if (!question) return;

            // Vérifier si la question est encore en erreur
            const isError = question.classList.contains('input-error');
            const isValid = question.classList.contains('input-valid');

            // Vérifier aussi si tous les inputs de la question sont valides
            const inputs = question.querySelectorAll('.fr-input, input[type="text"], input[type="number"], textarea, select');
            let allInputsValid = inputs.length > 0;
            inputs.forEach(function(input) {
                if (input.classList.contains('fr-input--error') || !input.value || input.value.trim() === '') {
                    allInputsValid = false;
                }
            });

            if ((isValid && !isError) || allInputsValid) {
                // Question corrigée → changer l'icône du lien
                if (!item.classList.contains('corrected')) {
                    item.classList.add('corrected');
                    const link = item.querySelector('a');
                    if (link) {
                        // Remplacer l'icône d'erreur par l'icône de validation
                        link.classList.remove('fr-icon-error-warning-line');
                        link.classList.add('fr-icon-checkbox-circle-line');
                    }
                }
                correctedCount++;
            }
        });


        // Mettre à jour le type d'alerte selon l'état
        const title = summary.querySelector('.fr-alert__title');
        const description = summary.querySelector('p');

        if (correctedCount === totalErrors) {
            // Toutes les erreurs corrigées → SUCCESS
            summary.className = 'fr-alert fr-alert--success fr-mb-4w';
            if (title) {
                title.textContent = 'Toutes les erreurs ont été corrigées !';
            }
            if (description) {
                description.textContent = 'Vous pouvez maintenant soumettre le formulaire.';
            }
        } else if (correctedCount > 0) {
            // Au moins une erreur corrigée → WARNING
            summary.className = 'fr-alert fr-alert--warning fr-mb-4w';
            if (title) {
                const remaining = totalErrors - correctedCount;
                title.textContent = remaining + ' erreur' + (remaining > 1 ? 's' : '') + ' restante' + (remaining > 1 ? 's' : '');
            }
            if (description) {
                description.textContent = 'Continuez à corriger les erreurs suivantes :';
            }
        }
        // Sinon on reste en error (pas de changement)
    }

    // Observer les changements du DOM pour recréer le récapitulatif si nécessaire
    // (par exemple après une validation AJAX)
    const errorSummaryObserver = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            // Si une question passe en erreur
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                const target = mutation.target;
                if (target.classList.contains('question-container') && target.classList.contains('input-error')) {
                    setTimeout(createErrorSummary, 100);
                }
            }
        });
    });

    // Démarrer l'observation
    if (document.body) {
        errorSummaryObserver.observe(document.body, {
            attributes: true,
            attributeFilter: ['class'],
            subtree: true
        });
    }

    // === Validation en temps réel pour les champs numériques ===

    /**
     * Affiche un message d'erreur en temps réel si l'utilisateur saisit du texte
     * dans un champ numérique, AVANT que LimeSurvey ne l'efface
     */
    function initNumericValidation() {
        const numericInputs = document.querySelectorAll('input[data-number="1"]');

        numericInputs.forEach(function(input) {
            // Éviter de dupliquer les listeners
            if (input.dataset.numericValidationAttached) {
                return;
            }
            input.dataset.numericValidationAttached = 'true';

            // Validation sur input (en temps réel)
            input.addEventListener('input', function() {
                const value = this.value.trim();
                const question = this.closest('.question-container');
                const inputGroup = this.closest('.fr-input-group');

                if (!question || !inputGroup) return;

                const messagesGroup = inputGroup.querySelector('.fr-messages-group');
                if (!messagesGroup) return;

                // Si vide, retirer tous les messages (la validation obligatoire gérera)
                if (value === '') {
                    // Retirer les messages d'erreur de validation
                    const errorMessage = messagesGroup.querySelector('.fr-message--error');
                    if (errorMessage) {
                        errorMessage.remove();
                    }
                    // Retirer les messages de succès
                    const validMessage = messagesGroup.querySelector('.fr-message--valid');
                    if (validMessage) {
                        validMessage.remove();
                    }
                    // Retirer les classes de validation
                    inputGroup.classList.remove('fr-input-group--error', 'fr-input-group--valid');
                    return;
                }

                // Vérifier si c'est un nombre valide
                // Accepter les nombres avec virgule ou point, mais pas juste un signe ou un séparateur
                const isValidNumber = /^-?\d+([.,]\d*)?$/.test(value) || /^-?\d*[.,]\d+$/.test(value);

                if (!isValidNumber) {
                    // Format invalide → Erreur de validation
                    question.classList.add('input-error');
                    inputGroup.classList.add('fr-input-group--error');
                    inputGroup.classList.remove('fr-input-group--valid');

                    // Ajouter la classe d'erreur à l'input
                    this.classList.add('fr-input--error');
                    this.classList.remove('fr-input--valid');

                    // Retirer le message de succès s'il existe
                    const validMessage = messagesGroup.querySelector('.fr-message--valid');
                    if (validMessage) {
                        validMessage.remove();
                    }

                    // Ajouter/mettre à jour le message d'erreur
                    let errorMessage = messagesGroup.querySelector('.fr-message--error');
                    if (!errorMessage) {
                        errorMessage = document.createElement('p');
                        errorMessage.className = 'fr-message fr-message--error';
                        errorMessage.id = messagesGroup.id + '-error';
                        errorMessage.setAttribute('role', 'alert');
                        messagesGroup.appendChild(errorMessage);
                    }
                    errorMessage.textContent = 'Seuls des nombres peuvent être entrés dans ce champ.';

                } else {
                    // Format valide et non vide → Retirer les erreurs
                    question.classList.remove('input-error');
                    inputGroup.classList.remove('fr-input-group--error');
                    this.classList.remove('fr-input--error');

                    // Retirer le message d'erreur s'il existe et marquer qu'une erreur a été corrigée
                    const errorMessage = messagesGroup.querySelector('.fr-message--error');
                    if (errorMessage) {
                        errorMessage.remove();
                        // Marquer que cette question a eu une erreur
                        question.dataset.hadError = 'true';
                    }

                    // Ajouter les classes et message de succès UNIQUEMENT si la question a eu une erreur auparavant
                    if (question.dataset.hadError === 'true') {
                        question.classList.add('input-valid');
                        inputGroup.classList.add('fr-input-group--valid');
                        this.classList.add('fr-input--valid');

                        let validMessage = messagesGroup.querySelector('.fr-message--valid');
                        if (!validMessage) {
                            validMessage = document.createElement('p');
                            validMessage.className = 'fr-message fr-message--valid';
                            validMessage.id = messagesGroup.id + '-valid';
                            messagesGroup.appendChild(validMessage);
                        }
                        validMessage.textContent = 'Merci d\'avoir répondu';
                    }

                    // Mettre à jour le récapitulatif d'erreurs
                    setTimeout(updateErrorSummary, 50);
                }
            });
        });

    }

    // Initialiser la validation numérique
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initNumericValidation);
    } else {
        initNumericValidation();
    }

    // Réinitialiser après chargement AJAX
    document.addEventListener('limesurvey:questionsLoaded', initNumericValidation);

    // === Validation pour les tableaux (array questions) ===

    /**
     * Gère la validation des questions de type tableau (array)
     * - Transforme le message d'erreur en format DSFR
     * - Ajoute une bordure verte aux champs remplis
     * - Retire le message quand tous les champs sont remplis
     * - Change le liseret du conteneur de rouge à vert
     */
    function handleArrayValidation() {
        // Trouver toutes les questions de type array avec erreur
        const arrayQuestions = document.querySelectorAll('.question-container.input-error[class*="array-"]');

        arrayQuestions.forEach(function(question) {
            // Éviter de dupliquer les listeners
            if (question.dataset.arrayValidationAttached) {
                return;
            }
            question.dataset.arrayValidationAttached = 'true';

            // 1. Transformer le message d'erreur en format DSFR
            // Gérer tous les types de messages d'erreur de tableau
            const arrayErrorMessage = question.querySelector('.ls-question-mandatory-array, .ls-question-mandatory-arraycolumn');
            if (arrayErrorMessage && !arrayErrorMessage.classList.contains('fr-message')) {
                // Créer le message DSFR
                const dsfrMessage = document.createElement('p');
                dsfrMessage.className = 'fr-message fr-message--error';
                dsfrMessage.textContent = arrayErrorMessage.textContent.trim().replace(/\s+/g, ' ');
                dsfrMessage.id = arrayErrorMessage.id ? arrayErrorMessage.id + '-dsfr' : '';
                dsfrMessage.setAttribute('role', 'alert');

                // Masquer le message original au lieu de le remplacer
                arrayErrorMessage.style.display = 'none';

                // Insérer le message DSFR après le message original
                arrayErrorMessage.parentNode.insertBefore(dsfrMessage, arrayErrorMessage.nextSibling);
            }

            // Masquer également le message initial s'il existe
            const initialMessage = question.querySelector('.ls-question-mandatory-initial');
            if (initialMessage) {
                initialMessage.style.display = 'none';
            }

            // Masquer aussi le message arraycolumn s'il n'a pas déjà été traité
            const arrayColumnMessage = question.querySelector('.ls-question-mandatory-arraycolumn');
            if (arrayColumnMessage && arrayColumnMessage.style.display !== 'none') {
                arrayColumnMessage.style.display = 'none';
            }

            // 2. Trouver tous les inputs dans le tableau
            const allInputs = question.querySelectorAll('table input[type="text"], table textarea, table select');

            // 2b. S'assurer que les champs vides ont bien la classe fr-input--error au départ
            allInputs.forEach(function(input) {
                if (!input.value || input.value.trim() === '') {
                    input.classList.add('fr-input--error');
                    input.classList.remove('fr-input--valid');
                }
            });

            allInputs.forEach(function(input) {
                // Éviter de dupliquer les listeners
                if (input.dataset.arrayInputListener) {
                    return;
                }
                input.dataset.arrayInputListener = 'true';

                input.addEventListener('input', function() {
                    const value = input.value.trim();
                    const isNumberOnly = input.dataset.number === '1';

                    // Vérifier la validité du champ
                    let isValid = false;
                    if (value !== '') {
                        if (isNumberOnly) {
                            // Validation numérique
                            isValid = /^-?\d+([.,]\d*)?$/.test(value) || /^-?\d*[.,]\d+$/.test(value);
                        } else {
                            // Champ texte simple - valide si non vide
                            isValid = true;
                        }
                    }

                    // Mettre à jour l'état visuel du champ
                    if (isValid) {
                        // Champ valide → bordure verte
                        input.classList.remove('fr-input--error');
                        input.classList.add('fr-input--valid');
                    } else {
                        // Champ invalide ou vide → bordure rouge
                        input.classList.remove('fr-input--valid');
                        input.classList.add('fr-input--error');
                    }

                    // 3. Vérifier si tous les champs du tableau sont remplis
                    setTimeout(function() {
                        let allFilled = true;
                        let allValid = true;

                        allInputs.forEach(function(inp) {
                            const val = inp.value.trim();
                            if (val === '') {
                                allFilled = false;
                                allValid = false;
                            } else {
                                const isNum = inp.dataset.number === '1';
                                if (isNum) {
                                    const validNum = /^-?\d+([.,]\d*)?$/.test(val) || /^-?\d*[.,]\d+$/.test(val);
                                    if (!validNum) {
                                        allValid = false;
                                    }
                                }
                            }
                        });

                        // 4. Mettre à jour l'état global de la question
                        const dsfrErrorMsg = question.querySelector('.fr-message--error');

                        if (allFilled && allValid) {
                            // Tous les champs sont remplis et valides → succès
                            question.classList.remove('input-error', 'fr-input-group--error');
                            question.classList.add('input-valid');

                            // Retirer le message d'erreur
                            if (dsfrErrorMsg) {
                                dsfrErrorMsg.remove();
                            }

                            // Mettre à jour le récapitulatif d'erreurs
                            if (typeof updateErrorSummary === 'function') {
                                setTimeout(updateErrorSummary, 50);
                            }
                        } else {
                            // Il reste des champs vides ou invalides → garder l'erreur
                            question.classList.add('input-error');
                            question.classList.remove('input-valid');

                            // S'assurer que le message d'erreur est présent
                            if (!dsfrErrorMsg) {
                                const validContainer = question.querySelector('.question-valid-container');
                                if (validContainer) {
                                    const newErrorMsg = document.createElement('p');
                                    newErrorMsg.className = 'fr-message fr-message--error';
                                    newErrorMsg.textContent = 'Veuillez compléter toutes les parties.';
                                    newErrorMsg.setAttribute('role', 'alert');
                                    validContainer.appendChild(newErrorMsg);
                                }
                            }
                        }
                    }, 50);
                });
            });
        });
    }

    // Initialiser la validation des tableaux
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', handleArrayValidation);
    } else {
        handleArrayValidation();
    }

    // Réinitialiser après chargement AJAX
    document.addEventListener('limesurvey:questionsLoaded', handleArrayValidation);

    // === Validation DSFR pour les questions "Multiples entrées numériques" ===

    /**
     * Gère la validation DSFR pour les questions de type "Multiples entrées numériques"
     * - Transforme le message d'erreur global
     * - Ajoute fr-input-group et fr-messages-group pour chaque input
     * - Gère la validation en temps réel
     */
    function handleNumericMultiValidation() {
        const numericMultiQuestions = document.querySelectorAll('.question-container.numeric-multi');

        numericMultiQuestions.forEach(function(question) {
            // Vérifier si déjà initialisé
            if (question.dataset.dsfrNumericMultiInit) {
                return;
            }
            question.dataset.dsfrNumericMultiInit = 'true';

            // Masquer les messages d'erreur LimeSurvey
            const initialErrorMessage = question.querySelector('.ls-question-mandatory-initial');
            if (initialErrorMessage) {
                initialErrorMessage.style.display = 'none';
            }

            // Transformer le message d'erreur global en DSFR
            const arrayErrorMessage = question.querySelector('.ls-question-mandatory-array');
            if (arrayErrorMessage && !arrayErrorMessage.classList.contains('fr-message')) {
                const dsfrMessage = document.createElement('p');
                dsfrMessage.className = 'fr-message fr-message--error';
                dsfrMessage.textContent = arrayErrorMessage.textContent.trim().replace(/\s+/g, ' ');
                dsfrMessage.setAttribute('role', 'alert');
                arrayErrorMessage.style.display = 'none';
                arrayErrorMessage.parentNode.insertBefore(dsfrMessage, arrayErrorMessage.nextSibling);
            }

            // Pour chaque input numérique
            const numericInputs = question.querySelectorAll('input.numeric[data-number="1"]');

            numericInputs.forEach(function(input) {
                const listItem = input.closest('li.question-item');
                if (!listItem) return;

                // Vérifier si le fr-input-group existe déjà
                let inputGroup = input.closest('.fr-input-group');
                if (!inputGroup) {
                    // Créer le fr-input-group
                    inputGroup = document.createElement('div');
                    inputGroup.className = 'fr-input-group';

                    // Wrapper l'input dans le fr-input-group
                    const parent = input.parentNode;
                    parent.insertBefore(inputGroup, input);
                    inputGroup.appendChild(input);

                    // Créer le fr-messages-group
                    const messagesGroup = document.createElement('div');
                    messagesGroup.className = 'fr-messages-group';
                    messagesGroup.id = input.id + '-messages';
                    messagesGroup.setAttribute('aria-live', 'polite');
                    inputGroup.appendChild(messagesGroup);

                    // Mettre à jour aria-describedby
                    input.setAttribute('aria-describedby', messagesGroup.id);
                }

                // Si le champ est en erreur, ajouter la classe et le message
                if (listItem.classList.contains('ls-error-mandatory') || listItem.classList.contains('has-error')) {
                    input.classList.add('fr-input--error');
                    if (inputGroup) {
                        inputGroup.classList.add('fr-input-group--error');
                    }

                    // Ajouter un message d'erreur initial si le champ est vide
                    const messagesGroup = inputGroup.querySelector('.fr-messages-group');
                    if (messagesGroup && (!input.value || input.value.trim() === '')) {
                        let errorMsg = messagesGroup.querySelector('.fr-message--error');
                        if (!errorMsg) {
                            errorMsg = document.createElement('p');
                            errorMsg.className = 'fr-message fr-message--error';
                            errorMsg.setAttribute('role', 'alert');
                            messagesGroup.appendChild(errorMsg);
                        }
                        errorMsg.textContent = 'Ce champ est obligatoire';
                    }

                    // Masquer le message LimeSurvey .ls-em-error si présent
                    const lsEmError = listItem.querySelector('.ls-em-error');
                    if (lsEmError) {
                        lsEmError.style.display = 'none';
                    }
                }

                // Éviter de dupliquer les listeners
                if (input.dataset.numericMultiListenerAttached) {
                    return;
                }
                input.dataset.numericMultiListenerAttached = 'true';

                // Validation en temps réel
                input.addEventListener('input', function() {
                    const value = this.value.trim();
                    const messagesGroup = inputGroup.querySelector('.fr-messages-group');

                    // Masquer le message LimeSurvey .ls-em-error pendant la saisie
                    const lsEmError = listItem.querySelector('.ls-em-error');
                    if (lsEmError) {
                        lsEmError.style.display = 'none';
                    }

                    // Si vide, retirer les messages mais garder l'état d'erreur
                    if (value === '') {
                        this.classList.add('fr-input--error');
                        this.classList.remove('fr-input--valid');
                        inputGroup.classList.add('fr-input-group--error');
                        inputGroup.classList.remove('fr-input-group--valid');

                        // Retirer les messages
                        const errorMsg = messagesGroup.querySelector('.fr-message--error');
                        if (errorMsg) errorMsg.remove();
                        const validMsg = messagesGroup.querySelector('.fr-message--valid');
                        if (validMsg) validMsg.remove();
                        return;
                    }

                    // Vérifier si c'est un nombre valide
                    const isValidNumber = /^-?\d+([.,]\d*)?$/.test(value) || /^-?\d*[.,]\d+$/.test(value);

                    if (!isValidNumber) {
                        // Format invalide → erreur
                        this.classList.add('fr-input--error');
                        this.classList.remove('fr-input--valid');
                        inputGroup.classList.add('fr-input-group--error');
                        inputGroup.classList.remove('fr-input-group--valid');

                        // Retirer le message de succès
                        const validMsg = messagesGroup.querySelector('.fr-message--valid');
                        if (validMsg) validMsg.remove();

                        // Ajouter le message d'erreur
                        let errorMsg = messagesGroup.querySelector('.fr-message--error');
                        if (!errorMsg) {
                            errorMsg = document.createElement('p');
                            errorMsg.className = 'fr-message fr-message--error';
                            errorMsg.setAttribute('role', 'alert');
                            messagesGroup.appendChild(errorMsg);
                        }
                        errorMsg.textContent = 'Seuls des nombres peuvent être entrés dans ce champ.';

                        // Marquer que cette question a eu une erreur
                        question.dataset.hadError = 'true';
                    } else {
                        // Format valide → succès
                        this.classList.remove('fr-input--error');
                        inputGroup.classList.remove('fr-input-group--error');

                        // Retirer le message d'erreur
                        const errorMsg = messagesGroup.querySelector('.fr-message--error');
                        if (errorMsg) {
                            errorMsg.remove();
                            // Marquer que cette question a eu une erreur
                            question.dataset.hadError = 'true';
                        }

                        // Ajouter le message de succès UNIQUEMENT si la question a eu une erreur auparavant
                        if (question.dataset.hadError === 'true') {
                            this.classList.add('fr-input--valid');
                            inputGroup.classList.add('fr-input-group--valid');

                            let validMsg = messagesGroup.querySelector('.fr-message--valid');
                            if (!validMsg) {
                                validMsg = document.createElement('p');
                                validMsg.className = 'fr-message fr-message--valid';
                                messagesGroup.appendChild(validMsg);
                            }
                            validMsg.textContent = 'Merci d\'avoir répondu';
                        }
                    }

                    // Vérifier si tous les champs de la question sont valides
                    setTimeout(function() {
                        const allInputs = question.querySelectorAll('input.numeric[data-number="1"]');
                        let allValid = true;

                        allInputs.forEach(function(inp) {
                            const val = inp.value ? inp.value.trim() : '';
                            const isValid = val !== '' && (/^-?\d+([.,]\d*)?$/.test(val) || /^-?\d*[.,]\d+$/.test(val));
                            if (!isValid) {
                                allValid = false;
                            }
                        });

                        const dsfrErrorMsg = question.querySelector('.fr-message--error');

                        if (allValid) {
                            // Tous les champs sont valides → succès
                            question.classList.remove('input-error', 'fr-input-group--error');
                            question.classList.add('input-valid');

                            // Retirer fr-input-group--error de TOUS les inputs maintenant valides
                            allInputs.forEach(function(inp) {
                                const val = inp.value ? inp.value.trim() : '';
                                const isValid = val !== '' && (/^-?\d+([.,]\d*)?$/.test(val) || /^-?\d*[.,]\d+$/.test(val));
                                if (isValid) {
                                    const grp = inp.closest('.fr-input-group');
                                    if (grp) {
                                        grp.classList.remove('fr-input-group--error');
                                        inp.classList.remove('fr-input--error');
                                    }
                                }
                            });

                            // Retirer le message d'erreur global
                            if (dsfrErrorMsg) {
                                dsfrErrorMsg.remove();
                            }

                            // Mettre à jour le récapitulatif
                            if (typeof updateErrorSummary === 'function') {
                                setTimeout(updateErrorSummary, 50);
                            }
                        } else {
                            // Il reste des champs invalides → erreur
                            question.classList.add('input-error');
                            question.classList.remove('input-valid');

                            // S'assurer que le message d'erreur global est présent
                            if (!dsfrErrorMsg) {
                                const validContainer = question.querySelector('.question-valid-container');
                                if (validContainer) {
                                    const newErrorMsg = document.createElement('p');
                                    newErrorMsg.className = 'fr-message fr-message--error';
                                    newErrorMsg.textContent = 'Veuillez compléter toutes les parties.';
                                    newErrorMsg.setAttribute('role', 'alert');
                                    validContainer.appendChild(newErrorMsg);
                                }
                            }
                        }
                    }, 50);
                });
            });
        });
    }

    // Initialiser la validation des multiples entrées numériques
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', handleNumericMultiValidation);
    } else {
        handleNumericMultiValidation();
    }

    // Réinitialiser après chargement AJAX
    document.addEventListener('limesurvey:questionsLoaded', handleNumericMultiValidation);

    // === Validation DSFR pour les questions simples (radio, select, date) ===

    /**
     * Gère la validation pour les questions simples : oui/non, genre, liste, date, etc.
     * Ces questions passent en succès dès qu'une valeur est sélectionnée
     */
    function handleSimpleQuestionValidation() {
        // Trouver toutes les questions en erreur qui ne sont pas des types complexes déjà gérés
        const simpleQuestions = document.querySelectorAll('.question-container.input-error');

        simpleQuestions.forEach(function(question) {
            // Ignorer les questions déjà gérées par d'autres fonctions
            if (question.classList.contains('numeric-multi') ||
                question.classList.contains('multiple-short-txt') ||
                question.dataset.simpleValidationAttached ||
                question.classList.toString().match(/array-/)) {
                return;
            }
            question.dataset.simpleValidationAttached = 'true';

            // Masquer tous les messages d'erreur LimeSurvey
            const allLsMessages = question.querySelectorAll('.ls-question-mandatory, .ls-question-mandatory-initial, .ls-question-mandatory-other');
            allLsMessages.forEach(function(msg) {
                msg.style.display = 'none';
            });

            // Chercher tous les contrôles de saisie
            const radios = question.querySelectorAll('input[type="radio"]');
            const checkboxes = question.querySelectorAll('input[type="checkbox"]');
            const selects = question.querySelectorAll('select');
            const dateInputs = question.querySelectorAll('input[type="date"], input[type="text"].date');

            // Fonction pour marquer la question comme valide
            function markQuestionValid() {
                question.classList.remove('input-error', 'fr-input-group--error');
                question.classList.add('input-valid');

                // Masquer tous les messages d'erreur LimeSurvey
                const allErrors = question.querySelectorAll('.ls-question-mandatory, .ls-question-mandatory-initial, .ls-question-mandatory-other');
                allErrors.forEach(function(error) {
                    error.style.display = 'none';
                });

                // Retirer le message d'erreur DSFR s'il existe
                const dsfrError = question.querySelector('.fr-message--error');
                if (dsfrError) {
                    dsfrError.remove();
                }

                // Mettre à jour le récapitulatif
                if (typeof updateErrorSummary === 'function') {
                    setTimeout(updateErrorSummary, 50);
                }
            }

            // Attacher les listeners aux radios
            radios.forEach(function(radio) {
                radio.addEventListener('change', function() {
                    if (this.checked) {
                        markQuestionValid();
                    }
                });
            });

            // Attacher les listeners aux checkboxes
            checkboxes.forEach(function(checkbox) {
                checkbox.addEventListener('change', function() {
                    // Pour les checkboxes, vérifier qu'au moins une est cochée
                    const anyChecked = Array.from(checkboxes).some(cb => cb.checked);
                    if (anyChecked) {
                        markQuestionValid();
                    }
                });
            });

            // Attacher les listeners aux selects
            selects.forEach(function(select) {
                select.addEventListener('change', function() {
                    if (this.value && this.value !== '' && this.value !== '-oth-') {
                        markQuestionValid();
                    }
                });
            });

            // Attacher les listeners aux dates
            dateInputs.forEach(function(dateInput) {
                dateInput.addEventListener('change', function() {
                    if (this.value && this.value.trim() !== '') {
                        markQuestionValid();
                    }
                });
            });
        });
    }

    // Initialiser la validation des questions simples
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', handleSimpleQuestionValidation);
    } else {
        handleSimpleQuestionValidation();
    }

    // Réinitialiser après chargement AJAX
    document.addEventListener('limesurvey:questionsLoaded', handleSimpleQuestionValidation);

    // === Transformation des messages de validation LimeSurvey en messages DSFR ===

    /**
     * Transforme les messages de validation générés par LimeSurvey en messages DSFR
     * Applique les classes fr-message fr-message--info aux messages de validation
     */
    function transformValidationMessages() {
        // Sélectionner tous les messages de validation LimeSurvey
        const emMessages = document.querySelectorAll('.ls-question-message');
        console.log('DSFR: Transformation des messages de validation, trouvés:', emMessages.length);

        emMessages.forEach(message => {
            console.log('DSFR: Traitement du message:', message.className, message.textContent.trim());
            // Vérifier si le message n'a pas déjà été transformé
            if (message.classList.contains('fr-message')) {
                return;
            }

            // Déterminer le type de message
            let messageType = 'info'; // Par défaut

            if (message.classList.contains('ls-em-error')) {
                messageType = 'error';
            } else if (message.classList.contains('ls-em-warning')) {
                messageType = 'warning';
            } else if (message.classList.contains('ls-em-success') || message.classList.contains('ls-em-tip')) {
                messageType = 'info'; // Les messages de succès et tips deviennent des infos
            }

            // Créer un nouveau paragraphe avec les classes DSFR
            const dsfrMessage = document.createElement('p');
            dsfrMessage.className = `fr-message fr-message--${messageType}`;
            dsfrMessage.textContent = message.textContent.trim();
            dsfrMessage.id = message.id ? `${message.id}-dsfr` : '';

            // Remplacer le message original
            message.replaceWith(dsfrMessage);
        });
    }

    // Initialiser la transformation des messages
    console.log('DSFR: Configuration des listeners pour transformation messages, readyState:', document.readyState);

    if (document.readyState === 'loading') {
        console.log('DSFR: Ajout listener DOMContentLoaded');
        document.addEventListener('DOMContentLoaded', function() {
            console.log('DSFR: DOMContentLoaded déclenché');
            transformValidationMessages();
        });
    } else {
        console.log('DSFR: DOM déjà chargé, exécution immédiate');
        transformValidationMessages();
    }

    // Aussi essayer avec un petit délai pour être sûr
    setTimeout(function() {
        console.log('DSFR: Timeout exécuté, nouvelle tentative de transformation');
        transformValidationMessages();
    }, 100);

    // Réinitialiser après chargement AJAX
    document.addEventListener('limesurvey:questionsLoaded', function() {
        console.log('DSFR: Event limesurvey:questionsLoaded déclenché');
        transformValidationMessages();
    });

    // === Fix pour les tableaux dropdown-array avec styles inline ===

    /**
     * Supprime les styles inline qui empêchent la linéarisation des tableaux sur mobile
     */
    function fixDropdownArrayInlineStyles() {
        // Seulement sur mobile (< 768px)
        if (window.innerWidth >= 768) {
            console.log('DSFR: Correction styles ignorée (largeur écran >= 768px)');
            return;
        }

        console.log('DSFR: Correction des styles inline sur tableaux dropdown-array');

        // Cibler les tableaux dropdown-array
        const dropdownArrays = document.querySelectorAll('table.dropdown-array');
        console.log('DSFR: Tableaux dropdown-array trouvés:', dropdownArrays.length);

        let totalCells = 0;
        dropdownArrays.forEach((table, index) => {
            // Trouver tous les td avec style inline
            const cells = table.querySelectorAll('tbody tr td[style*="display"]');
            console.log(`DSFR: Tableau ${index + 1}: ${cells.length} cellules avec style inline trouvées`);
            totalCells += cells.length;

            cells.forEach(cell => {
                // Supprimer complètement l'attribut style
                cell.removeAttribute('style');
            });
        });

        console.log(`DSFR: ${totalCells} cellules au total, styles supprimés`);
    }

    // MutationObserver pour surveiller et supprimer les styles réappliqués
    let styleObserver = null;
    let resizeTimer;

    function setupStyleObserver() {
        // Ne surveiller que sur mobile
        if (window.innerWidth >= 768) {
            if (styleObserver) {
                console.log('DSFR: Observer désactivé (desktop)');
                styleObserver.disconnect();
                styleObserver = null;
            }
            return;
        }

        // Si déjà actif, ne rien faire
        if (styleObserver) {
            return;
        }

        console.log('DSFR: Activation de l\'observer pour surveiller les styles inline');

        // Créer l'observer
        styleObserver = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
                    const target = mutation.target;
                    if (target.tagName === 'TD' && target.closest('table.dropdown-array')) {
                        console.log('DSFR: Style réappliqué détecté, suppression immédiate');
                        target.removeAttribute('style');
                    }
                }
            });
        });

        // Observer tous les tableaux dropdown-array
        const dropdownArrays = document.querySelectorAll('table.dropdown-array');
        dropdownArrays.forEach(function(table) {
            styleObserver.observe(table, {
                attributes: true,
                attributeFilter: ['style'],
                subtree: true
            });
        });

        console.log(`DSFR: Observer activé sur ${dropdownArrays.length} tableau(x) dropdown-array`);
    }

    // Activer l'observer après le nettoyage initial
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            fixDropdownArrayInlineStyles();
            setupStyleObserver();
        });
    } else {
        fixDropdownArrayInlineStyles();
        setupStyleObserver();
    }

    // Réactiver l'observer après redimensionnement
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            fixDropdownArrayInlineStyles();
            setupStyleObserver();
        }, 250);
    });

    // Réactiver l'observer après chargement AJAX
    document.addEventListener('limesurvey:questionsLoaded', function() {
        fixDropdownArrayInlineStyles();
        setupStyleObserver();
    });

})();
