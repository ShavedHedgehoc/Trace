import { createStore, combineReducers, applyMiddleware } from "redux";
import {cashReducer} from "./cashReducer";
import {customerReducer} from "./customerReducer";
import { boilSearchReducer } from "./boilsSearchReducer";
import { boilsFormDataReducer } from "./boilsFormDataReducer";
import { boilsDataReducer } from "./boilsDataReducer";

import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";

const rootReducer= combineReducers({
    cash: cashReducer,
    customers: customerReducer,
    boilSearch: boilSearchReducer,
    boilsFormData: boilsFormDataReducer,
    boilsData:boilsDataReducer
})

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));