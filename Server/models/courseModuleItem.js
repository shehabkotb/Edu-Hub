const mongoose = require('mongoose')

// type > video | file
const moduleItemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String, enum: ['video', 'file'], required: true },
  url: { type: String, required: true }
})

const CourseModuleItem = mongoose.model('CourseModuleItem', moduleItemSchema)

module.exports = CourseModuleItem
