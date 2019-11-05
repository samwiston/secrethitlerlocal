import { connect } from 'react-redux';
import * as creators from '../../actions';
import { SocketHandler } from './socket-handler';

const mapDispatchToProps = dispatch => {
    return {
        addPlayer: (player, socketId) => {
            dispatch(creators.addPlayer(player, socketId));
        },
        delPlayer: (socketId) => {
            dispatch(creators.delPlayer(socketId));
        },
        voteOn: (player) => {
            dispatch(creators.voteOn(player));
        },
        submitVote: (socketId, ballot) => {
            dispatch(creators.submitVote(socketId, ballot));
        },
        presidentDiscard: (policyDeck, discarded) => {
            dispatch(creators.presidentDiscard(policyDeck, discarded));
        },
        chancellorDiscard: (policyDeck, discarded) => {
            dispatch(creators.chancellorDiscard(policyDeck, discarded));
        },
        startGame: (players) => {
            dispatch(creators.startGame(players));
        }
    }
}

export default connect(
    null,
    mapDispatchToProps
)(SocketHandler);