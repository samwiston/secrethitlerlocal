import React from 'react';

export class Game extends React.Component {
    componentDidMount() {
        const { gameState, socket } = this.props;
        socket.send('state', gameState);
    }

    componentWillReceiveProps(nextProps) {
        
    }

    render() {
        const { players } = this.props.gameState;
        return (
            <ul>
                {
                    players.map(player => {
                        return <li key={player}>{player}</li>
                    })
                }
            </ul>
        )
    }
}

export default Game;