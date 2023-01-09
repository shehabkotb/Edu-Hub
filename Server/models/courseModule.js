const mongoose = require('mongoose')

const moduleItemSchema = require('./courseModuleItem').schema

const moduleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  moduleItems: [moduleItemSchema]
})

// if moduleItem schema changes
// moduleSchema.path('moduleItems').discriminator('video', Schema({ //added fields }));

moduleSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    returnedObject.moduleItems.forEach((element) => {
      element.id = element._id.toString()
      delete element._id
      delete element.__v
    })
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const CourseModule = mongoose.model('Module', moduleSchema)

module.exports = CourseModule
