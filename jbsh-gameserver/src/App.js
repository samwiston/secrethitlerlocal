import React from 'react';
import MainMenu from './views/main-menu/main-menu';

const { ipcRenderer } = window.require("electron");

class App extends React.Component {

    render() {
        return (
            <div className="App">
                <MainMenu socket={ipcRenderer}/>
            </div>
        );
    }
}

export default App;
