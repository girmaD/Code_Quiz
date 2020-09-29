

var myQuestions = [
    {
        question: "What DOES JS stand for??",
        choices : ["JamSpace", "JustScraps", "JavaScript", "JazzSinger"],
        answer : 2
    },
    {
        question: "What DOESNOT JS stand for?",
        choices : ["JAMSpace", "JustScraps", "JavaScript", "JazzSinger"],
        answer : 3
    },
    {
        question: "What does JS stand for???",
        choices : ["JamSpace", "JustDoIt", "JavaScript", "JazzSinger"],
        answer : 1
    }
]

const timeEl = document.querySelector('#timeleft');
const startBtn = document.querySelector('#startBtn');
const questionEl = document.querySelector("#question");
const choice1 = document.querySelector("#choice1" );
const choice2 = document.querySelector("#choice2" );
const choice3 = document.querySelector("#choice3" );
const choice4 = document.querySelector("#choice4" );
const correctEL = document.querySelector("#correct" );
const homeEl = document.querySelector("#home");
const mainEl = document.querySelector("#main" );
const timerEl = document.querySelector("#timer" );
const evalEl = document.querySelector("#evaluation" );

let currentQuestion = 0;
let score = 0;
let availableQuestions = [];
let timeLeft = 60;

function startQuiz(){
    homeEl.classList.add("d-none");
    timerEl.classList.remove("d-none");
    evalEl.classList.remove("d-none");
    mainEl.classList.remove("d-none");
    let timer = setInterval(() => {
        timeLeft--;
        timeEl.textContent = timeLeft;
        if(timeLeft <= 0){
          clearInterval(timer);            
          endGame();
        }
    }, 1000);
    displayQuestion();
}
function displayQuestion(){
    if(currentQuestion < myQuestions.length){
        questionEl.textContent = myQuestions[currentQuestion].question;
        choice1.textContent = myQuestions[currentQuestion].choices[0];
        choice2.textContent = myQuestions[currentQuestion].choices[1];
        choice3.textContent = myQuestions[currentQuestion].choices[2];
        choice4.textContent = myQuestions[currentQuestion].choices[3]; 
    } else {
        endGame();
        return;
    }
    // checkAnswer();
    // mainEl.addEventListener("click",function(event){
    //     let element = event.target;
    //     if(element.matches("button")) {
    //         if(element == myQuestions[currentQuestion].answer){
    //             score += 10;
    //             correctEL.textContent = "correct";
    //         } else {
    //             timeLeft-= 1;
    //             correctEL.textContent = "incorrect";
    //         }
    //     }    
    //         currentQuestion++;
    //         displayQuestion();
    // })       
}

function checkAnswer(answer){
   
    if(answer == myQuestions[currentQuestion].answer){
        console.log("answer");
        console.log(myQuestions[currentQuestion].answer);
        score += 10;
        correctEL.textContent = "correct";
    } else {
        timeLeft-= 1;
        correctEL.textContent = "incorrect";
    }
    currentQuestion++;
    displayQuestion();
}

function endGame(){
    timeLeft = 0;
    return location.assign("scores.html");

}
// startQuiz();//i could do on click on the startQUIZ BUTTON;
startBtn.addEventListener("click", startQuiz);
// checkAnswer();