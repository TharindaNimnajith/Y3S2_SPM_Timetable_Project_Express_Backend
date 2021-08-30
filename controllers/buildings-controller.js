const HttpErrorsModel = require('../models/http-errors')
const BuildingModel = require('../models/buildings.model')
const RoomModel = require('../models/rooms.model')

const addBuilding = async (req, res, next) => {
  let existingBuilding

  const {
    buildingName,
    centerName
  } = req.body

  try {
    existingBuilding = await BuildingModel.findOne({
      buildingName: buildingName
    })
  } catch (error) {
    console.log(error)
    return next(new HttpErrorsModel('Unexpected internal server error occurred, please try again later.', 500))
  }

  if (existingBuilding) {
    res.json({
      exists: true,
      message: 'A building with the same name already exists.'
    })
    return next(new HttpErrorsModel('A building with the same name already exists.', 409))
  }

  const newBuilding = new BuildingModel({
    buildingName,
    centerName
  })

  try {
    await newBuilding.save()
  } catch (error) {
    console.log(error)
    return next(new HttpErrorsModel('Unexpected internal server error occurred, please try again later.', 500))
  }

  res.status(201).send({
    message: 'New building added successfully!'
  })
}

const updateBuilding = async (req, res, next) => {
  let building
  let existingBuilding
  let rooms

  const {
    id
  } = req.params

  const {
    buildingName,
    centerName
  } = req.body

  try {
    building = await BuildingModel.findById(id)
  } catch (error) {
    console.log(error)
    return next(new HttpErrorsModel('Unexpected internal server error occurred, please try again later.', 500))
  }

  try {
    rooms = await RoomModel.find({
      buildingName: building.buildingName
    })
  } catch (error) {
    console.log(error)
    return next(new HttpErrorsModel('Unexpected internal server error occurred, please try again later.', 500))
  }

  try {
    existingBuilding = await BuildingModel.findOne({
      buildingName: buildingName
    })
  } catch (error) {
    console.log(error)
    return next(new HttpErrorsModel('Unexpected internal server error occurred, please try again later.', 500))
  }

  if (existingBuilding && buildingName !== building.buildingName) {
    res.json({
      exists: true,
      message: 'A building with the same name already exists.'
    })
    return next(new HttpErrorsModel('A building with the same name already exists.', 409))
  }

  building.buildingName = buildingName
  building.centerName = centerName

  try {
    await building.save()
  } catch (error) {
    console.log(error)
    return next(new HttpErrorsModel('Unexpected internal server error occurred, please try again later.', 500))
  }

  for (let i = 0; i < rooms.length; i++) {
    rooms[i].buildingName = buildingName
    try {
      await rooms[i].save()
    } catch (error) {
      console.log(error)
      return next(new HttpErrorsModel('Unexpected internal server error occurred, please try again later.', 500))
    }
  }

  res.status(200).send({
    message: 'Building updated successfully!'
  })
}

const deleteBuilding = async (req, res, next) => {
  let building
  let rooms

  const {
    id
  } = req.params

  try {
    building = await BuildingModel.findById(id)
  } catch (error) {
    console.log(error)
    return next(new HttpErrorsModel('Unexpected internal server error occurred, please try again later.', 500))
  }

  try {
    rooms = await RoomModel.findOne({
      buildingName: building.buildingName
    })
  } catch (error) {
    console.log(error)
    return next(new HttpErrorsModel('Unexpected internal server error occurred, please try again later.', 500))
  }

  if (rooms) {
    res.json({
      roomsExist: true,
      message: 'Rooms are defined under this building name, please delete those rooms first and try again.'
    })
    return next(new HttpErrorsModel('Rooms are defined under this building name, please delete those rooms first and try again.', 409))
  }

  try {
    await building.remove()
  } catch (error) {
    console.log(error)
    return next(new HttpErrorsModel('Unexpected internal server error occurred, please try again later.', 500))
  }

  res.status(200).send({
    message: 'Building deleted successfully!'
  })
}

const getBuilding = async (req, res, next) => {
  let building

  const {
    id
  } = req.params

  try {
    building = await BuildingModel.findById(id)
  } catch (error) {
    console.log(error)
    return next(new HttpErrorsModel('Unexpected internal server error occurred, please try again later.', 500))
  }

  res.status(200).send(building)
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

const getBuildingListByCenter = async (req, res, next) => {
  let buildingList

  const {
    centerName
  } = req.body

  try {
    buildingList = await BuildingModel.find({
      centerName: centerName
    })
  } catch (error) {
    console.log(error)
    return next(new HttpErrorsModel('Unexpected internal server error occurred, please try again later.', 500))
  }

  res.status(200).send(buildingList)
}

const getBuildingListByBuildingName = async (req, res, next) => {
  let buildingList

  const {
    buildingName
  } = req.body

  try {
    buildingList = await BuildingModel.find({
      buildingName: {
        $regex: '.*' + buildingName + '.*',
        $options: 'i'
      }
    })
  } catch (error) {
    console.log(error)
    return next(new HttpErrorsModel('Unexpected internal server error occurred, please try again later.', 500))
  }

  res.status(200).send(buildingList)
}

const searchBuildings = async (req, res, next) => {
  let buildingList

  const {
    buildingName,
    centerName
  } = req.body

  if (buildingName !== "" && centerName !== "") {
    try {
      buildingList = await BuildingModel.find({
        buildingName: {
          $regex: '.*' + buildingName + '.*',
          $options: 'i'
        },
        centerName: centerName
      })
    } catch (error) {
      console.log(error)
      return next(new HttpErrorsModel('Unexpected internal server error occurred, please try again later.', 500))
    }
  } else if (buildingName !== "") {
    try {
      buildingList = await BuildingModel.find({
        buildingName: {
          $regex: '.*' + buildingName + '.*',
          $options: 'i'
        }
      })
    } catch (error) {
      console.log(error)
      return next(new HttpErrorsModel('Unexpected internal server error occurred, please try again later.', 500))
    }
  } else if (centerName !== "") {
    try {
      buildingList = await BuildingModel.find({
        centerName: centerName
      })
    } catch (error) {
      console.log(error)
      return next(new HttpErrorsModel('Unexpected internal server error occurred, please try again later.', 500))
    }
  } else {
    try {
      buildingList = await BuildingModel.find()
    } catch (error) {
      console.log(error)
      return next(new HttpErrorsModel('Unexpected internal server error occurred, please try again later.', 500))
    }
  }

  res.status(200).send(buildingList)
}

exports.addBuilding = addBuilding
exports.updateBuilding = updateBuilding
exports.deleteBuilding = deleteBuilding
exports.getBuilding = getBuilding
exports.getBuildingList = getBuildingList
exports.getBuildingListByCenter = getBuildingListByCenter
exports.getBuildingListByBuildingName = getBuildingListByBuildingName
exports.searchBuildings = searchBuildings
