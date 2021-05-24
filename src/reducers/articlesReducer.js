import {
  CREATE_ARTICLE,
  INITIAL_DATA,
  TIMELINE,
  DELETE_ARTICLE,
  GET_MY_ARTICLES,
  GET_MY_BOOKMARKS
} from '../actions/articles'
import checkModerationService from '../services/checkModeration'
import { notification } from 'antd'
import articleService from '../services/article'

const articlesReducer = (state = {}, action) => {
  switch (action.type) {
    case INITIAL_DATA:
      return {
        ...state,
        articles: action.data.articles,
        totalPages: action.data.totalPages,
        currentPage: action.data.currentPage
      }
    case GET_MY_ARTICLES:
      return {
        ...state,
        articles: action.data.myarticles.reverse()
      }
    case GET_MY_BOOKMARKS:
      return {
        ...state,
        articles: action.data.reverse()
      }
    case TIMELINE:
      return {
        ...state,
        articles: state.articles.concat(action.data?.articles),
        totalPages: action.data.totalPages,
        currentPage: action.data.currentPage
      }

    case CREATE_ARTICLE:
      return { ...state, articles: [...state.articles, action.data] }
    case DELETE_ARTICLE:
      return {
        ...state,
        articles: state.articles.filter((article) => {
          return article.id !== action.data
        })
      }
    default:
      return state
  }
}

export const getinitialData = () => {
  return async (dispatch) => {
    try {
      const response = await articleService.timeline(1, 5)
      dispatch({ type: INITIAL_DATA, data: response })
    } catch (error) {
      notification.error({
        message: "Couldn't load all articles check your connection"
      })
    }
  }
}

export const getMyArticles = (username) => {
  return async (dispatch) => {
    try {
      const response = await articleService.myArticles(username)
      console.log(response.myarticles)
      dispatch({ type: GET_MY_ARTICLES, data: response })
    } catch (error) {
      notification.error({
        message: "Couldn't load your articles check your connection: " + error
      })
    }
  }
}

export const getMyBookMarks = () => {
  return async (dispatch) => {
    try {
      const response = await articleService.myBookMarks()
      var res = []
      for (let i = 0; i < response.length; i++) {
        res.push(response[i].article)
      }
      console.log(res)
      dispatch({ type: GET_MY_BOOKMARKS, data: res })
    } catch (error) {
      notification.error({
        message: "Couldn't load your bookmarks check your connection: " + error
      })
    }
  }
}

export const Timeline = (page, limit) => {
  return async (dispatch) => {
    try {
      const response = await articleService.timeline(page, limit)
      dispatch({ type: TIMELINE, data: response })
    } catch (error) {
      notification.error({
        message: "Couldn't load all articles check your connection"
      })
    }
  }
}

export const create_article = (Article) => {
  return async (dispatch) => {
    try {
      const ver =
        ((await checkModerationService.check(Article.title)) &&
        (await checkModerationService.check(Article.text)));
      if (ver) {
        const response = await articleService.create_article(Article)

        dispatch({ type: CREATE_ARTICLE, data: response })
        console.log(response)
        notification.success({
          message: 'Added article successfully'
        })
      } else {
        notification.error({
          message: 'Your article violates EduHub standards'
        })
      }
    } catch (error) {
      notification.error({
        message: "Couldn't load Article check your connection"
      })
    }
  }
}

export const deleteArticle = (id) => {
  return async (dispatch) => {
    try {
      await articleService.deleteArticle(id)
      dispatch({ type: DELETE_ARTICLE, data: id })

      notification.success({
        message: 'Deleted article successfully'
      })
    } catch (error) {
      notification.error({
        message: "Couldn't Delete this Article"
      })
      console.log(error)
    }
  }
}

export default articlesReducer
