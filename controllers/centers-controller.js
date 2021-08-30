const HttpErrorsModel = require('../models/http-errors')
const CenterModel = require('../models/centers.model')

const addCenter = async (req, res, next) => {
  let existingCenter

  const {
    centerName
  } = req.body

  try {
    existingCenter = await CenterModel.findOne({
      centerName: centerName
    })
  } catch (error) {
    console.log(error)
    return next(new HttpErrorsModel('Unexpected internal server error occurred, please try again later.', 500))
  }

  if (existingCenter) {
    res.json({
      exists: true,
      message: 'A center with the same name already exists.'
    })
    return next(new HttpErrorsModel('A center with the same name already exists.', 409))
  }

  const newCenter = new CenterModel({
    centerName
  })

  try {
    await newCenter.save()
  } catch (error) {
    console.log(error)
    return next(new HttpErrorsModel('Unexpected internal server error occurred, please try again later.', 500))
  }

  res.status(201).send({
    message: 'New center added successfully!'
  })
}

const updateCenter = async (req, res, next) => {
  let center
  let existingCenter

  const {
    id
  } = req.params

  const {
    centerName
  } = req.body

  try {
    center = await CenterModel.findById(id)
  } catch (error) {
    console.log(error)
    return next(new HttpErrorsModel('Unexpected internal server error occurred, please try again later.', 500))
  }

  try {
    existingCenter = await CenterModel.findOne({
      centerName: centerName
    })
  } catch (error) {
    console.log(error)
    return next(new HttpErrorsModel('Unexpected internal server error occurred, please try again later.', 500))
  }

  if (existingCenter && centerName !== center.centerName) {
    res.json({
      exists: true,
      message: 'A center with the same name already exists.'
    })
    return next(new HttpErrorsModel('A center with the same name already exists.', 409))
  }

  center.centerName = centerName

  try {
    await center.save()
  } catch (error) {
    console.log(error)
    return next(new HttpErrorsModel('Unexpected internal server error occurred, please try again later.', 500))
  }

  res.status(200).send({
    message: 'Center updated successfully!'
  })
}

const deleteCenter = async (req, res, next) => {
  let center

  const {
    id
  } = req.params

  try {
    center = await CenterModel.findById(id)
    await center.remove()
  } catch (error) {
    console.log(error)
    return next(new HttpErrorsModel('Unexpected internal server error occurred, please try again later.', 500))
  }

  res.status(200).send({
    message: 'Center deleted successfully!'
  })
}

const getCenter = async (req, res, next) => {
  let center

  const {
    id
  } = req.params

  try {
    center = await CenterModel.findById(id)
  } catch (error) {
    console.log(error)
    return next(new HttpErrorsModel('Unexpected internal server error occurred, please try again later.', 500))
  }

  res.status(200).send(center)
}

const getCenterList = async (req, res, next) => {
  let centerList

  try {
    centerList = await CenterModel.find()
  } catch (error) {
    console.log(error)
    return next(new HttpErrorsModel('Unexpected internal server error occurred, please try again later.', 500))
  }

  res.status(200).send(centerList)
}

exports.addCenter = addCenter
exports.updateCenter = updateCenter
exports.deleteCenter = deleteCenter
exports.getCenter = getCenter
exports.getCenterList = getCenterList
