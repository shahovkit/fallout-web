export class Player
{

    coordinates;//hex
    speed; //seconds per hex
    currentPath;//current path that by will be go'.

    isRunPathIteration;

    COEFFICIENT_SPEED = 1000;

    constructor(){
        this.coordinates = {q:0,r:0};
        this.speed = 0.3;
        this.isRunPathIteration = false;
    }

    goByPath(path) {
        this.currentPath = path;

        if(!this.isRunPathIteration){
            this.pathIteration()
        }
    }

    pathIteration() {
        if(this.currentPath.length){
            this.isRunPathIteration=true;
            setTimeout(
                ()=>{
                    this.coordinates = this.currentPath.shift();
                    this.pathIteration();
                },
                this.COEFFICIENT_SPEED*this.speed
            );
        }else{
            this.isRunPathIteration=false;
        }
    };

    getCoordinates() {
        return this.coordinates;
    }

    setCoordinates(hex) {
        this.coordinates = hex;
    }

    setSpeed(newSpeed) {
        this.speed = newSpeed;
    }

}