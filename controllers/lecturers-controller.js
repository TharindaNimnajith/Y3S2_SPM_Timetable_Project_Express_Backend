const HttpErrorsModel = require('../models/http-errors')
const LecturerModel = require('../models/lecturers.model')

const addLecturers = async (req, res, next) => {
  let existingLecturer
  console.log(req.body)

  const {
    lecturerName,
    employeeId,
    faculty,
    department,
    center,
    building,
    level,
    rank
  } = req.body

  try {
    existingLecturer = await LecturerModel.findOne({
      lecturerName: lecturerName
    })
  } catch (error) {
    console.log(error)
    return next(new HttpErrorsModel('Unexpected internal server error occurred, please try again later.', 500))
  }

  if (existingLecturer) {
    res.json({
      exists: true,
      message: 'A lecturer with the same name already exists.'
    })
    return next(new HttpErrorsModel('A lecturer with the same name already exists.', 409))
  }

  const newLecturer = new LecturerModel({
    lecturerName,
    employeeId,
    faculty,
    department,
    center,
    building,
    level,
    rank
  })

  console.log(newLecturer)

  try {
    await newLecturer.save()
  } catch (error) {
    console.log(error)
    return next(new HttpErrorsModel('Unexpected internal server error occurred, please try again later.', 500))
  }

  res.status(201).send({
    message: 'New lecturer added successfully!'
  })
}

const updateLecturer = async (req, res, next) => {
  let lecturer
  let existingLecturer

  const {
    id,
    finalObject
  } = req.body

  // const {
  //     lecturerName,
  //     employeeId,
  //     faculty,
  //     department,
  //     center,
  //     building,
  //     level,
  //     rank
  // } = req.body

  const query = {'_id': id}
  LecturerModel.findOneAndUpdate(query, finalObject, {upsert: true}, (err, item) => {
    if (err) return res.send(500, {error: err})
    return res.json({lecturers: item, message: 'got results'})
  })
  //
  // try {
  //     lecturer = await LecturerModel.findById(id)
  // } catch (error) {
  //     console.log(error)
  //     return next(new HttpErrorsModel('Unexpected internal server error occurred, please try again later.', 500))
  // }
  //
  // try {
  //     existingLecturer = await LecturerModel.findOne({
  //         lecturerName: lecturerName
  //     })
  // } catch (error) {
  //     console.log(error)
  //     return next(new HttpErrorsModel('Unexpected internal server error occurred, please try again later.', 500))
  // }
  //
  // if (existingLecturer && lecturerName !== lecturer.lecturerName) {
  //     res.json({
  //         exists: true,
  //         message: 'A lecturer with the same name already exists.'
  //     })
  //     return next(new HttpErrorsModel('A lecturer with the same name already exists.', 409))
  // }
  //
  // lecturer.lecturerName = lecturerName
  // lecturer.employeeId = employeeId
  // lecturer.faculty = faculty
  // lecturer.department = department
  // lecturer.center = center
  // lecturer.building = building
  // lecturer.level = level
  // lecturer.rank = rank
  //
  // try {
  //     await lecturer.save()
  // } catch (error) {
  //     console.log(error)
  //     return next(new HttpErrorsModel('Unexpected internal server error occurred, please try again later.', 500))
  // }
  //
  // res.status(200).send({
  //     message: 'Lecturer updated successfully!'
  // })
}

const deleteLecturer = async (req, res, next) => {
  let lecturer

  const {
    id
  } = req.body

  try {
    lecturer = await LecturerModel.findById(id)
    await lecturer.remove()
  } catch (error) {
    console.log(error)
    return next(new HttpErrorsModel('Unexpected internal server error occurred, please try again later.', 500))
  }

  res.status(200).send({
    message: 'Lecturer deleted successfully!'
  })
}

const getLecturer = async (req, res, next) => {
  let lecturer

  const {
    id
  } = req.params

  try {
    lecturer = await LecturerModel.findById(id)
  } catch (error) {
    console.log(error)
    return next(new HttpErrorsModel('Unexpected internal server error occurred, please try again later.', 500))
  }

  res.status(200).send(lecturer)
}

const getLecturersList = async (req, res, next) => {
  let lecturersList

  try {
    lecturersList = await LecturerModel.find()
  } catch (error) {
    console.log(error)
    return next(new HttpErrorsModel('Unexpected internal server error occurred, please try again later.', 500))
  }

  res.status(200).send(lecturersList)
}

const addNotAvailable = async (req, res, next) => {
  let lecturer

  const {
    id
  } = req.params

  const {
    unavailability
  } = req.body

  try {
    lecturer = await LecturerModel.findById(id)
  } catch (error) {
    console.log(error)
    return next(new HttpErrorsModel('Unexpected internal server error occurred, please try again later.', 500))
  }

  lecturer.unavailability =  unavailability


  try {
    await lecturer.save()
  } catch (error) {
    console.log(error)
    return next(new HttpErrorsModel('Unexpected internal server error occurred, please try again later.', 500))
  }

  res.status(200).send({
    message: 'lecturer not available added successfully!'
  })
}



exports.addLecturers = addLecturers
exports.updateLecturer = updateLecturer
exports.deleteLecturer = deleteLecturer
exports.getLecturer = getLecturer
exports.getLecturersList = getLecturersList
exports.addNotAvailable = addNotAvailable