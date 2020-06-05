import {combineReducers } from 'redux';
import basketReducer from './basketReducer';
import enjoyReducer from './enjoyReducer'

export default combineReducers({
    basketState: basketReducer,
    enjoyState: enjoyReducer
})