const express = require('express')
const auth = require('../middleware/auth')
const gradeBookRouter = express.Router({ mergeParams: true })

const {
  getGradesGradeBook
} = require('../controller/submissionController/submissionController')

const { getOne } = require('../controller/gradesSummaryController')

gradeBookRouter.get('/grade-book', auth, getGradesGradeBook)
gradeBookRouter.get('/grade-book-summary', auth, getOne)

module.exports = gradeBookRouter
