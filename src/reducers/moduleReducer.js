import moduleService from '../services/courseModules'
import s3Service from '../services/s3Service'

import {
  GET_ALL_MODULES,
  CREATE_MODULE,
  UPDATE_MODULE,
  DELETE_MODULE,
  CLEAR_MODULES
} from '../actions/courseModules'

import {
  CREATE_MODULE_ITEM,
  UPDATE_MODULE_ITEM,
  DELETE_MODULE_ITEM,
  LOADING_UPLOAD
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
    case LOADING_UPLOAD:
      return state.map((courseModule) => {
        if (courseModule.id === action.moduleId)
          return { ...courseModule, loadingUpload: true }
        else return courseModule
      })
    case CLEAR_MODULES:
      return []
    default:
      return state
  }
}

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
  return async (dispatch, getState) => {
    const { modules } = getState()
    const moduleToDelete = modules.find((module) => module.id === moduleId)

    for (const moduleItem of moduleToDelete.moduleItems) {
      if (moduleItem.type === 'file') await s3Service.deleteFile(moduleItem.url)
    }

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
      if (moduleItem instanceof FormData) {
        dispatch({ type: LOADING_UPLOAD, moduleId })

        const fileURL = await s3Service.uploadFile(
          courseId,
          'modules',
          moduleItem.get('file').name,
          moduleItem.get('file')
        )

        moduleItem.append('url', fileURL)
      }

      const response = await moduleService.createModuleItem(
        courseId,
        moduleId,
        moduleItem
      )

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

export const deleteModuleItem = (courseId, moduleId, moduleItem) => {
  return async (dispatch) => {
    try {
      if (moduleItem.type === 'file') await s3Service.deleteFile(moduleItem.url)

      const response = await moduleService.deleteModuleItem(
        courseId,
        moduleId,
        moduleItem.id
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

export const clearModules = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: CLEAR_MODULES })
    } catch (error) {
      console.log(error)
      notification.error({
        message: "Couldn't clear modules"
      })
    }
  }
}

export default moduleReducer
