export class Units
{
  static Point(x, y) {
    return {x, y}
  }

  static Cube(x, y, z) {
    return {x, y, z}
  }

  static Hex(q, r) {
    return {q, r}
  }
}