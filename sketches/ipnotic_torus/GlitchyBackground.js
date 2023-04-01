class GlitchyBackground {
    constructor() {}
  
    display() {
      // Colored noise background
      let noiseR = noise(frameCount * 0.01) * 255;
      let noiseG = noise((frameCount + 1000) * 0.01) * 255;
      let noiseB = noise((frameCount + 2000) * 0.01) * 255;
      background(noiseR, noiseG, noiseB);
  
      // Glitchy static television effect with vaporwave aesthetic
      let numOfLines = random(10, 30);
      let numOfRects = random(5, 15);
  
      for (let i = 0; i < numOfLines; i++) {
        strokeWeight(random(1, 4));
        stroke(random(200, 255), random(100, 200), random(200, 255), random(50, 150));
        line(random(-width / 2, width / 2), random(-height / 2, height / 2), random(-width / 2, width / 2), random(-height / 2, height / 2));
      }
  
      for (let i = 0; i < numOfRects; i++) {
        noStroke();
        fill(random(200, 255), random(100, 200), random(200, 255), random(50, 150));
        rect(random(-width / 2, width / 2), random(-height / 2, height / 2), random(10, 40), random(10, 40));
      }
    }
  }  