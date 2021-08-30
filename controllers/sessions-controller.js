const HttpErrorsModel = require('../models/http-errors')
const SessionModel = require('../models/sessions.model')

const addSessions = async (req, res, next) => {
  const {
    lecturers,
    subjectRef,
    subjectCodeRef,
    tagRef,
    groupRef,
    subGroupRef,
    studentCount,
    duration,
    label
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
    label
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

const getSessionLists = async (req, res, next) => {
  let sessionList

  try {
    sessionList = await SessionModel.find()
  } catch (error) {
    console.log(error)
    return next(new HttpErrorsModel('Unexpected internal server error occurred, please try again later.', 500))
  }

  res.status(200).send(sessionList)
}



const addNotAvailable = async (req, res, next) => {
  let session

  const {
    id
  } = req.params

  const {
    unavailability
  } = req.body

  try {
    session = await SessionModel.findById(id)
  } catch (error) {
    console.log(error)
    return next(new HttpErrorsModel('Unexpected internal server error occurred, please try again later.', 500))
  }

  session.unavailability =  unavailability


  try {
    await session.save()
  } catch (error) {
    console.log(error)
    return next(new HttpErrorsModel('Unexpected internal server error occurred, please try again later.', 500))
  }

  res.status(200).send({
    message: 'session not available added successfully!'
  })
}



const  getSessionsCode = async (req,res,next) => {

 
  let sessionList;
  

  const {
     subjectCodeRef
  } = req.body

  try {
    sessionList = await SessionModel.find({
      subjectCodeRef:subjectCodeRef
    })
   
    console.log(sessionList)
   
    
  } catch (error) {
    console.log(error)
    return next(new HttpErrorsModel('Unexpected internal server error occurred, please try again later.', 500))
  }
  res.status(200).send(sessionList);
   
    
}


const  getSessionsLec = async (req,res,next) => {

 
  let sessionList;
  

  const {
     tagRef
  } = req.body

  try {
    sessionList = await SessionModel.find({
      tagRef:tagRef
    })
   
    console.log(sessionList)
   
    
  } catch (error) {
    console.log(error)
    return next(new HttpErrorsModel('Unexpected internal server error occurred, please try again later.', 500))
  }
  res.status(200).send(sessionList);
   
    
}



const  getSessionsTut = async (req,res,next) => {

 
  let sessionList;
  

  const {
     tagRef,
     subjectCodeRef,
     groupRef
  } = req.body

  try {
    sessionList = await SessionModel.find({
      tagRef:tagRef,
      subjectCodeRef:subjectCodeRef,
      groupRef:groupRef
    })
   
    console.log(sessionList)
   
    
  } catch (error) {
    console.log(error)
    return next(new HttpErrorsModel('Unexpected internal server error occurred, please try again later.', 500))
  }
  res.status(200).send(sessionList);
   
    
}



const  getSessionsTuto = async (req,res,next) => {

 
  let sessionList;
  

  const {
     tagRef
  } = req.body

  try {
    sessionList = await SessionModel.find({
      tagRef:tagRef,
     
    })
   
    console.log(sessionList)
   
    
  } catch (error) {
    console.log(error)
    return next(new HttpErrorsModel('Unexpected internal server error occurred, please try again later.', 500))
  }
  res.status(200).send(sessionList);
   
    
}
exports.addSessions = addSessions
exports.getSession = getSession
exports.getSessionLists = getSessionLists
exports.addNotAvailable = addNotAvailable
exports.getSessionsCode = getSessionsCode
exports.getSessionsLec = getSessionsLec
exports.getSessionsTut = getSessionsTut
exports.getSessionsTuto = getSessionsTuto

