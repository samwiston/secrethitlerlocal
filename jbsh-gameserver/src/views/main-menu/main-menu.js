import React from 'react';
import { UserList } from '../../components/index';

export class MainMenu extends React.Component {
    beginGame = this.beginGame.bind(this);
    beginGame() {
        const { socket } = this.props;
        // TODO: create beginGame action creator
        // call it here, implement in root reducer
    }

    render() {
        const { socket } = this.props;
        return (
            <div>
                <h2>Connected users:</h2>
                <UserList socket={socket} />
                <button onClick={this.beginGame}>Begin Game</button>
            </div>
        )
    }
}

export default MainMenu;