const quizData = [
  [
    { question: "1️⃣ O que é um desastre natural?",
      options: ["Um evento natural que causa danos", "Desmatamento", "Poluição"],
      answer: 0 },
    { question: "2️⃣ Qual desses é um desastre natural?",
      options: ["Terremoto", "Poluição industrial de rio", "Queimar resíduos em áreas abertas para reduzir volume"],
      answer: 0 },
    { question: "3️⃣ O que devemos fazer com o lixo?",
      options: ["Descartar corretamente e separar para reciclagem", "Reciclar", "Queimar tudo"],
      answer: 0 }
  ],
  [
    { question: "4️⃣ O que o aquecimento global provoca?",
      options: ["Aumento das áreas de gelo nos polos", "Derretimento das geleiras", "Temperaturas mais quentes em todo o planeta"],
      answer: 1 },
    { question: "5️⃣ Qual é uma ação sustentável?",
      options: ["Usar sacolas reutilizáveis", "Substituir áreas de floresta por fazendas de energia solar", "Reciclar materiais sem se preocupar com a redução do consumo"],
      answer: 0 },
    { question: "6️⃣ Por que devemos economizar energia?",
      options: ["Porque a produção de energia muitas vezes causa impactos ambientais", "Para reduzir impactos ambientais", "Porque quanto mais energia usamos, mais sustentável o sistema se torna"],
      answer: 1 }
  ],
  [
    { question: "7️⃣ O que é efeito estufa?",
      options: ["Camada que mantém o calor da Terra", "Um tipo de cultivo agrícola em regiões tropicais","Um fenômeno astronômico que acontece fora da atmosfera"],
      answer: 0 },
    { question: "8️⃣ Qual desses é consequência do desmatamento?",
      options: ["Aumento da absorção de carbono pelas florestas", "Perda de habitat, erosão do solo e desequilíbrio climático", "Criação de novas espécies adaptadas ao desmatamento"],
      answer: 1 },
    { question: "9️⃣ Como podemos agir agora pelo amanhã?",
      options: ["Consumindo de forma consciente e reduzindo o desperdício", "Aumentando o uso de combustíveis fósseis", "Acreditando que apenas governos e empresas devem agir"],
      answer: 1 }
  ]
];

const faseTempo = [45, 30, 15];
let level = 0;
let current = 0;
let lives = 3;
let timer;
let timeLeft;
let canAnswer = true;

function startQuiz() {
  showQuestion();
  startTimer();
}

function showQuestion() {
  const q = quizData[level][current];
  document.getElementById("question").textContent = q.question;
  const optDiv = document.getElementById("options");
  optDiv.innerHTML = "";
  q.options.forEach((opt, i) => {
    const btn = document.createElement("button");
    btn.textContent = opt;
    btn.onclick = () => checkAnswer(i, btn);
    optDiv.appendChild(btn);
  });
  document.getElementById("nextBtn").classList.add("hidden");
  canAnswer = true;
  resetTimer();
}

function checkAnswer(i, btn) {
  if (!canAnswer) return;
  canAnswer = false;
  const q = quizData[level][current];
  const buttons = document.querySelectorAll("#options button");
  buttons.forEach(b => b.disabled = true);

  if (i === q.answer) {
    btn.classList.add("correct");
  } else {
    btn.classList.add("wrong");
    lives--;
    document.getElementById("lives").textContent = lives;
  }

  document.getElementById("nextBtn").classList.remove("hidden");

  if (lives <= 0) {
    gameOver();
  }
}

function nextQuestion() {
  current++;
  if (current >= quizData[level].length) {
    level++;
    if (level >= quizData.length) {
      endGame();
      return;
    } else {
      alert(`🌿 Parabéns! Você avançou para a fase ${level + 1}!`);
      current = 0;
      document.getElementById("level").textContent = level + 1;
    }
  }
  showQuestion();
}

function startTimer() {
  timeLeft = faseTempo[level];
  updateTimerUI();

  timer = setInterval(() => {
    timeLeft--;
    updateTimerUI();

    if (timeLeft <= 0) {
      clearInterval(timer);
      lives--;
      document.getElementById("lives").textContent = lives;
      if (lives <= 0) {
        gameOver();
      } else {
        nextQuestion();
      }
    }
  }, 1000);
}

function updateTimerUI() {
  document.getElementById("timer").textContent = timeLeft;
  const percent = (timeLeft / faseTempo[level]) * 100;
  document.getElementById("time-bar").style.width = percent + "%";
}

function resetTimer() {
  clearInterval(timer);
  timeLeft = faseTempo[level];
  document.getElementById("time-bar").style.width = "100%";
  startTimer();
}

function gameOver() {
  clearInterval(timer);
  document.querySelector(".quiz-container").innerHTML = `
    <h2>💔 Fim de jogo!</h2>
    <p>Suas vidas acabaram...</p>
    <p>Mas ainda há tempo de salvar o planeta 🌎</p>
    <button onclick="location.reload()">Tentar novamente</button>
  `;
}

function endGame() {
  clearInterval(timer);
  document.querySelector(".quiz-container").innerHTML = `
    <h2>🏆 Parabéns, Guardião da Terra!</h2>
    <p>Você completou todas as fases do quiz!</p>
    <p>Continue cuidando do nosso planeta 💚</p>
    <button onclick="location.reload()">Jogar de novo</button>
  `;
}

startQuiz();
