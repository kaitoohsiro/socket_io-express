var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);  // socket.io

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
    // console.log('a user connected'); // socket.io
    socket.emit('chat message','ようそこチャットアプリへ');
    socket.broadcast.emit('chat message','新しいユーザが接続しました。');
    socket.on('disconnect',function(){
        io.emit('chat message','あるユーザの接続が切れました')
    })
    socket.on('chat message', function(msg) {
        // console.log('message: ' + msg);
        io.emit('chat message', msg);
    });
})

server.listen(3000, function() {
    console.log('listenig on http://localhost:3000');
});
