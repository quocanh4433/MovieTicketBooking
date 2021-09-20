import { quanLyRapService } from "../../services/QuanLyRapService"
import { GET_CINEMA_INFO } from "../types/QuanLyRapType.js"

export const getCinemaInfoAction = () => {
    return async (dispatch) => {
        try {
            const result = await quanLyRapService.getCinemaInfo()
            dispatch({
                type: GET_CINEMA_INFO,
                cinemaSystem: result.data.content
            })
        } catch(error) {
            console.log(error.response?.data)
        }
    }
}