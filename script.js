const $startGameButton = document.querySelector(".start-quiz");
const $nextQuestionButton = document.querySelector(".next-question");
const $questionsContainer = document.querySelector(".questions-container");
const $questionText = document.querySelector(".question");
const $answersContainer = document.querySelector(".answers-container");

let currentQuestionIndex = 0;
let totalCorrect = 0;
let questions = [];

// Função para carregar as perguntas do servidor
async function loadQuestions() {
  try {
    const response = await fetch('/api/questions');
    const data = await response.json();
    questions = data.map(question => ({
      question: question.question,
      answers: [
        { text: question.answer1, correct: question.correct_answer === 1 },
        { text: question.answer2, correct: question.correct_answer === 2 },
        { text: question.answer3, correct: question.correct_answer === 3 },
        { text: question.answer4, correct: question.correct_answer === 4 }
      ]
    }));
    displayNextQuestion();
  } catch (error) {
    console.error('Erro ao carregar as perguntas:', error);
  }
}

$startGameButton.addEventListener("click", startGame);
$nextQuestionButton.addEventListener("click", displayNextQuestion);

function startGame() {
  $startGameButton.classList.add("hide");
  $questionsContainer.classList.remove("hide");
  loadQuestions(); // Carrega as perguntas do servidor
}

function displayNextQuestion() {
  resetState();

  if (questions.length === currentQuestionIndex) {
    return finishGame();
  }

  const question = questions[currentQuestionIndex];
  $questionText.textContent = question.question;
  question.answers.forEach(answer => {
    const newAnswer = document.createElement("button");
    newAnswer.classList.add("button", "answer");
    newAnswer.textContent = answer.text;
    if (answer.correct) {
      newAnswer.dataset.correct = answer.correct;
    }
    $answersContainer.appendChild(newAnswer);

    newAnswer.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  while ($answersContainer.firstChild) {
    $answersContainer.removeChild($answersContainer.firstChild);
  }

  document.body.removeAttribute("class");
  $nextQuestionButton.classList.add("hide");
}

function selectAnswer(event) {
  const answerClicked = event.target;

  if (answerClicked.dataset.correct) {
    document.body.classList.add("correct");
    totalCorrect++;
  } else {
    document.body.classList.add("incorrect");
  }

  document.querySelectorAll(".answer").forEach(button => {
    button.disabled = true;

    if (button.dataset.correct) {
      button.classList.add("correct");
    } else {
      button.classList.add("incorrect");
    }
  });

  $nextQuestionButton.classList.remove("hide");
  currentQuestionIndex++;
}

function finishGame() {
  const totalQuestions = questions.length;
  const performance = Math.floor(totalCorrect * 100 / totalQuestions);

  let message = "";

  switch (true) {
    case (performance >= 90):
      message = "Excelente :)";
      break;
    case (performance >= 70):
      message = "Muito bom :)";
      break;
    case (performance >= 50):
      message = "Bom";
      break;
    default:
      message = "Pode melhorar :(";
  }

  $questionsContainer.innerHTML = `
    <p class="final-message">
      Você acertou ${totalCorrect} de ${totalQuestions} questões!
      <span>Resultado: ${message}</span>
    </p>
    <button 
      onclick=window.location.reload() 
      class="button"
    >
      Refazer teste
    </button>
  `;
}
