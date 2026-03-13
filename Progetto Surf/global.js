document.addEventListener('DOMContentLoaded', () => {

    // 1. GESTIONE CAMBIO COLORE IMMAGINI
    const colorCircles = document.querySelectorAll('.color-circle');

    colorCircles.forEach(circle => {
        circle.addEventListener('click', function () {
            const card = this.closest('.product-card');
            if (!card) return;
            const imgNera = card.querySelector('.img-nera');
            const imgBianca = card.querySelector('.img-bianca');
            const color = this.getAttribute('data-color');

            if (color === 'white') {
                imgNera.style.display = 'none';
                imgBianca.style.display = 'block';
            } else {
                imgNera.style.display = 'block';
                imgBianca.style.display = 'none';
            }

            card.querySelectorAll('.color-circle').forEach(c => c.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // 2. GESTIONE SELEZIONE TAGLIA
    const sizeButtons = document.querySelectorAll('.size-buttons button');

    sizeButtons.forEach(btn => {
        btn.addEventListener('click', function () {
            const parent = this.closest('.size-buttons');
            parent.querySelectorAll('button').forEach(b => b.classList.remove('selected-size'));
            this.classList.add('selected-size');
        });
    });

    // 3. LOGICA CARRELLO (Inizializzazione)
    let cart = JSON.parse(localStorage.getItem('hopena_cart')) || [];
    
    // 4. APERTURA/CHIUSURA CARRELLO
    const sideCart = document.getElementById('side-cart');
    const overlay = document.getElementById('cart-overlay');
    const cartIconBtn = document.getElementById('cart-icon-btn');
    const closeBtn = document.getElementById('close-cart');

    function toggleCart() {
        if (sideCart && overlay) {
            sideCart.classList.toggle('open');
            overlay.classList.toggle('active');
        }
    }

    if (cartIconBtn) cartIconBtn.addEventListener('click', (e) => { e.preventDefault(); toggleCart(); });
    if (closeBtn) closeBtn.addEventListener('click', toggleCart);
    if (overlay) overlay.addEventListener('click', toggleCart);

    // 5. AGGIUNTA AL CARRELLO
    const addButtons = document.querySelectorAll('.add-to-cart');

    addButtons.forEach(btn => {
        btn.addEventListener('click', function () {
            const card = this.closest('.product-card');
            const selectedSizeBtn = card.querySelector('.selected-size');

            if (!selectedSizeBtn) {
                alert("Per favore, seleziona una taglia!");
                return;
            }

            const activeColorCircle = card.querySelector('.color-circle.active');
            const activeColor = activeColorCircle ? activeColorCircle.getAttribute('data-color') : 'black';
            const productName = card.querySelector('h3').innerText;

            let productImg = "";
            const imgNera = card.querySelector('.img-nera');
            const imgBianca = card.querySelector('.img-bianca');

            if (imgBianca && imgBianca.style.display !== 'none') {
                productImg = imgBianca.src;
            } else {
                productImg = imgNera.src;
            }

            const product = {
                id: productName + selectedSizeBtn.innerText + activeColor,
                name: productName,
                price: parseInt(card.querySelector('.price').innerText.replace(/\D/g, "")),
                size: selectedSizeBtn.innerText,
                color: activeColor,
                img: productImg,
                qty: 1
            };

            const existing = cart.find(item => item.id === product.id);
            if (existing) {
                existing.qty++;
            } else {
                cart.push(product);
            }

            saveAndRender();
            if (sideCart && !sideCart.classList.contains('open')) toggleCart();
        });
    });

    // 6. GESTIONE TASTO PROCEDI AL PAGAMENTO (NUOVO)
    const checkoutBtn = document.querySelector('.checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            if (cart.length === 0) {
                alert("Il tuo carrello è vuoto!");
                return;
            }
            // Ti sposta alla pagina di inserimento dati
            window.location.href = 'checkout.html';
        });
    }

    // FUNZIONI DI SUPPORTO
    function saveAndRender() {
        localStorage.setItem('hopena_cart', JSON.stringify(cart));
        renderCart();
    }

    function renderCart() {
        const container = document.getElementById('cart-items-container');
        const totalEl = document.getElementById('cart-total-amount');
        if (!container) return;

        container.innerHTML = "";
        let total = 0;

        if (cart.length === 0) {
            container.innerHTML = '<p class="empty-msg">Il carrello è vuoto.</p>';
            if (totalEl) totalEl.innerText = "0";
            return;
        }

        cart.forEach((item, index) => {
            total += item.price * item.qty;
            const itemHTML = `
                <div class="cart-item">
                    <img src="${item.img}" class="cart-item-img">
                    <div class="cart-item-info">
                        <strong>${item.name}</strong>
                        <small>Taglia: ${item.size} | ${item.color}</small>
                        <p>${item.price * item.qty}€</p>
                    </div>
                    <div class="cart-item-actions">
                        <div class="qty-controls">
                            <button onclick="changeQuantity(${index}, -1)">-</button>
                            <span>${item.qty}</span>
                            <button onclick="changeQuantity(${index}, 1)">+</button>
                        </div>
                        <button class="remove-btn" onclick="removeItem(${index})">🗑️</button>
                    </div>
                </div>
            `;
            container.innerHTML += itemHTML;
        });
        if (totalEl) totalEl.innerText = total;
    }

    // Funzioni globali per i bottoni dinamici
    window.changeQuantity = (index, delta) => {
        cart[index].qty += delta;
        if (cart[index].qty <= 0) cart.splice(index, 1);
        saveAndRender();
    };

    window.removeItem = (index) => {
        cart.splice(index, 1);
        saveAndRender();
    };

    // Render iniziale al caricamento della pagina
    renderCart();
});

/* Immagine Benvenuto JS  */
window.addEventListener('scroll', () => {
    const heroImages = document.querySelectorAll('.hero-image');

    heroImages.forEach((img) => {
        const rect = img.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            let distance = window.innerHeight - rect.top;
            let scaleAmount = 1 + (distance * 0.0002);
            img.style.transform = `scale(${scaleAmount})`;
        }
    });
});
window.addEventListener('scroll', () => {
    const heroImages = document.querySelectorAll('.hero-image1');

    heroImages.forEach((img) => {
        const rect = img.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            let distance = window.innerHeight - rect.top;
            let scaleAmount = 1 + (distance * 0.0002);
            img.style.transform = `scale(${scaleAmount})`;
        }
    });
});
window.addEventListener('scroll', () => {
    const heroImages = document.querySelectorAll('.hero-image2');

    heroImages.forEach((img) => {
        const rect = img.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            let distance = window.innerHeight - rect.top;
            let scaleAmount = 1 + (distance * 0.0002);
            img.style.transform = `scale(${scaleAmount})`;
        }
    });
});

