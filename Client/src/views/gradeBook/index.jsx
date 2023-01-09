import StudentGradeBook from './components/studentGB'
import InstructorGradeBook from './components/instructorGB'
import './styles.css'
import { useSelector, useDispatch } from 'react-redux'
import React, { useState, useEffect } from 'react'
import { getSummaryOfCourse } from '../../reducers/summaryGradebookReducer'
import { getSubsOfCourse } from '../../reducers/gradebookReducer'
import useCoursePrivilege from '../../hooks/useCourseprivilege'

const GradeBook = ({ courseId }) => {
  const { privilege } = useCoursePrivilege()
  const dispatch = useDispatch()

  const user = useSelector((state) => state.auth.user)

  useEffect(() => {
    dispatch(getSummaryOfCourse(courseId))
    if (privilege === 'instructor') {
      dispatch(getSubsOfCourse(courseId))
    }
  }, [dispatch, courseId])

  return (
    <>
      {privilege === 'student' && (
        <StudentGradeBook courseId={courseId} id={user._id} />
      )}
      {privilege === 'instructor' && (
        <InstructorGradeBook courseId={courseId} id={user._id} />
      )}
    </>
  )
}

export default GradeBook
