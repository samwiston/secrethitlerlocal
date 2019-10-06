import React from 'react';

class PlayernamePrompt extends React.Component {
    // TODO: make text input / submit component
    state = {
        nameInput: ""
    };

    sendUsername = this.sendUsername.bind(this);
    sendUsername(e) {
        let { socket } = this.props;
        socket.emit('username', this.state.nameInput);
    }

    handleChange = this.handleChange.bind(this);
    handleChange(e) {
        this.setState({
            nameInput: e.target.value
        })
    }

    render() {

        return (
            <div>
                <input 
                    id="txt" 
                    autocomplete="off" 
                    autofocus="on" 
                    placeholder="type your name here..." 
                    onChange={this.handleChange}
                    />
                <button onClick={this.sendUsername}>Send</button>
            </div>
        )
    }
}

export default PlayernamePrompt;