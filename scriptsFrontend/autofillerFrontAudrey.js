import { fillFormWithConfig } from "./configFiller.js";
import { derivationEpv } from "./derivationEpv.js";
import {restoreNotEpv} from "./derivationEpv.js"


// CE SCRIPT N'EST PAS A CONSERVER! IL SERT JUSTE A LA DEMO POUR AUDREY
export function initiateObjectPreconfig() {
        const config1 = {
                            "csvImported": {
                                "Nom": "test_prenom",
                                "Prenom": "test_nom",
                                "id": "test_uuid"
                            },
                            "parameters": {
                                "filePath": "chargeur_TEST_Dev_46eb79f6-c59e-4e85-a17e-567e0ff19ac1.csv",
                                "ficheType": "epargnant",
                                "dedoublonageKey": "paul",
                                "title": "test_imp_46eb79f6-c59e-4e85-a17e-567e0ff19ac1",
                                "noHeaders": false,
                                "create_clients": true,
                                "modify_clients": false,
                                "dedoublonage": true,
                                "trim_spaces": true,
                                "casseChange_columns": true,
                                "validate_fields": true,
                                "keep_first_row": true,
                                "keep_last_row": false,
                                "occurence_kept": "last"
                            },
                            "regex": {
                                "Nom": "^[a-zA-ZÀ-ÿ\\s]+$",
                                "Prenom": "^[a-zA-ZÀ-ÿ\\s]+$",
                                "id": "^\\d+$"
                            },
                            "casseChange": {
                                "Nom": "MAJUSCULE",
                                "Prenom": "Capitalise"
                            },
                                "insertionTime": "2024-01-01T00:00",
                                "timestamp_tracker": 1727792674035,
                                "hasbeenInserted": false
                        }

        const config2 = {
                    "csvImported": {
                        "Nom": "test_uuid",
                        "Prenom": "test_prenom",
                        "id": "test_nom"
                    },
                    "parameters": {
                        "filePath": "chargeur_TEST_Dev_0eed71e8-d910-41d7-8b0a-33c01340d19c.csv",
                        "ficheType": "epargnant",
                        "dedoublonageKey": "paul",
                        "title": "azaeazeaz_0eed71e8-d910-41d7-8b0a-33c01340d19c",
                        "noHeaders": false,
                        "create_clients": false,
                        "modify_clients": true,
                        "dedoublonage": false,
                        "trim_spaces": true,
                        "casseChange_columns": false,
                        "validate_fields": false,
                        "keep_first_row": false,
                        "keep_last_row": true
                    },
                    "regex": {},
                    "insertionTime": "2024-01-01T00:01",
                    "timestamp_tracker": 1727190568306,
                    "hasbeenInserted": true,
                    "configFile": ""
                    }

        const config3 = {
                    "csvImported": {
                        "Nom": "test_nom",
                        "Prenom": "test_prenom",
                        "telephone": "test_uuid"
                    },
                    "parameters": {
                        "filePath": "chargeur_TEST_Dev_fb280d94-f5a3-4811-b3e0-de906a818850.csv",
                        "ficheType": "epargnant",
                        "dedoublonageKey": "pierre",
                        "title": "QSDFGH_fb280d94-f5a3-4811-b3e0-de906a818850",
                        "noHeaders": false,
                        "create_clients": true,
                        "modify_clients": true,
                        "dedoublonage": true,
                        "trim_spaces": false,
                        "casseChange_columns": false,
                        "validate_fields": true,
                        "keep_first_row": true,
                        "keep_last_row": false,
                        "occurence_kept": "first"
                    },
                    "regex": {
                        "telephone": "^(?:(?:\\+|00)33[\\s.-]{0,3}(?:\\(0\\)[\\s.-]{0,3})?|0)[1-9](?:(?:[\\s.-]?\\d{2}){4}|\\d{2}(?:[\\s.-]?\\d{3}){2})$",
                        "Prenom": "ceci_est_un_test",
                        "test_value_col_inexistante": "ceci_est_un_test"
                    },
                    "insertionTime": "2024-01-01T00:00",
                    "timestamp_tracker": 1727181851221,
                    "hasbeenInserted": true,
                    "configFile": ""
                    }


        // Créer un objet de correspondance entre les valeurs et les objets de configuration
        configMapping = {
            config1: config1,
            config2: config2,
            config3: config3
        };


}

export function listConfigFileEventListener() {
    // Fonction pour écouter les changements de sélection
    document.addEventListener('DOMContentLoaded', function() {
    const listPreconfig = document.getElementById('listConfigFile');

        listPreconfig.addEventListener("change", () => {
            console.warn("ON CHANGE LA CONFIG")
            selectedConfig = listPreconfig.value;

// /* --------------------------- Cas specifique EPV --------------------------- */
//             if (selectedConfig === 'epv_specifique') {
//                 console.warn("COMPORTEMENT SPECIFIQUE A EPV")
//                 derivationEpv()
//                 return
//             }

//             if (selectedConfig !== 'epv_specifique') {
//                 console.log("restauration de l'état classique")
//                 restoreNotEpv()
//                 return
//             }
// /* -------------------------------------------------------------------------- */

            console.log("return en amont")

            // Vérifier si la configuration sélectionnée existe
            if (selectedConfig && configMapping[selectedConfig]) {
                // Afficher la configuration en console
                fillFormWithConfig(configMapping[selectedConfig])
            } else {
                console.log("Aucune configuration sélectionnée");
            }
        });
    });
}

listConfigFileEventListener()
initiateObjectPreconfig()