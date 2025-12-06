/**
 * Liaison automatique des questions conditionnelles avec ARIA
 *
 * Ce script améliore l'accessibilité en liant automatiquement les questions
 * conditionnelles à leurs questions parentes via aria-describedby.
 *
 * Critères RGAA concernés : 11.1 (Étiquettes), 11.2 (Regroupements de champs)
 *
 * @author Thème DSFR LimeSurvey
 * @license Etalab 2.0
 */

(function() {
    'use strict';

    /**
     * Extrait les codes de questions (SGQ) depuis une expression ExpressionScript
     * Exemples d'expressions :
     * - "Q1.NAOK == 'Y'"
     * - "Q2_SQ001.NAOK > 5"
     * - "!is_empty(Q3.NAOK)"
     *
     * @param {string} expression - Expression ExpressionScript
     * @returns {Array<string>} - Liste des codes de questions trouvés
     */
    function extractQuestionCodes(expression) {
        if (!expression) return [];

        const questionCodes = [];

        // Pattern pour trouver les codes de questions (format : Q + chiffres + optionnel _SQ + chiffres)
        // Exemples: Q1, Q2_SQ001, Q123, etc.
        const regex = /\b(Q\d+(?:_SQ\d+)?)\./gi;

        let match;
        while ((match = regex.exec(expression)) !== null) {
            const code = match[1];
            if (!questionCodes.includes(code)) {
                questionCodes.push(code);
            }
        }

        return questionCodes;
    }

    /**
     * Trouve l'élément HTML d'une question par son code
     *
     * @param {string} questionCode - Code de la question (ex: Q1, Q2_SQ001)
     * @returns {HTMLElement|null} - Élément question ou null
     */
    function findQuestionByCode(questionCode) {
        // Chercher par attribut data-qcode ou id contenant le code
        let question = document.querySelector(`[data-qcode="${questionCode}"]`);

        if (!question) {
            // Chercher dans les IDs des questions (format: question + code)
            question = document.querySelector(`[id*="${questionCode}"]`);
        }

        return question;
    }

    /**
     * Récupère le texte de la question parente
     *
     * @param {HTMLElement} questionElement - Élément de la question
     * @returns {string} - Texte de la question ou numéro de question
     */
    function getQuestionText(questionElement) {
        // Chercher le titre de la question (h3 avec id ls-question-text-*)
        const questionTitle = questionElement.querySelector('[id^="ls-question-text-"]');

        if (questionTitle) {
            // Nettoyer le texte (enlever les balises HTML, garder seulement le texte)
            const text = questionTitle.textContent.trim();
            // Limiter à 50 caractères pour ne pas surcharger
            return text.length > 50 ? text.substring(0, 50) + '...' : text;
        }

        // Sinon, chercher le numéro de question
        const questionNumber = questionElement.querySelector('.fr-text--xs');
        if (questionNumber) {
            return questionNumber.textContent.trim();
        }

        return 'la question précédente';
    }

    /**
     * Crée un élément de description caché pour lecteurs d'écran
     *
     * @param {string} questionId - ID de la question conditionnelle
     * @param {Array<string>} parentQuestions - Textes des questions parentes
     * @returns {HTMLElement} - Élément div avec la description
     */
    function createConditionalDescription(questionId, parentQuestions) {
        const descId = `conditional-desc-${questionId}`;

        // Vérifier si l'élément existe déjà
        let descElement = document.getElementById(descId);
        if (descElement) {
            return descElement;
        }

        descElement = document.createElement('div');
        descElement.id = descId;
        descElement.className = 'fr-sr-only';
        descElement.setAttribute('role', 'note');

        // Créer le texte de description
        let descText;
        if (parentQuestions.length === 1) {
            descText = `Cette question dépend de votre réponse à ${parentQuestions[0]}.`;
        } else if (parentQuestions.length > 1) {
            const lastQuestion = parentQuestions.pop();
            descText = `Cette question dépend de vos réponses à ${parentQuestions.join(', ')} et ${lastQuestion}.`;
        } else {
            descText = 'Cette question est conditionnelle.';
        }

        descElement.textContent = descText;

        return descElement;
    }

    /**
     * Ajoute aria-describedby à tous les inputs/select/textarea de la question
     *
     * @param {HTMLElement} questionElement - Élément de la question
     * @param {string} descriptionId - ID de l'élément de description
     */
    function addAriaDescribedBy(questionElement, descriptionId) {
        // Trouver tous les champs de formulaire dans la question
        const formFields = questionElement.querySelectorAll('input, select, textarea');

        formFields.forEach(field => {
            const currentDescribedBy = field.getAttribute('aria-describedby') || '';

            // Ajouter l'ID de description seulement s'il n'existe pas déjà
            if (!currentDescribedBy.includes(descriptionId)) {
                const newDescribedBy = currentDescribedBy
                    ? `${currentDescribedBy} ${descriptionId}`.trim()
                    : descriptionId;

                field.setAttribute('aria-describedby', newDescribedBy);
            }
        });
    }

    /**
     * Traite une question conditionnelle pour ajouter les liaisons ARIA
     *
     * @param {HTMLElement} questionElement - Élément de la question
     */
    function processConditionalQuestion(questionElement) {
        // Récupérer l'expression de relevance
        const relevanceExpression = questionElement.getAttribute('data-relevance');
        if (!relevanceExpression) return;

        // Récupérer l'ID de la question (depuis l'attribut id ou générer)
        const questionId = questionElement.id || questionElement.querySelector('[id]')?.id || `q-${Date.now()}`;

        // Extraire les codes des questions parentes
        const parentQuestionCodes = extractQuestionCodes(relevanceExpression);
        if (parentQuestionCodes.length === 0) return;

        // Trouver les textes des questions parentes
        const parentQuestionTexts = [];
        parentQuestionCodes.forEach(code => {
            const parentElement = findQuestionByCode(code);
            if (parentElement) {
                const questionText = getQuestionText(parentElement);
                parentQuestionTexts.push(questionText);
            }
        });

        if (parentQuestionTexts.length === 0) return;

        // Créer l'élément de description
        const descElement = createConditionalDescription(questionId, parentQuestionTexts);

        // Insérer la description au début de la question
        questionElement.insertBefore(descElement, questionElement.firstChild);

        // Ajouter aria-describedby aux champs
        addAriaDescribedBy(questionElement, descElement.id);

        // Log pour debug (peut être retiré en production)
        if (window.console && console.debug) {
            console.debug(
                `[Conditional Question ARIA] Question ${questionId} linked to:`,
                parentQuestionTexts
            );
        }
    }

    /**
     * Initialise le système de liaison des questions conditionnelles
     */
    function initConditionalQuestionsAria() {
        // Trouver toutes les questions avec attribut data-relevance
        const conditionalQuestions = document.querySelectorAll('[data-relevance]');

        if (conditionalQuestions.length === 0) {
            console.debug('[Conditional Question ARIA] No conditional questions found');
            return;
        }

        console.debug(
            `[Conditional Question ARIA] Processing ${conditionalQuestions.length} conditional question(s)`
        );

        // Traiter chaque question conditionnelle
        conditionalQuestions.forEach(questionElement => {
            try {
                processConditionalQuestion(questionElement);
            } catch (error) {
                console.error(
                    '[Conditional Question ARIA] Error processing question:',
                    questionElement,
                    error
                );
            }
        });
    }

    /**
     * Observer pour détecter les nouvelles questions ajoutées dynamiquement
     * (utile si LimeSurvey charge des questions via AJAX)
     */
    function setupMutationObserver() {
        const observer = new MutationObserver(mutations => {
            mutations.forEach(mutation => {
                mutation.addedNodes.forEach(node => {
                    if (node.nodeType === Node.ELEMENT_NODE) {
                        // Si le noeud ajouté est une question conditionnelle
                        if (node.hasAttribute && node.hasAttribute('data-relevance')) {
                            processConditionalQuestion(node);
                        }
                        // Ou si le noeud contient des questions conditionnelles
                        const conditionalQuestions = node.querySelectorAll && node.querySelectorAll('[data-relevance]');
                        if (conditionalQuestions && conditionalQuestions.length > 0) {
                            conditionalQuestions.forEach(processConditionalQuestion);
                        }
                    }
                });
            });
        });

        // Observer les changements dans le conteneur principal du questionnaire
        const surveyContainer = document.getElementById('limesurvey') || document.body;
        observer.observe(surveyContainer, {
            childList: true,
            subtree: true
        });
    }

    // === INITIALISATION ===

    // Attendre que le DOM soit chargé
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            initConditionalQuestionsAria();
            setupMutationObserver();
        });
    } else {
        // DOM déjà chargé
        initConditionalQuestionsAria();
        setupMutationObserver();
    }

    // Exposer les fonctions pour debug/tests si nécessaire
    if (window.console && console.debug) {
        window.ConditionalQuestionsAria = {
            init: initConditionalQuestionsAria,
            processQuestion: processConditionalQuestion,
            extractCodes: extractQuestionCodes
        };
    }

})();
