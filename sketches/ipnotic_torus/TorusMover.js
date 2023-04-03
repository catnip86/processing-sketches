class TorusMover {
  constructor(offset, torusSize, toriNumber, boxSize, colors) {
    this.offset = offset;
    this.torusSize = torusSize;
    this.toriNumber = toriNumber;
    this.boxSize = boxSize;
    this.colors = colors;
  }

  update(theta) {
    this.angle = theta;
  
    this.centerX = sin(theta) * 200;
    this.centerY = cos(theta) * 200;
    this.centerZ = sin(theta * 2) * 100; 
  }

  display() {
    push();
    let colorIndex = floor(map(this.angle, 0, TWO_PI, 0, this.colors.length)) % this.colors.length;
    fill(this.colors[colorIndex]);
    noStroke();

    let offsetX = this.centerX + sin(this.angle) * this.boxSize / 2;
    let offsetY = this.centerY + cos(this.angle) * this.boxSize / 2;
    let offsetZ = this.centerZ + sin(this.angle * 0.5) * this.boxSize / 2;

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