class SpiralMover {
  constructor(torusSize, toriNumber, boxSize, colors) {
    this.torusSize = torusSize;
    this.toriNumber = toriNumber;
    this.boxSize = boxSize;
    this.colors = colors;
    this.angle = 0;
    this.theta = 0;
  }

  update(theta) {
    this.theta = theta;
    this.angle = this.theta;
    this.centerX = sin(this.theta) * 200;
    this.centerY = cos(this.theta) * 200;
    this.centerZ = sin(this.theta * 2) * 100;
    this.spiralRadius = this.theta * 10;
  }

  display() {
    push();
    let colorFrequency = 23;
    let colorIndex =
      floor(
        map(this.angle, 0, TWO_PI, 0, this.colors.length * colorFrequency)
      ) % this.colors.length;
    fill(this.colors[colorIndex]);
    noStroke();

    let offsetX =
      this.centerX +
      (sin(this.angle) * this.boxSize) / 2 +
      sin(this.angle) * this.spiralRadius;
    let offsetY =
      this.centerY +
      (cos(this.angle) * this.boxSize) / 2 +
      cos(this.angle) * this.spiralRadius;
    let offsetZ = this.centerZ + (sin(this.angle * 0.5) * this.boxSize) / 2;

    translate(offsetX, offsetY, offsetZ);
    rotateX(this.theta * 0.01);
    rotateY(this.theta * 0.02);

    for (let i = 0; i < this.toriNumber; i++) {
      push();
      let orbitAngle = (this.theta + (i * TWO_PI) / this.toriNumber) % TWO_PI;
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
