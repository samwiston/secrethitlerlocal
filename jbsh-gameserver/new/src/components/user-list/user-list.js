import React from 'react';

export class UserList extends React.Component {
    componentDidMount() {
        const { socket, addPlayer } = this.props;
        console.log(socket);
        socket.on('username', function(username) {
            socket.username = username;
            console.log("bruh");
            addPlayer(username);
        });
    }

    render() {
        const { players } = this.props;
        console.log("i was rendered!");
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