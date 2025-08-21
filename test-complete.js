document.addEventListener('DOMContentLoaded', function() {
    loadTestResults();
});

function loadTestResults() {
    const results = JSON.parse(localStorage.getItem('testResults'));
    
    if (!results) {
        window.location.href = 'index.html';
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

function closeWindow() {
    window.close();
    
    if (!window.closed) {
        window.location.href = 'index.html';
    }
}
