const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const Schema = mongoose.Schema

const SubjectsSchema = new Schema({
  offeredYear: {
    type: Number,
    required: true,
    unique: false,
    trim: true
  },
  offeredSemester: {
    type: Number,
    required: true,
    unique: false,
    trim: true
  },
  subjectName: {
    type: String,
    required: true,
    unique: false,
    trim: true
  },
  subjectCode: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  numberOfLectureHours: {
    type: String,
    required: true,
    unique: false,
    trim: true
  },
  numberOfTutorialHours: {
    type: String,
    required: true,
    unique: false,
    trim: true
  },
  numberOfLabHours: {
    type: String,
    required: true,
    unique: false,
    trim: true
  },
  numberOfEvaluationHours: {
    type: String,
    required: true,
    unique: false,
    trim: true
  },
  label: {
    type: String,
    required: false,
    unique: false,
    trim: true
  },
  category: {
    type: String,
    required: false,
    unique: false,
    trim: true
  },
  categoryCount: {
    type: Number,
    required: false,
    unique: false,
    trim: true
  }
}, {
  timestamps: true,
  collection: 'Subjects'
})

SubjectsSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Subjects', SubjectsSchema)
