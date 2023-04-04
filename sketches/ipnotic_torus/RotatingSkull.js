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
    push();
    rotateX(this.theta);
    rotateY(this.theta);
    translate(0, 100 * sin(this.theta), 0);
    pop();
  }

  display() {
    push();
    scale(120.0);

    rotateX(PI);
    rotateY(-this.theta)

    // Upper skull
    ;
    texture(this.upperSkullTexture);
    model(this.upperSkull);

    // Lower skull
    translate(0, -0.2 * abs(sin(this.theta * 16)), 0.2);
    texture(this.lowerSkullTexture);
    model(this.lowerSkull);

    pop();
  }
}