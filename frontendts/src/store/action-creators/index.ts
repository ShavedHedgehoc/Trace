import * as BoilActionCreators from "./boil";
import * as DocCounterActionCreators from "./docCounter"
import * as SideMenuActionCreators from "./sideMenu"


export default {
    ...BoilActionCreators,
    ...DocCounterActionCreators,
    ...SideMenuActionCreators,
}