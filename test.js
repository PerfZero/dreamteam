let currentQuestionIndex = 0;
let answers = {};
let timeLeft = 60 * 60;
let timerInterval;
let windowSwitchCount = 0;
let testSubmitted = false;

const questions = [
    {
        id: 1,
        text: "Как вы обычно реагируете на критику в свой адрес?",
        options: [
            "Принимаю критику конструктивно и стараюсь извлечь уроки",
            "Стараюсь не обращать внимания на критику",
            "Обижаюсь и долго переживаю",
            "Сразу начинаю оправдываться"
        ]
    },
    {
        id: 2,
        text: "В стрессовой ситуации вы обычно:",
        options: [
            "Анализирую ситуацию и ищу решение",
            "Паникую и не могу сосредоточиться",
            "Обращаюсь за помощью к коллегам",
            "Стараюсь избежать решения проблемы"
        ]
    },
    {
        id: 3,
        text: "Как вы относитесь к работе в команде?",
        options: [
            "Предпочитаю работать самостоятельно",
            "Люблю командную работу и легко нахожу общий язык",
            "Работаю в команде, но предпочитаю лидерство",
            "Избегаю командной работы"
        ]
    },
    {
        id: 4,
        text: "При возникновении конфликта с коллегой вы:",
        options: [
            "Стараюсь найти компромисс",
            "Избегаю конфликта любой ценой",
            "Отстаиваю свою позицию до конца",
            "Обращаюсь к руководству"
        ]
    },
    {
        id: 5,
        text: "Как вы планируете свое рабочее время?",
        options: [
            "Составляю детальный план на день",
            "Работаю по настроению",
            "Планирую только важные задачи",
            "Не планирую вообще"
        ]
    },
    {
        id: 6,
        text: "При выполнении сложной задачи вы:",
        options: [
            "Разбиваю на этапы и выполняю последовательно",
            "Стараюсь сделать все сразу",
            "Откладываю до последнего момента",
            "Прошу помощи у коллег"
        ]
    },
    {
        id: 7,
        text: "Как вы относитесь к новым технологиям?",
        options: [
            "С интересом изучаю и внедряю",
            "Использую только проверенные методы",
            "Избегаю новшеств",
            "Не интересуюсь технологиями"
        ]
    },
    {
        id: 8,
        text: "В случае ошибки в работе вы:",
        options: [
            "Признаю ошибку и исправляю",
            "Стараюсь скрыть ошибку",
            "Виню обстоятельства",
            "Перекладываю вину на других"
        ]
    },
    {
        id: 9,
        text: "Как вы относитесь к дополнительной нагрузке?",
        options: [
            "Готов взять на себя ответственность",
            "Выполню, если попросят",
            "Стараюсь избежать",
            "Отказываюсь категорически"
        ]
    },
    {
        id: 10,
        text: "При достижении цели вы:",
        options: [
            "Ставлю новые цели",
            "Доволен достигнутым",
            "Расслабляюсь и отдыхаю",
            "Не задумываюсь о будущем"
        ]
    },
    {
        id: 11,
        text: "Как вы принимаете решения?",
        options: [
            "Анализирую все варианты и последствия",
            "Действую интуитивно",
            "Консультируюсь с коллегами",
            "Избегаю принятия решений"
        ]
    },
    {
        id: 12,
        text: "В незнакомой ситуации вы:",
        options: [
            "Изучаю правила и адаптируюсь",
            "Действую по аналогии с прошлым опытом",
            "Жду указаний от руководства",
            "Чувствую себя неуверенно"
        ]
    },
    {
        id: 13,
        text: "Как вы относитесь к обучению?",
        options: [
            "Постоянно развиваюсь и учусь",
            "Учусь только при необходимости",
            "Предпочитаю работать с тем, что знаю",
            "Не люблю учиться"
        ]
    },
    {
        id: 14,
        text: "При работе с клиентами вы:",
        options: [
            "Стараюсь понять потребности и помочь",
            "Выполняю только то, что просят",
            "Избегаю общения с клиентами",
            "Отношусь формально"
        ]
    },
    {
        id: 15,
        text: "Как вы относитесь к изменениям в работе?",
        options: [
            "Воспринимаю как возможность развития",
            "Адаптируюсь постепенно",
            "Сопротивляюсь изменениям",
            "Увольняюсь при серьезных изменениях"
        ]
    },
    {
        id: 16,
        text: "При возникновении проблем вы:",
        options: [
            "Ищу причину и решение",
            "Жалуетесь коллегам",
            "Ждете, что проблема решится сама",
            "Уходите от проблемы"
        ]
    },
    {
        id: 17,
        text: "Как вы относитесь к ответственности?",
        options: [
            "Готов нести ответственность за свои решения",
            "Беру ответственность только за свою работу",
            "Стараюсь избежать ответственности",
            "Перекладываю на других"
        ]
    },
    {
        id: 18,
        text: "В команде вы обычно:",
        options: [
            "Лидер и организатор",
            "Исполнитель",
            "Консультант и помощник",
            "Наблюдатель"
        ]
    },
    {
        id: 19,
        text: "Как вы относитесь к риску?",
        options: [
            "Готов идти на обоснованный риск",
            "Предпочитаю проверенные пути",
            "Избегаю риска любой ценой",
            "Действую импульсивно"
        ]
    },
    {
        id: 20,
        text: "При достижении успеха вы:",
        options: [
            "Делитесь опытом с коллегами",
            "Гордитесь достижением",
            "Считаете это нормой",
            "Не придаете значения"
        ]
    }
];

document.addEventListener('DOMContentLoaded', function() {
    initializeTest();
    startTimer();
    setupAntiCheating();
    preventCopyPaste();
    preventBrowserNavigation();
});

function initializeTest() {
    document.getElementById('totalQuestions').textContent = questions.length;
    createQuestionIndicators();
    loadQuestion(0);
}

function createQuestionIndicators() {
    const grid = document.getElementById('indicatorsGrid');
    grid.innerHTML = '';
    
    questions.forEach((question, index) => {
        const indicator = document.createElement('div');
        indicator.className = 'question-indicator';
        indicator.textContent = index + 1;
        indicator.onclick = () => goToQuestion(index);
        grid.appendChild(indicator);
    });
}

function loadQuestion(index) {
    if (index < 0 || index >= questions.length) return;
    
    currentQuestionIndex = index;
    const question = questions[index];
    
    document.getElementById('questionText').textContent = question.text;
    document.getElementById('currentQuestion').textContent = index + 1;
    
    const answersContainer = document.getElementById('answersContainer');
    answersContainer.innerHTML = '';
    
    question.options.forEach((option, optionIndex) => {
        const answerDiv = document.createElement('div');
        answerDiv.className = 'answer-option';
        if (answers[index] === optionIndex) {
            answerDiv.classList.add('selected');
        }
        
        answerDiv.innerHTML = `
            <input type="radio" name="question${index}" value="${optionIndex}" 
                   ${answers[index] === optionIndex ? 'checked' : ''}>
            <span class="answer-text">${option}</span>
        `;
        
        answerDiv.onclick = () => selectAnswer(index, optionIndex);
        answersContainer.appendChild(answerDiv);
    });
    
    updateNavigationButtons();
    updateQuestionIndicators();
}

function selectAnswer(questionIndex, answerIndex) {
    answers[questionIndex] = answerIndex;
    
    const answerOptions = document.querySelectorAll('.answer-option');
    answerOptions.forEach((option, index) => {
        option.classList.remove('selected');
        const radio = option.querySelector('input[type="radio"]');
        if (index === answerIndex) {
            option.classList.add('selected');
            radio.checked = true;
        } else {
            radio.checked = false;
        }
    });
    
    updateQuestionIndicators();
}

function updateNavigationButtons() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const submitBtn = document.getElementById('submitBtn');
    
    prevBtn.disabled = currentQuestionIndex === 0;
    
    if (currentQuestionIndex === questions.length - 1) {
        nextBtn.style.display = 'none';
        submitBtn.style.display = 'block';
    } else {
        nextBtn.style.display = 'block';
        submitBtn.style.display = 'none';
    }
}

function updateQuestionIndicators() {
    const indicators = document.querySelectorAll('.question-indicator');
    
    indicators.forEach((indicator, index) => {
        indicator.classList.remove('current', 'answered', 'skipped');
        
        if (index === currentQuestionIndex) {
            indicator.classList.add('current');
        } else if (answers[index] !== undefined) {
            indicator.classList.add('answered');
        } else {
            indicator.classList.add('skipped');
        }
    });
}

function previousQuestion() {
    if (currentQuestionIndex > 0) {
        loadQuestion(currentQuestionIndex - 1);
    }
}

function nextQuestion() {
    if (currentQuestionIndex < questions.length - 1) {
        loadQuestion(currentQuestionIndex + 1);
    }
}

function goToQuestion(index) {
    loadQuestion(index);
}

function startTimer() {
    timerInterval = setInterval(() => {
        timeLeft--;
        
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        document.getElementById('timer').textContent = timeString;
        
        const timerDisplay = document.getElementById('timer');
        if (timeLeft <= 300) {
            timerDisplay.className = 'timer-display danger';
        } else if (timeLeft <= 600) {
            timerDisplay.className = 'timer-display warning';
        }
        
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            autoSubmitTest();
        }
    }, 1000);
}

function setupAntiCheating() {
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            windowSwitchCount++;
            if (windowSwitchCount === 1) {
                showWarning();
            } else if (windowSwitchCount >= 2) {
                autoSubmitTest();
            }
        }
    });
    
    window.addEventListener('blur', function() {
        windowSwitchCount++;
        if (windowSwitchCount === 1) {
            showWarning();
        } else if (windowSwitchCount >= 2) {
            autoSubmitTest();
        }
    });
}

function showWarning() {
    document.getElementById('warningModal').style.display = 'flex';
}

function closeWarning() {
    document.getElementById('warningModal').style.display = 'none';
}

function preventCopyPaste() {
    document.addEventListener('copy', function(e) {
        e.preventDefault();
        return false;
    });
    
    document.addEventListener('paste', function(e) {
        e.preventDefault();
        return false;
    });
    
    document.addEventListener('cut', function(e) {
        e.preventDefault();
        return false;
    });
    
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        return false;
    });
}

function preventBrowserNavigation() {
    window.addEventListener('beforeunload', function(e) {
        if (!testSubmitted) {
            e.preventDefault();
            e.returnValue = '';
        }
    });
    
    window.addEventListener('popstate', function(e) {
        e.preventDefault();
        history.pushState(null, null, window.location.href);
    });
    
    history.pushState(null, null, window.location.href);
}

function submitTest() {
    document.getElementById('submitModal').style.display = 'flex';
}

function closeSubmitModal() {
    document.getElementById('submitModal').style.display = 'none';
}

function confirmSubmit() {
    testSubmitted = true;
    clearInterval(timerInterval);
    
    const answeredQuestions = Object.keys(answers).length;
    const totalQuestions = questions.length;
    
    if (answeredQuestions < totalQuestions) {
        if (!confirm(`Вы ответили на ${answeredQuestions} из ${totalQuestions} вопросов. Продолжить сдачу теста?`)) {
            closeSubmitModal();
            return;
        }
    }
    
    processTestResults();
}

function autoSubmitTest() {
    testSubmitted = true;
    clearInterval(timerInterval);
    processTestResults();
}

function processTestResults() {
    const answeredQuestions = Object.keys(answers).length;
    const totalQuestions = questions.length;
    const completionRate = Math.round((answeredQuestions / totalQuestions) * 100);
    
    const results = {
        totalQuestions: totalQuestions,
        answeredQuestions: answeredQuestions,
        completionRate: completionRate,
        answers: answers,
        timeSpent: 60 * 60 - timeLeft,
        windowSwitches: windowSwitchCount
    };
    
    localStorage.setItem('testResults', JSON.stringify(results));
    
    window.location.href = 'test-complete.html';
}
