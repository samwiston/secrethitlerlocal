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
            this.setState({
                gameState
            })
        })
    }

    setName = this.setName.bind(this);
    setName(name) {
        this.setState({
            playerName: name
        })
    }

    render() {
        let { gameState, playerName } = this.state;
        if (isEmpty(gameState)) {
            return <PlayernamePrompt 
                socket={socket}
                onNameSubmit={this.setName}
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
