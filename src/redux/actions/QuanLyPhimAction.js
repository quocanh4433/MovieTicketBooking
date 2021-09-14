import { quanLyPhimService } from "../../services/QuanLyPhimService"
import { GET_ALL_FILM_INFO, GET_BANNER } from "../types/QuanLyPhimType"

export const getBannerAction =  () => {
    return async (dispatch) => {
        try {
            const result = await quanLyPhimService.getBanner()
            dispatch({
                type: GET_BANNER,
                arrBanner: result.data.content,
            })
        } catch(error) {
            console.log("Error: ", error.response?.data)
        }
    }
} 

export const getAllFilmInfoAction =  () => {
    return async (dispatch) => {
        try {
            const result = await quanLyPhimService.getAllFilmInfo()
            dispatch({
                type: GET_ALL_FILM_INFO,
                arrAllFilmInfo: result.data.content,
            })
        } catch(error) {
            console.log("Error: ", error.response?.data)
        }
    }
} 
