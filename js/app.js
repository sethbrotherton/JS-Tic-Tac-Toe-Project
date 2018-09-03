// Variables for beginning of game
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
let playingYourself = false;
const $player1 = $('#player1');
const $player2 = $('#player2');

// When start button is clicked, start screen is hidden, and player1 is made active
function addStartButtonEvent() {
  startButton.on('click', function () {
    startScreen.hide();
    box.css('display', 'block');
    $('.boxes').fadeTo(1000, 0.4)
    $('#player1').addClass('active');
  });
}
addStartButtonEvent();

// Dynamically adds name input and button to the start screen, giving the player the option to add their name
const nameInput = document.createElement('input');
const nameButton = document.createElement('button');
nameButton.classList.add('button');
nameButton.classList.add('input-button');
nameButton.innerHTML = 'Submit';
nameInput.setAttribute('placeHolder', 'Enter your name');
nameInput.setAttribute('color', 'black');
startHeader.append(nameInput);
startHeader.append(nameButton);
nameButton.addEventListener('click', () => {
  playerName = nameInput.value;
  $player1.append(`<h1 id="player-name">${playerName}</h1>`);
  $('#player-name')
    .css('display', 'block')
    .css('text-align', 'center');
  nameInput.remove();
  nameButton.remove();
});

//  Adds button for player to play against themselves
function addPlayYourselfButton() {
  const playYourselfButton = document.createElement('button');
  playYourselfButton.innerHTML = 'Play Yourself';
  playYourselfButton.classList.add('button');
  playYourselfButton.classList.add('difficulty-button');
  playYourselfButton.setAttribute('id', 'play-yourself');
  playYourselfButton.style.backgroundColor = '#f4425c';
  board.append(playYourselfButton);
}
addPlayYourselfButton();

//  Adds button for player to play against the computer on easy level
function addPlayEasyComputerButton() {
  const playEasyComputerButton = document.createElement('button');
  playEasyComputerButton.innerHTML = 'Play Computer: Easy';
  playEasyComputerButton.classList.add('button');
  playEasyComputerButton.classList.add('difficulty-button');
  playEasyComputerButton.setAttribute('id', 'play-computer-easy');
  playEasyComputerButton.style.backgroundColor = '#f4425c';
  board.append(playEasyComputerButton);
}
addPlayEasyComputerButton();

//  Adds button for player to play against the computer on hard level
function addPlayHardComputerButton() {
  const playHardComputerButton = document.createElement('button');
  playHardComputerButton.innerHTML = 'Play Computer: Hard';
  playHardComputerButton.classList.add('button');
  playHardComputerButton.classList.add('difficulty-button');
  playHardComputerButton.setAttribute('id', 'play-computer-hard');
  playHardComputerButton.style.backgroundColor = '#f4425c';
  board.append(playHardComputerButton);
}
addPlayHardComputerButton();

// jquery variables for play option buttons
const $playYourselfButton = $('#play-yourself');
const $playEasyComputerButton = $('#play-computer-easy');
const $playHardComputerButton = $('#play-computer-hard');

// This function turns on or off different plays modes; against self; against computer-easy; against computer-hard
function turnComputerPlayOn() {
  $playEasyComputerButton.on('click', () => {
      playingEasyComputer = true;
      playingHardComputer = false;
      playingYourself = false;
      $playEasyComputerButton.css('backgroundColor', '#42f48f')
        .css('pointerEvents', 'none');
      $playHardComputerButton.fadeOut('slow');
      $playYourselfButton.fadeOut('slow');
      $('.boxes').fadeTo(1000, 1)
        .css('pointerEvents', 'auto');
  });
    $playHardComputerButton.on('click', () => {
        playingHardComputer = true;
        playingEasyComputer = false;
        playingYourself = false;
        $playHardComputerButton.css('backgroundColor', '#42f48f')
          .css('pointerEvents', 'none');;
        $playEasyComputerButton.fadeOut('slow');
        $playYourselfButton.fadeOut('slow');
        $('.boxes').fadeTo(1000, 1)
          .css('pointerEvents', 'auto');
  });
    $playYourselfButton.on('click', () => {
      playingEasyComputer = false;
      playingHardComputer = false;
      playingYourself = true;
      $playYourselfButton.css('backgroundColor', '#42f48f')
        .css('pointerEvents', 'none');
      $playEasyComputerButton.fadeOut('slow');
      $playHardComputerButton.fadeOut('slow');
      $('.boxes').fadeTo(1000, 1)
        .css('pointerEvents', 'auto');
    });
}
turnComputerPlayOn();

// Adds an svg image while squares are hovered over; accepts svg parameter
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

//  If it is player 1's turn, an O svg appears, otherwse an X appears
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

// Removes background svg image, when mouse moves off of square
function addMouseOut () {
  for (let i = 0; i < box.length; i++) {
    box[i].addEventListener('mouseout', function(e) {
      box[i].style.backgroundImage = '';
    });
  }
}
addMouseOut();

// Switches from player 1 to 2
function activatePlayerTwo() {
  $('#player1').removeClass('active');
  $('#player2').addClass('active');
  addMouseoverSvg("url('img/x.svg')");
}

// Switches from player 2 to 1
function activatePlayerOne() {
  $('#player2').removeClass('active');
  $('#player1').addClass('active');
  addMouseoverSvg("url('img/o.svg')");
}

// This function adds Os and Xs to boards in all 3 playing opptions
function addClickSvg () {
  for (let i = 0; i < box.length; i++) {
    box[i].addEventListener('click', function(e) {
    // Adds O when square is clicked in play yourself mode
      if ($('#player1').hasClass('active') && playingYourself == true) {
        box[i].classList.add('box-filled-1');
        oBoxes.push(box[i]);
        activatePlayerTwo();
        box[i].style.pointerEvents = 'none';
      // Adds X when square is clicked in play yourself mode
      } else if ($('#player2').hasClass('active') && playingYourself == true) {
        xBoxes.push(box[i]);
        box[i].classList.add('box-filled-2');
        activatePlayerOne();
        box[i].style.pointerEvents = 'none';
      // Adds O when square is cliced, then adds an X to a random square of remaining ones
      } else if ($('#player1').hasClass('active') && playingEasyComputer == true) {
        oBoxes.push(box[i]);
        box[i].classList.add('box-filled-1');
        activatePlayerTwo();
        box[i].style.pointerEvents = 'none';
        showWinnerWithName();
        findAvailableSquares();
        randomTurn();
        activatePlayerOne();
        checkForXBoxes();
        displayWinner('box-filled-2', 'X', 'screen-win-two');
      // Adds O when square is clicked and then adds an X to a square to block O from getting 3 in a row
      }  else if ($('#player1').hasClass('active') && playingHardComputer == true) {
        oBoxes.push(box[i]);
        box[i].classList.add('box-filled-1');
        activatePlayerTwo();
        box[i].style.pointerEvents = 'none';
        showWinnerWithName();
        computerPlayingHard();
        displayWinner('box-filled-2', 'X', 'screen-win-two');
        deactivateBox();
        activatePlayerOne();
      }
      // for all of the above clicks, boxes are deactivated, so they can't be clicked against
      // X boxes are tallied and winner is displayed
      deactivateBox();
      checkForXBoxes();
      showWinnerWithName();
      displayWinner('box-filled-2', 'X', 'screen-win-two');
    });
  }
}
addClickSvg();

// Deactivates any box from being clicked on if it has an X or O in it.
function deactivateBox () {
  for (let i = 0; i < box.length; i++) {
    if (box[i].classList.contains('box-filled-1') || box[i].classList.contains('box-filled-2')) {
      box[i].style.pointerEvents = 'none';
    }
  }
}
deactivateBox();

// Array of all winning combinations
const winningCombos = [
  [box[0], box[1], box[2]],
  [box[3], box[4], box[5]],
  [box[6], box[7], box[8]],
  [box[0], box[3], box[6]],
  [box[1], box[4], box[7]],
  [box[2], box[5], box[8]],
  [box[0], box[4], box[8]],
  [box[2], box[4], box[6]]
];

// Stores all available squares in an array
let availableSquares;
function findAvailableSquares () {
  availableSquares = [];
  for (let i = 0; i < box.length; i++) {
    if (!box[i].classList.contains('box-filled-1') && !box[i].classList.contains('box-filled-2')) {
      availableSquares.push(box[i]);
    }
  }
}

// Takes the array of available squares and picks a random one
// for easy computer level
let randomAvailableSquare;
function randomTurn() {
  let randomXSquare = availableSquares[Math.floor(Math.random() * availableSquares.length)].classList.add('box-filled-2');
  xBoxes.push(randomXSquare);
}

// Declares variable to store options for boxes to choose from that will block an O box
let hardXSquares;
// Function loops through winning combination numbers and pushes squares into an array to store them
// as options to choose from
function computerPlayingHard () {
  hardXSquares = [];
  for (let i = 0; i < winningCombos.length; i++) {
    // For, the first 3 scenarios, If a square is an O and what would be a 2nd and 3rd in a row are available,
    // they are stored as options in array
    if (winningCombos[i][1].classList.contains('box-filled-1') && !winningCombos[i][2].classList.contains('box-filled-1') && !winningCombos[i][0].classList.contains('box-filled-1') && !winningCombos[i][2].classList.contains('box-filled-2') && !winningCombos[i][0].classList.contains('box-filled-2')) {
      hardXSquares.push(winningCombos[i][2]);
  } else if (winningCombos[i][2].classList.contains('box-filled-1') && !winningCombos[i][1].classList.contains('box-filled-1') && !winningCombos[i][0].classList.contains('box-filled-1') && !winningCombos[i][1].classList.contains('box-filled-2') && !winningCombos[i][0].classList.contains('box-filled-2')) {
      hardXSquares.push(winningCombos[i][1]);
    }  else if (winningCombos[i][0].classList.contains('box-filled-1') && !winningCombos[i][1].classList.contains('box-filled-1') && !winningCombos[i][2].classList.contains('box-filled-1') && !winningCombos[i][1].classList.contains('box-filled-2') && !winningCombos[i][2].classList.contains('box-filled-2')) {
      hardXSquares.push(winningCombos[i][1]);
  }
  // For next 3 scenarios, If two boxes in a row are O, the third will be made an X
    else if (winningCombos[i][0].classList.contains('box-filled-1') && winningCombos[i][1].classList.contains('box-filled-1') && (!winningCombos[i][2].classList.contains('box-filled-1') && !winningCombos[i][2].classList.contains('box-filled-2'))) {
      hardXSquares.push(winningCombos[i][2]);
      winningCombos[i][2].classList.add('box-filled-2');
      return
  } else if (winningCombos[i][1].classList.contains('box-filled-1') && winningCombos[i][2].classList.contains('box-filled-1') && (!winningCombos[i][0].classList.contains('box-filled-1') && !winningCombos[i][0].classList.contains('box-filled-2'))) {
      hardXSquares.push(winningCombos[i][0]);
      winningCombos[i][0].classList.add('box-filled-2');
      return
    } else if (winningCombos[i][0].classList.contains('box-filled-1') && winningCombos[i][2].classList.contains('box-filled-1') && (!winningCombos[i][1].classList.contains('box-filled-1') && !winningCombos[i][1].classList.contains('box-filled-2'))) {
      hardXSquares.push(winningCombos[i][1]);
      winningCombos[i][1].classList.add('box-filled-2');
      return
    }
  }
  // Out of options stored in the array, a random choice is made
  let randomHardXSquare = hardXSquares[Math.floor(Math.random() * hardXSquares.length)].classList.add('box-filled-2');
  xBoxes.push(randomHardXSquare);
  return
}

// Checks for X boxes to ensure tally for checking for winner
function checkForXBoxes() {
  xBoxes = [];
  for (let i = 0; i < box.length; i++) {
    if (box[i].classList.contains('box-filled-2')) {
      xBoxes.push(box[i]);
    }
  }
}

// Function displays winner, or tie
function displayWinner(boxClass, team, winnerClass) {
  for (let i = 0; i < winningCombos.length; i++) {
    const threeInARow = ((winningCombos[i][0].classList.contains(boxClass)) && (winningCombos[i][1].classList.contains(boxClass)) && (winningCombos[i][2].classList.contains(boxClass)));
    if (threeInARow === true) {
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
    } else if ((threeInARow === false) && (oBoxes.length + xBoxes.length === 9)) {
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

// If player has input a name, when they win, their name is included in win-display
function showWinnerWithName() {
  if (nameInput.value != '') {
    let winnerName = nameInput.value.toUpperCase();
    displayWinner('box-filled-1', winnerName, 'screen-win-one');
  } else {
    displayWinner('box-filled-1', 'O', 'screen-win-one');
  }
}

// Adds new game button, so that when its clicked, everything is reset and new game can begin properly
function addNewGameButton() {
  const newGameButton = document.getElementById('new-game-button');
  const winScreen = $('#finish');
  const tieScreen = $('.screen-win-tie');
  newGameButton.addEventListener('click', function() {
    winScreen.remove();
    tieScreen.remove();
    $('body').append(board);
    svgBackgoundTurns();
    clearBoard();
    activatePlayerOne();
    board.show();
    turnComputerPlayOn();
    $playYourselfButton.show()
      .css('pointerEvents', 'auto');
    $playEasyComputerButton.show()
      .css('pointerEvents', 'auto');
    $playHardComputerButton.show()
      .css('pointerEvents', 'auto');
    $('.boxes').fadeTo(1000, 0.4);
    computerOptionsReset();
  });
}

// Removes all Xs and Os from the board, and from tally of Xs and Os from last game
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

// Resets the play options, so new choice can be made for new game
function computerOptionsReset() {
  playingYourself = false;
  $playYourselfButton.css('backgroundColor', '#f4425c');
  playingEasyComputer = false;
  $playEasyComputerButton.css('backgroundColor', '#f4425c');
  playingHardComputer = false;
  $playHardComputerButton.css('backgroundColor', '#f4425c');
}
