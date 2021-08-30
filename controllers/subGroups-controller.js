const HttpError = require('../models/http-errors')
const SubGroups = require('../models/sub-groups.model')

const createSubGroups = async (req, res, next) => {
  const {academicYear, academicSemester, academicYearAndSemester, programme, group, groupId, subGroup, subGroupId} = req.body

  const SubGroupsItem = new SubGroups({
    academicYear,
    academicSemester,
    academicYearAndSemester,
    programme,
    group,
    groupId,
    subGroup,
    subGroupId
  })

  try {
    await SubGroupsItem.save()
  } catch (err) {
    const error = new HttpError('Adding failed, please try again.', 500)
    res.json({message: 'Adding failed, please try again.', added: 0})
    return next(error)
  }

  res.status(201).json({
    subGroupsItem: SubGroupsItem.toObject({getters: true}),
    message: 'Added Successfully',
    added: 1
  })
}

const getSubGroups = async (req, res, next) => {
  SubGroups.find({})
    .then((subGroups) =>
      res.json({subGroups: subGroups, message: 'got results'})
    )
    .catch((err) => res.status(400).json('Error: ' + err))
}

const editSubGroups = async (req, res, next) => {
  const {subGroups, id} = req.body
  const query = {'_id': id}
  SubGroups.findOneAndUpdate(query, subGroups, {upsert: true}, (err, item) => {
    if (err) return res.send(500, {error: err})
    return res.json({subGroups: item, message: 'got results'})
  })
}

const deleteSubGroups = async (req, res, next) => {
  const {id} = req.body
  SubGroups.findByIdAndDelete((id), {}, (err, item) => {
    if (err) return res.status(500).send(err)
  })
}

const deleteSubGroupsWithSubId = async (req, res, next) => {
  const {subid} = req.body
  SubGroups.findOneAndDelete({subGroupId: subid}, {}, (err, item) => {

    if (err) return res.status(500).send(err)
  })
}

const deleteAllSubGroupsWithGroId = async (req, res, next) => {

  const {groupid} = req.body
  let subgroups = await SubGroups.find({
    groupId: groupid
  })

  for (let i = 0; i < subgroups.length; i++) {

    SubGroups.findByIdAndDelete((subgroups[i]._id), {}, (err, item) => {
      if (err) return res.status(500).send(err)
    })
  }
}

// const deleteSubGroups1 = async (req, res, next) => {
//   console.log('-------------------')
//   const {groupid} = req.body
//   // noinspection JSUnusedLocalSymbols
//   let subgroups = await SubGroups.find({
//     groupId:groupid
//   })
//   console.log(groupid)
//   console.log(subgroups)
//   for(let i=0; i<subgroups.length; i++) {
//     console.log('**********************')
//    await subgroups[i].remove
//   }
//   res.status(200).send({
//     message:'sub group deleted successfuly'
//   })
// }

const getSubGroup = async (req, res, next) => {
  let subGroup

  const {
    id
  } = req.params

  try {
    subGroup = await SubGroups.findById(id)
  } catch (error) {
    console.log(error)
    return next(new HttpError('Unexpected internal server error occurred, please try again later.', 500))
  }

  res.status(200).send(subGroup)
}


const addNotAvailable = async (req, res, next) => {
  let subgroup

  const {
    id
  } = req.params

  const {
    unavailability
  } = req.body

  try {
    subgroup = await SubGroups.findById(id)
  } catch (error) {
    console.log(error)
    return next(new HttpErrorsModel('Unexpected internal server error occurred, please try again later.', 500))
  }

  subgroup.unavailability =  unavailability


  try {
    await subgroup.save()
  } catch (error) {
    console.log(error)
    return next(new HttpErrorsModel('Unexpected internal server error occurred, please try again later.', 500))
  }

  res.status(200).send({
    message: 'subgroup not available added successfully!'
  })
}


exports.createSubGroups = createSubGroups
exports.editSubGroups = editSubGroups
exports.getSubGroups = getSubGroups
exports.getSubGroup = getSubGroup
exports.deleteSubGroups = deleteSubGroups
exports.deleteAllSubGroupsWithGroId = deleteAllSubGroupsWithGroId
exports.deleteSubGroupsWithSubId = deleteSubGroupsWithSubId
exports.addNotAvailable = addNotAvailable
