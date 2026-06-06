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

// screen state
const STORAGE_KEY = 'quizState_v1';
const state = { screen: 'start', currentIndex: 0, score: 0 };

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
};

const quitQuiz = () => {
    let response = confirm("Are you sure you want to quit? Your progress won't be saved");

    if (response) {
        startScreen.classList.remove('hidden-screen');
        startScreen.classList.add('show-screen');
        quizScreen.classList.remove('show-screen');
        quizScreen.classList.add('hidden-screen');
    }
};

startButton.addEventListener('click', startQuiz);
quitButton.addEventListener('click', quitQuiz);

loadScreen();