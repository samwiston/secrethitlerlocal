import React from 'react';

export class Game extends React.Component {
    componentDidMount() {
        const { 
            gameState, 
            socket,
            voteOn,
            submitVote
        } = this.props;
        socket.on('elect', (event, socketId, player) => {
            voteOn(player);
            console.log(player);
        })
        socket.on('vote', (event, socketId, ballot) => {
            submitVote(socketId, ballot === "Ja!" ? 1 : 0);
        })
        socket.send('state', gameState);
    }

    componentWillReceiveProps(nextProps) {
        const { gameState, socket } = nextProps;
        socket.send('state', gameState);
    }

    render() {
        const { players, electing } = this.props.gameState;
        return (
            <div>
                <ul>
                    {
                        players.map(player => {
                            return <li key={player}>{player}</li>
                        })
                    }
                </ul>
                <h2 hidden={electing === '' ? 'hidden' : 'visible' }>
                    Chancellor up for election: {electing}
                </h2>
            </div>
        )
    }
}

export default Game;