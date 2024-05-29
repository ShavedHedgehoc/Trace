import * as AuthActionCreators from "./auth";
import * as BoilActionCreators from "./boil";
import * as BoilItemActionCreators from "./boilItem";
import * as DocCounterActionCreators from "./docCounter"
import * as SideMenuActionCreators from "./sideMenu"
import * as LotActionCreators from "./lot";
import * as ProductActionCreators from "./product";
import * as ProductItemActionCreators from "./productItem";
import * as ProductTmItemActionCreators from "./productTmItem";
import * as TrademarkActionCreators from "./trademark";
import * as TrademarkItemActionCreators from "./trademarkItem";
import * as LotItemActionCreators from "./lotItem";
import * as ConvergenceActionCreators from "./convergence";
import * as ConvergenceItemActionCreators from "./convergenceItem";
import * as MsgActionCreators from "./message";
import * as CellsContainActionCreators from "./cellsContain"


const ActionCreators = {
    ...AuthActionCreators,
    ...BoilActionCreators,
    ...BoilItemActionCreators,
    ...DocCounterActionCreators,
    ...SideMenuActionCreators,
    ...ProductActionCreators,
    ...ProductItemActionCreators,
    ...ProductTmItemActionCreators,
    ...LotActionCreators,
    ...TrademarkActionCreators,
    ...TrademarkItemActionCreators,
    ...LotItemActionCreators,
    ...ConvergenceActionCreators,
    ...ConvergenceItemActionCreators,
    ...MsgActionCreators,
    ...CellsContainActionCreators,
}

export default ActionCreators