import articleService from '../services/article';
import { CREATE_COMMENT, GET_COMMENTS, DELETE_COMMENT } from '../actions/articlePage';
import { notification } from 'antd';


const ArticleCommentPage = (state = [], action) => {
    switch (action.type) {
        case GET_COMMENTS:
            return action.data
        case DELETE_COMMENT:
            return action.data
        case CREATE_COMMENT:
            return state.concat({ ...action.data })
        default:
            return state
    }
}



export const CreateComment = (articleId, comment) => {
    return async (dispatch) => {
        try {
            const response = await articleService.createComment(articleId, comment)

            dispatch({ type: CREATE_COMMENT, data: response })
            notification.success({
                message: 'Added comment successfully'
            })
        } catch (error) {
            notification.error({
                message: 'failed to add comment'
            })
            console.log(error)
        }
    }
}


export const getComments = (articleId) => {
    return async (dispatch) => {
        try {
            const response = await articleService.getComments(articleId);
            dispatch({ type: GET_COMMENTS, data: response });
            notification.success({
                message: 'Get Comments successfully'
            })
        } catch (e) {
            notification.error({
                message: 'Get Comments failed'
            })
        }
    }
}

export const deleteComment = (articleId, commentId) => {
    return async (dispatch) => {
        try {
            const response = await articleService.deleteComment(articleId, commentId);
            dispatch({ type: DELETE_COMMENT, data: response });
            notification.success({
                message: 'Delete Comment successfully'
            })
        }
        catch (e) {
            notification.error({
                message: 'Failed to Delete Comment'
            })
            console.log(e)
        }
    }
}



export default ArticleCommentPage;

