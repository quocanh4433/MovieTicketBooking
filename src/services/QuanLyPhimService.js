import { GROUPID } from "../utils/setting"
import { baseService } from "./baseService"

export class QuanLyPhimService extends baseService {
    constructor() {
        super()
    }
    getBanner = () => {
        return this.get("/api/QuanLyPhim/LayDanhSachBanner")
    }

    getAllFilmInfo = () => {
        return this.get(`/api/QuanLyPhim/LayDanhSachPhim?maNhom=${GROUPID}`)
    }

    // getListMovie = () => {
    //     return this.get(`/api/QuanLyPhim/LayDanhSachPhim?maNhom=${GROUPID}`)
    // }

    // themHinhUploadHinh = (formData) => {
    //     return this.post(`/api/QuanLyPhim/ThemPhimUploadHinh`, formData)
    // }

    
    // xoaPhim = (maPhim) => {
    //     return this.delete(`/api/QuanLyPhim/XoaPhim?MaPhim=${maPhim}`)
    // }
    // capNhatPhim = (formData) => {
    //     return this.post(`/api/QuanLyPhim/CapNhatPhimUpload`, formData)
    // }
}

export const quanLyPhimService = new QuanLyPhimService()