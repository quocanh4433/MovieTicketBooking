
import {applyMiddleware, combineReducers, createStore} from 'redux'
import thunk from 'redux-thunk'
import { QuanLyPhimReducer } from './reducers/QuanLyPhimReducer';
import { QuanLyNguoiDungReducer } from './reducers/QuanLyNguoiDungReducer';
import { QuanLyDatVeReducer } from './reducers/QuanLyDatVeReducer';
import { QuanLyRapReducer } from './reducers/QuanLyRapReducer';
import { LoadingReducer } from './reducers/LoadingReducer';

const rootReducer = combineReducers({
    QuanLyPhimReducer,
    QuanLyNguoiDungReducer,
    QuanLyDatVeReducer,
    QuanLyRapReducer,
    LoadingReducer

})

export const store = createStore(rootReducer, applyMiddleware(thunk));