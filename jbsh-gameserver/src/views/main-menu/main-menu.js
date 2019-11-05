import React from 'react';
import { UserList } from '../../components/index';

export class MainMenu extends React.Component {
    beginGame = this.beginGame.bind(this);
    beginGame() {
        const { startGame } = this.props;
        const { players } = this.props.gameState;

        // We need to pass players in at this point
        // because we'll be making random mutations
        // to form the teams.
        startGame(players);
    }

    render() {
        const { socket, gameState } = this.props;
        return (
            <div>
                <h2>Connected users:</h2>
                <UserList socket={socket} gameState={gameState} />
                <button 
                    onClick={this.beginGame} 
                    disabled={gameState.tooFewPlayers}
                >
                    Begin Game
                </button>
            </div>
        )
    }
}

export default MainMenu;