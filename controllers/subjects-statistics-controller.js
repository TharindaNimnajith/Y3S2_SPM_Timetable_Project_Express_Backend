const HttpErrorsModel = require('../models/http-errors')
const SubjectModel = require('../models/subjects.model')

const addSubject = async (req, res, next) => {
  let existingSubject

  const {
    offeredYear,
    offeredSemester,
    subjectName,
    subjectCode,
    numberOfLectureHours,
    numberOfTutorialHours,
    numberOfLabHours,
    numberOfEvaluationHours
  } = req.body

  try {
    existingSubject = await SubjectModel.findOne({
      subjectCode: subjectCode
    })
  } catch (error) {
    console.log(error)
    return next(new HttpErrorsModel('Unexpected internal server error occurred, please try again later.', 500))
  }

  if (existingSubject) {
    res.json({
      exists: true,
      message: 'A subject with the same subject code already exists.'
    })
    return next(new HttpErrorsModel('A subject with the same subject code already exists.', 409))
  }

  const newSubject = new SubjectModel({
    offeredYear,
    offeredSemester,
    subjectName,
    subjectCode,
    numberOfLectureHours,
    numberOfTutorialHours,
    numberOfLabHours,
    numberOfEvaluationHours
  })

  try {
    await newSubject.save()
  } catch (error) {
    console.log(error)
    return next(new HttpErrorsModel('Unexpected internal server error occurred, please try again later.', 500))
  }

  res.status(201).send({
    message: 'New subject added successfully!'
  })
}

const getSubject = async (req, res, next) => {
  let subject

  const {
    id
  } = req.params

  try {
    subject = await SubjectModel.findById(id)
  } catch (error) {
    console.log(error)
    return next(new HttpErrorsModel('Unexpected internal server error occurred, please try again later.', 500))
  }

  res.status(200).send(subject)
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

const getTotalSubjectsCount = async (req, res, next) => {
  let totalSubjectsCount

  try {
    totalSubjectsCount = await SubjectModel.countDocuments({})
  } catch (error) {
    console.log(error)
    return next(new HttpErrorsModel('Unexpected internal server error occurred, please try again later.', 500))
  }

  res.status(200).json({
    totalSubjectsCount: totalSubjectsCount
  })
}

const getSubjectsCountByOfferedYear = async (req, res, next) => {
  let subjectsCountByOfferedYear

  try {
    subjectsCountByOfferedYear = await SubjectModel.aggregate([{
      $group: {
        '_id': {
          'offeredYear': '$offeredYear'
        },
        'subjectsCount': {
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

  res.status(200).send(subjectsCountByOfferedYear)
}

const getSubjectsCountByOfferedYearAndSemester = async (req, res, next) => {
  let subjectsCountByOfferedYearAndSemester

  try {
    subjectsCountByOfferedYearAndSemester = await SubjectModel.aggregate([{
      $group: {
        '_id': {
          'offeredYear': '$offeredYear',
          'offeredSemester': '$offeredSemester'
        },
        'subjectsCount': {
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

  let yearAndSemester

  for (let i = 0; i < subjectsCountByOfferedYearAndSemester.length; i++) {
    const offeredYear = subjectsCountByOfferedYearAndSemester[i]._id.offeredYear
    const offeredSemester = subjectsCountByOfferedYearAndSemester[i]._id.offeredSemester
    yearAndSemester = `Y${offeredYear}.S${offeredSemester}`
    subjectsCountByOfferedYearAndSemester[i] = {
      ...subjectsCountByOfferedYearAndSemester[i],
      yearAndSemester: yearAndSemester
    }
  }

  res.status(200).send(subjectsCountByOfferedYearAndSemester)
}

exports.addSubject = addSubject
exports.getSubject = getSubject
exports.getSubjectList = getSubjectList
exports.getTotalSubjectsCount = getTotalSubjectsCount
exports.getSubjectsCountByOfferedYear = getSubjectsCountByOfferedYear
exports.getSubjectsCountByOfferedYearAndSemester = getSubjectsCountByOfferedYearAndSemester
