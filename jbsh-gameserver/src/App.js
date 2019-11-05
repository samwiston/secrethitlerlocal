import React from 'react';
import { SocketHandler } from './components/index'
import { GameWrapper } from './views/index'

const { ipcRenderer } = window.require("electron");

function App(props) {
    const { gameState } = props;

    return (
        <div>
            <SocketHandler gameState={gameState} socket={ipcRenderer} />
            <GameWrapper gameState={gameState} />
        </div>
    );
}

export default App;
