import { quanLyDatVeService } from "../../services/QuanLyDatVeSevice"
import { DONE_BOOKING_TICKET, GET_SHOWTIME_DETIAL } from "../types/QuanLyDatVeType"
import { displayLoadingAction, hideLoadingAction } from "./LoadingAction"

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
            // Hiển thị loading khi đợi API
            dispatch(displayLoadingAction)
            const result = await quanLyDatVeService.bookingTicket(ticketInfo)

            // Đặt vé thành công load lại trang
            await dispatch(getShowtimeDetailAction(ticketInfo.maLichChieu))

            await dispatch({
                type: DONE_BOOKING_TICKET
            })
            // Ẩn loading cho dù gọi API không thành công
            dispatch(hideLoadingAction)

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