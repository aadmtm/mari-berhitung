// =========================================
// DATA SOAL
// =========================================

const questions = [
  {
    question: "2 + 1 = ?",
    answer: 3,
    choices: [5, 2, 3, 4]
  },

  {
    question: "3 + 2 = ?",
    answer: 5,
    choices: [6, 5, 3, 4]
  },

  {
    question: "3 + 3 = ?",
    answer: 6,
    choices: [6, 5, 3, 4]
  },

  {
    question: "5 + 2 = ?",
    answer: 7,
    choices: [6, 5, 7, 4]
  },

  {
    question: "2 + 4 = ?",
    answer: 6,
    choices: [6, 5, 1, 4]
  }
];


// =========================================
// VARIABLE GAME
// =========================================

let currentQuestion = 0;
let score = 0;

let timeLeft = 10;

let timerInterval;

let answered = false;


// =========================================
// ELEMENT
// =========================================

const startScreen =
  document.getElementById("startScreen");

const gameScreen =
  document.getElementById("gameScreen");

const resultScreen =
  document.getElementById("resultScreen");


const startBtn =
  document.getElementById("startBtn");

const restartBtn =
  document.getElementById("restartBtn");

const backBtn =
  document.getElementById("backBtn");

const homeBtn =
  document.getElementById("homeBtn");


const questionElement =
  document.getElementById("question");

const choicesElement =
  document.getElementById("choices");

const questionNumber =
  document.getElementById("questionNumber");

const scoreElement =
  document.getElementById("score");

const currentScoreElement =
  document.getElementById("currentScore");

const timerElement =
  document.getElementById("timer");

const progressFill =
  document.getElementById("progressFill");

const feedback =
  document.getElementById("feedback");

const finalScore =
  document.getElementById("finalScore");

const bestScoreElement =
  document.getElementById("bestScore");

const resultMessage =
  document.getElementById("resultMessage");

const resultStars =
  document.getElementById("resultStars");


// =========================================
// BEST SCORE
// =========================================

let bestScore =
  Number(
    localStorage.getItem(
      "mathBestScore"
    )
  ) || 0;


bestScoreElement.textContent =
  bestScore;


// =========================================
// PINDAH SCREEN
// =========================================

function showScreen(screen) {

  document
    .querySelectorAll(".screen")
    .forEach(item => {

      item.classList.remove(
        "active"
      );

    });


  screen.classList.add(
    "active"
  );

}


// =========================================
// MULAI GAME
// =========================================

function startGame() {

  currentQuestion = 0;

  score = 0;

  timeLeft = 10;

  answered = false;


  scoreElement.textContent =
    score;

  currentScoreElement.textContent =
    score;


  showScreen(gameScreen);

  loadQuestion();

}


// =========================================
// LOAD QUESTION
// =========================================

function loadQuestion() {

  answered = false;

  clearInterval(timerInterval);


  feedback.textContent = "";

  feedback.className =
    "feedback";


  const question =
    questions[currentQuestion];


  questionElement.textContent =
    question.question;


  questionNumber.textContent =
    currentQuestion + 1;


  progressFill.style.width =
    `${
      ((currentQuestion + 1)
      / questions.length)
      * 100
    }%`;


  choicesElement.innerHTML = "";


  question.choices.forEach(choice => {

    const button =
      document.createElement(
        "button"
      );

    button.className =
      "choice-btn";

    button.textContent =
      choice;


    button.addEventListener(
      "click",
      () => selectAnswer(
        choice,
        button
      )
    );


    choicesElement.appendChild(
      button
    );

  });


  startTimer();

}


// =========================================
// TIMER
// =========================================

function startTimer() {

  timeLeft = 10;

  timerElement.textContent =
    timeLeft;


  const timerCircle =
    document.querySelector(
      ".timer-circle"
    );


  timerCircle.classList.remove(
    "warning"
  );


  timerInterval =
    setInterval(() => {

      timeLeft--;

      timerElement.textContent =
        timeLeft;


      // warning ketika tersisa 3 detik

      if (timeLeft <= 3) {

        timerCircle.classList.add(
          "warning"
        );

      }


      // waktu habis

      if (timeLeft <= 0) {

        clearInterval(
          timerInterval
        );

        timeOut();

      }

    }, 1000);

}


// =========================================
// PILIH JAWABAN
// =========================================

function selectAnswer(
  selectedAnswer,
  selectedButton
) {

  if (answered) return;


  answered = true;

  clearInterval(
    timerInterval
  );


  const correctAnswer =
    questions[currentQuestion]
      .answer;


  const buttons =
    document.querySelectorAll(
      ".choice-btn"
    );


  buttons.forEach(button => {

    button.disabled = true;

  });


  // BENAR

  if (
    selectedAnswer ===
    correctAnswer
  ) {

    score += 5;


    selectedButton.classList.add(
      "correct"
    );


    feedback.textContent =
      "🎉 Benar! +5 poin";

    feedback.classList.add(
      "correct"
    );

  }

  // SALAH

  else {

    selectedButton.classList.add(
      "wrong"
    );


    feedback.textContent =
      `😅 Belum tepat! Jawabannya ${correctAnswer}`;

    feedback.classList.add(
      "wrong"
    );


    // tampilkan jawaban benar

    buttons.forEach(button => {

      if (
        Number(button.textContent)
        === correctAnswer
      ) {

        button.classList.add(
          "correct"
        );

      }

    });

  }


  updateScore();


  // lanjut soal berikutnya

  setTimeout(() => {

    nextQuestion();

  }, 1300);

}


// =========================================
// WAKTU HABIS
// =========================================

function timeOut() {

  if (answered) return;

  answered = true;


  const correctAnswer =
    questions[currentQuestion]
      .answer;


  const buttons =
    document.querySelectorAll(
      ".choice-btn"
    );


  buttons.forEach(button => {

    button.disabled = true;


    if (
      Number(button.textContent)
      === correctAnswer
    ) {

      button.classList.add(
        "correct"
      );

    }

  });


  feedback.textContent =
    `⏰ Waktu habis! Jawabannya ${correctAnswer}`;

  feedback.classList.add(
    "wrong"
  );


  setTimeout(() => {

    nextQuestion();

  }, 1500);

}


// =========================================
// UPDATE SCORE
// =========================================

function updateScore() {

  scoreElement.textContent =
    score;

  currentScoreElement.textContent =
    score;

}


// =========================================
// NEXT QUESTION
// =========================================

function nextQuestion() {

  currentQuestion++;


  if (
    currentQuestion <
    questions.length
  ) {

    loadQuestion();

  }

  else {

    endGame();

  }

}


// =========================================
// SELESAI GAME
// =========================================

function endGame() {

  clearInterval(
    timerInterval
  );


  finalScore.textContent =
    score;


  // simpan skor terbaik

  if (score > bestScore) {

    bestScore = score;

    localStorage.setItem(
      "mathBestScore",
      bestScore
    );

  }


  bestScoreElement.textContent =
    bestScore;


  // Pesan hasil

  if (score === 25) {

    resultMessage.textContent =
      "Luar biasa! Semua jawaban benar! 🎉";

    resultStars.textContent =
      "⭐⭐⭐⭐⭐";

  }

  else if (score >= 20) {

    resultMessage.textContent =
      "Hebat sekali! Sedikit lagi sempurna!";

    resultStars.textContent =
      "⭐⭐⭐⭐";

  }

  else if (score >= 15) {

    resultMessage.textContent =
      "Bagus! Terus berlatih ya!";

    resultStars.textContent =
      "⭐⭐⭐";

  }

  else if (score >= 10) {

    resultMessage.textContent =
      "Semangat! Kamu pasti bisa!";

    resultStars.textContent =
      "⭐⭐";

  }

  else {

    resultMessage.textContent =
      "Ayo coba lagi dan raih skor terbaik!";

    resultStars.textContent =
      "⭐";

  }


  showScreen(
    resultScreen
  );

}


// =========================================
// BUTTON EVENT
// =========================================

startBtn.addEventListener(
  "click",
  startGame
);


restartBtn.addEventListener(
  "click",
  startGame
);


backBtn.addEventListener(
  "click",
  () => {

    showScreen(
      startScreen
    );

  }
);


homeBtn.addEventListener(
  "click",
  () => {

    clearInterval(
      timerInterval
    );

    showScreen(
      startScreen
    );

  }
);
