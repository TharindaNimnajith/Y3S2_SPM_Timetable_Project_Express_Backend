const HttpErrorsModel = require('../models/http-errors')
const RoomModel = require('../models/rooms.model')

const addUnavailableTimes = async (req, res, next) => {
  let room
  let unavailableTimes = []

  const {
    id
  } = req.params

  const {
    unavailability
  } = req.body

  try {
    room = await RoomModel.findById(id)
  } catch (error) {
    console.log(error)
    return next(new HttpErrorsModel('Unexpected internal server error occurred, please try again later.', 500))
  }

  unavailableTimes.push(...room.unavailability, unavailability)
  room.unavailability = unavailableTimes

  try {
    await room.save()
  } catch (error) {
    console.log(error)
    return next(new HttpErrorsModel('Unexpected internal server error occurred, please try again later.', 500))
  }

  res.status(200).send({
    message: 'Room unavailability added successfully!'
  })
}

const removeUnavailableTimes = async (req, res, next) => {
  let room
  let unavailableTimes = []

  const {
    id
  } = req.params

  const {
    unavailabilityId
  } = req.body

  try {
    room = await RoomModel.findById(id)
  } catch (error) {
    console.log(error)
    return next(new HttpErrorsModel('Unexpected internal server error occurred, please try again later.', 500))
  }

  unavailableTimes.push(...room.unavailability)

  for (let i = 0; i < unavailableTimes.length; i++) {
    if (unavailableTimes[i].id === unavailabilityId) {
      unavailableTimes.splice(i, 1)
      room.unavailability = unavailableTimes
      try {
        await room.save()
      } catch (error) {
        console.log(error)
        return next(new HttpErrorsModel('Unexpected internal server error occurred, please try again later.', 500))
      }
      res.status(200).send({
        message: 'Room unavailability deleted successfully!'
      })
      break
    }
  }
}

exports.addUnavailableTimes = addUnavailableTimes
exports.removeUnavailableTimes = removeUnavailableTimes
