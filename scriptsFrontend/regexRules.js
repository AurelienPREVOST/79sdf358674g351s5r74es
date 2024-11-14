export function insertAddRulesButton() {
    const conf = configMapping[selectedConfig]
    if(!document.querySelector("#validateFields").checked) {
        return
    }
    const regexContainer = document.querySelector('.regexContainer');
    const addButton = document.createElement('span');
    addButton.textContent = "Ajouter règle";
    addButton.classList = "btn btn-primary m-2";
    addButton.id = 'addRuleButton';
    // Ajouter un listener sur le bouton pour ajouter une règle
    addButton.addEventListener('click', function() {
        addRule();
    });
    // regexContainer.appendChild(addButton);
    regexContainer.insertBefore(addButton, regexContainer.firstChild);

}

// A appeler lorsque la checkbox d'ajout de règle est cochée
export function onCheckboxChecked() {if (!document.querySelector("#addRuleButton")) { insertAddRulesButton() }}

// A appeler lorsque la checkbox d'ajout de règle est décochée
export function onCheckboxUnchecked() {document.querySelector('.regexContainer').innerHTML = '';}

// Pour ajouter une règle
export function addRule() {
    const regexContainer = document.querySelector('.regexContainer');

    // Créer l'élément template pour une règle
    const ruleDiv = document.createElement('div');
    ruleDiv.classList.add('d-flex', 'regexRule', 'm-2');

    // Bouton de suppression de la règle
    const deleteButton = document.createElement('button');
    deleteButton.textContent = "Supprimer";
    deleteButton.classList.add('btn','btn-danger', 'm-2')
    deleteButton.addEventListener('click', function() {
        regexContainer.removeChild(ruleDiv);
    });

    // Premier select pour choisir une colonne
    const columnSelect = document.createElement('select');
    columnSelect.classList.add('form-select', 'm-2')
    const headers = document.querySelectorAll(".headerKept"); // Récupérer dynamiquement les options
    headers.forEach(header => {
        const option = document.createElement('option');
        
        // Utiliser header.value si c'est un input, sinon textContent
        option.value = header.value; 
        option.textContent = header.value;

        columnSelect.appendChild(option);
    });

    // Deuxième select pour choisir une règle (téléphone, email, regex)
    const ruleSelect = document.createElement('select');
    ruleSelect.classList.add('form-select','m-1')
    const options = ['telephone', 'email', 'lettres seulement', 'chiffres seulement', 'regex libre'];
    options.forEach(optionText => {
        const option = document.createElement('option');
        option.value = optionText;
        option.textContent = optionText;
        ruleSelect.appendChild(option);
    });

    // Input pour la regex personnalisée
    const regexInput = document.createElement('input');
    regexInput.classList.add('form-control','m-1')
    regexInput.type = 'text';
    regexInput.placeholder = 'Entrez la regex';

    // Ajouter les éléments au div de règle
    ruleDiv.appendChild(deleteButton);
    ruleDiv.appendChild(columnSelect);
    ruleDiv.appendChild(ruleSelect);
    ruleDiv.appendChild(regexInput);

    // Mapping des regex
    const regexMap = {
        'telephone': '^\\+?\\d{1,3}?[-.\\s]?(\\(?\\d{1,4}\\)?[-.\\s]?)?\\d{1,4}[-.\\s]?\\d{1,4}[-.\\s]?\\d{1,9}$',
        'email': '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$',
        'lettres seulement': '^[a-zA-ZÀ-ÿ\\s]+$',
        'chiffres seulement': '^\\d+$'
    };

    // Gestion du changement de règle dans le select
    ruleSelect.addEventListener('change', () => {
        const selectedRule = ruleSelect.value;

        if (selectedRule === 'regex libre') {
            regexInput.disabled = false;  // Laisser l'utilisateur entrer une regex
            regexInput.value = '';        // Effacer la valeur actuelle
        } else {
            regexInput.disabled = true;   // Désactiver l'input si une règle est sélectionnée
            regexInput.value = regexMap[selectedRule] || ''; // Mettre la regex correspondante
        }
    });

    // Initialiser l'état de regexInput en fonction de la valeur initiale du select
    regexInput.disabled = (ruleSelect.value !== 'regex libre');

    // Déclencher l'événement "change" pour initialiser la valeur de regexInput à la création
    ruleSelect.dispatchEvent(new Event('change'));

    // Ajouter la règle dans le regexContainer
    regexContainer.appendChild(ruleDiv);
}


export function addConfigRules(key, value) {
        const regexContainer = document.querySelector(".regexContainer")

        // Créer l'élément template pour une règle
        const ruleDiv = document.createElement('div');
        ruleDiv.classList.add('d-flex', 'regexRule', 'm-2');

        // Bouton de suppression de la règle
        const deleteButton = document.createElement('button');
        deleteButton.textContent = "Supprimer";
        deleteButton.classList.add('btn','btn-danger', 'm-2')
        deleteButton.addEventListener('click', function() {
            regexContainer.removeChild(ruleDiv);
        });

        // Premier select pour choisir une colonne
        const columnSelect = document.createElement('select');
        columnSelect.classList.add('form-select', 'm-2');

        // Obtenir la configuration correspondante
        const configFile = configMapping[selectedConfig];

        // Obtenir toutes les clés de l'objet configFile.csvImported
        if (configFile) {

            const headers = Object.keys(configFile.csvImported); // ['Nom', 'Prenom', 'id']

            // Ajouter chaque clé comme option dans le select
            headers.forEach(header => {
                const option = document.createElement('option');
                option.value = header; // La clé comme valeur
                option.textContent = header; // La clé comme texte
                columnSelect.appendChild(option);
            });

            // Définir la clé comme option sélectionnée (si elle existe dans le tableau headers)
            if (headers.includes(key)) {
                columnSelect.value = key;  // Sélectionner l'option correspondant à "key"
            } else {
                console.warn(`La clé "${key}" n'est pas présente dans configFile.csvImported`);
            }


            // Deuxième select pour choisir une règle (téléphone, email, regex)
            const ruleSelect = document.createElement('select');
            ruleSelect.classList.add('form-select','m-2')
            const options = ['telephone', 'email', 'regex libre'];
            options.forEach(optionText => {
                const option = document.createElement('option');
                option.value = optionText;
                option.textContent = optionText;
                ruleSelect.appendChild(option);
            });

            // Input pour la regex personnalisée
            const regexInput = document.createElement('input');
            regexInput.classList.add('form-control','m-2')
            regexInput.type = 'text';
            regexInput.value = value
            regexInput.placeholder = 'Entrez la regex';

            // Ajouter les éléments au div de règle
            ruleDiv.appendChild(deleteButton);
            ruleDiv.appendChild(columnSelect);
            ruleDiv.appendChild(ruleSelect);
            ruleDiv.appendChild(regexInput);

            // Mapping des regex
            const regexMap = {
                'telephone': '^\\+?\\d{1,3}?[-.\\s]?(\\(?\\d{1,4}\\)?[-.\\s]?)?\\d{1,4}[-.\\s]?\\d{1,4}[-.\\s]?\\d{1,9}$',
                'email': '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$',
                'lettres seulement': '^[a-zA-ZÀ-ÿ\\s]+$',
                'chiffres seulement': '^\\d+$'
            };

            // Gestion du changement de règle dans le select
            ruleSelect.addEventListener('change', () => {
                const selectedRule = ruleSelect.value;

                if (selectedRule === 'regex libre') {
                    regexInput.disabled = false;  // Laisser l'utilisateur entrer une regex
                    regexInput.value = '';        // Effacer la valeur actuelle
                    regexInput.style.visibility = "visible" // affiche L'input regexlibre si le champ du select est "regex libre"
                } else {
                    regexInput.disabled = true;   // Désactiver l'input si une règle est sélectionnée
                    regexInput.value = regexMap[selectedRule] || ''; // Mettre la regex correspondante
                    regexInput.style.visibility = "hidden" // Masque les regex si non libre en plus du disable
                }
            });

            // Initialiser l'état de regexInput en fonction de la valeur initiale du select
            regexInput.disabled = (ruleSelect.value !== 'regex libre');

            // Déclencher l'événement "change" pour initialiser la valeur de regexInput à la création
            ruleSelect.dispatchEvent(new Event('change'));

            // Ajouter la règle dans le regexContainer
            regexContainer.appendChild(ruleDiv);                     
        }
}