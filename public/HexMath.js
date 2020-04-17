export class HexMath
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

  // dx1 =
  // dy1 =
  // dx2 =
  // dy2 =
  // крест = abs (current.x - goal.x * start.y - goal.y - start.x - goal.x * current.y - goal.y)
  static moreEuristic(start, current, goal) {
    return ( current.q - goal.q ) * ( start.r - goal.r  ) - ( start.q - goal.q ) * ( current.r - goal.r )
  }
  //((current.x - goal.x) * (start.y - goal.y) - (start.x - goal.x) * (current.y - goal.y))
  //start2goal = { x:goal.x-start.x, y:goal.y-start.y, z:goal.z-start.z }
  //current2goal = { x:goal.x-current.x, y:goal.y-current.y, z:goal.z-current.z }
}