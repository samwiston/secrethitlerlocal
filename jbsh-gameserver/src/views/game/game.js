import React from 'react';

export class Game extends React.Component {
    componentDidMount() {
        const { 
            socket,
            voteOn,
            submitVote,
            presidentDiscard,
            chancellorDiscard,
            gameState // Initial game state, never changes!
        } = this.props;
        socket.on('elect', (event, socketId, player) => {
            voteOn(player);
        })
        socket.on('vote', (event, socketId, ballot) => {
            submitVote(socketId, ballot === "Ja!");
        })
        socket.on('select policy', (event, socketId, discarded) => {
            console.log("The president discarded a " + discarded);
            presidentDiscard(discarded === "Liberal");
        })
        socket.on('play policy', (event, socketId, discarded) => {
            console.log("The chancellor discarded a " + discarded);
            chancellorDiscard(discarded === "Liberal");
        })
        socket.send('state', gameState);
    }

    componentWillReceiveProps(nextProps) {
        const { gameState, socket } = nextProps;
        socket.send('state', gameState);
    }

    render() {
        const { players, 
            nomination,
            playedPolicies,
            president,
            chancellor
        } = this.props.gameState;
        return (
            <div>
                <ul>
                    {
                        players.map(player => {
                            return <li key={player}>{player}</li>
                        })
                    }
                </ul>
                <div>President: {president}</div>
                <div>Chancellor: {chancellor}</div>
                <div>
                    The board: 
                    <div>Liberal: {playedPolicies.liberal}</div>
                    <div>Fascist: {playedPolicies.fascist}</div>
                </div>
                {
                    nomination !== '' &&
                    <h2>Chancellor up for election: {nomination}</h2>
                }
            </div>
        )
    }
}

export default Game;