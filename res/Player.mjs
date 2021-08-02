import {Pointer} from "./Pointer.mjs";
import {GameMap} from "./GameMap.mjs";
import {Path} from "./Path.mjs";
import {H} from "./H.mjs";
import {NearHex} from "./NearHex.mjs";

export class Player {

    constructor(socketId, hex) {
        this.COEFFICIENT_SPEED = 1000;

        this.coordinates = hex;
        this.speed = 0.3;
        this.currentPath = [];
        this.isRunPathIteration = false;
        this.id = socketId;
        this.direction = 0;
    }

    setDirection(direction) {
        this.direction = direction;
    }

    goToHex(hex) {
        if (
            !Pointer.isPointerOnMap(hex)
            || !GameMap.getInstance().isNotCollision(hex)
        ) {
            return console.log('Невозможно переместиться в этот гекс');
        }

        Path.finalPath = Path.findPath(this.coordinates, hex);

        if (!H.isset(Path.finalPath)) {
            return console.log('Невозможно переместиться в этот гекс');
        }

        this.goByPath(Path.finalPath);

    }

    goByPath(path) {
        this.currentPath = path;

        if (!this.isRunPathIteration) {
            this.pathIteration()
        }
    }

    pathIteration() {
        if (this.currentPath.length) {
            this.isRunPathIteration = true;
            setTimeout(
                () => {
                    let nextCoord = this.currentPath.shift();
                    this.updateDirection(this.coordinates, nextCoord)
                    this.coordinates = nextCoord;
                    this.pathIteration();
                },
                this.COEFFICIENT_SPEED * this.speed
            );
        } else {
            this.isRunPathIteration = false;
        }
    };

    updateDirection(currentCoord, nextCoord){
        var isOffset = currentCoord.r & 1;
        this.direction = NearHex.getDirectionByOffset(isOffset, NearHex.calcOffset(this.coordinates, nextCoord));
    }

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