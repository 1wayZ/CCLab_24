function setup() {
    let cnv = createCanvas(400, 400);
    cnv.parent("canvas-parent")
  }
  
  function draw() {
    background(200, 50, 120);

    fill(0);
    rect(30,30, width-60, height-60);

  }