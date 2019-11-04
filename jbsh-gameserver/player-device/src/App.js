import React from 'react';
import io from 'socket.io-client';
import { isEmpty } from './util';

import PlayernamePrompt from './components/playername-prompt/playername-prompt';
import Game from './views/game/game';

const socket = io();

class App extends React.Component {

    state = {
        playerName: "",
        nameInput: "",
        submitted: false,
        gameState: {},
    }

    sendUsername = this.sendUsername.bind(this);
    sendUsername(e) {
        this.setState({
            submitted: true
        });
        socket.emit('username', this.state.nameInput);
    }

    handleChange = this.handleChange.bind(this);
    handleChange(e) {
        this.setState({
            nameInput: e.target.value
        })
    }

    componentDidMount() {
        socket.on('state', (gameState) => {
            console.log(gameState);
            if (this.state.submitted) {
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
            }
        })
    }

    render() {
        let { gameState, playerName } = this.state;
        if (isEmpty(gameState)) {
            // Haven't recieved state yet, so no attempt to
            // connect has been made.
            return <PlayernamePrompt 
                socket={socket} 
                handleSubmit={this.sendUsername}
                handleChange={this.handleChange}
            />
        } else if (gameState.playerOverflow.includes(playerName)) {
            // This player can't connect because the game is full.
            return <div>
                <h4 style='color:red'>This game is full!</h4>
            </div>
        } else {
            return <Game 
                socket={socket}
                gameState={gameState} 
                playerName={playerName}
            />
        }
        
    }
}

export default App;
