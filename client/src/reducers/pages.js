import { CLEAR_PAGE, FETCH_PAGE, FETCH_PAGES, FETCH_TEXTS, UPDATE_TEXT } from "../constants/actionTypes";

const userReducers = (state = {page: null}, action) => {
    switch (action.type) {
        case CLEAR_PAGE:
            return {...state, page: null};
        case FETCH_PAGES:
            return {...state, pages: action.payload.data};
        case FETCH_PAGE:
            return {...state, page: action.payload.data};
        case FETCH_TEXTS:
            return {...state, texts: action.payload.data};
        case UPDATE_TEXT:
            return {...state, text: action.payload.data};
        default:
            return state;
    }
};
export default userReducers;