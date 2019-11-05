import React from 'react';

// TODO: make this a functional component?
// however: if this needs to hold its own 
// state later, it should stay as a class
export class Game extends React.Component {
    render() {
        const { 
            players, 
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