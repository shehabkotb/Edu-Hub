const { default: axios } = require('axios')
const Submission = require('../models/submission')
const { getFileType } = require('./getFileType')
const crawler = require('crawler-request')
const {
  pushNotification
} = require('../controller/notificationController/notificationController')
const Course = require('../models/course')
const { Assessment } = require('../models/assessment')

const plagiarismURL = 'http://127.0.0.1:5000/checkPlagiarism/many'

const plagarismMap = {
  '-2': 'processing',
  '-1': 'unCalculated',
  0: 'none',
  1: 'med',
  2: 'high',
  3: 'veryHigh'
}
const reversPlagarismMap = {
  processing: '-2',
  unCalculated: '-1',
  none: '0',
  med: '1',
  high: '2',
  veryHigh: '3'
}

const getMaxplagiarism = (plagiarismArray) => {
  const result = {}

  plagiarismArray.forEach((element) => {
    if (
      !(
        result.hasOwnProperty(element.index1) &&
        result[element.index1].plagiarism > element.plagiarism
      )
    ) {
      result[element.index1] = {
        plagiarism: element.plagiarism,
        from: element.index2
      }
    }
    if (
      !(
        result.hasOwnProperty(element.index2) &&
        result[element.index2].plagiarism > element.plagiarism
      )
    ) {
      result[element.index2] = {
        plagiarism: element.plagiarism,
        from: element.index1
      }
    }
  })

  return result
}

const savePlagiarism = async (allFiles, plagiarisms) => {
  // if no response return uncaluclated for all file submission
  if (Object.keys(plagiarisms).length === 0) {
    for (const file of allFiles) {
      file.parent().plagarismStatus = 'unCalculated'
      await file.parent().save()
    }
  }

  for (const key of Object.keys(plagiarisms)) {
    allFiles[key].plagarismFileStatus =
      plagarismMap[plagiarisms[key].plagiarism]
    allFiles[key].plagiarisedFrom =
      allFiles[plagiarisms[key].from].parent().student.name
    const existingPlagiarism = parseInt(
      reversPlagarismMap[allFiles[key].parent().plagarismStatus]
    )
    if (existingPlagiarism < parseInt(plagiarisms[key].plagiarism)) {
      allFiles[key].parent().plagarismStatus =
        plagarismMap[plagiarisms[key].plagiarism]
    }
    await allFiles[key].parent().save()
  }
}

const checkplagiarismJob = async function (courseId, assessmentId) {
  try {
    const submissions = await Submission.find({
      course: courseId,
      assessment: assessmentId,
      submittedAt: { $exists: true }
    })
      .populate('student', 'photo name')
      .exec()

    const parsedTexts = []
    const allFiles = []

    for (const sub of submissions) {
      for (const file of sub.files) {
        if (file.url && getFileType(file.url) === 'pdf') {
          const response = await crawler(file.url)

          const cleanedText = response.text.trim().replace(/\n/g, '')
          parsedTexts.push(cleanedText)
          file.text = cleanedText
          allFiles.push(file)
        }
      }
    }

    const response = await axios.post(plagiarismURL, {
      s: parsedTexts
    })
    const plagiarisms = getMaxplagiarism(response.data)
    await savePlagiarism(allFiles, plagiarisms)

    const course = await Course.findById(courseId)
    const assessment = await Assessment.findById(assessmentId)

    const instructorEnrollments = course.getInstructors()

    for (const enrollment of instructorEnrollments) {
      pushNotification(
        enrollment.user,
        JSON.stringify({
          title: `plagiarism checking for ${assessment.title} done`
        })
      )
    }
  } catch (e) {
    console.log(e.toString())

    const course = await Course.findById(courseId)
    const assessment = await Assessment.findById(assessmentId)

    const instructorEnrollments = course.getInstructors()

    for (const enrollment of instructorEnrollments) {
      pushNotification(
        enrollment.user,
        JSON.stringify({
          title: `plagiarism checking for ${assessment.title} failed`
        })
      )
    }

    await Submission.updateMany(
      { assessment: assessmentId, submittedAt: { $exists: true } },
      { plagarismStatus: 'unCalculated' },
      { omitUndefined: true }
    )
  }
}

module.exports = { checkplagiarismJob }
