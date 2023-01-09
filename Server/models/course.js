const { DateTime } = require('luxon')
const mongoose = require('mongoose')
const { Assessment } = require('./assessment')
const courseModule = require('./courseModule')

const randomHexColor = () => {
  return '#' + Math.floor(Math.random() * 16777215).toString(16)
}

const enrollmentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true
    },
    enrolledAs: {
      type: String,
      enum: ['student', 'instructor', 'admin'],
      required: true
    }
  },
  { timestamps: { createdAt: true, updatedAt: false } }
)

enrollmentSchema.set('toJSON', {
  virtuals: true,
  transform: function (doc, ret) {
    delete ret._id
  }
})

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 1 },
  description: String,
  createdAt: { type: mongoose.SchemaTypes.Date, default: Date.now },
  createdBy: { type: mongoose.SchemaTypes.ObjectId, ref: 'User' },
  files: [String],
  image: String,
  backgroundColor: { type: String, default: randomHexColor },
  modules: [courseModule.schema],
  status: {
    type: String,
    enum: ['published', 'archived'],
    default: 'published'
  },
  enrollments: [enrollmentSchema]
})

courseSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

courseSchema.methods.modulesJSON = function () {
  const modules = this.modules.map((courseModule) => courseModule.toJSON())
  const result = {
    modules: modules
  }
  return result
}

courseSchema.methods.getVideos = function () {
  const videos = this.modules.map((module) => {
    return module.moduleItems.filter(
      (item) => item.type === 'video' && item.url.includes('youtu')
    )
  })
  const flattenVideos = videos.reduce((accumlator, currentValue) => {
    return accumlator.concat(currentValue)
  }, [])

  let regexpNames =
    /https?:\/\/(?:[0-9A-Z-]+\.)?(?:youtu\.be\/|youtube(?:-nocookie)?\.com\S*?[^\w\s-])([\w-]{11})(?=[^\w-]|$)(?![?=&+%\w.-]*(?:['"][^<>]*>|<\/a>))[?=&+%\w.-]*/i
  const result = flattenVideos.map((video) => {
    const videoId = regexpNames.exec(video.url)
    if (!videoId) return
    return {
      id: video._id,
      title: video.title,
      url: video.url,
      type: video.type,
      videoId: videoId[1]
    }
  })

  return result
}

courseSchema.statics.getCoursesWithPrivilege = async function (userId) {
  const courses = await this.find({}).populate(
    'enrollments.user createdBy',
    '_id name username email code photo'
  )

  const result = courses.map((course) => {
    const coursePOJO = course.toJSON()

    let enrollment
    if (coursePOJO.enrollments)
      enrollment = coursePOJO.enrollments.find((e) => e.user._id.equals(userId))

    const result = { ...coursePOJO, enrolled: false }

    if (enrollment) {
      result.enrolled = true
      result.privilege = enrollment.enrolledAs
    }

    if (coursePOJO.status === 'archived') {
      result.enrolled = true
      result.privilege = 'student'
    }

    if (result.privilege === 'student') delete result.enrollments

    return result
  })

  return result
}

courseSchema.methods.enroll = function (userId, role) {
  if (this.enrollments.some((e) => e.user.equals(userId)))
    throw 'already enrolled'

  let privilege = 'student'

  if (role === 'admin') privilege = 'admin'

  if (this.createdBy) {
    if (this.createdBy.toString() === userId.toString())
      privilege = 'instructor'
  }

  this.enrollments.push({ user: userId, enrolledAs: privilege })
  return this
}

courseSchema.methods.unEnroll = function (userId) {
  if (!this.enrollments.some((e) => e.user.equals(userId))) throw 'not enrolled'

  this.enrollments = this.enrollments.filter((e) => {
    return !e.user.equals(userId)
  })

  return this
}

courseSchema.methods.getInstructors = function () {
  return this.enrollments.filter(
    (enrollment) => enrollment.enrolledAs === 'instructor'
  )
}

courseSchema.statics.getDeadLines = async function (courseId) {
  const assessments = await Assessment.find({ course: courseId })
    .populate('course', 'name')
    .exec()

  const result = assessments.map((assessment) => {
    if (assessment.type === 'Exam') {
      return {
        title: assessment.title,
        deadline: assessment.openAt,
        type: assessment.type,
        assessmentId: assessment._id,
        course: { name: assessment.course.name, id: assessment.course.id }
      }
    } else if (assessment.type === 'Assignment') {
      return {
        title: assessment.title,
        deadline: assessment.dueDate,
        type: assessment.type,
        assessmentId: assessment._id,
        course: { name: assessment.course.name, id: assessment.course.id }
      }
    }
  })

  return result
}

courseSchema.statics.formatCalendar = function (deadlines) {
  const result = {}

  const nestedAssign = (obj, keyPath, value) => {
    lastKeyIndex = keyPath.length - 1
    for (var i = 0; i < lastKeyIndex; ++i) {
      key = keyPath[i]
      if (!(key in obj)) {
        obj[key] = {}
      }
      obj = obj[key]
    }
    obj[keyPath[lastKeyIndex]] = obj[keyPath[lastKeyIndex]]
      ? obj[keyPath[lastKeyIndex]].concat(value)
      : [].concat(value)
  }

  deadlines.forEach((item) => {
    const date = DateTime.fromJSDate(item.deadline)
    const year = date.year
    const month = date.month
    const day = date.day

    nestedAssign(result, [`${year}`, `${month}`, `${day}`], [{ ...item }])
  })

  return result
}

const Course = mongoose.model('Course', courseSchema)

module.exports = Course
