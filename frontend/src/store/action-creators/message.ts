import { Dispatch } from 'react';
import { MsgActions, MsgActionTypes } from '../reducers/messageReducer';

export const clearMessage = () => {
    return (dispatch: Dispatch<MsgActions>) => {
        dispatch({ type: MsgActionTypes.CLEAR_MESSAGE })
    }
}