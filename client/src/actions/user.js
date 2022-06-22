import * as api from '../api';
import { AUTH } from '../constants/actionTypes';

export const login = (formData, navigate) => async (dispatch) => {
    try {
        const data = await api.login(formData);
        dispatch({type: AUTH, payload: data});
        navigate('/admin');
    } catch (error) {
        console.log(error);
    }
}