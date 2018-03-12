/**
 * hw #4 -jQuery - week-4-game - game.js
 **/

// VARIABLES
// ==========================================================================
//

// Used for passing in to the end which of the 4 characters is 'you' vs being an enemy 
var characterSelected;
var enemySelected;

//tracks enemies defeated.  if this == 3 you win!
var enemiesDefeated = 0;

//Winning music
var audioWinning = document.createElement("audio");
audioWinning.setAttribute("src", "assets/images/Rouser.mp3");

//Losing music 
var audioLosing = document.createElement("audio");
audioLosing.setAttribute("src", "assets/images/Price-is-right-losing-horn.mp3");

//flags for is battle in progress or game is over -> don't register any other mouse clicks...only Restart
var battleInProgeess = false;
var gameOverOrPaused = false;
var characterPicked = false;

//character objects
var reyPlayer = {
    name: "Rey",
    codeName: "rey",
    healthPoints: 70,
    healthPointsInit: 70,
    attackPower: 7,
    attackPowerInit: 7,
    counterAttackPower: 5,
    attackPointsIncrease: function () {
        this.attackPower = this.attackPower * 2;
    }
};

var lukeSkywalkerPlayer = {
    name: "Luke Skywalker",
    codeName: "luke-skywalker",
    healthPoints: 60,
    healthPointsInit: 60,
    attackPower: 13,
    attackPowerInit: 13,
    counterAttackPower: 12,
    attackPointsIncrease: function () {
        this.attackPower = this.attackPower * 2;
    }
};

var kyloRenPlayer = {
    name: "Kylo-Ren",
    codeName: "kylo-ren",
    healthPoints: 50,
    healthPointsInit: 50,
    attackPower: 7,
    attackPowerInit: 7,
    counterAttackPower: 10,
    attackPointsIncrease: function () {
        this.attackPower = this.attackPower * 2;
    }
};

var generalHuxPlayer = {
    name: "General Hux",
    codeName: "general-hux",
    healthPoints: 20,
    healthPointsInit: 20,
    attackPower: 3,
    attackPowerInit: 3,
    counterAttackPower: 2,
    attackPointsIncrease: function () {
        this.attackPower = this.attackPower * 2;
    }
};

// FUNCTIONS
// ==============================================================================

// add class from an HTML element
function hideElement(elementName) {
    console.log(elementName);
    $(elementName).addClass("d-none");
}

// remove class from an HTML element
function showElement(elementName) {
    console.log(elementName);
    $(elementName).removeClass("d-none");
}

// remove class from an HTML element
function changeTextInDisplay(elementName, textToChange) {
    console.log(elementName);
    $(elementName).text(textToChange);

}

// // play a sound upon winning
// function ding() {
//     $("body").append('<embed src="../images/rouser.mp3" autostart=false autoplay=false type="audio/mpeg" loop="false" width="0" height="0" id="beep" enablejavascript="true" />');
//     setTimeout(function(){ $("#beep").remove(); },2000);
// }

// MAIN PROCESS
// ==============================================================================

// Captures keyboard input. Depending on the letter pressed it will "call " (execute) different functions.
$(document).ready(function () {


    // Play an audio track of the band.
    // var audio = new Audio("$HOME/Documents/uOfMinnesotaBootCampHomeworks/week-4-game/assets/images/Rouser.mp3");
    // audio.play();

    //     // Captures the key press, converts it to lowercase, and saves it to a variable.
    //     var letter = String.fromCharCode(event.which).toLowerCase();


    console.log("in the website ready function");

    // When a character to fight selection (aka click) from top row is made...
    //     - hide instruction row text
    //     - change text on row below characters not selected
    //     - hide characters not selected - slide selected one to the left
    //     - show the other 3 characters on the next section

    $(".row-2").on("click", ".characters-star-wars-top", function () {

        //don't allow any other clicks to register if game is over or battle is in progress
        if (battleInProgeess == true || gameOverOrPaused == true) {
            return;
        }

        console.log("inthe top character selection .on\(\"click\"\) function ")
        console.log("inside the row-2 clicked");
        console.log($(this).val());

        // If initial click received -> hide instruction bar 
        showElement(".row-1");

        //change text on row-3 and hide the enemies text
        $(".row-3 p").text("Enemies Available To Attack");
        hideElement(".row-5 #enemies-text-hide");

        // user selects the Star Wars Character they want to fight with.
        // hide the other choices, but make the others appear on line 2
        // set characterSelected for battle purposes
        switch ($(this).val()) {

            case "rey":
                hideElement(".row-2 #luke-skywalker");
                hideElement(".row-2 #kylo-ren");
                hideElement(".row-2 #general-hux");
                showElement(".row-4 #luke-skywalker");
                showElement(".row-4 #kylo-ren");
                showElement(".row-4 #general-hux");
                characterSelected = reyPlayer;
                break;

            case "luke-skywalker":
                hideElement(".row-2 #rey ");
                hideElement(".row-2 #kylo-ren");
                hideElement(".row-2 #general-hux");
                showElement(".row-4 #rey");
                showElement(".row-4 #kylo-ren");
                showElement(".row-4 #general-hux");
                characterSelected = lukeSkywalkerPlayer;
                break;

            case "kylo-ren":
                hideElement(".row-2 #rey");
                hideElement(".row-2 #luke-skywalker");
                hideElement(".row-2 #general-hux ");
                showElement(".row-4 #rey");
                showElement(".row-4 #luke-skywalker");
                showElement(".row-4 #general-hux ");
                characterSelected = kyloRenPlayer;
                break;

            case "general-hux":
                hideElement(".row-2 #rey");
                hideElement(".row-2 #luke-skywalker");
                hideElement(".row-2 #kylo-ren");
                showElement(".row-4 #luke-skywalker");
                showElement(".row-4 #kylo-ren");
                showElement(".row-4 #rey ");
                characterSelected = generalHuxPlayer;
                break;
        }
    });

    // When a character selection for the opponent from middle row is made...
    //     - hide opponent selected - slide not-selected ones to the left
    //     - show the selected one at the bottom

    $(".row-4").on("click", ".characters-star-wars-middle", function () {
        console.log("inthe middle character selection .on\(\"click\"\) function ")
        console.log("inside the row-4 clicked");
        console.log($(this).val());

        //hide text of battle winner
        hideElement(".row-7 #battle-winner-text");

        //don't allow any other clicks to register if game is over or battle is in progress
        if (battleInProgeess == true || gameOverOrPaused == true) {
            return;
        }

        //set flag that battle has begun
        battleInProgeess = true;
        characterPicked = true;

        // user selects the Star Wars Character they want to fight against
        // show the selection on row 6, but make the others on row 4 slide left
        switch ($(this).val()) {
            case "rey":
                //hide elements on row 4, show on row 6
                hideElement(".row-4 #rey");
                showElement(".row-6 #rey");
                enemySelected = reyPlayer;
                break;

            case "luke-skywalker":
                hideElement(".row-4 #luke-skywalker");
                showElement(".row-6 #luke-skywalker");
                enemySelected = lukeSkywalkerPlayer;
                break;

            case "kylo-ren":
                hideElement(".row-4 #kylo-ren");
                showElement(".row-6 #kylo-ren");
                enemySelected = kyloRenPlayer;
                break;

            case "general-hux":
                console.log("inside the general-hux clicked");
                hideElement(".row-4 #general-hux");
                showElement(".row-6 #general-hux");
                enemySelected = generalHuxPlayer;
                break;
        }

        //if there is only 1 left (== 2 defeated ) collapse the Enemies line placeholder
        if (enemiesDefeated == 2) {
            hideElement(".row-4 #placeholder");
        }
    });

    //attack button click handler
    $(".row-5").on("click", function () {

        //don't allow any other clicks to register if game is over or waiting for new character selection
        if (gameOverOrPaused == true || characterPicked == false ) {
            return;
        }

        console.log("inthe bottom attack selection .on\(\"click\"\) function ")
        console.log("inside the row-4 clicked");

        // set top line of text at bottom of screen
        // You attacked 'enemy name' for 'character selected attack points' damage.
        changeTextInDisplay(".row-7 #defender-name", enemySelected.name);
        changeTextInDisplay(".row-7 #attack-points", characterSelected.attackPower);

        // set bottom line of text at bottom of screen
        // 'enemy name' attacked you back for 'enemy selected attack points' damage.
        changeTextInDisplay(".row-7 #defender-attack-points", enemySelected.counterAttackPower);

        showElement(".row-7 #bottom-text-area");

        console.log("hero health:" + characterSelected.healthPoints + "::Counter attack" + enemySelected.counterAttackPower);
        console.log("enemy health:" + enemySelected.healthPoints + ":: attack power" + characterSelected.attackPower);

        //battle after 'Attack' button is clicked
        characterSelected.healthPoints = characterSelected.healthPoints - enemySelected.counterAttackPower;
        enemySelected.healthPoints = enemySelected.healthPoints - characterSelected.attackPower;

        console.log("hero health:" + characterSelected.healthPoints);
        console.log("enemy health:" + enemySelected.healthPoints);
        console.log(".row-6 #" + enemySelected.codeName + " #" + enemySelected.codeName + "-health");
        changeTextInDisplay(".row-2 #" + characterSelected.codeName + " #" + characterSelected.codeName + "-health", characterSelected.healthPoints);
        changeTextInDisplay(".row-6 #" + enemySelected.codeName + " #" + enemySelected.codeName + "-health", enemySelected.healthPoints);



        //if your health points is <= 0 you lose
        //TODO: still need to handle tie scenario
        if (characterSelected.healthPoints <= 0) {
            console.log("you lose");
            hideElement(".row-7 #bottom-text-area");
            showElement(".row-7 #loser-text-area");
            showElement(".row-7 #restart-button");
            audioLosing.play();
            gameOverOrPaused = true;
            changeTextInDisplay(".row-6 #" + enemySelected.codeName + " #" + enemySelected.codeName + "-health", "WINNER!!");
        }
        else if (enemySelected.healthPoints <= 0) {
            //increment number of enemies defeated...if this == 3 you win!
            enemiesDefeated++;
            //hide image of defeated enemy
            hideElement(".row-6 #" + enemySelected.codeName);
            //hide stats text box
            hideElement(".row-7 #bottom-text-area");
            //setup and display that you defeated an enemy and what to do to contnue
            changeTextInDisplay("#battle-winner-text #defender-name", enemySelected.name);
            showElement(".row-7 #battle-winner-text");
            battleInProgeess = false;
            characterPicked = false;
        }

        //if enemiesDefeated == 3 you win!
        if (enemiesDefeated == 3) {
            console.log("you win");
            showElement(".row-7 #restart-button")
            showElement(".row-7 #winner-text-area");
            hideElement("#bottom-text-area");
            hideElement("#battle-winner-text");
            audioWinning.play();
            gameOverOrPaused = true;
        }



        console.log("attack power::" + characterSelected.attackPower);
        //increase attack power of the character selected
        characterSelected.attackPointsIncrease();

        console.log("attack power::" + characterSelected.attackPower);

    });

    $("#restart-button").on("click", function () {

        //set up intial game screen - show all chars and hide 'you character' 
        // and reset the instructions to pick a character
        hideElement(".row-1");
        showElement(".row-2 #rey");
        showElement(".row-2 #luke-skywalker");
        showElement(".row-2 #kylo-ren");
        showElement(".row-2 #general-hux");
        $(".row-3 p").text("Pick the character you want to be for battle!");

        //reset health points and then write them to the screen
        reyPlayer.healthPoints = reyPlayer.healthPointsInit;
        lukeSkywalkerPlayer.healthPoints = lukeSkywalkerPlayer.healthPointsInit;
        kyloRenPlayer.healthPoints = kyloRenPlayer.healthPointsInit;
        generalHuxPlayer.healthPoints = generalHuxPlayer.healthPointsInit;
        changeTextInDisplay(".row-2 #rey-health", reyPlayer.healthPoints);
        changeTextInDisplay(".row-2 #luke-skywalker-health", lukeSkywalkerPlayer.healthPoints);
        changeTextInDisplay(".row-2 #kylo-ren-health", kyloRenPlayer.healthPoints);
        changeTextInDisplay(".row-2 #general-hux-health", generalHuxPlayer.healthPoints);
        console.log(reyPlayer.attackPower+" " + reyPlayer.attackPowerInit);
        
        //reset attack points for all characters
        reyPlayer.attackPower = reyPlayer.attackPowerInit;
        lukeSkywalkerPlayer.attackPower = lukeSkywalkerPlayer.attackPowerInit;
        kyloRenPlayer.attackPower = kyloRenPlayer.attackPowerInit;
        generalHuxPlayer.attackPower = generalHuxPlayer.attackPowerInit;

        // Hide all of row 4 - middle row and put placeholder back to match the game example
        // as well as enemies text that needs to be shown at init
        hideElement(".row-4 #rey");
        hideElement(".row-4 #luke-skywalker");
        hideElement(".row-4 #kylo-ren");
        hideElement(".row-4 #general-hux");
        showElement(".row-4 #placeholder")
        showElement(".row-5 #enemies-text-hide");

        // hide all of row 6 characters for init 
        hideElement(".row-6 #rey");
        hideElement(".row-6 #luke-skywalker");
        hideElement(".row-6 #kylo-ren");
        hideElement(".row-6 #general-hux");
        changeTextInDisplay(".row-6 #rey-health", reyPlayer.healthPoints);
        changeTextInDisplay(".row-6 #luke-skywalker-health", lukeSkywalkerPlayer.healthPoints);
        changeTextInDisplay(".row-6 #kylo-ren-health", kyloRenPlayer.healthPoints);
        changeTextInDisplay(".row-6 #general-hux-health", generalHuxPlayer.healthPoints);
        

        hideElement(".row-7 #bottom-text-area");
        hideElement(".row-7 #battle-winner-text");
        hideElement(".row-7 #winner-text-area");
        hideElement(".row-7 #loser-text-area");
        hideElement(".row-7 #restart-button");

        //tracks enemies defeated.  if this == 3 you win!
        enemiesDefeated = 0;


        //flags for is battle in progress or game is over -> don't register any other mouse clicks...only Restart
        battleInProgeess = false;
        gameOverOrPaused = false;
        characterPicked = false;


        console.log("reset function");
    });


});