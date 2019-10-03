import React from 'react';
import io from 'socket.io-client'
let socket = io(`http://localhost:8080`)

class App extends React.Component {
    // TODO: make text input / submit component
    state = {
        data: {},
        nameInput: ""
    };

    componentDidMount() {    
        socket.on('server:event', data => {
            this.setState({ data })
        })
    }
    
    emit = (type, message) => {
        socket.emit(type, message)
    }

    sendUsername = this.sendUsername.bind(this);
    sendUsername(e) {
        this.emit('username', e.target.value);
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
