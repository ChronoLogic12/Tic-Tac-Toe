//Variable declaration
const tiles = document.querySelectorAll('.tile');
let currentTurn = "X"; 
let button = document.querySelector('.start-button');
const board = document.querySelector('.board');

//functions

//restart
const restart = () => {
    tiles.forEach(tile => {
        tile.children[0].innerHTML = "";
    })
    currentTurn = "X";
    button.children[0].innerHTML = "Restart?";
    board.classList.remove('board-inactive');
}

button.addEventListener('click', restart);

//change whos turn it is 
const updateTurn = () => {
    if (currentTurn === "X") {
        currentTurn = "O";
    } else {
        currentTurn = "X";
    }
}

//update tiles, change turn and check for game over state
const makeMove = () => { 
    tiles.forEach(tile => {
        tile.addEventListener("click", () => {
            if (!tile.children[0].innerHTML) {
            tile.children[0].innerHTML = currentTurn;
            updateTurn();
            checkWin(); 
            }
        })
    })
}

//check for winning board condition
const checkWin = () => {    
    //inner HTML for each tile
    let tile1 = document.getElementById('tile-1').children[0].innerHTML;
    let tile2 = document.getElementById('tile-2').children[0].innerHTML;
    let tile3 = document.getElementById('tile-3').children[0].innerHTML;
    let tile4 = document.getElementById('tile-4').children[0].innerHTML;
    let tile5 = document.getElementById('tile-5').children[0].innerHTML;
    let tile6 = document.getElementById('tile-6').children[0].innerHTML;
    let tile7 = document.getElementById('tile-7').children[0].innerHTML;
    let tile8 = document.getElementById('tile-8').children[0].innerHTML;
    let tile9 = document.getElementById('tile-9').children[0].innerHTML;
    //check each possible win state 
    if (tile1 !== "" && tile1 === tile2 && tile2 === tile3) {
       gameOver(tile1);
    } else if (tile4 !== "" && tile4 === tile5 && tile5 === tile6) {
       gameOver(tile4);
    } else if (tile7 !== "" && tile7 === tile8 && tile8 === tile9) {
       gameOver(tile7);
    } else if (tile1 !== "" && tile1 === tile4 && tile4 === tile7) {
       gameOver(tile1);
    } else if (tile2 !== "" && tile2 === tile5 && tile5 === tile8) {
       gameOver(tile2);
    } else if (tile3 !== "" && tile3 === tile6 && tile6 === tile9) {
       gameOver(tile3);
    } else if (tile1 !== "" && tile1 === tile5 && tile5 === tile9) {
       gameOver(tile1);
    } else if (tile3 !== "" && tile3 === tile5 && tile5 === tile7) {
       gameOver(tile3);
    } else if (tile1 && tile2 && tile3 && tile4 && tile5 && tile6 && tile7 && tile8 && tile9) {
    gameOver("draw");
    };
};

//declare winner and set baord to inactive 
const gameOver = winningSide => {
 if (winningSide === "draw") {
     button.children[0].innerHTML = "DRAW! Play again?";
 } else {
     button.children[0].innerHTML = `${winningSide} WINS! Play again?`;
    }
    board.classList.add('board-inactive');
};


makeMove();