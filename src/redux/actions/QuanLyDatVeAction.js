import { quanLyDatVeService } from "../../services/QuanLyDatVeSevice"
import { GET_SHOWTIME_DETIAL } from "../types/QuanLyDatVeType"

export const getShowtimeDetailAction = (showtimeID) => {
    return async (dispatch) => {
        try {
            const result = await quanLyDatVeService.getShowtimeDetail(showtimeID)
            if (result.data.statusCode === 200) {
                dispatch({
                    type: GET_SHOWTIME_DETIAL,
                    showtimeDetail: result.data.content
                })
            }
        } catch (error) {
            console.log("Error:", error.response.data)
        }
    }
}

export const bookingTicketAction = (ticketInfo) => {
    return async (dispatch, getState) => {
        try {
            // // Hiển thị loading khi đợi API
            // dispatch(displayLoadingAction)
            const result = await quanLyDatVeService.bookingTicket(ticketInfo)
            console.log({result})

            // Đặt vé thành công load lại trang
            // await dispatch(layLichChieuAction(thongTinDatVe.maLichChieu))
            // await dispatch({
            //     type: DAT_VE_HOAN_TAT
            // })
            // // Ẩn loading cho dù gọi API không thành công
            // dispatch(hideLoadingAction)

            // Gọi lên tín hiệu đặt vé thành công để BE hiểu vé đã đặt thành công. 
            // Sau đó gưi tín hiểu đến các client khác cùng biết là ghế đó đã đặt và khong thể chọn được nửa
            // let userLogin = getState().QuanLyNguoiDungReducer.userLogin
            // connection.invoke('datGheThanhCong', userLogin.taiKhoan, thongTinDatVe.maLichChieu)


            // await dispatch({
            //     type: CHUYEN_TABS
            // })

        } catch (error) {
            // Ẩn loading cho dù gọi API bị lỗi 
            // dispatch(hideLoadingAction)
            console.log({error})

        }
    }

}