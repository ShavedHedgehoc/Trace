export interface SideMenuState {
    isOpen: boolean;    
}

export enum SideMenuActionTypes {
    SWITCH_MENU="SWITCH_MENU"
    // OPEN_MENU = "OPEN_MENU",
    // CLOSE_MENU = "CLOSE_MENU"
}

interface SwitchMenuAction{
    type:SideMenuActionTypes.SWITCH_MENU;
}

// interface OpenSideMenuAction {
//     type: SideMenuActionTypes.OPEN_MENU;
// }

// interface CloseSideMenuAction {
//     type: SideMenuActionTypes.CLOSE_MENU;
// }

export type SideMenuAction =  SwitchMenuAction//OpenSideMenuAction | CloseSideMenuAction