class HexMath
{

  static cubeAdd (cube, cube2) {
    return {
      x: cube1.x + cube2.x,
      y: cube1.y + cube2.y,
      z: cube1.z + cube2.z
    }
  }

  static cubeSub(cube1, cube2) {
    return {
      x: cube1.x - cube2.x,
      y: cube1.y - cube2.y,
      z: cube1.z - cube2.z
    }
  }

  static hexEqual(hex1, hex2) {
    return hex1.q === hex2.q && hex1.r === hex2.r
  }

  static cubeDistance(cube1, cube2) {
    return (Math.abs(cube1.x - cube2.x) + Math.abs(cube1.y - cube2.y) + Math.abs(cube1.z - cube2.z)) / 2
  }

  static offsetDistance(hex1, hex2) {
    return this.cubeDistance(Conversion.offset2Cube(hex1), Conversion.offset2Cube(hex2))
  }

}