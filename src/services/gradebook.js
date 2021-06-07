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

const gradebookService = {
  getSubsOfCourse
}

export default gradebookService;