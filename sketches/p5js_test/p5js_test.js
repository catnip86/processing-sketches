let movers = [];

function setup() {
  createCanvas(800, 800, WEBGL);
  perspective(60 / 180 * PI, width / height, 0.1, 10000);
  colorMode(HSB, 360, 100, 100);
  frameRate(60);

  let boxSize = 300;
  let cubeSize = 50;
  let maxFrames = 600;
  
  // Synth-pop color palette
  synthPopColors = [
    color(300, 100, 100), // Pink
    color(200, 100, 100), // Cyan
    color(60, 100, 100),  // Yellow
    color(0, 100, 100)    // Red
  ];

  for (let i = 0; i < 3; i++) {
    let mover = new Mover(i * maxFrames / 3, cubeSize, boxSize, synthPopColors, maxFrames);
    movers.push(mover)
  }
}

function draw() {
  background(0);

  for (const mover of movers) {
    mover.update();
    mover.display();
  }
}
