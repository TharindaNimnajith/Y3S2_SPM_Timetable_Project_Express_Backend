const HttpErrorsModel = require('../models/http-errors')
const SessionModel = require('../models/sessions.model')
const RoomModel = require('../models/rooms.model')
const TagModel = require('../models/tags.model')
const LecturerModel = require('../models/lecturers.model')
const GroupModel = require('../models/groups.model')
const SubGroupModel = require('../models/sub-groups.model')
const SubjectTagModel = require('../models/subject-tag.model')

const addSession = async (req, res, next) => {
  const {
    lecturers,
    subjectRef,
    subjectCodeRef,
    tagRef,
    groupRef,
    subGroupRef,
    studentCount,
    duration,
    isParallel,
    parallelId,
    isConsecutive,
    consecutiveId,
    isSameRoom
  } = req.body

  const newSession = new SessionModel({
    lecturers,
    subjectRef,
    subjectCodeRef,
    tagRef,
    groupRef,
    subGroupRef,
    studentCount,
    duration,
    isParallel,
    parallelId,
    isConsecutive,
    consecutiveId,
    isSameRoom
  })

  try {
    await newSession.save()
  } catch (error) {
    console.log(error)
    return next(new HttpErrorsModel('Unexpected internal server error occurred, please try again later.', 500))
  }

  res.status(201).send({
    message: 'New session added successfully!'
  })
}

const getSession = async (req, res, next) => {
  let session

  const {
    id
  } = req.params

  try {
    session = await SessionModel.findById(id)
  } catch (error) {
    console.log(error)
    return next(new HttpErrorsModel('Unexpected internal server error occurred, please try again later.', 500))
  }

  res.status(200).send(session)
}

const getSessionList = async (req, res, next) => {
  let sessionList

  try {
    sessionList = await SessionModel.find()
  } catch (error) {
    console.log(error)
    return next(new HttpErrorsModel('Unexpected internal server error occurred, please try again later.', 500))
  }

  res.status(200).send(sessionList)
}

const addRoomForSession = async (req, res, next) => {
  let session

  const {
    sessionId,
    room
  } = req.body

  try {
    session = await SessionModel.findOne({
      sessionId: sessionId
    })
  } catch (error) {
    console.log(error)
    return next(new HttpErrorsModel('Unexpected internal server error occurred, please try again later.', 500))
  }

  if (room === "")
    session.roomRef = null
  else
    session.roomRef = room

  if (session.roomRef !== null && session.isParallel) {
    try {
      let parallelSession = await SessionModel.findOne({
        parallelId: session.parallelId,
        sessionId: {
          '$ne': session.sessionId
        }
      })
      if (parallelSession.roomRef === session.roomRef) {
        res.json({
          exists: true,
          message: 'A parallel session with the same room already exists.'
        })
        return next(new HttpErrorsModel('A parallel session with the same room already exists.', 409))
      }
    } catch (error) {
      console.log(error)
      return next(new HttpErrorsModel('Unexpected internal server error occurred, please try again later.', 500))
    }
  }

  try {
    await session.save()
  } catch (error) {
    console.log(error)
    return next(new HttpErrorsModel('Unexpected internal server error occurred, please try again later.', 500))
  }

  if (session.isConsecutive && session.isSameRoom) {
    try {
      let consecutiveSession = await SessionModel.findOne({
        consecutiveId: session.consecutiveId,
        sessionId: {
          '$ne': session.sessionId
        }
      })
      consecutiveSession.roomRef = session.roomRef
      try {
        await consecutiveSession.save()
      } catch (error) {
        console.log(error)
        return next(new HttpErrorsModel('Unexpected internal server error occurred, please try again later.', 500))
      }
    } catch (error) {
      console.log(error)
      return next(new HttpErrorsModel('Unexpected internal server error occurred, please try again later.', 500))
    }
  }

  res.status(200).send({
    message: 'Session updated successfully!'
  })
}

const getRoomList = async (req, res, next) => {
  let roomList

  try {
    roomList = await RoomModel.find()
  } catch (error) {
    console.log(error)
    return next(new HttpErrorsModel('Unexpected internal server error occurred, please try again later.', 500))
  }

  for (let i = 0; i < roomList.length; i++)
    roomList[i].roomCapacity = roomList[i].roomCapacity.toString()

  res.status(200).send(roomList)
}

const getPossibleRoomsForSession = async (req, res, next) => {
  let session

  const {
    id
  } = req.params

  try {
    session = await SessionModel.findOne({
      sessionId: id
    })
  } catch (error) {
    console.log(error)
    return next(new HttpErrorsModel('Unexpected internal server error occurred, please try again later.', 500))
  }

  res.status(200).send(session.possibleRooms)
}

const setPossibleRoomsForSession = async (req, res, next) => {
  let session

  const {
    id
  } = req.params

  const {
    possibleRooms
  } = req.body

  try {
    session = await SessionModel.findOne({
      sessionId: id
    })
  } catch (error) {
    console.log(error)
    return next(new HttpErrorsModel('Unexpected internal server error occurred, please try again later.', 500))
  }

  session.possibleRooms = possibleRooms

  try {
    await session.save()
  } catch (error) {
    console.log(error)
    return next(new HttpErrorsModel('Unexpected internal server error occurred, please try again later.', 500))
  }

  res.status(200).send({
    message: 'Session updated successfully!'
  })
}

const setPossibleRoomsForSessions = async (req, res, next) => {
  let sessionList
  let roomList
  let tagList
  let subjectTagList
  let lecturerList
  let groupList
  let subGroupList

  try {
    sessionList = await SessionModel.find()
  } catch (error) {
    console.log(error)
    return next(new HttpErrorsModel('Unexpected internal server error occurred, please try again later.', 500))
  }

  try {
    roomList = await RoomModel.find()
  } catch (error) {
    console.log(error)
    return next(new HttpErrorsModel('Unexpected internal server error occurred, please try again later.', 500))
  }

  try {
    tagList = await TagModel.find()
  } catch (error) {
    console.log(error)
    return next(new HttpErrorsModel('Unexpected internal server error occurred, please try again later.', 500))
  }

  try {
    subjectTagList = await SubjectTagModel.find()
  } catch (error) {
    console.log(error)
    return next(new HttpErrorsModel('Unexpected internal server error occurred, please try again later.', 500))
  }

  try {
    lecturerList = await LecturerModel.find()
  } catch (error) {
    console.log(error)
    return next(new HttpErrorsModel('Unexpected internal server error occurred, please try again later.', 500))
  }

  try {
    groupList = await GroupModel.find()
  } catch (error) {
    console.log(error)
    return next(new HttpErrorsModel('Unexpected internal server error occurred, please try again later.', 500))
  }

  try {
    subGroupList = await SubGroupModel.find()
  } catch (error) {
    console.log(error)
    return next(new HttpErrorsModel('Unexpected internal server error occurred, please try again later.', 500))
  }

  let roomArray = []

  for (let i = 0; i < roomList.length; i++)
    roomArray = [...roomArray, roomList[i].roomName]

  for (let i = 0; i < sessionList.length; i++) {
    let session = sessionList[i]
    let tag = tagList.filter(tagObj => tagObj.name === session.tagRef)
    let tagPossibleRoomsArray = []
    if (tag.length > 0) {
      let tagPossibleRooms = tag[0].possibleRooms
      for (let count = 0; count < tagPossibleRooms.length; count++)
        tagPossibleRoomsArray = [...tagPossibleRoomsArray, tagPossibleRooms[count].roomRef]
    }
    if (tagPossibleRoomsArray.length === 0)
      tagPossibleRoomsArray = roomArray
    let subjectTag = subjectTagList.filter(subjectTagObj => subjectTagObj.tagRef === session.tagRef
      && subjectTagObj.subjectRef === session.subjectCodeRef)
    let subjectTagPossibleRoomsArray = []
    if (subjectTag.length > 0) {
      let subjectTagPossibleRooms = subjectTag[0].possibleRooms
      for (let count = 0; count < subjectTagPossibleRooms.length; count++) {
        subjectTagPossibleRoomsArray = [...subjectTagPossibleRoomsArray, {
          roomName: subjectTagPossibleRooms[count].roomRef
        }]
      }
    }
    let lecturer = lecturerList.filter(lecturerObj => lecturerObj.lecturerName === session.lecturers[0].lecturerRef)
    let lecturerPossibleRoomsArray = []
    if (lecturer.length > 0) {
      let lecturerPossibleRooms = lecturer[0].possibleRooms
      for (let count = 0; count < lecturerPossibleRooms.length; count++)
        lecturerPossibleRoomsArray = [...lecturerPossibleRoomsArray, lecturerPossibleRooms[count].roomRef]
    }
    if (lecturerPossibleRoomsArray.length === 0)
      lecturerPossibleRoomsArray = roomArray
    let group = groupList.filter(groupObj => groupObj.groupId === session.groupRef)
    let groupPossibleRoomsArray = []
    if (group.length > 0) {
      let groupPossibleRooms = group[0].possibleRooms
      for (let count = 0; count < groupPossibleRooms.length; count++)
        groupPossibleRoomsArray = [...groupPossibleRoomsArray, groupPossibleRooms[count].roomRef]
    }
    if (groupPossibleRoomsArray.length === 0)
      groupPossibleRoomsArray = roomArray
    let subGroup = subGroupList.filter(subGroupObj => subGroupObj.subGroupId === session.subGroupRef)
    let subGroupPossibleRoomsArray = []
    if (subGroup.length > 0) {
      let subGroupPossibleRooms = subGroup[0].possibleRooms
      for (let count = 0; count < subGroupPossibleRooms.length; count++)
        subGroupPossibleRoomsArray = [...subGroupPossibleRoomsArray, subGroupPossibleRooms[count].roomRef]
    }
    if (subGroupPossibleRoomsArray.length === 0)
      subGroupPossibleRoomsArray = roomArray
    let possibleRooms = []
    if (subjectTagPossibleRoomsArray.length === 0) {
      for (let j = 0; j < roomList.length; j++) {
        let room = roomList[j]
        if (session.studentCount <= room.roomCapacity) {
          if (tagPossibleRoomsArray.includes(room.roomName)) {
            if (lecturerPossibleRoomsArray.includes(room.roomName)) {
              if (groupPossibleRoomsArray.includes(room.roomName)) {
                if (subGroupPossibleRoomsArray.includes(room.roomName)) {
                  possibleRooms = [...possibleRooms, {
                    roomName: room.roomName
                  }]
                }
              }
            }
          }
        }
      }
    } else {
      possibleRooms = subjectTagPossibleRoomsArray
    }
    session.possibleRooms = possibleRooms
    try {
      await session.save()
    } catch (error) {
      console.log(error)
      return next(new HttpErrorsModel('Unexpected internal server error occurred, please try again later.', 500))
    }
    if (session.roomRef !== null && session.isConsecutive && session.isSameRoom) {
      try {
        let consecutiveSession = await SessionModel.findOne({
          consecutiveId: session.consecutiveId,
          sessionId: {
            '$ne': session.sessionId
          }
        })
        if (consecutiveSession.roomRef === null) {
          consecutiveSession.roomRef = session.roomRef
          try {
            await consecutiveSession.save()
          } catch (error) {
            console.log(error)
            return next(new HttpErrorsModel('Unexpected internal server error occurred, please try again later.', 500))
          }
        }
      } catch (error) {
        console.log(error)
        return next(new HttpErrorsModel('Unexpected internal server error occurred, please try again later.', 500))
      }
    }
  }

  res.status(200).send({
    message: 'Sessions updated successfully!'
  })
}

exports.addSession = addSession
exports.getSession = getSession
exports.getSessionList = getSessionList
exports.addRoomForSession = addRoomForSession
exports.getRoomList = getRoomList
exports.getPossibleRoomsForSession = getPossibleRoomsForSession
exports.setPossibleRoomsForSession = setPossibleRoomsForSession
exports.setPossibleRoomsForSessions = setPossibleRoomsForSessions
