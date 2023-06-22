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

const enemies = {
  0: new Enemy01(ctx),
  1: new Enemy02(ctx),
  2: new Enemy03(ctx),
  3: new Enemy04(ctx),
  4: new Enemy05(ctx),
  5: new Enemy06(ctx),
}
let currentStage = 0;
let actualEnemy = enemies[currentStage];

const player = new Player(ctx,skinSelected,controls,actualEnemy);

function Game() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.canvas.style.background = '#000';

  player.draw();
  
  actualEnemy.draw();
  if (actualEnemy.enemies.length === 0) {
    currentStage++;
    actualEnemy = enemies[currentStage];
    timer = 0;
  }

  gameStatus.draw();
  gameStatus.showLifes(playerLifes);
  gameStatus.showScore(score);
  gameStatus.energy(timer);
  if(timer < 320) {
    timer += 0.08;
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
