let buttonHelp_test = document.querySelector(".help-button");
let preconfigHelp_test = document.querySelector(".help-preconfig");
let sectionAfterSelectCsv_test = document.getElementById("after-select-csv");

// Log avant modification du DOM
console.log("Au lancement de l'app:");
console.log("help-button présent:", buttonHelp_test ? true : false);
console.log("help-preconfig présent:", preconfigHelp_test ? true : false);
console.log("after-select-csv 'hidden' inclus dans les classes:", sectionAfterSelectCsv_test.classList.contains('hidden') ? true : false);

// Fonction pour charger un fichier CSV
function loadCsvFile() {
    return new Promise((resolve, reject) => {
        const input = document.getElementById("csvFile");
        const filePath = 'csvTest.csv'; // Chemin du fichier CSV
        
        // Créer une requête pour charger le fichier
        fetch(filePath)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.blob(); // Convertir la réponse en Blob
            })
            .then(blob => {
                // Créer un fichier à partir du blob
                const file = new File([blob], "csvTest.csv", { type: 'text/csv' });

                // Simuler l'ajout de ce fichier à l'input
                const dataTransfer = new DataTransfer();
                dataTransfer.items.add(file);
                input.files = dataTransfer.files;

                // Déclencher l'événement 'change' avec un délai
                setTimeout(() => {
                    const event = new Event('change');
                    input.dispatchEvent(event);
                }, timeOutTestValue); // Délai de 100 ms pour simuler le changement

                resolve(); // Indiquer que le chargement est terminé
            })
            .catch(error => {
                console.error('Erreur lors du chargement du fichier CSV:', error);
                reject(error); // Indiquer une erreur
            });
    });
}

// Appeler loadCsvFile et ensuite exécuter les logs
loadCsvFile().then(() => {
    console.log("Après chargement du CSV test:");

    // Mettre en place un timeout de 2 secondes
    setTimeout(() => {
        // Vérifications après le chargement du fichier CSV
        buttonHelp_test = document.querySelector(".help-button");
        preconfigHelp_test = document.querySelector(".help-preconfig");
        sectionAfterSelectCsv_test = document.getElementById("after-select-csv");

        // Vérifications séparées
        console.log("La div avec la classe 'help-button' doit être null:", buttonHelp_test === null);
        console.log("La div avec la classe 'help-preconfig' doit être null:", preconfigHelp_test === null);
        console.log("La section 'after-select-csv' ne doit pas avoir la classe 'hidden':", !sectionAfterSelectCsv_test.classList.contains("hidden"));
    }, timeOutTestValue); // Timeout de 2 secondes
});

