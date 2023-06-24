class Player {
  constructor(ctx,skin,controls) {
    this.ctx=ctx;
    this.controls = controls;
    this.player=new Image();
    this.player.src=skin;
    this.width=25;
    this.height=35;
    this.inicialPosX=this.ctx.canvas.width/2 - this.width/2;
    this.posX=this.inicialPosX;
    this.posY=305;
    this.vel = 4;
    this.shots=[];
    this.shotVel = 7;
    this.shotInterval = 40;
    this.shotCountdown = 0;
    this.keepShooting = false;
  }

  manage() {
    window.addEventListener('keypress', (keyboard) => {
      if (keyboard.keyCode === 112 && !isResetting) {
        paused = !paused;
      }
    })

    window.addEventListener('keydown', (keyboard) => {
      if (keyboard.keyCode === 37 && !this.controls.left && !isResetting && !paused) {
        this.controls.left = true;
      } else if (keyboard.keyCode === 39 && !this.controls.right && !isResetting && !paused) {
        this.controls.right = true;
      } else if (keyboard.keyCode === 32 && !this.keepShooting && !isResetting && !paused) {
        this.keepShooting = true;
      }  
    })

    window.addEventListener('keyup', (keyboard) => {
      if (keyboard.keyCode === 37 && this.controls.left) {
        this.controls.left = false;
      } else if (keyboard.keyCode === 39 && this.controls.right) {
        this.controls.right = false;
      } else if (keyboard.keyCode === 32 && this.keepShooting) {
        this.keepShooting = false;
      }
    })

    if (isResetting) {
      this.controls.left = false;
      this.controls.right = false;
      this.keepShooting = false;
    } 

    if (this.controls.left) {
      if(this.posX > 10) 
        this.posX-=this.vel;
    } else if (this.controls.right) {
      if(this.posX < this.ctx.canvas.width-this.width-10)
        this.posX+=this.vel;
    }
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
      this.shots[i].x=this.posX+this.width/2; // keep it real like the original game 

      this.ctx.beginPath();
      this.ctx.strokeStyle = '#F00';
      this.ctx.lineWidth = 3;
      this.ctx.moveTo(this.shots[i].x, this.shots[i].y[0]);
      this.ctx.lineTo(this.shots[i].x, this.shots[i].y[1]);
      this.ctx.stroke();

      if (!paused) {
        this.shots[i].y[0]-=this.shotVel;
        this.shots[i].y[1]-=this.shotVel;
      }

      if (this.shots[i].y[1] <= 0) {
        this.shots.shift();
      }
    }
  }

  enemyCaught() {
    for (let i = 0; i < this.shots.length; i++) {
      for (let j = 0; j < actualEnemy.enemies.length; j++) {
        if (
          (this.shots[i].y[1]>=actualEnemy.enemies[j].y&&this.shots[i].y[1]<=actualEnemy.enemies[j].y+actualEnemy.height)&&
          (this.shots[i].x>=actualEnemy.enemies[j].x&&this.shots[i].x<=actualEnemy.enemies[j].x+actualEnemy.width)
        ) {
          actualEnemy.enemies.splice(j,1);
          score+=actualEnemy.enemyValue;
          setTimeout(() => {
            this.shots.splice(i,1);
            this.shotCountdown=0;
          }, 5)
        }
      }
    }
  }

  playerCaught() {
    for (let i = 0; i < actualEnemy.shots.length; i++) {
      if (
        (actualEnemy.shots[i].y[1]>=this.posY&&actualEnemy.shots[i].y[1]<=this.posY+this.height)&&
        (actualEnemy.shots[i].x>=this.posX&&actualEnemy.shots[i].x<=this.posX+this.width)         
      ) {
        timer = 320;
        setTimeout(() => {
          actualEnemy.shots.splice(i,1);
          actualEnemy.reset();
          this.posX=this.inicialPosX;
        }, 10)
      }
    }
  }

  playerCollision() {
    for (let i = 0; i < actualEnemy.enemies.length; i++) {
      if (
        (
          (actualEnemy.enemies[i].y>=this.posY&&actualEnemy.enemies[i].y<=this.posY+this.height) || 
          (actualEnemy.enemies[i].y+actualEnemy.height>=this.posY&&actualEnemy.enemies[i].y+actualEnemy.height<=this.posY+this.height)
        )&&
        (
          (actualEnemy.enemies[i].x>=this.posX&&actualEnemy.enemies[i].x<=this.posX+this.width) ||
          (actualEnemy.enemies[i].x+actualEnemy.width>=this.posX&&actualEnemy.enemies[i].x+actualEnemy.width<=this.posX+this.width)
        )
      ) {
        timer = 320;
        actualEnemy.shots.splice(i,1);
        actualEnemy.reset();
        setTimeout(() => {
          this.posX=this.inicialPosX;
        }, 10)
      } 
    }
  }

  draw() {
    this.ctx.drawImage(this.player,this.posX,this.posY,this.width,this.height);
    this.manage();
    this.createShot();
    this.showShots();
    this.enemyCaught();
    this.playerCaught();
    this.playerCollision();
  }
}
