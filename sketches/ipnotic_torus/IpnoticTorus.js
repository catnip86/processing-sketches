let movers = [];
let glitchyBackground;
let gifExporter;

function setup() {
  let canvas = createCanvas(600, 600, WEBGL);
  canvas.willReadFrequently = true;

  perspective(PI / 3.0, width / height, 0.1, 10000);
  colorMode(HSB, 360, 100, 100);
  frameRate(60);

  let synthPopColors = [
    color(300, 100, 100), // Pink
    color(200, 100, 100), // Cyan
    color(60, 100, 100),  // Yellow
    color(0, 100, 100)    // Red
  ];
  
  let vaporWaveColors = [
    color(327, 100, 100), // Hot Pink
    color(45, 100, 100),  // Orange
    color(170, 100, 100), // Light Blue
    color(110, 100, 100)  // Green
  ];
  
  let psychedelicColors = [
    color(280, 100, 100), // Purple
    color(10, 100, 100),  // Dark Red
    color(100, 100, 100), // Lime Green
    color(220, 100, 100)  // Deep Sky Blue
  ];
  
  let boxSize = 200;
  let torusSize = 40;
  let toriNumber = 6;
  let maxFrames = 360;

  glitchyBackground = new GlitchyBackground();
  gifExporter = new GifExporter(maxFrames, 'loop.gif');

  for (let i = 0; i < 3; i++) {
    let mover = new TorusMover(i * maxFrames / 3, torusSize, toriNumber, boxSize, synthPopColors, maxFrames);
    movers.push(mover)
  }
  
  for (let i = 0; i < 3; i++) {
    let mover = new TorusMover(i * maxFrames / 3, torusSize * 1.5, toriNumber, boxSize * 1.5, vaporWaveColors, maxFrames);
    movers.push(mover)
  }
  
  for (let i = 0; i < 3; i++) {
    let mover = new TorusMover(i * maxFrames / 3, torusSize * 2, toriNumber, boxSize * 2, psychedelicColors, maxFrames);
    movers.push(mover)
  }  
}

function draw() {
  glitchyBackground.display();

  camera(0, 0, 1000, 0, 0, 0, 0, 1, 0);

  for (const mover of movers) {
    mover.update();
    mover.display();
  }
  gifExporter.captureFrame();
}