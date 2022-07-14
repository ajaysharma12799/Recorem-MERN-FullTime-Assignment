import {LOGIN_USER, REGISTER_USER, LOAD_USER, AUTH_ERROR} from '../CONSTANTS.js'
import axios from 'axios';
import { toast } from 'react-toastify';
import SetAuthenticationToken from '../../utils/AuthenticationToken';

const API = "http://localhost:4321/api";

export const loadUser = () => async (dispatch) => {
	if (localStorage.getItem("token")) {
		SetAuthenticationToken(localStorage.getItem("token"));
	}
	try {
		const response = await axios.get(`${API}/auth`);
        console.log(response.data);
		dispatch({
			type: LOAD_USER,
			payload: response.data,
		});
	} catch (error) {
        dispatch({
            type: AUTH_ERROR
        });
        console.log(error)
	}
};

export const registerUser = (user) => async (dispatch) => {
    try {
        const response = await axios.post(`${API}/user`, JSON.stringify(user), {
            headers: {
                'Content-Type': 'application/json',
            }}
        );
        const data = response.data;
        dispatch({
            type: REGISTER_USER,
            payload: data
        })
        toast.success("Account Created Successfully");
    } catch (error) {
        dispatch({
            type: AUTH_ERROR
        });
        console.log(error.response.data.error);
        toast.error(error.response.data.error);
    }
}

export const loginUser = (user) => async (dispatch) => {
    try {
        const response = await axios.post(`${API}/auth`, JSON.stringify(user), {
            headers: {
                'Content-Type': 'application/json',
            }}
        );
        const data = response.data;
        dispatch({
            type: LOGIN_USER,
            payload: data
        })
        toast.success("Login Successfully");
    } catch (error) {
        dispatch({
            type: AUTH_ERROR
        });
        console.log(error.response.data.error);
        toast.error(error.response.data.error);
    }
}