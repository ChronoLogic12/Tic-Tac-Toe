//Global variable declaration
const tiles = document.querySelectorAll('.tile'); 
const button = document.querySelector('.button');
const resetButton = document.querySelector('.reset');
const settingsButton = document.querySelector('.burger');
const settingsMenu = document.querySelector('.settings-menu');
const AItoggle = document.querySelector('.AItoggle');
const board = document.querySelector('.board');
const playerTeam = document.querySelector('.player-team');
const playerTeamButton = document.querySelector('.player-team-toggle');
const team1 = document.querySelector('.team-1');
const team2 = document.querySelector('.team-2');
let currentTurn = "X";
let playerTurn = "X";
let xWins = 0;
let oWins = 0;
let AIactive = false;
let AITiles = [];

//functions

//switch the team the player is on VS AI
const changeTeam = () => {
    playerTurn = toggleTurn(playerTurn);
    playerTeamButton.children[0].innerHTML = playerTurn;
};

playerTeamButton.addEventListener('click', changeTeam);

//activate AI
const activateAI = () => {
    AIactive ? AIactive = false : AIactive = true;
    AItoggle.classList.toggle('active');
    playerTeam.classList.toggle('team-menu-active');
    reset();
    restart();
}

AItoggle.addEventListener('click', activateAI);

//settings menu 
const toggleSettingsAnimation = () => {
    settingsButton.classList.toggle('rotate');
    settingsMenu.classList.toggle('settings-menu-active');
}

settingsButton.addEventListener('click', toggleSettingsAnimation);


//restart
const restart = () => {
    tiles.forEach(tile => {
        tile.children[0].classList.remove('letter-visable');
        tile.classList.remove('highlight', 'darken');
        setTimeout(() => {tile.children[0].innerHTML = ""}, 200);
    })
    currentTurn = "X";
    button.children[0].innerHTML = "Restart?";
    tiles.forEach(tile => {
        tile.classList.remove('inactive');
    })
}

button.addEventListener('click', restart);

//reset score
const reset = () => {
    xWins = 0;
    oWins = 0;
    document.querySelector('.X-wins').innerHTML = xWins;
    document.querySelector('.O-wins').innerHTML = oWins;
}

resetButton.addEventListener('click', reset);

//invert X and O 
const toggleTurn = valueToChange => {
    if (valueToChange === "X") {
        return "O";
    } else {
        return "X";
    }
}

//update tiles, change turn and check for game over state
const makeMove = () => { 
    tiles.forEach(tile => {
        tile.addEventListener("click", () => {
            if (!tile.children[0].innerHTML) {
            tile.children[0].innerHTML = currentTurn;
            tile.children[0].classList.add('letter-visable');
            tile.classList.toggle('inactive');
            currentTurn = toggleTurn(currentTurn);
            let check = checkWin();
            if (AIactive && check) {
                setTimeout(() => {makeAIMove()}, 200);
                }
            }
        })
    });
};

//easy AI
const makeAIMove = () => {
    AITiles = Array.from(tiles).filter(tile => {
        return tile.children[0].innerHTML === "";
    });
    let randomNumber = Math.floor(Math.random()*AITiles.length);
    AITiles[randomNumber].children[0].innerHTML = currentTurn;
    AITiles[randomNumber].children[0].classList.add('letter-visable');
    AITiles[randomNumber].classList.toggle('inactive');
    currentTurn = toggleTurn(currentTurn);
    checkWin();
}

const toggleStyling = (targets, styling, delay) => {
    targets.forEach((target, index) => {
        return delay ? 
            setTimeout(() => {
                target.classList.toggle(styling)
            }, delay + index * delay) :
            target.classList.toggle(styling)
    });
};

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
       toggleStyling([tiles[0], tiles[1], tiles[2]], 'highlight', 200);
       toggleStyling([tiles[3], tiles[4], tiles[5], tiles[6], tiles[7], tiles[8]], 'darken');
       return false;
    } else if (tile4 !== "" && tile4 === tile5 && tile5 === tile6) {
       gameOver(tile4);
       toggleStyling([tiles[3], tiles[4], tiles[5]], 'highlight', 200);
       toggleStyling([tiles[0], tiles[1], tiles[2], tiles[6], tiles[7], tiles[8]], 'darken');
       return false;
    } else if (tile7 !== "" && tile7 === tile8 && tile8 === tile9) {
       gameOver(tile7);
       toggleStyling([tiles[6], tiles[7], tiles[8]], 'highlight', 200);
       toggleStyling([tiles[0], tiles[1], tiles[2], tiles[3], tiles[4], tiles[5]], 'darken');
       return false;
    } else if (tile1 !== "" && tile1 === tile4 && tile4 === tile7) {
       gameOver(tile1);
       toggleStyling([tiles[0], tiles[3], tiles[6]], 'highlight', 100);
       toggleStyling([tiles[1], tiles[2], tiles[4], tiles[5], tiles[7], tiles[8]], 'darken');
       return false;
    } else if (tile2 !== "" && tile2 === tile5 && tile5 === tile8) {
       gameOver(tile2);
       toggleStyling([tiles[1], tiles[4], tiles[7]], 'highlight', 200);
       toggleStyling([tiles[0], tiles[2], tiles[3], tiles[5], tiles[6], tiles[8]], 'darken');
       return false;
    } else if (tile3 !== "" && tile3 === tile6 && tile6 === tile9) {
       gameOver(tile3);
       toggleStyling([tiles[2], tiles[5], tiles[8]], 'highlight', 200);
       toggleStyling([tiles[0], tiles[1], tiles[3], tiles[4], tiles[6], tiles[7]], 'darken');
       return false;
    } else if (tile1 !== "" && tile1 === tile5 && tile5 === tile9) {
       gameOver(tile1);
       toggleStyling([tiles[0], tiles[4], tiles[8]], 'highlight', 100);
       toggleStyling([tiles[1], tiles[2], tiles[3], tiles[5], tiles[6], tiles[7]], 'darken');
       return false;
    } else if (tile3 !== "" && tile3 === tile5 && tile5 === tile7) {
       gameOver(tile3);
       toggleStyling([tiles[2], tiles[4], tiles[6]], 'highlight', 100);
       toggleStyling([tiles[0], tiles[1], tiles[3], tiles[5], tiles[7], tiles[8]], 'darken');
       return false;
    } else if (tile1 && tile2 && tile3 && tile4 && tile5 && tile6 && tile7 && tile8 && tile9) {
    gameOver("draw");
    toggleStyling(tiles, 'darken', 100);
    return false;
    };
    return true;
};

//update score
const updateScore = winningSide => {
    if (winningSide === "X") {
        xWins++;
        document.querySelector('.X-wins').innerHTML = xWins;
    } else if (winningSide === "O") {
        oWins++;
        document.querySelector('.O-wins').innerHTML = oWins;
    }
}

//declare winner and set baord to inactive 
const gameOver = winningSide => {
 if (winningSide === "draw") {
     button.children[0].innerHTML = "DRAW! Play again?";
 } else {
     button.children[0].innerHTML = `${winningSide} WINS! Play again?`;
    }
    updateScore(winningSide);
    tiles.forEach(tile => {
        tile.classList.add('inactive');
    })
};


makeMove();