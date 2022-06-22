import * as api from '../api';
import { ADD_VISITOR, FETCH_VISITORS } from '../constants/actionTypes';

export const addVisitor = (formData) => async (dispatch) => {
    try {
        const data = await api.addVisitor(formData);
        dispatch({type: ADD_VISITOR, payload: data});
    } catch (error) {
        console.log(error);
    }
}

export const getVisitors = () => async (dispatch) => {
    try {
        const data = await api.fetchVisitors();
        dispatch({type: FETCH_VISITORS, payload: data});
    } catch (error) {
        console.log(error);
    }
}