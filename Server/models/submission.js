const { Duration } = require('luxon')
const mongoose = require('mongoose')
const { Assessment } = require('../models/assessment')
const GradesSummary = require('../models/gradesSummary')

const submissionSchema = new mongoose.Schema({
  files: [
    {
      name: String,
      url: { type: String, required: true },
      plagarismFileStatus: {
        type: String,
        enum: ['processing', 'unCalculated', 'none', 'med', 'high', 'veryHigh'],
        default: 'unCalculated'
      },
      plagiarisedFrom: { type: String },
      text: { type: String, default: '' }
    }
  ],
  course: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Course',
    required: true
  },
  assessment: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Assessment',
    required: true
  },
  plagarismStatus: {
    type: String,
    enum: ['processing', 'unCalculated', 'none', 'med', 'high', 'veryHigh'],
    default: 'unCalculated'
  },
  autoGradingStatus: {
    type: String,
    enum: ['processing', 'unGraded', 'Graded'],
    default: 'unGraded'
  },
  student: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User',
    required: true
  },
  finished: { type: Boolean }, // for exams only
  score: { type: Number },
  gradedAt: { type: mongoose.SchemaTypes.Date },
  numberOfExamJoins: { type: Number, required: true, default: 0 },
  gradedBy: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User'
  },
  submittedAt: { type: mongoose.SchemaTypes.Date },
  answers: [
    {
      _id: false,
      originQuestion: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Question',
        required: true
      },
      studentAnswer: { type: String, required: true },
      score: { type: Number }
    }
  ]
})
submissionSchema.pre('deleteMany', async function (next) {
  const parent = await GradesSummary.findOne({
    course: this.getFilter()['course']
  })
  if (parent) {
    for (const student of parent.studentGrades) {
      student.grades.pull({ _id: this.getFilter()['assessment'] })
    }

    await parent.save()
  }
  next()
})

const virtualStatus = submissionSchema.virtual('status')
virtualStatus.get(function (value, virtual, doc) {
  if (!this.assessment || (this.assessment && this.assessment.type === 'Exam'))
    return undefined

  const timeDiffrence = this.submittedAt - this.assessment.dueDate

  if (!timeDiffrence) return undefined

  if (timeDiffrence <= 0) {
    return {
      code: 'onTime',
      message: `by ${Duration.fromMillis(Math.abs(timeDiffrence)).toFormat(
        'hh:mm'
      )} hours & minutes`
    }
  } else {
    return {
      code: 'late',
      message: `by ${Duration.fromMillis(timeDiffrence).toFormat(
        'hh:mm'
      )} hours & minutes`
    }
  }
})

submissionSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
  virtuals: true
})

const Submission = mongoose.model('Submission', submissionSchema)

module.exports = Submission
