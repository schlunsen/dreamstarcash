var express = require('express');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
    res.sendfile('frontend/index.html');
});

app.use('/static', express.static(__dirname + '/frontend'));

io.on('connection', function(socket){
    console.log("Client connected");

    socket.on('chat-message', function(msg){
        console.log("Chat message", msg);
        io.emit('chat-message', msg);
    });

    socket.on('chat-typing', function(data){
        console.log("Chat typing", data);
        io.emit('chat-typing', data);
    });
});

http.listen(3001, function(){
    console.log('listening on *:3001');
});
