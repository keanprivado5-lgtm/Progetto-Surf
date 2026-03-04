document.addEventListener("DOMContentLoaded", () => {
    const cart = JSON.parse(localStorage.getItem('hopena_cart')) || [];
    const totalEl = document.getElementById('checkout-total');
    const form = document.getElementById('payment-form');
    const content = document.getElementById('checkout-content');

    // 1. Mostra il totale corretto
    let total = 0;
    cart.forEach(item => { total += (item.price * item.qty); });
    if (totalEl) totalEl.innerText = total;

    // 2. Gestione del pagamento
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const nomeCliente = document.getElementById('cust-name').value;

            // Simulazione elaborazione (svuota carrello)
            localStorage.removeItem('hopena_cart');

            // Mostra messaggio di successo
            content.innerHTML = `
                <div style="text-align: center; padding: 20px;">
                    <h1 style="color: #28a745; font-size: 40px;">PAGAMENTO RIUSCITO! ✅</h1>
                    <p style="font-size: 18px; margin: 20px 0;">Grazie <strong>${nomeCliente}</strong> per aver scelto HOPENA.</p>
                    
                    <div style="background: #fff3e0; border: 2px dashed #e07008; padding: 20px; border-radius: 10px; margin: 30px 0;">
                        <h3 style="color: #e07008; margin-top: 0;">ORDINE PRONTO PER IL RITIRO</h3>
                        <p>Puoi passare in sede a <strong>Fuerteventura</strong> a ritirare i tuoi prodotti tra 24 ore.</p>
                        <p><small>Presenta il tuo nome e cognome al bancone.</small></p>
                    </div>

                    <a href="index.html" style="display: inline-block; padding: 12px 25px; background: #333; color: white; text-decoration: none; border-radius: 5px;">Torna alla Home</a>
                </div>
            `;
        });
    }
});