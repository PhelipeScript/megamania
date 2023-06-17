class GameStatus {
  constructor(ctx) {
    this.ctx = ctx;
    this.timer = 0;
    this.score = 0;
    this.lifeImg = new Image();
    this.lifes = 5;
  }

  gameStatusBackground() {
    this.ctx.fillStyle = '#8C8C8C';
    this.ctx.fillRect(20,this.ctx.canvas.height-125,this.ctx.canvas.width-40,100);
  }

  energy() {
    this.ctx.fillStyle = '#000';
    this.ctx.font = "16px 'Press Start 2P'";
    this.ctx.fillText('ENERGY', 150, ctx.canvas.height - 100);
    this.ctx.fillStyle = '#A41A1C';
    this.ctx.fillRect(260, this.ctx.canvas.height - 110, 500, 10);
    this.ctx.fillStyle = '#D4D329';
    this.ctx.fillRect(260, this.ctx.canvas.height - 110, 500-this.timer, 10);
    if(this.timer < 500) {
      this.timer += 0.15;
    }
  }

  showScore() {
    ctx.fillStyle = '#00F';
    ctx.font = "28px 'Press Start 2P'";
    ctx.fillText(this.score, 550, ctx.canvas.height - 25);
  }

  showLifes() {
    this.lifeImg.src = 'assets/lifes.png';
    for (let i = 40; i <= this.lifes * 40; i+= 40) {
      this.ctx.drawImage(this.lifeImg,360+i,this.ctx.canvas.height-90,30,25);
    }
  }

  draw() {
    this.gameStatusBackground();
    this.energy();
    this.showScore();
    this.showLifes();
  }
}
