const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

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
const player = new Player(ctx, skinSelected, controls);

function Draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.canvas.style.background = '#000';

  player.draw();
  gameStatus.draw();
  requestAnimationFrame(Draw);
}

function fullscreen(){
  if(canvas.webkitRequestFullScreen) {
      canvas.webkitRequestFullScreen();
  }
 else {
    canvas.mozRequestFullScreen();
 }            
}
