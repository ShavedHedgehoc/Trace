export interface msgState {
    message: string | null
}

const defaultState: msgState = {
    message: null
}

export enum MsgActionTypes {
    SET_MESAGE = "SET_MESAGE",
    CLEAR_MESSAGE = "CLEAR_MESSAGE"
}

interface MsgSetAction {
    type: MsgActionTypes.SET_MESAGE,
    payload: string
}

interface MsgClearAction {
    type: MsgActionTypes.CLEAR_MESSAGE
}

export type MsgActions = MsgSetAction | MsgClearAction

export const msgReducer = (state = defaultState, action: MsgActions): msgState => {
    switch (action.type) {
        case MsgActionTypes.SET_MESAGE:
            return { ...state, message: action.payload }
        case MsgActionTypes.CLEAR_MESSAGE:
            return defaultState
        default:
            return state
    }
}