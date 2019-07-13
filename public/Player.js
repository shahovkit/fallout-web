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




