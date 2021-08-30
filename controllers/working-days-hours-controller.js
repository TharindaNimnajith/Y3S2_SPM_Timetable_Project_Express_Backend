const HttpError = require('../models/http-errors')
const WorkingDaysAndHours = require('../models/woking-days-hours-model')

const createWorkingDaysAndHours = async (req, res, next) => {
  const {numberOfWorkingDays, workingDays, workingTimePerDay, timeSlots, weekType} = req.body

  const WorkingDaysAndHoursItem = new WorkingDaysAndHours({
    numberOfWorkingDays,
    workingDays,
    workingTimePerDay,
    timeSlots,
    weekType
  })

  try {
    await WorkingDaysAndHoursItem.save()
  } catch (err) {
    const error = new HttpError('Adding failed, please try again.', 500)
    res.json({message: 'Adding failed, please try again.', added: 0})
    return next(error)
  }

  res.status(201).json({
    workingDaysAndHoursItem: WorkingDaysAndHoursItem.toObject({getters: true}),
    message: 'Added Successfully',
    added: 1
  })
}

const getWorkingDaysAndHours = async (req, res, next) => {
  WorkingDaysAndHours.find({})
    .then((workingDaysAndHours) =>
      res.json({workingDaysAndHours: workingDaysAndHours, message: 'got results'})
    )
    .catch((err) => res.status(400).json('Error: ' + err))
}

const editWorkingDaysAndHours = async (req, res, next) => {
  const {workingDaysAndHours, id} = req.body
  const query = {'_id': id}
  WorkingDaysAndHours.findOneAndUpdate(query, workingDaysAndHours, {upsert: true}, (err, item) => {
    if (err) return res.send(500, {error: err})
    return res.json({workingDaysAndHours: item, message: 'got results'})
  })
}

const deleteWorkingDaysAndHours = async (req, res, next) => {
  const {id} = req.body
  WorkingDaysAndHours.findByIdAndDelete((id), {}, (err, item) => {
    if (err) return res.status(500).send(err)
  })
}

exports.createWorkingDaysAndHours = createWorkingDaysAndHours
exports.editWorkingDaysAndHours = editWorkingDaysAndHours
exports.getWorkingDaysAndHours = getWorkingDaysAndHours
exports.deleteWorkingDaysAndHours = deleteWorkingDaysAndHours
