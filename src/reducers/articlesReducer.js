import {
    CREATE_ARTICLE,
    GET_ALL_ARTICLE,
    TIMELINE,
    DELETE_ARTICLE ,
    
} 
from '../actions/articles';
import { notification } from 'antd';
import articleService from '../services/article';



const articlesReducer = (state = {articles:[],currentPage:0 , totalPages :0}, action) => {

    switch (action.type) {
        case GET_ALL_ARTICLE:
            state.articles = [] ; 
            state.articles.concat(action.data) ; 
            return state 
        case TIMELINE:
            state.totalPages = action.data?.totalPages ; 
            state.currentPage = action.data?.currentPage ; 
            if(state.currentPage <= state.totalPages){
                state.articles =  state.articles.concat(action.data?.articles) ; 
            }
            return state
        case CREATE_ARTICLE:
            return state.articles.concat({ ...action.data })
        case DELETE_ARTICLE:
            return state.articles.filter((article)=>{
                return article.id !== action.data ; 
            })
        default:
            return state
    }
}

export const getAllArticles = () => {
    return async (dispatch) => {
        try {
            const response = await articleService.getAllArticles();
            dispatch({ type: GET_ALL_ARTICLE, data: response })

        }
        catch (error) {
            notification.error({
                message: "Couldn't load all articles check your connection"
            })
        }
    }
}

export const Timeline = (page, limit) => {
    return async (dispatch) => {
        try {
            const response = await articleService.timeline(page, limit);
            dispatch({ type: TIMELINE, data: response });
        }
        catch (error) {
            notification.error({
                message: "Couldn't load all articles check your connection"
            })
        }
    }
}


export const create_article = (Article) => {
    return async (dispatch) => {
        try {
            const response = await articleService.create_article(Article)

            dispatch({ type: CREATE_ARTICLE, data: response })
            notification.success({
                message: 'Added article successfully'
            })
        }
        catch (error) {
            console.log(error)
            notification.error({
                message: "Couldn't load Article check your connection"
            })
        }
    }
}


export const deleteArticle = (id) => {
    return async (dispatch) => {
        try {
            dispatch({type:DELETE_ARTICLE , data :id}) ; 

           await articleService.deleteArticle(id);
            notification.success({
                message: 'Deleted article successfully'
            })


        }
        catch (error) {
            notification.error({
                message: "Couldn't Delete this Article"
            })
            console.log(error)
        }
    }
}


                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            




export default articlesReducer;

