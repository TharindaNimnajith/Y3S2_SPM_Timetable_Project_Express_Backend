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

const SubGroupsSchema = new Schema({
  academicYear: {
    type: Number,
    required: true,
    unique: false,
    trim: true
  },
  academicSemester: {
    type: Number,
    required: true,
    unique: false,
    trim: true
  },
  academicYearAndSemester: {
    type: String,
    required: true,
    unique: false,
    trim: true
  },
  programme: {
    type: String,
    required: true,
    unique: false,
    trim: true
  },
  group: {
    type: Number,
    required: true,
    unique: false,
    trim: true
  },
  groupId: {
    type: String,
    required: true,
    unique: false,
    trim: true
  },
  subGroup: {
    type: Number,
    required: true,
    unique: false,
    trim: true
  },
  subGroupId: {
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
  collection: 'SubGroups'
})

SubGroupsSchema.plugin(uniqueValidator)

module.exports = mongoose.model('SubGroups', SubGroupsSchema)
