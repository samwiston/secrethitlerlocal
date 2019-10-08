import { connect } from 'react-redux';
import { voteOn, submitVote } from '../../actions';
import { Game } from './game';

const mapDispatchToProps = dispatch => {
    return {
        voteOn: (player) => {
            dispatch(voteOn(player));
        },
        submitVote: (socketId, ballot) => {
            dispatch(submitVote(socketId, ballot));
        }
    }
}

export default connect(
    null,
    mapDispatchToProps
)(Game);