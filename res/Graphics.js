import {Units} from "./Units.js";
import {Conversion} from "./Conversion.js";
import {GameMap} from "./GameMap.js";

export class Graphics
{

    static instance;

    static getInstance(){
        if( typeof(this.instance) === "undefined"){
            this.instance = new this();
        }
        return this.instance
    }

    constructor(){
        if( typeof(this.instance) !== "undefined"){
            throw new Error("Object already exist, use getInstance() instead new")
        }
        this.instance = this;

    }

    static initGame(){

    }

    //get coord corner dot hex by count
    static hex_corners(center, size, corners) {

        var coords = [];
        for (let i = 1; i <= corners; i++) {
            var angle_deg = 60 * i - 30;
            var angle_rad = Math.PI / 180 * angle_deg;
            coords.push(Units.Point(center.x + size.x * Math.cos(angle_rad),
                center.y + size.y * Math.sin(angle_rad)));
        }
        return coords;
    }

    static drawPointer(){
        if (Pointer.positionByHex.y >= 0 && Pointer.positionByHex.x >= 0) {
            let oddr = Conversion.pixel2Offset(Pointer.positionByHex);
            if (oddr.q < GameMap.getInstance().getSize().q && oddr.r < GameMap.getInstance().getSize().r) {
                graphics.strokePoints(Graphics.hex_corners(Pointer.positionByHex, Constants.sizeHex, 6), true);
            }
        }
    }
}