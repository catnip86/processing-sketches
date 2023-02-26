int CUBES = 25;
Cube[] cubes = new Cube[CUBES];

void setup() {
  size(800, 800, P3D);
  colorMode(HSB);
  for (int i = 0; i < cubes.length; i++) {
    cubes[i] = new Cube(i);
  }
}

void draw() {
  background(0);
  
  // Move and rotate cubes
  for (int i = 0; i < cubes.length; i++) {
    Cube c = cubes[i];
    c.update();
    c.checkEdges();
      for (int j = 0; j < cubes.length; j++) {
      c.checkCollision(cubes[j]);
      }
  }
  
  // Draw cubes
  for (int i = 0; i < cubes.length; i++) {
  Cube c = cubes[i];
  c.display();
  }
}
