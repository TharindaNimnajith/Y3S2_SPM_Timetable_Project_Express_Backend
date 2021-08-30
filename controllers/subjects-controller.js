const HttpErrorsModel = require('../models/http-errors')
const SubjectModel = require('../models/subjects.model')

const addSubjects = async (req, res, next) => {
  let existingSubject

  const {
    offeredYear,
    offeredSemester,
    subjectName,
    subjectCode,
    numberOfLectureHours,
    numberOfTutorialHours,
    numberOfLabHours,
    numberOfEvaluationHours,
    label,
    category,
    categoryCount
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
      message: 'A subject with the same name already exists.'
    })
    return next(new HttpErrorsModel('A subject with the same name already exists.', 409))
  }

  const newSubject = new SubjectModel({
    offeredYear,
    offeredSemester,
    subjectName,
    subjectCode,
    numberOfLectureHours,
    numberOfTutorialHours,
    numberOfLabHours,
    numberOfEvaluationHours,
    label,
    category,
    categoryCount
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

const updateSubject = async (req, res, next) => {
  let subject
  let existingSubject

  const {
    id,
    finalObject
  } = req.body

  // const {
  //     offeredYear,
  //     offeredSemester,
  //     subjectName,
  //     subjectCode,
  //     numberOfLectureHours,
  //     numberOfTutorialHours,
  //     numberOfLabHours,
  //     numberOfEvaluationHours
  // } = req.body

  // const {workingDaysAndHours, id} = req.body
  const query = {'_id': id}
  SubjectModel.findOneAndUpdate(query, finalObject, {upsert: true}, (err, item) => {
    if (err) return res.send(500, {error: err})
    return res.json({subjects: item, message: 'got results'})
  })
  // try {
  //     subject = await SubjectModel.findById(id)
  // } catch (error) {
  //     console.log(error)
  //     return next(new HttpErrorsModel('Unexpected internal server error occurred, please try again later.', 500))
  // }
  //
  // try {
  //     existingSubject = await SubjectModel.findOne({
  //         subjectCode: subjectCode
  //     })
  // } catch (error) {
  //     console.log(error)
  //     return next(new HttpErrorsModel('Unexpected internal server error occurred, please try again later.', 500))
  // }
  //
  // if (existingSubject && subjectCode !== subject.subjectCode) {
  //     res.json({
  //         exists: true,
  //         message: 'A subject with the same name already exists.'
  //     })
  //     return next(new HttpErrorsModel('A subject with the same name already exists.', 409))
  // }
  //
  // subject.offeredYear = offeredYear
  // subject.offeredSemester = offeredSemester
  // subject.subjectName = subjectName
  // subject.numberOfLectureHours = numberOfLectureHours
  // subject.numberOfTutorialHours = numberOfTutorialHours
  // subject.numberOfLabHours = numberOfLabHours
  // subject.numberOfEvaluationHours = numberOfEvaluationHours
  //
  // try {
  //     await subject.save()
  // } catch (error) {
  //     console.log(error)
  //     return next(new HttpErrorsModel('Unexpected internal server error occurred, please try again later.', 500))
  // }
  //
  // res.status(200).send({
  //     message: 'Subject updated successfully!'
  // })
}

const deleteSubjects = async (req, res, next) => {
  let subject
  const {
    id
  } = req.body
  console.log(id)
  try {
    subject = await SubjectModel.findById(id)
    await subject.remove()
  } catch (error) {
    console.log(error)
    return next(new HttpErrorsModel('Unexpected internal server error occurred, please try again later.', 500))
  }

  res.status(200).send({
    message: 'Subject deleted successfully!'
  })
}

const getSubject = async (req, res, next) => {
  let subject

  const {
    id
  } = req.body

  try {
    subject = await SubjectModel.findById(id)
  } catch (error) {
    console.log(error)
    return next(new HttpErrorsModel('Unexpected internal server error occurred, please try again later.', 500))
  }

  res.status(200).send(subject)
}

const getSubject1 = async (req, res, next) => {
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

const getSubjectsList = async (req, res, next) => {
  let subjectsList

  try {
    subjectsList = await SubjectModel.find()
  } catch (error) {
    console.log(error)
    return next(new HttpErrorsModel('Unexpected internal server error occurred, please try again later.', 500))
  }

  res.status(200).send(subjectsList)
}


const addCategory = async (req, res, next) => {
  let subject

  const {
    id
  } = req.params

  const {
    category,
    categoryCount
  } = req.body

  try {
    subject = await SubjectModel.findById(id)
  } catch (error) {
    console.log(error)
    return next(new HttpErrorsModel('Unexpected internal server error occurred, please try again later.', 500))
  }

  subject.category = category
  subject.categoryCount = categoryCount


  try {
    await subject.save()
  } catch (error) {
    console.log(error)
    return next(new HttpErrorsModel('Unexpected internal server error occurred, please try again later.', 500))
  }

  res.status(200).send({
    message: 'category added successfully!'
  })
}


exports.addSubjects = addSubjects
exports.updateSubject = updateSubject
exports.deleteSubjects = deleteSubjects
exports.getSubject = getSubject
exports.getSubject1 = getSubject1
exports.getSubjectsList = getSubjectsList
exports.addCategory = addCategory