import { GROUPID } from "../utils/setting.js";
import { baseService } from "./baseService";

export class QuanLyRapService extends baseService {
    constructor () {
        super()
    }
    getCinemaInfo = () => {
        return this.get(`/api/QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=${GROUPID}`)
    }

    getCinemaShowtime = (filmID) => {
        return this.get(`/api/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${filmID}`)
    }
}

export const quanLyRapService = new QuanLyRapService () 