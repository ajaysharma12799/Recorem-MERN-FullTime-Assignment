import { CREATE_ARTICLE, GET_ALL_ARTICLE, LIKE_ARTICLE } from "../CONSTANTS";

const initialState = {
    articles: [],
}


export default function(state = initialState, action) {
    const {type, payload} = action;
    switch (type) {
        case CREATE_ARTICLE:
            console.log(payload);
            return {
                ...state,
                ...payload,
            };
        
        case GET_ALL_ARTICLE: 
            return {
                ...state,
                articles: payload,
            };
        
        case LIKE_ARTICLE: 
        console.log(payload);
            return {
                ...state,
                articles: state.articles.map((article) => article._id === payload.id ? {...article, likes: payload.likes} : article)
            };
            
        default:
            return state;
    }
}