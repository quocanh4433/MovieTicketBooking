import { connection } from "../.."
import { quanLyDatVeService } from "../../services/QuanLyDatVeSevice"
import { CLEAR_SEAT_OVERTIME, DONE_BOOKING_TICKET, GET_LST_SEAT_REALTIME, GET_SHOWTIME_DETIAL, SELECT_SEAT } from "../types/QuanLyDatVeType"
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

export const bookingTicketAction = (bookingTicketInfo) => {
    return async (dispatch, getState) => {
        try {
            dispatch(displayLoadingAction)
            await quanLyDatVeService.bookingTicket(bookingTicketInfo)
            await dispatch(getShowtimeDetailAction(bookingTicketInfo.maLichChieu))
            await dispatch({
                type: DONE_BOOKING_TICKET
            })

            dispatch(hideLoadingAction)

            /** 
                Send notification to Back-end is done booking ticket 
                After that, Back-end will notice all client is the seat is booked successful
            **/
            let userLogin = getState().QuanLyNguoiDungReducer.userLogin
            connection.invoke('datGheThanhCong', userLogin.taiKhoan, bookingTicketInfo.maLichChieu)

        } catch (error) {
            dispatch(hideLoadingAction)
            console.log("Error:", error)

        }
    }
}

export const selectSeatRealtimeAction = (seat, showtimeID) => {

    return async (dispatch, getState) => {
        try {

            /** Post lstSelecting to QuanLyDatVeReducer */
            await dispatch({
                type: SELECT_SEAT,
                seatSelect: seat,
            })

            /** Call API to Back-end */
            let lstSearSelecting = getState().QuanLyDatVeReducer.lstSeatSelecting;
            let account = getState().QuanLyNguoiDungReducer.userLogin.taiKhoan
            lstSearSelecting = JSON.stringify(lstSearSelecting)
            let intShowtimeID  = parseInt(showtimeID)

            /** Call API to SignalR */
            connection.invoke('datGhe',account,lstSearSelecting, intShowtimeID);

        } catch (error) {
            console.log("Error:", error.response.data)
        }
    }
}

export const selectSeatRestUserAction = (arrSeatRealtime) => {
    return {
        type: GET_LST_SEAT_REALTIME,
        arrSeatRealtime,
    }
}

export const clearSeatOvertimeAction = () => {
    return {
        type: CLEAR_SEAT_OVERTIME
    }
}