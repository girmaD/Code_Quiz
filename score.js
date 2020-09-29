
window.onload = function(){
const initialsInput = document.querySelector("#initials" );
const savescoreBtn = document.querySelector("#saveScoreBtn" );
const scorepageEl = document.querySelector("#scorepage" );
const finalScoreEL = document.querySelector("#finalScore" );
const highScoresDiv = document.querySelector("#highScores" );
const showscoresEL = document.querySelector("#showscores" );
const playAgainBtn = document.querySelector("#playAgain" );

var score = localStorage.getItem("score");
if(!score){
    localStorage.setItem("score", score)
} else {
    finalScoreEL.textContent = localStorage.getItem("score");
}



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
})

var scoresArr = JSON.parse(localStorage.getItem("scores")); 
scoresArr.forEach(function(score){
    // console.log(score);
    let newScoreEl = document.createElement("p");
    newScoreEl.textContent = score.name + " - " + score.yourScore;
    showscoresEL.appendChild(newScoreEl);
})

playAgainBtn.addEventListener("click", function(){
    return location.assign("index.html");
})
}