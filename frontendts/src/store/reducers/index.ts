import {combineReducers} from 'redux';
import {boilsReducer} from './boilsReducer';
import {docCounterReducer} from './docsReducer';
import {sideMenuReducer} from './sideMenuReducer';
import {lotsReducer} from "./lotsReducer";
import {productReducer} from "./productReducer";


export const rootReducer = combineReducers({
    boils: boilsReducer,
    products: productReducer,
    lots: lotsReducer,
    docCounter: docCounterReducer,
    sideMenu: sideMenuReducer,

})

export type RootState = ReturnType<typeof rootReducer>;
