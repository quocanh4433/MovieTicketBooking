
import {applyMiddleware, combineReducers, createStore} from 'redux'
import thunk from 'redux-thunk'
import { QuanLyPhimReducer } from './reducers/QuanLyPhimReducer';

const rootReducer = combineReducers({
    QuanLyPhimReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunk));