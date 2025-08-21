document.addEventListener('DOMContentLoaded', function() {
    loadPackageInfo();
    setupPaymentMethodToggle();
    setupCardInputs();
});

function loadPackageInfo() {
    const urlParams = new URLSearchParams(window.location.search);
    const packageType = urlParams.get('package');
    
    const packages = {
        basic: { name: 'Базовый', price: '500 ₽', tests: 10 },
        standard: { name: 'Стандарт', price: '1200 ₽', tests: 30 },
        premium: { name: 'Премиум', price: '2000 ₽', tests: 60 }
    };
    
    const selectedPackage = packages[packageType] || packages.basic;
    
    document.querySelector('.package-name').textContent = selectedPackage.name;
    document.querySelector('.package-price').textContent = selectedPackage.price;
    document.querySelector('.package-tests').textContent = selectedPackage.tests + ' тестов';
    
    document.getElementById('summaryPackage').textContent = selectedPackage.name;
    document.getElementById('summaryTests').textContent = selectedPackage.tests + ' тестов';
    document.getElementById('summaryTotal').textContent = selectedPackage.price;
}

function setupPaymentMethodToggle() {
    const paymentOptions = document.querySelectorAll('input[name="paymentMethod"]');
    const cardForm = document.getElementById('cardForm');
    const sbpForm = document.getElementById('sbpForm');
    
    paymentOptions.forEach(option => {
        option.addEventListener('change', function() {
            if (this.value === 'card') {
                cardForm.style.display = 'block';
                sbpForm.style.display = 'none';
            } else {
                cardForm.style.display = 'none';
                sbpForm.style.display = 'block';
            }
        });
    });
}

function setupCardInputs() {
    const cardNumber = document.getElementById('cardNumber');
    const expiryDate = document.getElementById('expiryDate');
    const cvv = document.getElementById('cvv');
    const cardholderName = document.getElementById('cardholderName');
    
    cardNumber.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        value = value.replace(/(\d{4})(?=\d)/g, '$1 ');
        e.target.value = value;
    });
    
    expiryDate.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length >= 2) {
            value = value.substring(0, 2) + '/' + value.substring(2, 4);
        }
        e.target.value = value;
    });
    
    cvv.addEventListener('input', function(e) {
        e.target.value = e.target.value.replace(/\D/g, '');
    });
    
    cardholderName.addEventListener('input', function(e) {
        e.target.value = e.target.value.toUpperCase();
    });
}

function processPayment() {
    const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked').value;
    const payButton = document.getElementById('payButton');
    const btnText = payButton.querySelector('.btn-text');
    const btnLoading = payButton.querySelector('.btn-loading');
    
    if (paymentMethod === 'card') {
        if (!validateCardForm()) {
            return;
        }
    }
    
    payButton.disabled = true;
    btnText.style.display = 'none';
    btnLoading.style.display = 'inline';
    
    setTimeout(() => {
        if (paymentMethod === 'card') {
            processCardPayment();
        } else {
            showQRModal();
        }
    }, 2000);
}

function validateCardForm() {
    const cardNumber = document.getElementById('cardNumber').value.replace(/\s/g, '');
    const expiryDate = document.getElementById('expiryDate').value;
    const cvv = document.getElementById('cvv').value;
    const cardholderName = document.getElementById('cardholderName').value;
    
    if (cardNumber.length !== 16) {
        alert('Введите корректный номер карты (16 цифр)');
        return false;
    }
    
    if (!expiryDate.match(/^\d{2}\/\d{2}$/)) {
        alert('Введите корректный срок действия карты (MM/YY)');
        return false;
    }
    
    if (cvv.length !== 3) {
        alert('Введите корректный CVV код (3 цифры)');
        return false;
    }
    
    if (cardholderName.length < 3) {
        alert('Введите имя держателя карты');
        return false;
    }
    
    return true;
}

function processCardPayment() {
    const payButton = document.getElementById('payButton');
    const btnText = payButton.querySelector('.btn-text');
    const btnLoading = payButton.querySelector('.btn-loading');
    
    const success = Math.random() > 0.3;
    
    if (success) {
        alert('Оплата прошла успешно! Тесты добавлены к вашему балансу.');
        setTimeout(() => {
            window.location.href = 'dashboard.html#tariffs';
        }, 1000);
    } else {
        alert('Ошибка оплаты. Проверьте данные карты и попробуйте снова.');
        payButton.disabled = false;
        btnText.style.display = 'inline';
        btnLoading.style.display = 'none';
    }
}

function showQRModal() {
    document.getElementById('qrModal').style.display = 'flex';
    
    setTimeout(() => {
        const success = Math.random() > 0.3;
        if (success) {
            alert('Оплата через СБП прошла успешно! Тесты добавлены к вашему балансу.');
            closeQRModal();
            setTimeout(() => {
                window.location.href = 'dashboard.html#tariffs';
            }, 1000);
        }
    }, 5000);
}

function closeQRModal() {
    document.getElementById('qrModal').style.display = 'none';
    
    const payButton = document.getElementById('payButton');
    const btnText = payButton.querySelector('.btn-text');
    const btnLoading = payButton.querySelector('.btn-loading');
    
    payButton.disabled = false;
    btnText.style.display = 'inline';
    btnLoading.style.display = 'none';
}

function goBack() {
    window.history.back();
}

function logout() {
    if (confirm('Вы уверены, что хотите выйти?')) {
        window.location.href = 'index.html';
    }
}
