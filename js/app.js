const startButton = $('#start-button');
const startScreen = $('#start');
const startHeader = $('#start header');
const board = $('#board');
const box = $('.box');
const boxHover = $('.box:hover');
let oBoxes = [];
let xBoxes = [];

function addStartButtonEvent() {
  startButton.on('click', function () {
    startScreen.hide();
    box.css('display', 'block');
    $('#player1').addClass('active');
  });
}
addStartButtonEvent();

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


function addClickSvg () {
  for (let i = 0; i < box.length; i++) {
    box[i].addEventListener('click', function(e) {
      if ($('#player1').hasClass('active')) {
        oBoxes.push(box[i]);
        box[i].classList.add('box-filled-1');
        $('#player1').removeClass('active');
        $('#player2').addClass('active');
        addMouseoverSvg("url('img/x.svg')");
        box[i].style.pointerEvents = 'none';
        displayWinner('box-filled-1', 'O', 'screen-win-one');
     } else if ($('#player2').hasClass('active')) {
       xBoxes.push(box[i]);
        box[i].classList.add('box-filled-2');
        $('#player2').removeClass('active');
        $('#player1').addClass('active');
        addMouseoverSvg("url('img/o.svg')");
        box[i].style.pointerEvents = 'none';
        displayWinner('box-filled-2', 'X', 'screen-win-two');
      }
    });
  }
}
addClickSvg();

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
    if (threeInARow === true) {
      console.log(`The ${team}s Won!`);
      board.hide();
      $('body').html(`<div class="screen screen-win" id="finish">
        <header>
          <h1>Tic Tac Toe</h1>
          <p class="message"></p>
          <a href="#" class="button" id="new-game-button">New game</a>
        </header>
      </div>`);
      $('#finish').addClass(winnerClass);
        $('.message').text('WINNER');
        addNewGameButton();
        return
    } else if ((oBoxes.length + xBoxes.length === 9) && (threeInARow === false)) {
      console.log(`It's a tie, bro!`);
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
    board.show();
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
