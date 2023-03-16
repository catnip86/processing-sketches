import ddf.minim.*;
import ddf.minim.analysis.*;
int BOXES = 9;

Minim minim;
AudioPlayer soundFile;
BeatDetect beatDetector;
Box[] boxes = new Box[BOXES];

void setup() {
  size(600, 600, P3D);
  colorMode(HSB, 360, 100, 100);
  noStroke();
  
  minim = new Minim(this);
  soundFile = minim.loadFile("loop.wav");
  if (soundFile == null) {
    println("Error loading audio file.");
    exit();
  }
  soundFile.loop();
  beatDetector = new BeatDetect();
  
  for (int i = 0; i < BOXES; i++) {
    boxes[i] = new Box(i);
  }
}

void draw() {
  background(0);
  
  beatDetector.detect(soundFile.mix); //<>//
  boolean isBeat = beatDetector.isOnset();
  float level = getAmplitude(soundFile.mix);
  
  for (Box box : boxes) {
    box.update(level, isBeat);
    box.display();
  }
}

float getAmplitude(AudioBuffer buffer) {
  float maxVal = 0;
  for (int i = 0; i < buffer.size(); i++) {
    float curVal = abs(buffer.get(i));
    if (curVal > maxVal) {
      maxVal = curVal;
    }
  }
  return maxVal;
}
