import { baseService } from "./baseService";

export class QuanLyNguoiDungService extends baseService {
    constructor () {
        super()
    }

    // dangNhap = (thongTinDangNhap) => { // {taiKhoan: "", matKhau: ""}
    //     return this.post("/api/QuanLyNguoiDung/DangNhap", thongTinDangNhap)
    // }

    // dangKy = (thongTinDangKy) => { // {taiKhoan: "", matKhau: "", soDt: "", email: "", maNhom: "", hoTen: ""}
    //     return this.post("/api/QuanLyNguoiDung/DangKy", thongTinDangKy)
    // }

    // layThongtinNguoiDung = () => {
    //     return this.post("/api/QuanLyNguoiDung/ThongTinTaiKhoan")
    // }

}

export const quanLyNguoiDungService = new QuanLyNguoiDungService () 
