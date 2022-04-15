import { combineReducers } from 'redux';
import { boilsReducer } from './boilsReducer';

export const rootReducer = combineReducers({
    boils: boilsReducer,
})

export type RootState = ReturnType<typeof rootReducer>;
