import React from 'react';
import { MainMenu } from './components/index';
import Game from './views/game/game'

const { ipcRenderer } = window.require("electron");

class App extends React.Component {

    render() {
        const { gameState } = this.props;
        if (gameState.view === 'mainmenu') {
            return (
                <MainMenu 
                    socket={ipcRenderer}
                    gameState={gameState}
                />
            );
        } else {
            return (
                <Game 
                    socket={ipcRenderer}
                    gameState={gameState}
                />
            );
        }
        
    }
}

export default App;
