const Course = require('../../models/course')

const getAllVideos = async (request, response) => {
  try {
    const course = await Course.findById(request.params.courseId).orFail()
    const videos = await course.getVideos()
    return response.json(videos)
  } catch (err) {
    console.log(err)
    response.status(400).json({ error: err.message || err.toString() })
  }
}

module.exports = {
  getAllVideos
}
