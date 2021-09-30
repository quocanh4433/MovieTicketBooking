import { quanLyNguoiDungService } from "../../services/QuanLyNguoiDungService"
import { ACCESS_TOKEN, http, USER_LOGIN } from "../../utils/setting";
import { history } from "../../App";
import { GET_ALL_USER, GET_USER_EDIT, LOG_IN, SIGN_UP } from "../types/QuanLyNguoiDungType";

export const getAllUserAction = () => {
    return async (dispatch) => {
        try {
            const result = await quanLyNguoiDungService.getAllUser()
            dispatch({
                type: GET_ALL_USER,
                arrAllUser: result.data.content
            })
        } catch (error) {
            console.log("Error: ", error.response?.data)
        }
    }
}

export const signupAction = (userInfo) => {
    return async (dispatch) => {
        try {
            await quanLyNguoiDungService.signup(userInfo)
            dispatch({
                type: SIGN_UP,
                userInfo,
            })
        } catch (error) {
            console.log("Error: ", error.response?.data)
        }
    }
}

export const loginAction = (userInfo) => {
    return async (dispatch) => {
        try {
            const result = await quanLyNguoiDungService.login(userInfo)
            if (result.data.statusCode === 200) {
                dispatch({
                    type: LOG_IN,
                    userInfo: result.data.content
                });
            };
            localStorage.setItem(ACCESS_TOKEN, result.data.content.accessToken);
            localStorage.setItem(USER_LOGIN, JSON.stringify(result.data.content));
            history.push("/")
        } catch (error) {
            console.log("Error: ", error.response?.data)
        }
    }
}

export const addUserAction = (userInfo) => {
    return async (dispatch) => {
        try {
            const result = await quanLyNguoiDungService.addUser(userInfo)
        } catch (error) {
            console.log("Error: ", error)
        }
    }
}

export const editUserAction = (account) => {
    return async (dispatch) => {
        try {
            const result = await quanLyNguoiDungService.editUser(account)
            dispatch({
                type: GET_USER_EDIT,
                userEdit: result.data.content
            })
        } catch (error) {
            console.log("Error: ", error)
        }
    }
}


export const updateUserAction = (account) => {
    return async (dispatch) => {
        try {
            const result = await quanLyNguoiDungService.updateUser(account)
        } catch (error) {
            console.log("Error: ", error.response?.data)
        }
    }
}


export const deleteUserAction = (account) => {
    return async (dispatch) => {
        try {
            const result = await quanLyNguoiDungService.deleteUser(account)
            dispatch(getAllUserAction())
        } catch (error) {
            console.log("Error: ", error.response?.data)
        }
    }
}




