import * as types from './constants/action-types';
import { 
    sample, shuffle, 
    teamDistribution, 
    policyDistribution
} from './constants/util';

export function addPlayer(player, socketId, numPlayers) {
    if (numPlayers >= 10) {
        // No more room!
        return {
            type: types.TOO_MANY_PLAYERS,
            playerName: player
        }
    }
    return {
        type: types.PLAYER_CONNECTED,
        socketId,
        playerName: player
    }
}

export function delPlayer(socketId) {
    return {
        type: types.PLAYER_DISCONNECTED,
        socketId
    }
}

export function startGame(players) {
    let fascists = sample(players, teamDistribution[players.length][1]);
    let hitler = sample(fascists)[0];
    // Filter out fascists from players to get liberals
    let liberals = [...players].filter((player) => {
        return !fascists.includes(player);
    })
    let policyDeck = shuffle(policyDistribution);
    return {
        type: types.START_GAME,
        fascists,
        liberals, 
        hitler,
        policyDeck
    }
}

export function voteOn(player) {
    return {
        type: types.VOTE_ON_PLAYER,
        player
    }
}

export function submitVote(socketId, ballot) {
    return {
        type: types.VOTE_RECIEVED,
        socketId,
        ballot
    }
}

export function presidentDiscard(discarded) {
    return {
        type: types.POLICIES_PASSED,
        discarded
    }
}

export function chancellorDiscard(discarded) {
    return {
        type: types.POLICY_PLAYED,
        discarded
    }
}