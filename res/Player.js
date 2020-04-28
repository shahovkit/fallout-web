import {Pointer} from "./Pointer.js";
import {GameMap} from "./GameMap.js";
import {Path} from "./Path.js";
import {H} from "./H.js";

export class Player
{

    coordinates;//hex
    speed; //seconds per hex
    currentPath;//current path that by will be go'.

    isRunPathIteration;

    COEFFICIENT_SPEED = 1000;

    constructor() {
        this.coordinates = {q:0,r:0};
        this.speed = 0.3;
        this.isRunPathIteration = false;
    }

    goToHex(hex) {
        if (
            !Pointer.isPointerOnMap()
            || !GameMap.getInstance().isNotCollision(Pointer.getHexPosition())
        ) {
            return console.log('Невозможно переместиться в этот гекс');
        }

        Path.finalPath = Path.findPath(this.getHexPosition(), Pointer.getHexPosition());

        if(!H.isset(Path.finalPath)){
            return console.log('Невозможно переместиться в этот гекс');
        }

       this.goByPath(Path.finalPath);

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

    getHexPosition() {
        return this.coordinates;
    }



    setCoordinates(hex) {
        this.coordinates = hex;
    }

    setSpeed(newSpeed) {
        this.speed = newSpeed;
    }

}