import React from 'react';
import { UserList } from '../../components/index';

export class MainMenu extends React.Component {
    beginGame = this.beginGame.bind(this);
    beginGame() {
        console.log(Object.keys(this.props));
        const { socket, startGame } = this.props;
        const { players } = this.props.gameState;
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