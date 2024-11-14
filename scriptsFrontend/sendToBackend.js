export function sendToBackend(csvFile, config) {
    // console.log("csvFile=>", csvFile)
    // console.log("config=>", config)
    const formData = new FormData();
    formData.append('csvFile', csvFile);
    formData.append('config', JSON.stringify(config));

    fetch('http://localhost:3001/upload', { 
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erreur lors de l\'envoi des données');
        }
        return response.json();
    })
    .then(data => {
        console.log('Succès:', data);
        showToast('success', 'Les données ont été envoyées avec succès !');
    })
    .catch(error => {
        console.error('Erreur:', error);
        showToast('error', 'Une erreur est survenue lors de l\'envoi des données.');
    });
}



function showToast(type, message) {
    const bgColor = type === 'danger' ? 'bg-success' : 'bg-danger';
    const toast = document.createElement('div');
    toast.className = `toast align-items-center ${bgColor} position-fixed bottom-0 end-0 p-3`;
    toast.role = 'alert';
    toast.ariaLive = 'assertive';
    toast.ariaAtomic = 'true';
    toast.innerHTML = `
        <div class="d-flex m-5">
            <div class="toast-body">
                ${message}
            </div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
    `;

    document.body.appendChild(toast);

    // Créer une instance de Toast de Bootstrap et afficher le toast
    const bsToast = new bootstrap.Toast(toast);
    bsToast.show();

    // Supprimer le toast après un certain temps
    setTimeout(() => {
        bsToast.hide();
        toast.remove();
    }, 8000); // Le toast disparaît après 8 secondes
}