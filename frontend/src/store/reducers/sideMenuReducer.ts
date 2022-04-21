import { SideMenuState, SideMenuAction, SideMenuActionTypes } from "../../types/sidemenu";

const initialState: SideMenuState = {
    isOpen: false    
}

export const sideMenuReducer = (state = initialState, action: SideMenuAction): SideMenuState => {
    switch (action.type) {
        case SideMenuActionTypes.SWITCH_MENU:{
            return {isOpen:!state.isOpen}
        }
        // case SideMenuActionTypes.OPEN_MENU: {
        //     return { isOpen: true }
        // }
        // case SideMenuActionTypes.CLOSE_MENU: {
        //     return { isOpen: false }
        // }
        default:
            return state
    }
}