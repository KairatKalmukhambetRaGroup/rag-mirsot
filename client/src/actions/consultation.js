import * as api from '../api';
import { FETCH_CONSULTATION_REQUESTS, REQUEST_CONSULTATION } from '../constants/actionTypes';

export const getConsultationRequests = () => async (dispatch) => {
    try {
        const data = await api.fetchConsultationRequests();
        dispatch({type: FETCH_CONSULTATION_REQUESTS, payload: data});
    } catch (error) {
        console.log(error);
    }
}
export const requestConsultation = (formData) => async (dispatch) => {
    try {
        const data = await api.requestConsultation(formData);
        dispatch({type: REQUEST_CONSULTATION, payload: data});
    } catch (error) {
        console.log(error);
    }
}