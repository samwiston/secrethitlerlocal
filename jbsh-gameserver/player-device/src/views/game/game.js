import React from 'react';
import Idle from '../idle/idle';
import ElectPlayer from "../elect-player/elect-player";
import Vote from '../vote/vote';

class Game extends React.Component {

    componentDidMount() {
        let { socket } = this.props;
        // Event listeners can go here.

    }
 
    render() {
        let { 
            gameState, 
            playerName,
            socket
        } = this.props;
        if (!gameState.gameInProgress) {
            // Game hasn't started yet.
            return <Idle playerName={playerName} />
        } else {
            if (gameState.president === playerName
                && gameState.electing === '') {
                // I am president! Elect a chancellor.
                return <ElectPlayer
                    gameState={gameState}
                    socket={socket}
                />
            } else if (gameState.haventVoted.includes(playerName)) {
                // We're voting on a chancellor.
                return <Vote 
                    gameState={gameState}
                    socket={socket}
                />
            } else {
                // I've got nothing to do.
                return <Idle playerName={playerName} />
            }
        }
    }
}

export default Game;