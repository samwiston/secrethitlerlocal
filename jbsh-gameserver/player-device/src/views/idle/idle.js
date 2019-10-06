import React from 'react';

class Idle extends React.Component {

    render() {
        let { playerName } = this.props;
        return (
            <div>
                <h2>This is the idle screen. Your name is {playerName}.</h2>
            </div>
        )
    }
}

export default Idle;