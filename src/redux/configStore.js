
import {applyMiddleware, combineReducers, createStore} from 'redux'
import thunk from 'redux-thunk'
import { QuanLyPhimReducer } from './reducers/QuanLyPhimReducer';
import { QuanLyNguoiDungReducer } from './reducers/QuanLyNguoiDungReducer';
import { QuanLyDatVeReducer } from './reducers/QuanLyDatVeReducer';
import { QuanLyRapReducer } from './reducers/QuanLyRapReducer';

const rootReducer = combineReducers({
    QuanLyPhimReducer,
    QuanLyNguoiDungReducer,
    QuanLyDatVeReducer,
    QuanLyRapReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk));