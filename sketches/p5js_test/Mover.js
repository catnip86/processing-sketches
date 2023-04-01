class Mover {
  constructor(offset, cubeSize, boxSize, colors, maxFrames) {
    this.offset = offset;
    this.cubeSize = cubeSize;
    this.boxSize = boxSize;
    this.colors = colors;
    this.maxFrames = maxFrames;
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
    sphere(this.cubeSize, 4, 4);
    pop();
  }
}
