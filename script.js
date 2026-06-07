// SCREENS
const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');

// startScreen assets
const startButton = document.getElementById('start-button');

// quizScreen assets
const quitButton = document.getElementById('quit-button');
const quizQuestion = document.getElementById('quiz-question');
const currentQuestion = document.getElementById('current-question');
const totalQuestions = document.getElementById('total-questions');
const currentScore = document.getElementById('current-score');
const progressBar = document.getElementById('progress-bar');
const progressFill = document.getElementById('progress-fill');
const answersContainer = document.getElementById('answers');

// screen state
const STORAGE_KEY = 'quizState_v1';
const state = { screen: 'start', currentIndex: 0, score: 0 };

// example questions
const questions = [
    {
        question: "What is the capital of France?",
        answers: ["London", "Berlin", "Paris", "Madrid"],
        correct: "Paris"
    },
    {
        question: "What is 2 + 2?",
        answers: ["3", "4", "5", "6"],
        correct: "4"
    }
];

const loadScreen = () => {
    const storage = localStorage.getItem(STORAGE_KEY);
    let currentScreen = {};

    try {
        currentScreen = storage ? JSON.parse(storage) : {};
    } catch (error) {
        alert(`Error: ${error}`);
    }

    if (currentScreen.screen === 'quiz') {
        startScreen.classList.add('hidden-screen');
        startScreen.classList.remove('show-screen')
        quizScreen.classList.add('show-screen');
        quizScreen.classList.remove('hidden-screen');
        renderQuestionAssets(questions[state.currentIndex]);
    } else {
        startScreen.classList.remove('hidden-screen');
        startScreen.classList.add('show-screen');
        quizScreen.classList.remove('show-screen');
        quizScreen.classList.add('hidden-screen');
    }
};

const startQuiz = () => {
    startScreen.classList.add('hidden-screen');
    startScreen.classList.remove('show-screen')
    quizScreen.classList.add('show-screen');
    quizScreen.classList.remove('hidden-screen');
    const storage = localStorage.getItem(STORAGE_KEY);
    let currentScreen = {};

    try {
        currentScreen = storage ? JSON.parse(storage) : {};
    } catch (error) {
        alert(`Error: ${error}`);
    }

    currentScreen.screen = 'quiz';
    state.screen = 'quiz';
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    renderQuestionAssets(questions[state.currentIndex]);
};

const quitQuiz = () => {
    let response = confirm("Are you sure you want to quit? Your progress won't be saved");

    if (response) {
        startScreen.classList.remove('hidden-screen');
        startScreen.classList.add('show-screen');
        quizScreen.classList.remove('show-screen');
        quizScreen.classList.add('hidden-screen');
        const storage = localStorage.getItem(STORAGE_KEY);
        let currentScreen = {};

        try {
            currentScreen = storage ? JSON.parse(storage) : {};
        } catch (error) {
            alert(`Error: ${error}`);
        }

        currentScreen.screen = 'start';
        state.screen = 'start';
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }
};

const renderQuestionAssets = (questionObj) => {
    const { question, answers, correct } = questionObj;
    answersContainer.replaceChildren();
    quizQuestion.replaceChildren();

    quizQuestion.append(question);

    answers.forEach(answer => {
        const answerButton = document.createElement('button');
        answerButton.textContent = answer;
        answerButton.className = 'answer-button';
        answersContainer.append(answerButton);
    });
};


startButton.addEventListener('click', startQuiz);
quitButton.addEventListener('click', quitQuiz);

loadScreen();