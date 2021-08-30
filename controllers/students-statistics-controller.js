const HttpErrorsModel = require('../models/http-errors')
const GroupModel = require('../models/groups.model')
const SubGroupModel = require('../models/sub-groups.model')

const addGroup = async (req, res, next) => {
  let existingGroup

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

  try {
    existingGroup = await GroupModel.findOne({
      groupId: groupId
    })
  } catch (error) {
    console.log(error)
    return next(new HttpErrorsModel('Unexpected internal server error occurred, please try again later.', 500))
  }

  if (existingGroup) {
    res.json({
      exists: true,
      message: 'A group with the same id already exists.'
    })
    return next(new HttpErrorsModel('A group with the same id already exists.', 409))
  }

  const newGroup = new GroupModel({
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
    await newGroup.save()
  } catch (error) {
    console.log(error)
    return next(new HttpErrorsModel('Unexpected internal server error occurred, please try again later.', 500))
  }

  res.status(201).send({
    message: 'New group added successfully!'
  })
}

const getGroup = async (req, res, next) => {
  let group

  const {
    id
  } = req.params

  try {
    group = await GroupModel.findById(id)
  } catch (error) {
    console.log(error)
    return next(new HttpErrorsModel('Unexpected internal server error occurred, please try again later.', 500))
  }

  res.status(200).send(group)
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

const addSubGroup = async (req, res, next) => {
  let existingSubGroup

  const {
    academicYear,
    academicSemester,
    academicYearAndSemester,
    programme,
    group,
    groupId,
    subGroup,
    subGroupId
  } = req.body

  try {
    existingSubGroup = await SubGroupModel.findOne({
      subGroupId: subGroupId
    })
  } catch (error) {
    console.log(error)
    return next(new HttpErrorsModel('Unexpected internal server error occurred, please try again later.', 500))
  }

  if (existingSubGroup) {
    res.json({
      exists: true,
      message: 'A sub group with the same id already exists.'
    })
    return next(new HttpErrorsModel('A sub group with the same id already exists.', 409))
  }

  const newSubGroup = new SubGroupModel({
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
    await newSubGroup.save()
  } catch (error) {
    console.log(error)
    return next(new HttpErrorsModel('Unexpected internal server error occurred, please try again later.', 500))
  }

  res.status(201).send({
    message: 'New sub group added successfully!'
  })
}

const getSubGroup = async (req, res, next) => {
  let subGroup

  const {
    id
  } = req.params

  try {
    subGroup = await SubGroupModel.findById(id)
  } catch (error) {
    console.log(error)
    return next(new HttpErrorsModel('Unexpected internal server error occurred, please try again later.', 500))
  }

  res.status(200).send(subGroup)
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

const getGroupsCountByAcademicYear = async (req, res, next) => {
  let groupsCountByAcademicYear
  let subGroupsCountByAcademicYear

  try {
    groupsCountByAcademicYear = await GroupModel.aggregate([{
      $group: {
        '_id': {
          'academicYear': '$academicYear'
        },
        'groupsCount': {
          $sum: 1
        }
      }
    }, {
      $sort: {
        '_id': 1
      }
    }])
  } catch (error) {
    console.log(error)
    return next(new HttpErrorsModel('Unexpected internal server error occurred, please try again later.', 500))
  }

  try {
    subGroupsCountByAcademicYear = await SubGroupModel.aggregate([{
      $group: {
        '_id': {
          'academicYear': '$academicYear'
        },
        'subGroupsCount': {
          $sum: 1
        }
      }
    }, {
      $sort: {
        '_id': 1
      }
    }])
  } catch (error) {
    console.log(error)
    return next(new HttpErrorsModel('Unexpected internal server error occurred, please try again later.', 500))
  }

  for (let i = 0; i < groupsCountByAcademicYear.length; i++) {
    const academicYearGroup = groupsCountByAcademicYear[i]._id.academicYear
    let subGroupsCount = 0
    for (let j = 0; j < subGroupsCountByAcademicYear.length; j++) {
      const academicYearSubGroup = subGroupsCountByAcademicYear[j]._id.academicYear
      if (academicYearGroup === academicYearSubGroup)
        subGroupsCount = subGroupsCountByAcademicYear[j].subGroupsCount
    }
    groupsCountByAcademicYear[i] = {
      ...groupsCountByAcademicYear[i],
      subGroupsCount: subGroupsCount
    }
  }

  res.status(200).send(groupsCountByAcademicYear)
}

const getGroupsCountByAcademicYearAndSemester = async (req, res, next) => {
  let groupsCountByAcademicYearAndSemester
  let subGroupsCountByAcademicYearAndSemester

  try {
    groupsCountByAcademicYearAndSemester = await GroupModel.aggregate([{
      $group: {
        '_id': {
          'academicYear': '$academicYear',
          'academicSemester': '$academicSemester'
        },
        'groupsCount': {
          $sum: 1
        }
      }
    }, {
      $sort: {
        '_id': 1
      }
    }])
  } catch (error) {
    console.log(error)
    return next(new HttpErrorsModel('Unexpected internal server error occurred, please try again later.', 500))
  }

  try {
    subGroupsCountByAcademicYearAndSemester = await SubGroupModel.aggregate([{
      $group: {
        '_id': {
          'academicYear': '$academicYear',
          'academicSemester': '$academicSemester'
        },
        'subGroupsCount': {
          $sum: 1
        }
      }
    }, {
      $sort: {
        '_id': 1
      }
    }])
  } catch (error) {
    console.log(error)
    return next(new HttpErrorsModel('Unexpected internal server error occurred, please try again later.', 500))
  }

  let academicYearAndSemester

  for (let i = 0; i < groupsCountByAcademicYearAndSemester.length; i++) {
    const academicYearGroup = groupsCountByAcademicYearAndSemester[i]._id.academicYear
    const academicSemesterGroup = groupsCountByAcademicYearAndSemester[i]._id.academicSemester
    let subGroupsCount = 0
    for (let j = 0; j < subGroupsCountByAcademicYearAndSemester.length; j++) {
      const academicYearSubGroup = subGroupsCountByAcademicYearAndSemester[j]._id.academicYear
      const academicSemesterSubGroup = subGroupsCountByAcademicYearAndSemester[j]._id.academicSemester
      if (academicYearGroup === academicYearSubGroup && academicSemesterGroup === academicSemesterSubGroup)
        subGroupsCount = subGroupsCountByAcademicYearAndSemester[j].subGroupsCount
    }
    academicYearAndSemester = `Y${academicYearGroup}.S${academicSemesterGroup}`
    groupsCountByAcademicYearAndSemester[i] = {
      ...groupsCountByAcademicYearAndSemester[i],
      academicYearAndSemester: academicYearAndSemester,
      subGroupsCount: subGroupsCount
    }
  }

  res.status(200).send(groupsCountByAcademicYearAndSemester)
}

const getGroupsCountByAcademicYearSemesterAndProgramme = async (req, res, next) => {
  let groupsCountByAcademicYearSemesterAndProgramme
  let subGroupsCountByAcademicYearSemesterAndProgramme

  try {
    groupsCountByAcademicYearSemesterAndProgramme = await GroupModel.aggregate([{
      $group: {
        '_id': {
          'academicYear': '$academicYear',
          'academicSemester': '$academicSemester',
          'programme': '$programme'
        },
        'groupsCount': {
          $sum: 1
        }
      }
    }, {
      $sort: {
        '_id': 1
      }
    }])
  } catch (error) {
    console.log(error)
    return next(new HttpErrorsModel('Unexpected internal server error occurred, please try again later.', 500))
  }

  try {
    subGroupsCountByAcademicYearSemesterAndProgramme = await SubGroupModel.aggregate([{
      $group: {
        '_id': {
          'academicYear': '$academicYear',
          'academicSemester': '$academicSemester',
          'programme': '$programme'
        },
        'subGroupsCount': {
          $sum: 1
        }
      }
    }, {
      $sort: {
        '_id': 1
      }
    }])
  } catch (error) {
    console.log(error)
    return next(new HttpErrorsModel('Unexpected internal server error occurred, please try again later.', 500))
  }

  let academicYearSemesterAndProgramme

  for (let i = 0; i < groupsCountByAcademicYearSemesterAndProgramme.length; i++) {
    const academicYearGroup = groupsCountByAcademicYearSemesterAndProgramme[i]._id.academicYear
    const academicSemesterGroup = groupsCountByAcademicYearSemesterAndProgramme[i]._id.academicSemester
    const programmeGroup = groupsCountByAcademicYearSemesterAndProgramme[i]._id.programme
    let subGroupsCount = 0
    for (let j = 0; j < subGroupsCountByAcademicYearSemesterAndProgramme.length; j++) {
      const academicYearSubGroup = subGroupsCountByAcademicYearSemesterAndProgramme[j]._id.academicYear
      const academicSemesterSubGroup = subGroupsCountByAcademicYearSemesterAndProgramme[j]._id.academicSemester
      const programmeSubGroup = subGroupsCountByAcademicYearSemesterAndProgramme[j]._id.programme
      if (academicYearGroup === academicYearSubGroup && academicSemesterGroup === academicSemesterSubGroup
        && programmeGroup === programmeSubGroup)
        subGroupsCount = subGroupsCountByAcademicYearSemesterAndProgramme[j].subGroupsCount
    }
    academicYearSemesterAndProgramme = `Y${academicYearGroup}.S${academicSemesterGroup}.${programmeGroup}`
    groupsCountByAcademicYearSemesterAndProgramme[i] = {
      ...groupsCountByAcademicYearSemesterAndProgramme[i],
      academicYearSemesterAndProgramme: academicYearSemesterAndProgramme,
      subGroupsCount: subGroupsCount
    }
  }

  res.status(200).send(groupsCountByAcademicYearSemesterAndProgramme)
}

exports.addGroup = addGroup
exports.getGroup = getGroup
exports.getGroupList = getGroupList
exports.addSubGroup = addSubGroup
exports.getSubGroup = getSubGroup
exports.getSubGroupList = getSubGroupList
exports.getGroupsCountByAcademicYear = getGroupsCountByAcademicYear
exports.getGroupsCountByAcademicYearAndSemester = getGroupsCountByAcademicYearAndSemester
exports.getGroupsCountByAcademicYearSemesterAndProgramme = getGroupsCountByAcademicYearSemesterAndProgramme
