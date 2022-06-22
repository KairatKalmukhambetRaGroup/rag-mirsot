import { CLEAR_PAGE, FETCH_PAGE } from "../constants/actionTypes";

const userReducers = (state = {page: null}, action) => {
    switch (action.type) {
        case CLEAR_PAGE:
            return {...state, page: null};
        case FETCH_PAGE:
            return {...state, page: action.payload.data};
        default:
            return state;
    }
};
export default userReducers;