import * as api from '../api';
import { CLEAR_PAGE, END_LOADING, FETCH_PAGE, START_LOADING } from '../constants/actionTypes';

export const getPageByName = (name) => async(dispatch) => {
    try {
        dispatch({type: CLEAR_PAGE});
        dispatch({type: START_LOADING});
        const data = await api.fetchPageByName(name);
        dispatch({type: FETCH_PAGE, payload: data})
        dispatch({type: END_LOADING});
    } catch (error) {
        console.log(error);
    }
}