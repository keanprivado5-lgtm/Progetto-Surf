document.addEventListener('DOMContentLoaded', () => {
    // --- Flip Animation ---
    const flipContent = document.querySelector('.flip-content');
    const flipButtons = document.querySelectorAll('.flip-btn');
    
    flipButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            flipContent.classList.toggle('flipped');
        });
    });

    // --- Password Visibility Toggle ---
    const passwordToggles = document.querySelectorAll('.password-toggle');

    passwordToggles.forEach(toggle => {
        toggle.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('data-target');
            const passwordInput = document.getElementById(targetId);
            const eyeIcon = this.querySelector('.eye-icon');

            if (!passwordInput || !eyeIcon) return;

            const isPassword = passwordInput.type === 'password';
            
            // Toggle input type
            passwordInput.type = isPassword ? 'text' : 'password';
            if (isPassword) {
                eyeIcon.src = 'img/eye.png';
                eyeIcon.alt = 'Hide password';
                this.setAttribute('aria-label', 'Nascondi password');
            } else {
                eyeIcon.src = 'img/hidden.png';
                eyeIcon.alt = 'Show password';
                this.setAttribute('aria-label', 'Mostra password');
            }
        });
    });

    // --- Form Submission Handler ---
    const destinationPage = 'index.html';

    const setupFormRedirect = (formId) => {
        const form = document.getElementById(formId);

        if (form) {
            form.addEventListener('submit', (event) => {
                event.preventDefault();
                console.log(`Form "${formId}" inviato con successo. Reindirizzamento a: ${destinationPage}`);
                window.location.href = destinationPage;
            });
        }
    };

    setupFormRedirect('loginForm');
    setupFormRedirect('registerForm');
});