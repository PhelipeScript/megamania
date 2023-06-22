class Enemy08 {
  constructor(ctx) {
    this.ctx=ctx;
    this.enemyValue=20;
    this.enemy=new Image();
    this.enemy.src = 'assets/enemy08.png';
    this.width=35;
    this.height=30;
    this.enemies=[];
    this.enemiesCreated=false;
    this.vel=2;
    this.shots=[];
   }

   createEnemies(x, y) {
    let random =  Math.random()*this.ctx.canvas.width;
    this.enemies.push({x: random,y: y,});
    this.enemies.push({x: random+140,y: y,});
    this.enemies.push({x: random+280,y: y,});

    if (this.enemies.length < 18) {
      this.createEnemies(x, y-80);
    } else {
      this.enemiesCreated=true;
    }
  }

  showEnemies() {
    let random =  Math.random()*this.ctx.canvas.width+1;
    let counter=1;
    for (let i = 0; i < this.enemies.length; i++) {
      this.ctx.drawImage(this.enemy,this.enemies[i].x,this.enemies[i].y,this.width,this.height);

      this.enemies[i].y+=this.vel;

      if (this.enemies[i].y >= 350) {
        this.enemies[i].y = -130;
        
        if (counter===1) {
          this.enemies[i].x = random;
        } else if (counter===2) {
          this.enemies[i].x = random+140;
        } else if (counter===3) {
          this.enemies[i].x = random+280;
        }
        counter++;
        if (counter===4) {
          random =  Math.random()*this.ctx.canvas.width+1;
          counter=1;
        }
      }
    }
  }

  createShot() {
    
  }

  showShots() {
    
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

  draw() {
    if(!this.enemiesCreated) {
      this.createEnemies(70,-150);
    }
    this.showEnemies();
  }
}
