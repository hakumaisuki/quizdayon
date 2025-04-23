// クイズデータ
const quizData = [
  {
    question: "日本の首都は？",
    answers: ["大阪", "東京", "京都"],
    correct: "東京",
    explanation: "東京は日本の首都で、政治・経済・文化の中心です。"
  },
  {
    question: "桜の開花時期は？",
    answers: ["12月", "3〜4月", "8月"],
    correct: "3〜4月",
    explanation: "桜は一般的に春（3月〜4月）に開花します。"
  },
  {
    question: "日本で一番高い山は？",
    answers: ["富士山", "槍ヶ岳", "北岳"],
    correct: "富士山",
    explanation: "富士山は標高3,776mで、日本で最も高い山です。"
  },
  {
    question: "日本の通貨単位は？",
    answers: ["ウォン", "ドル", "円"],
    correct: "円",
    explanation: "日本では『円（¥）』が使われています。"
  },
  {
    question: "ひまわりの咲く季節は？",
    answers: ["春", "夏", "秋"],
    correct: "夏",
    explanation: "ひまわりは7月〜8月の夏に咲く花です。"
  },
  {
    question: "春の七草に含まれるのは？",
    answers: ["よもぎ", "せり", "カモミール"],
    correct: "せり",
    explanation: "春の七草には『せり・なずな・ごぎょう』などが含まれます。"
  },
  {
    question: "4月の祝日は？",
    answers: ["こどもの日", "昭和の日", "敬老の日"],
    correct: "昭和の日",
    explanation: "昭和の日は4月29日で、昭和天皇の誕生日に由来します。"
  },
  {
    question: "桜の英語名は？",
    answers: ["cherry", "plum", "peach"],
    correct: "cherry",
    explanation: "『cherry blossom』は桜を意味します。"
  },
  {
    question: "たんぽぽの綿毛は何のため？",
    answers: ["見た目のため", "虫よけ", "種を飛ばすため"],
    correct: "種を飛ばすため",
    explanation: "風に乗って種を遠くへ運ぶためです。"
  },
  {
    question: "春分の日は何を祝う？",
    answers: ["先祖を敬う", "働く人に感謝", "自然をたたえる"],
    correct: "自然をたたえる",
    explanation: "春分の日は『自然をたたえ、生物をいつくしむ』日です。"
  }
];

let currentIndex = 0;
let score = 0;
let timer;
let timeLimit = 10;
let shuffledQuiz = [];
let startTime;

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function startGame() {
  currentIndex = 0;
  score = 0;
  shuffledQuiz = shuffle([...quizData]).slice(0, 10);
  startTime = Date.now();
  loadQuiz();
}

function startTimer() {
  let timeLeft = timeLimit;
  document.getElementById("timer").textContent = `⏳ ${timeLeft}秒`;

  timer = setInterval(() => {
    timeLeft--;
    document.getElementById("timer").textContent = `⏳ ${timeLeft}秒`;
    if (timeLeft <= 0) {
      clearInterval(timer);
      autoNext();
    }
  }, 1000);
}

function loadQuiz() {
  clearInterval(timer);
  const quiz = shuffledQuiz[currentIndex];
  document.getElementById("question").textContent = `Q${currentIndex + 1}. ${quiz.question}`;
  document.getElementById("explanation").textContent = "";
  document.getElementById("result").textContent = "";

  const buttons = document.querySelectorAll(".answer-button");
  buttons.forEach((btn, i) => {
    btn.textContent = quiz.answers[i];
    btn.disabled = false;
    btn.style.backgroundColor = "#ffb6c1";
    btn.onclick = () => {
      clearInterval(timer);
      checkAnswer(btn, quiz.answers[i]);
    };
  });

  document.getElementById("next-btn").style.display = "none";
  startTimer();
}

function checkAnswer(button, selected) {
  const quiz = shuffledQuiz[currentIndex];
  const isCorrect = selected === quiz.correct;

  if (isCorrect) {
    score++;
    document.getElementById("result").textContent = "✅ 正解！";
    document.getElementById("result").style.color = "green";
  } else {
    document.getElementById("result").textContent = `❌ 不正解… 正解は「${quiz.correct}」`;
    document.getElementById("result").style.color = "red";
  }

  document.getElementById("explanation").textContent = `💡 解説：${quiz.explanation}`;
  document.getElementById("next-btn").style.display = "inline-block";
  document.querySelectorAll(".answer-button").forEach(btn => btn.disabled = true);
}

function autoNext() {
  const quiz = shuffledQuiz[currentIndex];
  document.getElementById("result").textContent = "⌛ 時間切れ…";
  document.getElementById("result").style.color = "gray";
  document.getElementById("explanation").textContent = `💡 解説：${quiz.explanation}`;
  document.getElementById("next-btn").style.display = "inline-block";
  document.querySelectorAll(".answer-button").forEach(btn => btn.disabled = true);
}

function nextQuestion() {
  currentIndex++;
  if (currentIndex < 10) {
    loadQuiz();
  } else {
    clearInterval(timer);
    const totalTime = Math.floor((Date.now() - startTime) / 1000);
    localStorage.setItem("score", score);
    localStorage.setItem("totalTime", totalTime);
    location.href = "result.html";
  }
}

function resetQuiz() {
  document.getElementById("comment").textContent = "";
  document.getElementById("reset-btn").style.display = "none";
  startGame();
}

window.onload = startGame;
