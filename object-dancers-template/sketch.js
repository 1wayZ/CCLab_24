let dancer;

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("p5-canvas-container");

  dancer = new DuoDancer(width / 2, height / 2);
}

function draw() {
  background(0);
  drawFloor(); // For reference only

  dancer.update();
  dancer.display();
}

class DuoDancer {
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;
    this.size = random(50, 100); 
    this.angle = 0;
    this.swingSpeed = 0.05; 
  }

  update() {
    this.angle += this.swingSpeed;
  }

  display() {
    push();
    translate(this.x, this.y);

    // Rotate
    rotate(sin(this.angle) * PI / 8);

    // Owl Body 
    fill(0, 255, 0); 
    rectMode(CENTER);
    rect(0, 0, this.size, this.size); 

    // Ears
    fill(0, 255, 0); 
    triangle(
      -this.size * 0.3, -this.size * 0.4,
      -this.size * 0.1, -this.size * 0.7,
      -this.size * 0.3, -this.size * 0.6
    );
    triangle(
      this.size * 0.3, -this.size * 0.4,
      this.size * 0.1, -this.size * 0.7,
      this.size * 0.3, -this.size * 0.6
    );

    // Beak
    fill(255, 255, 0); 
    triangle(
      0, this.size * 0.1,
      this.size * 0.1, this.size * 0.3,
      -this.size * 0.1, this.size * 0.3
    );

    // Feathers Around Eyes
    fill(200, 255, 200);
    rectMode(CENTER);
    rect(-this.size * 0.25, -this.size * 0.2, this.size * 0.3, this.size * 0.1);
    rect(this.size * 0.25, -this.size * 0.2, this.size * 0.3, this.size * 0.1);

    // Eyes
    fill(255); 
    ellipse(-this.size * 0.25, -this.size * 0.1, this.size * 0.2, this.size * 0.2);
    ellipse(this.size * 0.25, -this.size * 0.1, this.size * 0.2, this.size * 0.2);

    fill(0); // Black pupils
    ellipse(-this.size * 0.25, -this.size * 0.1, this.size * 0.1, this.size * 0.1);
    ellipse(this.size * 0.25, -this.size * 0.1, this.size * 0.1, this.size * 0.1);

    // Feet
    fill(255, 165, 0); //
    ellipse(-this.size * 0.2, this.size * 0.3, this.size * 0.1, this.size * 0.1);
    ellipse(this.size * 0.2, this.size * 0.3, this.size * 0.1, this.size * 0.1);


    pop();
  }


}