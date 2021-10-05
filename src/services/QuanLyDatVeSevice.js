import { baseService } from "./baseService";

export class QuanLyDatVeService extends baseService {
    constructor() {
        super()
    }

    getShowtimeDetail = (showtimeID) => {
        return this.get(`/api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${showtimeID}`)
    }

    bookingTicket = (ticketInfo) => {
        return this.post("/api/QuanLyDatVe/DatVe", ticketInfo)
    }

    createShowtime = (showtimeInfo) => {
        return this.post('/api/QuanLyDatVe/TaoLichChieu', showtimeInfo)
    }
}

export const quanLyDatVeService = new QuanLyDatVeService()
