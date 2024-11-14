// A appeler lorsque la checkbox d'ajout de règle est cochée
export function casseChangeChecked() {
    const casseChangeContainer = document.querySelector('.casseChangeContainer');

    // Ajouter le bouton "Ajouter règle"
    if (!document.querySelector("#addcasseChangeRuleButton")) {
        const addButton = document.createElement('span');
        addButton.textContent = "Ajouter règle";
        addButton.classList = "btn btn-primary m-2";
        addButton.id = 'addcasseChangeRuleButton';
    
        // Ajouter un listener sur le bouton pour ajouter une règle
        addButton.addEventListener('click', function() {
            addCasseChangeRule();
        });
    
        // casseChangeContainer.appendChild(addButton);
        casseChangeContainer.insertBefore(addButton, casseChangeContainer.firstChild);

    }
}

// A appeler lorsque la checkbox d'ajout de règle est décochée
export function casseChangeUnchecked() {
    const casseChangeContainer = document.querySelector('.casseChangeContainer');

    // Vider la div casseChangeContainer (supprimer toutes les règles et le bouton)
    casseChangeContainer.innerHTML = '';
}


// Fonction générique pour ajouter une règle ou une règle configurée
export function addCasseChangeRule(key = null, value = null) {
    const casseChangeContainer = document.querySelector('.casseChangeContainer');

    // Créer l'élément template pour une règle
    const ruleDiv = document.createElement('div');
    ruleDiv.classList.add('d-flex', 'casseChangeRule', 'm-2');

    // Bouton de suppression de la règle
    const deleteButton = document.createElement('button');
    deleteButton.textContent = "Supprimer";
    deleteButton.classList.add('btn', 'btn-danger', 'm-2');
    deleteButton.addEventListener('click', function () {
        casseChangeContainer.removeChild(ruleDiv);
    });

    // Premier select pour choisir une colonne
    const columnSelect = document.createElement('select');
    columnSelect.classList.add('form-select', 'm-2');
    const headers = document.querySelectorAll(".headerKept"); // Récupérer dynamiquement les options
    headers.forEach(header => {
        const option = document.createElement('option');
        // Utiliser header.value si c'est un input, sinon textContent
        option.value = header.value || header.textContent;
        option.textContent = header.value || header.textContent;

        // Si un key est fourni et correspond à l'option, la sélectionner
        if (key && option.value === key) {
            option.selected = true;
        }

        columnSelect.appendChild(option);
    });

    // Deuxième select pour choisir la transformation de casse
    const caseSelect = document.createElement('select');
    caseSelect.classList.add('form-select', 'm-2');
    const caseOptions = ["MAJUSCULE", "minuscule", "Capitalise"];
    caseOptions.forEach(optionValue => {
        const option = document.createElement('option');
        option.value = optionValue;
        option.textContent = optionValue;

        // Si une value est fournie et correspond à l'option, la sélectionner
        if (value && option.value === value) {
            option.selected = true;
        }

        caseSelect.appendChild(option);
    });

    // Ajouter les éléments au div de règle
    ruleDiv.appendChild(deleteButton);
    ruleDiv.appendChild(columnSelect);
    ruleDiv.appendChild(caseSelect);

    // Ajouter la règle dans le casseChangeContainer
    casseChangeContainer.appendChild(ruleDiv);
}
