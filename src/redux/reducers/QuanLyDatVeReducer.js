import { CLEAR_SEAT_OVERTIME, DONE_BOOKING_TICKET, GET_LST_SEAT_REALTIME, GET_SHOWTIME_DETIAL, SELECT_SEAT } from "../types/QuanLyDatVeType"

const stateDefault = {
    showtimeDetail: {},
    lstSeatSelecting: [],
    lstSeatSelectRealTime: []

}

export const QuanLyDatVeReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case GET_SHOWTIME_DETIAL: {
            state.showtimeDetail = action.showtimeDetail;
            return { ...state }
        }

        case SELECT_SEAT: {
            let index = state.lstSeatSelecting.findIndex(seat => seat.maGhe === action.seatSelect.maGhe)
            if (index !== -1) {
                state.lstSeatSelecting = state.lstSeatSelecting.filter(seat => seat.maGhe !== action.seatSelect.maGhe)
            } else {
                state.lstSeatSelecting.push(action.seatSelect)
            }
            return { ...state }
        }

        case DONE_BOOKING_TICKET: {
            state.lstSeatSelecting = []
            return {...state}
        }

        case GET_LST_SEAT_REALTIME: {
            state.lstSeatSelectRealTime = action.arrSeatRealtime
            return {...state}
        }

        case CLEAR_SEAT_OVERTIME: {
            state.lstSeatSelecting = [];
            return {...state}
        }

        default: return { ...state }
    }
}