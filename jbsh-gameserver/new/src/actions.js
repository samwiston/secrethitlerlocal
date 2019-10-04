import { PLAYER_CONNECTED } from './constants/action-types';

export function addPlayer(player) {
    return {
        type: PLAYER_CONNECTED,
        player
    }
}