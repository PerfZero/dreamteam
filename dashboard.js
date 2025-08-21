document.addEventListener('DOMContentLoaded', function() {
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.section');
    const sendTestForm = document.getElementById('sendTestForm');
    const commentTextarea = document.getElementById('comment');
    const charCount = document.querySelector('.char-count');
    const sendMethodRadios = document.querySelectorAll('input[name="sendMethod"]');
    const emailGroup = document.getElementById('emailGroup');
    const pageTitle = document.getElementById('page-title');

    const sectionTitles = {
        'overview': 'Обзор',
        'send-test': 'Отправить тест',
        'results': 'Результаты тестов',
        'tariffs': 'Тарифы и оплата',
        'referral': 'Реферальная программа',
        'learning': 'Обучение'
    };

    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const targetSection = this.getAttribute('data-section');
            
            navItems.forEach(nav => nav.classList.remove('active'));
            sections.forEach(section => section.classList.remove('active'));
            
            this.classList.add('active');
            document.getElementById(targetSection).classList.add('active');
            
            if (pageTitle && sectionTitles[targetSection]) {
                pageTitle.textContent = sectionTitles[targetSection];
            }
        });
    });

    sendMethodRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            if (this.value === 'email') {
                emailGroup.style.display = 'block';
                document.getElementById('candidateEmail').required = true;
            } else {
                emailGroup.style.display = 'none';
                document.getElementById('candidateEmail').required = false;
            }
        });
    });

    commentTextarea.addEventListener('input', function() {
        const length = this.value.length;
        charCount.textContent = `${length}/500`;
        
        if (length > 450) {
            charCount.style.color = '#dc3545';
        } else if (length > 400) {
            charCount.style.color = '#ffc107';
        } else {
            charCount.style.color = '#666';
        }
    });

    sendTestForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        if (!validateSendTestForm(data)) {
            return;
        }
        
        if (data.sendMethod === 'link') {
            generateTestLink(data);
        } else {
            sendTestEmail(data);
        }
    });

    function validateSendTestForm(data) {
        if (!data.profession) {
            showNotification('Выберите профессию', 'error');
            return false;
        }
        
        if (data.sendMethod === 'email' && !data.candidateEmail) {
            showNotification('Введите email кандидата', 'error');
            return false;
        }
        
        if (data.sendMethod === 'email' && !isValidEmail(data.candidateEmail)) {
            showNotification('Введите корректный email', 'error');
            return false;
        }
        
        return true;
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function generateTestLink(data) {
        const testLink = `https://dreamteam.com/test/${generateRandomId()}`;
        document.getElementById('testLink').value = testLink;
        document.getElementById('generatedLink').style.display = 'block';
        showNotification('Ссылка сгенерирована успешно', 'success');
    }

    function sendTestEmail(data) {
        showNotification('Приглашение отправлено на email', 'success');
    }

    function generateRandomId() {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
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

function copyLink() {
    const linkInput = document.getElementById('testLink');
    linkInput.select();
    document.execCommand('copy');
    showNotification('Ссылка скопирована в буфер обмена', 'success');
}

function copyReferralLink() {
    const linkInput = document.querySelector('.referral-link-section input');
    linkInput.select();
    document.execCommand('copy');
    showNotification('Реферальная ссылка скопирована', 'success');
}

function viewReport(id) {
    window.open(`report.html?id=${id}`, '_blank');
}

function downloadPDF(id) {
    showNotification('PDF отчёт скачивается...', 'success');
}

function showPackages() {
    const packagesGrid = document.getElementById('packagesGrid');
    packagesGrid.style.display = packagesGrid.style.display === 'none' ? 'grid' : 'none';
}

function buyPackage(type) {
    const packages = {
        basic: { name: 'Базовый', price: '500 ₽', tests: 10 },
        standard: { name: 'Стандарт', price: '1200 ₽', tests: 30 },
        premium: { name: 'Премиум', price: '2000 ₽', tests: 60 }
    };
    
    const package = packages[type];
    showNotification(`Переход к оплате пакета "${package.name}"`, 'success');
    setTimeout(() => {
        window.location.href = `payment.html?package=${type}`;
    }, 1000);
}

function share(platform) {
    const referralLink = 'https://dreamteam.com/ref/IVAN123';
    const message = 'Присоединяйтесь к DreamTeam! Используйте мою реферальную ссылку для получения бонусов.';
    
    let shareUrl = '';
    
    switch(platform) {
        case 'telegram':
            shareUrl = `https://t.me/share/url?url=${encodeURIComponent(referralLink)}&text=${encodeURIComponent(message)}`;
            break;
        case 'whatsapp':
            shareUrl = `https://wa.me/?text=${encodeURIComponent(message + ' ' + referralLink)}`;
            break;
        case 'email':
            shareUrl = `mailto:?subject=Приглашение в DreamTeam&body=${encodeURIComponent(message + '\n\n' + referralLink)}`;
            break;
    }
    
    if (shareUrl) {
        window.open(shareUrl, '_blank');
        showNotification(`Поделились в ${platform}`, 'success');
    }
}

function openGuide() {
    showNotification('Открытие гайда по интерпретации тестов', 'success');
}

function openExamples() {
    showNotification('Открытие примеров интерпретации', 'success');
}

function openVideo() {
    showNotification('Открытие видео-инструкции', 'success');
}

function openFAQ() {
    showNotification('Открытие FAQ', 'success');
}

function logout() {
    if (confirm('Вы уверены, что хотите выйти?')) {
        window.location.href = 'index.html';
    }
}

function showNotification(message, type) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.className = `notification ${type} show`;
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}
