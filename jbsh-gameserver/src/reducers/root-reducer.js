import * as types from '../constants/action-types';
import { delFrom, delOneFrom } from '../constants/util';

const initialState = {
    view: 'mainmenu', 
    gameInProgress: false,

    players: [], // String[]
    socketMap: new Map(),
    dcedPlayers: [],
    gamePaused: false,

    hitler: '', // String,
    liberals: [], // String[],
    fascists: [], // String[],
    killed: [], 

    policyDeck: [],
    drawPolicies: false,
    drawnPolicies: [], 
    selectedPolicies: [],
    playedPolicies: {
        fascist: 0,
        liberal: 0,
    },
    nonElectable: [],
    playerOverflow: [],
    presIndex: 0,

    lastConnected: '',

    president: '', // String
    chancellor: '', // String
    activePower: '', // String

    noMorePlayers: false,
    tooFewPlayers: true,
    minPlayers: 2,
    maxPlayers: 4,

    nomination: '',
    haventVoted: [],
    yesVotes: 0,
    anarchyCounter: 0,

    // State flags
    electing: true,
    legislating: false
}

export default function rootReducer(state = initialState, action) {

    if (state.gamePaused 
        && (action.type !== types.PLAYER_CONNECTED 
        ||  action.type !== types.PLAYER_DISCONNECTED)
    ) { 
        return state;
    }

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
            // Store socket id for future player lookup
            state.socketMap.set(action.socketId, playerName);
            let returnObj = {
                ...state,
                dcedPlayers: rcPlayer ? delFrom(state.dcedPlayers, rcPlayer) : state.dcedPlayers,
                tooFewPlayers: state.players.length + 1 < state.minPlayers,
                noMorePlayers: state.players.length + 1 >= state.maxPlayers,
                lastConnected: playerName
            }
            if (state.noMorePlayers) {
                return {
                    ...returnObj,
                    playerOverflow: [
                        ...state.playerOverflow,
                        playerName
                    ]
                }
            }
            return {
                ...returnObj,
                players: [
                    ...state.players,
                    playerName
                ]
            }

        case types.PLAYER_DISCONNECTED:
            if (state.socketMap.has(action.socketId)) {
                // Get playername based on the socket ID that dced
                let dcPlayer = state.socketMap.get(action.socketId);
                state.socketMap.delete(action.socketId);
                console.log(dcPlayer + ' has disconnected.');
                returnObj = {
                    ...state,
                    dcedPlayers: [
                        ...state.dcedPlayers,
                        dcPlayer
                    ],
                    
                }
                if (state.playerOverflow.includes(dcPlayer)) {
                    return {
                        ...returnObj,
                        playerOverflow: delFrom(state.playerOverflow, dcPlayer),
                        noMorePlayers: state.players.length >= state.maxPlayers,
                        tooFewPlayers: state.players.length < state.minPlayers
                    }
                } else {
                    return {
                        ...returnObj,
                        players: delFrom(state.players, dcPlayer),
                        noMorePlayers: state.players.length - 1 >= state.maxPlayers,
                        tooFewPlayers: state.players.length - 1 < state.minPlayers
                    }
                }
            } else {
                console.log("Old socket connection has closed.")
                return state;
            }
        
        case types.START_GAME:
            let { 
                liberals, 
                fascists, 
                hitler,
                policyDeck
            } = action
            return {
                ...state,
                view: 'game',
                gameInProgress: true,
                president: state.players[0],
                nonElectable: [state.players[0]],
                electing: true,
                liberals,
                fascists,
                hitler,
                policyDeck
            }
        
        case types.TOO_MANY_PLAYERS:
            return {
                ...state,
                playerOverflow: [...state.playerOverflow, action.playerName],
                noMorePlayers: true
            }

        case types.VOTE_ON_PLAYER:
            return {
                ...state,
                nomination: action.player,
                haventVoted: [...state.players],
                yesVotes: 0
            }
        
        case types.VOTE_RECIEVED:
            // TODO: keep map of who voted what for displaying
            // TODO: implement winning the game!
            let voter = state.socketMap.get(action.socketId);
            let lastVote = state.haventVoted.length - 1 === 0;
            let chancellorElected = lastVote && (state.yesVotes + action.ballot > state.players.length / 2);
            let failedElection = lastVote && !chancellorElected;
            let loopToFirstPres = state.presIndex === state.players.length - 1;
            // if the election fails, move to the next president.
            // if not, prepare for legislation.
            console.log(voter + " has voted " + (action.ballot ? "yes." : "no."));
            if (failedElection) {
                console.log("The players were unable to elect " + state.nomination);
                return {
                    ...state,
                    nomination: '',
                    haventVoted: [],
                    yesVotes: 0,
                    chancellor: '',
                    nonElectable: [
                        // This may need to change in the future.
                        loopToFirstPres ? state.players[0] : state.players[state.presIndex + 1],
                    ],
                    anarchyCounter: state.anarchyCounter + 1,
                    president: loopToFirstPres ? state.players[0] : state.players[state.presIndex + 1],
                    presIndex: loopToFirstPres ? 0 : state.presIndex + 1
                }
            } else if (chancellorElected) {
                let drawn = state.policyDeck.splice(0, 3);
                return {
                    ...state,
                    nomination: '',
                    electing: false,
                    legislating: true,
                    haventVoted: [],
                    yesVotes: 0,
                    chancellor: state.nomination,
                    anarchyCounter: 0,
                    drawnPolicies: drawn
                }
            } else {
                // Just a normal vote
                return {
                    ...state,
                    haventVoted: delFrom(state.haventVoted, voter),
                    yesVotes: state.yesVotes + action.ballot,
                }
            }

        case types.POLICIES_PASSED:
            let selected = delOneFrom(state.drawnPolicies, action.discarded);
            return {
                ...state,
                drawnPolicies: [],
                selectedPolicies: selected
            }

        case types.POLICY_PLAYED:
            // TODO: implement winning the game!
            // TODO: powers should be a thing
            let policy = delOneFrom(state.selectedPolicies, action.discarded)[0];
            console.log(policy ? "Liberal was played." : "Fascist was played.")
            let loop = state.presIndex === state.players.length - 1;
            let playedPolicies;
            if (policy) {
                // Liberal was played
                playedPolicies = {
                    ...state.playedPolicies,
                    liberal: state.playedPolicies.liberal + 1
                }
            } else {
                // Fascist was played
                playedPolicies = {
                    ...state.playedPolicies,
                    fascist: state.playedPolicies.fascist + 1
                }
            }
            return {
                ...state,
                playedPolicies,
                selectedPolicies: [],
                nonElectable: [
                    // This may need to change in the future.
                    loop ? state.players[0] : state.players[state.presIndex + 1], 
                    state.president,
                    state.chancellor
                ],
                president: loop ? state.players[0] : state.players[state.presIndex + 1],
                presIndex: loop ? 0 : state.presIndex + 1,
                legislating: false,
                electing: true,
                chancellor: ''
            }

        default:
            return state;
    }
}