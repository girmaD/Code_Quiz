

var myQuestions = [
    {
        question: "What DOES JS stand for??",
        choices : ["JamSpace", "JustScraps", "JavaScript", "JazzSinger"],
        answer : 2
    },
    {
        question: "Which one of the following is a front-end liberary?",
        choices : ["Node", "Express", "mongoDB", "jQuery"],
        answer : 3
    },
    {
        question: "Array is a special form of an object in JS",
        choices : ["true", "false", "I don't know", "unrelated"],
        answer : 0
    },
    {
        question: "Which one of the following is a reserved keyword in JS",
        choices : ["this", "new", "let", "All"],
        answer : 3
    },
    {
        question: "JavaScript Objects can be created with the following syntax",
        choices : ["let obj = []", "let obj = {}", "let obj = ''", "let obj = ()"],
        answer : 1
    },
    {
        question: "A variable declared as global variable can",
        choices : ["not be accessed inside a function", "not be accessed inside a loop", "can be accessed anywhere", "can not be used anywhere"],
        answer : 2
    }
]
// references to HTML elements
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

const initialsInput = document.querySelector("#initials" );
const savescoreBtn = document.querySelector("#saveScoreBtn" );
const scorepageEl = document.querySelector("#scorepage" );
const finalScoreEL = document.querySelector("#finalScore" );
const highScoresDiv = document.querySelector("#highScores" );
const showscoresEL = document.querySelector("#showscores" );
const playAgainBtn = document.querySelector("#playAgain" );

// global variables
let currentQuestion = 0;
let score = 0;
let availableQuestions = [];
let timeLeft = 60;

// function to start the quiz
// it starts the count down clock and calls the displayQuestion function
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
// this functions makes sures questions are displayed as long as i have queswion is the array
// if there are no questions, the endGame functions is invoked
function displayQuestion(){
    if(currentQuestion < myQuestions.length){
        questionEl.textContent = myQuestions[currentQuestion].question;
        choice1.textContent = myQuestions[currentQuestion].choices[0];
        choice2.textContent = myQuestions[currentQuestion].choices[1];
        choice3.textContent = myQuestions[currentQuestion].choices[2];
        choice4.textContent = myQuestions[currentQuestion].choices[3]; 
    } else {
        // i want it to display the correct/incorectness of the last question
        // before it goes to the next step
        setTimeout(function(){
            endGame();
            return;
        },2000)
       
    }
         
}
// This function checks if the chosen answer is correct or not
// if correct score goes up by 10 points
// if incorrect time cut by 20 seconds
// after clicked the next question will be didplayed
function checkAnswer(answer){   
    if(answer == myQuestions[currentQuestion].answer){        
        score += 10;
        correctEL.textContent = "Correct";
        correctEL.classList.add("text-success");
        correctEL.classList.remove("text-danger");
        // correct will only be displayed for a second
        setTimeout(function(){
            correctEL.textContent = "";
        },1000)
        
    } else {
        timeLeft -= 20;
        correctEL.textContent = "Incorrect";
        correctEL.classList.add("text-danger");
        correctEL.classList.remove("text-success");
        //incorrect will only be displayed for a second
        setTimeout(function(){
            correctEL.textContent = "";
        },1000)
    }    
    currentQuestion++;
    displayQuestion();
}
// this function makes timeLeft to be zero and makes the appropraite pages to be displayed
function endGame(){
    timeLeft = 0;
    // localStorage.setItem("score", score)
    finalScoreEL.textContent = score;
    timerEl.classList.add("d-none");
    evalEl.classList.add("d-none");
    mainEl.classList.add("d-none");
    scorepageEl.classList.remove("d-none"); 
}

//listening to the submit button and saving score and initials in local storage
savescoreBtn.addEventListener("click", function(event){
    let scoresArr;
    event.preventDefault();
    highScoresDiv.classList.remove("d-none")
    scorepageEl.classList.add("d-none")
    let initials = initialsInput.value.trim();
    // console.log(scoresArr);    
    scoresArr = JSON.parse(localStorage.getItem("scores"));
    if(!scoresArr){
        scoresArr = [];
        scoresArr.push({name: initials, yourScore: score});
        localStorage.setItem("scores", JSON.stringify(scoresArr));
    } else {
        scoresArr.push({name: initials, yourScore: score});
        localStorage.setItem("scores", JSON.stringify(scoresArr));
    }
    
    getScores()
})

function getScores() {
    var scoresArr = JSON.parse(localStorage.getItem("scores")) || [];
    //a function to sort the scoresArr
    function compare(a, b) {
        let scoreA = a.yourScore;
        let scoreB = b.yourScore;
        let comparison = 0;
        if(scoreB > scoreA) {
            comparison = 1;
        } else {
            comparison = -1;
        }
        return comparison;
    }  
    //Sort the scoresArr based on 'yourScore' using the compare function
    scoresArr = scoresArr.sort(compare);
    // loop through the arr and display name and yourScore properties
    scoresArr.forEach(function(score){
        let newScoreEl = document.createElement("p");              
        newScoreEl.textContent = score.name + " - " + score.yourScore;        
        showscoresEL.appendChild(newScoreEl);
    })
}

// click the playAgain button to go back to home page
playAgainBtn.addEventListener("click", function(){
    return location.assign("index.html");
})

// listening to the start button to start the quiz
startBtn.addEventListener("click", startQuiz);
