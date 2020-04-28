import {Units} from "./Units.js";
import {Conversion} from "./Conversion.js";
import {GameMap} from "./GameMap.js";
import {Pointer} from "./Pointer.js";
import {Constants} from "./Constants.js";
import {Path} from "./Path.js";
import {H} from "./H.js";

export class Graphics
{

    static instance;

    phaserGraphics;

    phaserText;

    static getInstance(){

        if( typeof(this.instance) === "undefined"){
            this.instance = new this();
        }
        return this.instance
    }

    getPhaserGraphics(){
        if(typeof(this.phaserGraphics) === "undefined"){
            throw new Error("phaserGraphics not initialized, set it via setPhaserGraphics()")
        }
        return this.phaserGraphics
    }

    setPhaserGraphics(phaserGraphics){
        this.phaserGraphics = phaserGraphics;
    }

    setPhaserText(phaserText){
        this.phaserText = phaserText;
    }


    getPhaserText(phaserText){
        if(typeof(this.phaserText) === "undefined"){
            throw new Error("phaserText not initialized, set it via setPhaserText()")
        }
        return this.phaserText
    }

    clear(){
        this.phaserGraphics.clear();
    }

    /**
     * DON'T USE IT
     */
    constructor(){
        if( typeof(this.instance) !== "undefined"){
            throw new Error("Object already exist, use getInstance() instead new")
        }
    }

    static initGame(){

    }

    //get coord corner dot hex by count
    getHexCorners(hex) {
        let hexCenter = Conversion.hex_to_pixel(hex);
        var coords = [];
        for (let i = 1; i <= Constants.hexCorners; i++) {
            var angle_deg = 60 * i - 30;
            var angle_rad = Math.PI / 180 * angle_deg;
            coords.push(Units.Point(hexCenter.x + Constants.sizeHex.x * Math.cos(angle_rad),
                hexCenter.y + Constants.sizeHex.y * Math.sin(angle_rad)));
        }
        return coords;
    }

    drawPointer(){
        if (Pointer.getPosition().y >= 0 && Pointer.getPosition().x >= 0) {
            let positionPointerHex = Conversion.pixel2Offset(Pointer.getPosition());
            if (positionPointerHex.q < GameMap.getInstance().getSize().q && positionPointerHex.r < GameMap.getInstance().getSize().r) {
                this.getPhaserGraphics().lineStyle(3, 0xe83331);
                let hexCorners = this.getHexCorners(positionPointerHex);
                this.getPhaserGraphics().strokePoints(hexCorners, true);
            }
        }
    }

    drawCollision() {
        if(GameMap.getInstance().getHexes().length) {
            for (let r = 0; r < GameMap.getInstance().getHexes().length; r++) {
                for (let q = 0; q < GameMap.getInstance().getHexes()[0].length; q++) {
                    if (GameMap.getInstance().getHexes()[r][q].collision) {
                        this.getPhaserGraphics().lineStyle(3, 0xe83331);
                        let hexCorners = this.getHexCorners(Units.Hex(r,q));
                        this.getPhaserGraphics().strokePoints(hexCorners, true).fillStyle(0x00ff00);
                        this.getPhaserGraphics().fillPath();
                    }
                }
            }
        }
    }

    drawPlayer(player){
        this.getPhaserGraphics().lineStyle(3, 0xe83331);
        this.getPhaserGraphics().fillStyle(0x2a42ff);
        let hexCorners = this.getHexCorners(player.getHexPosition());
        this.getPhaserGraphics().strokePoints(hexCorners, true);
        this.getPhaserGraphics().fillPath();
    }

    drawPath() {
        if (H.isset(Path.finalPath)) {
            Path.finalPath.forEach((hex) => {
                this.getPhaserGraphics().lineStyle(3, 0xe83331);
                this.getPhaserGraphics().fillStyle(0x6600a5, 1);
                let hexCorners = this.getHexCorners(Units.Hex(hex.r, hex.q));
                this.getPhaserGraphics().strokePoints(hexCorners, true);
                this.getPhaserGraphics().fillPath();
            });
        }
    }

    drawDebugInfo(){
        let cube = Conversion.pixel2Cube(Pointer.getPosition());
        let round_cube = Conversion.cubeRound(cube);
        let round_hex = Conversion.cube2Offset(round_cube);

        this.getPhaserText().text = 'Cursor\n x:' + Pointer.getPosition().x + "\n" + ' y:' + Pointer.getPosition().y + "\n" +
            'Hex\n r:' + round_hex.r + "\n" + ' q:' + round_hex.q + "\n" +
            'Cube\n x:' + round_cube.x + "\n" + ' y:' + round_cube.y + "\n" + ' z:' + round_cube.z + "\n";
    }
}