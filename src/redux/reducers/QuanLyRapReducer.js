import { GET_CINEMA_INFO } from "../types/QuanLyRapType.js";

const stateDefault = {
    cinemaSystem: [],
}

export const QuanLyRapReducer = (state= stateDefault, action) => {
    switch(action.type) {
        case GET_CINEMA_INFO: {
            state.cinemaSystem = action.cinemaSystem;
            return {...state}
        }
        default: return {...state}
    }
}