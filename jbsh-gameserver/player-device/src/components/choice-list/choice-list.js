import React from 'react';

class ChoiceList extends React.Component {
    handleChoice = this.handleChoice.bind(this);
    handleChoice(e) {
        let { socket, eventType } = this.props;
        socket.emit(eventType, e.target.value);
    }

    render() {
        const { choices } = this.props;
        return (
            <div>
                {
                    choices.map((choice) => {
                        <button onClick={this.handleChoice} value={choice} />
                    })
                }
            </div>
        )
    }
}

export default ChoiceList;