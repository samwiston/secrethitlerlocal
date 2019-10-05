import React from 'react';

export class UserList extends React.Component {
    componentDidMount() {
        const { socket, addPlayer } = this.props;
        socket.on('username', (event, arg) => {
            console.log("bruh");
            addPlayer(arg);
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