import { GROUPID } from "../utils/setting.js";
import { baseService } from "./baseService";

export class QuanLyRapService extends baseService {
    constructor() {
        super()
    }
    getCinemaInfo = () => {
        return this.get(`/api/QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=${GROUPID}`)
    }

    getCinemaShowtime = (filmID) => {
        return this.get(`/api/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${filmID}`)
    }

    /** Use for create showtime */
    getTheaterSystem = () => {
        return this.get(`/api/QuanLyRap/LayThongTinHeThongRap`)
    }

    getTheaterCluster = (theaterSystemID) => {
        return this.get(`/api/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${theaterSystemID}`)
    }
}

export const quanLyRapService = new QuanLyRapService()