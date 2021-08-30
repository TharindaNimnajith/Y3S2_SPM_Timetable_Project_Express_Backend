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

const roomTypes = [
  'Lecture Hall',
  'Laboratory'
]

const RoomsSchema = new Schema({
  roomName: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  buildingName: {
    type: String,
    required: true,
    unique: false,
    trim: true
  },
  roomType: {
    type: String,
    enum: roomTypes,
    required: true,
    unique: false,
    trim: true
  },
  roomCapacity: {
    type: Number,
    required: true,
    unique: false,
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
  }]
}, {
  timestamps: true,
  collection: 'Rooms'
})

RoomsSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Rooms', RoomsSchema)
