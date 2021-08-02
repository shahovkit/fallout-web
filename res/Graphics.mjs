import {Units} from "./Units.mjs";
import {Conversion} from "./Conversion.mjs";
import {GameMap} from "./GameMap.mjs";
import {Pointer} from "./Pointer.mjs";
import {Constants} from "./Constants.mjs";
import {Path} from "./Path.mjs";
import {H} from "./H.mjs";


export class Graphics
{
    preload(){
        this.phaser.load.atlas('pijam', '/res/img/SpriteSheetMini/walksheet.png', '/res/img/SpriteSheetMini/walksheet.json');
    }

    static getInstance(){

        if( typeof(this.instance) === "undefined"){
            this.instance = new this();
        }
        return this.instance
    }

    clear(){
        this.phaserGraphics.clear();
    }

    //get coord corner dot hex by count
    getHexCorners(hex) {
        let hexCenter = Conversion.hex_to_pixel(hex);
        var coords = [];
        for (let i = 1; i <= Constants.getHexCorners(); i++) {
            var angle_deg = 60 * i - 30;
            var angle_rad = Math.PI / 180 * angle_deg;
            coords.push(Units.Point(hexCenter.x + Constants.getSizeHex().x * Math.cos(angle_rad),
                hexCenter.y + Constants.getSizeHex().y * Math.sin(angle_rad)));
        }
        return coords;
    }

    drawPointer(){
        if (Pointer.getPosition().y >= 0 && Pointer.getPosition().x >= 0) {
            let positionPointerHex = Conversion.pixel2Offset(Pointer.getPosition());
            if (positionPointerHex.q < GameMap.getInstance().getSize().q && positionPointerHex.r < GameMap.getInstance().getSize().r) {
                this.phaserGraphics.lineStyle(3, 0xe83331);
                let hexCorners = this.getHexCorners(positionPointerHex);
                this.phaserGraphics.strokePoints(hexCorners, true);
            }
        }
    }

    drawCollision() {
        if(GameMap.getInstance().getHexes().length) {
            for (let r = 0; r < GameMap.getInstance().getHexes().length; r++) {
                for (let q = 0; q < GameMap.getInstance().getHexes()[0].length; q++) {
                    if (GameMap.getInstance().getHexes()[r][q].collision) {
                        this.phaserGraphics.lineStyle(3, 0xe83331);
                        let hexCorners = this.getHexCorners(Units.Hex(r,q));
                        this.phaserGraphics.strokePoints(hexCorners, true).fillStyle(0x00ff00);
                        this.phaserGraphics.fillPath();
                    }
                }
            }
        }
    }

    drawPlayer(player){
        if(!H.isset(player)) return false;

        this.phaserGraphics.lineStyle(3, 0xe83331);
        this.phaserGraphics.fillStyle(0x2a42ff);
        let hexCorners = this.getHexCorners(player.getHexPosition());
        this.phaserGraphics.strokePoints(hexCorners, true);
        this.phaserGraphics.fillPath();

        let coord = Conversion.hex_to_pixel(player.getHexPosition());
        if( typeof(player.sprite) === "undefined") {
            player.sprite = this.phaser.add.sprite(coord.x, coord.y - 53, 'pijam', 'stay'+player.direction+'.png').setScale(2);
        }
        player.sprite.setY(coord.y - 53);
        player.sprite.setX(coord.x);

        // this.phaserGraphics.sprite(coord.x, coord.y, 'stay');
    }

    drawPath() {
        if (H.isset(Path.finalPath)) {
            Path.finalPath.forEach((hex) => {
                this.phaserGraphics.lineStyle(3, 0xe83331);
                this.phaserGraphics.fillStyle(0x6600a5, 1);
                let hexCorners = this.getHexCorners(Units.Hex(hex.r, hex.q));
                this.phaserGraphics.strokePoints(hexCorners, true);
                this.phaserGraphics.fillPath();
            });
        }
    }

    drawDebugInfo(game){
        let cube = Conversion.pixel2Cube(Pointer.getPosition());
        let round_cube = Conversion.cubeRound(cube);
        let round_hex = Conversion.cube2Offset(round_cube);
        let player_direction = game.players[0].direction;
        let offset = game.players[0].coordinates.q & 1 ;

        this.phaserText.text = 'Cursor\n x:' + Pointer.getPosition().x + "\n" + ' y:' + Pointer.getPosition().y + "\n" +
            'Hex\n r:' + round_hex.r + "\n" + ' q:' + round_hex.q + "\n" +
            'Cube\n x:' + round_cube.x + "\n" + ' y:' + round_cube.y + "\n" + ' z:' + round_cube.z + "\n" +
            'Direction: ' + player_direction + "\n" +
            'Offset: ' + offset + "\n";
    }
}