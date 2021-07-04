import axios from 'axios'
import { getAuthHeader } from './config'

import { baseURL as coursesURL } from './courses'

const baseURL = '/modules'

const getModulesURL = (courseId, moduleId) => {
  if (!moduleId) return `${coursesURL}/${courseId}${baseURL}`
  return `${coursesURL}/${courseId}${baseURL}/${moduleId}`
}

const getModuleItemsURL = (courseId, moduleId, moduleItemId) => {
  if (!moduleItemId)
    return `${coursesURL}/${courseId}${baseURL}/${moduleId}/module-item`
  return `${coursesURL}/${courseId}${baseURL}/${moduleId}/module-item/${moduleItemId}`
}

const getAllModules = async (courseId) => {
  const response = await axios.get(getModulesURL(courseId))
  return response.data.modules
}

const createModule = async (courseId, module) => {
  const response = await axios.post(
    getModulesURL(courseId),
    module,
    getAuthHeader()
  )
  return response.data.modules
}

const updateModule = async (courseId, moduleId, module) => {
  const response = await axios.put(
    getModulesURL(courseId, moduleId),
    module,
    getAuthHeader()
  )
  return response.data.modules
}

const deleteModule = async (courseId, moduleId) => {
  const response = await axios.delete(
    getModulesURL(courseId, moduleId),
    getAuthHeader()
  )
  return response.data.modules
}

const createModuleItem = async (courseId, moduleId, moduleItem) => {
  const response = await axios.post(
    getModuleItemsURL(courseId, moduleId),
    moduleItem,
    getAuthHeader()
  )
  return response.data.modules
}

// const uploadModuleItem = async (courseId, moduleId, moduleItem) => {
//   const response = await axios.post(
//     getModuleItemsURL(courseId, moduleId),
//     moduleItem,
//     getMultiPartAuthHeader()
//   )
//   return response.data.modules
// }

const deleteModuleItem = async (courseId, moduleId, moduleItemId) => {
  const response = await axios.delete(
    getModuleItemsURL(courseId, moduleId, moduleItemId),
    getAuthHeader()
  )
  return response.data.modules
}

const moduleService = {
  getAllModules,
  createModule,
  updateModule,
  deleteModule,
  createModuleItem,
  deleteModuleItem
}
export default moduleService
