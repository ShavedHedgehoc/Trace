import { combineReducers } from 'redux';
import { boilsReducer } from './boilsReducer';
import { docCounterReducer } from './docsReducer';
import { sideMenuReducer } from './sideMenuReducer';


export const rootReducer = combineReducers({
    boils: boilsReducer,
    docCounter: docCounterReducer,
    sideMenu:sideMenuReducer,
})

export type RootState = ReturnType<typeof rootReducer>;
