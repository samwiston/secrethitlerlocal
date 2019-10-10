import React from 'react';
import ChoiceList from '../../components/choice-list/choice-list';

class ChancellorSession extends React.Component {

    render() {
        const { socket } = this.props;
        const { selectedPolicies } = this.props.gameState;
        return (
            <div>
                <h2>Select a policy to discard.</h2>
                {/* TODO: Make custom component for displaying policy choices */}
                <ChoiceList 
                    choices={
                        selectedPolicies.map(policy => {
                            return policy ? "Liberal" : "Fascist"
                        })
                    }
                    socket={socket}
                    eventType='play policy'
                />
            </div>
        )
    }
}

export default ChancellorSession;