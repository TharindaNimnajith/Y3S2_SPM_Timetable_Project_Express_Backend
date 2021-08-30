const HttpError = require('../models/http-errors')
const Groups = require('../models/groups.model')
const SubGroups = require('../models/sub-groups.model')

const createGroups = async (req, res, next) => {
  const {
    academicYear,
    academicSemester,
    academicYearAndSemester,
    programme,
    group,
    groupId,
    subGroups,
    availableSubGroup
  } = req.body
  const GroupsItem = new Groups({
    academicYear,
    academicSemester,
    academicYearAndSemester,
    programme,
    group,
    groupId,
    subGroups,
    availableSubGroup
  })
  try {
    await GroupsItem.save()
  } catch (err) {
    const error = new HttpError('Adding failed, please try again.', 500)
    res.json({message: 'Adding failed, please try again.', added: 0})
    return next(error)
  }
  res.status(201).json({
    groupsItem: GroupsItem.toObject({getters: true}),
    message: 'Added Successfully',
    added: 1
  })
}

const getGroups = async (req, res) => {
  Groups.find({})
    .then((groups) =>
      res.json({groups: groups, message: 'got results'})
    )
    .catch((err) => res.status(400).json('Error: ' + err))
}

const editGroups = async (req, res) => {
  const {groups, id} = req.body
  const query = {'_id': id}
  Groups.findOneAndUpdate(query, groups, {upsert: true}, (err, item) => {
    if (err) return res.send(500, {error: err})
    return res.json({groups: item, message: 'got results'})
  })
}

const getGroup = async (req, res, next) => {
  let group
  const {
    id
  } = req.params
  try {
    group = await Groups.findById(id)
  } catch (error) {
    console.log(error)
    return next(new HttpError('Unexpected internal server error occurred, please try again later.', 500))
  }
  res.status(200).send(group)
}

const deleteGroups = async (req, res) => {
  let subGroups
  const {
    id,
    groupId
  } = req.body
  subGroups = await SubGroups.find({
    groupId: groupId
  })
  for (let i = 0; i < subGroups.length; i++) {
    await subGroups[i].remove()
  }
  await Groups.findByIdAndDelete((id), (err) => {
    if (err) return res.status(500).send(err)
  })
}

const deleteSubGroupUpdate = async (req) => {
  let sub
  const {
    subKey,
    subId
  } = req.body
  sub = await SubGroups.findOne({
    subGroupId: subId
  })
  await sub.remove()
  await Groups.findOneAndUpdate(
    {},
    {$pull: {subGroups: {_id: subKey}}},
    {multi: true})
    .then(subGroups => console.log(subGroups))
    .catch(err => console.log(err))
}


const addNotAvailable = async (req, res, next) => {
  let group

  const {
    id
  } = req.params

  const {
    unavailability
  } = req.body

  try {
    group = await Groups.findById(id)
  } catch (error) {
    console.log(error)
    return next(new HttpErrorsModel('Unexpected internal server error occurred, please try again later.', 500))
  }

  group.unavailability =  unavailability


  try {
    await group.save()
  } catch (error) {
    console.log(error)
    return next(new HttpErrorsModel('Unexpected internal server error occurred, please try again later.', 500))
  }

  res.status(200).send({
    message: 'group not available added successfully!'
  })
}


exports.createGroups = createGroups
exports.editGroups = editGroups
exports.getGroups = getGroups
exports.getGroup = getGroup
exports.deleteGroups = deleteGroups
exports.deleteSubGroupUpdate = deleteSubGroupUpdate
exports.addNotAvailable = addNotAvailable