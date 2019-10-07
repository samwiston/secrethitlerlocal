import { connect } from 'react-redux';
import { addPlayer, delPlayer } from '../../actions';
import { UserList } from './user-list';

const mapDispatchToProps = dispatch => {
    return {
        addPlayer: (player, socketId) => {
            dispatch(addPlayer(player, socketId));
        },
        delPlayer: (socketId) => {
            dispatch(delPlayer(socketId));
        }
    }
}

export default connect(
    null,
    mapDispatchToProps
)(UserList);