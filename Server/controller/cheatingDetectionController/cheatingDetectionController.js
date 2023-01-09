const CheatingBatchCount = require('../../models/cheatingBatchCount')
const User = require('../../models/user')
const { Assessment, Exam, Assignment } = require('../../models/assessment')
const {
  subscribe,
  pushNotification,
  createNotification,
  editNotification,
  deleteNotification,
  broadcastToUsers,
  getNotificationsOfUser
} = require('../notificationController/notificationController')
const axios = require('axios')

const awsCheatingDetectionUrl = '';

const detectCheating = async (req, res) => {
  try {
    const user = req.user
    var cheatingBatchCount = await CheatingBatchCount.findOne({
      student: user
    }).exec()

    if (!cheatingBatchCount) {
      cheatingBatchCount = new CheatingBatchCount({ student: user })
      await cheatingBatchCount.save()
      var count = cheatingBatchCount.counter
      console.log('new counter added')
    } else {
      var count = cheatingBatchCount.counter + 1
      if (count === 7) {
        console.log('call lambda as count=' + count)
        CheatingBatchCount.findByIdAndUpdate(cheatingBatchCount._id, {
          $set: { counter: 0 }
        }).exec()

        const exam = await Assessment.findById(req.body.examId).populate({
          path: 'course',
          populate: {
            path: 'enrollments.user',
            model: 'User'
          }
        })

        var examType = exam.questionsType
        var instructors = exam.course.enrollments.filter(
          (val) => val.enrolledAs === 'instructor'
        )

        instructors = instructors.map((item) => item.user.email)

        axios.post(
                  awsCheatingDetectionUrl,
                  {
                    path: user.name + ':' + user._id,
                    username: user.name,
                    userId: user._id,
                    examId: req.body.examId,
                    examType: examType,
                    InstructorEmail: instructors,
                    //InstructorEmail: ['omarhazem6@gmail.com']
                  }
                )
                .then(console.log('lambda called without errors'))
                .catch((e) => {
                  console.log(e)
                  res.status(502).send('error in lambda: ' + e)
                })
      } else {
        CheatingBatchCount.findByIdAndUpdate(cheatingBatchCount._id, {
          $set: { counter: count }
        }).exec()
      }
      console.log(count)
      console.log('counter found')
    }

    res.status(200).send(count.toString())
  } catch (e) {
    console.log(e)
    res.status(500).send('error in db: ' + e)
  }
}

const clear = async (req, res) => {
  try {
    user = req.user
    await CheatingBatchCount.findOneAndDelete({
      student: user
    }).exec()
    console.log('counter cleared')
    res.status(200).send('cleared')
  } catch (e) {
    res.status(400).send(e)
  }
}

const getResult = async (req, res) => {
  try {
    console.log('push')
    const userId = req.body.userId
    const username = req.body.username
    const examId = req.body.examId //to get the instructorId
    const student = await User.findById(userId).exec()
    if (!student) {
      res.status(400).send('wronge studentId')
    } else {
      //push notification to the instructor using examId and the student
      pushNotification(
        student,
        JSON.stringify({
          title:
            'cheating action detected review with the instructor for the case report'
        })
      )
      //pushNotification(instructor, "cheating action detected from student: "+user.name);
      res.status(200).send('notified')
    }
  } catch (e) {
    res.status(400).send(e)
  }
}

module.exports = { detectCheating, clear, getResult }
