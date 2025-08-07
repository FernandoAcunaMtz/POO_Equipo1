document.addEventListener('DOMContentLoaded', function() {
    const addCardBtn = document.getElementById('add-card-btn');
    const addCardForm = document.getElementById('add-card-form');
    const saveCardBtn = document.getElementById('save-card-btn');
    const cancelCardBtn = document.getElementById('cancel-card-btn');
    const cardList = document.getElementById('card-list');
    
    // Mostrar formulario al hacer clic en "Agregar tarjeta"
    addCardBtn.addEventListener('click', function() {
        document.getElementById('payment-methods').style.display = 'none';
        addCardForm.style.display = 'block';
    });
    
    // Cancelar y volver a la vista principal
    cancelCardBtn.addEventListener('click', function() {
        document.getElementById('payment-methods').style.display = 'block';
        addCardForm.style.display = 'none';
    });
    
    // Guardar tarjeta
    saveCardBtn.addEventListener('click', function() {
        const cardNumber = document.getElementById('card-number').value;
        const cardName = document.getElementById('card-name').value;
        const expiryDate = document.getElementById('expiry-date').value;
        
        if (!cardNumber || !cardName || !expiryDate) {
            alert('Por favor completa todos los campos obligatorios');
            return;
        }
        
        // Crear elemento para la tarjeta guardada
        const cardType = getCardType(cardNumber);
        const lastFour = cardNumber.slice(-4);
        
        const cardItem = document.createElement('li');
        cardItem.className = 'card-item saved-card';
        cardItem.innerHTML = `
            <div class="card-info">
                <div class="card-icon">${getCardIcon(cardType)}</div>
                <div>
                    <strong>${cardType} terminada en ${lastFour}</strong><br>
                    ${cardName} - Vence ${expiryDate}
                </div>
            </div>
            <div class="card-actions">
                <span class="checkmark">✔</span>
                <button class="remove-card-btn">×</button>
            </div>
        `;
        
        // Agregar evento para eliminar tarjeta
        const removeBtn = cardItem.querySelector('.remove-card-btn');
        removeBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            if (confirm('¿Estás seguro de que quieres eliminar esta tarjeta?')) {
                cardItem.remove();
            }
        });
        
        // Insertar antes del botón de agregar tarjeta
        cardList.insertBefore(cardItem, addCardBtn);
        
        // Limpiar formulario
        document.getElementById('card-number').value = '';
        document.getElementById('card-name').value = '';
        document.getElementById('expiry-date').value = '';
        document.getElementById('security-code').value = '';
        document.getElementById('default-payment').checked = false;
        
        // Volver a la vista principal
        document.getElementById('payment-methods').style.display = 'block';
        addCardForm.style.display = 'none';
    });
    
    // Formatear número de tarjeta
    document.getElementById('card-number').addEventListener('input', function(e) {
        let value = e.target.value.replace(/\s+/g, '');
        if (value.length > 0) {
            value = value.match(new RegExp('.{1,4}', 'g')).join(' ');
        }
        e.target.value = value;
    });
    
    // Formatear fecha de vencimiento
    document.getElementById('expiry-date').addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 2) {
            value = value.substring(0, 2) + '/' + value.substring(2, 4);
        }
        e.target.value = value;
    });
    
    // Funciones auxiliares
    function getCardType(cardNumber) {
        const firstDigit = cardNumber.charAt(0);
        if (firstDigit === '4') return 'VISA';
        if (firstDigit === '5') return 'Mastercard';
        if (firstDigit === '3') return 'AMEX';
        return 'Tarjeta';
    }
    
    function getCardIcon(cardType) {
        switch(cardType) {
            case 'VISA': return '💳';
            case 'Mastercard': return '💳';
            case 'AMEX': return '💳';
            default: return '💳';
        }
    }
});