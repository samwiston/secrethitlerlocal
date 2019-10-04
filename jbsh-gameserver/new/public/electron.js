const { app, BrowserWindow } = require('electron')
const path = require('path')
const { ipcMain } = require('electron');
const express = require('express');
const exprobj = express();
const http = require('http').createServer(exprobj);

let socket = require('socket.io')(http);
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
    mainWindow.on('closed', function () {
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
app.on('window-all-closed', function () {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) createWindow()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.


exprobj.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/../build/client/index.html'));
});

console.log(__dirname);
exprobj.use(express.static(__dirname + '/../build/client'));

// io.sockets.on('connection', function(socket) {
//     socket.on('disconnect', function(username) {
//         if (mainWindow) {
//             console.log(socket.username);
//             mainWindow.webContents.send('disconnected', socket.username);
//         }
//     })

//     socket.on('chat_message', function(message) {
//         io.emit('chat_message', '<strong>' + socket.username + '</strong>: ' + message);
//     });

//     socket.on('reconnect', (attemptNumber) => {
//         console.log('reconnected after ' + attemptNumber + ' tries')
//     });
// });

// var localtunnel = require('localtunnel');

/*var tunnel = localtunnel(port,function(err, tunnel) {
  console.log(tunnel.url);
});*/

/* tunnel.on('close', function() {
    console.log("Tunnel Closed");
}); */

ipcMain.on('request-url', (event, arg) => {
    var tunnel = localtunnel(port,{
        subdomain: "samwiston"
    }, function(err, tunnel) {
        event.sender.send('action-get-url', tunnel.url)
        console.log(tunnel.url);
    });
});

ipcMain.on('request-socket', (event) => {
    event.reply('socket-response', socket);
});

http.listen(port, function(){
    console.log('listening on *:3000');
});