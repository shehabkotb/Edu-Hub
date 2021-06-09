import axios from 'axios'
import { getAuthHeader } from './config'

const getSubsOfCourse = async (courseId) => {
    try{
        const response = await axios.get(
          `/${courseId}/grade-book`,
          getAuthHeader()
        )
        return response.data
    }catch(e){
        console.log("error in fitching gradebook: "+e)
        return [];
    }
}

const getSummaryOfCourse = async (courseId) => {
  try {
    const response = await axios.get(`/${courseId}/grade-book-summary`, getAuthHeader())
    return response.data
  } catch (e) {
    console.log('error in fitching summary gradebook: ' + e)
    return []
  }
}

const gradebookService = {
  getSubsOfCourse,
  getSummaryOfCourse
}

export default gradebookService;