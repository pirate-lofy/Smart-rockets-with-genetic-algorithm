class obstacle{
  constructor(x1,y1,x2,y2){
    this.x1=x1;
    this.x2=x2;
    this.y1=y1;
    this.y2=y2;
    this.height=abs(y1-y2);
    this.width=abs(x1-x2);
  }

  show(){
    fill(234,54,65);
    rect(this.x1,this.y1,this.width,this.height);
  }
}
