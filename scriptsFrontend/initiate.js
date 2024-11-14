import { generateMappingForm } from "./generateMappingForm.js";
import { onCheckboxChecked, onCheckboxUnchecked } from "./regexRules.js";
import {  } from "./regexRules.js";
import { showDragAndDropSelectorModal } from "./showDragAndDropSelectorModal.js";
import {casseChangeChecked, casseChangeUnchecked} from "./casseChangeRules.js"
import { addConfigRules } from "./regexRules.js";
import { fillFormWithConfig } from "./configFiller.js";

/* ---------------------------- initialize const ---------------------------- */
export const ficheTypeSelect = document.getElementById('ficheType');
export const dedoublonageKeySelect = document.getElementById('dedoublonageKey');
export const tableNameMappingHeaders = ["test_nom", "test_prenom", "test_uuid"];

/* ------------------------ initialize eventListener ------------------------ */
export function helpDivOnButtonListenerAdded() {
    document.querySelector(".help-button").addEventListener("click", () => {
        alert("Sélectionnez d'abord un fichier CSV");
        blinking();
    });

    document.querySelector(".help-preconfig").addEventListener("click", () => {
        alert("Sélectionnez d'abord un fichier CSV");
        blinking();
    });

    function blinking() {
        const validateFields = document.querySelector(".import-div-blinking");
        validateFields.style.boxShadow = '0px 0px 0px 10px white, 0px 0px 0px 12px #c60000';
        setTimeout(() => {
            validateFields.style.boxShadow = 'none'; // ou toute autre valeur par défaut
        }, 2000);
    }
}



export function validateFieldsListenerAdded() {
    document.getElementById('validateFields').addEventListener('change', function() {
        this.checked ? onCheckboxChecked() : onCheckboxUnchecked();
    });
}


export function casseChangeColumnsListenerAdded() {
    document.getElementById('casseChangeColumns').addEventListener('change', function() {
        this.checked ? casseChangeChecked() : casseChangeUnchecked();
    });
}

/* ---- Ajouter un écouteur d'événement sur la première liste déroulante ---- */
export function ficheTypeSelectListenerAdded() {
    ficheTypeSelect.addEventListener('change', function() {
        if (ficheTypeSelect.value === "") {
            // Désactiver la deuxième liste si la valeur est "----------"
            dedoublonageKeySelect.disabled = true;
            dedoublonageKeySelect.value = ""; // Reset value
        } else {
            // Activer la deuxième liste si une autre option est sélectionnée
            dedoublonageKeySelect.disabled = false;
        }
    });
}

/* -- eventListener qui retire le disable sur le bouton Valider le fichier CSV si csv chargé -- */
export function csvFileListenerAdded() {
    
    document.getElementById('csvFile').addEventListener('change', function () {
        document.querySelector(".help-button").remove()
        document.querySelector(".help-preconfig").remove()
        document.querySelector(".second-part").classList.remove("hidden")
        document.getElementById('listConfigFile').disabled = false;
        // document.getElementById('configFile').disabled = false;
        document.getElementById('validateCSV').disabled = false;
    });
}

/* ----- event listener pour lire le fichier CSV et afficher les headers ---- */
export function validateCSVListenerAdded() {
    document.getElementById('validateCSV').addEventListener('click', function () {
        btnValiderCsv()
    });
}

export function btnValiderCsv() {
    const ficheType = document.getElementById("ficheType").value
    const deduplicateKey = document.getElementById("dedoublonageKey").value
    const importTitle = document.getElementById('importTitle').value;
    const configSelectValue = document.getElementById('listConfigFile').value

    if (importTitle === '' || importTitle === null) {
        alert("Veuillez Donnez un titre à votre import")
        return
    }

    if (configSelectValue === "epv_specifique") {
        console.warn("On derive la fonction classique")
        return
    }

    if (ficheType === '' || ficheType === null || deduplicateKey === '' || deduplicateKey === null) {
        alert("Veuillez selectionner un type de fiche ET une clé de dedoublonage avant de valider")
        return
    }

    const fileInput = document.getElementById('csvFile');
    const file = fileInput.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const csvContent = e.target.result;
            const rows = csvContent.split("\n");
            const noHeader = document.getElementById('noHeader').checked;

            // Si la checkbox "pas d'en-tête" est cochée, on génère des colonnes dynamiques
            const headers = noHeader ? Array.from({ length: rows.length > 0 ? rows[0].split(";").length : 0 }, (_, i) => `col${i + 1}`) : rows.shift().split(";");
            
            document.getElementById('mappingArea').innerHTML = `
                    <div id="spinner" class="text-center">
                        <div class="spinner-border text-primary" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                    </div>
                    `;
            setTimeout(() => {
                if (headers.length > 5) { 
                    showDragAndDropSelectorModal(headers)
                } else {
                    generateMappingForm(headers);
                }
            }, 500);
        };
        reader.readAsText(file);
    }
}

export function fillNeededContainer() {
    
    const createClientsInput = document.getElementById("createClients")
    const colNeededContainer = document.getElementById("col-needed-container")

    // Afficher ou masquer colNeededContainer
    createClientsInput.addEventListener("change", () => {
        if (createClientsInput.checked) {
            colNeededContainer.classList.remove("d-none")
        } else {
            colNeededContainer.classList.add("d-none")
        }
    })
    
    // Liste des éléments à insérer
    let colNeeded = ["test_nom", "test_prenom", "test_uuid"]
    colNeededContainer.innerHTML += `<span style="color: #cd0909;margin:0"><i style="margin-left:5rem;">Colonnes obligatoires pour l'insertion : </i></span>`
    // Insérer chaque élément sans écraser les précédents
    colNeeded.forEach(element => {
        colNeededContainer.innerHTML += `<span style="color: #cd0909;"><i>${element} /<i></span>`;
    });
}

export function occurenceFieldEventListener() {
    const deduplicateCheckbox = document.getElementById('deduplicate')
    const occurenceValueContainer = document.getElementById("occurenceValueContainer") 
    deduplicateCheckbox.addEventListener('change', function () {
        deduplicateCheckbox.checked? occurenceValueContainer.classList.remove("d-none") : occurenceValueContainer.classList.add("d-none")
    });
}

export function frontEndAvoid() {
    // permet de fixer l'accoup dû au border de l'input "premiere ou derniere"
    const maxHeightDiv = document.querySelectorAll(".custom-control")[2].clientHeight + "px";
    document.querySelectorAll(".custom-control")[3].style.maxHeight = maxHeightDiv;
}


/* ------------- on appele les eventListener pour les initialisé ------------ */
validateFieldsListenerAdded()
casseChangeColumnsListenerAdded()
ficheTypeSelectListenerAdded()
csvFileListenerAdded()
validateCSVListenerAdded()
fillNeededContainer()
addConfigRules()
occurenceFieldEventListener()
helpDivOnButtonListenerAdded()
frontEndAvoid()