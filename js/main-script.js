// game reset and start event
var start = document.body;
start.addEventListener("keydown", playGame);
console.log("hello");


// variable definition
const color_options = ["green", "red", "yellow", "blue"];
var pattern = [];
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
    pattern =[];
    pattern_index = 0;
    setTimeout ( ()=>{
    generateColor();}, 200);

    game_block_green.onclick = () => {userClicked(game_block_green)};
    game_block_red.onclick = () => {userClicked(game_block_red)};
    game_block_yellow.onclick = () => {userClicked(game_block_yellow)};
    game_block_blue.onclick = () => {userClicked(game_block_blue)};

}



function userClicked(game_block){
    if (game_block.style.backgroundColor === pattern[pattern_index]){
        pattern_index += 1;
        audioPlay(game_block);
        changeStyle(game_block, "click");
        if (pattern_index === pattern.length){
            setTimeout(function() {
                generateColor();
                }, 600);
            pattern_index = 0;
    }
    }
    else {loseGame();
        console.log("error");}
}

function audioPlay(block){
    var audio_name = block.style.backgroundColor;
    if (audio_name === "rgb(1, 28, 56)") var audio = new Audio("./assets/sounds/wrong.mp3");
    else var audio = new Audio(`./assets/sounds/${audio_name}.mp3`);
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
    console.log(pattern);
    var chosen_game_block = document.getElementById(chosen_color);
    audioPlay(chosen_game_block);
    changeStyle(chosen_game_block, " ");
    var status = document.getElementById("heading");
    status.innerText = `Level ${pattern.length}`;

}

function loseGame(){
    var original_background = document.body.style.backgroundColor; 
    audioPlay(game_body);
    document.body.style.backgroundColor = "red";
    setTimeout (() => {
        document.body.style.backgroundColor = original_background;
        console.log("hello");
    }, 200);
    var status = document.getElementById("heading");
    status.innerText = "Game Over, Press Any key To Restart";
    pattern =[];
    pattern_index = 0;
    game_block_green.onclick = () => {};
    game_block_red.onclick = () => {};
    game_block_yellow.onclick = () => {};
    game_block_blue.onclick = () => {};


}