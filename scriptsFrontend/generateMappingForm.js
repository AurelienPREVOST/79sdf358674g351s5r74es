import { scrollWindow } from "./scrollWindow.js";
import { tableNameMappingHeaders } from "./initiate.js";
import { fillFormWithConfig } from "./configFiller.js";

export function generateMappingForm(headers) {
        scrollWindow()
        const mappingArea = document.getElementById('mappingArea');
        mappingArea.innerHTML = ''; // Reset

        headers.forEach((header, index) => {
        const div = document.createElement('div');
        div.classList.add('row', 'mb-3', 'align-items-center');

        // Input pour le header du CSV (désactivé)
        const headerInput = document.createElement('input');
        headerInput.type = 'text';
        headerInput.classList.add('headerKept','form-control', 'col');
        headerInput.value = header;
        headerInput.disabled = true;  // Désactivé
        headerInput.setAttribute('data-header', header.trim());
        headerInput.style.maxWidth = '300px';  // Limite la largeur de l'input

        // Sélection pour le mapping
        const select = document.createElement('select');
        select.classList.add('form-select', 'col', 'ms-2');
        select.name = `mapping_${index}`;
        select.style.maxWidth = '350px'; // Limite la largeur de la liste déroulante
        select.innerHTML = `<option value="">-- ignorer --</option>`;
        tableNameMappingHeaders.forEach(mappingHeader => {
            const option = document.createElement('option');
            option.value = mappingHeader;
            option.textContent = mappingHeader;
            select.appendChild(option);
    });


        div.appendChild(headerInput);    // Header input désactivé
        div.appendChild(select);         // Liste déroulante

        // Ajout de la ligne complète dans le mapping area
        mappingArea.appendChild(div);

    });

    fillFormWithConfig(configMapping[selectedConfig])
}