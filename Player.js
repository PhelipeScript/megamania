class Player {
  constructor(ctx,skin,controls) {
    this.ctx=ctx;
    this.controls = controls;
    this.player=new Image();
    this.player.src=skin;
    this.width=30;
    this.height=40;
    this.posX=this.ctx.canvas.width/2 - this.width/2;
    this.posY=390;
    this.vel = 5;
    this.shots=[];
    this.shotVel = 7;
    this.shotInterval = 50;
    this.shotCountdown = 0;
    this.keepShooting = false;
  }

  createShot() {
    if (this.keepShooting) {
      if (this.shotCountdown > 0) {
        this.shotCountdown--;
      } else {
        this.shots.push({
          x: this.posX+this.width/2,
          y: [this.posY, this.posY-15],
        })
        this.shotCountdown = this.shotInterval;
      }
    }
  }

  showShots() {
    for (let i = 0; i < this.shots.length; i++) {
      this.ctx.beginPath();
      this.ctx.strokeStyle = '#F00';
      this.ctx.lineWidth = 2;
      this.ctx.moveTo(this.shots[i].x, this.shots[i].y[0]);
      this.ctx.lineTo(this.shots[i].x, this.shots[i].y[1]);
      this.ctx.stroke();

      this.shots[i].y[0]-=this.shotVel;
      this.shots[i].y[1]-=this.shotVel;

      if (this.shots[i].y[1] <= 0) {
        this.shots.shift();
      }
    }
  }

  manage() {
    window.addEventListener('keydown', (keyboard) => {
      if (keyboard.keyCode === 37) {
        this.controls.left = true;
      } else if (keyboard.keyCode === 39) {
        this.controls.right = true;
      } else if (keyboard.keyCode === 32) {
        this.keepShooting = true;
      }
    })

    window.addEventListener('keyup', (keyboard) => {
      if (keyboard.keyCode === 37) {
        this.controls.left = false;
      } else if (keyboard.keyCode === 39) {
        this.controls.right = false;
      } else if (keyboard.keyCode === 32) {
        this.keepShooting = false;
      }
    })

    if (this.controls.left) {
      if(this.posX > 10) 
        this.posX-=this.vel;
    } else if (this.controls.right) {
      if(this.posX < this.ctx.canvas.width-this.width-10)
        this.posX+=this.vel;
    }
  }

  draw() {
    this.ctx.drawImage(this.player,this.posX,this.posY,this.width,this.height);
    this.manage();
    this.createShot();
    this.showShots();
  }
}
