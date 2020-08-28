import authReducer from './authReducer';
import searchReducer from './searchReducer';
import {createStore, combineReducers} from 'redux';

const rootReducer = combineReducers({
    user: authReducer,
    results: searchReducer
})

export default createStore(rootReducer)