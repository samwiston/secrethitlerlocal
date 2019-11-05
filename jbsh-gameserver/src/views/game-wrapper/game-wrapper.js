import React from 'react';
import { MainMenu, Game } from '../index';

function GameWrapper(props) {
    const { gameState } = props;
    if (gameState.mainMenu) {
        return <MainMenu gameState={gameState} />
    } else {
        return <Game gameState={gameState} />
    }
}

export default GameWrapper;