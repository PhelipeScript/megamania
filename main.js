const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

let score = 0;
let playerLifes = 3;
let timer = 0;

const controls = {
  left: false,
  right: false,
}

const playerSkins = {
  blue: 'assets/player_blue.png',
  green: 'assets/player_green.png',
  magenta: 'assets/player_magenta.png',
  purple: 'assets/player_purple.png',
  red: 'assets/player_red.png',
  white: 'assets/player_white.png',
  yellow: 'assets/player_yellow.png',
}

let skinSelected = playerSkins.blue;

const gameStatus = new GameStatus(ctx);
const enemy01 = new Enemy01(ctx);
const player = new Player(ctx, skinSelected, controls, enemy01);

function Game() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.canvas.style.background = '#000';

  player.draw();
  gameStatus.draw();
  gameStatus.showLifes(playerLifes);
  gameStatus.showScore(score);
  gameStatus.energy(timer);
  if(timer < 500) {
    timer += 0.15;
  } else if (playerLifes >= 0) {
    playerLifes--;
  }

  enemy01.draw();
  requestAnimationFrame(Game);
}

function fullscreen(){
  if(canvas.webkitRequestFullScreen) {
      canvas.webkitRequestFullScreen();
  }
 else {
    canvas.mozRequestFullScreen();
 }            
}
