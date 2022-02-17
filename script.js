//declared variables
var timeEl = document.querySelector(".time");
var card = document.querySelector(".card");
var startBtn = document.querySelector(".startBtn");
var resetBtn = document.querySelector(".resetBtn");
var formSelector = document.querySelector("#FormControlSelect");
var questionTitle = document.querySelector(".question-title");
var scoresEl = document.querySelector(".scores");
var userInput = document.querySelector(".user-input");
var secondsLeft = 60;
var qIndex = 0;
var score = 0;
var initialArr = JSON.parse(localStorage.getItem("initial")) || [];

var questionHeader = [
  {
    question:
      "Which of these quotes does not belong to the author Albert Camus?",
    answers: [
      "A: You will never be happy if you continue to search for what happiness consists of. You will never live if you are looking for the meaning of life.",
      "B: In the depth of winter, I finally learned that within me there lay an invincible summer.",
      "C: Man is the only creature who refuses to be what he is.",
      "D: …There is the heat of Love, the pulsing rush of Longing, the lover’s whisper, irresistible—magic to make the sanest man go mad.",
    ],
    correctAnswer: "D",
  },
  {
    question: "Which of these quotes does not belong to Homer from The Illiad?",
    answers: [
      "A: Any moment might be our last. Everything is more beautiful because we're doomed. You will never be lovelier than you are now. We will never be here again.",
      "B: Let me not then die ingloriously and without a struggle, but let me first do some great thing that shall be told among men hereafter.",
      "C: Like the generations of leaves, the lives of mortal men. Now the wind scatters the old leaves across the earth, now the living timber bursts with the new buds and spring comes round again. And so with men: as one generation comes to life, another dies away.",
      "D: Double, double toil and trouble; fire burn, and cauldron bubble.",
    ],
    correctAnswer: "D",
  },
  {
    question: "Which of these quotes does not belong to the Epic of Gilgamesh?",
    answers: [
      "A: During my night I, having become lusty, wandered about in the midst of omens.",
      "B: Eat bread, oh Enkidu! It is the conformity of life, of the conditions and the fate of the land.",
      "C: And there came out stars in the heavens, Like … of heaven he fell upon me. I bore him but he was too heavy for me. He bore a net but I was not able to bear it.",
      "D: Blessed be to the hearts that can bend; for they shall never be broken",
    ],
    correctAnswer: "D",
  },
  {
    question: "Which of these quotes does not belong to Shakespeare",
    answers: [
      "A: The fool doth think he is wise, but the wise man knows himself to be a fool.",
      "B: Love all, trust a few, do wrong to none.",
      "C: Be not afraid of greatness. Some are born great, some achieve greatness, and others have greatness thrust upon them.",
      "D: And like a mirror my heart was broken so that the largest fragments would not pass an eye of a needle.",
    ],
    correctAnswer: "D",
  },
  {
    question:
      "Which of these quotes does not belong to author Edgar Allan Poe?",
    answers: [
      "A: I became insane, with long intervals of horrible sanity.",
      "B: All that we see or seem is but a dream within a dream.",
      "C: And there came out stars in the heavens, Like … of heaven he fell upon me. I bore him but he was too heavy for me. He bore a net but I was not able to bear it.",
      "D: Those who dream by day are cognizant of many things which escape those who dream only by night.",
    ],
    correctAnswer: "C",
  },
  {
    question:
      "Which of these quotes does not belong to author Hunter S. Thompson?",
    answers: [
      "A: Sex without love is as hollow and ridiculous as love without sex.",
      "B: A man who procrastinates in his choosing will inevitably have his choice made for him by circumstance.",
      "C: I hate to advocate drugs, alcohol, violence, or insanity to anyone, but they've always worked for me.",
      "D: Blessed be to the hearts that can bend; for they shall never be broken",
    ],
    correctAnswer: "D",
  },
];
function nextQuestion() {
  formSelector.textContent = "";
  for (var i = 0; i < questionHeader[qIndex].answers.length; i++) {
    var options = document.createElement("option");
    options.textContent = questionHeader[qIndex].answers[i];
    questionTitle.textContent = questionHeader[qIndex].question;
    formSelector.appendChild(options);
    options.onclick = checkAnswer;
  }
}
function checkAnswer(event) {
  var chosenAnswer = event.target.innerHTML;
  var splitAnswer = chosenAnswer.split(":")[0];

  if (splitAnswer == questionHeader[qIndex].correctAnswer) {
    secondsLeft += 20;
    score++;
  } else if (splitAnswer !== questionHeader[qIndex].correctAnswer) {
    secondsLeft -= 20;
    score--;
  }

  if (qIndex == questionHeader.length - 1) {
    return endQuiz();
  }
  qIndex++;
  nextQuestion();
}
function startQuiz() {
  //timer function
  startBtn.style.display = "none";
  function setTime() {
    var quizTimer = setInterval(function () {
      secondsLeft--;
      timeEl.textContent = secondsLeft;
      if (secondsLeft <= 0 || qIndex >= questionHeader.length) {
        clearInterval(quizTimer);
        return endQuiz();
      }
    }, 1000);
  }
  setTime();
  nextQuestion();
}
function endQuiz() {
  resetBtn.style.display = "block";
  var initial = window.prompt("Please enter your initials");
  initialArr.push({ initial: initial, score: score });
  localStorage.setItem("initial", JSON.stringify(initialArr));
  sendMessage();
}

function sendMessage() {
  for (var i = 0; i < initialArr.length; i++) {
    var highScoresEl = document.createElement("p");
    highScoresEl.textContent = initialArr[i].initial + initialArr[i].score;
    console.log(highScoresEl);
    scoresEl.appendChild(highScoresEl);
  }
}
startBtn.addEventListener("click", startQuiz);
resetBtn.addEventListener("click", function () {
  return location.reload();
});