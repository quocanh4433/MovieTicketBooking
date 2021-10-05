import { USER_LOGIN } from "../../utils/setting";
import { ADD_COMMENT, COUNT_LIKE, GET_ALL_USER, GET_USER_EDIT, LOG_IN } from "../types/QuanLyNguoiDungType"
import _ from 'lodash'

/** Check user logged  */
let userLogged = null;
if (localStorage.getItem(USER_LOGIN)) {
    userLogged = JSON.parse(localStorage.getItem(USER_LOGIN))
}

const stateDefault = {
    userLogin: userLogged,
    lstUserComment: [
        {
            id: 1,
            name: "Như",
            like: 5,
            score: 4.5,
            comment: "Bộ phim có chất lượng hành động tốt, cảnh quay đẹp.",
            avatar: "https://i.pravatar.cc?u=nam",
            day: "2021-8-3"
        },

        {
            id: 2,
            name: "Nam",
            like: 7,
            score: 3,
            comment: "Bộ phim có chất lượng hành động tốt, cảnh quay đẹp.",
            avatar: "https://i.pravatar.cc?u=hoang",
            day: "2021-8-6"
        },

        {
            id: 3,
            name: "Phong",
            like: 12,
            score: 2,
            comment: "Bộ phim có chất lượng hành động tốt, cảnh quay đẹp.",
            avatar: "https://i.pravatar.cc?u=an",
            day: "2021-8-9"
        },

        {
            id: 4,
            name: "hoàng",
            like: 45,
            score: 3,
            comment: "Bộ phim có chất lượng hành động tốt, cảnh quay đẹp.",
            avatar: "https://i.pravatar.cc?u=dinh",
            day: "2021-20-8"
        },
        {
            id: 5,
            name: "Linh",
            like: 23,
            score: 4,
            comment: "Bộ phim có chất lượng hành động tốt, cảnh quay đẹp.",
            avatar: "https://i.pravatar.cc?u=thoai",
            day: "2021-8-23"
        },
        {
            id: 6,
            name: "Vinh",
            like: 27,
            score: 2.5,
            comment: "Bộ phim có chất lượng hành động tốt, cảnh quay đẹp.",
            avatar: "https://i.pravatar.cc?u=nha",
            day: "2021-26-8"
        },
        {
            id: 6,
            name: "Sang",
            like: 23,
            score: 4,
            comment: "Bộ phim có chất lượng hành động tốt, cảnh quay đẹp.",
            avatar: "https://i.pravatar.cc?u=bich",
            day: "2021-9-1"
        },
        {
            id: 7,
            name: "Hùng",
            like: 12,
            score: 2,
            comment: "Bộ phim có chất lượng hành động tốt, cảnh quay đẹp.",
            avatar: "https://i.pravatar.cc?u=trung",
            day: "2021-9-2"
        },
        {
            id: 8,
            name: "Phước",
            like: 3,
            score: 4.5,
            comment: "Bộ phim có chất lượng hành động tốt, cảnh quay đẹp.",
            avatar: "https://i.pravatar.cc?u=phuoc",
            day: "2021-9-18"
        },
        {
            id: 9,
            name: "Đức",
            like: 3,
            score: 3,
            comment: "Bộ phim có chất lượng hành động tốt, cảnh quay đẹp.",
            avatar: "https://i.pravatar.cc?u=duc",
            day: "2021-9-19"
        },

    ],
    arrAllUser: [],
    userEdit: {}
}

export const QuanLyNguoiDungReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case LOG_IN: {
            state.userLogin = action.userInfo;
            return { ...state }
        } break;

        case COUNT_LIKE: {
            let index = _.findIndex(state.lstUserComment, user => user.id === action.id)
            state.lstUserComment[index].like += 1 
            return {...state}
        } break;

        case ADD_COMMENT: {
            state.lstUserComment = [...state.lstUserComment, action.userComment]
            return {...state}
        } break;

        case GET_ALL_USER: {
            state.arrAllUser = action.arrAllUser
            return {...state}
        } break;

        case GET_USER_EDIT: {
            state.userEdit = action.userEdit
            return {...state}
        } break;

        default: return { ...state }
    }
}