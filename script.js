const questionElement = document.getElementById("question");

const answerInput = document.getElementById("answer-input");

const submitBtn = document.getElementById("submit-btn");

const messageElement = document.getElementById("message");

const scoreElement = document.getElementById("score");

const timerElement = document.getElementById("timer");

const restartBtn = document.getElementById("restart-btn");

let num1;
let num2;
let correctAnswer;

let score = 0;

let timeLeft = 30;

let timer;

function generateQuestion(){

    const operations = ["+", "-", "*"];

    const randomOperation =
        operations[Math.floor(Math.random() * operations.length)];

    num1 = Math.floor(Math.random() * 20) + 1;

    num2 = Math.floor(Math.random() * 20) + 1;

    if(randomOperation === "+"){
        correctAnswer = num1 + num2;
    }

    else if(randomOperation === "-"){
        correctAnswer = num1 - num2;
    }

    else{
        correctAnswer = num1 * num2;
    }

    questionElement.textContent =
        `${num1} ${randomOperation} ${num2}`;
}

function checkAnswer(){

    const userAnswer = Number(answerInput.value);

    if(userAnswer === correctAnswer){

        score++;

        scoreElement.textContent = score;

        messageElement.textContent = "¡Correcto!";

        messageElement.className = "correct";
    }

    else{

        messageElement.textContent =
            `Incorrecto. Era ${correctAnswer}`;

        messageElement.className = "incorrect";
    }

    answerInput.value = "";

    generateQuestion();
}

submitBtn.addEventListener("click", checkAnswer);

answerInput.addEventListener("keypress", function(event){

    if(event.key === "Enter"){
        checkAnswer();
    }

});

function startTimer(){

    timer = setInterval(function(){

        timeLeft--;

        timerElement.textContent = timeLeft;

        if(timeLeft <= 0){

            clearInterval(timer);

            questionElement.textContent = "Juego terminado";

            submitBtn.disabled = true;

            answerInput.disabled = true;

            messageElement.textContent =
                `Puntaje final: ${score}`;
        }

    }, 1000);

}

restartBtn.addEventListener("click", function(){

    clearInterval(timer);

    score = 0;

    timeLeft = 30;

    scoreElement.textContent = score;

    timerElement.textContent = timeLeft;

    submitBtn.disabled = false;

    answerInput.disabled = false;

    messageElement.textContent = "";

    generateQuestion();

    startTimer();

});

generateQuestion();

startTimer();
