const Course = require('../../models/course')

const getAllModules = async (request, response) => {
  try {
    const course = await Course.findById(request.params.courseId).orFail()
    return response.json(course.modulesJSON())
  } catch (err) {
    console.log(err)
    response.status(400).json({ error: err.message || err.toString() })
  }
}

const getOneModule = async (request, response) => {
  try {
    const course = await Course.findById(request.params.courseId).orFail()
    const result = course.modules.id(request.params.id)
    if (!result) return response.status(404).json({ error: 'module not found' })

    return response.json(result.toJSON())
  } catch (err) {
    console.log(err)
    response.status(400).json({ error: err.message || err.toString() })
  }
}

const createModule = async (request, response) => {
  const body = request.body
  if (!body.title)
    return response.status(400).json({ error: 'missing Module title' })

  try {
    const course = await Course.findById(request.params.courseId).orFail()
    await course.modules.push({ title: body.title })
    const updatedCourse = await course.save()

    return response.json(updatedCourse.modulesJSON())
  } catch (err) {
    console.log(err)
    response.status(400).json({ error: err.message || err.toString() })
  }
}

const updateModule = async (request, response) => {
  const body = request.body
  if (!body.title) return response.status(400).json({ error: 'missing title' })

  try {
    const course = await Course.findById(request.params.courseId).orFail()
    const updatedModule = course.modules.id(request.params.id)
    if (!updatedModule)
      return response.status(404).json({ error: 'module not found' })

    updatedModule.title = body.title
    updatedModule.markModified('modules')
    const result = await course.save()

    // return all modules with update
    return response.json(result.modulesJSON())
  } catch (err) {
    console.log(err)
    response.status(400).json({ error: err.message || err.toString() })
  }
}

const deleteModule = async (request, response) => {
  try {
    const course = await Course.findById(request.params.courseId).orFail()

    const moduleToDelete = course.modules.id(request.params.id)
    if (!moduleToDelete)
      return response.status(404).json({ error: 'module not found' })

    await moduleToDelete.remove()
    const result = await course.save()
    response.json(result.modulesJSON())
  } catch (err) {
    console.log(err)
    response.status(400).json({ error: err.message || err.toString() })
  }
}

module.exports = {
  getAllModules,
  getOneModule,
  createModule,
  updateModule,
  deleteModule
}
