// variable definition
const color_options = ["green", "red", "yellow", "blue"];
var pattern = [];
var pattern_index = 0;
var restarted = true;


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


function turnOnEventListners(){
    game_block_green.onclick = () => {userClicked(game_block_green)};
    game_block_red.onclick = () => {userClicked(game_block_red)};
    game_block_yellow.onclick = () => {userClicked(game_block_yellow)};
    game_block_blue.onclick = () => {userClicked(game_block_blue)};

}


function turnOffEventListners(){
    game_block_green.onclick = () => {};
    game_block_red.onclick = () => {};
    game_block_yellow.onclick = () => {};
    game_block_blue.onclick = () => {};

}

// game reset and start event
var start = document.body;
function startGame(){
    start.onkeydown = playGame;
}


startGame();

//main function
function playGame(){
    start.onkeydown = {};
    generateColor();
    turnOnEventListners();
    

}


// the click event callback function declaration
function userClicked(game_block){
    if (game_block.style.backgroundColor === pattern[pattern_index]){
        restarted = false;
        turnOffEventListners();
        setTimeout(()=>turnOnEventListners(), 500);
        clearTimeout;
        pattern_index += 1;
        var block_color = game_block.style.backgroundColor;
        audioPlay(block_color);
        changeStyle(block_color, "click");
        if (pattern_index === pattern.length){ 
            can_click = false;   
            generateColor();
            pattern_index = 0;

        }
    }
    else loseGame();
}


function audioPlay(block_color){
    if (block_color === "rgb(1, 28, 56)") var audio = new Audio("./assets/sounds/wrong.mp3");
    else var audio = new Audio(`./assets/sounds/${block_color}.mp3`);
    audio.play();

}

// changes the style of the game-block to highlight when clicked or if it's been added to the pattern
// this function has two modes; click when a game-block is clicked and the other when the block is chosen to be inseted into the pattern
function changeStyle(block_color, mode){
    var game_block = document.getElementById(block_color);
    if (mode === "click"){
        game_block.style = "background-color: grey; box-shadow: 0 0 10px white;";

    }
    else game_block.style = "opacity: 0";

    setTimeout(() =>{
        game_block.style = "";
        game_block.style.backgroundColor = block_color;
    }, 200);
    clearTimeout;
    
}


// generates the next color in the pattern randomly and psuhes it into the pattern array while calling changeStyle to highlight it
// the restart variable controls the delay of this function
function generateColor(){
    var chosen_color = color_options[Math.floor(Math.random() * color_options.length)];
    pattern.push(chosen_color);
    if (restarted){
        audioPlay(chosen_color);
        changeStyle(chosen_color, " ");

    }
    else{
    setTimeout(() => {
        audioPlay(chosen_color);
        changeStyle(chosen_color, " ");

    }, 600);} 
    var status = document.getElementById("heading");
    status.innerText = `Level ${pattern.length}`;

}


// handles changing the background and then back and playing the sound when the user loses (enters the pattern wrong)
function loseGame(){
    var original_background = document.body.style.backgroundColor; 
    audioPlay(original_background);
    var status = document.getElementById("heading");
    status.innerText = "Game Over, Press Any key To Restart";
    pattern =[];
    pattern_index = 0;
    turnOffEventListners();
    document.body.style.backgroundColor = "red";
    changeOpacityOnLosing(0.7);
    setTimeout (() => {
        document.body.style.backgroundColor = original_background;
        changeOpacityOnLosing(1);
    }, 200);
    clearTimeout;
    restarted = true;
    startGame();

}


function changeOpacityOnLosing(opacity_value){
    game_block_green.style.opacity = opacity_value;
    game_block_red.style.opacity = opacity_value;
    game_block_yellow.style.opacity = opacity_value;
    game_block_blue.style.opacity = opacity_value;
}