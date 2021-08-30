const HttpError = require('../models/http-errors')
const GroupNums = require('../models/groupNums.model')

const createGroupNums = async (req, res, next) => {
  const {groupNum} = req.body

  const GroupNumsItem = new GroupNums({
    groupNum
  })

  try {
    await GroupNumsItem.save()
  } catch (err) {
    const error = new HttpError('Adding failed, please try again.', 500)
    res.json({message: 'Adding failed, please try again.', added: 0})
    return next(error)
  }

  res.status(201).json({
    groupNumsItem: GroupNumsItem.toObject({getters: true}),
    message: 'Added Successfully',
    added: 1
  })
}

const getGroupNums = async (req, res, next) => {
  GroupNums.find({})
    .then((groupNums) =>
      res.json({groupNums: groupNums, message: 'got results'})
    )
    .catch((err) => res.status(400).json('Error: ' + err))
}

const editGroupNums = async (req, res, next) => {
  const {groupNums, id} = req.body
  const query = {'_id': id}
  GroupNums.findOneAndUpdate(query, groupNums, {upsert: true}, (err, item) => {
    if (err) return res.send(500, {error: err})
    return res.json({groupNums: item, message: 'got results'})
  })
}

const deleteGroupNums = async (req, res, next) => {
  const {id} = req.body
  GroupNums.findByIdAndDelete((id), {}, (err, item) => {
    if (err) return res.status(500).send(err)
  })
}

const getGroupNum = async (req, res, next) => {
  let groupNum

  const {
    id
  } = req.params

  try {
    groupNum = await GroupNums.findById(id)
  } catch (error) {
    console.log(error)
    return next(new HttpError('Unexpected internal server error occurred, please try again later.', 500))
  }

  res.status(200).send(groupNum)
}

exports.createGroupNums = createGroupNums
exports.editGroupNums = editGroupNums
exports.getGroupNums = getGroupNums
exports.getGroupNum = getGroupNum
exports.deleteGroupNums = deleteGroupNums

