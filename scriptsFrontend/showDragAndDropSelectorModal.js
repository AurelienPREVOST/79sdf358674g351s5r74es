import { generateMappingForm } from "./generateMappingForm.js";


export function showDragAndDropSelectorModal(headers) {
    const listPreconfig = document.getElementById('listConfigFile');  // A SUPPRIMER APRES DEMO
    const selectedConfig = listPreconfig.value;  // A SUPPRIMER APRES DEMO 
    const configFile = configMapping[selectedConfig]
    if (configFile) {
        generateMappingForm(headers);
        return
    }
    // Créer le HTML de la modale
    const modale = `
        <div class="modal-overlay">
            <div class="headersSelectorContainer">
                <div class="column" id="available-headers">
                    <!-- headers disponibles -->
                </div>
                <div class="buttons">
                    <div class="movingHeaders">
                        <button id="add-btn" class="btn btn-dark">Ajouter</button>
                        <button id="remove-btn" class="btn btn-dark">Retirer</button>
                        <button id="add-all-btn" class="btn btn-secondary">Ajouter Tout</button>
                        <button id="remove-all-btn" class="btn btn-secondary">Retirer Tout</button>
                    </div>
                    <div class="validateContainer w-100">
                        <button id="validate-btn" class="btn btn-primary m-0">Valider</button>
                    </div>
                </div>
                <div class="column" id="selected-headers">
                    <!-- headers sélectionnés -->
                </div>
            </div>
        </div>`;

    // Ajouter la modale au body sans réinitialiser les inputs et les événements
    document.body.insertAdjacentHTML('beforeend', modale);

    // Récupérer les éléments DOM après leur ajout
    const availableHeadersDiv = document.getElementById('available-headers');
    const selectedHeadersDiv = document.getElementById('selected-headers');

    const addBtn = document.getElementById('add-btn');
    const removeBtn = document.getElementById('remove-btn');
    const addAllBtn = document.getElementById('add-all-btn');
    const removeAllBtn = document.getElementById('remove-all-btn');
    const validateBtn = document.getElementById('validate-btn');

    // Fonction pour générer la liste de headers dans une colonne donnée
    function populateHeaders(headers, headersSelectorContainer) {
        headersSelectorContainer.innerHTML = ''; // Vider le contenu actuel
        headers.forEach(header => {
            const span = document.createElement('span');
            span.textContent = header;
            span.onclick = () => span.classList.toggle('selected');
            headersSelectorContainer.appendChild(span);
        });
    }

    // Séparer les headers en "disponibles" et "sélectionnés"
    let availableHeaders = [...headers];
    let selectedHeaders = [];

    // Afficher les headers disponibles et sélectionnés au début
    populateHeaders(availableHeaders, availableHeadersDiv);
    populateHeaders(selectedHeaders, selectedHeadersDiv);

    // Gestionnaire d'événements pour Ajouter
    const addHeaders = () => {
        const selectedElements = availableHeadersDiv.querySelectorAll('.selected');
        selectedElements.forEach(elem => {
            const header = elem.textContent;
            selectedHeaders.push(header);
            availableHeaders = availableHeaders.filter(h => h !== header);
        });
        populateHeaders(availableHeaders, availableHeadersDiv);
        populateHeaders(selectedHeaders, selectedHeadersDiv);
    };

    // Gestionnaire d'événements pour Ajouter Tout
    const addAllHeaders = () => {
        selectedHeaders = selectedHeaders.concat(availableHeaders);
        availableHeaders = [];
        populateHeaders(availableHeaders, availableHeadersDiv);
        populateHeaders(selectedHeaders, selectedHeadersDiv);
    };

    // Gestionnaire d'événements pour Retirer
    const removeHeaders = () => {
        const selectedElements = selectedHeadersDiv.querySelectorAll('.selected');
        selectedElements.forEach(elem => {
            const header = elem.textContent;
            availableHeaders.push(header);
            selectedHeaders = selectedHeaders.filter(h => h !== header);
        });
        populateHeaders(availableHeaders, availableHeadersDiv);
        populateHeaders(selectedHeaders, selectedHeadersDiv);
    };

    // Gestionnaire d'événements pour Retirer Tout
    const removeAllHeaders = () => {
        availableHeaders = availableHeaders.concat(selectedHeaders);
        selectedHeaders = [];
        populateHeaders(availableHeaders, availableHeadersDiv);
        populateHeaders(selectedHeaders, selectedHeadersDiv);
    };

    // Gestionnaire d'événements pour Valider
    const validateSelection = () => {
        generateMappingForm(selectedHeaders);
        // Appeler la fonction de nettoyage pour retirer les événements et la modale
        removeModal();
    };

    // Ajouter les événements
    addBtn.addEventListener('click', addHeaders);
    addAllBtn.addEventListener('click', addAllHeaders);
    removeBtn.addEventListener('click', removeHeaders);
    removeAllBtn.addEventListener('click', removeAllHeaders);
    validateBtn.addEventListener('click', validateSelection);

    // Fonction pour retirer la modale et les événements associés
    function removeModal() {
        // Retirer les événements
        addBtn.removeEventListener('click', addHeaders);
        addAllBtn.removeEventListener('click', addAllHeaders);
        removeBtn.removeEventListener('click', removeHeaders);
        removeAllBtn.removeEventListener('click', removeAllHeaders);
        validateBtn.removeEventListener('click', validateSelection);

        // Supprimer la modale du DOM
        const modalOverlay = document.querySelector('.modal-overlay');
        if (modalOverlay) {
            modalOverlay.remove();
        }
    }
}