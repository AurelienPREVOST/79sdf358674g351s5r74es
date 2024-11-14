import { addConfigRules } from "./regexRules.js";
import { insertAddRulesButton } from "./regexRules.js";
import { addCasseChangeRule } from "./casseChangeRules.js";
import { casseChangeChecked } from "./casseChangeRules.js";

export function fillFormWithConfig(config) {
    // Vérification de la configuration
    if (config !== undefined) {
        const mappingArea = document.getElementById('mappingArea');

        // Réinitialiser tous les sélecteurs à la valeur par défaut
        mappingArea.querySelectorAll('.row').forEach(row => {
            const select = row.querySelector('select');
            if (select) {
                select.value = ""; // Réinitialiser à la valeur par défaut
            }
        });

        // Remplir les sélecteurs avec les données du config
        if (config.csvImported) {
            mappingArea.querySelectorAll('.row').forEach(row => {
                const header = row.querySelector('input[data-header]').getAttribute('data-header');
                const select = row.querySelector('select');
                if (config.csvImported[header]) {
                    select.value = config.csvImported[header]; // Remplir avec la valeur correspondante
                }
            });
        }
    }


    // On coche ou non les cases
    if (config !== undefined) {
        document.getElementById('noHeader').checked = config.parameters?.noHeaders || false;
        document.getElementById('ficheType').value = config.parameters?.ficheType || "";
        document.getElementById('dedoublonageKey').value = config.parameters?.dedoublonageKey || ""; 
        document.getElementById('createClients').checked = config.parameters?.create_clients || false;
        document.getElementById('modifyClients').checked = config.parameters?.modify_clients || false;
        document.getElementById('deduplicate').checked = config.parameters?.dedoublonage || false;
        document.getElementById('trimSpaces').checked = config.parameters?.trim_spaces || false;
        document.getElementById('keepFirstRow').checked = config.parameters?.keep_first_row || false;
        document.getElementById('keepLastRow').checked = config.parameters?.keep_last_row || false;
        document.getElementById('insertionTime').value = config.insertionTime || '';
        document.getElementById('occurenceValue').value = config.parameters.occurence_kept || null;


        // Déclencher manuellement l'événement 'change' pour que ca display comme si on cochez manuellement le bouton
        const occurenceValueCheckbox = document.getElementById('deduplicate');
        occurenceValueCheckbox.checked = config.parameters?.dedoublonage || false;
        const eventOccurenceValueCheckbox = new Event('change');
        occurenceValueCheckbox.dispatchEvent(eventOccurenceValueCheckbox);


        // Déclencher manuellement l'événement 'change' pour que ca display comme si on cochez manuellement le bouton
        const validateFieldsCheckbox = document.getElementById('validateFields');
        validateFieldsCheckbox.checked = config.parameters?.validate_fields || false;
        const eventValidateFieldsCheckbox = new Event('change');
        validateFieldsCheckbox.dispatchEvent(eventValidateFieldsCheckbox);

        // Déclencher manuellement l'événement 'change' pour que ca display comme si on cochez manuellement le bouton
        const casseChangeColumnsCheckbox = document.getElementById('casseChangeColumns');
        casseChangeColumnsCheckbox.checked = config.parameters?.casseChange_columns || false;
        const eventCasseChangeColumnsCheckbox = new Event('change');
        casseChangeColumnsCheckbox.dispatchEvent(eventCasseChangeColumnsCheckbox)

        // Vérifier que config.casseChange est un objet avant de le parcourir
        if (config.parameters.casseChange_columns && typeof config.casseChange === 'object') {
            const casseChangeContainer = document.querySelector(".casseChangeContainer")
            casseChangeContainer.innerHTML = ""
            Object.entries(config.casseChange).forEach(([key,value]) => {
                addCasseChangeRule(key, value);
            });
            casseChangeChecked()
        }
        
        
        
        
        
        // Vérifier que config.regex est un objet avant de le parcourir
        if (config.regex && typeof config.regex === 'object') {
            const regexContainer = document.querySelector(".regexContainer")
            regexContainer.innerHTML = ""
            Object.entries(config.regex).forEach(([key, value]) => {
                addConfigRules(key, value);
            });
            insertAddRulesButton();
        } else {
            console.error("config.regex n'est pas un objet valide");
        }


    }
}