const HttpErrorsModel = require('../models/http-errors')
const RoomModel = require('../models/rooms.model')
const BuildingModel = require('../models/buildings.model')
const TagModel = require('../models/tags.model')
const SubjectModel = require('../models/subjects.model')
const LecturerModel = require('../models/lecturers.model')
const GroupModel = require('../models/groups.model')
const SubGroupModel = require('../models/sub-groups.model')
const SubjectTagModel = require('../models/subject-tag.model')

const getRoomList = async (req, res, next) => {
  let roomList

  try {
    roomList = await RoomModel.find()
  } catch (error) {
    console.log(error)
    return next(new HttpErrorsModel('Unexpected internal server error occurred, please try again later.', 500))
  }

  res.status(200).send(roomList)
}

const getBuildingList = async (req, res, next) => {
  let buildingList

  try {
    buildingList = await BuildingModel.find()
  } catch (error) {
    console.log(error)
    return next(new HttpErrorsModel('Unexpected internal server error occurred, please try again later.', 500))
  }

  res.status(200).send(buildingList)
}

const getTagList = async (req, res, next) => {
  let tagList

  try {
    tagList = await TagModel.find()
  } catch (error) {
    console.log(error)
    return next(new HttpErrorsModel('Unexpected internal server error occurred, please try again later.', 500))
  }

  res.status(200).send(tagList)
}

const getSubjectList = async (req, res, next) => {
  let subjectList

  try {
    subjectList = await SubjectModel.find()
  } catch (error) {
    console.log(error)
    return next(new HttpErrorsModel('Unexpected internal server error occurred, please try again later.', 500))
  }

  res.status(200).send(subjectList)
}

const getLecturerList = async (req, res, next) => {
  let lecturerList

  try {
    lecturerList = await LecturerModel.find()
  } catch (error) {
    console.log(error)
    return next(new HttpErrorsModel('Unexpected internal server error occurred, please try again later.', 500))
  }

  res.status(200).send(lecturerList)
}

const getGroupList = async (req, res, next) => {
  let groupList

  try {
    groupList = await GroupModel.find()
  } catch (error) {
    console.log(error)
    return next(new HttpErrorsModel('Unexpected internal server error occurred, please try again later.', 500))
  }

  res.status(200).send(groupList)
}

const getSubGroupList = async (req, res, next) => {
  let subGroupList

  try {
    subGroupList = await SubGroupModel.find()
  } catch (error) {
    console.log(error)
    return next(new HttpErrorsModel('Unexpected internal server error occurred, please try again later.', 500))
  }

  res.status(200).send(subGroupList)
}

const getSubjectTagList = async (req, res, next) => {
  let subjectTagList

  try {
    subjectTagList = await SubjectTagModel.find()
  } catch (error) {
    console.log(error)
    return next(new HttpErrorsModel('Unexpected internal server error occurred, please try again later.', 500))
  }

  res.status(200).send(subjectTagList)
}

const addRoomsToTags = async (req, res, next) => {
  let tagObject

  const {
    tag,
    possibleRooms
  } = req.body

  try {
    tagObject = await TagModel.findOne({
      name: tag
    })
  } catch (error) {
    console.log(error)
    return next(new HttpErrorsModel('Unexpected internal server error occurred, please try again later.', 500))
  }

  tagObject.possibleRooms = possibleRooms

  try {
    await tagObject.save()
  } catch (error) {
    console.log(error)
    return next(new HttpErrorsModel('Unexpected internal server error occurred, please try again later.', 500))
  }

  res.status(200).send({
    message: 'Tag updated successfully!'
  })
}

const addRoomsToSubjectAndTag = async (req, res, next) => {
  let existingSubjectAndTagObject
  let newSubjectAndTagObject

  const {
    subject,
    subjectTag,
    possibleRooms
  } = req.body

  try {
    existingSubjectAndTagObject = await SubjectTagModel.findOne({
      subjectRef: subject,
      tagRef: subjectTag
    })
  } catch (error) {
    console.log(error)
    return next(new HttpErrorsModel('Unexpected internal server error occurred, please try again later.', 500))
  }

  if (existingSubjectAndTagObject) {
    existingSubjectAndTagObject.possibleRooms = possibleRooms
    try {
      await existingSubjectAndTagObject.save()
    } catch (error) {
      console.log(error)
      return next(new HttpErrorsModel('Unexpected internal server error occurred, please try again later.', 500))
    }
    res.status(200).send({
      message: 'Subject and tag updated successfully!'
    })
  } else {
    newSubjectAndTagObject = new SubjectTagModel({
      subjectRef: subject,
      tagRef: subjectTag,
      possibleRooms
    })
    try {
      await newSubjectAndTagObject.save()
    } catch (error) {
      console.log(error)
      return next(new HttpErrorsModel('Unexpected internal server error occurred, please try again later.', 500))
    }
    res.status(200).send({
      message: 'Subject and tag added successfully!'
    })
  }
}

const addRoomsToLecturer = async (req, res, next) => {
  let lecturerObject

  const {
    lecturer,
    possibleRooms
  } = req.body

  try {
    lecturerObject = await LecturerModel.findOne({
      lecturerName: lecturer
    })
  } catch (error) {
    console.log(error)
    return next(new HttpErrorsModel('Unexpected internal server error occurred, please try again later.', 500))
  }

  lecturerObject.possibleRooms = possibleRooms

  try {
    await lecturerObject.save()
  } catch (error) {
    console.log(error)
    return next(new HttpErrorsModel('Unexpected internal server error occurred, please try again later.', 500))
  }

  res.status(200).send({
    message: 'Lecturer updated successfully!'
  })
}

const addRoomsToGroup = async (req, res, next) => {
  let groupObject

  const {
    group,
    possibleRooms
  } = req.body

  try {
    groupObject = await GroupModel.findOne({
      groupId: group
    })
  } catch (error) {
    console.log(error)
    return next(new HttpErrorsModel('Unexpected internal server error occurred, please try again later.', 500))
  }

  groupObject.possibleRooms = possibleRooms

  try {
    await groupObject.save()
  } catch (error) {
    console.log(error)
    return next(new HttpErrorsModel('Unexpected internal server error occurred, please try again later.', 500))
  }

  res.status(200).send({
    message: 'Group updated successfully!'
  })
}

const addRoomsToSubGroup = async (req, res, next) => {
  let subGroupObject

  const {
    subGroup,
    possibleRooms
  } = req.body

  try {
    subGroupObject = await SubGroupModel.findOne({
      subGroupId: subGroup
    })
  } catch (error) {
    console.log(error)
    return next(new HttpErrorsModel('Unexpected internal server error occurred, please try again later.', 500))
  }

  subGroupObject.possibleRooms = possibleRooms

  try {
    await subGroupObject.save()
  } catch (error) {
    console.log(error)
    return next(new HttpErrorsModel('Unexpected internal server error occurred, please try again later.', 500))
  }

  res.status(200).send({
    message: 'Sub group updated successfully!'
  })
}

const getPossibleRoomsByTag = async (req, res, next) => {
  let tagObject
  let possibleRooms = []
  let possibleRoomsObject = []

  const {
    tag
  } = req.body

  try {
    tagObject = await TagModel.findOne({
      name: tag
    })
  } catch (error) {
    console.log(error)
    return next(new HttpErrorsModel('Unexpected internal server error occurred, please try again later.', 500))
  }

  if (tagObject !== null)
    possibleRoomsObject = tagObject.possibleRooms

  for (let i = 0; i < possibleRoomsObject.length; i++)
    possibleRooms = [...possibleRooms, possibleRoomsObject[i].roomRef]

  res.status(200).send({
    possibleRooms,
    possibleRoomsObject
  })
}

const getPossibleRoomsBySubjectAndTag = async (req, res, next) => {
  let subjectTagObject
  let possibleRooms = []
  let possibleRoomsObject = []

  const {
    subject,
    tag
  } = req.body

  try {
    subjectTagObject = await SubjectTagModel.findOne({
      subjectRef: subject,
      tagRef: tag
    })
  } catch (error) {
    console.log(error)
    return next(new HttpErrorsModel('Unexpected internal server error occurred, please try again later.', 500))
  }

  if (subjectTagObject !== null)
    possibleRoomsObject = subjectTagObject.possibleRooms

  for (let i = 0; i < possibleRoomsObject.length; i++)
    possibleRooms = [...possibleRooms, possibleRoomsObject[i].roomRef]

  res.status(200).send({
    possibleRooms,
    possibleRoomsObject
  })
}

const getPossibleRoomsByLecturer = async (req, res, next) => {
  let lecturerObject
  let possibleRooms = []
  let possibleRoomsObject = []

  const {
    lecturer
  } = req.body

  try {
    lecturerObject = await LecturerModel.findOne({
      lecturerName: lecturer
    })
  } catch (error) {
    console.log(error)
    return next(new HttpErrorsModel('Unexpected internal server error occurred, please try again later.', 500))
  }

  if (lecturerObject !== null)
    possibleRoomsObject = lecturerObject.possibleRooms

  for (let i = 0; i < possibleRoomsObject.length; i++)
    possibleRooms = [...possibleRooms, possibleRoomsObject[i].roomRef]

  res.status(200).send({
    possibleRooms,
    possibleRoomsObject
  })
}

const getPossibleRoomsByGroup = async (req, res, next) => {
  let groupObject
  let possibleRooms = []
  let possibleRoomsObject = []

  const {
    group
  } = req.body

  try {
    groupObject = await GroupModel.findOne({
      groupId: group
    })
  } catch (error) {
    console.log(error)
    return next(new HttpErrorsModel('Unexpected internal server error occurred, please try again later.', 500))
  }

  if (groupObject !== null)
    possibleRoomsObject = groupObject.possibleRooms

  for (let i = 0; i < possibleRoomsObject.length; i++)
    possibleRooms = [...possibleRooms, possibleRoomsObject[i].roomRef]

  res.status(200).send({
    possibleRooms,
    possibleRoomsObject
  })
}

const getPossibleRoomsBySubGroup = async (req, res, next) => {
  let subGroupObject
  let possibleRooms = []
  let possibleRoomsObject = []

  const {
    subGroup
  } = req.body

  try {
    subGroupObject = await SubGroupModel.findOne({
      subGroupId: subGroup
    })
  } catch (error) {
    console.log(error)
    return next(new HttpErrorsModel('Unexpected internal server error occurred, please try again later.', 500))
  }

  if (subGroupObject !== null)
    possibleRoomsObject = subGroupObject.possibleRooms

  for (let i = 0; i < possibleRoomsObject.length; i++)
    possibleRooms = [...possibleRooms, possibleRoomsObject[i].roomRef]

  res.status(200).send({
    possibleRooms,
    possibleRoomsObject
  })
}

exports.getRoomList = getRoomList
exports.getBuildingList = getBuildingList
exports.getTagList = getTagList
exports.getSubjectList = getSubjectList
exports.getLecturerList = getLecturerList
exports.getGroupList = getGroupList
exports.getSubGroupList = getSubGroupList
exports.getSubjectTagList = getSubjectTagList
exports.addRoomsToTags = addRoomsToTags
exports.addRoomsToSubjectAndTag = addRoomsToSubjectAndTag
exports.addRoomsToLecturer = addRoomsToLecturer
exports.addRoomsToGroup = addRoomsToGroup
exports.addRoomsToSubGroup = addRoomsToSubGroup
exports.getPossibleRoomsByTag = getPossibleRoomsByTag
exports.getPossibleRoomsBySubjectAndTag = getPossibleRoomsBySubjectAndTag
exports.getPossibleRoomsByLecturer = getPossibleRoomsByLecturer
exports.getPossibleRoomsByGroup = getPossibleRoomsByGroup
exports.getPossibleRoomsBySubGroup = getPossibleRoomsBySubGroup
