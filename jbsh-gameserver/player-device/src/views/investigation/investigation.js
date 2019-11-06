import React from 'react';
import ChoiceList from '../../components/choice-list/choice-list';

class Investigation extends React.Component {

    render() {
        const { 
            socket, 
            playerName,
            gameState 
        } = this.props;
        const { players, investigatedAlignment } = gameState;
        if (investigatedAlignment) {
            return (
                <div>
                    <h2>The player you investigated is aligned with the {investigatedAlignment ? "Liberal" : "Fascist"} party.</h2>
                    <button onClick={(e) => socket.emit('investigation complete')}>
                        Done
                    </button>
                </div>
            )
        } else {
            return (
                <div>
                    <h2>Select a player to investigate.</h2>
                    <ChoiceList 
                        choices={players.filter(player => player !== playerName)}
                        socket={socket}
                        eventType='investigate'
                    />
                </div>
            )
        }
    }
}

export default Investigation;