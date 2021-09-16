import { USER_LOGIN } from "../../utils/setting";
import { LOG_IN } from "../types/QuanLyNguoiDungType"

/** Check user logged  */
let userLogged = null;
if (localStorage.getItem(USER_LOGIN)) {
    userLogged = JSON.parse(localStorage.getItem(USER_LOGIN))
}

const stateDefault = {
    userLogin: userLogged,
}

export const QuanLyNguoiDungReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case LOG_IN: {
            state.userLogin = action.userInfo;
            return { ...state }
        }

        default: return { ...state }
    }
}