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
const enemy02 = new Enemy02(ctx);
let actualEnemy = enemy01;

const player = new Player(ctx,skinSelected,controls,actualEnemy);

function Game() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.canvas.style.background = '#000';

  player.draw();
  
  if (actualEnemy === enemy01) {
    enemy01.draw();
  } else if (actualEnemy === enemy02) {
    enemy02.draw();
  }

  gameStatus.draw();
  gameStatus.showLifes(playerLifes);
  gameStatus.showScore(score);
  gameStatus.energy(timer);
  if(timer < 320) {
    timer += 0.15;
  } else if (playerLifes >= 0) {
    playerLifes--;
  }

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
