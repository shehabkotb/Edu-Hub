import { useSelector } from 'react-redux'
import { useParams } from 'react-router'

const useCoursePrivilege = (id) => {
  const params = useParams()
  const courseId = id || params.courseId

  const courses = useSelector((state) => state.courses.data)

  const currentCourse = courses.find((course) => course.id === courseId)

  const { enrolled, privilege } =
    currentCourse !== undefined ? currentCourse : { enrolled: false }

  return { enrolled, privilege }
}

export default useCoursePrivilege
