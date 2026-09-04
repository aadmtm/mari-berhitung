const questions = [
  { question: "2 + 1 = ?", answer: 3, choices: [5, 2, 3, 4] },
  { question: "3 + 2 = ?", answer: 5, choices: [6, 5, 3, 4] },
  { question: "3 + 3 = ?", answer: 6, choices: [6, 5, 3, 4] },
  { question: "5 + 2 = ?", answer: 7, choices: [6, 5, 7, 4] },
  { question: "2 + 4 = ?", answer: 6, choices: [6, 5, 1, 4] },
  { question: "3 + 3 = ?", answer: 6, choices: [6, 5, 3, 4] },
  { question: "2 + 1 = ?", answer: 3, choices: [5, 2, 3, 4] },
  { question: "3 + 2 = ?", answer: 5, choices: [6, 5, 3, 4] },
  { question: "3 + 3 = ?", answer: 6, choices: [6, 5, 3, 4] },
  { question: "5 + 2 = ?", answer: 7, choices: [6, 5, 7, 4] },
  { question: "2 + 4 = ?", answer: 6, choices: [6, 5, 1, 4] },
  { question: "3 + 3 = ?", answer: 6, choices: [6, 5, 3, 4] },
];

const QUESTION_TIME = 10;
const POINTS_PER_CORRECT_ANSWER = 5;
const TIMER_CIRCUMFERENCE = 213.63;

const screens = {
  start: document.querySelector("#start-screen"),
  quiz: document.querySelector("#quiz-screen"),
  result: document.querySelector("#result-screen"),
};

const elements = {
  startButton: document.querySelector("#start-button"),
  restartButton: document.querySelector("#restart-button"),
  homeButton: document.querySelector("#home-button"),
  resultHomeButton: document.querySelector("#result-home-button"),
  bestScoreStart: document.querySelector("#best-score-start"),
  bestScoreResult: document.querySelector("#best-score-result"),
  questionNumber: document.querySelector("#question-number"),
  questionText: document.querySelector("#question-text"),
  progressBar: document.querySelector("#progress-bar"),
  progressTrack: document.querySelector(".progress-track"),
  currentScore: document.querySelector("#current-score"),
  answers: document.querySelector("#answers"),
  feedback: document.querySelector("#feedback"),
  timer: document.querySelector("#timer"),
  timerValue: document.querySelector("#timer-value"),
  timerProgress: document.querySelector("#timer-progress"),
  finalScore: document.querySelector("#final-score"),
  correctCount: document.querySelector("#correct-count"),
  resultTitle: document.querySelector("#result-title"),
  resultMessage: document.querySelector("#result-message"),
  resultBadge: document.querySelector("#result-badge"),
};

let currentQuestionIndex = 0;
let score = 0;
let correctAnswers = 0;
let timeLeft = QUESTION_TIME;
let timerInterval = null;
let nextQuestionTimeout = null;
let isAnswerLocked = false;

function getBestScore() {
  try {
    return Number(localStorage.getItem("petualangan-matematika-best")) || 0;
  } catch {
    return 0;
  }
}

function saveBestScore(value) {
  try {
    localStorage.setItem("petualangan-matematika-best", String(value));
  } catch {
    // Permainan tetap berjalan bila penyimpanan browser tidak tersedia.
  }
}

function updateBestScoreLabels() {
  const bestScore = getBestScore();
  elements.bestScoreStart.textContent = bestScore;
  elements.bestScoreResult.textContent = bestScore;
}

function showScreen(screenName) {
  Object.entries(screens).forEach(([name, screen]) => {
    const isActive = name === screenName;
    screen.hidden = !isActive;
    screen.classList.toggle("screen--active", isActive);
  });
}

function clearGameTimers() {
  clearInterval(timerInterval);
  clearTimeout(nextQuestionTimeout);
  timerInterval = null;
  nextQuestionTimeout = null;
}

function resetGame() {
  clearGameTimers();
  currentQuestionIndex = 0;
  score = 0;
  correctAnswers = 0;
  isAnswerLocked = false;
  elements.currentScore.textContent = "0";
}

function startGame() {
  resetGame();
  showScreen("quiz");
  renderQuestion();
}

function renderQuestion() {
  clearGameTimers();
  isAnswerLocked = false;
  timeLeft = QUESTION_TIME;

  const currentQuestion = questions[currentQuestionIndex];
  const questionPosition = currentQuestionIndex + 1;

  elements.questionNumber.textContent = `Soal ${questionPosition} dari ${questions.length}`;
  elements.questionText.textContent = currentQuestion.question;
  elements.progressBar.style.width = `${(questionPosition / questions.length) * 100}%`;
  elements.progressTrack.setAttribute("aria-valuenow", String(questionPosition));
  elements.feedback.textContent = "";
  elements.feedback.className = "feedback";
  elements.answers.replaceChildren();

  currentQuestion.choices.forEach((choice, index) => {
    const button = document.createElement("button");
    button.className = "answer-button";
    button.type = "button";
    button.textContent = choice;
    button.dataset.value = String(choice);
    button.setAttribute("aria-label", `Pilihan ${index + 1}: ${choice}`);
    button.addEventListener("click", () => chooseAnswer(choice, button));
    elements.answers.append(button);
  });

  updateTimerDisplay();
  startTimer();

  requestAnimationFrame(() => {
    elements.answers.querySelector("button")?.focus({ preventScroll: true });
  });
}

function startTimer() {
  timerInterval = setInterval(() => {
    timeLeft -= 1;
    updateTimerDisplay();

    if (timeLeft <= 0) {
      handleTimeUp();
    }
  }, 1000);
}

function updateTimerDisplay() {
  const progress = timeLeft / QUESTION_TIME;
  elements.timerValue.textContent = String(timeLeft);
  elements.timerProgress.style.strokeDashoffset = String(TIMER_CIRCUMFERENCE * (1 - progress));
  elements.timer.classList.toggle("timer--warning", timeLeft <= 3);
  elements.timer.setAttribute("aria-label", `Sisa waktu ${timeLeft} detik`);
}

function lockAnswerButtons() {
  elements.answers.querySelectorAll("button").forEach((button) => {
    button.disabled = true;
  });
}

function revealCorrectAnswer() {
  const correctValue = questions[currentQuestionIndex].answer;
  const correctButton = elements.answers.querySelector(`[data-value="${correctValue}"]`);
  correctButton?.classList.add("answer-button--correct");
}

function chooseAnswer(selectedAnswer, selectedButton) {
  if (isAnswerLocked) return;

  isAnswerLocked = true;
  clearInterval(timerInterval);
  lockAnswerButtons();

  const correctAnswer = questions[currentQuestionIndex].answer;
  const isCorrect = selectedAnswer === correctAnswer;

  if (isCorrect) {
    score += POINTS_PER_CORRECT_ANSWER;
    correctAnswers += 1;
    elements.currentScore.textContent = String(score);
    selectedButton.classList.add("answer-button--correct");
    elements.feedback.textContent = "Benar! Kamu hebat! ✨";
    elements.feedback.classList.add("feedback--correct");
  } else {
    selectedButton.classList.add("answer-button--wrong");
    revealCorrectAnswer();
    elements.feedback.textContent = `Belum tepat. Jawabannya ${correctAnswer}.`;
    elements.feedback.classList.add("feedback--wrong");
  }

  scheduleNextQuestion();
}

function handleTimeUp() {
  if (isAnswerLocked) return;

  isAnswerLocked = true;
  clearInterval(timerInterval);
  lockAnswerButtons();
  revealCorrectAnswer();
  elements.feedback.textContent = `Waktu habis! Jawabannya ${questions[currentQuestionIndex].answer}.`;
  elements.feedback.classList.add("feedback--wrong");
  scheduleNextQuestion();
}

function scheduleNextQuestion() {
  nextQuestionTimeout = setTimeout(() => {
    currentQuestionIndex += 1;

    if (currentQuestionIndex < questions.length) {
      renderQuestion();
    } else {
      finishGame();
    }
  }, 1100);
}

function finishGame() {
  clearGameTimers();

  const previousBest = getBestScore();
  if (score > previousBest) saveBestScore(score);
  updateBestScoreLabels();

  elements.finalScore.textContent = String(score);
  elements.correctCount.textContent = String(correctAnswers);

  if (correctAnswers === questions.length) {
    elements.resultTitle.textContent = "Sempurna!";
    elements.resultMessage.textContent = "Semua jawabanmu benar. Kamu benar-benar jago berhitung!";
    elements.resultBadge.textContent = "🏆";
  } else if (correctAnswers >= 3) {
    elements.resultTitle.textContent = "Hebat Sekali!";
    elements.resultMessage.textContent = "Kerja bagus! Sedikit latihan lagi dan kamu akan semakin jago.";
    elements.resultBadge.textContent = "⭐";
  } else {
    elements.resultTitle.textContent = "Tetap Semangat!";
    elements.resultMessage.textContent = "Setiap latihan membuatmu lebih hebat. Yuk, coba sekali lagi!";
    elements.resultBadge.textContent = "🌱";
  }

  showScreen("result");
  elements.restartButton.focus({ preventScroll: true });
}

function goHome() {
  clearGameTimers();
  updateBestScoreLabels();
  showScreen("start");
  elements.startButton.focus({ preventScroll: true });
}

elements.startButton.addEventListener("click", startGame);
elements.restartButton.addEventListener("click", startGame);
elements.homeButton.addEventListener("click", goHome);
elements.resultHomeButton.addEventListener("click", goHome);

updateBestScoreLabels();
