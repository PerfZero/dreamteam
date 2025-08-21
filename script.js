document.addEventListener('DOMContentLoaded', function() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const roleSelect = document.getElementById('role');
    const referralGroup = document.getElementById('referralGroup');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.getAttribute('data-tab');
            
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            btn.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });

    roleSelect.addEventListener('change', function() {
        if (this.value === 'employer') {
            referralGroup.style.display = 'block';
        } else {
            referralGroup.style.display = 'none';
        }
    });

    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        
        if (!email || !password) {
            showNotification('Заполните все обязательные поля', 'error');
            return;
        }
        
        if (email === 'admin@dreamteam.com' && password === 'admin123') {
            showNotification('Успешный вход!', 'success');
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 1000);
        } else {
            showNotification('Неверный email или пароль', 'error');
        }
    });

    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        if (!validateRegisterForm(data)) {
            return;
        }
        
        showNotification('Регистрация успешна!', 'success');
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 1000);
    });

    function validateRegisterForm(data) {
        const requiredFields = ['email', 'phone', 'password', 'role', 'lastName', 'firstName', 'middleName', 'birthDate', 'city', 'gender'];
        
        for (let field of requiredFields) {
            if (!data[field]) {
                showNotification(`Поле ${getFieldName(field)} обязательно для заполнения`, 'error');
                return false;
            }
        }
        
        if (!data.privacy) {
            showNotification('Необходимо согласие с политикой конфиденциальности', 'error');
            return false;
        }
        
        if (!isValidEmail(data.email)) {
            showNotification('Введите корректный email', 'error');
            return false;
        }
        
        if (!isValidPhone(data.phone)) {
            showNotification('Введите корректный номер телефона', 'error');
            return false;
        }
        
        if (data.password.length < 6) {
            showNotification('Пароль должен содержать минимум 6 символов', 'error');
            return false;
        }
        
        return true;
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function isValidPhone(phone) {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        return phoneRegex.test(phone.replace(/\s/g, ''));
    }

    function getFieldName(field) {
        const fieldNames = {
            email: 'Email',
            phone: 'Телефон',
            password: 'Пароль',
            role: 'Роль',
            lastName: 'Фамилия',
            firstName: 'Имя',
            middleName: 'Отчество',
            birthDate: 'Дата рождения',
            city: 'Город',
            gender: 'Пол'
        };
        return fieldNames[field] || field;
    }

    function showNotification(message, type) {
        const notification = document.getElementById('notification');
        notification.textContent = message;
        notification.className = `notification ${type} show`;
        
        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    }
});
