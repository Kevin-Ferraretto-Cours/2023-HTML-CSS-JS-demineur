//Variables to retrieve the rows and columns the user wants
let rows, columns, oldRows, oldColumns;
//Variables to retrieve the bombs, bombsLeft and bombsRevealed of the difficulty
let bombs, bombsLeft , bombsRevealed;
//Variable used to indicate the state of progress of the game.
let state = document.getElementById("state"); 
//Variable used to create the game, position images and display box status (mines, flag, etc.).
let table, images, cases; 
//Variable for ending the game if the user has lost or won (to avoid clicking again when they've lost).
let playable; 
//Variable for stopwatch
let timeEl = document.getElementById('time'), timer = null, startTime, endTime;

//Function to validate the user's choice of difficulty
function validationConfig() {
  let difficulty = document.getElementById("difficulty").value;
  switch (difficulty) {
    case "1":
      rows = 9;
	    columns = 9;
	    bombs = 10;
      break;
    case "2":
      rows = 16;
      columns = 16;
      bombs = 40;
      break;
    case "3":
      rows = 22;
      columns = 22;
      bombs = 100;
      break;
    case "4":
      rows = 30;
      columns = 30;
      bombs = 250;
      break;
  }
  stopChrono();
  resetChrono();
  resetImg();
  oldColumns = columns;
  oldRows = rows;
  initializationGame();
}

//Function restart when the user presses the restart button
function restart() {
  resetChrono();
  resetImg();
  initializationGame();
}

//Function to reset the visual part of the image boxes
function resetImg() {
  for (let ligne = 0; ligne < oldRows; ligne++) {
    for (let colonne = 0;  colonne < oldColumns; colonne++) {
      let id = ligne * oldColumns + colonne;
      let image = document.getElementById(id);
      if(image !== null) {
        image.parentNode.removeChild(image);
      }
    }
  }
}

//Function to initialize the game
function initializationGame() {
  document.getElementById("restart").disabled = true;
  let div = document.getElementById("areaGame");
  div.style.width = columns * 30 + "px";
  playable = true;
  bombsLeft = bombs;
  bombsRevealed = 0;
  state.innerHTML = 'Cliquez sur les cases pour commencer à Déminer !';
  state.style = 'background-color: lightgray;';

  table = new Array(rows);
  images = new Array(rows);
  cases = new Array(rows);
  for (let i = 0; i < table.length; i++) {
    table[i] = new Array(columns);
    images[i] = new Array(columns);
    cases[i] = new Array(columns);
  }

  generateGrid(div);

  let placement_mines = 0;
  //The while here is used for random mine placement
  while (placement_mines < bombs) {
    let column = Math.floor(Math.random() * columns); 
    let row = Math.floor(Math.random() * rows);
    if (table[row][column] !== 'bomb') { 
      table[row][column] = 'bomb'; 
      placement_mines++;
    }
  }

  increasedDigits();
}

//Function can be used to check the number of digits around it, thus increasing the number of digits.
function increasedDigits() {
  for (let column = 0; column < columns; column++) {
    for (let row = 0; row < rows; row++) {
      if (check(row, column) !== 'bomb') {
        table[row][column] = ((check(row + 1, column) === 'bomb') || 0) +
          ((check(row + 1, column - 1) === 'bomb') || 0) +
          ((check(row + 1, column + 1) === 'bomb') || 0) +
          ((check(row - 1, column) === 'bomb') || 0) +
          ((check(row - 1, column - 1) === 'bomb') || 0) +
          ((check(row - 1, column + 1) === 'bomb') || 0) +
          ((check(row, column - 1) === 'bomb') || 0) +
          ((check(row, column + 1) === 'bomb') || 0);
      }
    }
  }
}

//Function will generate the grid
function generateGrid(div) {
  for (let row = 0; row < rows; row++) {
    for (let column = 0; column < columns; column++) {
      let id = row * columns + column;
      cases[row][column] = document.createElement('img');
      cases[row][column].src = 'images/normal.png';
      cases[row][column].addEventListener('mousedown', clickGame);
      cases[row][column].id = id;
      div.appendChild(cases[row][column]);
      images[row][column] = 'normal';
      table[row][column] = '';
    }
  }
}

//Function that returns the value in the row column array
function check(row, column) {
  if (column >= 0 && row >= 0 && column < columns && row < rows) {
    return table[row][column];
  }
}

//Fonction qui permet d'afficher l'image des bombes desarmocé quand l'utilisateur gagne !
function bombeDefused() {
  for (let row = 0; row < rows; row++) {
    for (let column = 0;  column < columns; column++) {
      if(table[row][column] === "bomb") {
        cases[row][column].src = 'images/bomb_defused.png';
      }
    }
  }
}

//Function that allows you to click on boxes and also set flags or questions
function clickGame(event) {
  let id = event.target.id;
  let row = Math.floor(id / columns);
  let column = id % columns;
  if(playable === true) {
    startChrono();
    if (event.which === 3) {
      rightClick(row, column, event);
    }
    //Informs the user of the number of mines remaining
    state.innerHTML = 'Mines restantes : ' + bombsLeft;
  
    if (event.which === 1 && images[row][column] !== 'flag') {
      if (table[row][column] === 'bomb') {
        lost();
      }
      if (images[row][column] === 'normal') {
        revealedCase(row, column);
      }
    }

    if (bombsRevealed === rows * columns - bombs) {
      won();
    }
  }
}

//Function call when player right click on case
function rightClick(row, column, event) {
  switch (images[row][column]) {
    case 'normal':
      if (bombsLeft > 0) {
        cases[row][column].src = 'images/flag.png';
      bombsLeft--;
      images[row][column] = 'flag';
      }
      break;
    case 'flag':
      cases[row][column].src = 'images/normal.png';
      bombsLeft++;
      images[row][column] = 'normal';
      break;
  }
  event.preventDefault();
}

//Function call when player won
function won() {
  stopChrono();
  bombeDefused();
  let name;
  while (name === undefined || name === null || name == "") {
    name = prompt("Saisir votre nom");
  }
  let winnersEl = document.getElementById("winners");
  winnersEl.append(document.createElement('li'));
  winnersEl.lastElementChild.innerHTML = name + ": " + displayTime(endTime - startTime);
  state.innerHTML = 'Mines Désarmorcées !';
  state.style = "background-color: #6ff42c;";
  document.getElementById("restart").disabled = false;
  playable = false;
}

//Function call when player lost
function lost() {
  stopChrono();
  for (let row = 0; row < rows; row++) {
    for (let column = 0; column < columns; column++) {
      cases[row][column].src = 'images/' + table[row][column] + '.png';
    }
  }
  state.innerHTML = 'GAME OVER';
  state.style = "background-color: #f92424;";
  playable = false;
  document.getElementById("restart").disabled = false;
}

//Function to reveal boxes when the user clicks on a box
function revealedCase(row, column) {
  cases[row][column].src = 'images/' + table[row][column] + '.png';
  if (table[row][column] !== 'bomb' && images[row][column] === 'normal') {
    bombsRevealed++;
  }
  images[row][column] = table[row][column];
  if (table[row][column] === 0) {
    if (column > 0 && images[row][column - 1] === 'normal') {
      revealedCase(row, column - 1);
    }
    if (column < (columns - 1) && images[row][+column + 1] === 'normal') {
      revealedCase(row, +column + 1);
    }
    if (row < (rows - 1) && images[+row + 1][column] === 'normal') {
      revealedCase(+row + 1, column);
    }
    if (row > 0 && images[row - 1][column] === 'normal'){
      revealedCase(row - 1, column);
    }
    if (column > 0 && row > 0 && images[row - 1][column - 1] === 'normal'){
      revealedCase(row - 1, column - 1);
    }
    if (column > 0 && row < (rows - 1) && images[+row + 1][column - 1] === 'normal') {
      revealedCase(+row + 1, column - 1);
    }
    if (column < (columns - 1) && row < (rows - 1) && images[+row + 1][+column + 1] === 'normal'){
      revealedCase(+row + 1, +column + 1);
    }
    if (column < (columns - 1) && row > 0 && images[row - 1][+column + 1] === 'normal') {
      revealedCase(row - 1, +column + 1);
    }
  }
}

//Function to start the chrono
function startChrono() {
  if (timer === null) {
    startTime = Date.now();
    timer = setInterval(function () {
      timeEl.innerHTML = displayTime(Date.now() - startTime);

    }, 5);
  }
}

//Function to stop the time of chrono
function stopChrono() {
  endTime = Date.now();
  clearInterval(timer);
  timer = null;
}

//Function to reset the time of chrono
function resetChrono() {
  stopChrono();
  startTime = endTime = undefined;
  timeEl.innerHTML = displayTime(0);
}

//Function to display the time of chrono
function displayTime(duration) {
  let ms = duration % 1000,
      sec = ((duration - ms) / 1000) % 60,
      min = (duration - ms - (sec * 1000)) / 1000 / 60;
  return  (min + "").padStart(2, "0") + ":" +
          (sec + "").padStart(2, "0") + "." +
          (ms + "").padStart(3, "0");
}

// Fonction pour initialiser la grille débutante par défaut
function defaultGrid() {
  document.getElementById("difficulty").value = "1";
  validationConfig();
}

document.getElementById('create').addEventListener('click', validationConfig);
document.getElementById('restart').addEventListener('click', restart);
//Disable the restart button
document.getElementById("restart").disabled = true; 
//Disable the right click
document.oncontextmenu = new Function("return false");
// Créer une grille par défaut au chargement de la page
window.addEventListener('load', defaultGrid);