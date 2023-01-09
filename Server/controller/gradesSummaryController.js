const GradesSummary = require('../models/gradesSummary')

const getOne = async (request, response) => {
  try {
    const { courseId } = request.params

    let result = await GradesSummary.findOne({ course: courseId }).populate({
      path: 'studentGrades.student',
      model: 'User'
    })

    if (!result) result = {}

    return response.json(result)
  } catch (err) {
    console.log(err)
    response.status(400).json({ error: err.message || err.toString() })
  }
}

module.exports = {
  getOne
}
