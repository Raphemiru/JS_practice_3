// SCREENS
const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');

// startScreen assets
const startButton = document.getElementById('start-button');

// quizScreen assets
const countDownTimerContainer = document.getElementById('countdown-timer-container');
const countDownTimer = document.getElementById('countdown-timer');
const countDownText = document.getElementById('countdown-text');
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
    },
    {
        question: "Which planet is closest to the sun?",
        answers: ["Venus", "Earth", "Mars", "Mercury"],
        correct: "Mercury"
    },
    {
        question: "What color is the sky?",
        answers: ["Green", "Blue", "Red", "Yellow"],
        correct: "Blue"
    },
    {
        question: "How many sides does a triangle have?",
        answers: ["2", "3", "4", "5"],
        correct: "3"
    }
];

const loadScreen = () => {
    countDownTimerContainer.classList.add('hidden-screen');
    countDownTimerContainer.classList.remove('show-screen');
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
    countDownTimerContainer.classList.add('hidden-screen');
    countDownTimerContainer.classList.remove('show-screen');
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

const answerButton = (event) => {
    const correct = questions[state.currentIndex].correct;
    const answer = event.target.textContent;
    const isCorrect = answer === correct;

    const allAnswerButtons = answersContainer.querySelectorAll('.answer-button');

    allAnswerButtons.forEach(button => {
        button.disabled = true;
        if (button === event.target && isCorrect || button.textContent === correct) {
            button.classList.add('correct');
        } else {
            button.classList.add('wrong');
        }
    });

    nextQuestion(isCorrect);
};


const nextQuestion = (isCorrect) => {
    if (!isCorrect) {
        currentScore.textContent = state.score
    } else {
        state.score++
        currentScore.textContent = state.score
    }

    countDownTimerContainer.classList.add('show-screen');
    countDownTimerContainer.classList.remove('remove-screen');

    const progressPercent = ((state.currentIndex + 1) / questions.length) * 100;
    progressFill.style.width = `${progressPercent}%`;

    let secondsLeft = 3;

    const timer = setInterval(() => {
        secondsLeft--;
        countDownTimer.textContent = secondsLeft;

        if (secondsLeft <= 0) {
            state.currentIndex++
            countDownTimerContainer.classList.add('remove-screen');
            countDownTimerContainer.classList.remove('show-screen');
            if (state.currentIndex < questions.length) {
                renderQuestionAssets(questions[state.currentIndex]);
                currentQuestion.textContent = state.currentIndex + 1
            } else {
                alert(`Quiz complete! Final score: ${state.score}/${questions.length}`);
            }
            clearInterval(timer);
        }
    }, 1000);
};



answersContainer.addEventListener('click', answerButton);
startButton.addEventListener('click', startQuiz);
quitButton.addEventListener('click', quitQuiz);


loadScreen();