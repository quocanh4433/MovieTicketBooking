import { quanLyNguoiDungService } from "../../services/QuanLyNguoiDungService"
import { ACCESS_TOKEN, http, USER_LOGIN } from "../../utils/setting";
import { history } from "../../App";
import { GET_ALL_USER, GET_USER_EDIT, LOG_IN, SIGN_UP } from "../types/QuanLyNguoiDungType";
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

export const getAllUserAction = (keyword = '') => {
    return async (dispatch) => {
        try {
            const result = await quanLyNguoiDungService.getAllUser(keyword)
            dispatch({
                type: GET_ALL_USER,
                arrAllUser: result.data.content
            })
        } catch (error) {
            console.log("Error: ", error)
        }
    }
}

export const signupAction = (userInfo) => {
    return async (dispatch) => {
        try {
            const result = await quanLyNguoiDungService.signup(userInfo)
            dispatch({
                type: SIGN_UP,
                userInfo: result.data.content
            })
            history.push("/")
        } catch (error) {
            message.error(error.response?.data.content);
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
            message.error(error.response?.data.content);
            console.log("Error: ", error.response?.data)
        }
    }
}

export const addUserAction = (userInfo) => {
    return async (dispatch) => {
        try {
            const result = await quanLyNguoiDungService.addUser(userInfo)
            success('Ti???n h??nh th??m ng?????i d??ng', 'Th??m ng?????i d??ng ho??n t???t')
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
            localStorage.setItem(USER_LOGIN, JSON.stringify(result.data.content))
            success('Ti???n h??nh c???p nh???t th??ng tin', 'C???p nh???t th??ng tin ho??n t???t')
        } catch (error) {
            console.log("Error: ", error)
        }
    }
}

export const updateUserNotAdminAction = (account) => {
    return async (dispatch) => {
        try {
            const result = await quanLyNguoiDungService.updateUserNotAdmin(account)
            localStorage.setItem(USER_LOGIN, JSON.stringify({...result.data.content, matKhau: null}))
            success('Ti???n h??nh c???p nh???t th??ng tin', 'C???p nh???t th??ng tin ho??n t???t')
        } catch (error) {
            console.log("Error: ", error)
        }
    }
}

export const deleteUserAction = (account) => {
    console.log(account)
    return async (dispatch) => {
        try {
            const result = await quanLyNguoiDungService.deleteUser(account)
            success('Ti???n h??nh x??a ng?????i d??ng', 'X??a ng?????i d??ng ho??n t???t')
            dispatch(getAllUserAction())
        } catch (error) {
            console.log("Error: ", error)
            success('Ti???n h??nh x??a ng?????i d??ng', error.response?.data.content)
        }
    }
}




