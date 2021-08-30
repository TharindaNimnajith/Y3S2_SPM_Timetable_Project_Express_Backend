const HttpError = require('../models/http-errors')
const Programs = require('../models/programs.model')

const createPrograms = async (req, res, next) => {
  const {name, programToken} = req.body

  const ProgramsItem = new Programs({
    name,
    programToken
  })

  try {
    await ProgramsItem.save()
  } catch (err) {
    const error = new HttpError('Adding failed, please try again.', 500)
    res.json({message: 'Adding failed, please try again.', added: 0})
    return next(error)
  }

  res.status(201).json({
    programsItem: ProgramsItem.toObject({getters: true}),
    message: 'Added Successfully',
    added: 1
  })
}

const getPrograms = async (req, res, next) => {
  Programs.find({})
    .then((programs) =>
      res.json({programs: programs, message: 'got results'})
    )
    .catch((err) => res.status(400).json('Error: ' + err))
}

const editPrograms = async (req, res, next) => {
  const {programs, id} = req.body
  const query = {'_id': id}
  Programs.findOneAndUpdate(query, programs, {upsert: true}, (err, item) => {
    if (err) return res.send(500, {error: err})
    return res.json({programs: item, message: 'got results'})
  })
}

const deletePrograms = async (req, res, next) => {
  const {id} = req.body
  Programs.findByIdAndDelete((id), {}, (err, item) => {
    if (err) return res.status(500).send(err)
  })
}

const getProgram = async (req, res, next) => {
  let program

  const {
    id
  } = req.params

  try {
    program = await Programs.findById(id)
  } catch (error) {
    console.log(error)
    return next(new HttpError('Unexpected internal server error occurred, please try again later.', 500))
  }

  res.status(200).send(program)
}

exports.createPrograms = createPrograms
exports.editPrograms = editPrograms
exports.getPrograms = getPrograms
exports.getProgram = getProgram
exports.deletePrograms = deletePrograms

