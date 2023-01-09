const mongoose = require('mongoose')

const options = {
  discriminatorKey: 'type'
}

const gradesSchema = new mongoose.Schema({
  assessment: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Assessment',
    required: true
  },
  type: { type: String, required: true },
  score: { type: Number, required: true },
  maxScore: { type: Number, required: true },
  weight: { type: Number, required: true },
  title: { type: String, required: true },
  gradedAt: { type: mongoose.SchemaTypes.Date, required: true }
})

const studentGradesSchema = new mongoose.Schema({
  student: { type: mongoose.SchemaTypes.ObjectId, ref: 'User', required: true },
  grades: [gradesSchema]
})

const gradesSummarySchema = new mongoose.Schema({
  course: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Course',
    required: true
  },
  studentGrades: [studentGradesSchema]
})

const virtualTotal = studentGradesSchema.virtual('totalScore')
virtualTotal.get(function (value, virtual, doc) {
  let sum = 0
  this.grades.forEach((grade) => {
    if (grade.score && grade.maxScore) {
      sum += (grade.score / grade.maxScore) * grade.weight
    }
  })
  return `${Math.round(sum * 100)}%`
})

const virtualExamScore = studentGradesSchema.virtual('examsScore')
virtualExamScore.get(function (value, virtual, doc) {
  let sum = 0
  this.grades.forEach((grade) => {
    if (grade.type === 'Exam') {
      sum += (grade.score / grade.maxScore) * grade.weight
    }
  })
  return `${Math.round(sum * 100)}%`
})

const virtualAssignmentScore = studentGradesSchema.virtual('assignmentsScore')
virtualAssignmentScore.get(function (value, virtual, doc) {
  let sum = 0
  this.grades.forEach((grade) => {
    if (grade.type === 'Assignment') {
      sum += (grade.score / grade.maxScore) * grade.weight
    }
  })
  return `${Math.round(sum * 100)}%`
})

const virtualGradeLetter = studentGradesSchema.virtual('grade')
virtualGradeLetter.get(function (value, virtual, doc) {
  let totalScoreNum = parseFloat(this.totalScore)
  if (totalScoreNum < 60) return 'F'
  if (totalScoreNum < 67) return 'D'
  if (totalScoreNum < 76) return 'C'
  if (totalScoreNum < 89) return 'B'
  else return 'A'
})

gradesSummarySchema.statics.updateOrCreate = async function (
  courseId,
  studentId,
  assessmentId,
  assessment,
  score
) {
  let parent = await this.findOne({ course: courseId })
  if (!parent) {
    parent = await this.create({ course: courseId })
  }

  let studentGrades = await parent.studentGrades.id(studentId)
  if (!studentGrades)
    await parent.studentGrades.push({ _id: studentId, student: studentId })

  let grades = await parent.studentGrades.id(studentId).grades.id(assessmentId)
  if (!grades)
    await parent.studentGrades.id(studentId).grades.push({
      _id: assessmentId,
      assessment: assessmentId,
      score: score,
      weight: assessment.weight,
      maxScore: assessment.maxScore,
      type: assessment.type,
      title: assessment.title,
      gradedAt: Date.now()
    })
  else {
    grades.score = score
    grades.weight = assessment.weight
    grades.maxScore = assessment.maxScore
    grades.type = assessment.type
    grades.title = assessment.title
    grades.gradedAt = Date.now()
  }

  return await parent.save()
}

gradesSummarySchema.set('toJSON', {
  transform: (document, returnedObject) => {
    if (returnedObject.keywords) {
    }
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
  virtuals: true
})

gradesSummarySchema.set('toObject', {
  transform: (document, returnedObject) => {
    if (returnedObject.keywords) {
    }
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
  virtuals: true
})

studentGradesSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    if (returnedObject.keywords) {
    }
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
  virtuals: true
})

studentGradesSchema.set('toObject', {
  transform: (document, returnedObject) => {
    if (returnedObject.keywords) {
    }
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
  virtuals: true
})

gradesSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    if (returnedObject.keywords) {
    }
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
  virtuals: true
})

gradesSchema.set('toObject', {
  transform: (document, returnedObject) => {
    if (returnedObject.keywords) {
    }
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
  virtuals: true
})

gradesSummarySchema.statics.getGradesByUser = async function (courseId) {
  let result = []
  let courseGrades = await this.findOne({ course: courseId })
    .populate({
      path: 'studentGrades.student',
      model: 'User'
    })
    .populate('course', 'name')
    .exec()

  if (!courseGrades) return result

  courseGrades = courseGrades.toJSON()

  const studentsGrades = courseGrades.studentGrades
  for (let userGrade of studentsGrades) {
    // userGrade = userGrade.toJSON()

    result.push({
      courseName: courseGrades.course.name,
      studentName: userGrade.student.name,
      user: userGrade.student._id,
      course: courseGrades.course.id,
      score: userGrade.totalScore,
      gradeLetter: userGrade.grade
    })
  }

  return result
}

const Grades = mongoose.model('GradesSummary', gradesSummarySchema)

module.exports = Grades
