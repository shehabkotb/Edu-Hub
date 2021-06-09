import StudentGradeBook from './components/studentGB'
import InstructorGradeBook from './components/instructorGB'
import './styles.css'
import { useSelector, useDispatch } from 'react-redux'
import React, { useState, useEffect } from 'react'
import { getSummaryOfCourse } from '../../reducers/summaryGradebookReducer'
import { getSubsOfCourse } from '../../reducers/gradebookReducer'


const GradeBook = ({ courseId }) => {
  const user = useSelector((state) => state.auth.user)
  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(getSummaryOfCourse(courseId))
    if (user.role === 'instructor') {
      dispatch(getSubsOfCourse(courseId))
    }
  }, [dispatch, courseId])

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
