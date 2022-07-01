import * as api from '../api';
import { CLEAR_PAGE, END_LOADING, FETCH_PAGE, FETCH_PAGES, FETCH_TEXTS, START_LOADING } from '../constants/actionTypes';

export const getPageByName = (name, editable = false) => async(dispatch) => {
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

export const getPages = () => async(dispatch) => {
    try {
        const data = await api.fetchPages();
        dispatch({type: FETCH_PAGES, payload: data});
    } catch (error) {
        console.log(error);
    }
}
export const getTexts = (names) => async(dispatch) => {
    try {
        const data = await api.fetchTexts(names.join(','));
        dispatch({type: FETCH_TEXTS, payload: data});
    } catch (error) {
        console.log(error);
    }
}
