import React from 'react';

export class UserList extends React.Component {
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

export default UserList;