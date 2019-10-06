import React from 'react';

export class UserList extends React.Component {
    componentDidMount() {
        const { 
            socket, addPlayer, 
            delPlayer, gameState 
        } = this.props;
        socket.on('username', (event, socketId, name) => {
            addPlayer(name, socketId);
            socket.send('state', gameState);
        });
        socket.on('disconnect', (event, socketId) => {
            delPlayer(socketId);
        });
    }

    render() {
        const { players } = this.props;
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