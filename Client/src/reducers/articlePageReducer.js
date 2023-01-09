import { notification } from 'antd';
import articleService from '../services/article';
import checkModerationService from '../services/checkModeration';
import {
    GET_ONE_ARTICLE, LIKE_ARTICLE, UNLIKE_ARTICLE,
    UNBOOKMARK_ARTICLE, BOOKMARK_ARTICLE,
    FOLLOWUSER, UNFOLLOWUSER,
    CREATE_COMMENT, DELETE_COMMENT, CLEAR
} from '../actions/articlePage';


const articlePage = (state = {}, action) => {
    switch (action.type) {
        case GET_ONE_ARTICLE:
            return action.data
        case LIKE_ARTICLE:
            return { ...state, islike: true, length: state.length + 1 }
        case UNLIKE_ARTICLE:
            return { ...state, islike: false, length: state.length - 1 }
        case BOOKMARK_ARTICLE:
            return { ...state, isBooked: true }
        case CLEAR:
            return {};
        case UNBOOKMARK_ARTICLE:
            return { ...state, isBooked: false }
        case FOLLOWUSER:
            return { ...state, isFollow: true }
        case UNFOLLOWUSER:
            return { ...state, isFollow: false }
        case CREATE_COMMENT:
            return { ...state, comments: state.comments.concat({ ...action.data }) };
        case DELETE_COMMENT:
            return {
                ...state, comments: state.comments.filter((comment) => {
                    return comment !== action.data;
                })
            }

        default:
            return state
    }
}



export const clear = () => {
  return async (dispatch) => {
    try {

      dispatch({ type: CLEAR })
      notification.success({
        message: 'clear article page'
      })
    } catch (e) {
      notification.error({
        message: 'cant clear article page'
      })
    }
  }
}



export const getArticleData = (id) => {
    return async (dispatch) => {
        try {

            const response = await articleService.getThisArticle(id);
            // Get all data articles like comment follow bookMarks of one article ; 
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
            dispatch({ type: UNBOOKMARK_ARTICLE, data: response });

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


export const createComment = (articleId, comment) => {
    return async (dispatch) => {
        try {
            const ver = await checkModerationService.check(comment)
            if (ver) {
              await articleService.createComment(articleId, comment)

              dispatch({ type: CREATE_COMMENT, data: comment })
              notification.success({
                message: 'new comment created'
              })
            } else {
              notification.error({
                message: 'Your comment violates EduHub standards'
              })
            }
        } catch (e) {
            notification.error({
                message: 'failed to create Comment'
            })
        }
    }
}

export const DeleteComment = (articleId, comment) => {
    return async (dispatch) => {
        try {
            if (comment.id !== undefined) {
                await articleService.deleteComment(articleId, comment.id);
            }
            dispatch({ type: DELETE_COMMENT, data: comment });
            notification.success({
                message: 'delete comment successfully'
            })
        }
        catch (e) {
            notification.error({
                message: 'failed to delete Comment'
            })
            console.log(e);
        }
    }
}

export default articlePage;

