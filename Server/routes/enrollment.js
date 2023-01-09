const express = require('express')
const auth = require('../middleware/auth')
const enrollmentRouter = express.Router({ mergeParams: true })

const {
  getEnrollments,
  updateEnrollment
} = require('../controller/courseController/courseController')

enrollmentRouter.get('/', auth, getEnrollments)
enrollmentRouter.post('/', auth, updateEnrollment)

module.exports = enrollmentRouter
