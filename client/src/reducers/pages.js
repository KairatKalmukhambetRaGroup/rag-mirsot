import { CLEAR_PAGE, FETCH_PAGE, FETCH_PAGES } from "../constants/actionTypes";

const userReducers = (state = {page: null}, action) => {
    switch (action.type) {
        case CLEAR_PAGE:
            return {...state, page: null};
        case FETCH_PAGES:
            return {...state, pages: action.payload.data};
        case FETCH_PAGE:
            return {...state, page: action.payload.data};
        default:
            return state;
    }
};
export default userReducers;