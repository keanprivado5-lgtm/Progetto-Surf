document.addEventListener("DOMContentLoaded", () => {
    // 1. GESTIONE CAMBIO COLORE IMMAGINI
    const colorCircles = document.querySelectorAll('.color-circle');

    colorCircles.forEach(circle => {
        circle.addEventListener('click', function () {
            const card = this.closest('.product-card');
            const imgNera = card.querySelector('.img-nera');
            const imgBianca = card.querySelector('.img-bianca');
            const color = this.getAttribute('data-color');

            // Switch visibilità immagini
            if (color === 'white') {
                imgNera.style.display = 'none';
                imgBianca.style.display = 'block';
            } else {
                imgNera.style.display = 'block';
                imgBianca.style.display = 'none';
            }

            // Cambia cerchietto attivo
            card.querySelectorAll('.color-circle').forEach(c => c.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // 2. GESTIONE SELEZIONE TAGLIA (Bottoni Neri)
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
    renderCart();

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

            const activeColor = card.querySelector('.color-circle.active').getAttribute('data-color');
            const productName = card.querySelector('h3').innerText;

            // Trova l'immagine corretta (quella visibile)
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
            if (!sideCart.classList.contains('open')) toggleCart();
        });
    });

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
        }

        cart.forEach((item, index) => {
            total += item.price * item.qty;
            container.innerHTML += `
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
        });
        if (totalEl) totalEl.innerText = total;
    }

    window.changeQuantity = (index, delta) => {
        cart[index].qty += delta;
        if (cart[index].qty <= 0) cart.splice(index, 1);
        saveAndRender();
    };

    window.removeItem = (index) => {
        cart.splice(index, 1);
        saveAndRender();
    };
});