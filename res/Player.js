import {Pointer} from "./Pointer.js";
import {GameMap} from "./GameMap.js";
import {Path} from "./Path.js";
import {H} from "./H.js";

export class Player
{

    constructor(socketId, hex) {
        this.COEFFICIENT_SPEED = 1000;
        this.coordinates = hex;
        this.speed = 0.3;
        this.currentPath = [];
        this.isRunPathIteration = false;
        this.id = socketId;
    }

    goToHex(hex) {
        if (
            !Pointer.isPointerOnMap()
            //|| !GameMap.getInstance().isNotCollision(hex)
        ) {
            throw 'Невозможно переместиться в этот гекс';
        }

        Path.finalPath = Path.findPath(this.getHexPosition(), hex);

        if(!H.isset(Path.finalPath)){
            throw 'Невозможно переместиться в этот гекс';
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
                    this.setCoordinates(this.currentPath.shift());
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