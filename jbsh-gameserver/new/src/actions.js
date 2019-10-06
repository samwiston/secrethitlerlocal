import * as types from './constants/action-types';

export function addPlayer(player, socketId) {
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