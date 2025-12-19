document.addEventListener("DOMContentLoaded", () => {

const quiz = [
  {
    question: "What is the capital of India?",
    options: ["Delhi", "Mumbai", "Kolkata", "Chennai"],
    answer: 1
  },
  {
    question: "Which language runs in the browser?",
    options: ["Java", "C", "Python", "JavaScript"],
    answer: 4
  },
  {
    question: "What is the currency of Macau called?",
    options: ["Ruble", "Pataca", "Dirham", "Dollar"],
    answer: 2
  },
  {
    question: "When did Salt Satyagraha take place?",
    options: ["1935", "1930", "1940", "1942"],
    answer: 2
  },
  {
    question: "Which company developed JavaScript?",
    options: ["Microsoft", "Netscape", "Google", "Oracle"],
    answer: 2
  },
  {
    question: "Who wrote the Indian national anthem?",
    options: ["Bankim Chandra Chatarji", "Lal Bahadur Sastri", "Rabindranath Taigore", "Lala Lajpat Ray"],
    answer: 3
  },
  {
    question:"Who invented the telephone?",
    options: ["Edison", "Alexander Graham Bell", "Charls Babbage", "Charles Barkley"],
    answer: 2
  }
];

let currentQuestion = 0;
let score = 0;
let attempts = 1;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");
const resultDiv = document.getElementById("result");
const scoreEl = document.getElementById("score");
const percentageEl = document.getElementById("percentage");
const gradeEl = document.getElementById("grade");
const replayBtn = document.getElementById("replay-btn");
const progressEl = document.getElementById("progress");

function showQuestion() {
    const q = quiz[currentQuestion];
    questionEl.textContent = q.question;
    progressEl.textContent = `Question ${currentQuestion + 1} of ${quiz.length}`;
    optionsEl.innerHTML = "";
    nextBtn.style.display = "none";

    q.options.forEach((opt, index) => {
        const btn = document.createElement("button");
        btn.textContent = opt;
        btn.className = "option-btn";
        btn.onclick = () => checkAnswer(btn, index + 1);
        optionsEl.appendChild(btn);
    });
}

function checkAnswer(btn, selected) {
    const correct = quiz[currentQuestion].answer;

    [...optionsEl.children].forEach(b => b.disabled = true);

    if (selected === correct) {
        btn.classList.add("correct");
        score++;
    } else {
        btn.classList.add("wrong");
        optionsEl.children[correct - 1].classList.add("correct");
    }

    nextBtn.style.display = "block";
}

nextBtn.onclick = () => {
    currentQuestion++;
    if (currentQuestion < quiz.length) {
        showQuestion();
    } else {
        showResult();
    }
};

function showResult() {
    document.getElementById("quiz-container").style.display = "none";
    resultDiv.style.display = "block";

    scoreEl.textContent = `Score: ${score} / ${quiz.length}`;
    const percentage = (score / quiz.length) * 100;
    percentageEl.textContent = `Percentage: ${percentage}%`;

    let grade = percentage >= 90 ? "A+" :
                percentage >= 75 ? "A" :
                percentage >= 50 ? "B" : "C";

    gradeEl.textContent = `Grade: ${grade}`;
  document.getElementById("attempts").textContent =
  `Attempt: ${attempts}`;
}

replayBtn.onclick = () => {
    currentQuestion = 0;
    score = 0;
    attempts++;
    resultDiv.style.display = "none";
    document.getElementById("quiz-container").style.display = "block";
    showQuestion();
};

showQuestion();

});


