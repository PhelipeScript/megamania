const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

const gameStatus = new GameStatus(ctx);

function Draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.canvas.style.background = '#000';

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

canvas.addEventListener("click", fullscreen);
