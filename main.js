const questions = [
    {
        question: 'What is the capital of France?',
        answers: [
            { text: 'Paris', correct: true },
            { text: 'London', correct: false },
            { text: 'Berlin', correct: false },
            { text: 'Madrid', correct: false }
        ]
    },
    {
        question: 'Who is the CEO of Tesla?',
        answers: [
            { text: 'Jeff Bezos', correct: false },
            { text: 'Elon Musk', correct: true },
            { text: 'Bill Gates', correct: false },
            { text: 'Steve Jobs', correct: false }
        ]
    },
    {
        question: 'What is the largest planet in our solar system?',
        answers: [
            { text: 'Earth', correct: false },
            { text: 'Jupiter', correct: true },
            { text: 'Mars', correct: false },
            { text: 'Saturn', correct: false }
        ]
    },
    {
        question: 'What is the boiling point of water?',
        answers: [
            { text: '90°C', correct: false },
            { text: '100°C', correct: true },
            { text: '110°C', correct: false },
            { text: '120°C', correct: false }
        ]
    },
    {
        question: 'Who wrote "To Kill a Mockingbird"?',
        answers: [
            { text: 'Mark Twain', correct: false },
            { text: 'Harper Lee', correct: true },
            { text: 'F. Scott Fitzgerald', correct: false },
            { text: 'Ernest Hemingway', correct: false }
        ]
    },
    {
        question: 'What is the capital of Japan?',
        answers: [
            { text: 'Beijing', correct: false },
            { text: 'Seoul', correct: false },
            { text: 'Tokyo', correct: true },
            { text: 'Bangkok', correct: false }
        ]
    },
];

const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');
const prevButton = document.getElementById('prev-btn');

let currentQuestionIndex = 0;
let userAnswers = new Array(questions.length).fill(null);

function startQuiz() {
    currentQuestionIndex = 0;
    userAnswers.fill(null);
    showQuestion(questions[currentQuestionIndex]);
    updateButtons();
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    answerButtonsElement.innerHTML = '';
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        if (userAnswers[currentQuestionIndex] === answer.text) {
            button.classList.add('selected');
        }
        answerButtonsElement.appendChild(button);
    });
}

function selectAnswer(e) {
    const selectedButton = e.target;
    userAnswers[currentQuestionIndex] = selectedButton.innerText;
    Array.from(answerButtonsElement.children).forEach(button => {
        button.classList.remove('selected');
    });
    selectedButton.classList.add('selected');
}

function updateButtons() {
    if (currentQuestionIndex === 0) {
        prevButton.classList.add('hide');
    } else {
        prevButton.classList.remove('hide');
    }

    if (currentQuestionIndex === questions.length - 1) {
        nextButton.innerText = 'Submit';
    } else {
        nextButton.innerText = 'Next';
    }
}

function handleNextButton() {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        showQuestion(questions[currentQuestionIndex]);
        updateButtons();
    } else {
        showResults();
    }
}

function handlePrevButton() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        showQuestion(questions[currentQuestionIndex]);
        updateButtons();
    }
}

function showResults() {
    const score = userAnswers.reduce((acc, answer, index) => {
        if (answer && questions[index].answers.find(a => a.text === answer).correct) {
            return acc + 1;
        }
        return acc;
    }, 0);

    questionElement.innerText = `You scored ${score} out of ${questions.length}`;
    answerButtonsElement.innerHTML = '';
    nextButton.innerText = 'Restart';
    prevButton.classList.add('hide');
}

nextButton.addEventListener('click', () => {
    if (nextButton.innerText === 'Restart') {
        startQuiz();
    } else {
        handleNextButton();
    }
});

prevButton.addEventListener('click', handlePrevButton);

startQuiz();