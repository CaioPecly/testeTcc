const $startGameButton = document.querySelector(".start-quiz");
const $questionsContainer = document.querySelector(".questions-container");

let totalCorrect = 0;
let allQuestions = [];       // Todas as perguntas do banco
let displayedQuestions = []; // Perguntas ativas na tela
let usedQuestions = new Set();

async function loadQuestions() {
  try {
    const response = await fetch('/api/questions');
    const data = await response.json();
    allQuestions = data.map(q => ({
      question: q.question,
      answers: [
        { text: q.answer1, correct: q.correct_answer === 1 },
        { text: q.answer2, correct: q.correct_answer === 2 },
        { text: q.answer3, correct: q.correct_answer === 3 },
        { text: q.answer4, correct: q.correct_answer === 4 }
      ]
    }));

    displayedQuestions = getRandomQuestions(6);
    renderQuestions();
  } catch (error) {
    console.error('Erro ao carregar as perguntas:', error);
  }
}

$startGameButton.addEventListener("click", startGame);

function startGame() {
  $startGameButton.classList.add("hide");
  $questionsContainer.classList.remove("hide");
  loadQuestions();
}

function getRandomQuestions(count) {
  const available = allQuestions.filter((_, i) => !usedQuestions.has(i));
  const shuffled = available.sort(() => 0.5 - Math.random());
  const selected = shuffled.slice(0, count);

  selected.forEach(q => {
    const index = allQuestions.indexOf(q);
    usedQuestions.add(index);
  });

  return selected;
}

function renderQuestions() {
  $questionsContainer.innerHTML = "";

  displayedQuestions.forEach((q, index) => {
    const questionCard = document.createElement("div");
    questionCard.classList.add("question-card");
    questionCard.dataset.index = index;

    const questionText = document.createElement("p");
    questionText.classList.add("question-text");
    questionText.textContent = `${index + 1}. ${q.question}`;
    questionCard.appendChild(questionText);

    q.answers.forEach(answer => {
      const answerButton = document.createElement("button");
      answerButton.classList.add("button", "answer");
      answerButton.textContent = answer.text;
      answerButton.dataset.correct = answer.correct;

      answerButton.addEventListener("click", (e) =>
        selectAnswer(e, questionCard, index)
      );

      questionCard.appendChild(answerButton);
    });

    $questionsContainer.appendChild(questionCard);
  });

  const finishBtn = document.createElement("button");
  finishBtn.textContent = "Finalizar Quiz";
  finishBtn.classList.add("button", "finish-button");
  finishBtn.addEventListener("click", finishGame);
  $questionsContainer.appendChild(finishBtn);
}

function selectAnswer(event, card, cardIndex) {
  const selected = event.target;
  const isCorrect = selected.dataset.correct === "true";

  const answerButtons = card.querySelectorAll(".answer");
  answerButtons.forEach(btn => {
    btn.disabled = true;
    if (btn.dataset.correct === "true") btn.classList.add("correct");
    else btn.classList.add("incorrect");
  });

  if (isCorrect) {
    totalCorrect++;
  } else {
    // Substituir a pergunta
    const newQuestion = getRandomQuestions(1)[0];
    if (newQuestion) {
      displayedQuestions[cardIndex] = newQuestion;
    } else {
      displayedQuestions.splice(cardIndex, 1); // Nenhuma sobrando
    }
  }

  // Espera um momento e atualiza a UI
  setTimeout(() => {
    renderQuestions();
  }, 800);
}

function finishGame() {
  const totalQuestions = totalCorrect + (6 - displayedQuestions.length);
  const performance = Math.floor((totalCorrect / totalQuestions) * 100);

  let message = "";
  switch (true) {
    case performance >= 90:
      message = "Excelente :)";
      break;
    case performance >= 70:
      message = "Muito bom :)";
      break;
    case performance >= 50:
      message = "Bom";
      break;
    default:
      message = "Pode melhorar :(";
  }

  $questionsContainer.innerHTML = `
    <p class="final-message">
      Você acertou ${totalCorrect} de ${totalQuestions} questões!<br/>
      <span>Resultado: ${message}</span>
    </p>
    <button onclick="window.location.reload()" class="button">Refazer teste</button>
  `;
}
