import React from 'react';
import io from 'socket.io-client';

const socket = io("localhost:8000");

class App extends React.Component {
    // TODO: make text input / submit component
    state = {
        data: {},
        nameInput: ""
    };

    sendUsername = this.sendUsername.bind(this);
    sendUsername(e) {
        socket.emit('username', this.state.nameInput);
        console.log(this.state.nameInput);
    }

    handleChange = this.handleChange.bind(this);
    handleChange(e) {
        this.setState({nameInput: e.target.value})
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

export default App;
