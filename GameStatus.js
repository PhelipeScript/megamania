class GameStatus {
  constructor(ctx) {
    this.ctx = ctx;
    this.score = 0;
    this.lifeImg = new Image();
  }

  gameStatusBackground() {
    this.ctx.fillStyle = '#8C8C8C';
    this.ctx.fillRect(20,this.ctx.canvas.height-125,this.ctx.canvas.width-40,100);
  }

  energy(timer) {
    this.ctx.fillStyle = '#000';
    this.ctx.font = "16px 'Press Start 2P'";
    this.ctx.fillText('ENERGY', 150, ctx.canvas.height - 100);
    this.ctx.fillStyle = '#A41A1C';
    this.ctx.fillRect(260, this.ctx.canvas.height - 110, 500, 10);
    this.ctx.fillStyle = '#D4D329';
    this.ctx.fillRect(260, this.ctx.canvas.height - 110, 500-timer, 10);
  }

  showScore(amount) {
    ctx.fillStyle = '#00F';
    ctx.font = "28px 'Press Start 2P'";
    ctx.fillText(amount, 550, ctx.canvas.height - 25);
  }

  showLifes(amount) {
    this.lifeImg.src = 'assets/lifes.png';
    for (let i = 40; i <= amount * 40; i+= 40) {
      this.ctx.drawImage(this.lifeImg,360+i,this.ctx.canvas.height-90,30,25);
    }
  }

  draw() {
    this.gameStatusBackground();
    this.energy();
  }
}
