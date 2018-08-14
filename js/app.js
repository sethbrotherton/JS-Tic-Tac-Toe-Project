const startButton = $('#start-button');
const startScreen = $('#start');
const startHeader = $('#start header');
const board = $('#board');
const box = $('.box');
const boxHover = $('.box:hover');
let oBoxes = [];
let xBoxes = [];
let player = 1;

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


function addMouseOut () {
  for (let i = 0; i < box.length; i++) {
    box[i].addEventListener('mouseout', function(e) {
      box[i].style.backgroundImage = '';
    });
  }
}
addMouseOut();

addMouseoverSvg("url('img/o.svg')");

function addClickSvg () {
  for (let i = 0; i < box.length; i++) {
    box[i].addEventListener('click', function(e) {
    if($('#player1').hasClass('active')) {
        box[i].classList.add('box-filled-1');
        $('#player1').removeClass('active');
        $('#player2').addClass('active');
        player += 1;
        if (player == 2) {
          addMouseoverSvg("url('img/x.svg')");
        }
        box[i].style.pointerEvents = 'none';
        oBoxes.push(box[i]);
        displayWinner('box-filled-1', 'O', 'screen-win-one');
      } else if ($('#player2').hasClass('active')) {
        box[i].classList.add('box-filled-2');
        $('#player2').removeClass('active');
        $('#player1').addClass('active');
        player -= 1;
        if (player == 1) {
          addMouseoverSvg("url('img/o.svg')");
        }
        box[i].style.pointerEvents = 'none';
        xBoxes.push(box[i]);
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
  [box[6], box[4], box[2]],
]

const winner = '';
function displayWinner(boxClass, team, winnerClass) {
  for (let i = 0; i < winningCombos.length; i++) {
      if (winningCombos[i][0].classList.contains(boxClass) && winningCombos[i][1].classList.contains(boxClass) && winningCombos[i][2].classList.contains(boxClass)) {
        console.log(`The ${team}s Won!`);
        board.css('pointer-events', 'none');
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
        if (document.getElementById('new-game-button')) {
          const newGameButton = document.getElementById('new-game-button');
          const winScreen = $('#finish');
          newGameButton.addEventListener('click', function() {
            console.log('new game please');
          //  winScreen.remove();
            startScreen.show();
            $('body').html(`<div class="screen screen-start" id="start">
              <header>
                <h1>Tic Tac Toe</h1>
                <a href="#" class="button" id="start-button">Start game</a>
              </header>
            </div>`);
            addStartButtonEvent();
          });
        }
      }
  }
}
