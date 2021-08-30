const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const Schema = mongoose.Schema

const YearSemSchema = new Schema({
  year: {
    type: Number,
    required: true,
    unique: false,
    trim: true
  },
  semester: {
    type: Number,
    required: true,
    unique: false,
    trim: true
  },
  yearSemToken: {
    type: String,
    required: true,
    unique: true,
    trim: true
  }
}, {
  timestamps: true,
  collection: 'YearSem'
})

YearSemSchema.plugin(uniqueValidator)

module.exports = mongoose.model('YearSem', YearSemSchema)
