import {LOGIN,LOGOUT,SET_TOKEN} from '../actions/authenticationActions';

const authenticationReducer = (state = { currentUser: undefined, isLoggedIn: false, token: undefined }, action) => {
    switch (action.type) {
        case LOGIN: {
            return { ...state, isLoggedIn: true, currentUser: action.payload.currentUser };
        }

        case LOGOUT: {
            return { ...state, isLoggedIn: false, currentUser: undefined, token: undefined };
        }

        case SET_TOKEN: { 
            return { ...state, token: action.payload.token };
        }

        default: {
            return state;
        }
    }
}


export default authenticationReducer;