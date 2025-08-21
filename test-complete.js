document.addEventListener('DOMContentLoaded', function() {
    loadTestResults();
});

function loadTestResults() {
    const results = JSON.parse(localStorage.getItem('testResults'));
    
    if (!results) {
        showDemoResults();
        return;
    }
    
    document.getElementById('answeredQuestions').textContent = results.answeredQuestions;
    document.getElementById('totalQuestions').textContent = results.totalQuestions;
    document.getElementById('completionRate').textContent = results.completionRate + '%';
    
    const minutes = Math.floor(results.timeSpent / 60);
    const seconds = results.timeSpent % 60;
    const timeString = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    document.getElementById('timeSpent').textContent = timeString;
    
    localStorage.removeItem('testResults');
}

function showDemoResults() {
    document.getElementById('answeredQuestions').textContent = '18';
    document.getElementById('totalQuestions').textContent = '20';
    document.getElementById('completionRate').textContent = '90%';
    document.getElementById('timeSpent').textContent = '45:30';
    
    const completionMessage = document.querySelector('.completion-message');
    if (completionMessage) {
        completionMessage.innerHTML = `
            <p><strong>Демо-режим:</strong> Это пример страницы завершения теста.</p>
            <p>Ваши результаты будут обработаны и отправлены работодателю. Обычно это занимает несколько минут.</p>
            <p>Вы можете закрыть эту страницу.</p>
        `;
    }
}

function closeWindow() {
    window.close();
    
    if (!window.closed) {
        window.location.href = 'index.html';
    }
}
