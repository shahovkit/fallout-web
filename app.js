var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

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

const Conversion = {

  offset2Cube:(hex) => {
    var x = hex.q - (hex.r - (hex.r&1)) / 2
    var z = hex.r;
    return Units.Cube(x,-x-z,z);
  },

  cube2Offset:(cube) => {
    var q = cube.x + (cube.z - (cube.z&1)) / 2;
    var r = cube.z;
    return Units.Hex(q, r);
  },

  pixel2Cube:(point) => {
    var x = Math.sqrt(3) * point.x / 3 / size.x - point.y / 3 / size.y;
    var z = 2/3 * point.y / size.y;
    return Units.Cube(x, -x-z, z);
  },

  pixel2Offset:(point)=>{
    return Conversion.cube2Offset(Conversion.cubeRound(Conversion.pixel2Cube(point)))
  },

  hex_to_pixel:(hex)=>{
    var x = size.x * (Math.sqrt(3) * hex.q + (Math.sqrt(3) / 2) * (hex.r&1));
    var y = size.y * 3/2 * hex.r;
    return Units.Point(x, y);
  },

  pixel_to_axial:(point)=>{
    var q = Math.sqrt(3) * point.x / 3 / size.x - point.y / 3 / size.y;
    var r = (2/3 * point.y) / size.y;
    return Units.Hex(q, r)
  },

  cubeRound:(cube)=> {
    var x = Math.round(cube.x);
    var y = Math.round(cube.y);
    var z = Math.round(cube.z);

    var x_diff = Math.abs(x - cube.x);
    var y_diff = Math.abs(y - cube.y);
    var z_diff = Math.abs(z - cube.z);

    if (x_diff > y_diff && x_diff > z_diff)
      x = -y - z;
    else if (y_diff > z_diff)
      y = -x - z;
    else
      z = -x - y;

    return Units.Cube(x,y,z);
  }
};

const Units = {
  Point : (x, y) => ({x, y}),

  Cube : (x, y, z) => ({x, y, z}),

  Hex : (q, r) => ({q, r}),
};

// PRIORITY QUEUE
// From: https://jsfiddle.net/GRIFFnDOOR/r7tvg/
// Savagely adapted/mangled!

const PriorityQueue = (arr) => {
  const queue = {

    heap: [],

    logHeap: function() {
      let output = "HEAP - "
      for (let i = 0; i < this.heap.length; i++) {
        output += "[" + this.heap[i][0] +  " / " + this.heap[i][1] + "]";
      }
      console.log(output);
    },

    length: function() {
      return this.heap.length;
    },

    push: function(data, priority) {
      var node = [data, priority];
      this.bubble(this.heap.push(node) - 1);
    },

    // removes and returns the data of lowest priority
    pop: function() {
      return this.heap.pop()[0];
    },

    // removes and returns the data of highest priority
    popHigh: function() {
      return this.heap.shift()[0];
    },

    // bubbles node i up the binary tree based on
    // priority until heap conditions are restored
    bubble: function(i) {
      while (i > 0) {
        // var parentIndex = i >> 1; // <=> floor(i/2)	// legacy code
        var parentIndex = i - 1;

        // if equal, no bubble (maintains insertion order)
        if (!this.isHigherPriority(i, parentIndex)) break;

        this.swap(i, parentIndex);
        i = parentIndex;
      }
    },

    // swaps the addresses of 2 nodes
    swap: function(i,j) {
      var temp = this.heap[i];
      this.heap[i] = this.heap[j];
      this.heap[j] = temp;
    },

    // returns true if node i is higher priority than j
    isHigherPriority: function(i,j) {
      return this.heap[i][1] > this.heap[j][1];
    }

  };

  if (arr) for (i=0; i< arr.length; i++)
    queue.heap.push(arr[i][0], arr[i][1]);

  return queue;
}

const ArrayHelper = {
  // ARRAY SHUFFLE
  // From: http://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
  shuffle: (array) => {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  },

  multiArray: (x, y) => Array(...Array(x)).map(() => Array(y))
};

function Player() {

  var coordinates = {q:0,r:0};//hex
  var speed = 0.1; //hex per second
  var currentPath = [];//current path that by will be go

  this.goByPath = (path)=>{

    let isRunPath = !Boolean(currentPath.length);

    currentPath = path;

    if(isRunPath){
      pathIteration()
    }
  }

  let pathIteration = ()=>{
    if(currentPath.length){
      setTimeout(()=>{
        coordinates = currentPath.shift();
        pathIteration();
      },1000*speed);
    }
  };


  this.getCoordinates = ()=>{
    return coordinates;
  }

  this.setCoordinates = (hex)=>{
    coordinates = hex;
  }

  this.setSpeed = (newSpeed)=>{
    speed = newSpeed;
  }


}


let mapSize = {q: 15, r: 22};
let size = {x: 32, y: 16};
let center = {x: 0, y: 0};
var graphics;
var text;
var player = new Player();
var coord;
let finalPath = [];
var add;
var path2;
let coordLock = null;

let world = {
  map:ArrayHelper.multiArray(mapSize.q, mapSize.r),
  players:{
    current:player,
    other:[
      {
        coord:{
          q:5,
          r:5
        }
      }
    ]
  }
};


//Fill Map Collision
for (let q = 0; q < mapSize.q; q++) {
  for (let r = 0; r < mapSize.r; r++) {
    //map[q][r] = {collision: Math.random() >= 0.8};
    world.map[q][r] = {collision: false};
  }
}

world.map[3][2] = {collision: true};
world.map[4][2] = {collision: true};
world.map[5][2] = {collision: true};
world.map[6][2] = {collision: true};
world.map[7][2] = {collision: true};
world.map[7][3] = {collision: true};
world.map[7][4] = {collision: true};
world.map[7][5] = {collision: true};
world.map[7][6] = {collision: true};
world.map[7][7] = {collision: true};
world.map[7][8] = {collision: true};
world.map[7][9] = {collision: true};
world.map[7][10] = {collision: true};
world.map[7][11] = {collision: true};
world.map[7][12] = {collision: true};
world.map[7][13] = {collision: true};
world.map[7][14] = {collision: true};
world.map[7][15] = {collision: true};
world.map[7][16] = {collision: true};
world.map[7][17] = {collision: true};
world.map[7][18] = {collision: true};
world.map[7][19] = {collision: true};
world.map[7][20] = {collision: true};
world.map[6][20] = {collision: true};
world.map[5][20] = {collision: true};
world.map[4][20] = {collision: true};
world.map[3][20] = {collision: true};

world.map[11][5] = {collision: true};

console.dir(world);

let offsetNeighbor = (hex, direction) => {
  var parity = hex.r & 1;
  var dir = offsetDirections[parity][direction];
  var hexf = Units.Hex(hex.q + dir[0], hex.r + dir[1]);
  return hexf
};

let getOffsetNeighbors = (hex) => {
  const neighbors = [];
  for (let i = 0; i < 6; i++) {
    const neighbor_offset = offsetNeighbor(hex, i);

    // Is the neighbor on/in the map?
    if (neighbor_offset.q >= 0 && neighbor_offset.r >= 0
      && neighbor_offset.q < mapSize.q && neighbor_offset.r < mapSize.r) {

      if (!world.map[neighbor_offset.q][neighbor_offset.r].collision) {
        neighbors.push(neighbor_offset); // add an edge to the graph
      }
    }
  }
  return neighbors;
};

//find hex from came to current hex
let findFromHex = (cames, hex) => {
  for (let h = 0; h < cames.length; h++) {
    if (HexMath.hexEqual(cames[h].to, hex)) {
      return cames[h];
    }
  }
  return undefined;
};

let findPath = (start, goal) => {
  // if(debug == true){
  //   debugger;
  // }
  //finalPathNeighbors = [];
  //time = performance.now();
  const frontier = PriorityQueue();  // List of the places to explore next
  const came = [];// List of where we've already been - "from" and The price we paid to go there - "cost"
  let found = false;

  frontier.push(start, 0);
  came.push({to: start, from: start, cost: 0});

  while (frontier.length() > 0) {

    const current = frontier.pop();
    //const currentHex = map[current.q][current.r];

    const neighbors = getOffsetNeighbors(current);

    // Early exit (stop exploring map when goal is reached)
    if (HexMath.hexEqual(current, goal)) {
      found = true;
      break;
    }

    for (let n = 0; n < neighbors.length; n++) {

      let next = neighbors[n],
        newCost = (findFromHex(came, current).cost + 1);//, //plus one step
      //distance = HexMath.offsetDistance(goal, next);

      let eurist = newCost;// + distance;
      if (findFromHex(came, next) === undefined || newCost < findFromHex(came, next).cost) {
        //finalPathNeighbors.push([next, eurist]);
        frontier.push(next, eurist);
        came.push({to: next, from: current, cost: newCost});
      }
    }
  }

  // BUILD PATH BACK FROM GOAL
  if (goal && found) {
    let current = goal;
    let path = [goal];

    while (!HexMath.hexEqual(current, start)) {
      current = findFromHex(came, current).from;
      path.push(current);
    }
    //time = performance.now() - time;
    return path.reverse();

  } else {
    return undefined;
  }

};

app.use('/public', express.static(__dirname + '/public'));

app.get('/', function(req, res){
    res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', async socket => {

  io.emit('updateWorld', world);

  console.log('New user connected');

  socket.on('goToCoordnate', function(hex){
    finalPath = findPath(world.players.current.getCoordinates(), hex);
    finalPath.shift();
    world.players.current.goByPath(finalPath)
  });

  socket.on('test_html', function(){
    io.emit('test_node', 'test completed');
  });

});

setInterval(()=>{
  io.emit('updateWorld', world);
},1000/60);


http.listen(8802, function(){
    console.log('listening on *:8802');
});
