const HttpError = require('../models/http-errors')
const SubGroupNums = require('../models/subGroupNums.model')

const createSubGroupNums = async (req, res, next) => {
  const {subGroupNum} = req.body

  const SubGroupNumsItem = new SubGroupNums({
    subGroupNum
  })

  try {
    await SubGroupNumsItem.save()
  } catch (err) {
    const error = new HttpError('Adding failed, please try again.', 500)
    res.json({message: 'Adding failed, please try again.', added: 0})
    return next(error)
  }

  res.status(201).json({
    subGroupNumsItem: SubGroupNumsItem.toObject({getters: true}),
    message: 'Added Successfully',
    added: 1
  })
}

const getSubGroupNums = async (req, res, next) => {
  SubGroupNums.find({})
    .then((subGroupNums) =>
      res.json({subGroupNums: subGroupNums, message: 'got results'})
    )
    .catch((err) => res.status(400).json('Error: ' + err))
}

const editSubGroupNums = async (req, res, next) => {
  const {subGroupNums, id} = req.body
  const query = {'_id': id}
  SubGroupNums.findOneAndUpdate(query, subGroupNums, {upsert: true}, (err, item) => {
    if (err) return res.send(500, {error: err})
    return res.json({subGroupNums: item, message: 'got results'})
  })
}

const deleteSubGroupNums = async (req, res, next) => {
  const {id} = req.body
  SubGroupNums.findByIdAndDelete((id), {}, (err, item) => {
    if (err) return res.status(500).send(err)
  })
}

const getSubGroupNum = async (req, res, next) => {
  let subGroupNum

  const {
    id
  } = req.params

  try {
    subGroupNum = await SubGroupNums.findById(id)
  } catch (error) {
    console.log(error)
    return next(new HttpError('Unexpected internal server error occurred, please try again later.', 500))
  }

  res.status(200).send(subGroupNum)
}

exports.createSubGroupNums = createSubGroupNums
exports.editSubGroupNums = editSubGroupNums
exports.getSubGroupNums = getSubGroupNums
exports.getSubGroupNum = getSubGroupNum
exports.deleteSubGroupNums = deleteSubGroupNums

