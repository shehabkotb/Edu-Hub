const { default: axios } = require('axios')
const Achievement = require('../../models/achievement')
const Course = require('../../models/course')
const Grades = require('../../models/gradesSummary')
const User = require('../../models/user')

const getAllCourses = async (req, res) => {
  try {
    const user = req.user
    const filter = req.query.filter

    // getCoursesWithPrivilege func populates users
    const courses = await Course.getCoursesWithPrivilege(user._id)

    let result = courses
    if (filter) result = courses.filter((course) => course.status === filter)

    return res.json(result)
  } catch (err) {
    console.log(err)
    res.status(400).json({ error: err.message || err.toString() })
  }
}

const getOneCourse = async (req, res) => {
  try {
    const { courseId } = req.params

    const result = await Course.findOne({ _id: courseId })

    return res.json(result)
  } catch (err) {
    console.log(err)
    res.status(400).json({ error: err.message || err.toString() })
  }
}

const createCourse = async (req, res) => {
  if (!req.body.courseName)
    return res.status(400).json({ error: 'missing courseName' })

  const user = req.user

  try {
    let course = new Course({
      name: req.body.courseName,
      description:
        req.body.description === undefined ? '' : req.body.description,
      createdBy: user._id,
      image: req.body.image === undefined ? undefined : req.body.image
    })

    course.enroll(user._id, user.role)
    course = await course.save()

    user.enrollments.push(course._id)
    await user.save()

    const result = await Course.getCoursesWithPrivilege(user._id)

    return res.status(201).json(result)
  } catch (err) {
    console.log(err)
    res.status(400).json({ error: err.message || err.toString() })
  }
}

const updateCourse = async (req, res) => {
  const courseId = req.params.courseId
  const { name, description, image, status, backgroundColor } = req.body

  try {
    const course = {
      name: name,
      description: description,
      image: image,
      status: status,
      backgroundColor: backgroundColor
    }

    const result = await Course.findByIdAndUpdate(courseId, course, {
      new: true,
      omitUndefined: true
    }).orFail()

    await result
      .populate(
        'enrollments.user createdBy',
        '_id name username email code photo'
      )
      .execPopulate()

    return res.status(200).json(result)
  } catch (err) {
    console.log(err)
    res.status(400).json({ error: err.message || err.toString() })
  }
}

const enroll = async (req, res) => {
  const courseId = req.params.courseId
  const userId = req.body.userId

  try {
    const user = await User.findById(userId).orFail()
    let course = await Course.findById(courseId).orFail()
    course = course.enroll(user._id, user.role)

    // const result = await course.save()
    await course.save()
    user.enrollments.push(courseId)
    await user.save()

    //send to machine learning api

    const result = await Course.getCoursesWithPrivilege(userId)

    return res.status(200).json(result)
  } catch (err) {
    console.log(err)
    res.status(400).json({ error: err.message || err.toString() })
  }
}

const unEnroll = async (req, res) => {
  const courseId = req.params.courseId
  const userId = req.body.userId

  try {
    const user = await User.findById(userId).orFail()
    let course = await Course.findById(courseId).orFail()
    course = course.unEnroll(user._id)

    // const result = await course.save()
    await course.save()
    user.enrollments = user.enrollments.filter((e) => e.toString() !== courseId)
    await user.save()

    //send to machine learning api

    const result = await Course.getCoursesWithPrivilege(userId)

    return res.status(200).json(result)
  } catch (err) {
    console.log(err)
    res.status(400).json({ error: err.message || err.toString() })
  }
}

const getEnrollments = async (req, res) => {
  try {
    const courseId = req.params.courseId

    const course = await Course.findById(courseId)
      .populate('enrollments.user')
      .exec()

    return res.status(200).json(course.enrollments)
  } catch (err) {
    console.log(err)
    res.status(400).json({ error: err.message || err.toString() })
  }
}

const updateEnrollment = async (req, res) => {
  try {
    const courseId = req.params.courseId
    const enrollmentId = req.body.enrollmentId

    const course = await Course.findById(courseId)
      .populate('enrollments.user')
      .exec()

    const enrollmentToUpdate = course.enrollments.id(enrollmentId)

    enrollmentToUpdate.enrolledAs = req.body.enrolledAs
    const result = await course.save()

    return res.status(200).json(result.enrollments)
  } catch (err) {
    console.log(err)
    res.status(400).json({ error: err.message || err.toString() })
  }
}

const deleteCourse = async (req, res) => {
  const courseId = req.params.courseId

  try {
    let course = await Course.findById(courseId).orFail()

    for (const enrollment of course.enrollments) {
      const user = await User.findById(enrollment.user.toString()).orFail()

      user.enrollments = user.enrollments.filter(
        (e) => e.toString() !== courseId
      )
      await user.save()
    }
    await course.remove()

    return res.status(204).end()
  } catch (err) {
    console.log(err)
    res.status(400).json({ error: err.message || err.toString() })
  }
}

const endCourse = async (req, res) => {
  const courseId = req.params.courseId

  try {
    const gradeRecords = await Grades.getGradesByUser(courseId)

    for (const studentGrade of gradeRecords) {
      const data = JSON.stringify({
        Student: studentGrade.studentName,
        Course: studentGrade.courseName,
        Grade: studentGrade.grade
      })

      const certificateUrl = axios
        .post('', {
          Student: studentGrade.studentName,
          Course: studentGrade.courseName,
          Grade: studentGrade.gradeLetter
        })
        .then((res) => {
          const newAchievement = new Achievement({
            ...studentGrade,
            certificate: res.data
          })
          newAchievement.save()
        })
        .catch((err) => console.log(err))
    }

    await Course.findByIdAndUpdate(
      courseId,
      { status: 'archived' },
      { omitUndefined: true }
    )

    return res.status(204).end()
  } catch (err) {
    console.log(err)
    res.status(400).json({ error: err.message || err.toString() })
  }
}

const getDeadLines = async (req, res) => {
  try {
    const user = req.user

    let result = []
    for (const courseId of user.enrollments) {
      const courseDeadlines = await Course.getDeadLines(courseId)
      result = result.concat(courseDeadlines)
    }

    return res.json(result)
  } catch (err) {
    console.log(err)
    res.status(400).json({ error: err.message || err.toString() })
  }
}

const getDeadLinesCalendar = async (req, res) => {
  try {
    const user = req.user

    let result = []
    for (const courseId of user.enrollments) {
      const courseDeadlines = await Course.getDeadLines(courseId)
      result = result.concat(courseDeadlines)
    }

    result = Course.formatCalendar(result)

    return res.json(result)
  } catch (err) {
    console.log(err)
    res.status(400).json({ error: err.message || err.toString() })
  }
}

module.exports = {
  createCourse,
  getAllCourses,
  getOneCourse,
  enroll,
  unEnroll,
  deleteCourse,
  updateCourse,
  getEnrollments,
  updateEnrollment,
  getDeadLines,
  getDeadLinesCalendar,
  endCourse
}
