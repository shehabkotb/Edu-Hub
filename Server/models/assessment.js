const mongoose = require('mongoose')
const { DateTime } = require('luxon')

const options = {
  discriminatorKey: 'type'
}

const assessmentSchema = new mongoose.Schema(
  {
    type: { type: String, enum: ['Exam', 'Assignment'], required: true },
    createdBy: { type: mongoose.SchemaTypes.ObjectId, ref: 'User' },
    files: [{ name: String, url: { type: String, required: true } }],
    title: { type: String, required: true },
    maxScore: { type: Number, required: true },
    weight: { type: Number, required: true },
    questionsType: { type: String, enum: ['online', 'file'], required: true },
    submissionType: {
      type: String,
      enum: ['online', 'written'],
      required: true
    },
    course: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Course',
      required: true
    },
    visiblity: {
      type: String,
      enum: ['published', 'unpublished'],
      default: 'published'
    },
    questions: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Question' }]
  },
  { ...options, timestamps: true }
)

/************ assessments *************/

// enum [willopen, opened, closed]
const virtualStatus = assessmentSchema.virtual('status')
virtualStatus.get(function (value, virtual, doc) {
  if (this.openAt && Date.now() < this.openAt)
    return {
      code: 'willOpen',
      message: `assetment will open at ${DateTime.fromJSDate(
        this.openAt
      ).toLocaleString(DateTime.DATETIME_FULL)}`
    }
  else if (this.closeAt && this.closeAt < Date.now())
    return {
      code: 'closed',
      message: `assetment closed at ${DateTime.fromJSDate(
        this.closeAt
      ).toLocaleString(DateTime.DATETIME_FULL)}`
    }
  else if (this.closeAt && Date.now() < this.closeAt)
    return {
      code: 'open',
      message: `assetment will close at ${DateTime.fromJSDate(
        this.closeAt
      ).toLocaleString(DateTime.DATETIME_FULL)}`
    }
  return { code: 'open', message: `assetment is open` }
})

assessmentSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
  virtuals: true
})

assessmentSchema.methods.findQuestionById = function (questionId) {
  return this.questions.id(questionId).toObject()
}

const Assessment = mongoose.model('Assessment', assessmentSchema)

/************ exams *************/

const examSchema = new mongoose.Schema({
  openAt: { type: mongoose.SchemaTypes.Date, required: true },
  closeAt: { type: mongoose.SchemaTypes.Date, required: true }
})
// openAt, closeAt required for exam
const VirtualtimeLimit = examSchema.virtual('timeLimit')
VirtualtimeLimit.get(function (value, virtual, doc) {
  return (this.closeAt - this.openAt) / 1000
})

const virtualRemainingTime = examSchema.virtual('remainingTime')
virtualRemainingTime.get(function (value, virtual, doc) {
  return (this.closeAt - Date.now()) / 1000
})

examSchema.set('toJSON', { virtuals: true })

const Exam = Assessment.discriminator('Exam', examSchema, options)

/************ assignements *************/

const assignmentSchema = new mongoose.Schema({
  // openAt: { type: mongoose.SchemaTypes.Date },
  // closeAt: { type: mongoose.SchemaTypes.Date },
  dueDate: { type: mongoose.SchemaTypes.Date, required: true }
})

assignmentSchema.set('toJSON', { virtuals: true })

const Assignment = Assessment.discriminator(
  'Assignment',
  assignmentSchema,
  options
)

module.exports = {
  Assessment,
  Exam,
  Assignment
}
