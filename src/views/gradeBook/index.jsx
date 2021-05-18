import StudentGradeBook from './components/studentGB'
import InstructorGradeBook from './components/instructorGB'
import './styles.css'
import { useSelector, useDispatch } from 'react-redux'

const GradeBook = ({ courseId }) => {
  const user = useSelector((state) => state.auth.user)
  return (
    <>
      {user.role === 'student' && (
        <StudentGradeBook courseId={courseId} id={user._id} />
      )}
      {user.role === 'instructor' && (
        <InstructorGradeBook courseId={courseId} id={user._id} />
      )}
    </>
  )
}

export default GradeBook
