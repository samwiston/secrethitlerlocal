const { app, BrowserWindow } = require('electron')
const path = require('path')
const { ipcMain } = require('electron');
const express = require('express');
const exprapp = express();

const http = require('http').createServer(exprapp);
let io = require('socket.io')(http, 
    {   // Without this line, sockets disconnected 
        //at random after some time
        pingTimeout: 60000
    }
);

var middleware = require('socketio-wildcard')();

const port = 8080;

let mainWindow;

function createWindow() {
    // Create the browser window.
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true
        }
    })

    // and load the index.html of the app.
    mainWindow.loadFile('./build/index.html');

    // Open the DevTools.
    mainWindow.webContents.openDevTools();

    // Emitted when the window is closed.
    mainWindow.on('closed', () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null
    })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    // But that's stupid so we won't do that!
    app.quit();
})

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) createWindow();
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.


exprapp.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/../build/client/index.html'));
});

console.log(__dirname);
exprapp.use(express.static(__dirname + '/../build/client'));
io.use(middleware);

http.listen(port, function(){
    console.log('listening on: ' + port.toString());
});

io.sockets.on('connection', (socket) => {
    // Root event handler relays events to renderer
    socket.on('*', packet => {
        mainWindow.webContents.send(packet.data[0], socket.id, packet.data[1]);
    });

    // Relay for the other direction, to player device
    ipcMain.on('state', (event, arg) => {
        socket.emit('state', arg);
    });

    socket.on('disconnect', () => {
        mainWindow.webContents.send('disconnect', socket.id);
    })

    socket.on('reconnect', (attemptNumber) => {
        console.log('reconnected after ' + attemptNumber + ' tries')
    });
});



var localtunnel = require('localtunnel');

/* tunnel.on('close', function() {
    console.log("Tunnel Closed");
}); */

// var tunnel = localtunnel(port,{
//         subdomain: "samwiston"
//     }, function(err, tunnel) {
//         console.log(tunnel.url);
//     });

ipcMain.on('request-socket', (event) => {
    event.reply('socket-response', socket);
});

