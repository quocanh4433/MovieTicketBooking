import { DONE_BOOKING_TICKET, GET_SHOWTIME_DETIAL, SELECT_SEAT } from "../types/QuanLyDatVeType"

const stateDefault = {
    showtimeDetail: {},
    lstSeatSelecting: []

}

export const QuanLyDatVeReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case GET_SHOWTIME_DETIAL: {
            state.showtimeDetail = action.showtimeDetail;
            return { ...state }
        }

        case SELECT_SEAT: {
            let index = state.lstSeatSelecting.findIndex(seat => seat.maGhe == action.seatSelect.maGhe)
            if (index != -1) {
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

        default: return { ...state }
    }
}