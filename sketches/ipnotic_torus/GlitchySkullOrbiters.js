let movers = [];

let glitchyBackground;
let rotatingSkull;

let loopDurationSeconds = 23;
let fps = 30;

let frameCounterSpan;
let timeCounterSpan;
let thetaCounterSpan;

let numberOfGroups = 3;
let moversPerGroup = 3;
let initialTorusSize = 40;
let initialBoxSize = 100;
let toriNumber = 3;
let diameter = 350;

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

  textureMode(NORMAL);

  perspective(PI / 3.0, width / height, 0.1, 10000);
  colorMode(HSB, 360, 100, 100);
  frameRate(fps);

  let mainColors = [
    color(300, 100, 100), // Pink
    color(200, 100, 100), // Cyan
    color(60, 100, 100), // Yellow
    color(0, 100, 100), // Red
  ];

  // Color scheme 2
  let firstComplementaryColors = [
    color(327, 100, 100), // Hot Pink
    color(170, 100, 100), // Light Blue
    color(110, 100, 100), // Green
    color(45, 100, 100), // Orange
  ];

  // Color scheme 3
  let secondComplementaryColors = [
    color(280, 100, 100), // Purple
    color(10, 100, 100), // Dark Red
    color(100, 100, 100), // Lime Green
    color(220, 100, 100), // Deep Sky Blue
  ];

  let colorsArray = [
    mainColors,
    firstComplementaryColors,
    secondComplementaryColors,
  ];

  movers = createCircularMoverGroups(
    numberOfGroups,
    moversPerGroup,
    toriNumber,
    initialTorusSize,
    initialBoxSize,
    colorsArray
  );

  createLoop({
    duration: loopDurationSeconds,
    gif: {
      fileName: "CyberPulseMorphosis.gif",
      download: true,
      width: 2048,
      height: 2048,
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

  for (const mover of movers) {
    let angleDifference = (TWO_PI / toriNumber) * movers.indexOf(mover);
    mover.update(theta + mover.offsetAngle + angleDifference);
    mover.display();
  }

  setLightsForModel();
  rotatingSkull.display();

  updateUi(theta);
}

function createCircularMoverGroups(
  numGroups,
  moversPerGroup,
  toriNumber,
  torusSize,
  boxSize,
  colorsArray,
  diameter
) {
  let movers = [];

  for (let groupIdx = 0; groupIdx < numGroups; groupIdx++) {
    let scaleFactor = 1 + groupIdx * 0.5;
    let groupColors = colorsArray[groupIdx % colorsArray.length];

    for (let i = 0; i < moversPerGroup; i++) {
      let offsetAngle = TWO_PI / numGroups;
      let mover = new CircularMover(
        torusSize * scaleFactor,
        toriNumber,
        boxSize * scaleFactor,
        groupColors,
        offsetAngle,
        diameter
      );
      movers.push(mover);
    }
  }

  return movers;
}

function updateUi(theta) {
  frameCounterSpan.innerText = `Frame: ${frameCount}`;
  timeCounterSpan.innerText = `Time: ${(millis() / 1000).toFixed(1)}s`;
  thetaCounterSpan.innerText = `Theta: ${theta.toFixed(2)}`;
}

function setLightsForModel() {
  ambientLight(50, 50, 50);
  pointLight(255, 0, 255, -200, 200, 200); // Pink light
  pointLight(0, 255, 255, 200, 200, 200); // Cyan light
  pointLight(255, 255, 0, -200, -200, 200); // Yellow light
  pointLight(255, 0, 0, 200, -200, 200); // Red light
}
