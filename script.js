const quizData = [
  [
    { question: "1️⃣ O que é um desastre natural? 🌊",
      options: ["Um evento natural que causa danos", "Desmatamento", "Poluição"],
      answer: 0 },
    { question: "2️⃣ Qual desses é um desastre natural? 🌪️",
      options: ["Terremoto", "Poluição industrial de rio", "Queimar resíduos em áreas abertas para reduzir volume"],
      answer: 0 },
    { question: "3️⃣ O que devemos fazer com o lixo? 🗑️",
      options: ["Descartar corretamente e separar para reciclagem", "Reciclar", "Queimar tudo"],
      answer: 0 }
  ],
  [
    { question: "4️⃣ O que o aquecimento global provoca? 🏔️",
      options: ["Aumento das áreas de gelo nos polos", "Derretimento das geleiras", "Temperaturas mais quentes em todo o planeta"],
      answer: 1 },
    { question: "5️⃣ Qual é uma ação sustentável?🌏 ",
      options: ["Usar sacolas reutilizáveis", "Substituir áreas de floresta por fazendas de energia solar", "Reciclar materiais sem se preocupar com a redução do consumo"],
      answer: 0 },
    { question: "6️⃣ Por que devemos economizar energia? ⚡",
      options: ["Porque a produção de energia muitas vezes causa impactos ambientais", "Para reduzir impactos ambientais", "Porque quanto mais energia usamos, mais sustentável o sistema se torna"],
      answer: 1 }
  ],
  [
    { question: "7️⃣ O que é efeito estufa? ☄️",
      options: ["Camada que mantém o calor da Terra", "Um tipo de cultivo agrícola em regiões tropicais","Um fenômeno astronômico que acontece fora da atmosfera"],
      answer: 0 },
    { question: "8️⃣ Qual desses é consequência do desmatamento? 🌲",
      options: ["Aumento da absorção de carbono pelas florestas", "Perda de habitat, erosão do solo e desequilíbrio climático", "Criação de novas espécies adaptadas ao desmatamento"],
      answer: 1 },
    { question: "9️⃣ Como podemos agir agora pelo amanhã?",
      options: ["Consumindo de forma consciente e reduzindo o desperdício", "Aumentando o uso de combustíveis fósseis", "Acreditando que apenas governos e empresas devem agir"],
      answer: 0 }
  ]
];

const faseTempo = [30, 25, 15];
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

  if (lives <= 0) {
    gameOver("Você não conseguiu ajudar a salvar o planeta Terra ☹️🌍");
    return;
  }

  // avança automaticamente após 1.2 segundos
  setTimeout(() => {
    nextQuestion();
  }, 1200);
}

function nextQuestion() {
  current++;

  if (current >= quizData[level].length) {
    level++;
    if (level >= quizData.length) {
      endGame("🎉 Parabéns Guardião da Terra! Você completou o quiz e ajudou o planeta! 🏆🌎");
      return;
    } else {
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
      gameOver("⏰ Tempo esgotado!");
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

function gameOver(message) {
  clearInterval(timer);
  document.querySelector(".quiz-container").innerHTML = `
    <h2> Fim de jogo! 💔 </h2>
    <p>${message}</p>
    <button onclick="location.reload()">Tentar novamente</button>
  `;
}

function endGame(message) {
  clearInterval(timer);
  document.querySelector(".quiz-container").innerHTML = `
    <h2>${message}</h2>
    <button onclick="location.reload()">Jogar novamente</button>
  `;

  // 🎉 Confete animado
  const duration = 3 * 1000; // 3 segundos
  const end = Date.now() + duration;

  (function frame() {
    confetti({
      particleCount: 5,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
    });
    confetti({
      particleCount: 5,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
}

startQuiz();
