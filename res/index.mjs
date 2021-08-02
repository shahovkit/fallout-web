import {Player} from './Player.mjs'
import {Graphics} from './Graphics.mjs'
import {Pointer} from './Pointer.mjs'
import {H} from './H.mjs'
import {Units} from "./Units.mjs";

let game = {
    players : []
};
//debug info player each 5 seconds to console
setInterval(()=>{console.log(game.players)},1000);

const config = {
    type: Phaser.AUTO,
    width: 1920,
    height: 1080,
    scene: {
        preload: preload,
        create: gameInit,
        update: gameLoop
    },
    render: {
        pixelArt: true
    },
};

let phaser = new Phaser.Game(config);

let socket;

window.chat = (msg) => {
    socket.emit('chatSend',msg);
    return console.log(msg);
};

socket = io.connect('ws://' + window.location.hostname, {transports: ['websocket']});

function gameInit() {
    this.input.on('pointermove', pointermove);
    this.input.on('pointerdown', pointerdown);
}

function preload() {
    Graphics.getInstance().phaser = this;
    Graphics.getInstance().phaserGraphics = this.add.graphics();
    Graphics.getInstance().phaserText = this.add.text(40, 60);
    Pointer.setPointer(this.input.mousePointer);

    Graphics.getInstance().preload();

    socket.on('connect', function () {
        socket.on('playerInitPosition', function (hex) {
            //game.players.push(new Player(socket.id, hex));
        });

        socket.on('newMessage', function (msg) {
            console.log(msg);
        });

        socket.on('update', function (data) {
            data.forEach((playerServer) => {

                let isHasPlayer = false;

                game.players.forEach((playerClient)=>{
                    if(playerClient.id === playerServer.id){
                        isHasPlayer = true;

                        playerClient.setCoordinates(playerServer.coordinates);
                    }
                });

                if(!isHasPlayer){
                    game.players.push(new Player(playerServer.id, playerServer.coordinates))
                }

            });
        });

        socket.on('youJoin', function (data) {
            console.log(data);
        });

        socket.on('playerJoin', function (data) {
            console.log(data);
        });

        socket.on('disconnectUser', function (socketID) {
            H.removeObjByProp(game.players, 'id', socketID);

            console.log('Пользователь ' + socketID + ' вышел с сервера');
        });

    });
}

function gameLoop() {
    //
    Graphics.getInstance().clear();

    Graphics.getInstance().drawCollision();
    game.players.forEach((player)=>{
        Graphics.getInstance().drawPlayer(player);
    });
    Graphics.getInstance().drawPath();
    //console.log(game.players);

    Graphics.getInstance().drawPointer();
}

function pointerdown() {
    socket.emit('goToHex', Pointer.getHexPosition());
    //send('goToHex', Pointer.getHexPosition());
    //H.getPlayerById(socket.id, game.players).goToHex(Pointer.getHexPosition());
}

function pointermove() {
    Graphics.getInstance().drawDebugInfo(game);
}


