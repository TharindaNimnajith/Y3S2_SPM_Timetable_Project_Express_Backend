const HttpErrorsModel = require('../models/http-errors')
const SessionModel = require('../models/sessions.model')
const SubjectModel = require('../models/subjects.model')

const addParallelSession = async (req, res, next) => {
  let session

  const {
    id
  } = req.params

  const {
    duration,
    day,
    startTime,
    endTime,
    isParallel,
    parallelId
  } = req.body

  try {
    session = await SessionModel.findById(id)
  } catch (error) {
    console.log(error)
    return next(new HttpErrorsModel('Unexpected internal server error occurred, please try again later.', 500))
  }

  session.duration = duration
  session.day = day
  session.startTime = startTime
  session.endTime = endTime
  session.isParallel = isParallel
  session.parallelId = parallelId
  session.roomRef = null

  try {
    await session.save()
  } catch (error) {
    console.log(error)
    return next(new HttpErrorsModel('Unexpected internal server error occurred, please try again later.', 500))
  }

  res.status(200).send({
    message: 'Parallel sessions added successfully!'
  })
}



const getCategories = async (req,res,next) => {
  console.log("category list eka ganna awa")

    await SubjectModel.distinct("category")
    .then(categoryList => {
      console.log(categoryList)
      res.json({category:categoryList, message: 'got results'});
    })
    .catch((err) => res.status(400).json('Error: ' + err))
   
    
}


const getCategoryCount = async (req,res,next) => {

 
  let catList;
  

  const {
    category
  } = req.body

  try {
    catList = await SubjectModel.findOne({
      category: category
    })
   
    console.log(catList)
   
    
  } catch (error) {
    console.log(error)
    return next(new HttpErrorsModel('Unexpected internal server error occurred, please try again later.', 500))
  }
  res.status(200).send(catList);
   
    
}



const getSubjectCat = async (req,res,next) => {

 
  let catList;
  

  const {
    category
  } = req.body

  try {
    catList = await SubjectModel.find({
      category: category
    })
   
    console.log(catList)
   
    
  } catch (error) {
    console.log(error)
    return next(new HttpErrorsModel('Unexpected internal server error occurred, please try again later.', 500))
  }
  res.status(200).send(catList);
   
    
}

exports.addParallelSession = addParallelSession
exports.getCategories = getCategories
exports.getCategoryCount = getCategoryCount
exports.getSubjectCat = getSubjectCat