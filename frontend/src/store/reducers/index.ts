import {combineReducers} from 'redux';
import {boilsReducer} from './boilsReducer';
import {docCounterReducer} from './docsReducer';
import {sideMenuReducer} from './sideMenuReducer';
import {lotsReducer} from "./lotsReducer";
import {productReducer} from "./productReducer";
import {trademarksReducer} from "./trademarksReducer";
import {lotItemReducer} from "./lotItemReducer";
import {convergenceReducer} from "./convergenceReducer";

export const rootReducer = combineReducers({
    boils: boilsReducer,
    products: productReducer,
    lots: lotsReducer,
    lotItem: lotItemReducer,
    trademarks: trademarksReducer,
    docCounter: docCounterReducer,
    sideMenu: sideMenuReducer,
    convergence:convergenceReducer,
})

export type RootState = ReturnType<typeof rootReducer>;
