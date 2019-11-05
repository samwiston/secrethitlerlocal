import React from 'react';

/* 
    This class is a renderless component which handles action dispatch
    upon recieving a socket event. I decided that it made more sense for
    all of the action dispatching and event handling to happen in one place,
    than be scattered among the components in whatever fashion seemed most
    appropriate.
*/
export class SocketHandler extends React.Component {
    componentDidMount() {
        const { 
            // Action creators
            addPlayer, 
            delPlayer,
            voteOn,
            submitVote,
            presidentDiscard,
            chancellorDiscard
        } = this.props;

        const { socket } = this.props;

        // Event handling
        socket.on('username', (event, socketId, name) => {
            addPlayer(name, socketId);
        });

        socket.on('disconnect', (event, socketId) => {
            delPlayer(socketId);
        });

        socket.on('elect', (event, socketId, player) => {
            voteOn(player);
        })

        socket.on('vote', (event, socketId, ballot) => {
            // TODO: generalize the ChoiceList comeponent further
            // so that this logic doesn't need to exist
            submitVote(socketId, ballot === "Ja!");
        })

        socket.on('select policy', (event, socketId, discarded) => {
            console.log("The president discarded a " + discarded);
            // TODO: generalize the ChoiceList comeponent further
            // so that this logic doesn't need to exist
            presidentDiscard(discarded === "Liberal");
        })

        socket.on('play policy', (event, socketId, discarded) => {
            // TODO: generalize the ChoiceList comeponent further
            // so that this logic doesn't need to exist
            console.log("The chancellor discarded a " + discarded);
            chancellorDiscard(discarded === "Liberal");
        })
    }

    componentWillReceiveProps(nextProps) {
        // Automatically distribute the state object to all connected 
        // clients when the store changes
        const { gameState, socket } = nextProps;
        socket.send('state', gameState);
    }

    render() { return null; }
}

export default SocketHandler;