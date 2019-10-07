import React from 'react';

class PlayernamePrompt extends React.Component {

    render() {
        return (
            <div>
                <input 
                    id="txt" 
                    autocomplete="off" 
                    autofocus="on" 
                    placeholder="type your name here..." 
                    onChange={this.props.handleChange}
                    />
                <button onClick={this.props.handleSubmit}>Send</button>
            </div>
        )
    }
}

export default PlayernamePrompt;