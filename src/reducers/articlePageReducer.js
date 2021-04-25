import { notification } from 'antd';
import articleService from '../services/article';
import {
    GET_ONE_ARTICLE, LIKE_ARTICLE, UNLIKE_ARTICLE,
    UNBOOKMARK_ARTICLE, BOOKMARK_ARTICLE,
    FOLLOWUSER, UNFOLLOWUSER,
    CREATE_COMMENT, DELETE_COMMENT
} from '../actions/articlePage';


const articlePage = (state = {}, action) => {
    switch (action.type) {
        case GET_ONE_ARTICLE:
            return action.data
        case LIKE_ARTICLE:
            state.islike = !state.islike ;
            state.length += 1 ;
            return state;
        case UNLIKE_ARTICLE:
            state.islike = !state.islike ; 
            state.length -= 1 ;
            return state;
        case BOOKMARK_ARTICLE || UNBOOKMARK_ARTICLE:
            state.isBooked = !state.isBooked
            return state;
        case FOLLOWUSER  :
            state.isFollow = !state.isFollow;
            return state
        case UNFOLLOWUSER : 
        state.isFollow = !state.isFollow;
        return state
        case CREATE_COMMENT:
            state.comments.push(action.data);
            return state;
        case DELETE_COMMENT:
            state.comments = state.comments.filter((comment) => {
                return comment.id !== action.data;
            });
            return state;
        default:
            return state
    }
}



export const getArticleData = (id) => {
    return async (dispatch) => {
        try {

            const response = await articleService.getThisArticle(id);

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
    return async (dispatch) => {
        try {
            const response = await articleService.likeArticle(id);
            dispatch({ type: LIKE_ARTICLE, data: response })
            notification.success({
                message: 'like Article successfully'
            })
        } catch (error) {
            notification.error({
                message: 'faild to like Article'
            })
            console.log(error)
        }
    }
}


export const unlikeArticle = (id) => {
    return async (dispatch) => {
        try {
            const response = await articleService.UnlikeArticle(id);
            dispatch({ type: UNLIKE_ARTICLE, data: response })

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
    return async (dispatch) => {
        try {
            const response = await articleService.BookMark(id);
            dispatch({ type: BOOKMARK_ARTICLE, data: response });
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
    return async (dispatch) => {
        try {
            const response = await articleService.unBookMark(id);
            dispatch({ type: BOOKMARK_ARTICLE, data: response });

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
    return async (dispatch) => {
        try {
            const response = await articleService.followUser(id);
            dispatch({ type: FOLLOWUSER, data: response });
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
    return async (dispatch) => {
        try {
            const response = await articleService.unfollow(id);
            dispatch({ type: UNFOLLOWUSER, data: response });
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


export const createComment = ( articleId , comment) => {
    return async (dispatch) => {
        try {
            const response = await articleService.createComment(articleId,comment)
            dispatch({ type: CREATE_COMMENT, data: response })
            notification.success({
                message: 'new comment created'
            })
        } catch (e) {
            notification.error({
                message: 'failed to create Comment'
            })
        }
    }
}

export const DeleteComment = (articleId,commentId) => {
    return async (dispatch) => {
        try {
            await articleService.deleteComment(articleId,commentId);
            dispatch({ type: DELETE_COMMENT, data: commentId });
            notification.success({
                message: 'delete comment successfully'
            })
        }
        catch (e) {
            notification.error({
                message: 'failed to delete Comment'
            })
        }
    }
}

export default articlePage;

