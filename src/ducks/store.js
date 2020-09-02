import authReducer from './authReducer';
import holdReducer from './holdReducer';
import {createStore, combineReducers} from 'redux';

const rootReducer = combineReducers({
    authReducer,
    holdReducer
})

export default createStore(rootReducer)