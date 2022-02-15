//declared variables
var timeEl = document.querySelector(".time");
var card = document.querySelector(".card");
var question = document.querySelector(".question-title");
var answer1 = document.querySelector(".question-a");
var answer2 = document.querySelector(".question-b");
var answer3 = document.querySelector(".question-c");
var answer4 = document.querySelector(".question-d");
var questionIndex = 0;
var answerIndex = 0;
var secondsLeft = 30;

function startQuiz(){
    
}


//timer function
var quizTimer = setInterval(() => {
  secondsLeft--;
  timeEl.textContent = secondsLeft;
  if (secondsLeft <= 0) {
    clearInterval(quizTimer);
    // endQuiz()
  }
}, 1000);
console.log(quizTimer);
// function endQuiz() {

// }
