import express from 'express';
import http from 'http';
import socketIo from 'socket.io';
import path from 'path';
import {Player} from "./res/Player.mjs";
import {H} from "./res/H.mjs";
import {Units} from "./res/Units.mjs";
import {GameMap} from "./res/GameMap.mjs";

let app = express();
let server = http.Server(app);
let io = socketIo(server);
let __dirname = path.resolve();

server.game = {
    players: [],
    map: GameMap.getInstance()
};

app.use('/res', express.static(__dirname + '/res'));

app.use('/favicon.ico', express.static(__dirname + '/favicon.ico'));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.get('/test', function (req, res) {
    res.sendFile(__dirname + '/index_test.html');
});

server.listen(8802, function () {
    console.log('listening on http://127.0.0.1:8802/');
    server.updateRate = 1000 / 30;
    server.setUpdateLoop();
});

server.setUpdateLoop = function () {
    setInterval(server.updatePlayers, server.updateRate);
};

server.updatePlayers = function () {
    if (server.game.players.length === 0) return;
    //io.to(socketID).emit('update',server.game.players);
    io.emit('update', server.game.players);
};

io.sockets.on('connection', function (socket) {

    server.game.players.push(
        new Player(
            socket.id,
            Units.Hex(H.randomByInterval(0, 10), H.randomByInterval(0, 10))
        )
    );

    console.log('пользователь ' + socket.id + ' зашел на сервер');
    console.log(server.game.players);

    socket.emit('youJoin', 'Ваш ID: ' + socket.id + ', вы зашли на сервер');

    socket.emit('playerInitPosition', H.getPlayerById(socket.id, server.game.players).coordinates);

    socket.broadcast.emit('playerJoin', 'пользователь ' + socket.id + ' зашел на сервер');

    socket.on('chatSend', function (res) {
        socket.broadcast.emit('newMessage', socket.id + ': ' + res);
    });

    socket.on('goToHex', function (res) {
        console.log('Пользователь перемещается в клетку r:' + res.r + ' q:' + res.q);
        H.getPlayerById(socket.id, server.game.players).goToHex(res);
    });

    socket.on('disconnect', function () {
        console.log('Пользователь ' + socket.id + ' вышел с сервера');
        socket.broadcast.emit('disconnectUser', socket.id);
        H.removeObjByProp(server.game.players, 'id', socket.id);
    });
});