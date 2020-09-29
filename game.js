const questionEl = document.getElementById("question");
const choiceEls = Array.from(document.querySelectorAll(".choice-content"));//converting nodeList to array
const gameDiv = document.getElementById("game");

let currentQuestion = 0;
// let acceptingAnswers = false;
let score = 0;
// let questionCounter = 0;
let availableQuestions = [];
let timeLeft = 60;

// hard coded questions
var myQuesions = [
    {
        question: "What does JS stand for??",
        choices : ["JamSpace", "JustScraps", "JavaScript", "JazzSinger"],
        answer : "JavaScript"
    },
    {
        question: "What does JS stand for?",
        choices : ["JamSpace", "JustScraps", "JavaScript", "JazzSinger"],
        answer : "JavaScript"
    },
    {
        question: "What does JS stand for???",
        choices : ["JamSpace", "JustScraps", "JavaScript", "JazzSinger"],
        answer : "JavaScript"
    }
]
// var questions = [{
//     question: "What does JS stand for?",
//     choice1: "JamSpace",
//     choice2: "JustScraps",
//     choice3: "JavaScript",
//     choice4: "JazzSinger",   
//     answer: 3
// },
// {
//     question: "What command exits a loop?",    
//     choice1: "Stop",
//     choice2: "Return",
//     choice3: "Break",
//     choice4: "Exit",    
//     answer: 3
// },
// {
//     question: "Which set of characters creates an array?",    
//     choice1: "[ ]",
//     choice2: "{ }",
//     choice3: "< >",
//     choice4: "( )",   
//     answer: 1
// },
// {
//     question: "Which set of characters creates an object?",    
//     choice1: "[ ]",
//     choice2: "{ }",
//     choice3: "< >",
//     choice4: "( )",
//     answer: 2
// },
// {
//     question: "Which is the logical operator symbol for OR?",    
//     choice1: "\\\\",
//     choice2: "||",
//     choice3: "//",
//     choice4: "++",
//     answer: 2
// },
// {
//     question: "Which is the logical operator symbol for AND?",    
//     choice1: "&",
//     choice2: "&&",
//     choice3: "++",
//     choice4: "+",
//     answer: 2
// },
// {
//     question: "Which is the logical operator for EQUAL TO?",    
//     choice1: '=',
//     choice2: '!=',
//     choice3: '!==',
//     choice4: '==',
//     answer: 4
// },
// {
//     question: "Which is the logical operator for NOT EQUAL TO?",   
//     choice1: '=',
//     choice2: '!=',
//     choice3: '!==',
//     choice4: '==',
//     answer: 2
// },
// {
//     question: "Which is a commonly used JS code library?",    
//     choice1: "jQuest",
//     choice2: "jQueen",
//     choice3: "jQuery",
//     choice4: "jQuinta",   
//     answer: 3
// },

// {
//     question: "How should an IF statement start?",    
//     choice1: "if x=y {",
//     choice2: "if x=y, then",
//     choice3: "if (x=y) then {",
//     choice4: "if(x=y) {",
//     answer: 4
// }
// ]
// console.log(questions.length);

// constants usually declated in capital letters
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 10;

function startQuiz(){
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];//same array but since I will modify it - i created a new one using spread operator
    getNextQuestion();
}

function getNextQuestion(){    
    // this function will send us error - ones the available question is empty. Therefore,
    // ones the availableQuestion is over - go to scores.html page
    if(availableQuestions.length === 0){
       return location.assign("/scores.html")
    }
    questionCounter++;
    // displaying th question on game.html questionEl
    let queIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[queIndex];
    questionEl.textContent = currentQuestion.question;

    // displaying the choices on ChoiceEls elements on game.html
    choiceEls.forEach(function(choice){
        // identifying each choice uniquely by the data-number attribute
        let data = choice.dataset["number"];
        choice.textContent = currentQuestion["choice" + data];
    });
    // get rid of the already displayed question so that it doesn't get displayed again
    availableQuestions.splice(queIndex, 1);
    // ones the questions and multiple choices are displayed - allow accepting answers
    acceptingAnswers = true;

};

// choiceEls.forEach(function(choice){
//     choice.addEventListener("click", function(event){
//         // console.log(event.target);
//         let element = event.target;
//         let yourAnswer = element.dataset["number"];
//         // console.log(yourAnswer);
//         getNextQuestion();
//     })    
// })
let displayAnswer = "incorrect";
function yourAnswer(event){
    let element = event.target;
    let yourAnswer = element.dataset["number"];
    
    if(parseInt(yourAnswer) === currentQuestion.answer){
        displayAnswer = "correct";        
    }    
    let displayEl = document.createElement("h3");
    displayEl.append(displayAnswer);
    gameDiv.appendChild(displayEl);
    console.log(displayAnswer);
    setTimeout(function(){
        gameDiv.removeChild(displayEl);
    }, 500)
    getNextQuestion();
}
    // let displayTime = 1;
    // let displayInterval = setInterval(function(){        
    //     displayTime--;
    //     if(displayTime < 0){
    //         clearInterval(displayTime);
    //         displayEl.innerHTML = "";
    //     }
    // }, 333);
    // function showWhetherCorrect(){
        // let displayEl = document.createElement("h3");
        // setTimeout(function(){        
            // displayEl.append(displayAnswer);
            // gameDiv.appendChild(displayEl);
            // console.log(displayAnswer);
            // getNextQuestion();         
        // }, 500);
        // setTimeout(function(){ 
        //     displayEl.innerHTML = "";
        //     getNextQuestion();
        // }, 500);
    // }
    
    
    
    

// function correctAnswer(event){
//     let element = event.target;
//     let displayAnswer = "incorrect";
//     let yourAnswer = element.dataset["number"];
//     if(parseInt(yourAnswer) === currentQuestion.answer){
//         displayAnswer = "correct";        
//     }
//     let displayEl = document.createElement("p");
//     displayEl.append(displayAnswer);
//     gameDiv.appendChild(displayEl);
// }
choiceEls.forEach(function(choice){
    choice.addEventListener("click", yourAnswer);
    // choice.addEventListener("click", showWhetherCorrect);
})
startQuiz();
