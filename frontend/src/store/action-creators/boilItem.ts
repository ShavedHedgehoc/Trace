import {Dispatch} from "react";
import handleError from "../../http/handleError";
import BoilService from "../../http/services/BoilServise";
import {BoilItemAction, BoilItemActionTypes} from "../../types/boilItem";

export const fetchBoilItem = (boil_id: string | undefined) => {
    return async (dispatch: Dispatch<BoilItemAction>) => {
        try {
            dispatch({type: BoilItemActionTypes.FETCH_BOIL_ITEM})
            const response = await BoilService.get_boil_item(Number(boil_id))            
            dispatch({
                type: BoilItemActionTypes.FETCH_BOIL_ITEM_SUCCESS,
                payload: response.data
            })
            console.log(response.data)
        } catch (error) {
            const errValue = handleError(error)
            dispatch({
                type: BoilItemActionTypes.FETCH_BOIL_ITEM_ERROR,
                payload: errValue
            })
        }
    }
}