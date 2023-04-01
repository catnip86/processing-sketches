class TorusMover {
  constructor(offset, torusSize, boxSize, colors, maxFrames, numTori) {
    this.offset = offset;
    this.torusSize = torusSize;
    this.boxSize = boxSize;
    this.colors = colors;
    this.maxFrames = maxFrames;
    this.numTori = numTori;
  }

  update() {
    this.angle = (frameCount + this.offset) % this.maxFrames;
  }

  display() {
    push();
    let colorIndex = this.angle % this.colors.length;
    fill(this.colors[colorIndex]);
    noStroke();

    let offsetX = sin(this.angle * TWO_PI / this.maxFrames) * this.boxSize / 2;
    let offsetY = cos(this.angle * TWO_PI / this.maxFrames) * this.boxSize / 2;
    let offsetZ = sin(this.angle * 0.5 * TWO_PI / this.maxFrames) * this.boxSize / 2;

    translate(offsetX, offsetY, offsetZ);
    rotateX(frameCount * 0.01);
    rotateY(frameCount * 0.02);
  
    for (let i = 0; i < this.numTori; i++) {
      push();
      let orbitAngle = (frameCount * 0.02 + i * TWO_PI / this.numTori) % TWO_PI;
      let orbitRadius = this.torusSize;
      let torusX = sin(orbitAngle) * orbitRadius;
      let torusY = cos(orbitAngle) * orbitRadius;
      translate(torusX, torusY, 0);
      torus(this.torusSize / 2, this.torusSize / 4, 24, 16);
      pop();
    }
    pop();
  }
}
