document.addEventListener('DOMContentLoaded', function() {
    drawCharts();
});

function drawCharts() {
    drawRadarChart();
    drawBarChart();
}

function drawRadarChart() {
    const canvas = document.getElementById('radarCanvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = 300;
    canvas.height = 300;
    
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 100;
    
    const categories = ['Ответственность', 'Командная работа', 'Адаптивность', 'Планирование', 'Результативность'];
    const values = [85, 78, 82, 90, 88];
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const angleStep = (2 * Math.PI) / categories.length;
    
    ctx.strokeStyle = '#e1e5e9';
    ctx.lineWidth = 1;
    
    for (let i = 1; i <= 5; i++) {
        const currentRadius = (radius / 5) * i;
        ctx.beginPath();
        for (let j = 0; j < categories.length; j++) {
            const angle = j * angleStep - Math.PI / 2;
            const x = centerX + Math.cos(angle) * currentRadius;
            const y = centerY + Math.sin(angle) * currentRadius;
            
            if (j === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }
        ctx.closePath();
        ctx.stroke();
    }
    
    ctx.strokeStyle = '#015340';
    ctx.lineWidth = 3;
    ctx.fillStyle = 'rgba(1, 83, 64, 0.2)';
    
    ctx.beginPath();
    for (let i = 0; i < categories.length; i++) {
        const angle = i * angleStep - Math.PI / 2;
        const value = values[i] / 100;
        const x = centerX + Math.cos(angle) * radius * value;
        const y = centerY + Math.sin(angle) * radius * value;
        
        if (i === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    }
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    
    ctx.fillStyle = '#015340';
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    
    for (let i = 0; i < categories.length; i++) {
        const angle = i * angleStep - Math.PI / 2;
        const x = centerX + Math.cos(angle) * (radius + 20);
        const y = centerY + Math.sin(angle) * (radius + 20);
        
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(angle + Math.PI / 2);
        ctx.fillText(categories[i], 0, 0);
        ctx.restore();
    }
}

function drawBarChart() {
    const canvas = document.getElementById('barCanvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = 300;
    canvas.height = 300;
    
    const categories = ['Ответственность', 'Командная работа', 'Адаптивность', 'Планирование', 'Результативность'];
    const values = [85, 78, 82, 90, 88];
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const barWidth = 40;
    const barSpacing = 10;
    const maxValue = 100;
    const chartHeight = 200;
    const startX = 30;
    const startY = 250;
    
    ctx.fillStyle = '#015340';
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    
    for (let i = 0; i < categories.length; i++) {
        const x = startX + i * (barWidth + barSpacing);
        const barHeight = (values[i] / maxValue) * chartHeight;
        const y = startY - barHeight;
        
        ctx.fillRect(x, y, barWidth, barHeight);
        
        ctx.fillStyle = '#333';
        ctx.fillText(values[i] + '%', x + barWidth / 2, y - 5);
        ctx.fillStyle = '#015340';
        
        ctx.save();
        ctx.translate(x + barWidth / 2, startY + 10);
        ctx.rotate(-Math.PI / 4);
        ctx.fillText(categories[i], 0, 0);
        ctx.restore();
    }
}

function downloadPDF() {
    alert('Функция скачивания PDF будет реализована в полной версии');
}

function addToFavorites() {
    const button = event.target;
    if (button.textContent.includes('Добавить')) {
        button.innerHTML = '⭐ Убрать из избранного';
        button.style.background = '#6c757d';
        alert('Кандидат добавлен в избранное');
    } else {
        button.innerHTML = '⭐ Добавить в избранное';
        button.style.background = '#015340';
        alert('Кандидат убран из избранного');
    }
}

function updateStatus() {
    const selectedStatuses = [];
    const checkboxes = document.querySelectorAll('input[name="status"]:checked');
    
    checkboxes.forEach(checkbox => {
        selectedStatuses.push(checkbox.value);
    });
    
    if (selectedStatuses.length === 0) {
        alert('Выберите хотя бы один статус');
        return;
    }
    
    const statusNames = {
        'team': 'В команде',
        'probation': 'На испытательном сроке',
        'reserve': 'В резерве',
        'fired': 'Уволен',
        'rejected': 'Не принят'
    };
    
    const statusText = selectedStatuses.map(status => statusNames[status]).join(', ');
    alert(`Статус обновлен: ${statusText}`);
}

function logout() {
    if (confirm('Вы уверены, что хотите выйти?')) {
        window.location.href = 'index.html';
    }
}
