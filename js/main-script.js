
// game reset and start event
var start = document.body;
start.addEventListener("keypress", playGame);

// variable definition
const color_options = ["green", "red", "yellow", "blue"];
const pattern = [];
var pattern_index = 0;


// setting the background colors of the game blocks and body tag in JS so that they can be accessed and edited easier in JS
var game_body = document.body;
game_body.style.backgroundColor = "rgb(1, 28, 56)";
var game_block_green = document.getElementById("green");
game_block_green.style.backgroundColor = "green";
var game_block_red = document.getElementById("red");
game_block_red.style.backgroundColor = "red";
var game_block_yellow = document.getElementById("yellow");
game_block_yellow.style.backgroundColor = "yellow";
var game_block_blue = document.getElementById("blue");
game_block_blue.style.backgroundColor = "blue";


//main function
function playGame(){
    start.removeEventListener("keypress", playGame);
    
    chosen_color = generateColor();
    //adding the event listners on the event of being clicked for the game block which all use the same callback function userClicked
    game_block_green.addEventListener("click", function(){
        userClicked(game_block_green);
    }, false);
    game_block_red.addEventListener("click", function(){
        userClicked(game_block_red);
    }, false);
    game_block_yellow.addEventListener("click", function(){
        userClicked(game_block_yellow);
    }, false);
    game_block_blue.addEventListener("click", function(){
        userClicked(game_block_blue);
    }, false);


}


function userClicked(game_block){
    if (game_block.style.backgroundColor === pattern[pattern_index]){
        pattern_index += 1;
        audioPlay(game_block);
        changeStyle(game_block, "click");
        if (pattern_index === pattern.length){
            setTimeout(function() {
                generateColor();
                var status = document.getElementById("heading");
                status.innerText = `Level ${pattern.length}`;
                }, 600);
            pattern_index = 0;
            
    }
    }
    else loseGame();
}

function audioPlay(block){
    var audio_name = block.style.backgroundColor;
    if (audio_name === "rgb(1, 28, 56)") var audio = new Audio("../assets/sounds/wrong.mp3");
    else var audio = new Audio(`../assets/sounds/${audio_name}.mp3`);
    audio.play();

}


function changeStyle(game_block, mode){
    var original_background = game_block.style.backgroundColor;
    if (mode === "click"){
        game_block.style = "background-color: grey; box-shadow: 0 0 10px white;";
    }
    else {
        game_block.style = "opacity: 0";

    }
    setTimeout(function(){
        game_block.style = "";
        game_block.style.backgroundColor = original_background;
    }, 150);
    
}

function generateColor(){
    var chosen_color = color_options[Math.floor(Math.random() * color_options.length)];
    pattern.push(chosen_color);
    var chosen_game_block = document.getElementById(chosen_color);
    audioPlay(chosen_game_block);
    changeStyle(chosen_game_block, " ");
    return chosen_color;

}

function loseGame(){
    var game_body = document.body; 
    var original_background = game_body.style.backgroundColor; 
    audioPlay(game_body);
    document.body.style.backgroundColor = "red";
    setTimeout (function(){
        game_body.style.backgroundColor = original_background;
    }, 180);
    var status = document.getElementById("heading");
    status.innerText = "Game Over, Press Any key To Restart";

}