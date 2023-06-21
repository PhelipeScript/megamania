class Enemy05 {
  constructor(ctx) {
    this.ctx=ctx;
    this.enemyValue=20;
    this.enemy=new Image();
    this.enemy.src = 'assets/enemy05.png';
    this.width=25;
    this.height=15;
    this.enemies=[];
    this.enemiesCreated=false;
    this.velX=3;
    this.velY=0.1;
    this.dirY=1;
    this.shots=[];
    this.shotVel=4;
    this.shotInterval=150;
    this.shotCount=0;
   }

  createEnemies(x, y) {
    this.enemies.push({x: x,y: y,})
    this.enemies.push({x: x-65,y: y+35,})
    this.enemies.push({x: x,y: y+70,})

    if (this.enemies.length<15) {
      this.createEnemies(x-130, y);
    } else {
      this.enemiesCreated=true;
    }
  }

  showEnemies() {
    for (let i = 0; i < this.enemies.length; i++) {
      this.ctx.drawImage(this.enemy,this.enemies[i].x,this.enemies[i].y,this.width,this.height);
      
      this.enemies[i].y += this.velY*this.dirY;

      if (this.enemies[i].y >= 250 || this.enemies[i].y <= 30) {
        this.dirY *= -1;
      }

      if (this.enemies[i].x >= this.ctx.canvas.width) {
        this.enemies[i].x = -10;
      } else {
        this.enemies[i].x+=this.velX;
      }
    }
  }

  createShot() {
    let amount = this.enemies.length>=4 ? 3 : 2;
    for (let i = 1; i <= amount; i++) {
      let random = Math.floor(Math.random()*this.enemies.length);
      setTimeout(() => {
        if (this.enemies[random]) {
          this.shots.push({
            x:this.enemies[random].x+this.width/2,
            y: [this.enemies[random].y+20, this.enemies[random].y+40]
          })
        }
      }, i*300)
    }
  }

  showShots() {
    if(this.shotCount===0) {
      this.createShot();
      this.shotCount = this.shotInterval;
    } else {
      this.shotCount--;
    }

    for (let i = 0; i < this.shots.length; i++) {
      this.ctx.beginPath();
      this.ctx.strokeStyle = '#F00';
      this.ctx.lineWidth = 2;
      this.ctx.moveTo(this.shots[i].x, this.shots[i].y[0]);
      this.ctx.lineTo(this.shots[i].x, this.shots[i].y[1]);
      this.ctx.stroke();

      this.shots[i].y[0]+=this.shotVel;
      this.shots[i].y[1]+=this.shotVel;

      if (this.shots[i].y[1] >= 370) {
        this.shots.splice(i, 1);
      }
    }
  }

  reset() {
    for (let i = this.enemies.length-1; i >= 0; i--) {
      this.enemies[i].x += -this.ctx.canvas.width-320;
    }
  } 

  draw() {
    if(!this.enemiesCreated) {
      this.createEnemies(-500, 55);
    }
    this.showEnemies();
    this.showShots();
  }
}
