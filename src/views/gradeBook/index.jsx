import StudentGradeBook from './components/studentGB'

const GradeBook = ({ courseId }) => {
    return(
        <StudentGradeBook courseId={courseId} />
    );
}

export default GradeBook