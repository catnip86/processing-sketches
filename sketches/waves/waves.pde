// Background
// Initial scale of the background
float scale = 1;
 // Rate of change of the background scale
float ds = 0.01;
// Size of the background shape
float size = 50;

// Shapes
// Spacing between the shapes
float spacing = 60;
// Vertical offset of the shapes
float offset = 400;

// Waves
// Spacing between the big waves
float waveSpacing = 200;
// Number of big waves
float numWaves = 5;
// Initial value for the spacing speed
float spacingSpeed = 0.05;
// Amplitude of the spacing speed modulation
float spacingAmplitude = 10;

// Colors
// Set the starting and ending colors of the gradient
color startColor = color(255, 0, 255); // Neon magenta
color endColor = color(0, 255, 255); // Neon cyan
// Set the starting and ending colors of the background
color bgStartColor = color(0, 0, 0); // Black
color bgEndColor = color(255, 255, 0); // Neon yellow

// Animation
// Use to enable/disable images saving
boolean saveFrame = false;
// Total duration of the animation in seconds
int animationSeconds = 10;
// Frame Rate
int frameRate = 50;
// Number of frames to save
int numFrames = frameRate * animationSeconds;
// Current frame number
int frameNum = 0;
// Smooth
int smooth = 3;

void setup() {
  size(1024, 1024, P2D);
  frameRate(frameRate);
  pixelDensity(2);
  smooth(smooth);
  background(0);
  noStroke();
}

void draw() {
  // Calculate the current background color based on time and the specified color scheme
  color bgColor = lerpColor(bgStartColor, bgEndColor, sin(frameCount * 0.03));
  background(bgColor);
  
  // Calculate the modulation factor for the spacing speed
  float spacingMod = sin(frameCount * 0.05) * spacingAmplitude;
  // Apply the modulation to the spacing speed
  spacingSpeed += spacingMod;
  
  // Apply a rotating and scaling transformation to each background circle
  for (int j = 0; j < numWaves; j++) {
    for (int i = 0; i < 17; i++) {
      float x = i * spacing - (width - 17 * spacing) / 2 + spacingMod * sin(i * 0.1);
      float y = j * waveSpacing + height/2 - (numWaves * waveSpacing)/2 + spacingMod * sin(j * 0.1) + 50 * sin(frameCount * 0.1 + i/2.0) + 50 * sin(frameCount * 0.1 + j/2.0);
      pushMatrix();  // Save the current transformation matrix
      translate((width - 17 * spacing) / 2 + x, 
          height / 2 - (numWaves * waveSpacing) / 2 + y);
      scale(scale + i / 10.0);
      // Calculate the current gradient color based on the x position
      color c = lerpColor(startColor, endColor, ((x + width/2) / width + (frameCount / 50.0)) % 1.0);
      // Apply the gradient color to the circle
      fill(c);
      ellipse(0, 0, size, size);
      // Restore the previous transformation matrix
      popMatrix();
    }
  }

  // Update the scale of the background
  scale += ds;

  // scale when they reach certain values
  if (scale > 2 || scale < 0.5) {
    ds = -ds;
  }

  // Save the current frame to disk
  if (saveFrame && (frameNum < numFrames)) {
    saveFrame("output/frame-######.png");
    hint(DISABLE_OPTIMIZED_STROKE);
    frameNum++;
  } else {
    if (saveFrame) {
      exit();
    }
  }
}
