import React from 'react';
import io from 'socket.io-client';
import { isEmpty } from './util';

import PlayernamePrompt from './components/playername-prompt/playername-prompt';
import Game from './views/game/game';

const socket = io();

class App extends React.Component {

    state = {
        playerName: "",
        gameState: {}
    }

    componentDidMount() {
        socket.on('state', (gameState) => {
            console.log("I recieved state!");
            console.log(gameState);
            if (isEmpty(this.state.gameState)) {
                // This is the first time the player recieved
                // state, so get this player's name
                this.setState({
                    playerName: gameState.lastConnected,
                    gameState
                });
            } else {
                this.setState({
                    gameState
                });
            }
        })
    }

    render() {
        let { gameState, playerName } = this.state;
        if (isEmpty(gameState)) {
            return <PlayernamePrompt 
                socket={socket}
            />;
        } else {
            return <Game 
                gameState={gameState} 
                playerName={playerName}
            />
        }
        
    }
}

export default App;
