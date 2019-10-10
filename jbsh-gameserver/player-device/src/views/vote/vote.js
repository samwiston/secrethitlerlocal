import React from 'react';
import ChoiceList from '../../components/choice-list/choice-list';

class Vote extends React.Component {

    render() {
        const { socket } = this.props;
        const { nomination } = this.props.gameState;
        return (
            <div>
                <h2>Voting on: {nomination}</h2>
                <ChoiceList 
                    choices={["Ja!", "Nein!"]}
                    socket={socket}
                    eventType='vote'
                />
            </div>
        )
    }
}

export default Vote;