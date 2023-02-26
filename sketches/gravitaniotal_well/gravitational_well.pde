int PARTICLES_COUNT = 250;
int SCENE_DEPTH = 300;
int MAX_SPEED = 500;
int MAX_RADIUS = 50;

boolean SAVE_FRAMES = false;
int ANIMATION_LENGHT_SECONDS = 30;
int FRAME_RATE = 30;
int FRAMES_TO_SAVE = FRAME_RATE * ANIMATION_LENGHT_SECONDS;
int SMOOTH_AMOUNT = 3;
int PIXEL_DENSITY = 2;
int CURRENT_FRAME = 0;

class Particle {
  PVector pos, vel, acc;
  float size;
  int index;
  color pColor;
  
  Particle(int i, color minColor, color maxColor) {
    index = i;
    float angle = random(TWO_PI);
    float radius = random(MAX_RADIUS);
    float x = cos(angle) * radius;
    float y = sin(angle) * radius;
    float z = random(-SCENE_DEPTH/2, SCENE_DEPTH/2);
    pos = new PVector(x, y, z);
    vel = new PVector(0, 0, 0);
    acc = new PVector(0, 0, 0);
    size = random(3, 5);
    float hue = map(random(1), 0, 1, hue(minColor), hue(maxColor));
    float saturation = map(random(1), 0, 1, saturation(minColor), saturation(maxColor));
    float brightness = map(random(1), 0, 1, brightness(minColor), brightness(maxColor));
    pColor = color(hue, saturation, brightness);
  }

  void applyForce(PVector force) {
    acc.add(force);
  }

  void update() {
    vel.add(acc);
    pos.add(vel);
    acc.mult(0);
  }

  void display() {
    fill(pColor);
    noStroke();
    pushMatrix();
    translate(pos.x, pos.y, pos.z);
    sphere(size);
    popMatrix();
  }
}

Particle[] particles = new Particle[PARTICLES_COUNT];

float minX, maxX, minY, maxY, minZ, maxZ;

color[] palette = {
  color(223, 67, 52),   // Red
  color(239, 143, 86),  // Orange
  color(246, 194, 110), // Yellow-orange
  color(194, 133, 59),  // Brown
  color(99, 72, 50)     // Dark brown
};

void setup() {
  size(1024, 1024, P3D);
  perspective(60 * DEG_TO_RAD, width/height, 1, 1000);  
  frameRate(FRAME_RATE);
  pixelDensity(PIXEL_DENSITY);
  smooth(SMOOTH_AMOUNT);
  noStroke();
  
  for (int i = 0; i < particles.length; i++) {
    particles[i] = new Particle(i, palette[0], palette[palette.length - 1]);
  }

  updateBounds();
}

void draw() {
  background(0);

  // Center the tornado on the canvas
  translate(width/2, height/2, 0);

  // Calculate the bounding box of the particle field
  updateBounds();

  // Set the camera to look at the center of the particle field
  setCamera();

  // Update particles and draw them
  updateParticles();
  drawParticles();
  
  // Save frame for animation
  if (SAVE_FRAMES) {
    saveFrame();
  }
}

void updateParticles() {
  PVector center = new PVector(width/2, height/2, SCENE_DEPTH/2);
  
  for (int i = 0; i < particles.length; i++) {
    Particle p = particles[i];
    PVector pos = p.pos.copy();

    // Calculate the force of gravity towards the center of the scene
    PVector gravity = PVector.sub(center, pos);
    float distance = gravity.mag();
    gravity.normalize();
    gravity.mult(1.0 / (distance + 0.01));
    gravity.mult(p.size);
    p.applyForce(gravity);

    // Add some random turbulence to the particles
    PVector turbulence = new PVector(random(-0.5, 0.5), random(-0.5, 0.5), random(-0.5, 0.5));
    turbulence.mult(0.1);
    p.applyForce(turbulence);

    // Normalize the particle velocity and limit its speed
    p.vel.normalize();
    p.vel.limit(MAX_SPEED);

    // Check if the particle has reached the center of the scene
    if (distance < p.size) {
      p.pos = new PVector(random(width), random(height), -p.size*2);
      p.vel = new PVector(0, 0, 0);
    }
    
    // Update the particle's position and velocity
    p.update();
  }
}

void drawParticles() {
  for (int i = 0; i < particles.length; i++) {
    Particle p = particles[i];
    p.display();
  }
}

void updateBounds() {
  // Calculate the bounding box of the particle field
  minX = 0;
  maxX = width;
  minY = 0;
  maxY = height;
  minZ = -SCENE_DEPTH;
  maxZ = 0;
}

void setCamera() {
  float centerX = (minX + maxX)/2;
  float centerY = (minY + maxY)/2;
  float centerZ = (minZ + maxZ)/2;
  camera(centerX, centerY, maxZ + 2*(maxZ - minZ), centerX, centerY, centerZ, 0, 1, 0);
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
