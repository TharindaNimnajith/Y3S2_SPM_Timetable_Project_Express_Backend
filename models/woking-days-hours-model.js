const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const Schema = mongoose.Schema

const WorkingDaysAndHoursSchema = new Schema({
  numberOfWorkingDays: {
    type: Number,
    trim: true
  },
  weekType: {
    type: String
  },
  workingDays: [{
    day: {
      type: String
    }
  }],
  workingTimePerDay: {
    startTime: {
      type: String,
      trim: true
    },
    endTime: {
      type: String,
      trim: true
    }
  },
  timeSlots: [{
    type: {
      type: String
    }
  }]
}, {
  timestamps: true,
  collection: 'WorkingDaysAndHours'
})

WorkingDaysAndHoursSchema.plugin(uniqueValidator)

module.exports = mongoose.model('WorkingDaysAndHours', WorkingDaysAndHoursSchema)
