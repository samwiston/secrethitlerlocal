import { connect } from 'react-redux';
import { addPlayer, delPlayer } from '../../actions';
import { UserList } from './user-list';

const mapStateToProps = state => {
    return {
        players: state.players,
        gameState: state
    }
}

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
    mapStateToProps,
    mapDispatchToProps
)(UserList);