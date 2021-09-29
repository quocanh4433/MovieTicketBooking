import { quanLyPhimService } from "../../services/QuanLyPhimService"
import http, { GROUPID } from "../../utils/setting"
import { GET_ALL_FILM_INFO, GET_BANNER, GET_FILM_INFO_EDIT } from "../types/QuanLyPhimType"

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

export const addFilmAction = (formData) => {
    return async (dispatch) => {
        try {
            const result = await quanLyPhimService.addFilm(formData)
           
        } catch (error) {
            console.log(error.response?.data)
        }
    }
}

export const editFilmAction = (filmID) => {
    return async (dispatch) => {
        try {
            const result = await quanLyPhimService.editFilm(filmID)
            dispatch({
                type: GET_FILM_INFO_EDIT,
                filmInfoEdit: result.data.content
            })
        } catch (error) {
            console.log(error.response?.data)
        }
    }
}

export const updateFilmAction = (formData) => {
    return async (dispatch) => {
        try {
            const result = await quanLyPhimService.updateFilm(formData)
            alert("Cập nhật phim thành công")
        } catch (error) {
            console.log(error)
        }
    }
}

export const deleteFilmAction = (filmID) => {
    return async (dispatch) => {
        try {
            await quanLyPhimService.deleteFilm(filmID)
            dispatch(getAllFilmInfoAction())
        } catch (error) {
            console.log(error)
        }
    }
}

