class GameStatus {
  constructor(ctx) {
    this.ctx = ctx;
    this.score = 0;
    this.lifeImg = new Image();
  }

  gameStatusBackground() {
    this.ctx.fillStyle = '#8C8C8C';
    this.ctx.fillRect(20,this.ctx.canvas.height-100,this.ctx.canvas.width-40,70);
  }

  energy(timer) {
    this.ctx.fillStyle = '#000';
    this.ctx.font = "14px 'Press Start 2P'";
    this.ctx.fillText('ENERGY', 80, ctx.canvas.height - 80);
    this.ctx.fillStyle = '#A41A1C';
    this.ctx.fillRect(180, this.ctx.canvas.height - 95, 320, 10);
    this.ctx.fillStyle = '#D4D329';
    this.ctx.fillRect(180, this.ctx.canvas.height - 95, 320-timer, 10);
  }

  showScore(amount) {
    ctx.fillStyle = '#00F';
    ctx.font = "24px 'Press Start 2P'";
    ctx.fillText(amount, 400, ctx.canvas.height - 30);
  }

  showLifes(amount) {
    this.lifeImg.src = 'assets/lifes.png';
    for (let i = 30; i <= amount * 30; i+= 30) {
      this.ctx.drawImage(this.lifeImg,200+i,this.ctx.canvas.height-80,30,20);
    }
  }

  draw() {
    this.gameStatusBackground();
    this.energy();
  }
}
