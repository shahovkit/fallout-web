let express = require('express');
let app = express();
let server = require('http').Server(app);
let io = require('socket.io')(server);

app.use('/res', express.static(__dirname + '/res'));

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

server.listen(8802, function(){
    console.log('listening on http://127.0.0.1:8802/');
});

io.sockets.on('connection', function (socket) {

    var ID = socket.id;
    console.log('пользователь ' + ID + ' зашел на сервер');


    socket.json.send('Ваш ID: ' + ID + ', вы зашли на сервер');

    socket.broadcast.json.send('пользователь ' + ID + ' зашел на сервер');

    socket.on('message', function (res) {

    });

    // setInterval(()=>{
    //     socket.json.send({'event':'changeCoordinates', 'body':player.getHexPosition()});
    // },16);

    socket.on('disconnect', function() {
        socket.json.send('Пользователь ' + ID + ' вышел с сервера');
    });
});