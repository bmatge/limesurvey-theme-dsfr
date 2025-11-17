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

})();
