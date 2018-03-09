//Begin Hangman Game JS code - game.js

// initialize game variables
var wins = 0;
var losses = 0;
var guessesLeft = 9;
var pastUserGuesses = [];
var arrayOfWordChoices = ["fractals", "addition", "multiplier", "quadratic", "isosceles", "dodecahedron"];
var displayLetterArray = [];
var hangmanWordSelectedArray = [];
var foundLetterArray = [];
var lettersLeftToFind;

//declare variables and initialize them
// Creates an array that lists out all of the options .
var userGuessesValidSet = genCharArray();

// Initialize computerGuess 
// Randomly chooses a choice from the options array. This is the Computer's selection of the hangman word.
var hangmanWordSelected = arrayOfWordChoices[Math.floor(Math.random() * arrayOfWordChoices.length)];

//convert word selected to array of letters
var hangmanWordSelectedArray = Array.from(hangmanWordSelected);

//setup var to track # of letters left to find
lettersLeftToFind = hangmanWordSelectedArray.length;

//init blank array of '_' and convert to a string to be able to display
displayLetterArray = generateBlankArray("_", hangmanWordSelectedArray.length);
var displayLetterString = displayLetterArray.join(" ");
// var string = guessesSoFar.join(",");
console.log(displayLetterString);

//setup loading in the blanks for the hangman word in HTML
var displayLetterStringHTML = document.getElementById("guess-this-word")
displayLetterStringHTML.innerHTML = (displayLetterString);
console.log(displayLetterString);


var userGuessesHTML = document.getElementById("user-guesses")
guessesHTMLString = createArrayString(pastUserGuesses);
userGuessesHTML.innerHTML = (" " + guessesHTMLString + " ");

//Take in user guess
//This function is run whenever the user presses a key.
document.onkeyup = function (event) {

    // Determines which key was pressed.
    var userGuess = event.key;

    // Alerts the key the user pressed (userGuess).
    // alert("User guess: " + userGuess);
    console.log("user guess: " + userGuess + "computer Guess: " + hangmanWordSelected);


    //IF user guess is a lowercase character proceed
    if (validateUserData(userGuess) == true) {

        //Get hangman word picked from the array by the computer choice
        //Compare hangman word selected to user choice to determine if there was a match
        //
        //determine if user guessed a letter correctly 
        //      loop to find letter match - loop through whole word because there could be duplicate letters
        //      exhange blanks('_') in found array for letters in hangman word array
        //      reveal letter (update HTML)
        //
        //if match 
        //  if all letters have been found - check letter array for all empty denoted by '_'            
        //      wins function
        //          wins++
        //          congratulate user
        //          display new background image
        //          ?play a song?
        //      reset function
        //          reset letters guessed
        //          make new word choice by computer]
        //  else
        //      
        //else !match
        //  decrement guesses left (update HTML guesses)
        //  append to guesses chosen (update HTML guesses)

        //take user input and change display of necessary
        //determine how many letters are left to find
        var didUserFindALetter = determineIfUserGuessedALetter(hangmanWordSelectedArray, userGuess);

        //update found letters in HTML
        displayLetterString = displayLetterArray.join(" ");
        displayLetterStringHTML.innerHTML = (displayLetterString);
        console.log(displayLetterString);

        console.log(didUserFindALetter);

        //check variable to see if there are any letter left to find - check with didUserFindALetter is likely redundant
        //if 0 letters left....user wins
        if (lettersLeftToFind == 0 && didUserFindALetter == true) {

            //handle user winning
            userWins();

            //reset the game so user can guess a different
            resetGameNextWord();
        }
        //else user did not find a letter decrement the guessesLeft
        else if (didUserFindALetter == false) {
            guessesLeft--;
            //add user guess to the array of incorrect user guesses
            pastUserGuesses.push(userGuess);

            //Decrement guesses left total in HTML
            //Get HTML element for displaying guesses left
            var guessesLeftHtml = document.getElementById("guesses-left");
            //set HTML to current wins total
            guessesLeftHtml.innerHTML = ("<strong>" + guessesLeft + "</strong>");
            console.log(guessesLeft + " ");

            //createand then display HTML string from an array
            //set HTML to display the user guesses
            var userGuessesHTML = document.getElementById("user-guesses")
            guessesHTMLString = createArrayString(pastUserGuesses);
            userGuessesHTML.innerHTML = (" " + guessesHTMLString + " ");

        }
        // ELSE user must have found a letter but didn't solved the word
        //          do nothing

        //check if user ran out of guesses
        //if no guesses left 
        //  increment losses
        //  reset guesses for next 'game'
        //  reset guesses array
        //else 
        //  do nothing
        console.log("guessesLeft" + guessesLeft);
        if (guessesLeft == 0) {
            losses++;

            //reset for the next game
            pastUserGuesses.length = 0;
            guessesLeft = 9;

            //ask user to try again
            alert("Please try again.  The word was '" + hangmanWordSelected + "'.");

            // Initialize new computerGuess 
            // Randomly chooses a choice from the options array. This is the Computer's guess.
            computerGuess = hangmanWordSelected[Math.floor(Math.random() * hangmanWordSelected.length)];

            //Increment wins total in HTML
            //Get HTML element for displaying wins
            var lossesHTML = document.getElementById("losses-total");
            //set HTML to current wins total
            lossesHTML.innerHTML = ("<strong>" + losses + "</strong>");

            console.log("final user guess" + userGuess);

            //reset the game so user can guess a different
            resetGameNextWord();

        }
    }
    //ELSE tell user to enter a letter a-z (lowercase)
    else {
        alert("Please enter a letter a-z (lowercase only). \n Or a letter you have not correctly guesssed yet.");
    }
};

//
//JS function declarations
//


//Compare hangman word selected to user choice to determine if there was a match
//
//(determine if the user guesses a letter function) 
//      loop to find letter match - loop through whole word because there could be duplicate letters
//      exhange blanks('_') in found array for letters in hangman word array if they matched a user guess 
//          check the entire word and swap matches for blank
//      reveal letter (update HTML)
function determineIfUserGuessedALetter(wordSelectedArray, guessedLetter) {
    var foundFlag = false;

    //look through the word array for matches to guessedLetter
    for (i = 0; i < wordSelectedArray.length; i++) {
        console.log(guessedLetter + " " + wordSelectedArray[i] + " letterleft to find" + lettersLeftToFind);
        if (guessedLetter == wordSelectedArray[i]) {
            //swap characters from blank display with the hangman word if letter found
            //searching entire word array each time
            displayLetterArray[i] = wordSelectedArray[i];
            wordSelectedArray[i] = "_";

            //remove the guessed letter from the valid set of letters to guess so if the user picks 
            //  the letter guessed correctly again it won't count against them
            console.log("slice a letter before" + userGuessesValidSet);
            var indexAlreadyGuessed = userGuessesValidSet.indexOf(guessedLetter) 
            userGuessesValidSet.splice(indexAlreadyGuessed, 1);

            console.log("slice a letter after " + userGuessesValidSet);

    //         index = array.indexOf(element);
    // array.splice(index, 1);

            console.log(guessedLetter + wordSelectedArray[i] + " " + "comp word:" + wordSelectedArray.toString() + " display word:" + displayLetterArray.toString());

            //decrement counter which is the indicator when 0 that the user is a winner - tested outside of this function
            lettersLeftToFind--;
            console.log(guessedLetter + " " + wordSelectedArray[i] + " letterleft to find" + lettersLeftToFind);

            foundFlag = true;
        }

    }
    console.log(foundFlag);
    return foundFlag;
}

//handle user winning and reset for the next game
function userWins() {
    wins++;
    guessesLeft = 9;
    pastUserGuesses.length = 0;


    //Increment wins total in HTML
    //Get HTML element for displaying wins
    var winsHTML = document.getElementById("wins-total");
    //set HTML to current wins total
    winsHTML.innerHTML = ("<strong>" + wins + "</strong>");


    //Reset guesses left total in HTML
    //Get HTML element for displaying guesses left
    var guessesLeftHtml = document.getElementById("guesses-left");
    //set HTML to current wins total
    guessesLeftHtml.innerHTML = ("<strong>" + guessesLeft + "</strong>");

    //clear the user choices because it is the end of the game
    //set HTML to display the user guesses
    var userGuessesHTML = document.getElementById("user-guesses")
    userGuessesHTML.innerHTML = (" ");

    //ask user to try again
    alert("You win!! The winning guess was: " + hangmanWordSelected);

}

//generate blank array of letters to display
function generateBlankArray(characterToSeedWith, lengthOfArray) {
    var seededArray = [];
    for (i = 0; i < lengthOfArray; i++) {
        seededArray[i] = characterToSeedWith;
    }
    return seededArray;
}

// generate array of alphabet a-z; lowercase letters only
function genCharArray() {
    var alpha = "a".charCodeAt(0);
    var omega = "z".charCodeAt(0);
    var arrayName = [];  // emtpy array

    // set variable to increment with
    var alphaI = alpha;
    console.log(alphaI + "beginning of alphabet;" + omega + "end of alphabet");
    for (alphaI; alphaI <= omega; alphaI++) {
        arrayName.push(String.fromCharCode(alphaI));
        console.log(String.fromCharCode(alphaI));
    }
    return arrayName;
}

//checks if input is in the valid set - used in this case to validate user input as a lowercase letter or not
function validateUserData(userData) {
    for (i = 0; i < userGuessesValidSet.length; i++) {
        if (userData == userGuessesValidSet[i]) {
            return true;
        }
    }
    return false;
}

//create HTML string from an array
function createArrayString(array) {
    var string = ""; //initialize string to a blank value
    var arrayLength = array.length;

    for (i = 0; i < arrayLength; i++) {
        string = (string + array[i] + ", ");
    }
    return string;
}

//reset the game so user can guess a different
function resetGameNextWord() {

    // Initialize new computerGuess 
    // Randomly chooses a choice from the options array. This is the Computer's guess.
    hangmanWordSelected = arrayOfWordChoices[Math.floor(Math.random() * arrayOfWordChoices.length)];

    //convert word selected to array of letters
    hangmanWordSelectedArray = Array.from(hangmanWordSelected);

    //setup var to track # of letters left to find
    lettersLeftToFind = hangmanWordSelectedArray.length;

    //init blank array of '_' and convert to a string to be able to display
    displayLetterArray = generateBlankArray("_", hangmanWordSelectedArray.length);
    displayLetterString = displayLetterArray.join(" ");
    console.log(displayLetterString);

    //setup loading in the blanks for the hangman word in HTML
    displayLetterStringHTML = document.getElementById("guess-this-word")
    displayLetterStringHTML.innerHTML = (displayLetterString);
    console.log(displayLetterString);


    //reset user guesses
    userGuessesHTML = document.getElementById("user-guesses")
    guessesHTMLString = createArrayString(pastUserGuesses);
    userGuessesHTML.innerHTML = (" ");

    //Reset guesses left total in HTML
    //Get HTML element for displaying guesses left
    var guessesLeftHtml = document.getElementById("guesses-left");
    //set HTML to current wins total
    guessesLeftHtml.innerHTML = ("<strong>" + guessesLeft + "</strong>");
}

