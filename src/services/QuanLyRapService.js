import { GROUPID } from "../util/settings/config";
import { baseService } from "./baseService";

export class QuanLyRapService extends baseService {
    constructor () {
        super()
    }
    // layThongTinHeThongRap = () => {
    //     return this.get(`/api/QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=${GROUPID}`)
    // }

    // layThongTinLichChieuPhim = (maPhim) => {
    //     return this.get(`/api/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${maPhim}`)
    // }
}

export const quanLyRapService = new QuanLyRapService () 