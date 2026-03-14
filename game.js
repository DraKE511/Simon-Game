// Initializing the color boxes for sequence pattern
var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

// Starting Point Variables
var started = false;
var level = 0;

// Function to play the sound
function playSound(name) {
    var colorAudio = new Audio("./sounds/" + name + ".mp3");
    colorAudio.play();
}

// Function to highlight the pressed button
function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");

    setTimeout(function() {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

// Function to keep track of 1st keypress
$(document).keydown(function() {
    if (!started) {
        nextSequence();
        started = true;
    }
});

// Function to identify the clicked button and next user Pattern
$(".btn").click(function() {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);

    // Play the sound with clicked color
    animatePress(userChosenColor);
    playSound(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
});

// Function to generate the next color sequence
function nextSequence() {
    // Reset the User Pattern array for next level
    userClickedPattern = [];

    // Set the Current-Level Title
    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    // Flash the Chosen button with sound
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}

// Function to check the User Sequence
function checkAnswer(currentLevel) {
    // currentLevel is the position of the last answer in the user's sequence
    console.log("Checking answer at index: " + currentLevel);

    // Compare User Pattern with the actual Game Pattern
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("Correct!");

        // Based on correct answer, the next Pattern should be generated
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }

    } else {
        console.log("Wrong!");
        playSound("wrong");

        // Apply the Game-over background & header
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart...");
        startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}