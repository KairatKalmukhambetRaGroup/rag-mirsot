import * as api from '../api';
import { FETCH_CONSULTATION_REQUESTS } from '../constants/actionTypes';

export const getConsultationRequests = () => async (dispatch) => {
    try {
        const data = await api.fetchConsultationRequests();
        dispatch({type: FETCH_CONSULTATION_REQUESTS, payload: data});
    } catch (error) {
        console.log(error);
    }
}