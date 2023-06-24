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
let currentStage = 0;
let actualEnemy = enemies[currentStage];
let isResetting=false;
let gameOver=false;
let paused = false;

let scoreFlag=10000;

const player = new Player(ctx,skinSelected,controls,actualEnemy);

function Game() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.canvas.style.background = '#000';

  if (score >= scoreFlag) {
    if (playerLifes<6) {
      playerLifes++;
    }
    scoreFlag+=10000;
  }

  if (!gameOver) {
    player.draw();
    actualEnemy.draw();
  }
  gameStatus.draw();
  gameStatus.showLifes(playerLifes);
  gameStatus.showScore(score);
  gameStatus.energy(timer);

  if (timer===320&&!gameOver) {
    actualEnemy.shots=[];
    if (playerLifes > 0) {
      playerLifes--;
      isResetting=true;
      resetting();
    } else {
      gameOver=true
    }
  } else if(timer < 320 && !isResetting && !gameOver && !paused) {
    timer += 0.08;
  } 

  if (actualEnemy.enemies.length === 0 && !gameOver) {
    isResetting=true;
    actualEnemy.shots=[];
    player.shots=[];
    actualEnemy.enemiesCreated=false;
    nextStage();
    if (currentStage < 7) {
      currentStage++;
    } else {
      currentStage=0;
    }
    actualEnemy = enemies[currentStage];
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

function nextStage() {
  if (timer<=320) {
    setTimeout(()=> {
      timer+=3;
      score+=16;
      nextStage();
    }, 25)
  } else {
    setTimeout(() => {
      resetting();
    }, 200)
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
