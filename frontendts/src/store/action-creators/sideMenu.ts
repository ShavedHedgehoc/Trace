import { SideMenuAction, SideMenuActionTypes } from "../../types/sidemenu"

export function switchMenu(): SideMenuAction {
    return { type: SideMenuActionTypes.SWITCH_MENU }
}
// export function openMenu():SideMenuAction {
//     return { type: SideMenuActionTypes.OPEN_MENU }
// }

// export function closeMenu(): SideMenuAction {
//     return { type: SideMenuActionTypes.CLOSE_MENU}
// }