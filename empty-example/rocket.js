class rocket{
  constructor(lifeSpan,target){
    this.target=target;
    this.lifeSpan=lifeSpan;
    this.pos=createVector(width/2,height-40);
    this.vel=createVector();
    this.acc=createVector();
    this.moves=[];
    this.fitness=0;
    this.finish=false;
    this.color=color(random(255),random(255),random(255));

    for(var i=0; i<this.lifeSpan; ++i){
      this.moves[i]=p5.Vector.random2D();
      this.moves[i].setMag(0.1);
    }

  }

  applyForce(force){
    this.acc.add(force);
  }


  calc_fitness(){
    if(!this.finish)
      this.fitness=1/dist(this.pos.x,this.pos.y,this.target.x,this.target.y);
  }


  crossover(parentB){
    var child=new rocket(this.lifeSpan,this.target);
    var mid=random(this.lifeSpan);
    for(var i=0; i<this.lifeSpan; ++i){
      if(i<mid)child.moves[i]=this.moves[i];
      else child.moves[i]=parentB.moves[i];
    }
    return child;
  }


  mutate(mutation_rate){
    for(var i=0; i<this.lifeSpan; ++i)
      if(random(1)<mutation_rate)
        this.moves[i]=p5.Vector.random2D();
  }


  update(cnt,obstacles){
    if(!this.finish){
      this.vel.add(this.acc);
      this.pos.add(this.vel);
      this.acc.mult(0);
      this.applyForce(this.moves[cnt]);
      var d=dist(this.pos.x,this.pos.y,this.target.x,this.target.y);
        if(d<26){
          this.fitness=1;
          this.finish=true;
        }

        //search for any rocket crashed with any obstacle
        for(var i=0; i<obstacles.length; ++i){
          var obs=obstacles[i];
          if(this.pos.x>obs.x1 && this.pos.x<obs.x2 && this.pos.y>obs.y1 && this.pos.y<obs.y2){
            this.finish=true;
            this.fitness=0;
          }
        }
      }
  }


  show(){
    push();
    //noStroke();
    fill(this.color);
    ellipse(this.pos.x,this.pos.y,5,5);
    pop();
  }
}
