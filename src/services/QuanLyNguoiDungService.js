import { GROUPID } from "../utils/setting";
import { baseService } from "./baseService";

export class QuanLyNguoiDungService extends baseService {
    constructor () {
        super()
    }

    login = (userInfo) => { // {taiKhoan: "", matKhau: ""}
        return this.post("/api/QuanLyNguoiDung/DangNhap", userInfo)
    }

    signup = (userInfo) => { // {taiKhoan: "", matKhau: "", soDt: "", email: "", maNhom: "", hoTen: ""}
        return this.post("/api/QuanLyNguoiDung/DangKy", userInfo)
    }

    getAllUser = (keyword) => {
        if(keyword !== '') {
            return this.get(`/api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${GROUPID}&tuKhoa=${keyword}`)
        }
        return this.get(`/api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${GROUPID}`)
    }

    addUser = (userInfo) => {
        return this.post("/api/QuanLyNguoiDung/ThemNguoiDung", userInfo)
    }  

    editUser = (account) => {
        return this.post(`/api/QuanLyNguoiDung/LayThongTinNguoiDung?taiKhoan=${account}`)
    }  

    updateUser = (account) => {
        return this.post(`/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung`, account)
    }

    updateUserNotAdmin = (account) => {
        return this.put(`/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung`, account)
    }


    deleteUser = (account) => {
        return this.delete(`/api/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${account}`)
    }

    getUserDetail = (account) => {
        return this.post(`/api/QuanLyNguoiDung/ThongTinTaiKhoan`, account)
    }
}

export const quanLyNguoiDungService = new QuanLyNguoiDungService () 
