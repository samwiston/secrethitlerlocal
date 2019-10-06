import React from 'react';
import Idle from '../idle/idle';
import ElectPlayer from "../elect-player/elect-player";

class Game extends React.Component {

    componentDidMount() {
        let { socket } = this.props;
        // Event listeners can go here
    }
 
    render() {
        let { 
            gameState, 
            playerName,
            socket
        } = this.props;
        if (!gameState.gameInProgress) {
            return <Idle playerName={playerName} />
        } else {
            // The game has started, but the player
            // doesn't necessarily have anything to do yet
            if (gameState.president == playerName) {
                return <ElectPlayer
                    gameState={gameState}
                    socket={socket}
                />
            } else {
                return <Idle playerName={playerName} />
            }
            
        }
    }
}

export default Game;