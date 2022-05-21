// variable definition
const color_options = ["green", "red", "yellow", "blue"];
const pattern = [];


// setting the background colors of the game blocks in JS so that they can be accessed and edited easier in JS"
var game_block_green = document.getElementById("green");
game_block_green.style.backgroundColor = "green";
var game_block_red = document.getElementById("red");
game_block_red.style.backgroundColor = "red";
var game_block_yellow = document.getElementById("yellow");
game_block_yellow.style.backgroundColor = "yellow";
var game_block_blue = document.getElementById("blue");
game_block_blue.style.backgroundColor = "blue";


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


function userClicked(game_block){
    if (game_block.style.backgroundColor){
        audioPlay(game_block);
        changeStyle(game_block, "active");
    }

}

function audioPlay(game_block){
    var audio_name = game_block.style.backgroundColor;
    var audio = new Audio(`../assets/sounds/${audio_name}.mp3`);
    audio.play();

}


function changeStyle(game_block, mode){
    var original_bg = game_block.style.backgroundColor;
    console.log(original_bg);
    if (mode === "active"){
        game_block.style = "background-color: grey; box-shadow: 0 0 10px white;";
    }
    else {
        game_block.style = "opacity: 0";
    }
    console.log(game_block.style);
    setTimeout(function(){
        game_block.style = "";
        game_block.style.backgroundColor = original_bg;
    }, 150);
    
}

function generateColor(){
    var color_chosen = color_options[Math.floor(Math.random() * color_options.length)];
    pattern.push(color_chosen);
    var chosen_game_block = document.getElementById(color_chosen);
    audioPlay(chosen_game_block);
    changeStyle(chosen_game_block, " ");

}

chooseGameBlock();