import { combineReducers } from 'redux' 
import { mainReducer, mainState } from '../modules/main/state/reducers'

export const initialState = {
    mainReducer: mainState 
};

export const RootReducer = combineReducers({
    mainReducer: mainReducer
});