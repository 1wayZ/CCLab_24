let creatures = [];
let numCreatures = 20;
let lightRadius = 100;

function setup() {
  let cnv = createCanvas(800, 500);
  cnv.parent("p5-canvas-container")
  for (let i = 0; i < numCreatures; i++) {
    let creature = {
      posX: random(width),
      posY: random(height),
      vx: random(-1, 1),
      vy: random(-1, 1),
      ax: 0,
      ay: 0,
      maxSpeed: 1, // speed in the dark
      fastSpeed: 5, // speed in the torchlight
      awake: true,
      sleepTimer: 0,
      lightExposure: 0,
    };
    creatures.push(creature);
  }
}

function draw() {
  background(0);

  // torchlight effect
  for (let dia = 50; dia < 200; dia += 1) {
    noStroke();
    fill(255, 30);
    ellipse(mouseX, mouseY, dia, dia);
  }

  for (let i = 0; i < creatures.length; i++) {
    let creature = creatures[i];

    // calculate the distance between the light and the creature using basic subtraction
    let dx = creature.posX - mouseX;
    let dy = creature.posY - mouseY;
    let lightDist = 0;

    if (dx < 0) {
      dx = -dx;
    }
    if (dy < 0) {
      dy = -dy;
    }

    lightDist = dx + dy;

    if (lightDist < lightRadius) {
      creature.lightExposure++;
      if (creature.lightExposure > 600) {
        // 10 seconds = 600 frames at 60 FPS
        creature.awake = true;
      }
    } else {
      creature.lightExposure = 0;
    }

    if (creature.awake) {
      if (lightDist < lightRadius) {
        creature.maxSpeed = creature.fastSpeed;
        let fleeX = creature.posX - mouseX;
        let fleeY = creature.posY - mouseY;
        let fleeMag = 0;

        if (fleeX < 0) {
          fleeX = -fleeX;
        }
        if (fleeY < 0) {
          fleeY = -fleeY;
        }

        fleeMag = fleeX + fleeY;

        if (fleeMag > 0) {
          // calculate flee direction
          let fleeRatioX = fleeX / fleeMag;
          let fleeRatioY = fleeY / fleeMag;
          creature.ax = fleeRatioX * creature.maxSpeed;
          creature.ay = fleeRatioY * creature.maxSpeed;
        }
      } else {
        creature.maxSpeed = 1;
        randomWalkBasic(creature);

        creature.sleepTimer++;
        if (creature.sleepTimer > 300) {
          creature.awake = false;
          creature.sleepTimer = 0;
        }
      }

      creature.vx += creature.ax;
      creature.vy += creature.ay;

      // limit the speed
      let speed = 0;
      if (creature.vx < 0) {
        speed -= creature.vx;
      } else {
        speed += creature.vx;
      }
      if (creature.vy < 0) {
        speed -= creature.vy;
      } else {
        speed += creature.vy;
      }

      if (speed > creature.maxSpeed) {
        let ratio = creature.maxSpeed / speed;
        creature.vx *= ratio;
        creature.vy *= ratio;
      }

      creature.posX += creature.vx;
      creature.posY += creature.vy;

      // reset acceleration
      creature.ax = 0;
      creature.ay = 0;

      // wrap around edges of canvas
      if (creature.posX > width) {
        creature.posX = 0;
      } else if (creature.posX < 0) {
        creature.posX = width;
      }
      if (creature.posY > height) {
        creature.posY = 0;
      } else if (creature.posY < 0) {
        creature.posY = height;
      }
    }

    displayCreature(creature);
  }
}

function randomWalkBasic(creature) {
  let angle = noise(creature.posX * 0.01, creature.posY * 0.01) * 4 * PI;
  creature.ax = cos(angle) * 0.2;
  creature.ay = sin(angle) * 0.2;
}

function displayCreature(creature) {
  push()
  noStroke();
  if (creature.awake) {
    fill(0);
    ellipse(creature.posX, creature.posY, 20); // black body, visible in the dark
    fill(0, 0, 255);
    ellipse(creature.posX, creature.posY, 5); // blue lightspot in the head
  } else {
    fill(0);
    ellipse(creature.posX, creature.posY, 20); // black body, invisible in the dark
    pop()
  }
}
