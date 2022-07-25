import { ADD_VISITOR, LANG, REQUEST_CONSULTATION } from "../constants/actionTypes";

// http://89.219.32.45:5000/
const globalReducers = (state = {link: 'http://89.219.32.45:5000/',lang: localStorage.getItem('lang') ? localStorage.getItem('lang') : 'ru', consultation_status: null}, action) => {
    switch (action.type) {
        case LANG:
            localStorage.setItem('lang', action.lang);
            return {...state, lang: action.lang};
        case ADD_VISITOR:
            if(!!action.payload && !!action.payload.data && action.payload.status === 200){
                localStorage.setItem('visitor', JSON.stringify({...action.payload.data}));        
            }
            return state;
        case REQUEST_CONSULTATION: 
            return {...state, consultation_status: action.payload.status};
        default:
            return state;
    }
};
export default globalReducers;