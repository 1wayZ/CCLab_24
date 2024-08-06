let userInput;
let humanBubbles = [];
let birdBubbles = [];
let selectedBird = 1;
let birdSounds = {
    1: ["bird1-sound1.mp3", "bird1-sound2.mp3", "bird1-sound3.mp3", "bird1-sound4.mp3"],
    2: ["bird2-sound1.mp3", "bird2-sound2.mp3", "bird2-sound3.mp3", "bird2-sound4.mp3"],
    3: ["bird3-sound1.mp3", "bird3-sound2.mp3", "bird3-sound3.mp3", "bird3-sound4.mp3"]
};

function setup() {
    let canvas = createCanvas(800, 600);
    canvas.parent('p5-container');
    background('#5fca86'); 

    userInput = select('#user-input');
    userInput.input(handleInput);

    let changeDialectButton = select('#change-dialect');
    changeDialectButton.mousePressed(changeDialect);
}

function draw() {
    background('#5fca86');

    for (let i = 0; i < humanBubbles.length; i++) {
        humanBubbles[i].move();
        humanBubbles[i].display();
    }

    for (let i = 0; i < birdBubbles.length; i++) {
        birdBubbles[i].move();
        birdBubbles[i].display();
    }

    // Remove extra bubbles
    if (humanBubbles.length > 10) {
        humanBubbles.shift().remove();
    }
    if (birdBubbles.length > 10) {
        birdBubbles.shift().remove();
    }
}

function handleInput() {
    if (key === ' ') {
        createHumanBubble();
    }
}

function createHumanBubble() {
    let text = userInput.value().trim();
    if (text.length === 0) return;

    let newHumanBubble = new Bubble(width - 200, height - 50, text, 'human');
    humanBubbles.push(newHumanBubble);

    let soundIndex = getSoundIndex(text.length);
    let birdSound = birdSounds[selectedBird][soundIndex];
    let newBirdBubble = new Bubble(200, height - 50, "Bird Sound", 'bird', birdSound);
    birdBubbles.push(newBirdBubble);

    userInput.value('');
}

function getSoundIndex(textLength) {
    if (textLength <= 4) {
        return 0;
    } else if (textLength <= 8) {
        return 1;
    } else if (textLength <= 12) {
        return 2;
    } else {
        return 3;
    }
}

function changeDialect() {
    selectedBird = Math.floor(Math.random() * 3) + 1;
    let birdImage = select('#bird-image');
    birdImage.elt.src = `bird${selectedBird}.png`; // Update image source

    // Optional: Clear existing bird bubbles and recreate them with new sounds
    birdBubbles.forEach(bubble => bubble.remove());
    birdBubbles = []; // Reset bird bubbles
}

class Bubble {
    constructor(x, y, text, type, sound = null) {
        this.x = x;
        this.y = y;
        this.text = text;
        this.type = type;
        this.sound = sound;
        this.button = null;
    }

    move() {
        this.y -= 1; 
    }

    display() {
        fill(this.type === 'human' ? '#c997e1' : '#ffd21d');
        stroke(0);
        rect(this.x - 150, this.y - 25, 300, 50, 20); 
        fill(0);
        noStroke();
        textAlign(CENTER, CENTER);
        text(this.text, this.x, this.y);

        if (this.sound && !this.button) {
            this.button = createButton('');
            this.button.position(this.x + 120, this.y - 10);
            this.button.style('background', 'url("assets/sound-icon.png") no-repeat center center');
            this.button.size(20, 20);
            this.button.mousePressed(() => this.playSound());
        }

        if (this.y < 0 && this.button) {
            this.button.remove();
            this.button = null;
        }
    }

    playSound() {
        let sound = new Audio(this.sound);
        sound.play();
    }

    remove() {
        if (this.button) {
            this.button.remove();
        }
    }
}
