class Enemy01 {
  constructor(ctx) {
    this.ctx=ctx;
    this.enemyValue=20;
    this.enemy=new Image();
    this.enemy.src = 'assets/enemy01.png';
    this.width=40;
    this.height=30;
    this.enemies=[];
    this.enemiesCreated=false;
    this.vel=5;
    this.shots=[];
    this.shotVel=4;
    this.shotInterval=100;
    this.shotCount=0;
   }

  createEnemies(x, y) {
    this.enemies.push({x: x,y: y,})
    this.enemies.push({x: x-80,y: y+40,})
    this.enemies.push({x: x,y: y+80,})

    if (x > -10) {
      this.createEnemies(x-160, y);
    } else {
      this.enemiesCreated=true;
    }
  }

  showEnemies() {
    for (let i = 0; i < this.enemies.length; i++) {
      this.ctx.drawImage(this.enemy,this.enemies[i].x,this.enemies[i].y,this.width,this.height);
      
      if (this.enemies[i].x >= this.ctx.canvas.width) {
        this.enemies[i].x = -110;
      } else {
        this.enemies[i].x+=this.vel;
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

      if (this.shots[i].y[1] >= 440) {
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
      this.createEnemies(950, 20);
    }
    this.showEnemies();
    this.showShots();
  }
}
