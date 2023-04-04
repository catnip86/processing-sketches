class RotatingSkull {
  constructor() {
    this.upperSkull = loadModel("assets/UpperSkull.obj");
    this.lowerSkull = loadModel("assets/LowerSkull.obj");
    this.upperSkullTexture = loadImage("assets/UpperSkull_BakedTexture.png");
    this.lowerSkullTexture = loadImage("assets/LowerSkull_BakedTexture.png");
    this.upperSkullTexture = this.applyGlitchEffect(this.upperSkullTexture);
    this.lowerSkullTexture = this.applyGlitchEffect(this.lowerSkullTexture);
    this.theta = 0;
  }

  update(theta) {
    this.theta = theta;
    push();
    rotateX(this.theta);
    rotateY(this.theta);
    translate(0, 100 * sin(this.theta), 0);
    pop();
  }

  display() {
    push();
    scale(1.0);

    // Upper skull
    texture(this.upperSkullTexture);
    model(this.upperSkull);

    // Lower skull
    translate(0, 100 * sin(this.theta), 0);
    texture(this.lowerSkullTexture);
    model(this.lowerSkull);

    pop();
  }

  applyGlitchEffect(texture) {
    texture.loadPixels();

    for (let y = 0; y < texture.height; y++) {
      for (let x = 0; x < texture.width; x++) {
        const xOffset = floor(random(-30, 30));
        const yOffset = floor(random(-5, 5));

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