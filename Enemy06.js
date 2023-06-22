class Enemy06 {
  constructor(ctx) {
    this.ctx=ctx;
    this.enemyValue=20;
    this.enemy=new Image();
    this.enemy.src = 'assets/enemy06.png';
    this.width=40;
    this.height=20;
    this.enemies=[];
    this.enemiesCreated=false;
    this.stopMovX=false;
    this.stopMovY=true;
    this.velY=1.5;
    this.velX=3.5;
    this.dirX=1;
    this.dirXInterval= {current:0,max:50};
    this.shots=[];
    this.shotVel=4;
    this.shotInterval=150;
    this.shotCount=0;
   }

   createEnemies(x, y) {
    this.enemies.push({x: x,y: y,});
    this.enemies.push({x: x+170,y: y,});
    this.enemies.push({x: x+340,y: y,});

    if (this.enemies.length < 18) {
      this.createEnemies(x, y-80);
    } else {
      this.enemiesCreated=true;
    }
  }

  showEnemies() {
    if (this.dirXInterval.current<=this.dirXInterval.max&&!this.stopMovX) {
      this.dirXInterval.current++;
    } else if (this.dirXInterval.current>this.dirXInterval.max) {
      this.dirXInterval.current=0;
      this.dirX *= -1;
    }

    for (let i = 0; i < this.enemies.length; i++) {
      this.ctx.drawImage(this.enemy,this.enemies[i].x,this.enemies[i].y,this.width,this.height);
      
      if (!this.stopMovX) {
        this.enemies[i].x+=this.velX*this.dirX;
      }
      
      if (!this.stopMovY) {
        this.enemies[i].y+=this.velY;
      }

      if (this.enemies[i].y >= 330) {
        this.enemies[i].y = -150;
      }
    }
  }

  createShot() {
    let amount = this.enemies.length>=4 ? 2 : 1;
    for (let i = 1; i <= amount; i++) {
      let random = Math.floor(Math.random()*this.enemies.length);
      setTimeout(() => {
        if (this.enemies[random]&&this.enemies[random].y>=-50&&this.enemies[random].y<=280) {
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
    let enemyFurtherDown = -1;

    for (let i = this.enemies.length-1; i >= 0; i--) {
      if (this.enemies[i].y > enemyFurtherDown) 
        enemyFurtherDown=this.enemies[i].y;
    }

    for (let i = this.enemies.length-1; i >= 0; i--) {
      this.enemies[i].y += enemyFurtherDown <= 100 ? -170 : -enemyFurtherDown*1.35; 
    }
  } 

  manage() {
    let randomTimer = Math.floor(Math.random()*1700+2000);
    setTimeout(() => {
      this.stopMovY = !this.stopMovY;
    }, randomTimer)

    randomTimer = Math.floor(Math.random()*2500+500);
    setTimeout(() => {
      this.stopMovX = !this.stopMovX;
    }, randomTimer)

    randomTimer = Math.floor(Math.random()*2000+2000);
    setTimeout(() => {
      this.manage();
    }, randomTimer)
  }

  draw() {
    if(!this.enemiesCreated) {
      this.createEnemies(70,-150);
      this.manage();
    }
    this.showEnemies();
    this.showShots();
  }
}
