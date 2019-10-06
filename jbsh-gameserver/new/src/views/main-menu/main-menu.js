import React from 'react';
import { UserList } from '../../components/index';

export class MainMenu extends React.Component {
    render() {
        const { socket } = this.props;
        return (
            <UserList socket={socket} />
        )
    }
}

export default MainMenu;