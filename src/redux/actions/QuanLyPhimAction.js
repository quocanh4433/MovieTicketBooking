import { quanLyPhimService } from "../../services/QuanLyPhimService";
import { GET_ALL_FILM_INFO, GET_BANNER, GET_FILM_INFO_EDIT } from "../types/QuanLyPhimType";
import { message } from 'antd';

/** For Message */
const success = (content, contentDone) => {
    message
        .loading({
            content: content,
        }, 2.5)
        .then(() => message.success({
            content: contentDone,
        }, 2.5))
}


export const getBannerAction = () => {
    return async (dispatch) => {

        try {
            const result = await quanLyPhimService.getBanner()
            dispatch({
                type: GET_BANNER,
                arrBanner: result.data.content,
            })
        } catch (error) {
            console.log("Error: ", error.response?.data)
        }
    }
}
export const getAllFilmInfoAction = (filmName = "") => {
    return async (dispatch) => {
        try {
            const result = await quanLyPhimService.getAllFilmInfo(filmName)
            dispatch({
                type: GET_ALL_FILM_INFO,
                arrAllFilmInfo: result.data.content,
            })
        } catch (error) {
            console.log("Error: ", error.response?.data)
        }
    }
}

export const addFilmAction = (formData) => {
    return async (dispatch) => {
        try {
            const result = await quanLyPhimService.addFilm(formData)
            success('Tiến hành thêm phim', 'Thêm phim hoàn tất')
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
            success('Tiến hành cập nhật phim', 'Cập nhật phim hoàn tất')
        } catch (error) {
            console.log('Error: ', error)
        }
    }
}

export const deleteFilmAction = (filmID) => {
    return async (dispatch) => {
        try {
            await quanLyPhimService.deleteFilm(filmID)
            dispatch(getAllFilmInfoAction())
            success('Tiến hành xóa phim', 'Xóa phim hoàn tất')
        } catch (error) {
            console.log(error)
        }
    }
}


