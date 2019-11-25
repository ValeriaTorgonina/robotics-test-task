import { combineReducers } from 'redux' 
import { mainReducer, mainState } from '../modules/main/state/reducers'

export const initialState = {
    main: mainState 
};

export const RootReducer = combineReducers({
    main: mainReducer
});