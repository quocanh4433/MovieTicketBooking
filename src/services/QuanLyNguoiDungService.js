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

    // layThongtinNguoiDung = () => {
    //     return this.post("/api/QuanLyNguoiDung/ThongTinTaiKhoan")
    // }

}

export const quanLyNguoiDungService = new QuanLyNguoiDungService () 
