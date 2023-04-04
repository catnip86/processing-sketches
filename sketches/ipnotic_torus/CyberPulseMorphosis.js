let movers = [];

let glitchyBackground;
let rotatingSkull;

let loopDurationSeconds = 23;
let fps = 30;

let frameCounterSpan;
let timeCounterSpan;
let thetaCounterSpan;

function preload() {
  rotatingSkull = new RotatingSkull();
  glitchyBackground = new GlitchyBackground();

  frameCounterSpan = document.getElementById("frame-counter");
  timeCounterSpan = document.getElementById("time-counter");
  thetaCounterSpan = document.getElementById("theta-counter");
}

function setup() {
  let canvas = createCanvas(600, 600, WEBGL);
  canvas.willReadFrequently = true;

  perspective(PI / 3.0, width / height, 0.1, 10000);
  colorMode(HSB, 360, 100, 100);
  frameRate(fps);

  let boxSize = 200;
  let torusSize = 40;
  let toriNumber = 6;

  let colors1 = [
    color(300, 100, 100), // Pink
    color(200, 100, 100), // Cyan
    color(60, 100, 100), // Yellow
    color(0, 100, 100), // Red
  ];

  // Color scheme 2
  let colors2 = [
    color(327, 100, 100), // Hot Pink
    color(170, 100, 100), // Light Blue
    color(110, 100, 100), // Green
    color(45, 100, 100), // Orange
  ];

  // Color scheme 3
  let colors3 = [
    color(280, 100, 100), // Purple
    color(10, 100, 100), // Dark Red
    color(100, 100, 100), // Lime Green
    color(220, 100, 100), // Deep Sky Blue
  ];

  for (let i = 0; i < 3; i++) {
    let mover = new SpiralMover(torusSize, toriNumber, boxSize, colors1);
    movers.push(mover);
  }

  for (let i = 0; i < 3; i++) {
    let mover = new SpiralMover(
      torusSize * 1.5,
      toriNumber,
      boxSize * 1.5,
      colors2
    );
    movers.push(mover);
  }

  for (let i = 0; i < 3; i++) {
    let mover = new SpiralMover(
      torusSize * 2,
      toriNumber,
      boxSize * 2,
      colors3
    );
    movers.push(mover);
  }

  createLoop({
    duration: loopDurationSeconds,
    gif: {
      fileName: "loop.gif",
      download: true,
      open: true,
      options: {
        workers: 10,
        dither: "Atkinson",
      },
    },
  });
}

function draw() {
  camera(0, 0, 1000, 0, 0, 0, 0, 1, 0);

  let theta = animLoop.theta;

  glitchyBackground.update(theta);
  rotatingSkull.update(theta);

  glitchyBackground.display();
  rotatingSkull.display();

  for (const mover of movers) {
    mover.update(theta);
    mover.display();
  }

  frameCounterSpan.innerText = `Frame: ${frameCount}`;
  timeCounterSpan.innerText = `Time: ${(millis() / 1000).toFixed(1)}s`;
  thetaCounterSpan.innerText = `Theta: ${theta.toFixed(2)}`;
}
