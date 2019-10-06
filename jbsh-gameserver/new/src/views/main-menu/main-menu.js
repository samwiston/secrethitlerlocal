import React from 'react';
import { UserList } from '../../components/index';

export class MainMenu extends React.Component {
    render() {
        const { socket } = this.props;
        return (
            <div>
                <h2>Connected users:</h2>
                <UserList socket={socket} />
            </div>
        )
    }
}

export default MainMenu;