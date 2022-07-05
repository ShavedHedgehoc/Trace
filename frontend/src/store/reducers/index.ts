import {combineReducers} from 'redux';
import {boilsReducer} from './boilsReducer';
import {boilItemReducer} from './boilItemReducer';
import {docCounterReducer} from './docsReducer';
import {sideMenuReducer} from './sideMenuReducer';
import {lotsReducer} from "./lotsReducer";
import {productReducer} from "./productReducer";
import {productItemReducer} from "./productItemReducer";
import {productTmItemReducer} from "./productTmItemReducer";
import {trademarksReducer} from "./trademarksReducer";
import {lotItemReducer} from "./lotItemReducer";
import {convergenceReducer} from "./convergenceReducer";
import {convergenceItemReducer} from "./convergenceItemReducer";
import {trademarkItemReducer} from "./trademarkItemReducer";
import { authReducer } from './authReducer';
import { msgReducer } from './messageReducer';

export const rootReducer = combineReducers({
    auth: authReducer,
    msg: msgReducer,
    boils: boilsReducer,
    boilItem: boilItemReducer,
    products: productReducer,
    productItem: productItemReducer,
    productTmItem: productTmItemReducer,
    lots: lotsReducer,
    lotItem: lotItemReducer,
    trademarks: trademarksReducer,
    trademarkItem: trademarkItemReducer,
    docCounter: docCounterReducer,
    sideMenu: sideMenuReducer,
    convergence: convergenceReducer,
    convergenceItem: convergenceItemReducer,
})

export type RootState = ReturnType<typeof rootReducer>;
