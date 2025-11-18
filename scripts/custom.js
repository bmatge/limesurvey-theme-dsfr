/**
 * JavaScript personnalisé pour le thème DSFR
 *
 * Utilisez ce fichier pour vos scripts personnalisés
 * sans modifier theme.js
 */

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

            button.addEventListener('click', function(e) {
                e.preventDefault();
                const hiddenItems = itemsList.querySelectorAll('.selector--inputondemand-list-item.d-none');

                if (hiddenItems.length > 0) {
                    const nextItem = hiddenItems[0];
                    nextItem.classList.remove('d-none');

                    const input = nextItem.querySelector('input, textarea');
                    if (input) setTimeout(() => input.focus(), 100);

                    if (hiddenItems.length === 1) button.style.display = 'none';
                }
            });
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

    // Initialiser au chargement
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initCaptchaReload);
    } else {
        initCaptchaReload();
    }

    // Réinitialiser après événements AJAX
    document.addEventListener('limesurvey:questionsLoaded', initCaptchaReload);

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

            // Ajouter le message dans le messages-group
            messagesGroup.appendChild(errorMessage);

            // 5. Cacher le message LimeSurvey original
            const questionValidContainer = question.querySelector('.question-valid-container');
            if (questionValidContainer) {
                questionValidContainer.style.display = 'none';
            }


            // 6. Ajouter les listeners pour retirer l'erreur quand l'utilisateur corrige
            attachErrorRemovalListeners(question, inputGroup, messagesGroup, errorMessage, questionValidContainer);
        });
    }

    /**
     * Attache des event listeners pour retirer l'erreur DSFR quand l'utilisateur interagit
     */
    function attachErrorRemovalListeners(question, inputGroup, messagesGroup, errorMessage, questionValidContainer) {
        // Éviter de dupliquer les listeners
        if (question.dataset.dsfrErrorListeners) {
            return;
        }
        question.dataset.dsfrErrorListeners = 'true';

        // Fonction pour convertir l'erreur en succès (transition douce)
        function convertErrorToSuccess() {
            // Retirer les classes d'erreur
            inputGroup.classList.remove('fr-input-group--error');
            question.classList.remove('input-error');
            question.classList.remove('fr-input-group--error');

            // Ajouter les classes de succès
            inputGroup.classList.add('fr-input-group--valid');
            question.classList.add('input-valid');

            // Transformer le message d'erreur en message de succès
            if (errorMessage && errorMessage.parentNode) {
                errorMessage.className = 'fr-message fr-message--valid';
                errorMessage.textContent = 'Merci d\'avoir répondu';
            }


            // Mettre à jour le récapitulatif d'erreurs (marquer en vert, passer en warning/success)
            setTimeout(updateErrorSummary, 50);
        }

        // Trouver tous les inputs/textareas/selects dans la question
        const inputs = question.querySelectorAll('.fr-input, input[type="text"], input[type="number"], textarea, select');

        inputs.forEach(function(input) {
            // Convertir l'erreur en succès dès que l'utilisateur commence à taper
            input.addEventListener('input', convertErrorToSuccess, { once: true });
            input.addEventListener('change', convertErrorToSuccess, { once: true });
        });

        // Pour les radio/checkbox
        const radiosCheckboxes = question.querySelectorAll('input[type="radio"], input[type="checkbox"]');
        radiosCheckboxes.forEach(function(input) {
            input.addEventListener('change', convertErrorToSuccess, { once: true });
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

    // Initialiser la transformation des erreurs au chargement
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            transformErrorsToDsfr();
            observeErrorChanges();
            // Créer le récapitulatif si des erreurs sont déjà présentes au chargement
            setTimeout(createErrorSummary, 100);
        });
    } else {
        transformErrorsToDsfr();
        observeErrorChanges();
        // Créer le récapitulatif si des erreurs sont déjà présentes au chargement
        setTimeout(createErrorSummary, 100);
    }

    // Réinitialiser après événements LimeSurvey
    document.addEventListener('limesurvey:questionsLoaded', function() {
        transformErrorsToDsfr();
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
            const isError = question.classList.contains('input-error') || question.classList.contains('fr-input-group--error');
            const isValid = question.classList.contains('input-valid') || question.classList.contains('fr-input-group--valid');

            if (isValid && !isError) {
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

                // Si vide, pas de validation ici (géré par mandatory)
                if (value === '') {
                    return;
                }

                // Vérifier si c'est un nombre valide
                // Accepter les nombres avec virgule ou point
                const isValid = /^-?\d*[.,]?\d*$/.test(value) && value !== '-' && value !== '.' && value !== ',';

                if (!isValid) {
                    // Trouver la question parente
                    const question = this.closest('.question-container');
                    if (!question) return;

                    // Ajouter la classe d'erreur
                    question.classList.add('input-error');

                    // Trouver le fr-input-group et fr-messages-group
                    const inputGroup = this.closest('.fr-input-group');
                    if (!inputGroup) return;

                    inputGroup.classList.add('fr-input-group--error');

                    const messagesGroup = inputGroup.querySelector('.fr-messages-group');
                    if (!messagesGroup) return;

                    // Vérifier si le message existe déjà
                    let errorMessage = messagesGroup.querySelector('.fr-message--error');
                    if (!errorMessage) {
                        // Créer le message d'erreur
                        errorMessage = document.createElement('p');
                        errorMessage.className = 'fr-message fr-message--error';
                        errorMessage.id = messagesGroup.id + '-error';
                        errorMessage.textContent = 'Seuls des nombres peuvent être entrés dans ce champ.';
                        messagesGroup.appendChild(errorMessage);

                    }
                } else {
                    // Valeur valide → convertir en succès si une erreur existe
                    const question = this.closest('.question-container');
                    const inputGroup = this.closest('.fr-input-group');

                    if (question && inputGroup) {
                        const messagesGroup = inputGroup.querySelector('.fr-messages-group');
                        const errorMessage = messagesGroup ? messagesGroup.querySelector('.fr-message--error') : null;

                        // Si une erreur existe, la convertir en succès
                        if (errorMessage) {
                            // Retirer les classes d'erreur
                            question.classList.remove('input-error');
                            question.classList.remove('fr-input-group--error');
                            inputGroup.classList.remove('fr-input-group--error');

                            // Ajouter les classes de succès
                            question.classList.add('input-valid');
                            inputGroup.classList.add('fr-input-group--valid');

                            // Transformer le message d'erreur en succès
                            errorMessage.className = 'fr-message fr-message--valid';
                            errorMessage.textContent = 'Merci d\'avoir répondu';


                            // Mettre à jour le récapitulatif d'erreurs
                            setTimeout(updateErrorSummary, 50);
                        }
                    }
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

})();
