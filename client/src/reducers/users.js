import { AUTH } from "../constants/actionTypes";

const userReducers = (state = {authData: null}, action) => {
    switch (action.type) {
        case AUTH:
            if(!!action.payload && !!action.payload.data && action.payload.status === 200){
                localStorage.setItem('profile', JSON.stringify({...action.payload.data}));        
                return { ...state, authData: action.payload?.data, status: action.payload.status};
            }
            return {...state, authData: null, status: action.payload?.status};
        default:
            return state;
    }
};
export default userReducers;