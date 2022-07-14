import { REGISTER_USER, LOGIN_USER, LOAD_USER, AUTH_ERROR } from "../CONSTANTS.js";

const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    user: null,
};

export default function(state = initialState, action) {
    const {type, payload} = action;
    switch (type) {
        case LOGIN_USER:
        case REGISTER_USER:
            console.log(payload);
            localStorage.setItem("token", payload.token)
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
            };

        case LOAD_USER:
            return {
                ...state,
                user: payload,
                isAuthenticated: true
            };

        case AUTH_ERROR:
            localStorage.removeItem("token")
            return {
                ...state,
                isAuthenticated: false,
                user: null
            }
    
        default:
            return state;
    }
}