import * as types from '../constants/action-types';
import { delFrom } from '../constants/util';

const initialState = {
    view: 'mainmenu', // String, game or mainmenu
    // Player designations will be assigned just before the 
    // GAME_START action is dispatched. The GAME_START action 
    // creator will randomly pick who is who, and call an 
    // ASSIGN_PLAYERS action with the player roles as data.

    gameInProgress: false,

    players: [], // String[]
    socketMap: new Map(),
    dcedPlayers: [],
    pausePopup: false,

    hitler: '', // String,
    liberals: [], // String[],
    fascists: [], // String[],
    killed: [], // String[], Appended to after KILL_PLAYER is dispatched.
    // POLICY_DRAW will contain the three top cards from the draw pile 
    // in its data property. This action will generally be dispatched 
    // at the beginning of every turn, perhaps after an ADVANCE_TURN 
    // action is dispatched (only if the new president has no powers 
    // to resolve! otherwise, that happens first.)
    drawnPolicies: null, // Policy[3] or null,
    selectedPolicies: null, // Policy[2] or null,
    playedPolicies: {
        fascist: 0,
        liberal: 0,
    },
    nonElectable: [],
    playerOverflow: [],

    lastConnected: '',

    president: '', // String
    chancellor: '', // String
    activePower: '', // String

    noMorePlayers: false,
    tooFewPlayers: true,
    minPlayers: 2,
    maxPlayers: 10,

    // status holds info about what socket communications we can expect
    // to recieve. thus, we can wait until a specific comm happens
    status: '' // String
}

export default function rootReducer(state = initialState, action) {
    switch (action.type) {

        case types.PLAYER_CONNECTED:
            let rcPlayer, rawName, playerName;
            rawName = playerName = action.playerName;
            let dupCounter = 2;
            while (state.players.includes(playerName)) {
                // Duplicate player name!
                playerName = rawName + ' ' + dupCounter;
                dupCounter += 1;
            }
            // Did someone reconnect, or new connection?
            if (state.dcedPlayers.includes(playerName)) {
                // Right now this does the same thing as otherwise,
                // but will likely be changed 
                rcPlayer = playerName;
                console.log(playerName + ' has reconnected.');
            }
            state.socketMap.set(action.socketId, playerName);
            return {
                ...state,
                players: [
                    ...state.players,
                    playerName
                ],
                dcedPlayers: rcPlayer ? delFrom(state.dcedPlayers, rcPlayer) : state.dcedPlayers,
                tooFewPlayers: state.players.length + 1 < state.minPlayers,
                lastConnected: playerName
            }

        case types.PLAYER_DISCONNECTED:
            let dcPlayer;
            if (state.socketMap.has(action.socketId)) {
                // Get playername based on the socket ID that dced
                dcPlayer = state.socketMap.get(action.socketId);
                state.socketMap.delete(action.socketId);
            }
            console.log(dcPlayer + ' has disconnected.');
            return {
                ...state,
                players: delFrom(state.players, dcPlayer),
                dcedPlayers: [
                    ...state.dcedPlayers,
                    dcPlayer
                ],
                tooFewPlayers: state.players.length - 1 < state.minPlayers,
                noMorePlayers: state.players.length - 1 > state.maxPlayers
            }
        
        case types.START_GAME:
            let { 
                liberals, 
                fascists, 
                hitler 
            } = action
            return {
                ...state,
                view: 'game',
                gameInProgress: true,
                president: state.players[0],
                nonElectable: [state.players[0]],
                liberals,
                fascists,
                hitler
            }
        
        case types.TOO_MANY_PLAYERS:
            return {
                ...state,
                playerOverflow: [...state.playerOverflow, action.playerName],
                noMorePlayers: true
            }
        
        case types.NOT_ENOUGH_PLAYERS:
                return {
                    ...state,
                    playerOverflow: [...state.playerOverflow, action.playerName]
                }

        default:
            return state;
    }
}