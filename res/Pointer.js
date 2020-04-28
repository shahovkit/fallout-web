import {Conversion} from "./Conversion.js";
import {GameMap} from "./GameMap.js";

export class Pointer
{
    static pointer;

    static getPosition() {
        return {x: this.pointer.x, y: this.pointer.y};
    }

    static getHexPosition() {
        return Conversion.pixel2Offset(this.getPosition())
    }

    static setPointer(pointer) {
        this.pointer = pointer;
    }

    static isPointerOnMap() {
        let hex = Conversion.pixel2Offset(this.getPosition());
        return hex.q >= 0
            && hex.r >= 0
            && hex.q < GameMap.getInstance().getSize().q
            && hex.r < GameMap.getInstance().getSize().r;
    }
}