const startButton = $('#start-button');
const startScreen = $('#start');
const startHeader = $('#start header');
const board = $('#board');
const box = $('.box');
const boxHover = $('.box:hover');
let oBoxes = [];
let xBoxes = [];
let playingEasyComputer = false;
let playingHardComputer = false;
const $player1 = $('#player1');
const $player2 = $('#player2');


function addStartButtonEvent() {
  startButton.on('click', function () {
    startScreen.hide();
    box.css('display', 'block');
    $('#player1').addClass('active');
  });
}
addStartButtonEvent();


$player1.css('display', 'inline-block');
const nameInput = document.createElement('input');
const nameButton = document.createElement('button');
nameButton.classList.add('button');
nameButton.classList.add('input-button');
nameButton.innerHTML = 'Submit';
nameInput.setAttribute('placeHolder', 'Enter your name');
nameInput.setAttribute('color', 'black');
$player1.append(nameInput);
$player1.append(nameButton);
nameButton.addEventListener('click', () => {
  playerName = nameInput.value;
  $player1.append(`<h1 id="player-name">${playerName}</h1>`);
  $('#player-name').css('display', 'block').css('text-align', 'center');
  nameInput.remove();
  nameButton.remove();
});

function addPlayEasyComputerButton() {
  const playEasyComputerButton = document.createElement('button');
  playEasyComputerButton.innerHTML = 'Play Computer: Easy';
  playEasyComputerButton.classList.add('button');
  playEasyComputerButton.classList.add('difficulty-button');
  playEasyComputerButton.setAttribute('id', 'play-computer-easy');
  board.append(playEasyComputerButton);
}
addPlayEasyComputerButton();


function addPlayHardComputerButton() {
  const playHardComputerButton = document.createElement('button');
  playHardComputerButton.innerHTML = 'Play Computer: Hard';
  playHardComputerButton.classList.add('button');
  playHardComputerButton.classList.add('difficulty-button');
  playHardComputerButton.setAttribute('id', 'play-computer-hard');
  board.append(playHardComputerButton);
}
addPlayHardComputerButton();

const $playEasyComputerButton = $('#play-computer-easy');
const $playHardComputerButton = $('#play-computer-hard');
function turnComputerPlayOn() {
  $playEasyComputerButton.on('click', () => {
    if (playingEasyComputer == false) {
      playingEasyComputer = true;
      playingHardComputer = false;
      $playEasyComputerButton.css('backgroundColor', 'red');
      $playHardComputerButton.css('backgroundColor', 'white');
    } else {
      playingEasyComputer = false;
      $playEasyComputerButton.css('backgroundColor', 'white');
    }
  });
    $playHardComputerButton.on('click', () => {
      if (playingHardComputer == false) {
        playingHardComputer = true;
        playingEasyComputer = false;
        $playHardComputerButton.css('backgroundColor', 'red');
        $playEasyComputerButton.css('backgroundColor', 'white');
      } else {
        playingHardComputer = false;
        $playHardComputerButton.css('backgroundColor', 'white');
      }
  });
}
turnComputerPlayOn();



function addMouseoverSvg (svg) {
  for (let i = 0; i < box.length; i++) {
    box[i].addEventListener('mouseover', function(e) {
      if (e.target.classList.contains('box-filled-1') || e.target.classList.contains('box-filled-2')) {
        e.target.style.backgroundImage = '';
      } else {
        e.target.style.backgroundImage = svg;
        e.target.style.backgroundRepeat = 'no-repeat';
        e.target.style.backgroundSize = 'contain';
      }
    });
  }
}

function svgBackgoundTurns() {
  if ($('#player1').hasClass('active')) {
    addMouseoverSvg('url("img/o.svg")');
  } else if ($('#player2').hasClass('active')){
    addMouseoverSvg('url("img/x.svg")');
  } else {
    addMouseoverSvg("url('img/o.svg')");
  }
}
svgBackgoundTurns();


function addMouseOut () {
  for (let i = 0; i < box.length; i++) {
    box[i].addEventListener('mouseout', function(e) {
      box[i].style.backgroundImage = '';
    });
  }
}
addMouseOut();


function activatePlayerTwo() {
  $('#player1').removeClass('active');
  $('#player2').addClass('active');
  addMouseoverSvg("url('img/x.svg')");
}


function activatePlayerOne() {
  $('#player2').removeClass('active');
  $('#player1').addClass('active');
  addMouseoverSvg("url('img/o.svg')");
}


function addClickSvg () {
  for (let i = 0; i < box.length; i++) {
    box[i].addEventListener('click', function(e) {
      if ($('#player1').hasClass('active') && playingEasyComputer == false && playingHardComputer == false) {
        box[i].classList.add('box-filled-1');
        oBoxes.push(box[i]);
        activatePlayerTwo();
        box[i].style.pointerEvents = 'none';
      //  showWinnerWithName();
      } else if ($('#player2').hasClass('active') && playingEasyComputer == false && playingHardComputer == false) {
        xBoxes.push(box[i]);
        box[i].classList.add('box-filled-2');
        activatePlayerOne();
        box[i].style.pointerEvents = 'none';
      } else if ($('#player1').hasClass('active') && playingEasyComputer == true) {
        oBoxes.push(box[i]);
        box[i].classList.add('box-filled-1');
        activatePlayerTwo();
        box[i].style.pointerEvents = 'none';
      //  displayWinner('box-filled-1', 'O', 'screen-win-one');
        findAvailableSquares();
        setTimeout(randomTurn, 500);
        activatePlayerOne();
      //  showWinnerWithName();
      }  else if ($('#player1').hasClass('active') && playingEasyComputer == false && playingHardComputer == true) {
        oBoxes.push(box[i]);
        box[i].classList.add('box-filled-1');
        activatePlayerTwo();
        box[i].style.pointerEvents = 'none';
        //showWinnerWithName();
        showWinnerWithName();
        computerPlayingHard();
        deactivateBox();
        activatePlayerOne();
      }
      checkForXBoxes();
      showWinnerWithName();
    //  displayWinner('box-filled-1', 'O', 'screen-win-one');
      displayWinner('box-filled-2', 'X', 'screen-win-two');
    });
  }
}
addClickSvg();


function showWinnerWithName() {
  if (nameInput.value != '') {
    let winnerName = nameInput.value.toUpperCase();
    displayWinner('box-filled-1', winnerName, 'screen-win-one');
  } else {
    displayWinner('box-filled-1', 'O', 'screen-win-one');
  }
}


let hardXSquares;
function computerPlayingHard () {
  hardXSquares = [];
  for (let i = 0; i < winningCombos.length; i++) {
    if (winningCombos[i][1].classList.contains('box-filled-1') && !winningCombos[i][2].classList.contains('box-filled-1') && !winningCombos[i][0].classList.contains('box-filled-1') && !winningCombos[i][2].classList.contains('box-filled-2') && !winningCombos[i][0].classList.contains('box-filled-2')) {
      console.log('4');
      hardXSquares.push(winningCombos[i][2]);
  } else if (winningCombos[i][2].classList.contains('box-filled-1') && !winningCombos[i][1].classList.contains('box-filled-1') && !winningCombos[i][0].classList.contains('box-filled-1') && !winningCombos[i][1].classList.contains('box-filled-2') && !winningCombos[i][0].classList.contains('box-filled-2')) {
      console.log('5');
      hardXSquares.push(winningCombos[i][1]);
    }  else if (winningCombos[i][0].classList.contains('box-filled-1') && !winningCombos[i][1].classList.contains('box-filled-1') && !winningCombos[i][2].classList.contains('box-filled-1') && !winningCombos[i][1].classList.contains('box-filled-2') && !winningCombos[i][2].classList.contains('box-filled-2')) {
      console.log('6');
      hardXSquares.push(winningCombos[i][1]);
  }
    else if (winningCombos[i][0].classList.contains('box-filled-1') && winningCombos[i][1].classList.contains('box-filled-1') && (!winningCombos[i][2].classList.contains('box-filled-1') && !winningCombos[i][2].classList.contains('box-filled-2'))) {
      console.log('1st');
      hardXSquares.push(winningCombos[i][2]);
      winningCombos[i][2].classList.add('box-filled-2');
      return
  } else if (winningCombos[i][1].classList.contains('box-filled-1') && winningCombos[i][2].classList.contains('box-filled-1') && (!winningCombos[i][0].classList.contains('box-filled-1') && !winningCombos[i][0].classList.contains('box-filled-2'))) {
      console.log('2');
      hardXSquares.push(winningCombos[i][0]);
      winningCombos[i][0].classList.add('box-filled-2');
      return
    } else if (winningCombos[i][0].classList.contains('box-filled-1') && winningCombos[i][2].classList.contains('box-filled-1') && (!winningCombos[i][1].classList.contains('box-filled-1') && !winningCombos[i][1].classList.contains('box-filled-2'))) {
      console.log('3');
      hardXSquares.push(winningCombos[i][1]);
      winningCombos[i][1].classList.add('box-filled-2');
      return
    }
  }
  let randomHardXSquare = hardXSquares[Math.floor(Math.random() * hardXSquares.length)].classList.add('box-filled-2');
  xBoxes.push(randomHardXSquare);
  deactivateBox();
  return
}


function checkForXBoxes() {
  xBoxes = [];
  for (let i = 0; i < box.length; i++) {
    if (box[i].classList.contains('box-filled-2')) {
      xBoxes.push(box[i]);
    }
  }
}


function deactivateBox () {
  for (let i = 0; i < box.length; i++) {
    if (box[i].classList.contains('box-filled-1') || box[i].classList.contains('box-filled-2')) {
      box[i].style.pointerEvents = 'none';
    }
  }
}
deactivateBox();


const winningCombos = [
  [box[0], box[1], box[2]],
  [box[3], box[4], box[5]],
  [box[6], box[7], box[8]],
  [box[0], box[3], box[6]],
  [box[1], box[4], box[7]],
  [box[2], box[5], box[8]],
  [box[0], box[4], box[8]],
  [box[2], box[4], box[6]]
]


function displayWinner(boxClass, team, winnerClass) {
  for (let i = 0; i < winningCombos.length; i++) {
    const threeInARow = ((winningCombos[i][0].classList.contains(boxClass)) && (winningCombos[i][1].classList.contains(boxClass)) && (winningCombos[i][2].classList.contains(boxClass)));
    if (threeInARow) {
      console.log(`${nameInput.value} Won!`);
      clearBoard();
      board.hide();
      $('body').html(`<div class="screen screen-win" id="finish">
        <header>
          <h1>Tic Tac Toe</h1>
          <p class="message"></p>
          <a href="#" class="button" id="new-game-button">New game</a>
        </header>
      </div>`);
      $('#finish').addClass(winnerClass);
        $('.message').text(`${team} IS A WINNER!!!`);
        addNewGameButton();
        return
    } else if ((!threeInARow) && (oBoxes.length + xBoxes.length === 9)) {
      console.log(`It's a tie, bro!`);
        clearBoard();
        board.hide();
        $('body').html(`<div class="screen screen-win-tie">
          <header>
            <h1>Tic Tac Toe</h1>
            <p class="message"></p>
            <a href="#" class="button" id="new-game-button">New game</a>
          </haeder>
        </div>`);
          $('.message').text('YOU TIED');
        addNewGameButton();
      }
   }
}


function addNewGameButton() {
  const newGameButton = document.getElementById('new-game-button');
  const winScreen = $('#finish');
  const tieScreen = $('.screen-win-tie');
  newGameButton.addEventListener('click', function() {
    console.log('new game please');
    winScreen.remove();
    tieScreen.remove();
    $('body').append(board);
    svgBackgoundTurns();
    clearBoard();
    activatePlayerOne();
    board.show();
    turnComputerPlayOn();
  });
}

function clearBoard() {
  for (let i = 0; i < box.length; i++) {
    box[i].classList.remove('box-filled-1');
    box[i].classList.remove('box-filled-2');
    box[i].style.backgroundImage = '';
    box[i].style.pointerEvents = 'auto';
    xBoxes = [];
    oBoxes = [];
  }
}


let availableSquares;
function findAvailableSquares () {
  availableSquares = [];
  for (let i = 0; i < box.length; i++) {
    if (!box[i].classList.contains('box-filled-1') && !box[i].classList.contains('box-filled-2')) {
      availableSquares.push(box[i]);
    }
  }
}


function randomHardTurn () {
  findAvailableSquares();
  for (let i = 0; i < availableSquares.length; i++) {
    if (availableSquares[i]) {}
  }
}


let randomAvailableSquare;
function randomTurn() {
  let randomXSquare = availableSquares[Math.floor(Math.random() * availableSquares.length)].classList.add('box-filled-2');
  xBoxes.push(randomXSquare);
//  displayWinner('box-filled-2', 'X', 'screen-win-two');
}
