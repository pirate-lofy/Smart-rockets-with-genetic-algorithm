var population,obstacles;
var size,lifeSpan,mutation_rate;
var traget;
var lifeP;
var cnt,maxAvgFit=0;
var x1,x2,y1,y2;

function setup(){
  createCanvas(800,600);
  target=createVector(width/2,50);
  lifeP=createP();
  size=100;
  lifeSpan=400;
  mutation_rate=0.001;
  cnt=1;
  num_done=0;


  obstacles=[];
  population=new Population(size,lifeSpan,target,mutation_rate);
}

function draw(){
  background(0);
  var str="frame number: "+ frameCount%lifeSpan + "<br>population size: "+size
  +"<br>generation: "+cnt+ "<br>"
  + "average fitness: "+ population.getAvg() + "<br> max average fitness: " + maxAvgFit;
  lifeP.html(str);
  fill(color(random(255),random(255),random(255)));
  ellipse(target.x,target.y,40);



  for(var i=0; i<size; ++i){
      population.creatures[i].update(frameCount%lifeSpan,obstacles);
      population.creatures[i].show();
  }

  for(var i=0; i<obstacles.length; i++)obstacles[i].show();

  if(frameCount%lifeSpan==0){
    cnt++;
    var avg=population.getAvg();
    if(avg>maxAvgFit)maxAvgFit=avg;
    population.naturalSelection();
  }
}



function mousePressed(){
  x1=mouseX;
  y1=mouseY;
  //console.log(mouseX,mouseY);
}



function mouseReleased(){
  x2=mouseX;
  y2=mouseY;
  obstacles.push(new obstacle(x1,y1,x2,y2));
}
