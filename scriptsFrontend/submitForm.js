import {sendToBackend} from './sendToBackend.js'

export function displaySavingModale() {
    // Créer la div de la modale
    const modal = document.createElement('div');
    modal.style.position = 'fixed';
    modal.style.top = '50%';
    modal.style.left = '50%';
    modal.style.transform = 'translate(-50%, -50%)';
    modal.style.backgroundColor = '#fff';
    modal.style.padding = '20px';
    modal.style.zIndex = '1000';
    modal.style.boxShadow = '0px 0px 4px 4px grey'
    modal.classList = "configSavingModale"
    
    // Créer le contenu de la modale
    const question = document.createElement('p');
    question.textContent = "Voulez-vous enregistrer votre configuration avant de continuer ?";

    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Nom de ma config';
    input.classList.add("form-control", "m-2")
    
    const buttonYes = document.createElement('button');
    buttonYes.textContent = 'Oui';
    buttonYes.classList.add("btn", "btn-primary", "m-2")
    const buttonNo = document.createElement('button');
    buttonNo.textContent = 'Non';
    buttonNo.classList.add("btn", "btn-dark", "m-2")
    const buttonCancel = document.createElement('button');
    buttonCancel.textContent = 'Annuler';
    buttonCancel.classList.add("btn", "btn-danger", "ms-5", "ps-5", "pe-5")

    buttonYes.addEventListener('click', () => {
        const configName = input.value;
        console.log("Enregistrement de la configuration sous le nom :", configName);
        // On devra géré où on l'enregistre
        submitForm(configName);
    });

    buttonNo.addEventListener('click', () => {
        submitForm();
    });

    buttonCancel.addEventListener('click', () => {
        document.querySelector('.configSavingModale').remove()
        return
    });

    modal.appendChild(question);
    modal.appendChild(input);
    modal.appendChild(buttonYes);
    modal.appendChild(buttonNo);
    modal.appendChild(buttonCancel);

    document.body.appendChild(modal);
}

export function submitForm(recordName = null) {

    document.body.removeChild(document.querySelector(".configSavingModale"));


    const mappingArea = document.getElementById('mappingArea');

    let insertionTimeValue = document.getElementById('insertionTime').value;

    // Si aucune valeur n'est donnée, définir l'heure d'insertion au lendemain 1h du matin. à voir si on conserve cette logique ? par defaut donc
    if (!insertionTimeValue) {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);  // Passer au jour suivant
        tomorrow.setHours(1, 0, 0, 0);  // Définir à 01:00:00
        insertionTimeValue = tomorrow.toISOString().slice(0, 16); // Format attendu "YYYY-MM-DDTHH:MM"
    }

    const config = {
        csvImported: {},
        parameters: {},
        regex: {},
        casseChange: {},
        insertionTime: insertionTimeValue
    };

    // Récupérer le fichier CSV
    const csvFileInput = document.getElementById("csvFile");
    const csvFile = csvFileInput.files[0]; // On suppose qu'un seul fichier est sélectionné

    mappingArea.querySelectorAll('.row').forEach(row => {
        const header = row.querySelector('input[data-header]').getAttribute('data-header');
        const selectedValue = row.querySelector('select').value;
        if (selectedValue) {config.csvImported[header] = selectedValue;}
    });


/* ---------------- WORK IN PROGRESS COMMENTE DANS L'ATTENTE ---------------- */
    const casseChangeRules = document.querySelectorAll('.casseChangeRule');
    casseChangeRules.forEach(casseChangeDiv => {
        const columnSelect = casseChangeDiv.querySelector('select:nth-of-type(1)');
        const casseChangeInput = casseChangeDiv.querySelector('select:nth-of-type(2)');

        const key = columnSelect.value; // Clé
        const casseChange = casseChangeInput.value; // Valeur

        if (key && casseChange) {
            config.casseChange[key] = casseChange; // Ajouter au config.casseChange
        }
    });

/* ----------------------------------- --- ---------------------------------- */

    // Récupérer les règles de validation
    const regexRules = document.querySelectorAll('.regexRule');
    regexRules.forEach(ruleDiv => {
        const columnSelect = ruleDiv.querySelector('select:nth-of-type(1)');
        const regexInput = ruleDiv.querySelector('input[type="text"]');

        const key = columnSelect.value; // Clé
        const regex = regexInput.value; // Valeur

        if (key && regex) {
            config.regex[key] = regex; // Ajouter au config.regex
        }
    });

    // Générer un UUID
    const uuid = crypto.randomUUID();

    // Récupérez les colonnes à auxquels ils faut changer la casse
    // const targetedColumns = document.querySelectorAll(".casseChangeContainer select");

    // Récupérer le nom du fichier CSV
    let csvContent = csvFileInput.value;
    let splitContent = csvContent.split("\\");
    let lastElement = splitContent[splitContent.length - 1];
    let fileBaseName = lastElement.replace('.csv', '');

    // Remplissage aussi du fichier de config
    const newFileNameWithUuid = `${fileBaseName}_${uuid}.csv`;
    if (recordName) {config.parameters.record_name = recordName}
    config.parameters.filePath = newFileNameWithUuid;
    config.timestamp_tracker = Date.now();
    config.hasbeenInserted = false;
    // config.configFile = document.getElementById('configFile').value;
    config.parameters.ficheType = document.getElementById("ficheType").value;
    config.parameters.dedoublonageKey = document.getElementById("dedoublonageKey").value;
    config.parameters.title = document.getElementById('importTitle').value + "_" + uuid;
    config.parameters.noHeaders = document.getElementById('noHeader').checked;
    config.parameters.create_clients = document.getElementById('createClients').checked;
    config.parameters.modify_clients = document.getElementById('modifyClients').checked;
    config.parameters.dedoublonage = document.getElementById('deduplicate').checked;
    config.parameters.trim_spaces = document.getElementById('trimSpaces').checked;
    config.parameters.casseChange_columns = document.getElementById('casseChangeColumns').checked;
    config.parameters.validate_fields = document.getElementById('validateFields').checked;
    config.parameters.keep_first_row = document.getElementById('keepFirstRow').checked;
    config.parameters.keep_last_row = document.getElementById('keepLastRow').checked;
    config.parameters.occurence_kept = document.getElementById('deduplicate').checked ? document.getElementById('occurenceValue').value : null

    // Générer le fichier de configuration en format JSON
    const blob = new Blob([JSON.stringify(config, null, 2)], { type: 'text/plain' });

    test_config = config // utile pour les test

    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'mapping_config.txt';
    link.click();

    sendToBackend(csvFile, config);
}

window.displaySavingModale = displaySavingModale