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

    getAllUser = () => {
        return this.get(`/api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${GROUPID}`)
    }

    addUser = (userInfo) => {
        return this.post("/api/QuanLyNguoiDung/ThemNguoiDung", userInfo)
    }  

}

export const quanLyNguoiDungService = new QuanLyNguoiDungService () 
