import { connect } from 'react-redux';
import { voteOn, submitVote, drawPolicies, presidentDiscard, chancellorDiscard } from '../../actions';
import { Game } from './game';

const mapDispatchToProps = dispatch => {
    return {
        voteOn: (player) => {
            dispatch(voteOn(player));
        },
        submitVote: (socketId, ballot) => {
            dispatch(submitVote(socketId, ballot));
        },
        drawPolicies: (policyDeck) => {
            dispatch(drawPolicies(policyDeck));
        },
        presidentDiscard: (policyDeck, discarded) => {
            dispatch(presidentDiscard(policyDeck, discarded));
        },
        chancellorDiscard: (policyDeck, discarded) => {
            dispatch(chancellorDiscard(policyDeck, discarded));
        }
    }
}

export default connect(
    null,
    mapDispatchToProps
)(Game);