const timeOutTestValue = 500; // Définir la valeur du timeout à 500ms

// Fonction pour tester la mise à jour du texte de la div 'importTitle'
function testUpdateImportTitle() {
    return new Promise((resolve) => {
        const importTitle = document.getElementById("importTitle");
        const randomName = "test nom aléatoire"; // Remplacez par la logique pour obtenir le nom généré
        importTitle.value = randomName; // Simuler la mise à jour du texte

        console.log("Test de mise à jour du texte de 'importTitle':", importTitle.value === randomName);
        setTimeout(resolve, timeOutTestValue); // Indiquer que le test est terminé après un délai
    });
}

// Fonction pour tester le clic sur le label 'noHeader'
function testClickNoHeaderLabel() {
    return new Promise((resolve) => {
        const noHeaderLabel = document.querySelector('label[for="noHeader"]');
        const event = new MouseEvent('click', { bubbles: true });
        noHeaderLabel.dispatchEvent(event);

        console.log("Test clic sur le label 'noHeader':", true); // Remplacez par une vérification appropriée
        setTimeout(resolve, timeOutTestValue); // Indiquer que le test est terminé après un délai
    });
}

// Fonction pour tester la sélection de la dernière option dans le sélecteur 'ficheType'
function testSelectLastFicheType() {
    return new Promise((resolve) => {
        const ficheTypeSelect = document.getElementById("ficheType");
        const lastIndex = ficheTypeSelect.options.length - 1;
        ficheTypeSelect.selectedIndex = lastIndex; // Simuler la sélection de la dernière option

        console.log("Test sélection de la dernière option dans 'ficheType':", ficheTypeSelect.selectedIndex === lastIndex);
        setTimeout(resolve, timeOutTestValue); // Indiquer que le test est terminé après un délai
    });
}

// Fonction pour tester la sélection de la dernière option dans le sélecteur 'dedoublonageKey' après 100ms
function testSelectLastDedoublonageKey() {
    return new Promise((resolve) => {
        const dedoublonageKeySelect = document.getElementById("dedoublonageKey");
        const lastIndex = dedoublonageKeySelect.options.length - 1;

        setTimeout(() => {
            dedoublonageKeySelect.selectedIndex = lastIndex; // Simuler la sélection de la dernière option
            console.log("Test sélection de la dernière option dans 'dedoublonageKey':", dedoublonageKeySelect.selectedIndex === lastIndex);
            resolve(); // Indiquer que le test est terminé
        }, timeOutTestValue); // Utiliser le même délai ici
    });
}

// Fonction pour tester le clic sur le bouton 'validateCSV'
function testClickValidateCSVButton() {
    return new Promise((resolve) => {
        const validateCSVButton = document.getElementById("validateCSV");
        const event = new MouseEvent('click', { bubbles: true });
        validateCSVButton.dispatchEvent(event);

        console.log("Test clic sur le bouton 'Valider le fichier CSV':", true); // Remplacez par une vérification appropriée
        setTimeout(() => {
            checkHeadersSelectorContainerPresence();
            resolve(); // Indiquer que le test est terminé
        }, timeOutTestValue);
    });
}

function checkHeadersSelectorContainerPresence() {
    setTimeout(() => {
        const headersSelectorContainer_test = document.querySelector('.headersSelectorContainer');
        console.log("La modale doit apparaitre :", headersSelectorContainer_test ? true : false);
    }, 1000)
}

function movingSomeColumns() {
    const availableHeaders = document.querySelector("#available-headers");
    availableHeaders.childNodes[0].click();
    availableHeaders.childNodes[2].click();
    availableHeaders.childNodes[4].click();
    document.querySelector('.movingHeaders > #add-btn').click();

    console.log("col2 n'a pas bougé ok", document.querySelectorAll("#available-headers > span")[0].innerText === 'col2' ? true : false);
    console.log("col4 n'a pas bougé ok", document.querySelectorAll("#available-headers > span")[1].innerText === 'col4' ? true : false);
    console.log("col6 n'a pas bougé ok", document.querySelectorAll("#available-headers > span")[2].innerText === 'col6' ? true : false);

    console.log("deplacement col1 ok", document.querySelectorAll("#selected-headers > span")[0].innerText === 'col1' ? true : false);
    console.log("deplacement col3 ok", document.querySelectorAll("#selected-headers > span")[1].innerText === 'col3' ? true : false);
    console.log("deplacement col5 ok", document.querySelectorAll("#selected-headers > span")[2].innerText === 'col5' ? true : false);
}

async function checkHeadersPresent() {
    // Attendre un délai pour permettre au DOM de se mettre à jour
    await new Promise(resolve => setTimeout(resolve, 2000)); // Attendre 500ms avant de vérifier les valeurs

    // Vérifications des valeurs des éléments
    // console.log("le header 1 contient la bonne valeur :", document.querySelectorAll(".headerKept")[0].value === "col1" ? true : false);
    console.log("le header 2 contient la bonne valeur :", document.querySelectorAll(".headerKept")[1].value === "col3" ? true : false);
    console.log("le header 3 contient la bonne valeur :", document.querySelectorAll(".headerKept")[2].value === "col5" ? true : false);
    console.log("le select 1 contient la bonne valeur :", document.querySelector('select[name="mapping_0"]').textContent.includes('ignorer'));
    console.log("le select 2 contient la bonne valeur :", document.querySelector('select[name="mapping_1"]').textContent.includes('ignorer'));
    console.log("le select 3 contient la bonne valeur :", document.querySelector('select[name="mapping_2"]').textContent.includes('ignorer'));
}

function checkAllCases() {
// Cocher et dispatcher l'événement pour chaque case à cocher avec un délai de 150 ms
setTimeout(() => {
    let checkboxCreateClients = document.querySelector("#createClients");
    checkboxCreateClients.checked = true;
    checkboxCreateClients.dispatchEvent(new Event('change'));
    console.log('Create Clients:', checkboxCreateClients.checked);
}, 150);

setTimeout(() => {
    let checkboxModifyClients = document.querySelector("#modifyClients");
    checkboxModifyClients.checked = true;
    checkboxModifyClients.dispatchEvent(new Event('change'));
    console.log('Modify Clients:', checkboxModifyClients.checked);
}, 300);

setTimeout(() => {
    let checkboxDeduplicate = document.querySelector("#deduplicate");
    checkboxDeduplicate.checked = true;
    checkboxDeduplicate.dispatchEvent(new Event('change'));
    console.log('Deduplicate:', checkboxDeduplicate.checked);
}, 450);

setTimeout(() => {
    let checkboxTrimSpaces = document.querySelector("#trimSpaces");
    checkboxTrimSpaces.checked = true;
    checkboxTrimSpaces.dispatchEvent(new Event('change'));
    console.log('Trim Spaces:', checkboxTrimSpaces.checked);
}, 600);

setTimeout(() => {
    let checkboxCasseChangeColumns = document.querySelector("#casseChangeColumns");
    checkboxCasseChangeColumns.checked = true;
    checkboxCasseChangeColumns.dispatchEvent(new Event('change'));
    console.log('Casse Change Columns:', checkboxCasseChangeColumns.checked);
}, 750);

setTimeout(() => {
    let checkboxValidateFields = document.querySelector("#validateFields");
    checkboxValidateFields.checked = true;
    checkboxValidateFields.dispatchEvent(new Event('change'));
    console.log('Validate Fields:', checkboxValidateFields.checked);
}, 900);

setTimeout(() => {
    let checkboxKeepFirstRow = document.querySelector("#keepFirstRow");
    checkboxKeepFirstRow.checked = true;
    checkboxKeepFirstRow.dispatchEvent(new Event('change'));
    console.log('Keep First Row:', checkboxKeepFirstRow.checked);
}, 1050);

setTimeout(() => {
    let checkboxKeepLastRow = document.querySelector("#keepLastRow");
    checkboxKeepLastRow.checked = true;
    checkboxKeepLastRow.dispatchEvent(new Event('change'));
    console.log('Keep Last Row:', checkboxKeepLastRow.checked);
}, 1200);

setTimeout(() => {
    let insertionTimeField = document.querySelector("#insertionTime");
    insertionTimeField.value = "2024-05-26T05:24";
    insertionTimeField.dispatchEvent(new Event('change'));
    console.log('Insertion Time:', insertionTimeField.value);
}, 1350);

setTimeout(() => {
    console.log("boutton ajout unique présent casse selecteur?", document.querySelector(".casseChangeContainer").childElementCount === 1 ? true: false)
    console.log("id boutton présent", document.querySelector(".casseChangeContainer").firstChild.id === "addcasseChangeRuleButton"? true : false)
}, 1500)

setTimeout(() => {
    console.log("boutton ajout unique présent regex selecteur?", document.querySelector(".regexContainer").childElementCount === 1 ? true: false)
    console.log("id boutton présent", document.querySelector(".regexContainer").firstChild.id === "addRuleButton"? true : false)
}, 1500)

setTimeout(() => {
    console.log("champ date rempli:" ,document.querySelector("#insertionTime").value == "2024-05-26T05:24" ? true: false)
}, 1500)

setTimeout(() => { 
const allConditionsTrue = 
    document.querySelector("#col-needed-container").childElementCount === 4 &&
    document.querySelector("#col-needed-container").children[0].innerText === "Colonnes obligatoires pour l'insertion : " &&
    document.querySelector("#col-needed-container").children[1].innerText === 'test_nom /' &&
    document.querySelector("#col-needed-container").children[2].innerText === 'test_prenom /' &&
    document.querySelector("#col-needed-container").children[3].innerText === 'test_uuid /';

    console.log("Les valeurs obligatoires sont bien affichées", allConditionsTrue ? true : false);
}, 1600);

setTimeout(() => {
    console.log("conservez premiere ou derniere occurence visible:", !document.querySelector("#occurenceValueContainer").classList.contains("d-none")? true : false)        
},1650)




setTimeout(() => {
    let buttonClick = document.querySelector('#addcasseChangeRuleButton');
    buttonClick.click();
    buttonClick.click();
    buttonClick.click();

    document.querySelectorAll(".casseChangeRule > select").childElementCount === 6

    console.log("choix col1 disponible: ", document.querySelectorAll(".casseChangeRule > select")[0].querySelectorAll("option")[0].value === 'col1' ? true : false)
    console.log("choix col2 disponible: ", document.querySelectorAll(".casseChangeRule > select")[0].querySelectorAll("option")[1].value === 'col3' ? true : false)
    console.log("choix col3 disponible: ", document.querySelectorAll(".casseChangeRule > select")[0].querySelectorAll("option")[2].value === 'col5' ? true : false)
    console.log("choix MAJUSCULE disponible: ", document.querySelectorAll(".casseChangeRule > select")[1].querySelectorAll("option")[0].value === 'MAJUSCULE' ? true : false)
    console.log("choix minuscule disponible: ", document.querySelectorAll(".casseChangeRule > select")[1].querySelectorAll("option")[1].value === 'minuscule' ? true : false)
    console.log("choix Capitalise disponible: ", document.querySelectorAll(".casseChangeRule > select")[1].querySelectorAll("option")[2].value === 'Capitalise' ? true : false)
}, 1700)

setTimeout(() => {
    console.log("3 lignes de qualification de champs casse disponible :", document.querySelector(".casseChangeContainer").childElementCount === 4 ? true : false)
    document.querySelectorAll(".btn-danger")[0].click()
    document.querySelectorAll(".btn-danger")[0].click()
    document.querySelectorAll(".btn-danger")[0].click()
    console.log("Elements correctement supprimés: ", document.querySelector(".casseChangeContainer").childElementCount === 1 ? true : false)
}, 2100)


setTimeout(() => {
    let buttonClick = document.querySelector('#addRuleButton');
    buttonClick.click();
    buttonClick.click();
    buttonClick.click();

    document.querySelector(".regexContainer").childElementCount === 4

    console.log("choix col1 disponible: ", document.querySelectorAll(".regexContainer > .regexRule")[0].querySelectorAll("option")[0].value === 'col1' ? true : false)
    console.log("choix col2 disponible: ", document.querySelectorAll(".regexContainer > .regexRule")[0].querySelectorAll("option")[1].value === 'col3' ? true : false)
    console.log("choix col3 disponible: ", document.querySelectorAll(".regexContainer > .regexRule")[0].querySelectorAll("option")[2].value === 'col5' ? true : false)
    console.log("choix MAJUSCULE disponible: ", document.querySelectorAll(".regexContainer > .regexRule")[0].querySelectorAll("select")[1].querySelectorAll("option")[0].value === 'telephone' ? true : false)
    console.log("choix MAJUSCULE disponible: ", document.querySelectorAll(".regexContainer > .regexRule")[0].querySelectorAll("select")[1].querySelectorAll("option")[1].value === 'email' ? true : false)
    console.log("choix MAJUSCULE disponible: ", document.querySelectorAll(".regexContainer > .regexRule")[0].querySelectorAll("select")[1].querySelectorAll("option")[2].value === 'lettres seulement' ? true : false)
    console.log("choix minuscule disponible: ", document.querySelectorAll(".regexContainer > .regexRule")[0].querySelectorAll("select")[1].querySelectorAll("option")[3].value === 'chiffres seulement' ? true : false)
    console.log("choix Capitalise disponible: ", document.querySelectorAll(".regexContainer > .regexRule")[0].querySelectorAll("select")[1].querySelectorAll("option")[4].value === 'regex libre' ? true : false)
}, 1700)

setTimeout(() => {
    console.log("3 lignes de qualification regex disponible :", document.querySelector(".regexContainer").childElementCount === 4 ? true : false)
    document.querySelectorAll(".btn-danger")[0].click()
    document.querySelectorAll(".btn-danger")[0].click()
    document.querySelectorAll(".btn-danger")[0].click()
    console.log("Elements correctement supprimés: ", document.querySelector(".regexContainer").childElementCount === 1 ? true : false)
}, 2100)

setTimeout(() => {
    document.querySelector("#finalize").click()
    console.log("affichage de la modale de validation: ", document.querySelector(".configSavingModale") ? true: false)
    document.querySelector(".configSavingModale > input").value = "test"
    console.log("Le champ titre se rempli", document.querySelector(".configSavingModale > input").value === "test" ? true : false)
    document.querySelector('.configSavingModale > button.btn-primary').click()

    setTimeout(() => {
        console.log("l'objet est tel qu'on l'attend:", validateTestConfig(test_config))
    }, 2000)

    ThirdTestSession()
}, 3000)


function validateTestConfig(test_config) {
        // Vérification des propriétés statiques
        const expectedInsertionTime = '2024-05-26T05:24';
        const expectedParameters = {
            create_clients: true,
            modify_clients: true,
            dedoublonage: true,
            keep_first_row: true,
            keep_last_row: true,
            trim_spaces: true,
            validate_fields: true,
            noHeaders: true,
            casseChange_columns: true,
            ficheType: "prospect",
            occurence_kept: "first",
            dedoublonageKey: "jack",
            record_name: "test"
        };

        // Vérifier que insertionTime correspond
        if (test_config.insertionTime !== expectedInsertionTime) {
            return false;
        }

        // Vérifier que toutes les propriétés dans parameters correspondent (en dehors des dynamiques)
        for (const key in expectedParameters) {
            if (test_config.parameters[key] !== expectedParameters[key]) {
                return false;
            }
        }

        // Vérifier que filePath contient bien le bon préfixe et se termine par un UUID aléatoire
        const filePathPattern = /^csvTest_([a-f0-9\-]{36})\.csv$/;
        if (!filePathPattern.test(test_config.parameters.filePath)) {
            return false;
        }

        // Vérifier que title contient le bon préfixe et se termine par un UUID aléatoire
        const titlePattern = /^test nom aléatoire_([a-f0-9\-]{36})$/;
        if (!titlePattern.test(test_config.parameters.title)) {
            return false;
        }

        // Vérifier que timestamp_tracker est un nombre valide
        if (typeof test_config.timestamp_tracker !== 'number') {
            return false;
        }

        // Si toutes les vérifications passent
        return true;
    }
}

function validateSecondTestConfig(test_config) {
    // Vérification des propriétés statiques
    const expectedInsertionTime = '2024-01-01T00:00';
    const expectedParameters = {
        create_clients: true,
        modify_clients: true,
        dedoublonage: true,
        keep_first_row: true,
        keep_last_row: false,
        trim_spaces: false,
        validate_fields: true,
        noHeaders: false,
        casseChange_columns: false,
        ficheType: "epargnant",
        occurence_kept: "first",
        dedoublonageKey: "pierre",
        record_name: "ma config"
    };

    // Vérifier que insertionTime correspond
    if (test_config.insertionTime !== expectedInsertionTime) {
        return false;
    }

    // Vérifier que toutes les propriétés dans parameters correspondent
    for (const key in expectedParameters) {
        if (test_config.parameters[key] !== expectedParameters[key]) {
            return false;
        }
    }

    // Vérifier que filePath contient bien le bon préfixe et se termine par un UUID aléatoire
    const filePathPattern = /^csvTest_([a-f0-9\-]{36})\.csv$/;
    if (!filePathPattern.test(test_config.parameters.filePath)) {
        return false;
    }

    // Vérifier que title contient le bon préfixe et se termine par un UUID aléatoire
    const titlePattern = /^test nom aléatoire_([a-f0-9\-]{36})$/;
    if (!titlePattern.test(test_config.parameters.title)) {
        return false;
    }

    // Vérifier que timestamp_tracker est un nombre valide
    if (typeof test_config.timestamp_tracker !== 'number') {
        return false;
    }

    // Vérifier que hasbeenInserted est un booléen
    if (typeof test_config.hasbeenInserted !== 'boolean') {
        return false;
    }

    // Vérifier que l'objet csvImported contient les clés attendues
    const expectedCsvImportedKeys = ["Nom", "Prenom", "telephone"];
    for (const key of expectedCsvImportedKeys) {
        if (!test_config.csvImported.hasOwnProperty(key)) {
            return false;
        }
    }

    // Vérifier que l'objet regex contient les bonnes expressions régulières
    const expectedRegex = {
        telephone: "^\\+?\\d{1,3}?[-.\\s]?(\\(?\\d{1,4}\\)?[-.\\s]?)?\\d{1,4}[-.\\s]?\\d{1,4}[-.\\s]?\\d{1,9}$",
        Prenom: "^\\+?\\d{1,3}?[-.\\s]?(\\(?\\d{1,4}\\)?[-.\\s]?)?\\d{1,4}[-.\\s]?\\d{1,4}[-.\\s]?\\d{1,9}$",
        Nom: "^\\+?\\d{1,3}?[-.\\s]?(\\(?\\d{1,4}\\)?[-.\\s]?)?\\d{1,4}[-.\\s]?\\d{1,4}[-.\\s]?\\d{1,9}$"
    };

    for (const key in expectedRegex) {
        if (test_config.regex[key] !== expectedRegex[key]) {
            return false;
        }
    }

    return true;
}




// Fonction pour exécuter les tests séquentiellement
function runTests() {
    testUpdateImportTitle()
        .then(testClickNoHeaderLabel)
        .then(testSelectLastFicheType)
        .then(testSelectLastDedoublonageKey)
        .then(testClickValidateCSVButton)
        .then(() => {
            return new Promise((resolve) => {
                setTimeout(() => {
                    movingSomeColumns();
                    resolve();
                }, timeOutTestValue); // Délai pour s'assurer que le DOM a le temps de réagir
            });
        })
        .then(() => {
            setTimeout(() => {
                document.querySelector(".validateContainer > #validate-btn").click();
                console.log("le bouton de click fonctionne", !document.querySelector('#mappingForm').classList.contains("hidden") ? true : false);
            }, timeOutTestValue); // Délai avant de cliquer sur le bouton de validation
        })
        .then(() => {
            setTimeout(() => {
                checkHeadersPresent()
            }, 1500)
            checkAllCases()
        })
}






// Exécution des tests
runTests();