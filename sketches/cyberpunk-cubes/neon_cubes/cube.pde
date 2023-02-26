class Cube {
  PVector pos, vel, acc;
  float size, angle;
  int index, frameCountAtCollision;
  boolean isColliding, isMoving, isFading, hasChangedColor;
  color color1, color2;

  Cube(int i) {
    index = i;
    size = random(50, 100);
    pos = new PVector(random(width), random(height), random(-500, 500));
    vel = new PVector(random(-2, 2), random(-2, 2), random(-2, 2));
    acc = new PVector();
    angle = random(TWO_PI);
    isColliding = false;
    isMoving = true;
    isFading = false;
    hasChangedColor = false;
    color1 = color(random(0, 255), random(100, 255), random(100, 255));
    color2 = color(random(0, 255), random(100, 255), random(100, 255));
  }

  void applyForce(PVector force) {
    acc.add(force);
  }

  void update() {
    vel.add(acc);
    pos.add(vel);
    acc.mult(0);
    if (isColliding) {
      if (!hasChangedColor) {
        color temp = color1;
        color1 = color2;
        color2 = temp;
        hasChangedColor = true;
      }
      isColliding = false;
      isMoving = true;
    }
  }

  void checkEdges() {
    if (pos.x < -width/2 || pos.x > width/2) {
      vel.x *= -1;
    }
    if (pos.y < -height/2 || pos.y > height/2) {
      vel.y *= -1;
    }
    if (pos.z < -500 || pos.z > 500) {
      vel.z *= -1;
    }
  }

  void display() {
    strokeWeight(2);
    stroke(color1);
    noFill();
    pushMatrix();
    translate(pos.x, pos.y, pos.z);
    rotateY(angle);
    box(size);
    popMatrix();
  }

  void checkCollision(Cube other) {
    if (this != other) {
      float d = dist(this.pos.x, this.pos.y, this.pos.z, other.pos.x, other.pos.y, other.pos.z);
      float minDist = this.size/2 + other.size/2;
      if (d < minDist) {
        this.isColliding = true;
        other.isColliding = true;
        this.frameCountAtCollision = frameCount;
        other.frameCountAtCollision = frameCount;
      }
    }
  }
}
