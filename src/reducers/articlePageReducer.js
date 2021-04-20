import { notification } from 'antd';
import articleService from '../services/article';
import { GET_ONE_ARTICLE } from '../actions/articlePage';


const articlePage = (state = [], action) => {
    switch (action.type) {
        case GET_ONE_ARTICLE:
            return action.data

        default:
            return state
    }
}



export const getArticleData = (id) => {
    return async (dispatch) => {
        try {

            const myarticle = await articleService.getThisArticle(id);
            const likedBy = await articleService.getlikedBy(id);
            const isfollow = await articleService.isfollow(id);
            const isbooked = await articleService.isBooked(id);
            const comments = await articleService.getComments(id);
            const response = { myarticle, likedBy, isfollow, isbooked, comments };

            dispatch({ type: GET_ONE_ARTICLE, data: response });
            notification.success({
                message: 'get article data successfully'
            })
        } catch (e) {
            notification.error({
                message: 'faild get data of article'
            })
        }
    }
}


export const likeArticle = (id) => {
    return async () => {
        try {
            await articleService.likeArticle(id);

            notification.success({
                message: 'like Article successfully'
            })
        } catch (e) {
            notification.error({
                message: 'faild to like Article'
            })
        }
    }
}


export const unlikeArticle = (id) => {
    return async () => {
        try {
            await articleService.UnlikeArticle(id);

            notification.success({
                message: 'Unlike Article successfully'
            })
        } catch (e) {
            notification.error({
                message: 'faild to unlike Article'
            })
            console.log(e);
        }
    }
}


export const BookMark = (id) => {
    return async () => {
        try {
            await articleService.BookMark(id);
            notification.success({
                message: 'booked Article successfully'
            })
        } catch (e) {
            notification.error({
                message: 'failed to book Article'
            })
        }
    }
}


export const unBookMark = (id) => {
    return async () => {
        try {
            await articleService.unBookMark(id);
            notification.success({
                message: 'unbooked Article successfully'
            })
        } catch (e) {
            notification.error({
                message: 'failed to unbook Article'
            })
        }
    }
}


export const followUser = (id) => {
    return async () => {
        try {
            await articleService.followUser(id);
            notification.success({
                message: 'follow Author successfully'
            })
        } catch (e) {
            notification.error({
                message: 'failed to follow Author'
            })
            console.log("error in follow", e);
        }
    }
}

export const unfollowUser = (id) => {
    return async () => {
        try {
            await articleService.unfollow(id);
            notification.success({
                message: 'unfollow Author successfully'
            })
        } catch (e) {
            notification.error({
                message: 'failed to unfollow Author'
            })
        }
    }
}



export default articlePage;

