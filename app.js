var express = require('express'),
    app = express(),
    server = require('http').createServer(app)
    io = require('socket.io').listen(server),
    path = require('path');


app.use(express.static('public'));
app.use(express.static('node_modules'));


//serving static files 

app.get('/',function(req,res){
    res.sendFile(__dirname+'/index.html');
})

app.get('/listening',function(req,res){
    res.sendFile(__dirname + '/push.html');
})

app.get('/client',function(req,res){
    res.sendFile(__dirname +'/client.html');
})


io.sockets.on('connection',function(socket){
    socket.on('sendData',function(data){
        socket.broadcast.emit('needtochangedude',data)
    });
    socket.on('changeColor',function(data1){
        socket.broadcast.emit('updateColor',data1);
    })
})


server.listen(3000);