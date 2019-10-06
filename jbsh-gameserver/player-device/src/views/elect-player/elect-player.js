import React from 'react';
import ChoiceList from '../../components/choice-list/choice-list';

class ElectPlayer extends React.Component {

    render() {
        const { players, nonElectable, socket } = this.props.gameState;
        let electablePlayers = players.filter((player) => {
            return !nonElectable.includes(player);
        })
        return <ChoiceList 
            choices={electablePlayers}
            socket={socket}
            eventType='elect'
        />
    }
}

export default ElectPlayer;