import { GROUPID } from "../utils/setting.js";
import { baseService } from "./baseService";

export class QuanLyRapService extends baseService {
    constructor () {
        super()
    }
    getCinemaInfo = () => {
        return this.get(`/api/QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=${GROUPID}`)
    }

    // layThongTinLichChieuPhim = (maPhim) => {
    //     return this.get(`/api/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${maPhim}`)
    // }
}

export const quanLyRapService = new QuanLyRapService () 