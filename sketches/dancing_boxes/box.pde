class Box {
  int x, y, index;
  float z;
  float hue, noiseOffset;
  float saturation, brightness;
  
  Box(int index) {
    int row = index / 3;
    int col = index % 3;
    this.index = index;
    x = (col - 1) * 150;
    y = (row - 1) * 150;
    z = 0;
    hue = map(index, 0, 8, 0, 360);
    noiseOffset = random(1000);
  }
  
  void update(float amplitude, boolean isBeat) {
    float targetZ = map(amplitude, 0, 1, -200, 200);
    z = lerp(z, targetZ, 0.1);
    
    if (isBeat) { //<>//
      hue = (map(amplitude, 0, 1, 0, 360) + index * 40) % 360;
      saturation = map(amplitude, 0, 1, 80, 100) + index * 2;
      brightness = map(amplitude, 0, 1, 80, 100) + index * 2;
    }
  }
  
  void display() {
    pushMatrix();
    translate(width/2 + x, height/2 + y, z);
    rotateX(frameCount * 0.01);
    rotateY(frameCount * 0.02);
    stroke(hue, saturation, brightness);
    noFill();
    float noiseValue = noise(noiseOffset + frameCount * 0.01);
    box(100 * noiseValue, 100 * noiseValue, 100 * noiseValue);
    popMatrix();
  }
}
