class Population{

  constructor(size,lifeSpan,target,mutation_rate){
    this.size=size;
    this.mutation_rate=mutation_rate;
    this.creatures=[];
    this.pool=[];

    for(var i=0; i<this.size; ++i)
      this.creatures[i]=new rocket(lifeSpan,target);
  }


  make_new_pop(){
    var maxScore=0;
    this.pool=[];
    for(var i=0; i<this.size; ++i)
      if(this.creatures[i].fitness>maxScore)
        maxScore=this.creatures[i].fitness;
    for(var i=0; i<this.size; ++i){
      var n=floor((this.creatures[i].fitness/maxScore)*100);
      for(var j=0; j<n; ++j)this.pool.push(this.creatures[i]);
    }
  }


  make_new_gen(){
    var newPop=[];
    for(var i=0; i<this.size; ++i){
      var a=floor(random(this.size));
      var b=floor(random(this.size));
      var parentA=this.pool[a];
      var parentB=this.pool[b];
      var child=parentA.crossover(parentB);
      child.mutate(this.mutation_rate);
      newPop.push(child);
    }
    this.creatures=newPop;
  }


  calc_fitness(){
    for(var i=0; i<this.size; i++)
      this.creatures[i].calc_fitness();
  }



  naturalSelection(){
    this.calc_fitness();
    this.make_new_pop();
    this.make_new_gen();
  }


  getAvg(){
    var score=0;
    for(var i=0; i<this.size; i++)score+=this.creatures[i].fitness;
    return score/this.size;
  }

}
