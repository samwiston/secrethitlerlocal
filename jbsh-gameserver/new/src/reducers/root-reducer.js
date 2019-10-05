import { PLAYER_CONNECTED } from "../constants/action-types";

const initialState = {
    view: "mainmenu", // String, game or mainmenu
    // Player designations will be assigned just before the 
    // GAME_START action is dispatched. The GAME_START action 
    // creator will randomly pick who is who, and call an 
    // ASSIGN_PLAYERS action with the player roles as data.

    players: [], // String[]

    hitler: "", // String,
    liberals: "", // String[],
    fascists: "", // String[],
    killed: "", // String[], Appended to after KILL_PLAYER is dispatched.
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

    president: "", // String
    chancellor: "", // String
    activePower: "", // String

    // status holds info about what socket communications we can expect
    // to recieve. thus, we can wait until a specific comm happens
    status: "" // String
}

export default function rootReducer(state = initialState, action) {
    switch (action.type) {
        case PLAYER_CONNECTED:
            return {
                ...state,
                players: [
                    ...state.players,
                    action.player
                ]
            }
        default:
            return state;
    }
}