export class Units
{
  static Point(x, y) {
    return {x:x, y:y}
  }

  static Cube(x, y, z) {
    return {x:x, y:y, z:z}
  }

  static Hex(r, q) {
    return {r:r, q:q}
  }
}