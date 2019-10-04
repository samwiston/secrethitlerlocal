import React from 'react';
import MainMenu from './views/main-menu/main-menu'
import './App.css';

const { ipcRenderer } = window.require("electron")
const socket = ipcRenderer.send('request-socket');

socket.on('connection', function (socket) {
    console.log("someone connected")
});

class App extends React.Component {

    render() {
        return (
            <div className="App">
                <MainMenu socket={socket}/>
            </div>
        );
    }
}

export default App;
