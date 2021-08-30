const HttpError = require('../models/http-errors')
const YearSems = require('../models/year-semester.model')

const createYearSems = async (req, res, next) => {
  const {year, semester, yearSemToken} = req.body

  const YearSemsItem = new YearSems({
    year,
    semester,
    yearSemToken
  })

  try {
    await YearSemsItem.save()
  } catch (err) {
    const error = new HttpError('Adding failed, please try again.', 500)
    res.json({message: 'Adding failed, please try again.', added: 0})
    return next(error)
  }

  res.status(201).json({
    yearSemsItem: YearSemsItem.toObject({getters: true}),
    message: 'Added Successfully',
    added: 1
  })
}

const getYearSems = async (req, res, next) => {
  YearSems.find({})
    .then((yearsems) =>
      res.json({yearsems: yearsems, message: 'got results'})
    )
    .catch((err) => res.status(400).json('Error: ' + err))
}

const editYearSems = async (req, res, next) => {
  const {yearsems, id} = req.body
  const query = {'_id': id}
  YearSems.findOneAndUpdate(query, yearsems, {upsert: true}, (err, item) => {
    if (err) return res.send(500, {error: err})
    return res.json({yearsems: item, message: 'got results'})
  })
}

const deleteYearSems = async (req, res, next) => {
  const {id} = req.body
  YearSems.findByIdAndDelete((id), {}, (err, item) => {
    if (err) return res.status(500).send(err)
  })
}

const getYearSem = async (req, res, next) => {
  let yearSem

  const {
    id
  } = req.params

  try {
    tag = await YearSems.findById(id)
  } catch (error) {
    console.log(error)
    return next(new HttpError('Unexpected internal server error occurred, please try again later.', 500))
  }

  res.status(200).send(tag)
}

exports.createYearSems = createYearSems
exports.editYearSems = editYearSems
exports.getYearSems = getYearSems
exports.getYearSem = getYearSem
exports.deleteYearSems = deleteYearSems

