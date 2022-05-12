import axios from "axios";
import {Dispatch} from "react";
import {BoilItemAction, BoilItemActionTypes} from "../../types/boilItem";

export const fetchBoilItem = (boil_id: string | undefined) => {
    return async (dispatch: Dispatch<BoilItemAction>) => {
        try {
            dispatch({type: BoilItemActionTypes.FETCH_BOIL_ITEM})
            const response = await (
                axios.get(
                    `/api/v1/boils/${boil_id}`
                ))
            dispatch({
                type: BoilItemActionTypes.FETCH_BOIL_ITEM_SUCCESS,
                payload: response.data
            })
            console.log(response.data)
        } catch (error) {
            dispatch({
                type: BoilItemActionTypes.FETCH_BOIL_ITEM_ERROR,
                payload: 'error'
            })
        }
    }
}