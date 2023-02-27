int CUBES = 50;

boolean SAVE_FRAMES = false;
int ANIMATION_LENGHT_SECONDS = 30;
int FRAME_RATE = 70;
int FRAMES_TO_SAVE = FRAME_RATE * ANIMATION_LENGHT_SECONDS;
int SMOOTH_AMOUNT = 2;
int PIXEL_DENSITY = 1;
int CURRENT_FRAME = 0;

Cube[] cubes = new Cube[CUBES];

void setup() {
  size(600, 600, P3D);
  colorMode(HSB);
  frameRate(FRAME_RATE);
  pixelDensity(PIXEL_DENSITY);
  smooth(SMOOTH_AMOUNT);
  for (int i = 0; i < cubes.length; i++) {
    cubes[i] = new Cube();
  }
}

void draw() {
  background(0);
    
  // Move and rotate cubes
  for (int i = 0; i < cubes.length; i++) {
    Cube c = cubes[i];
    c.update();
    c.checkEdges();
      for (int j = 0; j < cubes.length; j++) {
      c.checkCollision(cubes[j]);
      }
  }
  
  // Draw cubes
  for (int i = 0; i < cubes.length; i++) {
  Cube c = cubes[i];
  c.display();
  }
}

void saveFrame() {
  // Save the current frame to disk
  if (CURRENT_FRAME < FRAMES_TO_SAVE) {
    saveFrame("output/frame-######.png");
    hint(DISABLE_OPTIMIZED_STROKE);
    CURRENT_FRAME++;
  } else {
      exit();
    }
}
