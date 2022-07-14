import { CREATE_ARTICLE, GET_ALL_ARTICLE, LIKE_ARTICLE } from "../CONSTANTS";
import { toast } from 'react-toastify';
import axios from 'axios';

const API = "http://localhost:4321/api";

export const createArticle = (article) => async (dispatch) => {
    try {
        console.log(article);
        const response = await axios.post(`${API}/article`, JSON.stringify(article), {
            headers: {
                'Content-Type': 'application/json',
            }}
        );
        const data = response.data;
        dispatch({
            type: CREATE_ARTICLE,
            payload: data,
        })
        toast.success("Article Created Successfully");
    } catch (error) {
        console.log(error.response.data.error);
        toast.error(error.response.data.error);
    }
}

export const getAllArticle = () => async (dispatch) => {
    try {
        const response = await axios.get(`${API}/article`);
        const data = response.data;
        dispatch({
            type: GET_ALL_ARTICLE,
            payload: data
        })
        toast.success("Articles Fetched Successfully");
    } catch (error) {
        console.log(error.response.data.error);
        toast.error(error.response.data.error);
    }
}

export const likeArticle = (articleID) => async (dispatch) => {
    try {
        const response = await axios.put(`${API}/article/like/${articleID}`);
        const data = response.data;
        console.log(data);
        dispatch({
            type: LIKE_ARTICLE,
            payload: {id: articleID}
        })
    } catch (error) {
        console.log(error);
        console.log(error.response.data.error);
        toast.error(error.response.data.error);
    }
}