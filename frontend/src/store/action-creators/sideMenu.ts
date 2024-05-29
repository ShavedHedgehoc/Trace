import { SideMenuAction, SideMenuActionTypes } from "../../types/sidemenu"

export function switchMenu(): SideMenuAction {
    return { type: SideMenuActionTypes.SWITCH_MENU }
}