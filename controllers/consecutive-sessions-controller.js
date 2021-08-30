const HttpErrorsModel = require('../models/http-errors')
const SessionModel = require('../models/sessions.model')

const addConsecutiveSession = async (req, res, next) => {
  let session

  const {
    id
  } = req.params

  const {
    isConsecutive,
    consecutiveId,
    isSameRoom
  } = req.body

  try {
    session = await SessionModel.findById(id)
  } catch (error) {
    console.log(error)
    return next(new HttpErrorsModel('Unexpected internal server error occurred, please try again later.', 500))
  }

  session.isConsecutive = isConsecutive
  session.consecutiveId = consecutiveId
  session.isSameRoom = isSameRoom
  session.roomRef = null

  try {
    await session.save()
  } catch (error) {
    console.log(error)
    return next(new HttpErrorsModel('Unexpected internal server error occurred, please try again later.', 500))
  }

  res.status(200).send({
    message: 'Consecutive session added successfully!'
  })
}

exports.addConsecutiveSession = addConsecutiveSession
