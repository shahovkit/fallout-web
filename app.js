var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use('/res', express.static(__dirname + '/res'));

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

http.listen(8802, function(){
    console.log('listening on http://127.0.0.1:8802/');
});
