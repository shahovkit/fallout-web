const HexMath = {

  cubeAdd: (cube1, cube2) => ({
    x: cube1.x + cube2.x,
    y: cube1.y + cube2.y,
    z: cube1.z + cube2.z
  }),

  cubeSub: (cube1, cube2) => ({
    x: cube1.x - cube2.x,
    y: cube1.y - cube2.y,
    z: cube1.z - cube2.z
  }),

  hexEqual: (hex1, hex2) => hex1.q === hex2.q && hex1.r === hex2.r,

  cubeDistance: (cube1, cube2) => (Math.abs(cube1.x - cube2.x) + Math.abs(cube1.y - cube2.y) + Math.abs(cube1.z - cube2.z))/2 ,

  offsetDistance: (hex1, hex2) => HexMath.cubeDistance( Conversion.offset2Cube(hex1), Conversion.offset2Cube(hex2) ),
  // dx1 =
  // dy1 =
  // dx2 =
  // dy2 =
  // крест = abs (current.x - goal.x * start.y - goal.y - start.x - goal.x * current.y - goal.y)
  moreEuristic: (start, current, goal) => (( current.q - goal.q ) * ( start.r - goal.r  ) - ( start.q - goal.q ) * ( current.r - goal.r ))
  //((current.x - goal.x) * (start.y - goal.y) - (start.x - goal.x) * (current.y - goal.y))
  //start2goal = { x:goal.x-start.x, y:goal.y-start.y, z:goal.z-start.z }
  //current2goal = { x:goal.x-current.x, y:goal.y-current.y, z:goal.z-current.z }
};
