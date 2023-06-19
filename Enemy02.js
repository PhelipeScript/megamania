class Enemy02 {
  constructor(ctx) {
    this.ctx=ctx;
    this.enemyValue=30;
    this.enemy=new Image();
    this.enemy.src='assets/enemy02.png';
    this.width=40;
    this.height=30;
    this.enemies=[];
    this.enemiesCreated=false;
    this.dirX=1;
    this.vel=4;
    this.interval=2500;
    this.countdown=this.interval;
    this.shots=[];
    this.shotVel=4;
    this.shotInterval=100;
    this.shotCount=0;
  }

  createEnemies(x, y) {
    this.enemies.push({x:x, y:y});
    this.enemies.push({x:x+175, y:y});
    this.enemies.push({x:x+175*2, y:y});
    this.enemies.push({x:x+175*3, y:y});
    this.enemies.push({x:x+175*4, y:y});
    this.enemies.push({x:x+175*5, y:y});

    if (y > -450) {
      if (this.enemies.length < 16) {
        this.createEnemies(x+40, y-100);
      } else {
        this.createEnemies(x-40, y-100);
      }
    }

    this.enemiesCreated=true;
  }

  showEnemies() {
    for (let i =0; i < this.enemies.length; i++) {
      this.ctx.drawImage(this.enemy,this.enemies[i].x,this.enemies[i].y,this.width,this.height);

      this.enemies[i].x+=this.vel*this.dirX;

      if (this.countdown <= 0) {
        this.dirX *= -1;
        for (let j = 0; j < this.enemies.length; j++) {
          this.enemies[j].y += 30;
          setTimeout(() => {
            if (this.enemies[j]) 
              this.enemies[j].y += 20;
          }, 500)
        }
        this.countdown=this.interval;
        console.log('mudou')
      } else {
        this.countdown-=0.5;
      }

      if (this.enemies[i].x >= this.ctx.canvas.width) {
        this.enemies[i].x = 0-this.width;
      } else if (this.enemies[i].x+this.width <= 0) {
        this.enemies[i].x=this.ctx.canvas.width
      }
      
      if (this.enemies[i].y >= 450) {
        this.enemies[i].y = -50;
      }
    }
  }

  createShot() {
    let amount = this.enemies.length>=4 ? 2 : 3;
    for (let i = 1; i <= amount; i++) {
      let random = Math.floor(Math.random()*this.enemies.length);
      setTimeout(() => {
        if (this.enemies[random] && this.enemies[random].y >= 0 && this.enemies[random].y <= 450) {
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
    
  } 

  draw() {
    if (!this.enemiesCreated) {
      this.createEnemies(40, -50);
    }
    this.showEnemies();
    this.showShots();
    
  }
}
