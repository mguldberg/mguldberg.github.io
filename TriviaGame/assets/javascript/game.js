/**
 * hw #5 -jQuery - trivia - game.js
 **/

// VARIABLES
// ==========================================================================
//

//will be loaded with value from onclick
var answer;

//index of currentQuestion in Obj
var currentQuestion = 0;

//variables for timer
var timeIsUp = false;
var gameTimerCounter = 25; //seconds left on each Q

var answerTimer;
var numberCorrect = 0;
var numberWrong = 0;
var numberTimeouts = 0;

// FUNCTIONS
// ==============================================================================
//

// display the next question
function nextQuestion() {
    //setup the div by changing the question answer choices
    console.log(questionsObj["Q" + currentQuestion].question);
    console.log(questionsObj["Q" + currentQuestion].choices[0]);
    console.log(questionsObj["Q" + currentQuestion].choices[1]);
    console.log(questionsObj["Q" + currentQuestion].choices[2]);
    console.log(questionsObj["Q" + currentQuestion].choices[3]);

    $("#question").text(questionsObj["Q" + currentQuestion].question);
    $("#answer-choice-1").text(questionsObj["Q" + currentQuestion].choices[0]);
    $("#answer-choice-2").text(questionsObj["Q" + currentQuestion].choices[1]);
    $("#answer-choice-3").text(questionsObj["Q" + currentQuestion].choices[2]);
    $("#answer-choice-4").text(questionsObj["Q" + currentQuestion].choices[3]);

}

function gameInit() {
    //Hide the divs not needed on the opening screen
    $("#question-answer-container").hide();
    $("#questions-container").hide();
    $("#results-container").hide();
}

//function to show the answer
function showAnswer(reason) {

    console.log(questionsObj["Q" + currentQuestion].correctAnswer);
    console.log("checking to see if correct or not")

    // setup var so the answer indexing isn't so hard to read
    var correctAnswerIndex = questionsObj["Q" + currentQuestion].correctAnswer
    
    //did we get here because the user didn't answer in time - setup the out to display 
    if (reason == "timeout") {
        $("#correct-not-correct-text").text("Too late!");
        //The correct answer was ...
        $("#question-answer-response").text("The correct answer was " + questionsObj["Q" + currentQuestion].choices[correctAnswerIndex] + ".");

    }
    //else if check if user answer was correct - setup the output of 'correct' if true
    else if (answer == questionsObj["Q" + currentQuestion].correctAnswer) {
        questionsObj["Q" + currentQuestion].userAnswer = true;
        $("#correct-not-correct-text").text("That was correct!");
        $("#question-answer-response").text("");

    }
    //else we got here because they answered incorrectly - set up the text to tell the user that
    else {
        console.log(" The correct answer was: " + questionsObj["Q" + currentQuestion].choices[correctAnswerIndex]);
        questionsObj["Q" + currentQuestion].answer = false;
        $("#correct-not-correct-text").text("Nope.");
        //The correct answer was ...
        $("#question-answer-response").text("The correct answer was " + questionsObj["Q" + currentQuestion].choices[correctAnswerIndex] + ".");

    }

    // set up the image in the div
    $("#answer-img").html('<img src="' + questionsObj["Q" + currentQuestion].answerImage + ' ">');
    
    // hide the question
    $(".questions-and-answers").hide();

    // show the answer with image
    $("#question-answer-container").show();


}

//check if time has expired to answer a question
function checkIfQuestionTimeIsExpired() {
    // write timer change to the screen
    $("#countdown-time").text(gameTimerCounter);

    gameTimerCounter--; // deduct 1 second
    console.log(gameTimerCounter);

    // // write timer change to the screen
    // $("#countdown-time").text(gameTimerCounter);

    //did we detect a timeout waiting for an answer?
    //  if yes - count the timeout and display the answer then got to next question
    if (gameTimerCounter == 0) {
        console.log("inside Game Time =0");
        console.log("there was a timeout");

        // DONE: Use clearInterval to stop the count here and set the clock to not be running.
        clearInterval(gameTimer);

        //increment number of timeouts
        numberTimeouts++;
        
        //display that time ran out
        showAnswer("timeout");

        // show the results/answers and image for 5 seconds
        answerTimer = setInterval(checkIfAnswerTimeIsExpired, 5000);

    }


}

function checkIfAnswerTimeIsExpired() {
    console.log("inside Answer Time =0");
    // Use clearInterval to stop the count here and set the clock to not be running.
    clearInterval(answerTimer);

    //move on to the next question
    currentQuestion++;

    //check if game is over
    if (currentQuestion == 4) {
        // tabulate the results
        for (i = 0; i < currentQuestion; i++) {

            if (questionsObj["Q" + i].userAnswer == true) {
                numberCorrect++;
                console.log("number correct:" + numberCorrect);


            }
            else {
                numberWrong++;
                console.log("number wrong/timeout:" + numberWrong + "-" + numberTimeouts);
            }
        }

        //write the results of the game to the div
        $("#results").text("You got " + numberCorrect + " out 4 correct.  Of the ones you got wrong, "
            + numberTimeouts + " were because you didn't answer quickly enough.");

        // hide the questions
        $("#question-answer-container").hide();

        // show the results/answers and image for 5 seconds
        $("#results-container").show();

    }
    else {
        $("#question-answer-container").hide();
        $(".questions-and-answers").show();
        nextQuestion();
        gameTimer = setInterval(checkIfQuestionTimeIsExpired, 1000);
        //reset gameTimer
        gameTimerCounter = 25;

    }

}

//
// MAIN PROCESS
// ==============================================================================
//

var questionsObj = {
    Q0: {
        question: "What is the distance between the pitcher and homeplate?",
        choices: ["60 ft 6 in", "59 ft 11 in", "90 ft", "60 ft 10 in"],
        correctAnswer: 0,
        answerImage: "assets/images/metropolitan_stadium_12.gif",
        userAnswer: false
    },
    Q1: {
        question: "Who was the winnder of the 1987 World Series?",
        choices: ["Yankees", "Twins", "Cardinals", "Cubs"],
        correctAnswer: 1,
        answerImage: "assets/images/twins-hqdefault.jpg",
        userAnswer: false

    },
    Q2: {
        question: "What was the name of the Montreal MLB baseball team?",
        choices: ["Barons", "Colt .45s", "Senators", "Expos"],
        correctAnswer: 3,
        answerImage: "assets/images/EXPOS_LOGO.png",
        userAnswer: false

    },
    Q3: {
        question: "What was the name of the MLB commissioner for most of the early 80s?",
        choices: ["George W. Bush", "A. Bartlett Giamatti", "Bowie Kuhn", "Peter Ueberroth"],
        correctAnswer: 2,
        answerImage: "assets/images/84389154.jpg",
        userAnswer: false

    },


};


// Captures keyboard input. Depending on the letter pressed it will "call " (execute) different functions.
$(document).ready(function () {

    //reset the game
    gameInit();
    $("#start-container").show();

    console.log("in the website ready function");

    $("#start-button").on("click", function () {
        //set up intial game screen - explain the rules
        // Hide start button
        // Show first question and start the timer
        $("#start-").hide();
        $("#results-container").hide();

        $("#questions-container").show();
        $("#questions-and-answers").show();
        $("#start-button").hide();


        nextQuestion();
        gameTimer = setInterval(checkIfQuestionTimeIsExpired, 1000);

    });

    // When a a question is posted - 3 possible events
    //     1) Question is given that is correct
    //     2) Question is given that is incorrect
    //     3) The timer runs out and is counted as wrong

    // after each possible outcome
    //      - Current currentQuestion++
    //      - Check if currentQuestion == 4
    //          - end the game and show how many the person got wrong/right/timout   
    //      - change Q to next Q


    $(".answers").on("click", function () {

        // user selects the answer
        // check to see if the answer is correct
        // 
        console.log($(this).val());

        //stop the timer
        clearInterval(gameTimer);

        //switch on the value of the button clicked to see if the user 
        //got the correct answer
        switch ($(this).val()) {

            case "1":
                answer = 0;
                break;

            case "2":
                answer = 1;
                break;

            case "3":
                answer = 2;
                break;

            case "4":
                answer = 3;
                break;
        }

        console.log("the answer selected was: " + answer);
        console.log(questionsObj["Q" + currentQuestion].correctAnswer);

        showAnswer();

        // show the results/answers and image for 5 seconds
        answerTimer = setInterval(checkIfAnswerTimeIsExpired, 5000);


    });

    // When a character selection for the opponent from middle row is made...
    //     - hide opponent selected - slide not-selected ones to the left
    //     - show the selected one at the bottom

    $("#restart-button").on("click", function () {
        console.log("reset on click handler function");

        //reset the game
        // gameInit();
        $("#question-answer-container").hide();
        $("#results-container").hide();

        $("#start-container").show();
        $("#start-button").hide();
        $(".questions-and-answers").show();

        //reset gameTimer
        gameTimerCounter = 25;

        //index of currentQuestion in Obj
        numberCorrect = 0;
        numberWrong = 0;
        numberTimeouts = 0;

        // reset all user answers in objects to false
        // tabulate the results
        for (i = 0; i < currentQuestion; i++) {
            questionsObj["Q" + i].userAnswer = true;
        }

        //reset current question to 0 - aka the beginning
        currentQuestion = 0;

        nextQuestion();
        gameTimer = setInterval(checkIfQuestionTimeIsExpired, 1000);

    });


});