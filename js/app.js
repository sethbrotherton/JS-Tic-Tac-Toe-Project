const startButton = $('.button');
const startScreen = $('#start');
const startHeader = $('#start header');
const box = $('.box');
const boxHover = $('.box:hover');
let oBoxes = [];
let xBoxes = [];
let player = 1;

startButton.on('click', function () {
  startScreen.remove();
  box.css('display', 'block');
  $('#player1').addClass('active');
});

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
      }
    });
  }
}
addClickSvg();
