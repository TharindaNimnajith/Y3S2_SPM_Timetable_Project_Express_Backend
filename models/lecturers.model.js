const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const Schema = mongoose.Schema

const days = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday'
]

const LecturersSchema = new Schema({
  lecturerName: {
    type: String,
    required: true,
    unique: false,
    trim: true
  },
  employeeId: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  faculty: {
    type: String,
    required: true,
    unique: false,
    trim: true
  },
  department: {
    type: String,
    required: true,
    unique: false,
    trim: true
  },
  center: {
    type: String,
    required: true,
    unique: false,
    trim: true
  },
  building: {
    type: String,
    required: true,
    unique: false,
    trim: true
  },
  level: {
    type: Number,
    required: true,
    unique: false,
    trim: true
  },
  rank: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  unavailability: [{
    day: {
      type: String,
      enum: days,
      required: false,
      unique: false,
      trim: true
    },
    startTime: {
      type: String,
      required: false,
      unique: false,
      trim: true
    },
    endTime: {
      type: String,
      required: false,
      unique: false,
      trim: true
    }
  }],
  possibleRooms: [{
    roomRef: {
      type: String,
      required: false,
      unique: false,
      trim: true
    }
  }]
}, {
  timestamps: true,
  collection: 'Lecturers'
})

LecturersSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Lecturers', LecturersSchema)
