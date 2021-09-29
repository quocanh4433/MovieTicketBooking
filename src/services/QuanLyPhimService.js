import { GROUPID } from "../utils/setting.js"
import { baseService } from "./baseService"

export class QuanLyPhimService extends baseService {
    constructor() {
        super()
    }
    getBanner = () => {
        return this.get("/api/QuanLyPhim/LayDanhSachBanner")
    }

    getAllFilmInfo = (filmName) => {
        if (filmName !== "") {
            return this.get(`/api/QuanLyPhim/LayDanhSachPhim?maNhom=${GROUPID}&tenPhim=${filmName}`)
        } 
        return this.get(`/api/QuanLyPhim/LayDanhSachPhim?maNhom=${GROUPID}`)
    }

    addFilm = (formData) => {
        return this.post(`/api/QuanLyPhim/ThemPhimUploadHinh`, formData)
    }

    editFilm = (filmID) => {
        return this.get(`/api/QuanLyPhim/LayThongTinPhim?MaPhim=${filmID}`)
    }

    updateFilm = (formData) => {
        return this.post(`/api/QuanLyPhim/CapNhatPhimUpload`, formData)
    }

    deleteFilm = (filmID) => {
        return this.delete(`/api/QuanLyPhim/XoaPhim?MaPhim=${filmID}`)
    }
}

export const quanLyPhimService = new QuanLyPhimService()