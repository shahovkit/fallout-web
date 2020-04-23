import {Player} from './Player.js'
import {Conversion} from './Conversion.js'
import {GameMap} from './GameMap.js'
import {Graphics} from './Graphics.js'
import {Path} from './Path.js'
import {Pointer} from './Pointer.js'

let player;

let phaser = new Phaser.Game({
    type: Phaser.AUTO,
    width: 1920,
    height: 1080,
    scene: {
        create: gameInit,
        update: gameLoop
    }
});

function gameInit() {
    phaser = this;

    let graphics = phaser.add.graphics();
    let text = phaser.add.text(40, 60);
    Graphics.getInstance().setPhaserGraphics(graphics);
    Graphics.getInstance().setPhaserText(text);
    Pointer.setPointer(phaser.input.mousePointer);

    player = new Player();

    phaser.input.on('pointermove', pointermove);
    phaser.input.on('pointerdown', pointerdown);

}
function gameLoop() {
    Graphics.getInstance().clear();
    Graphics.getInstance().drawPointer();
    Graphics.getInstance().drawCollision();
    Graphics.getInstance().drawPlayer(player);
    Graphics.getInstance().drawPath();
}

function pointerdown() {
    let hex = Conversion.pixel2Offset(Pointer.getPosition());
    if (Pointer.isPointerOnMap() && GameMap.getInstance().isNotCollision(hex)) {
        Path.finalPath = Path.findPath(player.getCoordinates(), hex);
        player.goByPath(Path.finalPath)

    }
}

function pointermove() {
    Graphics.getInstance().drawDebugInfo();
}
