class GlitchyBackground {
    constructor() {
      this.theta = 0;
    }

    update(theta) {
      this.theta = theta;
    }
  
    display() {
      // Flickering black and white background
      let noiseIncrement = 23;
      let noiseIntensity = round(noise(this.theta * noiseIncrement)) * 255;
      background(noiseIntensity);
  
      // Flickering horizontal bezier curves
      let numOfLines = random(30, 50);
  
      for (let i = 0; i < numOfLines; i++) {
        strokeWeight(random(1, 2));
        stroke(51);
  
        let y = random(-height, height);
        let x1 = -width;
        let y1 = y;
        let x2 = -width;
        let y2 = y + random(-10, 10);
        let x3 = width;
        let y3 = y + random(-10, 10);
        let x4 = width;
        let y4 = y;
  
        bezier(x1, y1, x2, y2, x3, y3, x4, y4);
      }
    }
  }