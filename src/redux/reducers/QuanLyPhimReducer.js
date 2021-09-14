import { GET_ALL_FILM_INFO, GET_BANNER } from "../types/QuanLyPhimType"

const stateDefault = {

    /** Array for only banner */
    arrBanner: [
        // {
        //     "maBanner": 1,
        //     "maPhim": 1282,
        //     "hinhAnh": "http://movieapi.cyberlearn.vn/hinhanh/ban-tay-diet-quy.png"
        // },
    ],

    arrAllFilmInfo: []
}

export const QuanLyPhimReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case GET_BANNER: {
            state.arrBanner = action.arrBanner;
            return {...state}
        }
        case GET_ALL_FILM_INFO: {
            state.arrAllFilmInfo = action.arrAllFilmInfo
            return {...state}
        }
        default: return { ...state }
    }
}