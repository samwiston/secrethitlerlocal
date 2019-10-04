import { connect } from 'react-redux';
import { addPlayer } from '../../actions';
import { UserList } from './user-list';

const mapStateToProps = state => {
    return {
        players: state.players
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addPlayer: player => {
            dispatch(addPlayer(player));
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserList);