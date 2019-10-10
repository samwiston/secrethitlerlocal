import React from 'react';

export class UserList extends React.Component {
    componentDidMount() {
        const { 
            socket, addPlayer, 
            delPlayer, gameState 
        } = this.props;
        socket.on('username', (event, socketId, name) => {
            addPlayer(name, socketId, gameState.players.length);
        });
        socket.on('disconnect', (event, socketId) => {
            delPlayer(socketId);
        });
    }

    componentWillReceiveProps(nextProps) {
        const { gameState, socket } = nextProps;
        socket.send('state', gameState);
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

export default UserList;