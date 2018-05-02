import { combineReducers } from 'redux';

// Reducers
import { CountdownReducer } from './CountdownReducer';

export const AppReducer = combineReducers({
    countdown: CountdownReducer
});