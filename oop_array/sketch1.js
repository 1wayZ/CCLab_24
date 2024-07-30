let confettis = [];
let numConfetti = 1;
let backgroundHue;

function setup() {
  createCanvas(400, 400);
  backgroundHue = random(0.360);
  
  for(let i = 0; i < numConfetti; i++){
    confettis.push(new Confetti(width/2, height/2))
  }
  
  colorMode(HSB);

}

function draw() {
    //      hue sat  bri
  background(backgroundHue, 10, 100);
  
  if(mouseIsPressed == true){
    for(let i = 0; i < numConfetti; i++){
      confettis.push(new Confetti(mouseX, mouseY))
    }
  }
  //confettis.push(new Confetti(width/2, height/2))

  for(let i = 0; i < confettis.length; i++){
    confettis[i].update();
    confettis[i].checkOutOfCanvas();
    confettis[i].display();
  }
  
  text(confettis.length, 20, 20);

  //if(confettis.length > 30){
   // confettis.splice(idx, 1);
  //}

  while(confettis.length > 300){
    let idx = 0;
    confettis.splice(idx, 1);
  }

  for(let i = 0; i < confettis.length; i++){
    if(confettis[i].onCanvas == false){
        confettis.splice(i, 1)
  }
  }

}

class Confetti{
  constructor(startX, startY){
    this.x = startX;
    this.y = startY;
    this.size = random(2, 10);
    
    this.speedX = random(-2, 2);
    this.speedY = random(-1, -3);   

    this.cHue = random(0, 360);

    this.onCanvas = true;
  }
  update(){
    this.x+=this.speedX;
    this.y+=this.speedY;
    this.speedY += 0.1;
    this.speedX *= 0.99;
  }
  display(){    
    push();
    translate(this.x, this.y);

      fill(this.cHue, 100, 100);
      noStroke();
      circle(0, 0, this.size);
   
    pop();
  }
checkOutOfCanvas(){
    if(this.y > height){
        this.onCanvas = false;
    }
}
}

//function mousePressed(){
    //for(let i = 0; i < numConfetti; i++){
       // confettis.push(new Confetti(mouseX, mouseY))
   //   }
//}