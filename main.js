const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');
const gameStatus = new GameStatus(ctx);
const controls = {
  left: false,
  right: false,
}
const enemies = {
  0: new Enemy01(ctx),
  1: new Enemy02(ctx),
  2: new Enemy03(ctx),
  3: new Enemy04(ctx),
  4: new Enemy05(ctx),
  5: new Enemy06(ctx),
  6: new Enemy07(ctx),
  7: new Enemy08(ctx),
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
let score = 0;
let playerLifes = 3;
let timer = 0;
let currentStage = 7;
let actualEnemy = enemies[currentStage];
let isResetting=false;

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

  if (timer===320) {
    actualEnemy.shots=[];
    if (playerLifes >= 0) {
      playerLifes--;
      isResetting=true;
      resetting();
    }
  } else if(timer < 320 && !isResetting) {
    timer += 0.08;
  } 

  requestAnimationFrame(Game);
}

function resetting() {
  if (timer>0) {
    setTimeout(()=> {
      timer--;
      resetting();
    }, 5)
  } else {
    isResetting=false;
  }
}

function fullscreen(){
  if(canvas.webkitRequestFullScreen) {
      canvas.webkitRequestFullScreen();
  }
 else {
    canvas.mozRequestFullScreen();
 }            
}
