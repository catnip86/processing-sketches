class TorusMover {
  constructor(offset, torusSize, toriNumber, boxSize, colors, maxFrames) {
    this.offset = offset;
    this.torusSize = torusSize;
    this.toriNumber = toriNumber;
    this.boxSize = boxSize;
    this.colors = colors;
    this.maxFrames = maxFrames;
  }

  update() {
    this.angle = (frameCount + this.offset) % this.maxFrames;
  
    this.centerX = sin(frameCount * 0.01) * 200;
    this.centerY = cos(frameCount * 0.01) * 200;
    this.centerZ = sin(frameCount * 0.02) * 100; 
  }
  
  display() {
    push();
    let colorIndex = this.angle % this.colors.length;
    fill(this.colors[colorIndex]);
    noStroke();

    let offsetX = this.centerX + sin(this.angle * TWO_PI / this.maxFrames) * this.boxSize / 2;
    let offsetY = this.centerY + cos(this.angle * TWO_PI / this.maxFrames) * this.boxSize / 2;
    let offsetZ = this.centerZ + sin(this.angle * 0.5 * TWO_PI / this.maxFrames) * this.boxSize / 2;

    translate(offsetX, offsetY, offsetZ);
    rotateX(frameCount * 0.01);
    rotateY(frameCount * 0.02);

    for (let i = 0; i < this.toriNumber; i++) {
      push();
      let orbitAngle = (frameCount * 0.02 + i * TWO_PI / this.toriNumber) % TWO_PI;
      let orbitRadius = this.torusSize;
      let torusX = sin(orbitAngle) * orbitRadius;
      let torusY = cos(orbitAngle) * orbitRadius;
      translate(torusX, torusY, 0);
      torus(this.torusSize, this.torusSize / 10, 3, 3);
      pop();
    }
    pop();
  }
}