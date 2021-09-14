import { ThongTiDatVe } from "../_core/modle/ThongTinDatVe";
import { baseService } from "./baseService";

export class QuanLyDatVeService extends baseService {
    constructor () {
        super()
    }

    // layThongTinLichChieu = (maLichChieu) => {
    //     return this.get(`/api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${maLichChieu}`)
    // }

    // datVe = (thongTinDatVe = new ThongTiDatVe()) => {
    //     return this.post("/api/QuanLyDatVe/DatVe", thongTinDatVe)
    // }

}

export const quanLyDatVeService = new QuanLyDatVeService () 
