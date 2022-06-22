import { ADD_VISITOR, FETCH_VISITORS, LANG } from "../constants/actionTypes";

const globalReducers = (state = {lang: 'ru'}, action) => {
    switch (action.type) {
        case LANG:
            return {...state, lang: action.lang};
        case ADD_VISITOR:
            if(!!action.payload && !!action.payload.data && action.payload.status === 200){
                localStorage.setItem('visitor', JSON.stringify({...action.payload.data}));        
            }
            return state;
        case FETCH_VISITORS:
            return {...state, visitors: action.payload.data};
        default:
            return state;
    }
};
export default globalReducers;