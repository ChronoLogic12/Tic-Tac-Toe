const tiles = document.querySelectorAll('.tile');
console.log(tiles);0
let currentTurn = "X"; 

const updateTurn = () => {
    if (currentTurn === "X") {
        currentTurn = "O";
    } else {
        currentTurn = "X";
    }
}

tiles.forEach(tile => {
    tile.addEventListener("click", () => {
        if (!tile.children[0].innerHTML) {
        tile.children[0].innerHTML = currentTurn;
        updateTurn();
        checkWin();    
        }
    })
})

const checkWin = () => {
   let tile1 = document.getElementById(tile-1).children[0].innerHTML;
   let tile2 = document.getElementById(tile-2).children[0].innerHTML;
   let tile3 = document.getElementById(tile-3).children[0].innerHTML;
   let tile4 = document.getElementById(tile-4).children[0].innerHTML;
   let tile5 = document.getElementById(tile-5).children[0].innerHTML;
   let tile6 = document.getElementById(tile-6).children[0].innerHTML;
   let tile7 = document.getElementById(tile-7).children[0].innerHTML;
   let tile8 = document.getElementById(tile-8).children[0].innerHTML;
   let tile9 = document.getElementById(tile-9).children[0].innerHTML;

   if (tile1 === tile2 && tile2 === tile3) {
       gameOver(tile1);
   };
   if (tile4 === tile5 && tile5 === tile6) {
       gameOver(tile4);
   };
   if (tile7 === tile8 && tile8 === tile9) {
       gameOver(tile7);
   };
   if (tile1 === tile4 && tile4 === tile7) {
       gameOver(tile1);
   };
   if (tile2 === tile5 && tile5 === tile8) {
       gameOver(tile2);
   };
   if (tile3 === tile6 && tile6 === tile9) {
       gameOver(tile3);
   };
   if (tile1 === tile5 && tile5 === tile9) {
       gameOver(tile1);
   };
   if (tile3 === tile5 && tile5 === tile7) {
       gameOver(tile3);
   };
}