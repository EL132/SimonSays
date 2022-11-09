// // need to do the press key to start 

// var colorArray = ["green", "red", "yellow", "blue"];
// // the order is the current pattern of the game 
// var order = [];

// // to generate the next number being used 
// function nextSequence() {
//     // initialize a new random index every method call 
//     var randy = Math.floor(Math.random() * 4);
//     // new random color with every method call 
//     var randomChosenColor = colorArray[randy];
//     // add the new color to my order array 
//     order.push(randomChosenColor);

//     $("#" + randomChosenColor).fadeIn(1000).fadeOut(1000).fadeIn(1000);

//     var sound = new Audio("sounds/" + randomChosenColor + ".mp3");
//     sound.play();    
// }

// // step 4
// $(".btn").click(function() {
    
// })

var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

$(document).keypress(function() {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
}); // start game

$(".btn").click(function() {
    // retrieve the user's click data and compare with generated pattern
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
}); // btn-click

function checkAnswer(currentLevel) {
    // if the user is correct
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function () {
                nextSequence();
            }, 1000);
        } // if
    } else {
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");

        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200); // timeOut

        startOver();
    } // if
} // checkAnswer

function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomColor = buttonColors[randomNumber];
    gamePattern.push(randomColor);

    $("#" + randomColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomColor);
} // nextSequence

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
} // animatePress

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
} // playSound

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
} // startOver