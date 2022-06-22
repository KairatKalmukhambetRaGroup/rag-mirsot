import { FETCH_CONSULTATION_REQUESTS, FETCH_VISITORS } from "../constants/actionTypes";

const adminReducers = (state = {visitors: [], consultations: []}, action) => {
    switch (action.type) {
        case FETCH_VISITORS:
            return {...state, visitors: action.payload.data};
        case FETCH_CONSULTATION_REQUESTS:
            return {...state, consultations: action.payload.data};
        default:
            return state;
    }
};
export default adminReducers;