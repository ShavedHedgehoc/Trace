import { Dispatch } from "react";

import handleError from "../../http/handleError";
import CellsContainService from "../../http/services/CellsContainService";
import { CellsContainAction, CellsContainActionTypes } from "../../types/cellsContain";


// const filterInitValue = { product_id: '', product_name: '' };

export const fetchCellsContains = (page = 0, limit = 10) => {
    return async (dispatch: Dispatch<CellsContainAction>) => {
        try {
            dispatch({ type: CellsContainActionTypes.FETCH_CELLS_CONTAIN })
            const response = await CellsContainService.get_cells_contains(page, limit)
            dispatch({
                type: CellsContainActionTypes.FETCH_CELLS_CONTAIN_SUCCESS,
                payload: response.data
            })
        } catch (error) {
            const errValue = handleError(error)
            dispatch({
                type: CellsContainActionTypes.FETCH_CELLS_CONTAIN_ERROR,
                payload: errValue
            })
        }
    }
}

export function increaseCellsContainPage(): CellsContainAction {
    return { type: CellsContainActionTypes.INCREASE_CELLS_CONTAIN_PAGE }
}

export function decreaseCellsContainPage(): CellsContainAction {
    return { type: CellsContainActionTypes.DECREASE_CELLS_CONTAIN_PAGE }
}

export function getFirstCellsContainPage(): CellsContainAction {
    return { type: CellsContainActionTypes.GET_FIRST_CELLS_CONTAIN_PAGE }
}

export function getLastCellsContainPage(): CellsContainAction {
    return { type: CellsContainActionTypes.GET_LAST_CELLS_CONTAIN_PAGE }
}

export function changeCellsContainLimit(limit = 10): CellsContainAction {
    return {
        type: CellsContainActionTypes.CHANGE_CELLS_CONTAIN_LIMIT,
        payload: limit
    }
}

export function resetCellsContainState(): CellsContainAction {
    return { type: CellsContainActionTypes.RESET_CELLS_CONTAIN_STATE }
}

