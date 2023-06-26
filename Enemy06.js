class Enemy06 extends Enemy02{
  constructor(ctx) {
    super();
    this.ctx=ctx;
    this.enemyValue=70;
    this.enemy.src = 'assets/enemy06.png';
    this.width=35;
    this.height=20;
    this.stopMovX=false;
    this.stopMovY=true;
    this.velY=1.2;
    this.velX=3.5;
    this.dirXInterval= {current:0,max:50};
   }

   createEnemies(x, y) {
    this.enemies.push({x: x,y: y,});
    this.enemies.push({x: x+150,y: y,});
    this.enemies.push({x: x+300,y: y,});

    if (this.enemies.length < 18) {
      this.createEnemies(x, y-80);
    } else {
      this.enemiesCreated=true;
    }
  }

  showEnemies() {
    if (this.dirXInterval.current<=this.dirXInterval.max&&!this.stopMovX&&!isResetting&&!paused) {
      this.dirXInterval.current++;
    } else if (this.dirXInterval.current>this.dirXInterval.max) {
      this.dirXInterval.current=0;
      this.dirX *= -1;
    }

    for (let i = 0; i < this.enemies.length; i++) {
      this.ctx.drawImage(this.enemy,this.enemies[i].x,this.enemies[i].y,this.width,this.height);
      
      if (!this.stopMovX&&!isResetting&&!paused) {
        this.enemies[i].x+=this.velX*this.dirX;
      }
      
      if (!this.stopMovY&&!isResetting&&!paused) {
        this.enemies[i].y+=this.velY;
      }

      if (this.enemies[i].y >= 330) {
        this.enemies[i].y = -150;
      }
    }
  }

  manage() {
    let randomTimer = Math.floor(Math.random()*1700+2000);
    setTimeout(() => {
      if (!paused)
        this.stopMovY = !this.stopMovY;
    }, randomTimer)

    randomTimer = Math.floor(Math.random()*2500+500);
    setTimeout(() => {
      if (!paused)
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
