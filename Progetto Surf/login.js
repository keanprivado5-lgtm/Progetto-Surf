document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Funzionalità Toggle Password ---
    const passwordToggles = document.querySelectorAll('.password-toggle');

    passwordToggles.forEach(toggle => {
        toggle.addEventListener('click', function () {
            const targetId = this.getAttribute('data-target');
            const passwordInput = document.getElementById(targetId);
            const eyeIconSpan = this.querySelector('.eye-icon');

            if (!passwordInput) return; // Sicurezza: se l'input non esiste, non fare nulla

            const isPassword = passwordInput.type === 'password';

            // Toggle tipo input
            passwordInput.type = isPassword ? 'text' : 'password';

            // Toggle classi icona
            eyeIconSpan.classList.toggle('hidden-eye', !isPassword);
            eyeIconSpan.classList.toggle('visible-eye', isPassword);

            // Toggle Accessibilità
            this.setAttribute('aria-label', isPassword ? 'Nascondi password' : 'Mostra password');
        });
    });

    // --- 2. Gestione Reindirizzamento Form ---
    const destinationPage = 'index.html';

    // Funzione universale per gestire l'invio dei form
    const setupFormRedirect = (formId) => {
        const form = document.getElementById(formId);

        if (form) {
            form.addEventListener('submit', (event) => {
                event.preventDefault(); // Blocca l'invio reale al server

                console.log(`Form "${formId}" inviato con successo. Reindirizzamento a: ${destinationPage}`);

                // Reindirizzamento
                window.location.href = destinationPage;
            });
        } else {
            // Questo apparirà in console solo se l'ID nel tuo HTML è diverso
            console.warn(`Attenzione: Il form con ID "${formId}" non è stato trovato in questa pagina.`);
        }
    };

    // Attiva la logica per entrambi i form
    setupFormRedirect('loginForm');
    setupFormRedirect('registerForm');
});