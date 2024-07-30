let instanceOfTaxi;
let taxi2;
// let taxi1

function setup() {
    let cnv = createCanvas(400, 400);
    cnv.parent("canvas-parent");


    instanceOfTaxi = new Taxi(100, 100, 0.5);
    taxi2 = new Taxi(300, 100, 0.8);
    
}

function draw() {

    background(10, 50, 220);

    instanceOfTaxi.update();
    instanceOfTaxi.display();

    taxi2.update();
    taxi2.display();

    
}

class Taxi{
    constructor(startX, startY, scaleFactor){
        // all the properties 
        // that instances of this class
        // should have:
        this.x = startX;
        this.y = startY;
        this.s = scaleFactor;

        this.speed = random(-2, 2);
        this.wheelAngle = 45;
        this.wheelSpeed = 2;
    }
    // spinWheel(){
    //     this.wheelAngle+=this.wheelSpeed;
    // }
    // move(){
    //     this.x+=this.speed;
    // }

    update(){
        // this.spinWheel();
        // this.move();


        // spin the wheel:
        this.wheelAngle+=this.wheelSpeed;

        // move the car:
        this.x+=this.speed;

        // reappear logic:
        if(this.x > width){
            this.x = 0;
        }

        if(this.x < 0){
            this.x = width;
        }

    }
    
    display(){
        push();
        translate(this.x, this.y);
        scale(this.s);

            noStroke();
            fill(240, 220, 60);

            // base:
            rect(-50, -50, 100, 30);
            // top"
            rect(-25, -70, 50, 20);
            // wheel 1:
            this.drawWheel(-30, -15);
            // wheel 2:
            this.drawWheel( 30, -15);

            // just to see origin 
            // of translation matrix:
            fill("red");
            circle(0, 0, 5); 

        pop();
    }
    
    drawWheel(wheelx, wheely){
        push();
        translate(wheelx, wheely);
        rotate(radians(this.wheelAngle));

            noStroke();
            fill(0);
            // circle(0,0,30);
            ellipse(0,0,30, 27);

        pop();
    }
}