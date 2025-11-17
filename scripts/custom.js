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

    // === Accessibilité clavier pour les questions de ranking ===

    /**
     * Ajoute la gestion du clavier aux éléments de ranking
     * Permet d'utiliser Enter ou Espace pour déplacer les éléments (simule double-clic)
     */
    function initRankingKeyboardAccessibility() {
        // Trouver toutes les questions de ranking
        const rankingQuestions = document.querySelectorAll('.ranking-question-dsfr');

        rankingQuestions.forEach(function(container) {
            // Fonction pour gérer le double-clic programmatique
            function simulateDoubleClick(element) {
                // Créer un événement de double-clic
                const dblClickEvent = new MouseEvent('dblclick', {
                    view: window,
                    bubbles: true,
                    cancelable: true
                });
                element.dispatchEvent(dblClickEvent);
            }

            // Fonction pour ajouter les event listeners aux items
            function attachKeyboardHandlers(item) {
                // Éviter de dupliquer les listeners
                if (item.dataset.keyboardHandlerAttached) {
                    return;
                }
                item.dataset.keyboardHandlerAttached = 'true';

                item.addEventListener('keydown', function(e) {
                    // Enter (13) ou Espace (32)
                    if (e.key === 'Enter' || e.key === ' ' || e.keyCode === 13 || e.keyCode === 32) {
                        e.preventDefault();
                        simulateDoubleClick(this);

                        // Donner un feedback visuel
                        this.style.transform = 'scale(0.98)';
                        setTimeout(() => {
                            this.style.transform = '';
                        }, 100);
                    }

                    // Navigation avec flèches haut/bas
                    else if (e.key === 'ArrowDown' || e.keyCode === 40) {
                        e.preventDefault();
                        const nextItem = this.nextElementSibling;
                        if (nextItem && nextItem.classList.contains('sortable-item')) {
                            nextItem.focus();
                        }
                    }
                    else if (e.key === 'ArrowUp' || e.keyCode === 38) {
                        e.preventDefault();
                        const prevItem = this.previousElementSibling;
                        if (prevItem && prevItem.classList.contains('sortable-item')) {
                            prevItem.focus();
                        }
                    }
                });

                // Améliorer le feedback visuel au focus
                item.addEventListener('focus', function() {
                    this.style.outline = '2px solid var(--border-action-high-blue-france)';
                    this.style.outlineOffset = '2px';
                });

                item.addEventListener('blur', function() {
                    this.style.outline = '';
                    this.style.outlineOffset = '';
                });
            }

            // Attacher les handlers aux items existants
            const allItems = container.querySelectorAll('.sortable-item');
            allItems.forEach(attachKeyboardHandlers);

            // Observer les nouveaux items ajoutés dynamiquement (quand déplacés)
            const observer = new MutationObserver(function(mutations) {
                mutations.forEach(function(mutation) {
                    mutation.addedNodes.forEach(function(node) {
                        if (node.nodeType === 1 && node.classList && node.classList.contains('sortable-item')) {
                            // Ajouter tabindex si manquant (items déplacés)
                            if (!node.hasAttribute('tabindex')) {
                                node.setAttribute('tabindex', '0');
                            }
                            // Ajouter role si manquant
                            if (!node.hasAttribute('role')) {
                                node.setAttribute('role', 'button');
                            }
                            // Mettre à jour aria-label basé sur la position
                            updateAriaLabel(node);
                            // Attacher les handlers clavier
                            attachKeyboardHandlers(node);
                        }
                    });
                });
            });

            // Observer les deux listes (choix disponibles et classés)
            const choiceList = container.querySelector('.sortable-choice');
            const rankList = container.querySelector('.sortable-rank');

            if (choiceList) {
                observer.observe(choiceList, { childList: true });
            }
            if (rankList) {
                observer.observe(rankList, { childList: true });
            }

            // Fonction pour mettre à jour l'aria-label selon la position
            function updateAriaLabel(item) {
                const text = item.textContent.trim().replace(/\s+/g, ' ');
                const parentList = item.closest('ul');
                const isInRankList = parentList && parentList.classList.contains('sortable-rank');

                if (isInRankList) {
                    const position = Array.from(parentList.querySelectorAll('.sortable-item')).indexOf(item) + 1;
                    const total = parentList.querySelectorAll('.sortable-item').length;
                    item.setAttribute('aria-label', text + ' - Position ' + position + ' sur ' + total + '. Appuyez sur Entrée ou Espace pour retirer de la liste classée.');
                } else {
                    item.setAttribute('aria-label', text + ' - Appuyez sur Entrée ou Espace pour ajouter à la liste classée, ou utilisez le glisser-déposer.');
                }
            }

            // Observer les changements pour mettre à jour les aria-labels
            if (rankList) {
                const updateObserver = new MutationObserver(function() {
                    rankList.querySelectorAll('.sortable-item').forEach(updateAriaLabel);
                });
                updateObserver.observe(rankList, { childList: true });
            }
        });
    }

    // Initialiser au chargement
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initRankingKeyboardAccessibility);
    } else {
        initRankingKeyboardAccessibility();
    }

    // Réinitialiser après événements AJAX
    document.addEventListener('limesurvey:questionsLoaded', initRankingKeyboardAccessibility);

})();
