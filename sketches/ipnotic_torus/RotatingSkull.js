class RotatingSkull {
  constructor() {
    this.upperSkull = loadModel("assets/UpperSkull.obj");
    this.lowerSkull = loadModel("assets/LowerSkull.obj");
    this.upperSkullTexture = loadImage("assets/UpperSkull_BakedTexture.png");
    this.lowerSkullTexture = loadImage("assets/LowerSkull_BakedTexture.png");
    this.theta = 0;
  }

  update(theta) {
    this.theta = theta;
    this.upperSkullTexture = this.applyGlitchEffect(this.upperSkullTexture, theta);
    this.lowerSkullTexture = this.applyGlitchEffect(this.lowerSkullTexture, theta);
    push();
    rotateX(this.theta);
    rotateY(this.theta);
    translate(0, 100 * sin(this.theta), 0);
    pop();
  }

  display() {
    push();
    scale(130.0);

    rotateX(PI);

    // Upper skull
    rotateY(-this.theta);
    texture(this.upperSkullTexture);
    model(this.upperSkull);

    // Lower skull
    translate(0, -0.3 * abs(sin(this.theta * 64)), 0);
    scale(1, 1, -1);
    rotateY(-this.theta);
    texture(this.lowerSkullTexture);
    model(this.lowerSkull);

    pop();
  }

  applyGlitchEffect(texture, theta) {
    texture.loadPixels();
    
    for (let y = 0; y < texture.height; y++) {
      for (let x = 0; x < texture.width; x++) {
        const xOffset = floor(random(-30, 30) * (1 + sin(theta)));
        const yOffset = floor(random(-5, 5) * (1 + sin(theta)));
    
        const glitchX = (x + xOffset) % texture.width;
        const glitchY = (y + yOffset) % texture.height;
    
        const glitchColor = texture.get(glitchX, glitchY);
        texture.set(x, y, glitchColor);
      }
    }
    
    texture.updatePixels();
    return texture;
  }
}
