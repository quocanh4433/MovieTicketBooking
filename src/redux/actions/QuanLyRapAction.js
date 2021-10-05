import { quanLyRapService } from "../../services/QuanLyRapService"
import { GET_CINEMA_INFO, GET_CINEMA_SHOWTIME } from "../types/QuanLyRapType.js"
export const getCinemaInfoAction = () => {
    return async (dispatch) => {
        try {
            const result = await quanLyRapService.getCinemaInfo()
            dispatch({
                type: GET_CINEMA_INFO,
                cinemaSystem: result.data.content
            })
            localStorage.setItem('CinemaSystem', JSON.stringify(result.data.content))
        } catch(error) {
            console.log("Error: ", error.response?.data)
        }
    }
}

export const getCinemaShowtimeAction = (filmID) => {
    return async (dispatch) => {
        try {
            const result = await quanLyRapService.getCinemaShowtime(filmID)
            dispatch({
                type: GET_CINEMA_SHOWTIME,
                filmDetail: result.data.content
            })
        } catch(error) {
            console.log("Error: ", error.response?.data)
        }
    }
}