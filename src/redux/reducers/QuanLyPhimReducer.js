import { GET_ALL_FILM_INFO, GET_BANNER, GET_FILM_COMINGSOON, GET_FILM_INFO_EDIT, GET_FILM_NOWSHOWING } from "../types/QuanLyPhimType"
import { GET_CINEMA_SHOWTIME } from "../types/QuanLyRapType.js";

const stateDefault = {
    arrBanner: [
        // {
        //     "maBanner": 1,
        //     "maPhim": 1282,
        //     "hinhAnh": "http://movieapi.cyberlearn.vn/hinhanh/ban-tay-diet-quy.png"
        // },
    ],
    arrAllFilmInfo: [],
    arrFilmConfig: [],
    nowShowing: true,
    comingSoon: false,
    filmDetail: {},
    filmInfoEdit: {},

}

export const QuanLyPhimReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case GET_BANNER: {
            state.arrBanner = action.arrBanner;
            return {...state}
        }
        case GET_ALL_FILM_INFO: {
            /**
            Push value into two array arrAllFilmInfo & arrFilmConfig
            - arrAllFilmInfo get all values in API
            - arrFilmConfig also get all values in API, after that, sort by condition is "nowShowing" & "comingSoon"
             */
            state.arrAllFilmInfo = action.arrAllFilmInfo
            state.arrFilmConfig = action.arrAllFilmInfo
            return {...state}
        }

        case GET_FILM_NOWSHOWING: {
            state.arrAllFilmInfo = state.arrFilmConfig.filter(film => film.dangChieu);
            state.nowShowing = true;
            state.comingSoon = false;
            return {...state}
        }

        case GET_FILM_COMINGSOON: {
            state.arrAllFilmInfo = state.arrFilmConfig.filter(film => film.sapChieu);
            state.nowShowing = false;
            state.comingSoon = true;
            return {...state}
        }

        case GET_CINEMA_SHOWTIME: {
            state.filmDetail = action.filmDetail
            return {...state}
        }

        case GET_FILM_INFO_EDIT: {
            state.filmInfoEdit = action.filmInfoEdit
            return {...state}
        }
        default: return { ...state }
    }
}