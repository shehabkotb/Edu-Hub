import moduleService from '../services/courseModules'
import {
  GET_ALL_MODULES,
  CREATE_MODULE,
  UPDATE_MODULE,
  DELETE_MODULE
} from '../actions/courseModules'

import {
  CREATE_MODULE_ITEM,
  UPDATE_MODULE_ITEM,
  DELETE_MODULE_ITEM
} from '../actions/courseModules'

import { notification } from 'antd'

const moduleReducer = (state = [], action) => {
  switch (action.type) {
    case GET_ALL_MODULES:
      return action.data
    case CREATE_MODULE:
      return action.data
    case UPDATE_MODULE:
      return action.data
    case DELETE_MODULE:
      return action.data
    case CREATE_MODULE_ITEM:
      return action.data
    case UPDATE_MODULE_ITEM:
      return action.data
    case DELETE_MODULE_ITEM:
      return action.data
    default:
      return state
  }
}

/* actions for courses bellow */

export const getAllModules = (courseId) => {
  return async (dispatch) => {
    try {
      const response = await moduleService.getAllModules(courseId)
      dispatch({ type: GET_ALL_MODULES, data: response })
    } catch (error) {
      console.log(error)
      notification.error({
        message: "Couldn't load Modules check your connection"
      })
    }
  }
}

export const createModule = (courseId, module) => {
  return async (dispatch) => {
    try {
      const response = await moduleService.createModule(courseId, module)
      dispatch({ type: CREATE_MODULE, data: response })
      notification.success({
        message: 'Added module successfully'
      })
    } catch (error) {
      console.log(error)
      notification.error({
        message: "Couldn't add module"
      })
    }
  }
}

export const updateModule = (courseId, moduleId, module) => {
  return async (dispatch) => {
    try {
      const response = await moduleService.updateModule(
        courseId,
        moduleId,
        module
      )
      dispatch({ type: UPDATE_MODULE, data: response })
      notification.success({
        message: 'updated Module successfully'
      })
    } catch (error) {
      console.log(error)
      notification.error({
        message: "Couldn't update Module"
      })
    }
  }
}

export const deleteModule = (courseId, moduleId) => {
  return async (dispatch) => {
    try {
      const response = await moduleService.deleteModule(courseId, moduleId)
      dispatch({ type: DELETE_MODULE, data: response })
      notification.success({
        message: 'deleted Module successfully'
      })
    } catch (error) {
      console.log(error)
      notification.error({
        message: "Couldn't delete Module"
      })
    }
  }
}

export const createModuleItem = (courseId, moduleId, moduleItem) => {
  return async (dispatch) => {
    try {
      debugger
      let response
      if (moduleItem instanceof FormData) {
        // file
        response = await moduleService.uploadModuleItem(
          courseId,
          moduleId,
          moduleItem
        )
      } else {
        // video
        response = await moduleService.createModuleItem(
          courseId,
          moduleId,
          moduleItem
        )
      }

      dispatch({ type: CREATE_MODULE_ITEM, data: response })
      notification.success({
        message: 'Added module Item successfully'
      })
    } catch (error) {
      console.log(error)
      notification.error({
        message: "Couldn't add module Item"
      })
    }
  }
}

export const deleteModuleItem = (courseId, moduleId, moduleItemId) => {
  return async (dispatch) => {
    try {
      const response = await moduleService.deleteModuleItem(
        courseId,
        moduleId,
        moduleItemId
      )
      dispatch({ type: DELETE_MODULE_ITEM, data: response })
      notification.success({
        message: 'deleted Module Item successfully'
      })
    } catch (error) {
      console.log(error)
      notification.error({
        message: "Couldn't delete module Item"
      })
    }
  }
}

export default moduleReducer
