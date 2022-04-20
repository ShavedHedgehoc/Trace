import * as BoilActionCreators from "./boil";
import * as DocCounterActionCreators from "./docCounter"
import * as SideMenuActionCreators from "./sideMenu"
import * as LotActionCreators from "./lot";
import * as ProductActionCreators from "./product";


export default {
    ...BoilActionCreators,
    ...DocCounterActionCreators,
    ...SideMenuActionCreators,
    ...ProductActionCreators,
    ...LotActionCreators,
}