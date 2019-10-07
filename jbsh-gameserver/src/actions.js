import * as types from './constants/action-types';
import { sample, teamDistribution } from './constants/util';

export function addPlayer(player, numPlayers, socketId) {
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
    // Uncomment below when not debugging
    // if (players.length < 5) return {type: types.NOT_ENOUGH_PLAYERS}
    let fascists = sample(players, teamDistribution[players.length][1]);
    let hitler = sample(fascists)[0];
    // Filter out fascists from players to get liberals
    let liberals = [...players].filter((player) => {
        return !fascists.includes(player);
    })
    return {
        type: types.START_GAME,
        fascists,
        liberals, 
        hitler
    }
}