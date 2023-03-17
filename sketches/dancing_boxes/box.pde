class Box {
  int index;
  float hue, noiseOffset;
  float saturation, brightness;
  PVector position;
  PVector targetPosition;
  
  Box(int index, PVector initialPosition) {
    this.index = index;
    position = initialPosition.copy();
    targetPosition = position.copy();
    hue = map(index, 0, 8, 0, 360);
    noiseOffset = random(1000);
  }
  
  boolean isPositionOccupied(PVector positionToCheck, Box[] boxes) {
    for (Box box : boxes) {
      if (box != this && box.position.dist(positionToCheck) < 1) {
        return true;
      }
    }
    return false;
  }
  
  void update(float amplitude, boolean isBeat,  ArrayList<PVector> availablePositions) {
    float targetZ = map(amplitude, 0, 1, -200, 200);
    position.z = lerp(position.z, targetZ, 0.1);
    
    if (isBeat) { //<>//
      hue = (map(amplitude, 0, 1, 0, 360) + index * 40) % 360;
      saturation = map(amplitude, 0, 1, 80, 100) + index * 2;
      brightness = map(amplitude, 0, 1, 80, 100) + index * 2;
    }
    
    position.lerp(targetPosition, 0.05 * amplitude);

    if (position.dist(targetPosition) < 1) {
      if (availablePositions.size() == 0) {
        // Refill and shuffle the available positions list
        for (int i = 0; i < 9; i++) {
          availablePositions.add(new PVector(width/3 * (i % 3) - width/3, height/3 * (i / 3) - height/3, 0));
        }
        Collections.shuffle(availablePositions);
      }

      // Get the next available position
      targetPosition = availablePositions.remove(0);
    }
  }
  
  void display() {
    pushMatrix();
    translate(width/2 + position.x, height/2 + position.y, position.z);
    rotateX(frameCount * 0.01);
    rotateY(frameCount * 0.02);
  
    for (int i = 0; i < 3; i++) {
      float alpha = map(i, 0, 2, 255, 40);
      fill(hue, saturation, brightness, alpha);
  
      float noiseValue = noise(noiseOffset + frameCount * 0.01);
      float boxSize = 100 * noiseValue;
  
      if (i == 0) {
        float complementaryHue = (hue + 180) % 360;
        stroke(complementaryHue, saturation, brightness, 255);
        strokeWeight(boxSize * 0.2);
      } else {
        noStroke();
      }
      
      box(boxSize, boxSize, boxSize);
    }
  
    blendMode(BLEND);
    popMatrix();
  }
}
