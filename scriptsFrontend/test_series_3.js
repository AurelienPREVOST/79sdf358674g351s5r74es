async function ThirdTestSession() {
    setTimeout(async () => {
        console.warn("TEST SECTION 3");
        await testClickNoHeaderLabel(); // Si c'est une fonction asynchrone
        
        // Défilement vers le haut de la page
        window.scrollTo(0, 0);
        
        // Mettre à jour la valeur du champ
        const listConfigFile = document.querySelector("#listConfigFile");
        listConfigFile.value = "config1";

        // Créer et dispatcher l'événement 'change'
        const changeEvent = new Event('change', { bubbles: true });
        listConfigFile.dispatchEvent(changeEvent);

        // Cliquer sur le bouton validateCSV après 2 secondes
        setTimeout(() => {
            document.querySelector("#validateCSV").click();

            setTimeout(() => {
                // On verifie ici que la preconfig chargé a bien créé les bons champs de regex
                console.log("la preconfig précharge les mapping select1 :", document.querySelectorAll('.row > select')[0].value = "test_prenom"? true : false )
                console.log("la preconfig précharge les mapping select2 :", document.querySelectorAll('.row > select')[1].value = "test_prenom"? true : false )
                console.log("deux champs casse detectés", document.querySelectorAll('.casseChangeContainer > div').length = 2? true: false)
                console.log("trois elements détectés par champs", document.querySelectorAll('.casseChangeContainer > div')[0].childElementCount = 3 ? true: false)
                console.log("select casseRule 1.1 a la bonne valeur", document.querySelectorAll('.casseChangeContainer > div')[0].querySelectorAll('select')[0].value === "Nom" ? true : false)
                console.log("select casseRule 1.2 a la bonne valeur", document.querySelectorAll('.casseChangeContainer > div')[0].querySelectorAll('select')[1].value === "MAJUSCULE" ? true : false)
                console.log("select casseRule 2.1 a la bonne valeur", document.querySelectorAll('.casseChangeContainer > div')[1].querySelectorAll('select')[0].value === "Prenom" ? true : false)
                console.log("select casseRule 2.2 a la bonne valeur", document.querySelectorAll('.casseChangeContainer > div')[1].querySelectorAll('select')[1].value === "Capitalise" ? true : false)
                
                // On verifie ici que la preconfig chargé a bien créé les bons champs de casse
                console.log("3 rows et un boutton ajouter regle dans le conteneur de regex: ", document.querySelector(".regexContainer").childElementCount === 4 ? true:false)
                console.log("select regex 1.1 a la bonne valeur", document.querySelector(".regexContainer").querySelectorAll("select")[0].value === 'Nom'? true:false)
                console.log("select regex 1.2 a la bonne valeur", document.querySelector(".regexContainer").querySelectorAll("select")[1].value === 'telephone'? true:false)
                console.log("select regex 2.1 a la bonne valeur", document.querySelector(".regexContainer").querySelectorAll("select")[2].value === 'Prenom'? true:false)
                console.log("select regex 2.2 a la bonne valeur", document.querySelector(".regexContainer").querySelectorAll("select")[3].value === 'telephone'? true:false)
                console.log("select regex 3.1 a la bonne valeur", document.querySelector(".regexContainer").querySelectorAll("select")[4].value === 'id'? true:false)
                console.log("select regex 3.2 a la bonne valeur", document.querySelector(".regexContainer").querySelectorAll("select")[5].value === 'telephone'? true:false)
            
                testInputStates()

                // Mettre à jour la valeur du champ
                const listConfigFile2 = document.querySelector("#listConfigFile");
                listConfigFile2.value = "config3";
                // Créer et dispatcher l'événement 'change'
                const changeEvent2 = new Event('change', { bubbles: true });
                listConfigFile2.dispatchEvent(changeEvent2);

                console.log("la cellule telephone a test_uuid en mapping:",document.querySelectorAll(".row > select")[3].value === 'test_uuid' ? true : false)
                console.log("il n'y a plus de règles de casse: ", document.querySelector(".casseChangeContainer").childElementCount === 0? true : false)
                document.querySelector("#finalize").click()
                document.querySelector(".configSavingModale > input").value = "ma config"
                document.querySelectorAll(".configSavingModale > button")[0].click()
                console.log("La config2 enregistré est telle qu'on l'attend:", validateSecondTestConfig(test_config)? true :false )
            }, 1500)
        }, 2000);
    }, 3000);
}


function testInputStates() {
    const inputStates = {
        noHeader: false,
        createClients: true,
        modifyClients: false,
        deduplicate: true,
        trimSpaces: true,
        casseChangeColumns: true,
        validateFields: true,
        keepFirstRow: true,
        keepLastRow: false
    };

    // Boucle sur chaque clé de l'objet inputStates pour vérifier l'état des inputs
    for (let [id, expectedChecked] of Object.entries(inputStates)) {
        const input = document.getElementById(id);

        // Si l'input n'existe pas ou que son état ne correspond pas, retourne false
        if (!input || input.checked !== expectedChecked) {
            console.log(`L'input avec l'ID ${id} n'est pas dans l'état attendu.`);
            return false;
        } else {
            console.log("9x toutes les checkboxs sont dans l'état attendu coché ou non: ", true)
        }
    }

    // Si tous les inputs sont dans le bon état, retourne true
    return true;
}
