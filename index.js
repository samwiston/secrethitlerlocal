const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const port = 8080;

app.get('/', function(req, res) {
    res.render('index.ejs');
});

app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist/'));

io.sockets.on('connection', function(socket) {
    socket.on('username', function(username) {
        socket.username = username;
        io.emit('connected', socket.username);
    });

    socket.on('disconnect', function(username) {
        io.emit('is_online', socket.username);
    })

    socket.on('chat_message', function(message) {
        io.emit('chat_message', '<strong>' + socket.username + '</strong>: ' + message);
    });

});

const server = http.listen(port, function() {
    console.log('listening on *:' + port);
});


var localtunnel = require('localtunnel');
 
var tunnel = localtunnel(port,{
    subdomain: "samwiston"
},
    function(err, tunnel) {
 
    // the assigned public url for your tunnel
    // i.e. https://abcdefgjhij.localtunnel.me
    console.log(tunnel.url);
});
 
tunnel.on('close', function() {
    // tunnels are closed
});