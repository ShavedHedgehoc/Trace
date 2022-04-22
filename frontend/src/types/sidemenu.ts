export interface SideMenuState {
    isOpen: boolean;
}

export enum SideMenuActionTypes {
    SWITCH_MENU = "SWITCH_MENU"
}

interface SwitchMenuAction {
    type: SideMenuActionTypes.SWITCH_MENU;
}

export type SideMenuAction = SwitchMenuAction