var express = require('express');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
    res.sendfile('frontend/index.html');
});



app.use('/static', express.static(__dirname + '/frontend'));



io.on('connection', function(socket){
    console.log('a user connected');
});

http.listen(3001, function(){
    console.log('listening on *:3001');
});
