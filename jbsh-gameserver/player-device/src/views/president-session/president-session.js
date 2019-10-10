import React from 'react';
import ChoiceList from '../../components/choice-list/choice-list';

class PresidentSession extends React.Component {

    render() {
        const { socket } = this.props;
        const { drawnPolicies } = this.props.gameState;
        return (
            <div>
                <h2>Select a policy to discard.</h2>
                {/* TODO: Make custom component for displaying policy choices */}
                <ChoiceList 
                    choices={
                        drawnPolicies.map(policy => {
                            return policy ? "Liberal" : "Fascist"
                        })
                    }
                    socket={socket}
                    eventType='select policy'
                />
            </div>
        )
    }
}

export default PresidentSession;