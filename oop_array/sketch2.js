let moons = [];
let numMoons = 1;
let centerX, centerY;
let saturnImage;
let saturnImageSize = 100;
let mouseIsOnSaturn = false;

function preload() {
  saturnImage = loadImage("assets/saturn.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  centerX = width / 2;
  centerY = height / 2;
  
  for (let i = 0; i < numMoons; i++) {
    moons.push(new Moon(centerX, centerY));
  }
  
  colorMode(HSB);
}

function draw() {
  background(0);
  image(saturnImage, centerX - saturnImageSize / 2, centerY - saturnImageSize / 2, saturnImageSize, saturnImageSize);

  mouseOnSaturn();

  if (mouseIsPressed && !mouseIsOnSaturn) {
    for (let i = 0; i < numMoons; i++) {
      moons.push(new Moon(mouseX, mouseY));
    }
  }

  for (let i = 0; i < moons.length; i++) {
    moons[i].update();
    moons[i].display();
  }

  fill("lightblue");
  text(moons.length, 20, 20);

  while (moons.length > 117) {
    let idx = 0;
    moons.splice(idx, 1);
  }
}

class Moon {
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;
    this.size = random(5, 15);
    this.distance = dist(this.x, this.y, centerX, centerY);
    this.angle = random(TWO_PI);
    this.speed = random(0.01, 0.03);
    this.cHue = random(0, 360);
  }

  update() {
    this.angle += this.speed;
    this.x = centerX + this.distance * cos(this.angle);
    this.y = centerY + this.distance * sin(this.angle);
  }

  display() {
    push();
    translate(this.x, this.y);
    fill(this.cHue, 100, 100);
    noStroke();
    ellipse(0, 0, this.size, this.size);
    
    pop();
  }

  checkOutOfCanvas(){
    if(this.y > height){
        this.onCanvas = false;
    }
}

}

function mouseOnSaturn() {
  let d = dist(mouseX, mouseY, centerX, centerY);
  if (d < saturnImageSize / 2) {
    mouseIsOnSaturn = true;
  } else {
    mouseIsOnSaturn = false;
  }
}