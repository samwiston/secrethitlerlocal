import React from 'react';
import Idle from '../idle/idle';
import ElectPlayer from "../elect-player/elect-player";
import Vote from '../vote/vote';
import PresidentSession from '../president-session/president-session';
import ChancellorSession from '../chancellor-session/chancellor-session';

class Game extends React.Component {

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
                && gameState.electing 
                && gameState.nomination === '') {
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
            } else if (gameState.president === playerName
                && gameState.drawnPolicies.length) {
                // I have to pick two policies to pass along.
                return <PresidentSession 
                    gameState={gameState}
                    socket={socket}
                />
            } else if (gameState.chancellor === playerName
                && gameState.selectedPolicies.length) {
                // I have to pick a final policy to discard.
                return <ChancellorSession 
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