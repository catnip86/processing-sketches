let movers = [];
let glitchyBackground;
let gifExporter;
let loopDurationSeconds = 23;
let fps = 60;
let setupFinished = false;

function setup() {
  let canvas = createCanvas(600, 600, WEBGL);
  canvas.willReadFrequently = true;

  perspective(PI / 3.0, width / height, 0.1, 10000);
  colorMode(HSB, 360, 100, 100);
  frameRate(fps);

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

  glitchyBackground = new GlitchyBackground();
  gifExporter = new GifExporter(window, 'loop.gif', loopDurationSeconds, fps);

  for (let i = 0; i < 3; i++) {
    let mover = new TorusMover(i / 3, torusSize, toriNumber, boxSize, synthPopColors);
    movers.push(mover)
  }
  
  for (let i = 0; i < 3; i++) {
    let mover = new TorusMover(i / 3, torusSize * 1.5, toriNumber, boxSize * 1.5, vaporWaveColors);
    movers.push(mover)
  }
  
  for (let i = 0; i < 3; i++) {
    let mover = new TorusMover(i / 3, torusSize * 2, toriNumber, boxSize * 2, psychedelicColors);
    movers.push(mover)
  }

  setupFinished = true;
}

function draw() {
  if (!setupFinished) return;

  camera(0, 0, 1000, 0, 0, 0, 0, 1, 0);

  glitchyBackground.display();

  for (const mover of movers) {
    mover.update(gifExporter.getTheta());
    mover.display();
  }

  if (gifExporter.animLoop.completed()) {
    gifExporter.animLoop.reset();
  }

  document.getElementById("frame-counter").innerText = `Frame: ${frameCount}`;
  document.getElementById("time-counter").innerText = `Time: ${(millis() / 1000).toFixed(1)}s`;
}