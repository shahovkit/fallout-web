import {Player} from './Player.js'
import {Graphics} from './Graphics.js'
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

let socket;

window.send = (event, msg) => {
    socket.send({'event':event,'body':msg});
    return;
};

window.chat = (msg) => {
    return send('chatSentMessage',msg);
};

socket = io.connect('ws://127.0.0.1:8802',{transports: ['websocket']});

socket.on('connect', function () {
    socket.on('message', function (msg) {
        console.log(msg);
    });
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
    //send('goToHex', Pointer.getHexPosition());
    player.goToHex(Pointer.getHexPosition());
}

function pointermove() {
    Graphics.getInstance().drawDebugInfo();
}


