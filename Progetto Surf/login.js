document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Flip Animation Handler ---
    const flipContent = document.querySelector('.flip-content');
    const flipButtons = document.querySelectorAll('.flip-btn');
    
    flipButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            flipContent.classList.toggle('flipped');
        });
    });

    // --- 2. Password Visibility Toggle ---
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
            
            // Toggle icon - swap between hidden and visible (shown)
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

    // --- 3. Form Submission Handler ---
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