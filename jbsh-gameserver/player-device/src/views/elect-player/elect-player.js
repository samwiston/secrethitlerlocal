import React from 'react';
import ChoiceList from '../../components/choice-list/choice-list';

class ElectPlayer extends React.Component {

    render() {
        const { socket } = this.props;
        const { players, nonElectable } = this.props.gameState;
        let electablePlayers = players.filter((player) => {
            return !nonElectable.includes(player);
        })
        return <div>
            <h2>Select your candidate for chancellor.</h2>
            <h2><i>Pick carefully.</i></h2>
            <ChoiceList 
                choices={electablePlayers}
                socket={socket}
                eventType='elect'
            />
        </div>
    }
}

export default ElectPlayer;